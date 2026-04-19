
---

## Naming

Name things clearly, based on what they actually do.

**First principles**

- **Intent.** Name things by what they do for callers, abstract away how they work inside.
- **Consistency.** Use the same name for the same concept everywhere.
- **Cohesion.** Only group things together when a single name fits them all.
- **Design.** When naming is hard, treat it as a signal to reconsider the code underneath.
- **Scope.** Scale the name's specificity with its scope: short for short-lived variables, fuller for names that cross files or modules.
- **Domain Language.** Use the vocabulary people in the domain actually use instead of inventing new ones.
- **Searchability.** Avoid names too generic to grep (`data`, `info`, `handle`, `utils`).
- **Convention.** Follow existing conventions (`is`/`has` for booleans, plural for collections, `_` for private).
- **Symmetry.** Pair opposites symmetrically (`open`/`close`, `push`/`pop`).

**Antipatterns**

- Names that describe how the code works instead of what it does.
- The same thing called different things in different places.
- Names that stretch to cover things they don't really fit.
- Names that feel tortured because the code underneath is doing too much.
- Long, specific names for throwaway variables.
- Made-up terms, or words borrowed from a different domain.
- Names so generic you can't grep for them.
- Rolling your own convention when one already exists.
- Opposite pairs that don't match up.

**Things to avoid**

- Renaming short names that work fine in context, like `i` in a loop or `a, b` in a sort.
- Renaming based on guesses about what the code does instead of actually reading it.
- Cramming too many facts into one name.
