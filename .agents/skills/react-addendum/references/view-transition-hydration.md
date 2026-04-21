---
title: Wrap all ViewTransition children in Suspense boundaries
impact: MEDIUM
impactDescription: prevents hydration mismatch errors under ViewTransition
tags: hydration, suspense, view-transitions
---

## Wrap all ViewTransition children in Suspense boundaries

`<ViewTransition>` applies `view-transition-name` styles just-in-time when transitions trigger. During SSR hydration, a reveal from a non-Suspense child can activate ViewTransition on the client, producing styles that weren't in the server HTML. React logs a hydration mismatch.

Fix: put every child of `<ViewTransition>` inside a `<Suspense>` boundary so reveals are coordinated through Suspense.

**Incorrect (mixes Suspense and non-Suspense children):**

```tsx
<ViewTransition>
  <Suspense fallback={<HeaderSkeleton />}>
    <Header />
  </Suspense>
  {children}
</ViewTransition>
```

**Correct (all children in Suspense):**

```tsx
<ViewTransition>
  <Suspense fallback={<HeaderSkeleton />}>
    <Header />
  </Suspense>
  <Suspense fallback={null}>{children}</Suspense>
</ViewTransition>
```

Alternative: wrap the entire `ViewTransition` in a single outer Suspense. This forces everything into the same loading state, so pick the variant that matches your UX.

Reference: [React ViewTransition docs](https://react.dev/reference/react/ViewTransition)
