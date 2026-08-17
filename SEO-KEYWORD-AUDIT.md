# Keyword audit — texttoemo.com

**Source:** Google Keyword Planner, account 238-961-3053 (Sahil Bora)
**Settings:** United States · Google · All languages · Aug 2025 – Jul 2026
**Pulled:** 2026-08-17

> **Data caveat:** this Ads account has no active spend, so Keyword Planner returns
> *bucketed ranges* (10–100, 1k–10k) rather than exact monthly volumes. Bids display
> in AUD because the account is AUD-denominated, even though targeting is US.
> Volumes group "close variants," so each figure covers a family of phrasings.

---

## Part 1 — What the 13 published posts actually target

| Post slug | Target keyword | Avg. monthly searches (US) | Competition | Verdict |
|---|---|---|---|---|
| ai-diss-track-generator | ai diss track generator | **100 – 1k** | Low | Keep — best performer in the set |
| song-for-your-crush | song for your crush | **100 – 1k** | Low | Keep, but CPC $0.03–0.10 signals zero commercial intent |
| how-to-make-an-emo-song | how to make an emo song | 10 – 100 | Medium | Thin |
| what-makes-a-song-emo | what makes a song emo | 10 – 100 | Low | Thin |
| how-to-write-emo-lyrics | how to write emo lyrics | 10 – 100 | Low | Thin |
| songs-like-emo-bands | songs that sound like paramore | 10 – 100 | Low | Thin |
| what-makes-a-great-emo-ballad | emo ballad | 10 – 100 | Low | Thin |
| make-a-song-about-someone | make a song about someone | **0 – 10** | Medium | Effectively zero |
| turn-your-words-into-an-emo-song | turn your texts into an emo song | **no data** | — | Below measurement floor |
| emo-breakup-song | emo breakup song | **no data** | — | Below measurement floor |
| emo-song-ideas | emo song ideas | **no data** | — | Below measurement floor |
| how-to-make-a-sad-song-with-ai | how to make a sad song with ai | **no data** | — | Below measurement floor |
| song-for-your-best-friend | song for your best friend | **no data** | — | Below measurement floor |

**Finding:** 11 of 13 posts target ≤100 searches/month. Five are below Keyword
Planner's measurement floor entirely. Ranking #1 on every single one of these would
still produce only a few hundred sessions/month combined.

The root cause: "emo" is a *style modifier*, not a *demand category*. Nobody searches
for the genre — they search for the outcome.

---

## Part 2 — Where the demand actually is

| Keyword | Avg. monthly searches (US) | Competition | Top-of-page bid | Note |
|---|---|---|---|---|
| ai song generator | **10k – 100k** | Medium | A$0.62 – 4.50 | Head term |
| ai song maker | **10k – 100k** | Medium | A$0.31 – 3.35 | Head term |
| ai music generator | **10k – 100k** | **Low** | A$0.86 – 5.16 | High volume, low competition |
| ai music generator free | **10k – 100k** | Medium | A$0.72 – 4.32 | Free-intent |
| personalized song gift | **1k – 10k** | High | **A$4.84 – 14.21** | Highest commercial value in the set |
| free ai music generator | 1k – 10k | Medium | A$0.79 – 4.28 | |
| ai song generator free | 1k – 10k | Medium | A$0.51 – 3.35 | |
| ai song creator | 1k – 10k | High | A$1.04 – 5.22 | |
| ai cover song generator | 1k – 10k | Low | A$1.16 – 3.98 | |
| song generator ai | 1k – 10k | Medium | A$0.44 – 4.06 | |
| song about my ex | 100 – 1k | Low | — | **+900% three-month change** |
| emo song generator | 10 – 100 | High | A$0.75 – 5.32 | The brand's own category is tiny |
| pop punk song generator | 10 – 100 | High | A$0.91 – 2.55 | |
| birthday song generator | 10 – 100 | Low | A$1.14 – 4.50 | Weaker than expected |

### Two standouts

**`personalized song gift` — 1k–10k, top-of-page bid up to A$14.21.**
That bid is 3–10× everything else on this list. Advertisers only pay $14 a click when
the term converts. It's gifting intent, it has budget behind it, and Text to Emo
genuinely serves it. Nothing on the blog addresses it.

**`song about my ex` — 100–1k, Low competition, +900% three-month growth.**
Rising fast, winnable, and it maps onto the existing `emo-breakup-song` post — which
currently targets a phrase with no measurable volume at all.

---

## Part 3 — Recommendation

1. **Stop writing genre-first posts.** "Emo [x]" terms are 10–100/month ceilings.
   Emo is the *differentiator in the copy*, not the *entry point in the query*.

2. **Build a hub around the generic head terms** (`ai song generator`,
   `ai music generator`) and let the emo angle be why someone picks this tool over
   Suno or LoudMe. Competition is high, but `ai music generator` shows **Low**
   competition at 10k–100k volume, which is unusual and worth attacking.

