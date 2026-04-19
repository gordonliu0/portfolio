# Naming Analysis Report

## Summary
- Files analyzed: `app/`, `components/`, `mdx-components.tsx`
- Issues found: 12 (2 critical, 4 major, 6 minor)

---

## Critical (2)

### `app/projects/[slug]/view.tsx:5`
**Current**: `ReportView`
**Issue**: Misleading — returns `null`, actually fires a page-view increment side effect
**Suggestion**: `TrackPageView` or `PageViewTracker`
**Reason**: Name should reflect telemetry, not rendering

### `app/projects/[slug]/page.tsx:7`
**Current**: `PostPage`
**Issue**: Wrong domain — renders a project, not a post (uses `getProject()`, `project.meta`)
**Suggestion**: `ProjectPage`
**Reason**: Align with `/projects/` route and data model

---

## Major (4)

### `app/projects/[slug]/header.tsx:24`
**Current**: `Header`
**Issue**: Too generic; collides with other headers
**Suggestion**: `ProjectHeader`
**Reason**: Disambiguate by domain

### `app/projects/_data.ts:19`
**Current**: `PROJECTS_DIR`
**Issue**: Abbreviated constant in a codebase trending toward full words
**Suggestion**: `PROJECTS_DIRECTORY`
**Reason**: Consistency; abbreviation adds no value

### `app/projects/_data.ts:36`
**Current**: `ascending`
**Issue**: Adjective alone — doesn't say what's sorted or by what
**Suggestion**: `projectsByDateAscending`
**Reason**: Subject + order makes intent obvious

### `app/projects/_data.ts:39`
**Current**: `idBySlug`
**Issue**: Ambiguous — actually maps slug → zero-padded sequential display number
**Suggestion**: `displayNumberBySlug`
**Reason**: Distinguishes display numbering from metadata ID lookup

---

## Minor (6)

### `app/api/incr/` (directory)
**Current**: `incr`
**Issue**: Opaque abbreviation for endpoint path
**Suggestion**: `pageviews` or `track-view`
**Reason**: Route names should be self-explanatory

### `app/projects/page.tsx:8`
**Current**: `sorted`
**Issue**: Doesn't specify what or which order
**Suggestion**: `projectsByDateDescending`
**Reason**: Parallel with `_data.ts` sort naming

### `components/Page.tsx:4`
**Current**: `gutter`
**Issue**: Print-design jargon in a web component
**Suggestion**: `sidebar`
**Reason**: Web-idiomatic terminology

### `components/NavBar.tsx:6`
**Current**: `nav`
**Issue**: Abbreviated + shadows the concept itself
**Suggestion**: `navItems`
**Reason**: Clarifies it's the item list, not the nav element

### `app/page.tsx:3`
**Current**: `socials`
**Issue**: Colloquial
**Suggestion**: `socialLinks`
**Reason**: Describes what the array holds

### `app/page.tsx:9`
**Current**: `interests`
**Issue**: Generic for a "Currently" section list
**Suggestion**: `currentInterests`
**Reason**: Ties variable to UI section

---

## Patterns Worth Standardizing

- **Abbreviations**: `PROJECTS_DIR`, `incr`, `nav` — project otherwise favors full words. Pick one and enforce.
- **Sort variable naming**: `ascending` / `sorted` both appear — adopt `{collection}By{Field}{Direction}`.
- **Component specificity**: `Header`, `ReportView` — namespace by domain (`ProjectHeader`, `TrackPageView`).

Want me to apply any of these renames?
