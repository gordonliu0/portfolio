# Portfolio — Design Language

_Last updated: 2026-04-18_

## Philosophy

Design serves the work. Every element answers one question — what does this do — and if the answer is "it looks good" or "it signals seriousness," it gets cut. Restraint isn't an aesthetic commitment; it's the byproduct of removing everything that isn't earning its place.

This generalizes. Good CLIs earn every flag. Good products don't reassure the user that the system is running — they just run. Good writing trusts the reader. The portfolio should feel the same: no hero gradients, no scroll-triggered proof-of-life animations, no dark mode. Structure that's doing real work stays visible — grid, hairlines, numbering. Structure that isn't doing work doesn't exist.

Motion follows the same logic. Most of the site is still because text is still, and text is the work. When motion appears — a project opening, a section transition, an index collapsing — it lands with weight. A heavy door that swings cleanly once, not a windchime in the background.

The two-tone system, the single type family, the scale-and-weight hierarchy, the hairlines instead of boxes — all of it is downstream of this, not a style choice. Two colors because a third would have to justify itself. One family because a second would have to justify itself. Numbers because §2.3 is a faster address than "that part toward the end of the second section." Everything not pulling weight is removed.

---

## Design principles

1. **Every element earns its place.** If I can't name what it does, it doesn't ship.
2. **Structure stays visible.** Grid, hairlines, numbering — the bones of the page are load-bearing and honest about it. Nothing hides behind cards, gradients, or chrome.
3. **Restraint is the default; intensity is reserved.** The page is mostly still. What breaks — in scale, motion, or density — breaks because it matters.
4. **Scale and weight carry hierarchy.** Not color, not boxes, not ornament.
5. **Numbering is addressing.** §2.3, fig. 5, [1], project 014 — real pointers, referenceable, never texture.
6. **One palette. One family. Two cuts.** Cool off-white paper, near-black ink. Geist Sans and Geist Mono. One mode — no dark toggle. Adding anything means rewriting this line.
7. **Motion is rare and decisive.** Small fades and 1–2px translations for minor feedback. Anything larger is reserved and earns its budget each time.
8. **Content leads; chrome disappears.** The work signals craft. The frame doesn't need to.

---

## Typography

- **One family**: `Geist Sans` (variable). Weight is the only way hierarchy changes in prose. Never introduce a second display family.
- **Code and system layer**: `Geist Mono`. Used for code blocks and for anything that reads as *addressing* or *data* rather than prose — section numbers, figure references, dates, filepaths, project IDs, footnote markers, nav, breadcrumbs, indexes.
- **Scale is the loudest voice.** Display headings go uncomfortably large (`text-6xl`+). Metadata goes uncomfortably small (`text-xs`, tracked). The gap between them carries the hierarchy — not color, not decoration.
- **UPPERCASE, tracked** (`tracking-wide` / `tracking-widest`) for editorial headlines and section labels. Never in body copy.
- **Body**: `prose prose-lg` defaults, no custom overrides. `max-w-prose` column, left-aligned.
- **Line-height**: tight on display (`leading-none` / `leading-tight`), generous on body (`leading-relaxed`).

## Color

One palette. Cool off-white paper, near-black ink. No warmth. No dark mode — the paper page is the page. If a reader wants a dark variant, the OS or browser can handle it; we don't ship a toggle.

| Token         | Value       | Role                                              |
| ------------- | ----------- | ------------------------------------------------- |
| `--paper`     | `#E6E8E7`   | Page background — cool off-white, no warmth       |
| `--ink`       | `#171819`   | Display, UI chrome, rules, text outside `.prose`  |
| `--hairline`  | `#CFD1CF`   | 1px rules, dividers                               |
| `--muted`     | `#686A69`   | Secondary text, sidenotes, captions, mono system  |

No accent colors. If something truly needs to pop, it's a weight shift, a scale shift, or a hairline — not a color. A third color would have to justify itself against this rule, and so far nothing has.

**Prose, colors only.** Stock Tailwind `prose` handles typography well — we don't touch its sizing, spacing, or weights. The one exception is color: the zinc neutrals clash visibly against paper/ink, so we remap `--tw-prose-*` variables to our tokens in `global.css`. Typography stays prose-default; color belongs to the palette.

## Layout

