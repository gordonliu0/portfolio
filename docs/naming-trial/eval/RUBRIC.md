# Naming Analysis Report — Evaluation Rubric

## Context

The report under review is one engineer's naming-analysis audit of a TypeScript/Next.js codebase (this working directory — the current checkout is the codebase being audited). Your job is to score the report against the criteria below, fact-checking every claim against the actual code.

You are scoring a single report in isolation. Do not compare it to other reports — none are visible to you.

## Scoring — 1 to 5 per criterion

Use integer scores only. Anchors:

### 1. Correctness
Are the report's claims verifiable against the code?
- **5** — Every claim accurate. File paths, line numbers, and behavior descriptions match the code. No fabrications.
- **3** — Mostly accurate, with a few minor slips (slightly wrong line numbers, mild mischaracterization).
- **1** — Multiple fabricated claims, invented file paths, or outright factual errors.

### 2. Coverage
Does the report catch the meaningful naming issues actually present in the codebase?
- **5** — Catches the high-impact issues: misleading names, stale domain terms, convention violations. Few meaningful misses.
- **3** — Catches the obvious ones; misses some non-obvious but real issues.
- **1** — Misses most important issues or focuses on trivia.

### 3. Prioritization
Is the severity ordering defensible? Are the most impactful issues labeled most severe?
- **5** — Severity buckets reflect real impact. A reasonable reviewer would agree with the ordering.
- **3** — Mostly reasonable, but some items are over- or under-weighted.
- **1** — Severity ordering inverts real impact, or there's no meaningful prioritization.

### 4. Actionability
Are the suggestions concrete and ready to apply?
- **5** — Every suggestion has a specific replacement name, a clear target location, and is safe to mechanically apply.
- **3** — Most suggestions are actionable; some are vague or missing a concrete name.
- **1** — Suggestions are abstract, missing, or require further analysis before anything can be applied.

### 5. Rationale
Does the reasoning convince? Does each finding explain WHY it matters, not just WHAT is wrong?
- **5** — Every finding has a crisp why-it-matters — connects to real consequences, principles, or convention.
- **3** — Rationale present for most findings but shallow or repetitive.
- **1** — Mostly assertion without reasoning.

### 6. Signal density
How much useful content per unit of text? Does it avoid boilerplate, filler, and redundant scaffolding?
- **5** — Compact. Every line adds information.
- **3** — Some boilerplate or template-filling but core content is strong.
- **1** — Mostly formatting scaffolding, repetition, or filler.

## Ground rules

- Actually read the code before scoring `correctness` and `coverage`. Use `Read`, `Grep`, `Glob`.
- Do not anchor on report length or formatting style. Score the content against the criteria.
- If a claim in the report is wrong (wrong path, wrong line, wrong behavior), list it in `fabrications`.
- Penalize `correctness` heavily for invented paths, wrong line numbers, or wrong behavior claims.

## Judge output schema

Return ONE JSON object to stdout. No other text. No markdown fences. No prose before or after.

```json
{
  "report_id": "<id from the report filename, e.g. a|b|c|d>",
  "scores": {
    "correctness":    {"score": N, "justification": "<one sentence>"},
    "coverage":       {"score": N, "justification": "<one sentence>"},
    "prioritization": {"score": N, "justification": "<one sentence>"},
    "actionability":  {"score": N, "justification": "<one sentence>"},
    "rationale":      {"score": N, "justification": "<one sentence>"},
    "signal_density": {"score": N, "justification": "<one sentence>"}
  },
  "fabrications": ["<false or unverifiable claim from the report>", "..."],
  "overall_notes": "<2 to 3 sentence qualitative take>"
}
```

## Meta-judge output schema (ignore unless you are the meta-judge)

```json
{
  "ranking": [
    {"rank": 1, "report_id": "X", "total": N, "rationale": "<1-2 sentences>"},
    {"rank": 2, "report_id": "X", "total": N, "rationale": "<1-2 sentences>"},
    {"rank": 3, "report_id": "X", "total": N, "rationale": "<1-2 sentences>"},
    {"rank": 4, "report_id": "X", "total": N, "rationale": "<1-2 sentences>"}
  ],
  "audit_flags": [
    "<any judge score that seems over- or under-scored after your own spot-check, with brief note>"
  ],
  "summary": "<3 to 5 sentence overall take — strongest and weakest reports, what separated the top from the bottom>"
}
```
