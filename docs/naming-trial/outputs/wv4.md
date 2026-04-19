## Naming Analysis Report

### Critical

1. **`app/projects/[slug]/page.tsx:17`** — `PostPage` component handles **projects**, not posts. Rename to `ProjectPage`.
2. **`app/projects/[slug]/view.tsx:5`** — `ReportView` is vague for a view-tracking side-effect component. Rename to `PageViewTracker` or `ViewTracker`. Update import at `page.tsx:7`.
3. **`app/projects/_data.ts:36`** — Variable `ascending` contradicts the descending sort (`b.date - a.date`). Rename to `byNewestFirst` or `chronological`.

### Moderate

4. **`components/Page.tsx:3-8`** — Prop `gutter` is layout jargon. Rename to `sidebar`, `aside`, or `metadata` to match its role.
5. **`app/projects/[slug]/header.tsx:25`** — `rows` array lacks a named type. Extract `HeaderRow` interface for clarity at call sites.

### Minor

6. **`mdx-components.tsx:7`** — Generic `...props` rest spread. Acceptable here since MDX props are opaque, but a typed alias would aid readability.
7. **`app/projects/_data.ts:19`** — `PROJECTS_DIR` is fine; no change needed.

### Well-named (no action)

- MDX frontmatter keys in `content/projects/*.mdx` (`title`, `description`, `date`, etc.)
- `formatDate(iso: string)` — parameter name is specific and clear
- `app/page.tsx` constants `socials`, `interests` — consistent lowercase convention

**Top priorities:** fix `PostPage → ProjectPage`, `ReportView → PageViewTracker`, and the misleading `ascending` variable.
