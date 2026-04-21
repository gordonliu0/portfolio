---
title: Return cleanup functions from ref callbacks
impact: MEDIUM
impactDescription: removes the effect/null-check pattern for DOM subscriptions
tags: refs, lifecycle
---

## Return cleanup functions from ref callbacks

React 19 ref callbacks can return a cleanup function. It runs when the component unmounts or the ref is reassigned (e.g., the element changes identity across renders). Previously, the callback was called again with `null` on unmount, forcing a branch or a side-effect in `useEffect`.

This removes a common source of subscription leaks on DOM nodes.

**Incorrect (null-check branch; easy to leak):**

```tsx
function Component() {
  return (
    <div ref={(node) => {
      if (node) {
        const observer = new ResizeObserver(() => {});
        observer.observe(node);
        // where does disconnect() go?
      }
    }} />
  );
}
```

**Correct (return cleanup):**

```tsx
function Component() {
  return (
    <div ref={(node) => {
      if (!node) return;
      const observer = new ResizeObserver(() => {});
      observer.observe(node);
      return () => observer.disconnect();
    }} />
  );
}
```

Note: Strict Mode now double-invokes ref callbacks on mount to surface cleanup bugs earlier.

Reference: [React 19 release blog](https://react.dev/blog/2024/12/05/react-19)
