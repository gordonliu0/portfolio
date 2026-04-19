# Naming Analysis Report

## Critical

**1. `ReportView` → `ViewTracker`** — `app/projects/[slug]/view.tsx`
Name says "view/report display" but the component only fires a POST to increment a counter. Misleads readers into expecting rendered output.

**2. `PostPage` → `ProjectPage`** — `app/projects/[slug]/page.tsx:~L20`
Lives under `/projects/[slug]` and renders a `Project`. "Post" is a domain mismatch — no posts exist in this codebase.

**3. `/api/incr` → `/api/views`** — `app/api/incr/route.ts`
`incr` is Redis-implementation jargon leaking into a public URL. Callers care about the resource (views), not the operation.

## High

**4. `nav` → `navItems`** — `components/NavBar.tsx`
Array named in the singular. Violates the plural-for-collections convention already used elsewhere (`socials`, `interests`, `slugs`).

**5. `gutter` → `aside` or `sidebar`** — `components/Page.tsx`
Print-design jargon for a layout slot. `aside` matches the HTML element it likely contains and is domain-standard.

**6. `mod` → `projectModule`** — `app/projects/_data.ts`
Abbreviation loses meaning at the site of use (`mod.metadata`, `mod.default`). One extra word removes the ambiguity.

## Medium

**7. `buf` → `digest`** — `app/api/incr/route.ts`
`crypto.subtle.digest()` already returns a digest — the domain term is clearer than the container type.

**8. `iso` → `isoDate`** — `app/projects/[slug]/header.tsx` (`formatDate`)
Bare `iso` is ambiguous (ISO what?). Pairing it with `date` makes the input self-describing.

**9. `active` → `isActive`** — `components/NavBar.tsx`
Boolean without the `is`/`has` prefix the rest of the project's conventions imply.

**10. `p` → `project`** — `app/projects/page.tsx` (filter/sort callbacks)
Inconsistent with the `project` used in the adjacent `.map()`. Pick one depth and hold it.

## Low

**11. `rows` / `value`** — `app/projects/[slug]/header.tsx`
`rows` is fine but `{ label, value }` is so generic it's un-greppable. If these are metadata pairs, `metadataFields` with `{ label, content }` or named keys would search better.

**12. `Props` type export** — `app/projects/[slug]/header.tsx`
Every component exporting a type literally named `Props` collides in imports. `HeaderProps` scales.
