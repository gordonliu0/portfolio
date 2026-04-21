---
title: Use cacheSignal to detect when cache() lifetime ends
impact: LOW
impactDescription: enables cleanup and abort for cache()-wrapped async work
tags: rsc, cache, server-components
---

## Use cacheSignal to detect when cache() lifetime ends

React 19.2 adds `cacheSignal()` (RSC-only). It returns an `AbortSignal` that fires when the enclosing `cache()` call's lifetime ends — i.e., when React no longer needs the cached value. Useful for aborting fetches or cleaning up long-running work started during rendering.

Only callable inside a function wrapped by `cache()`. Returns `null` outside that context.

**Incorrect (no way to abort if the render is discarded):**

```tsx
import { cache } from "react";

export const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});
```

**Correct (fetch aborts with the cache):**

```tsx
import { cache, cacheSignal } from "react";

export const getUser = cache(async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    signal: cacheSignal() ?? undefined,
  });
  return res.json();
});
```

Reference: [React 19.2 CHANGELOG](https://github.com/facebook/react/blob/main/CHANGELOG.md)
