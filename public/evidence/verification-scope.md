# TutorNest — verification coverage and remaining gates

This document records a test scope, not a WCAG certification or user-research result.

## Product checks

- Back/Continue preserves a valid second-evening booking time.
- Trial, weekly and full-course amounts use the same quote rules.
- Trial ignores a stale full-course selection.
- Renewal views display the selected tutor, subject, grade, period and calculated amount; trial and full plans do not present weekly renewal controls.
- Calendar export creates a real .ics file and does not claim account synchronization.
- Replacements do not overlap booked sessions.
- Search filters retain their visible labels; OR behavior is stated explicitly.
- Demo drafts can be restored from versioned browser-local storage; malformed records fall back safely.

## Targeted accessibility scope

Changes include darker active calendar labels, larger microcopy, minimum target dimensions in the shared button component, selected-state semantics for time/filter/payment choices, keyboard search activation, named dialogs, focus return and Escape handling.

Manual checks to record for the release:
1. Measure foreground/background contrast of active text (normal text target >=4.5:1).
2. Measure rendered button bounds after prototype scaling and check spacing exceptions where needed.
3. Use Tab and Shift+Tab through dialogs; verify visible focus, Escape, return focus, and no focus lost behind dialogs.
4. Read selected weekday/time/plan and payment status with a screen reader.
5. Check 200% text resizing, zoom/reflow and real touch devices.
6. Repeat at narrow/wide viewports and with longer Vietnamese text.

Items 4–6 must remain unverified unless a real check is performed and its environment/result is recorded. Source inspection alone cannot certify screen-reader or device behavior. A passing target sample does not prove the entire app passes WCAG.

## Coverage boundaries

Automated regression tests cover date generation, availability, quote rules, calendar serialization, conflict avoidance, and saved draft parsing. A browser round trip is required for the edit-state bug because a pure slot-ID test alone does not prove component state restoration.

No test proves real authentication, live availability locking, a real transfer, provider reconciliation, background reminders, multi-user concurrency or production support. Those remain simulated or unimplemented.

## Public claims

Permitted when verified: specific implementation corrections; an exact test count with run evidence; downloaded calendar file; a defined browser walkthrough; documented research plans.

Not currently supported: “validated with parents”, a real usability success percentage, conversion uplift, participant quotes, full WCAG AA compliance, a live tutoring/payment service, or an assurance that every criterion merits a high score.

## Recorded local walkthrough — 30 October 2026

In-app browser at the review viewport: selected Nguyễn Minh Anh, 03/11/2026 at 19:30–21:00, trial at 750,000 VND. Back/Continue retained the time. Simulated payment confirmation retained the fee and session. Calendar export showed file-created/manual-import feedback. The evidence dialog opened with four document links and initial close-button focus. The earlier 28-slide version had a layout-bounds review in both languages. The revised 29-slide deck still needs a fresh visual bounds pass. These are evaluator/technical observations, not participant findings.

Final automated run: TypeScript check passed, 17 regression tests passed, production build passed. Vite reports a large JavaScript chunk; performance optimization remains a follow-up.
