---
title: Use captureOwnerStack for cleaner error overlays
impact: LOW
impactDescription: dev-only; identifies which component rendered the failing one
tags: debugging, dev-tools, error-boundaries
---

## Use captureOwnerStack for cleaner error overlays

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
