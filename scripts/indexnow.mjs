#!/usr/bin/env node
// Tell Bing (and the other IndexNow engines) which pages changed, so new and
// edited posts get crawled within hours instead of whenever the sitemap is next
// read. Bing matters here because ChatGPT and Copilot lean on its index.
//
// Runs from .github/workflows/indexnow.yml after each successful production
// deploy: diffs the deployed commit against the previous live deploy, maps the
// changed files to URLs, and submits the ones that are in the live sitemap.
//
//   node scripts/indexnow.mjs --all                  submit every sitemap URL
//   node scripts/indexnow.mjs --since <sha>          submit pages changed since <sha>
//   add --dry-run to print the URLs without submitting
//
// The key is the file public/<32 hex chars>.txt, served at /<key>.txt, whose
// contents are the key itself. That file is how the engines verify the site.

import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";

const SITE = "https://texttoemo.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes("--dry-run");
const ALL = argv.includes("--all");
const sinceIdx = argv.indexOf("--since");
const SINCE = sinceIdx >= 0 ? argv[sinceIdx + 1] : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normalize = (url) => url.replace(/\/+$/, "");

function readKey() {
  const files = readdirSync("public").filter((f) => /^[a-f0-9]{32}\.txt$/.test(f));
  if (files.length !== 1) {
    throw new Error(`Expected exactly one IndexNow key file in public/, found ${files.length}`);
  }
  const key = files[0].slice(0, -".txt".length);
  if (readFileSync(`public/${files[0]}`, "utf8").trim() !== key) {
    throw new Error(`public/${files[0]} must contain exactly its own key`);
  }
  return key;
}

async function liveSitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function keyFileIsLive(key) {
  try {
    const res = await fetch(`${SITE}/${key}.txt`, { cache: "no-store" });
    return res.ok && (await res.text()).trim() === key;
  } catch {
    return false;
  }
}

// Which public paths a changed source file affects. Anything not listed
// (API routes, scripts, config, styles) doesn't change a page worth re-crawling.
function pathsForFile(file, allPostPaths) {
  const post = file.match(/^app\/blog\/([^/]+)\//);
  if (post) return [`/blog/${post[1]}`];
  if (file === "app/blog/page.tsx" || file === "lib/blog.ts") return ["/blog"];
  if (file === "components/BlogShell.tsx") return allPostPaths;
  if (file.startsWith("app/pricing/")) return ["/pricing"];
  if (
    ["app/page.tsx", "components/HomeApp.tsx", "components/HomeInfo.tsx", "lib/about.ts"].includes(file)
  ) {
    return ["/"];
  }
  if (["lib/pricing.ts", "lib/retention.ts"].includes(file)) return ["/", "/pricing"];
  return [];
}

// The last production deploy that actually went live before this one. A failed
// deploy's changes shipped with a later one, so diffing from it would miss them.
async function previousLiveDeploySha() {
  const { GITHUB_REPOSITORY: repo, GITHUB_TOKEN: token, DEPLOYMENT_ID, DEPLOYMENT_SHA } = process.env;
  if (!repo || !token || !DEPLOYMENT_ID || !DEPLOYMENT_SHA) return null;
  const gh = async (path) => {
    const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`GitHub API ${path} returned ${res.status}`);
    return res.json();
  };
  const deployments = await gh("deployments?environment=Production&per_page=30");
  for (const d of deployments) {
    if (d.id >= Number(DEPLOYMENT_ID) || d.sha === DEPLOYMENT_SHA) continue;
    const statuses = await gh(`deployments/${d.id}/statuses?per_page=1`);
    if (statuses[0]?.state === "success") return d.sha;
  }
  return null;
}

function changedFiles(fromSha, toSha) {
  return execFileSync("git", ["diff", "--name-only", `${fromSha}..${toSha}`], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
}

async function main() {
  const key = readKey();
  const sitemap = await liveSitemapUrls();
  const allPostPaths = sitemap
    .map((u) => normalize(u).slice(SITE.length))
    .filter((p) => p.startsWith("/blog/"));

  let paths;
  if (ALL) {
    paths = sitemap.map((u) => normalize(u).slice(SITE.length) || "/");
    console.log(`Mode: all ${paths.length} sitemap URLs`);
  } else {
    const to = process.env.DEPLOYMENT_SHA || "HEAD";
    const from = SINCE || (await previousLiveDeploySha());
    if (!from) {
      console.log("No previous live deploy found — nothing to diff against. Use --all for a full submission.");
      return;
    }
    const files = changedFiles(from, to);
    paths = [...new Set(files.flatMap((f) => pathsForFile(f, allPostPaths)))];
    console.log(`Mode: changes ${from.slice(0, 7)}..${to.slice(0, 7)} — ${files.length} files → ${paths.length} pages`);
  }

  if (paths.length === 0) {
    console.log("No public pages changed — nothing to submit.");
    return;
  }

  // Vercel can report the deploy as successful a moment before the domain
  // serves it, so wait for the key file and for new pages to appear in the
  // sitemap before submitting.
  const wanted = paths.map((p) => normalize(`${SITE}${p}`));
  let live = new Set(sitemap.map(normalize));
  for (let attempt = 1; !DRY_RUN; attempt++) {
    const missing = wanted.filter((u) => !live.has(u));
    if ((await keyFileIsLive(key)) && missing.length === 0) break;
    if (attempt === 8) {
      if (!(await keyFileIsLive(key))) throw new Error(`Key file ${SITE}/${key}.txt is not being served`);
      console.log(`Not in the live sitemap after waiting, skipping: ${missing.join(", ")}`);
      break;
    }
    await sleep(20_000);
    live = new Set((await liveSitemapUrls()).map(normalize));
  }

  // Submit the canonical form: the homepage with a trailing slash, other pages without.
  const urlList = wanted.filter((u) => live.has(u)).map((u) => (u === SITE ? `${SITE}/` : u));
  console.log(urlList.map((u) => `  ${u}`).join("\n"));
  if (DRY_RUN) {
    console.log(`Dry run — would submit ${urlList.length} URLs.`);
    return;
  }
  if (urlList.length === 0) return;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key,
      keyLocation: `${SITE}/${key}.txt`,
      urlList,
    }),
  });
  // 200 = accepted, 202 = accepted while the key is still being verified.
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow rejected the submission: ${res.status} ${await res.text()}`);
  }
  console.log(`Submitted ${urlList.length} URLs to IndexNow (HTTP ${res.status}).`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
