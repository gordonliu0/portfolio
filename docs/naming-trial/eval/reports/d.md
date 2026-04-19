# Naming Analysis Report — Portfolio Codebase

## Summary
- Files analyzed: 11 TypeScript/TSX source files
- Issues found: 18
- Critical (misleading): 3
- Major (unclear/vague): 8
- Minor (convention): 7

---

## Critical Issues (3)

### `app/projects/[slug]/view.tsx:5`
**Current**: `ReportView` (component) in file `view.tsx`
**Issue**: Misleading — the component renders `null` and has no UI; it's a fire-and-forget tracking side effect. "View" suggests a rendered view.
**Suggestion**: Component → `ViewTracker` or `TrackPageView`; file → `tracker.tsx`
**Reason**: Name should reflect behavior (analytics side effect), not imply UI.

### `app/projects/[slug]/page.tsx:17`
**Current**: `PostPage`
**Issue**: This renders a **project**, not a blog post. Stale/misleading name — no "posts" concept exists in this codebase.
**Suggestion**: `ProjectPage`
**Reason**: Consistency with the surrounding `projects/` routing and `Project` type.

### `app/api/incr/route.ts` (directory name)
**Current**: `/api/incr`
**Issue**: `incr` is an obscure abbreviation of "increment." The endpoint's domain purpose is recording page views, not generic incrementing.
**Suggestion**: `/api/views` or `/api/pageview`
**Reason**: Routes should name the domain concept (pageview) over the primitive operation (increment). Callers in `view.tsx` would read more clearly too.

---

## Major Issues (8)

### `components/NavBar.tsx:25`
**Current**: `const active = …`
**Issue**: Boolean without `is`/`has`/`can` prefix.
**Suggestion**: `const isActive = …`
**Reason**: Project's global conventions file (`CLAUDE.md`) mandates boolean prefixes.

### `components/NavBar.tsx:6`
**Current**: `const nav = [{ label, link }, …]`
**Issue**: Variable shadows the semantic meaning of the `<nav>` element rendered later; also collides conceptually.
**Suggestion**: `const navItems` (and field `link` → `href`)
**Reason**: Plural collections should read as plurals; `href` matches the HTML attribute and the pattern used in `app/page.tsx:3` (`socials[].href`).

### `app/page.tsx:3`
**Current**: `const socials`
**Issue**: Vague plural — "socials" is informal and mixes email (non-social) with GitHub/Instagram.
**Suggestion**: `const contactLinks` or `const externalLinks`
**Reason**: Email is a contact method, not a social. Name should describe the union accurately.

### `app/projects/_data.ts:30`
**Current**: `const metas = await Promise.all(…)`
**Issue**: `metas` is a truncation; also each element is already a full `ProjectMeta & { slug }`, essentially a `Project` minus the id.
**Suggestion**: `const projects`
**Reason**: Matches the return type name and reads naturally.

### `app/projects/_data.ts:49`
**Current**: `const all = await getAllProjects();`
**Issue**: `all` is a generic qualifier with no noun.
**Suggestion**: `const projects`
**Reason**: Name the *thing*, not its cardinality (which is implied by the function name).

### `app/projects/_data.ts:32`
**Current**: `const mod = await import(…)`
**Issue**: `mod` abbreviation.
**Suggestion**: Destructure directly: `const { metadata } = await import(…)` (used in two spots with slightly different needs; the second also needs `default`).
**Reason**: Eliminates the abbreviation and makes the contract (we only care about `metadata` and `default`) explicit.

### `app/api/incr/route.ts:26`
**Current**: `const buf = await crypto.subtle.digest(…)`
**Issue**: `buf` abbreviation in a non-trivial scope.
**Suggestion**: `const ipHashBuffer`
**Reason**: The variable crosses 5+ lines and its content (hash of IP) is not obvious from `buf` alone.

### `app/projects/page.tsx:8`
**Current**: `const sorted = projects.filter(…).sort(…)`
**Issue**: `sorted` describes the *operation*, not the data; also misleading since it's filtered too.
**Suggestion**: `const publishedProjects` (with the sort inlined or named `…ByDateDesc`)
**Reason**: Name the resulting collection, not the last verb applied.

---

## Minor Issues (7)

### `app/projects/[slug]/header.tsx:3`
**Current**: `type Props = { … }`
**Suggestion**: `type HeaderProps`
**Reason**: Local `Props` works, but named `HeaderProps` is searchable and matches common React convention.

### `app/projects/[slug]/header.tsx:32`
**Current**: Row label `"Worked"`
**Issue**: Grammatically awkward label for a date range.
**Suggestion**: `"Period"` or `"Timeline"`
**Reason**: Reads as a noun like every other label (`Published`, `Tags`, `Repository`, `Live`, `Views`).

### `app/projects/[slug]/header.tsx:25`
**Current**: `const rows: {…}[] = []`
**Suggestion**: `const metaRows` or `const fields`
**Reason**: Slightly more specific; `rows` alone is generic.

### `app/api/incr/route.ts:30`
**Current**: `.map((b) => b.toString(16).padStart(2, "0"))`
**Suggestion**: `.map((byte) => byte.toString(16).padStart(2, "0"))`
**Reason**: Single-letter outside a loop counter; `byte` is the domain term.

### `app/projects/page.tsx:9,14`
**Current**: `.filter((p) => …)` / `.sort((a, b) => …)` / `.map((project) => …)`
**Issue**: Inconsistent — one callback uses `project`, another uses `p`.
**Suggestion**: Use `project` throughout.
**Reason**: Internal consistency; `p` is fine in the sort comparator (`a`/`b` is idiomatic there).

### `app/page.tsx:65`
**Current**: `{socials.map((s) => …`
**Suggestion**: `{contactLinks.map((link) => …)` (paired with rename above)
**Reason**: Eliminates single-letter; matches renamed collection.

### `components/Page.tsx:4`
**Current**: prop `gutter`
**Issue**: Borderline — "gutter" is typography jargon for the margin, but here it's rendered inside `<aside>` with navigation-like content (the back arrow).
**Suggestion**: `aside` or `sidebar` (keep `gutter` only if it's an established design-system term here)
**Reason**: HTML element and role suggest `aside` is more intent-revealing. Low priority — acceptable if "gutter" is intentional design vocabulary.

---

## Convention Summary

- **Boolean prefixes**: 1 miss (`active` in NavBar). Rest of codebase is clean (`isNew`, `published`, `isActive` would align).
- **Abbreviations**: `incr`, `buf`, `mod`, `p`, `s`, `b` — all short-hop truncations; per project CLAUDE.md, prefer full words.
- **Single-letter vars**: acceptable only in sort comparators; flagged elsewhere.
- **Misleading names**: `PostPage`, `ReportView`, `incr` are the highest-value fixes — they encode stale or wrong domain concepts.

---

## Recommended Top 3 Renames (highest impact, low risk)

1. `PostPage` → `ProjectPage` — `app/projects/[slug]/page.tsx:17`
2. `ReportView` → `ViewTracker` (+ file `view.tsx` → `tracker.tsx`) — `app/projects/[slug]/view.tsx`
3. `active` → `isActive` — `components/NavBar.tsx:25`

Want me to apply any of these?
