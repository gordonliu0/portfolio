---
name: react-addendum
description: React 19.0–19.2 additions and behavior changes not covered by vercel-react-best-practices or the react-19 skill. Covers View Transition hydration, Owner Stacks debugging, cacheSignal for RSC, batched Suspense reveal semantics, createRoot error callbacks, and ref callback cleanup. Use alongside the other two React skills when working on React 19 code.
license: MIT
references: references/view-transition-hydration.md, references/owner-stacks.md, references/cache-signal.md, references/batched-suspense.md, references/error-reporting.md, references/ref-callback-cleanup.md, references/templates/_template.md
metadata:
  author: gordon
  version: "0.1.0"
  reactVersion: "19.2"
---

# React Addendum

Companion to two other skills:

- `vercel-react-best-practices` — performance and baseline patterns
- `react-19` — React 19 API surface and idioms

This skill fills the **gaps**: behavior shifts and debug tools from the 19.0–19.2 changelog that neither other skill covers.

## References

| Topic | Impact | React version | Guide |
|---|---|---|---|
| View Transition hydration | MEDIUM | 19.0+ | `references/view-transition-hydration.md` |
| Owner Stacks debugging | LOW | 19.1 | `references/owner-stacks.md` |
| cacheSignal for RSC | LOW | 19.2 | `references/cache-signal.md` |
| Batched Suspense reveals | MEDIUM | 19.2 | `references/batched-suspense.md` |
| createRoot error callbacks | MEDIUM | 19.0 | `references/error-reporting.md` |
| Ref callback cleanup | MEDIUM | 19.0 | `references/ref-callback-cleanup.md` |

Each reference follows the same shape: title, impact, incorrect example, correct example, upstream link. Open the file when the task touches its topic.

For single-file consumption (Codex): see `AGENTS.md`.
