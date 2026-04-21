# React Addendum

Tiny companion skill to `vercel-react-best-practices` and `react-19`. Covers React 19.0–19.2 items neither skill addresses.

## Structure

- `SKILL.md` — entry point
- `references/` — one file per topic (6 topics total)
- `references/templates/_template.md` — template for new references
- `AGENTS.md` — compiled flat file (for Codex and single-load consumers)

`AGENTS.md` is hand-compiled from `SKILL.md` + the reference files. Regenerate when references change.

## Adding a reference

1. Confirm the item is not already in `vercel-react-best-practices` or `react-19` (this is the entire reason this skill exists — keep it tight)
2. Copy `references/templates/_template.md` to `references/<name>.md`
3. Add a row to the table in `SKILL.md` and to the `references:` frontmatter list
4. Append the body to `AGENTS.md`
