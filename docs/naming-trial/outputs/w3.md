## Naming Analysis — w3

### Critical (actively misleading)

**`ReportView`** — `app/projects/[slug]/view.tsx:5` + imported in `page.tsx:7`
The component returns `null`. The name suggests a rendered view; it's actually a fire-and-forget effect that pings the view-count endpoint. Readers open this file expecting UI. Rename to `TrackPageView` or `RecordView`, and move/rename the file (`view.tsx` → `track-page-view.tsx`).

**`/api/incr` route** — `app/api/incr/route.ts`
`incr` is a cryptic abbreviation and violates the project's "avoid abbreviations" rule in `CLAUDE.md`. The route increments project page views. Rename to `/api/views` or `/api/page-views`. Update the call in `view.tsx:7`.

**`PostPage`** — `app/projects/[slug]/page.tsx:17`
Route is `/projects/[slug]`, the data type is `Project`, but the component is `PostPage` (blog vocabulary). Rename to `ProjectPage`.

**`Page` component + `gutter` prop** — `components/Page.tsx`
Two issues: (a) `Page` is a Next.js routing convention — using it for a layout wrapper invites confusion; (b) `gutter` means inter-column spacing in typography/CSS, but here it's a sidebar slot holding a back-link. Rename component to `ProjectLayout` or `SidebarLayout`, and `gutter` → `sidebar` (or `aside`).

### High

**`nav` items use `link` instead of `href`** — `components/NavBar.tsx:6-8`, used at `:26,29,30`
Inconsistent with HTML, with `socials` in `app/page.tsx:3-7` (which uses `href`), and with anchor semantics. Rename field to `href`.

**`interests` vs section label "Currently"** — `app/page.tsx:9, 49`
Variable says one thing; UI says another. Pick one: rename to `currentFocus` (matches UI) or change the heading to "Interests".

**`_data.ts`** — `app/projects/_data.ts`
Vague — every route can have "data". This file is specifically project-MDX loading. Rename to `projects.ts` or `project-loader.ts`.

### Medium

- **`mod`** — `_data.ts:32, 52`. Abbreviation for "module". Use `mdxModule`.
- **`buf`** — `api/incr/route.ts:26`. Use `hashBuffer` (or inline-chain so the intermediate isn't named).
- **`sorted`** — `app/projects/page.tsx:8`. Use `projectsByDateDesc`.
- **`ascending`** — `_data.ts:36`. Use `projectsByDateAsc`.
- **`rows`** in header — `app/projects/[slug]/header.tsx:25`. Use `metadataRows`.
- **`Component`** destructured — `app/projects/[slug]/page.tsx:32`. Use `MdxContent`.

### Minor

- **`socials`** → `socialLinks` (`app/page.tsx:3`).
- **`formatHost`** → `formatHostname` (`header.tsx:16`).
- Single-letter map params: `s` in `socials.map` (`page.tsx:65`), `p`/`a`/`b` in sorts/filters (`projects/page.tsx:9-10`, `_data.ts:37,42,49`, `header.tsx:36`). Expand to `social`, `project`, `left`/`right` (or `earlier`/`later`).
- **`isNew`** — `api/incr/route.ts:35`. Accurate but narrow; `wasFirstView` reads closer to the domain meaning.

### Top 3 to fix first
1. `ReportView` — name/behavior mismatch is the single most misleading thing in the codebase.
2. `/api/incr` → `/api/views` — violates stated naming rule and is cryptic at the URL level (user-visible).
3. `PostPage` → `ProjectPage` — wrong domain word for the route.