- **Visible grid.** Columns stay in the same positions across every page. Alignment is strict enough to be obvious.
- **Two columns** where it serves the content: main column for prose, narrow gutter (left) for footnotes, annotations, dates, figure refs.
- Generous vertical rhythm. Sections separated by whitespace and a **1px hairline** (`border-[--hairline]`), never by cards or filled blocks.
- **Left-align** everything. No centered body copy. No justified text.
- No background images, no gradients, no noise textures, no paper grain. The page is paper or ink — the warmth is in the tones, not the texture.

### Grid spec

- **Main column**: `max-w-prose` (~65ch, ≈ 680px). Its left edge sits in the same x-position on every page.
- **Gutter**: 12rem (192px), fixed, to the *left* of the main column. Used for sidenotes, section numbers, dates, figure refs.
- **Desktop grid** (`lg:` and above, ≥ 1024px): `grid-cols-[12rem_minmax(0,65ch)_1fr]`. The gutter-to-main boundary carries a 1px hairline where it helps orient the eye; otherwise whitespace alone.
- **Below `lg`**: gutter collapses. Sidenotes render inline beneath the paragraph that references them, in the same mono/muted style. Footnotes collect at the bottom of the page.
- **Vertical rhythm**: everything snaps to a 4px baseline (Tailwind's default spacing unit). Prose line-height is inherited from `prose-lg`; UI chrome uses `leading-tight` (1.25) or `leading-relaxed` (1.625) — no in-between.

## Numbering and references

Numbering is addressing, not ornament. Every number on the page should be something you could point to in conversation.

- **Sections**: `§1`, `§2.3`. Mono, muted, inline with the heading.
- **Figures**: `fig. 5`. Mono, `text-xs`, directly beneath the artifact.
- **Footnotes**: `[1]`, `[2]`. Mono superscripts in body, keyed to gutter notes.
- **Projects**: three-digit IDs — `001`, `002`, `003`, ... Assigned chronologically at publish time. Three digits leaves room to grow. Mono, used in the index and at the top of each project page.

Never number something just to number it. An unnumbered section is fine if the section doesn't need a reference.

## Footnotes and sidenotes

- Inline markers in body (`[1]`), keyed to small copy in the gutter.
- Gutter type: `text-xs`, `--muted`, generous line-height.
- First-person lives here when the body is third-person. Side commentary, asides, second thoughts.

## Components

- **Links**: underline on hover only. Color follows surrounding text.
- **Buttons**: text with a hairline underline on hover. No filled rectangles, no rounded corners, no shadows.
- **Images**: flat on the page. No rounded corners, no drop shadows, no borders. Captions render in mono, small, directly underneath with a `fig. N` reference.
- **Code blocks**: monospace, hairline top and bottom, no background fill.
- **Cards**: prefer whitespace and hairlines over boxes. If a card must exist, it is a single hairline border — nothing else.
- **Tables / spec lists**: mono, hairline rules, no zebra striping, no fill. Used for project metadata (stack, dates, collaborators, outcomes) and anywhere structured data reads better than prose.

## Motion

Most of the page is still. When motion happens, it lands with weight.

- **Minor feedback** (link hover, focus, small state changes): 120–180ms, fade or 1–2px translation, `ease-out`. Should feel like the page acknowledging a touch, nothing more.
- **Major transitions** (opening a project, section changes, index collapse): reserved. When used, they're deliberate — 350–500ms, carefully eased, one movement per transition. A door swinging once, not a sequence.
- **Never**: springs, bounces, parallax, scale transforms on hover, scroll-triggered reveals for their own sake, typewriter effects, shimmer, glow.
- If a motion isn't doing a specific job — feedback, orientation, emphasis — it doesn't ship.

## Voice

- Declarative, plain, confident.
- Body in third-person when describing work; sidenotes in first-person when personal.
- No marketing language. No exclamation points. No CTAs that sound like CTAs.
- Trust the reader to finish sentences. Trust the work to speak first.

---

## What this folder is for

`/docs/` holds long-lived project thinking. Short-term plans live in conversation or git commits — not here.

- `design-language.md` — this document. The source of truth for visual and voice decisions.
- `prds/` — product requirement docs for new features (create when needed).
- `releases/` — release notes and changelog entries (create when needed).

Before any UI change, check this doc. If the change requires breaking a rule here, update the doc in the same PR and explain why.