3. **Write the gift-intent cluster.** `personalized song gift` and its variants are
   the only terms here with proven commercial value. This is a different buyer
   (someone shopping for a present) than the current content assumes (someone
   processing a breakup at 2am).

4. **Re-target, don't delete, the existing posts.** Most are decent writing pointed at
   nothing. `emo-breakup-song` → re-target `song about my ex`. Consolidate the five
   below-floor posts into one or two stronger pages rather than leaving thin pages
   competing with each other.

5. **Verify with Search Console before acting.** Keyword Planner measures *ad* demand
   and hides the long tail below ~10/month. GSC will show which of these posts are
   actually pulling impressions — some below-floor terms may still be earning traffic
   from phrasings Planner buckets away. Export Performance → Queries and re-run
   this audit against real impression data.

## Next-run rule for the scheduled task

No post ships unless its target keyword has been checked in Keyword Planner and clears
**100+ monthly US searches**, with the figure recorded in the run report.

---

# Part 4 — Search Console reality check (added 2026-08-17)

**Property:** sc-domain:texttoemo.com · Last 3 months · Web search
**Totals: 13 clicks · 1,390 impressions · 0.9% CTR · avg position 9.9**

Recommendation #5 was right, and it changes the picture. Keyword Planner said
`turn your texts into an emo song` had **no data**. GSC shows it is the site's single
largest demand pocket — roughly 100+ impressions across a dozen phrasings.

### Top queries by impressions

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| what elements define a great emo ballad? | **120** | **5.0** | **0** |
| how to turn texts into an emo song | 38 | 10.3 | 0 |
| turn texts into emo song | 21 | 26.3 | 0 |
| turn texts into an emo song | 10 | 8.8 | 0 |
| what makes a song emo | 9 | 9.1 | 0 |
| ai emo song generator | 9 | 20.2 | 0 |
| how do you turn texts into an emo song | 8 | 7.5 | 0 |
| what elements define a classic emo ballad? | 8 | 9.3 | 0 |
| emo song generator | 7 | 24.1 | 0 |
| what defines a great emo ballad? | 6 | 8.7 | 0 |
| how to make an emo song from texts | 5 | 5.4 | 0 |
| punk lyrics generator | 5 | **79.8** | 0 |
| make an emo song from texts | 4 | 5.0 | 0 |
| how to make texts into emo song | 4 | 5.5 | 0 |
| turning text into emo song | 4 | 9.5 | 0 |
| what is an emo song | 4 | 12.0 | 0 |

48 queries total. Long tail includes `punk vs emo music`, `difference between punk and
emo`, `emo song title generator`, `make a song for my best friend` (pos 73),
`diss track ai` (pos 76), `how to write a diss track` (pos 95.5).

### Three findings that change the plan

**1. The site ranks but nobody clicks.** Position 5.0 on the top query with 120
impressions and *zero* clicks. Average position 9.9 with 0.9% CTR. A page at position 5
should see 5–10% CTR. This is a title/meta and AI-Overview-absorption problem, not a
ranking problem — and it is cheaper to fix than any new content.

**2. Question-shaped queries are being eaten.** Every high-impression query is phrased
as a question (`what elements define a great emo ballad?`). Google answers those in AI
Overviews without sending a click. Content that *answers* loses; content that *does
something* (a generator, a tool) still earns the click.

**3. The real demand is transactional, not editorial.** `turn texts into an emo song`
and its variants are people looking for **the tool**, not an article about the tool.
They are landing on blog posts. They should land on the generator.

**4. Zero visibility on head terms.** Not one impression for `ai song generator`,
`ai music generator`, or any gift-intent query. The site does not exist in the
categories where the volume is.

---

# Part 5 — Gift-intent cluster (Keyword Planner, US, Aug 2025 – Jul 2026)

| Keyword | Avg. monthly searches | Competition | Top-of-page bid |
|---|---|---|---|
| personalized song gift | **1k – 10k** | High | **A$4.84 – 14.21** |
| custom song gift | **1k – 10k** | High | **A$5.05 – 14.45** |
| anniversary song | **1k – 10k** | Low | A$0.06 – 5.88 |
| song as a gift | 100 – 1k (**+900% YoY**) | High | A$3.09 – 8.07 |
| personalized song for boyfriend | 10 – 100 | Medium | A$3.53 – 10.03 |
| custom song for someone | no data | — | — |
| personalized song for girlfriend | no data | — | — |
| make a song for someone as a gift | no data | — | — |
| wedding song generator | no data | — | — |
| song gift for mom | no data | — | — |

The cluster head is `personalized song gift` + `custom song gift` — both 1k–10k with
~A$14 top-of-page bids, the highest commercial signal anywhere in this research.
`anniversary song` has the volume but Low competition and a A$0.06 floor bid, which
means most of that traffic is people looking for *songs about anniversaries*, not
buyers. Treat it as secondary.
