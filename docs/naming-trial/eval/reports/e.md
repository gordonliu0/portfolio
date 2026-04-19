Analysis complete. Here's the prioritized list of naming issues I found in this portfolio codebase.

## Critical

**1. `PostPage` → `ProjectPage`** — `app/projects/[slug]/page.tsx:17`
The function sits under `/projects` and renders a project, but is named `PostPage`. Wrong domain vocabulary; a reader searching "Project" won't find it.

**2. `ReportView` → `TrackPageview` (or `PageviewBeacon`)** — `app/projects/[slug]/view.tsx:5`
The component POSTs to increment a pageview counter. `ReportView` reads like "a view that reports something"; it's actually a tracking beacon. Also file `view.tsx` is too generic (CLAUDE.md flags `view`-class names as unsearchable).

**3. `Page` component → `GutterLayout` (or `TwoColumnLayout`)** — `components/Page.tsx:3`
Currently named for the *position* ("a page"), not what it does (two-column layout with a sticky gutter). `Page` collides conceptually with Next's own page files and is ungreppable.

**4. `app/api/incr/` → `app/api/pageviews/`** — `app/api/incr/route.ts`
`incr` leaks the Redis operation. The route's intent is "record a pageview." Name by intent, not implementation.

## Medium

**5. `link` → `href` in NavBar items** — `components/NavBar.tsx:6-8`
`app/page.tsx` already uses `href` in its `socials` array. Same concept, two names. Standardize on `href` (Next.js idiom).

**6. `sorted` → `visibleProjects`** — `app/projects/page.tsx:8`
The variable is both filtered *and* sorted; `sorted` hides the filter. `visibleProjects` or `publishedProjects` names the result, not one of the steps.

**7. `header.tsx` → `Header.tsx`** — `app/projects/[slug]/header.tsx`
The project uses PascalCase filenames for components (`NavBar.tsx`, `Page.tsx`). Lone outlier.

**8. `Props` → `HeaderProps`** — `app/projects/[slug]/header.tsx:3`
Generic `Props` is fine when a file has one component, but it's still ungreppable. With a repo-wide convention of named prop types, switch it.

**9. `project` variable shadows the meta** — `app/projects/[slug]/page.tsx:23-47`
`const project = await getProject(slug)` returns `{ meta, Component }`. Later code reads `project.meta.published`, `project.meta` — calling the wrapper `project` is misleading. Destructure at the call site: `const { meta, Component } = (await getProject(slug)) ?? {}`.

## Minor

**10. `gutter` prop → `side` or `sidebar`** — `components/Page.tsx:4`
"Gutter" is typographic jargon for whitespace; the prop actually holds a sidebar slot (the back-link).

**11. `interests.map((topic) => …)`** — `app/page.tsx:52`
Collection is `interests`; element is `topic`. Pick one vocabulary.

**12. `"Slug not found"` → `"Missing slug in body"`** — `app/api/incr/route.ts:18`
"Not found" implies a lookup failed; here the field is absent from the request.

**13. `Project` type is really `ProjectEntry`** — `app/projects/_data.ts:17`
`Project` = `ProjectMeta & { slug, id }`, but `getProject` returns `{ meta: Project, Component }`. The name `Project` is claimed by the metadata row, leaving the fuller object unnamed. Consider `ProjectEntry` for the row type and reserve `Project` for the richer record — or inline.

Let me know which you'd like me to apply; I'd start with #1–#4 since those are the ones most likely to mislead a reader.
