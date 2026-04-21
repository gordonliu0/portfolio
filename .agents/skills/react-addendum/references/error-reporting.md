---
title: Handle uncaught errors via createRoot callbacks
impact: MEDIUM
impactDescription: captures errors React no longer logs to console.error by default
tags: errors, error-boundaries, createRoot
---

## Handle uncaught errors via createRoot callbacks

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

Combine with `captureOwnerStack()` (see `owner-stacks.md`) for fuller provenance in dev.

Reference: [createRoot options](https://react.dev/reference/react-dom/client/createRoot#parameters)
