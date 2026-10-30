# TutorNest — concept case study

Author: Bryan Lê
Role: UX and UI design
Project duration: 10 weeks
Public contact: lxhoi.2k@gmail.com
Release review: 30 October 2026

## Scope and evidence

This is a portfolio concept, not an operating tutoring service. Its 28-slide English/Vietnamese presentation follows the supplied Google UX case-study sequence. It documents interface decisions, a scenario-based proto-persona, retrospective layout diagrams, and an evaluator review. It does not claim completed participant research, WCAG conformance, a conversion uplift, or production deployment.

The designer supplied their name, role, duration, and contact. Original Figma mockups and the local prototype inform the design. The review identified concrete defects and their corrections; these are heuristic/implementation findings rather than participant observations.

## Traceable corrections

| Observed issue | Correction | Verification |
| --- | --- | --- |
| Weekend filter selected Monday | Explicit Saturday/Sunday matching and stable chip label | Regression test and browser walkthrough |
| Weekday labels contradicted calendar dates | Calendar and recurring timeline use actual Date weekdays | Regression tests and 03/11/2026 Tuesday → 05/11/2026 Thursday browser check |
| Availability was not specific to the chosen tutor | Tutor weekday and time-band availability determine selectable slots | Calendar regression test and browser walkthrough |
| Lesson management always showed a fixed mock list | Session and invoice lists are generated from the booking | Trial, recurring, and full-plan regression tests |
| Rescheduling immediately changed confirmed booking | Separate pending request, cancellation, unchanged confirmed schedule | Browser walkthrough |
| Manual payment confirmation implied completed reconciliation | Explicitly simulated pending, failed, retry, and successful reconciliation | Browser walkthrough; no real financial transaction |
| Keyboard and modal interaction gaps | Keyboard search activation; named dialogs; focus containment, return, Escape | Source review and keyboard walkthrough |
| Unsupported UX scores and compliance claim | Removed scores and WCAG AA claim | Source search |

## Reproducible checks

- `npm ci`
- `npm run lint`
- `npm test` — 17 regression tests; these do not measure user usability.
- `npm run build`
- Open `/?view=case-study&slide=1&lang=en` or `lang=vi`.

The demo uses a disclosed calendar anchor of 30 October 2026. All tutors, verification badges, reviews, provider choices, transactions, and service policies are illustrative. QR artwork is intentionally not a payment QR; no bank account should receive money through this demo.

## Remaining validation

- Conduct the proposed parent usability study and report observations without inventing outcomes.
- Audit screen readers, text scaling, touch targets, contrast, and responsive behavior comprehensively.
- Production availability, payment reconciliation, authentication, server persistence, and service policies require separate implementation and validation.

## Publication

`dist/` is the static production build. It can be uploaded to the chosen static host. This release preparation does not itself publish to a public URL or push a repository. Figma remains a reference artifact; local corrections have not been synchronized back into that Figma file.

## Additional corrections and evidence kit

- Back/Continue preserves the selected 19:30–21:00 time; verified in a local browser round trip.
- A shared quote calculation prevents trial/full-plan leakage and aligns checkout, invoices and renewal.
- Calendar export creates an actual .ics file; the UI explains manual import and does not claim account synchronization.
- Device-local drafts restore validated state. New tutor selection begins a draft.
- Reschedule choices exclude overlapping booked sessions; renewal uses the selected booking.
- The Evidence panel links to the research protocol, IA/decision log, verified desk-research log, clearly labeled synthetic research pipeline, accessibility measurement worksheet, capped self-assessment and verification scope.

The protocol includes recruitment criteria, consent, neutral tasks, success criteria, recording templates, severity rules and planned retesting. The IA document includes a scenario journey, sitemap, hypotheses, alternatives and trade-offs. The simulation materials are AI-generated exercises and cannot substitute for participants. These are preparation artifacts, not completed participant studies.

Manual release check: local in-app browser, 30 October 2026. Trial at 19:30 on 03/11/2026 retained its time after Back/Continue; checkout and simulated confirmation showed 750,000 VND; calendar action showed file-created/manual-import feedback. The 28 slides in English and Vietnamese were checked against footer bounds at the review viewport. Screen-reader and real-device validation remain pending.
