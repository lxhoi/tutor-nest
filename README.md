# TutorNest — UX/UI concept case study

Bryan Lê · UX and UI design · 10 weeks
Contact: lxhoi.2k@gmail.com

A mobile tutoring prototype and a 28-slide bilingual case study. Research assumptions, evaluator findings, and technical verification are distinguished explicitly. All service and payment interactions are simulated.

## Local development

Node.js 22+ is recommended.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/?view=case-study&lang=en (or `lang=vi`).

## Verification and production build

```sh
npm run lint
npm test
npm run build
```

The static build is in `dist/`. See [release scope and evidence](docs/CASE_STUDY_RELEASE.md) for corrections, checks, and limitations.

[Figma design](https://www.figma.com/design/6P3XwYly9wYY2jHWQgclYY/TutorNest?node-id=23201-4624)

The presentation’s **Evidence / Bằng chứng** button provides downloadable decision logs, verified desk-research sources, clearly labeled synthetic exercises, accessibility materials, a capped self-assessment, and an author-supplied retest/audit report. The accompanying evidence addendum defines that report’s limited scope and the raw artifacts still needed to reconcile the tested build.
