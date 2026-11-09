// Renders the app icon set (home-screen icons, Apple touch icon, favicon) from
// one SVG so they always match. Re-run after changing the design:
//
//   node scripts/generate-pwa-icons.mjs
//
// Needs rsvg-convert (brew install librsvg). Outputs are committed, so the
// build itself never runs this. public/offline.html inlines a copy of the tab
// icon (app/icon.svg) so it works with no network — update it by hand too.

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// A broken heart in the brand gradient (pink → purple → cyan) on the site's
// near-black. Drawn in a 24-unit space and scaled into a 512 canvas.
const HEART =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const CRACK = "12,4.6 10.3,8.9 13.5,12.2 10.7,15.7 12.5,19.2 12,22.5";

/**
 * @param {object} o
 * @param {number} o.scale  heart size: 24-unit space → px in a 512 canvas
 * @param {number} o.radius corner radius of the background (0 = full bleed)
 */
function iconSvg({ scale, radius }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="42%" r="80%">
      <stop offset="0" stop-color="#22093d"/>
      <stop offset="0.6" stop-color="#12041f"/>
      <stop offset="1" stop-color="#0a0208"/>
    </radialGradient>
    <linearGradient id="heart" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff2d78"/>
      <stop offset="0.55" stop-color="#9b30ff"/>
      <stop offset="1" stop-color="#00cfff"/>
    </linearGradient>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="1.4"/>
    </filter>
    <mask id="crack" maskUnits="userSpaceOnUse" x="-6" y="-6" width="36" height="36">
      <rect x="-6" y="-6" width="36" height="36" fill="#fff"/>
      <polyline points="${CRACK}" fill="none" stroke="#000" stroke-width="1.15" stroke-linejoin="miter" stroke-miterlimit="10"/>
    </mask>
  </defs>
  <rect width="512" height="512" rx="${radius}" fill="url(#bg)"/>
  <g transform="translate(256 262) scale(${scale}) translate(-12 -12.2)">
    <path d="${HEART}" fill="url(#heart)" filter="url(#glow)" opacity="0.6"/>
    <path d="${HEART}" fill="url(#heart)" mask="url(#crack)"/>
  </g>
</svg>
`;
}

const tmp = mkdtempSync(join(tmpdir(), "tte-icons-"));

function render(svg, size, out) {
  const src = join(tmp, "icon.svg");
  writeFileSync(src, svg);
  mkdirSync(dirname(out), { recursive: true });
  execFileSync("rsvg-convert", ["-w", String(size), "-h", String(size), "-o", out, src]);
}

// "any": full-bleed square — launchers and iOS round the corners themselves.
const any = iconSvg({ scale: 15, radius: 0 });
// "maskable": the heart sits inside the 80% safe zone so circle/squircle
// masks on Android never clip it.
const maskable = iconSvg({ scale: 11.5, radius: 0 });
// Browser tab: rounded tile, heart as large as it can be at 16px.
const tab = iconSvg({ scale: 18, radius: 112 });

render(any, 192, join(root, "public/icons/icon-192.png"));
render(any, 512, join(root, "public/icons/icon-512.png"));
render(maskable, 192, join(root, "public/icons/icon-maskable-192.png"));
render(maskable, 512, join(root, "public/icons/icon-maskable-512.png"));
// Next.js links app/apple-icon.png as <link rel="apple-touch-icon"> itself.
render(any, 180, join(root, "app/apple-icon.png"));
writeFileSync(join(root, "app/icon.svg"), tab);

// favicon.ico with 16/32/48 PNG entries (ICO allows embedded PNGs).
const sizes = [16, 32, 48];
const pngs = sizes.map((s) => {
  const out = join(tmp, `fav-${s}.png`);
  render(tab, s, out);
  return readFileSync(out);
});
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); // width
  e.writeUInt8(s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
writeFileSync(join(root, "app/favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

rmSync(tmp, { recursive: true, force: true });
console.log("Icons written: public/icons/*, app/apple-icon.png, app/icon.svg, app/favicon.ico");
