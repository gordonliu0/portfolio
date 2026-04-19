
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

**Things to avoid**

- **Renaming idiomatic short names in their natural scope.** Leave `a, b` in sort comparators, `i, j` in loop counters, single-letter map params when obvious from context.
- **Speculative renames** based on imagined collisions or hypothetical future use — rename only when the current name is actually misleading or inconsistent.
- **Encoding too many facts into one name.** If a name needs three qualifiers (`projectsByDateDescWithFilter`), the code probably wants reshaping, not a longer label.
