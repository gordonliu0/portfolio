# Naming Audit — Final

Synthesized from the union of wv5, wv6, wv7 runs. Only findings caught by multiple runs or independently verified are included. Fabrications (e.g. wv4's `ascending`-contradicting-comparator claim) and single-run speculative renames excluded.

---

## Tier 1 — Critical (user-visible or actively misleading)

### 1. `ReportView` → `TrackPageview` (+ file rename)

- **Component**: `app/projects/[slug]/view.tsx:5` — rename `ReportView` → `TrackPageview`
- **File**: rename `view.tsx` → `track-pageview.tsx`
- **Why**: component returns `null` and only fires a POST to increment pageview; name implies rendered UI.
- **Dependencies**: update import in `app/projects/[slug]/page.tsx:7` to the new component and file name.

### 2. `PostPage` → `ProjectPage`

- **Symbol**: `app/projects/[slug]/page.tsx:17`
- **Why**: route is `/projects/[slug]`, data type is `Project`, no "post" concept anywhere in codebase.
- **Dependencies**: default export, no callers outside the route.

### 3. `/api/incr` → `/api/pageviews`

- **Directory**: rename `app/api/incr/` → `app/api/pageviews/`
- **Why**: `incr` leaks the Redis primitive into a public URL. Callers care about "record a pageview," not the storage operation. Also matches the Redis key prefix `pageviews:projects:` already in use.
- **Dependencies**: update `fetch` URL inside the tracker (`track-pageview.tsx`) from `/api/incr` to `/api/pageviews`.

---

## Tier 2 — High (public-surface names, convention violations)

### 4. `Page` component → `SidebarLayout`

- **Symbol + file**: `components/Page.tsx:3` — rename component `Page` → `SidebarLayout`; rename file `components/Page.tsx` → `components/SidebarLayout.tsx`.
- **Why**: `Page` is ungreppable (grep gets swamped by Next.js `page.tsx` conventions everywhere), and the component is actually a content-with-sidebar layout, not a "page" in any Next.js sense.
- **Dependencies**: update imports wherever `Page` is consumed (likely `app/projects/[slug]/page.tsx`).

### 5. `gutter` prop → `sidebar`

- **Prop**: `components/SidebarLayout.tsx:4` (post-rename)
- **Why**: "gutter" is typography jargon for *whitespace between columns*; this prop takes actual content for a sidebar slot. Describes layout, not purpose.
- **Dependencies**: rename prop at declaration and all callsites.

### 6. `Header` → `ProjectHeader` (+ `Props` → `ProjectHeaderProps`)

- **Symbols**: `app/projects/[slug]/header.tsx:24` (`Header` → `ProjectHeader`); `:3` (`Props` → `ProjectHeaderProps`)
- **File**: consider renaming `header.tsx` → `ProjectHeader.tsx` for consistency with the new component name (optional — depends on whether the project uses PascalCase component filenames elsewhere).
- **Why**: `Header` is generic and collides with the `<header>` HTML element. `Props` is ungreppable when multiple files export their own `Props`.
- **Dependencies**: update import in `app/projects/[slug]/page.tsx`.

### 7. `nav` array → `navItems`

- **Symbol**: `components/NavBar.tsx:6`
- **Why**: singular `nav` shadows the `<nav>` element rendered further down. `navItems` distinguishes the data from the element.

### 8. `item.link` → `item.href`

- **Field**: the items in the `navItems` array
- **Why**: `link` is ambiguous (element? URL?); the field holds an anchor target and the rest of the codebase uses `href` (`socials[].href` / `contacts[].href`).
- **Dependencies**: update all `item.link` accesses in `NavBar.tsx` (roughly lines 26, 29, 30).

### 9. `active` → `isActive`

- **Symbol**: `components/NavBar.tsx:25`
- **Why**: project convention for booleans uses `is`/`has` prefix.

---

## Tier 3 — Medium (clarity and consistency, internal)

### 10. `ascending` → `byDateAsc`

- **Symbol**: `app/projects/_data.ts:36`
- **Why**: comparator `a.date - b.date` IS ascending (wv4 fabricated otherwise), so the name is correct, but bare `ascending` reads like a boolean/enum. `byDateAsc` names both subject and direction.

### 11. `sorted` → `visibleProjects`

- **Symbol**: `app/projects/page.tsx:8`
- **Why**: variable is both filtered and sorted; `sorted` hides the filter step. `visibleProjects` names the *result*, not one of the operations that produced it.

### 12. `mod` → `mdxModule`

- **Symbols**: `app/projects/_data.ts:32` and `:52` (two occurrences)
- **Why**: `mod` is ambiguous (modulo? modification? module?). `mdxModule` names what it is.
- **Alternative**: destructure at import site (`const { metadata, default: Component } = await import(...)`) — would eliminate the intermediate variable entirely; arguably cleaner.

### 13. `buf` → `digest`, `hash` → `digestHex`

- **Symbols**: `app/api/incr/route.ts:26-32` (becomes `app/api/pageviews/route.ts` after Tier 1)
- **Why**: `buf` is the SHA-256 digest as an `ArrayBuffer`; `hash` is its hex string. The names don't distinguish the types.

### 14. `socials` → `contacts` (+ `s` → `contact`)

- **Symbols**: `app/page.tsx:3` (`socials` → `contacts`); `:65` (`.map((s) =>` → `.map((contact) =>`)
- **Why**: the array contains Email alongside GitHub/Instagram — Email isn't a social. `contacts` accurately describes the full set.
- **UI heading**: heading reads "Reach" — keep as-is (verb-form heading is a deliberate voice choice); only the variable name is wrong.

### 15. `ProjectMeta` → `ProjectFrontmatter`

- **Symbol**: `app/projects/_data.ts:5`
- **Why**: `Project = ProjectMeta & { slug, id }` — readers expect the plain noun to be the richer type. What's currently called `ProjectMeta` is literally the MDX frontmatter. `Project` stays as the enriched record.
- **Dependencies**: all usages of `ProjectMeta` — the `.mdx` dynamic imports type-cast to it.

### 16. `_data.ts` → `projects.ts`

- **File**: rename `app/projects/_data.ts` → `app/projects/projects.ts`
- **Why**: `_` prefix is a Next.js convention to opt folders out of routing; for a single file in this directory it's noise, and `data` is a generic unsearchable name. `projects.ts` names what the file loads.
- **Dependencies**: update all imports.

---

## Tier 4 — Minor (polish)

### 17. `topic` → `interest` in `interests.map`

- **Symbol**: `app/page.tsx:52`
- **Why**: collection is `interests`, singular should be `interest`, not `topic`. Plural/singular symmetry.

### 18. Redis key `"deduplicate"` → `"dedupe"`

- **Symbol**: `app/api/incr/route.ts:35` (becomes `pageviews/route.ts` post-Tier 1)
- **Why**: other keys in this file use noun namespaces (`pageviews:projects:<slug>`). `deduplicate` is a verb and breaks the pattern.

### 19. `published?: boolean` → `draft?: boolean`

- **Symbols**: `app/projects/_data.ts:14` (field on `ProjectFrontmatter`); `app/projects/page.tsx:9` (filter).
- **Why**: current filter is `.filter((p) => p.published !== false)` — a double-negative that means "include when not explicitly false." Inverting to `draft` gives a positive check: `.filter((p) => !p.draft)`.
- **Dependencies**: any MDX file with `published: false` in its frontmatter must be migrated to `draft: true`. Files without the field are unaffected.

---

## UI content decision

**Heading "Currently" at `app/page.tsx:49`** → rename to **"Interests"** to match the `interests` data below it. Keeps the variable name simple and preserves the "this is a topic list" meaning. (Alternative: rename variable to `currentFocus` and keep heading. Rejected as more invasive.)

---

## Implementation order

1. **Tier 1** first — critical, user-visible, cascading (file + directory renames drive later import updates).
2. **Tier 2** — resolves the `Page` component name, which is referenced throughout.
3. **Tier 3** — internal clarity, no cross-file dependencies once Tier 2 completes.
4. **Tier 4** — polish, safe last.
5. After each tier: run typecheck (`pnpm dlx tsc --noEmit` or equivalent) and visually verify the dev server still renders.

## Deliberately excluded

- `PROJECTS_DIR` → `projectsDir` — opinionated; SCREAMING_SNAKE for module-level constants is a legitimate convention.
- `getAllSlugs` / `getAllProjects` / `getProject` asymmetry — structural observation, not a rename.
- `rows` in `header.tsx:25` — acceptable in local scope; rename to `metaRows` / `fields` is optional.
- WV4's `ascending`-contradicts-comparator claim — verified fabrication.
- WV6-1's `isNew → firstViewForIp` — speculative Redis-semantic claim, guardrail excluded it.
