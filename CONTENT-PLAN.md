# Content plan — texttoemo.com

Built from `SEO-KEYWORD-AUDIT.md`. Every target below carries a verified US volume
from Google Keyword Planner or a verified impression count from Search Console.
Nothing here is a guess.

**Rule:** no post ships without a recorded volume. Minimum bar is 100+ US searches/month
in Keyword Planner **or** 20+ existing GSC impressions.

---

## Priority 0 — Fix what already ranks (do this first, it's free)

The site earns 1,390 impressions at average position 9.9 and converts 0.9% of them.
Before writing a single new word, capture the traffic already being served.

| # | Action | Why | Evidence |
|---|---|---|---|
| 0.1 | Rewrite `<title>`/meta on `what-makes-a-great-emo-ballad` | Position 5.0, 120 impressions, **0 clicks** | GSC |
| 0.2 | Point `turn-texts-into-emo-song` queries at the generator, not the article | 100+ impressions across 12 phrasings; intent is transactional | GSC |
| 0.3 | Add a generator embed/CTA above the fold on every top-10 ranking post | Users want the tool, they're getting an essay | GSC |
| 0.4 | Rework question-shaped H1s into action-shaped ones | Question phrasing is being absorbed by AI Overviews | GSC |

**Expected impact:** moving CTR from 0.9% to a normal 4% at current impression volume
is roughly 55 clicks/month instead of 13 — a 4× gain with zero new content.

---

## Priority 1 — Head-term hub (`ai song generator`, `ai music generator`)

The category where the volume actually is. Emo becomes the *differentiator in the copy*,
not the entry point in the query.

| Target keyword | Volume (US) | Competition | Page type |
|---|---|---|---|
| ai song generator | **10k – 100k** | Medium | Hub / comparison landing |
| ai music generator | **10k – 100k** | **Low** | Hub (attack this first — Low comp at 10k+ is unusual) |
| ai song maker | **10k – 100k** | Medium | Variant, same hub |
| ai music generator free | **10k – 100k** | Medium | Free-angle page |
| ai song generator free | 1k – 10k | Medium | Merge into free-angle page |
| free ai music generator | 1k – 10k | Medium | Merge into free-angle page |
| song generator ai | 1k – 10k | Medium | Variant, same hub |
| ai cover song generator | 1k – 10k | **Low** | Standalone — Low comp, adjacent feature |

**Angle:** these SERPs are owned by generalists (Suno, Udio, generic "make any genre"
tools). The wedge is *opinionated output*. Nobody wants a tool that makes any genre
mediocrely; the pitch is "this one makes one thing, and makes it properly."

**Honest caveat:** these are the most competitive terms in the research. A domain with
13 clicks/quarter will not rank for `ai song generator` quickly. Treat the hub as a
6–12 month asset, and expect the free-angle and cover-song pages to land first.

---

## Priority 2 — Gift-intent cluster

Different buyer entirely: someone shopping for a present, not someone processing a
breakup at 2am. Highest commercial signal in the whole dataset.

| Target keyword | Volume (US) | Competition | Top-of-page bid |
|---|---|---|---|
| personalized song gift | **1k – 10k** | High | **A$4.84 – 14.21** |
| custom song gift | **1k – 10k** | High | **A$5.05 – 14.45** |
| song as a gift | 100 – 1k (+900% YoY) | High | A$3.09 – 8.07 |
| personalized song for boyfriend | 10 – 100 | Medium | A$3.53 – 10.03 |

**Positioning tension to resolve before writing:** the product is currently an emo/
pop-punk generator with a breakup-and-diss-track personality. Gift buyers want warmth.
These pages need a different voice from the rest of the blog — still specific and
non-corporate, but not sardonic. Worth deciding deliberately rather than drifting into
it.

**Suggested first page:** `personalized song gift` — the head term, and the one where a
"we make one genre, properly" angle differentiates hardest against generic custom-song
services charging $150 and taking two weeks.

---

## Priority 3 — Re-target existing posts (no deletions)

| Existing slug | Current target (volume) | New target | Action |
|---|---|---|---|
| turn-your-words-into-an-emo-song | no data | **turn texts into an emo song** (100+ GSC impressions) | Keep + optimize. This is the site's best asset. Add generator CTA above fold. |
| what-makes-a-great-emo-ballad | emo ballad (10–100) | same | Keep. Fix title/meta — 120 impressions at pos 5, zero clicks. |
| emo-breakup-song | no data | **song about my ex** (100–1k, Low comp, +900% 3mo) | Re-target. Rewrite H1/title/meta, keep body. |
| ai-diss-track-generator | 100–1k | **diss track ai** / **how to write a diss track** | Keep. Currently ranks 76–95; needs on-page work, not a rewrite. |
| song-for-your-crush | 100–1k | same | Keep as-is. Volume is real; commercial intent is nil (A$0.03 CPC). Low priority. |
| what-makes-a-song-emo | 10–100 | **punk vs emo** / **difference between punk and emo** (in GSC) | Re-target toward the comparison queries it already surfaces for. |
| how-to-make-an-emo-song | 10–100 | **make an emo song from texts** (GSC, pos 5.0) | Re-target to the texts angle. |
| how-to-write-emo-lyrics | 10–100 | **punk lyrics generator** (GSC, pos 79.8) | Re-target — the query exists, the ranking is terrible, the page is salvageable. |
| songs-like-emo-bands | 10–100 | — | **Consolidate** into a single "emo & pop punk explained" page with what-makes-a-song-emo. |
| emo-song-ideas | no data | — | **Consolidate** — fold the 50 prompts into the generator page or the texts page as a prompt library. |
| how-to-make-a-sad-song-with-ai | no data | — | **Consolidate** into the head-term hub as a sub-section. |
| make-a-song-about-someone | 0–10 | — | **Consolidate** into the gift cluster or the hub. |
| song-for-your-best-friend | no data | — | **Consolidate**. Published 2026-08-10, 1 impression at position 73. Newest and weakest. |

Five thin pages consolidate into two stronger ones. Nothing gets deleted — merge and
301 so no equity is lost.

---

## Sequencing

1. **Week 1 — Priority 0.** Titles, metas, generator CTAs. Cheapest wins in the plan.
2. **Week 2 — `personalized song gift`.** Highest commercial value, and the gap is total.
3. **Week 3 — `ai music generator`.** Low competition at 10k–100k is the anomaly worth attacking.
4. **Week 4 — Re-targets.** `emo-breakup-song` → `song about my ex` first (rising, low comp).
5. **Ongoing — Consolidations.** Merge the five below-floor pages, 301 the old URLs.
6. **Re-measure in GSC after 30 days.** Impressions and position are the scoreboard, not word count.

---

## Open questions worth deciding

- **Brand voice for gift content.** Does the emo personality stretch to gift buyers, or
  does that cluster need its own register?
- **Product surface for head terms.** Ranking for `ai song generator` with an emo-only
  product may produce high bounce. Is the roadmap generalizing, or is the answer to own
  the "opinionated alternative" framing explicitly?
- **Blog vs landing pages.** The head-term and gift-term targets are commercial. They may
  perform better as landing pages under `/` than as `/blog/` posts.
