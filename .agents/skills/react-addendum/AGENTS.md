# React Addendum

Companion to two other skills:

- `vercel-react-best-practices` — performance patterns
- `react-19` — React 19 API surface and idioms

This file fills the **gaps**: behavior shifts and debug tools from the React 19.0–19.2 changelog that neither other skill covers, plus one battle-tested hydration pattern worth preserving.

Six rules. Read the one that matches your task.

| Rule | Impact | React version |
|---|---|---|
| Wrap all ViewTransition children in Suspense boundaries | MEDIUM | 19.0+ |
| Use captureOwnerStack for cleaner error overlays | LOW | 19.1 |
| Use cacheSignal to detect when cache() lifetime ends | LOW | 19.2 |
| Expect batched Suspense reveals in React 19.2 | MEDIUM | 19.2 |
| Handle uncaught errors via createRoot callbacks | MEDIUM | 19.0 |
| Return cleanup functions from ref callbacks | MEDIUM | 19.0 |

---

## 1. Wrap all ViewTransition children in Suspense boundaries

**Impact: MEDIUM — prevents hydration mismatch errors under ViewTransition**

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

---

## 2. Use captureOwnerStack for cleaner error overlays

**Impact: LOW — dev-only; identifies which component rendered the failing one**

React 19.1 adds Owner Stacks — development-only stack traces that identify which component rendered the failing component. This is different from the call stack, which mostly shows framework internals.

Call `captureOwnerStack()` inside error boundaries, dev-mode loggers, or `onCaughtError` handlers to attach component-origin information to errors. The API is a no-op in production builds.

**Incorrect (plain componentStack only):**

```tsx
class Boundary extends Component {
  componentDidCatch(error, info) {
    logger.error(error, info.componentStack);
  }
}
```

**Correct (enrich with owner stack in dev):**

```tsx
import { captureOwnerStack } from "react";

class Boundary extends Component {
  componentDidCatch(error, info) {
    logger.error(error, {
      componentStack: info.componentStack,
      ownerStack: captureOwnerStack(),
    });
  }
}
```

Reference: [React 19.1 release notes](https://github.com/facebook/react/blob/main/CHANGELOG.md)

---

## 3. Use cacheSignal to detect when cache() lifetime ends

**Impact: LOW — enables cleanup and abort for cache()-wrapped async work**

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

---

## 4. Expect batched Suspense reveals in React 19.2

**Impact: MEDIUM — boundary placement no longer controls reveal timing at millisecond scale**

React 19.2 batches Suspense boundary reveals during server rendering to optimize paint timing, matching existing client-side behavior. Sibling boundaries that resolve within the batch window reveal together, not one-by-one.

Consequence: scattering many small `<Suspense>` boundaries to "stream content as it arrives" no longer produces visibly incremental paint. For incremental reveal, boundaries need enough latency separation that React won't batch them.

**Incorrect assumption (three sibling boundaries will paint independently):**

```tsx
<>
  <Suspense fallback={<Skel />}><FastData /></Suspense>
  <Suspense fallback={<Skel />}><AlsoFastData /></Suspense>
  <Suspense fallback={<Skel />}><SlowData /></Suspense>
</>
```

If `FastData` and `AlsoFastData` resolve within the batch window, they reveal together. You get two paints, not three.

**Correct (group by latency, not by component):**

```tsx
<>
  <Suspense fallback={<Skel />}>
    <FastData />
    <AlsoFastData />
  </Suspense>
  <Suspense fallback={<Skel />}>
    <SlowData />
  </Suspense>
</>
```

Same effective UX, fewer boundaries, clearer intent.

Reference: [React 19.2 CHANGELOG](https://github.com/facebook/react/blob/main/CHANGELOG.md)

---

## 5. Handle uncaught errors via createRoot callbacks

**Impact: MEDIUM — captures errors React no longer logs to console.error by default**

React 19 changed default error reporting. Errors not caught by an Error Boundary now route through `window.reportError` (which in turn hits `console.error`, but bypasses direct dev-tool interception points). To handle errors centrally — structured logging, observability, redirect to error page — pass callbacks to `createRoot` / `hydrateRoot`.

Three distinct paths: caught by a boundary, uncaught, or recovered after a hydration mismatch.

**Incorrect (relying on console.error in prod):**

```tsx
createRoot(container).render(<App />);
// errors surface via window.reportError; nothing structured reaches your logger
```

**Correct (callbacks for each path):**

```tsx
createRoot(container, {
  onCaughtError(error, errorInfo) {
    logger.warn("caught by boundary", {
      error,
      componentStack: errorInfo.componentStack,
    });
  },
  onUncaughtError(error, errorInfo) {
    logger.error("uncaught", {
      error,
      componentStack: errorInfo.componentStack,
    });
  },
  onRecoverableError(error) {
    logger.info("recovered after hydration mismatch", { error });
  },
}).render(<App />);
```

Combine with `captureOwnerStack()` (rule 2) for fuller provenance in dev.

Reference: [createRoot options](https://react.dev/reference/react-dom/client/createRoot#parameters)

---

## 6. Return cleanup functions from ref callbacks

**Impact: MEDIUM — removes the effect/null-check pattern for DOM subscriptions**

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
