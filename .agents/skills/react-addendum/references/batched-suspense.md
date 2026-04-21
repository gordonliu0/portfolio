---
title: Expect batched Suspense reveals in React 19.2
impact: MEDIUM
impactDescription: boundary placement no longer controls reveal timing at millisecond scale
tags: suspense, streaming, rendering
---

## Expect batched Suspense reveals in React 19.2

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
