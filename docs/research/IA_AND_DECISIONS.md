# TutorNest — IA, journey and decision record

Status: documented from the current concept and retrospective evaluator review. This is not evidence that card sorting, tree testing or participant interviews have already occurred. Decisions below are being documented now; no historical ideation timeline is implied.

## 1. Problem framing

Working problem: parents may need to combine tutor suitability, schedule fit and cost information before committing. This is a hypothesis inferred from the product scope; prevalence and priority among real parents remain to be established.

How might we:
- HMW help parents compare tutor fit without hiding essential qualifications and fees?
- HMW make a trial and a recurring schedule distinguishable before payment?
- HMW preserve informed choices through editing, interruption and payment recovery?
- HMW distinguish a pending request from a confirmed lesson?

Implemented constraints: mobile-first simulated prototype; four fixture tutors; local demo persistence; fixed demo calendar anchor; no real authentication, live tutor inventory, financial integration, or production support. Business policy, market demand, research sample, and production legal requirements are not validated by this concept.

## 2. Domain model and invariants

Current implementation uses one active Booking with a Tutor; Session and Invoice views are derived. Proposed scale model: Parent → Child → Booking → Session; Booking → Invoice; Session → RescheduleRequest. Multiple children/bookings are future architecture, not implemented functionality.

Invariants:
1. Trial has one lesson and one session fee regardless of a stale full-plan selection.
2. Recurring count is days per week × weeks; due-now is weekly amount or discounted full total.
3. Every amount view uses the same quote rules.
4. Editing preserves the selected slot when still available.
5. Pending rescheduling does not mutate confirmed schedule.
6. Proposed replacements must not overlap existing sessions.
7. External calendar export is a file download; account sync is not claimed.
8. Every research result must be classified by its actual source.

## 3. Sitemap and navigation

| Area | Screens | Primary task |
| --- | --- | --- |
| Discover | Home, Search/filter, Compare, Profile, Availability, Reviews | Find and evaluate a suitable tutor |
| Book | Schedule, Checkout, QR/transfer or wallet simulation, Confirmation | Review a trial or recurring commitment |
| Manage | Session list, Invoice list, Reschedule, Weekly renewal | Understand upcoming obligations and request changes |
| Connect | Messages, Notifications, Account/help | Return to context and access support information |

Prototype toolbar and presentation controls are authoring/navigation aids, not the parent's product navigation.

Reference path through QR: Home → Search → Profile → Schedule → Checkout → Payment → Confirmation → Management. That is six screen transitions to confirmation and seven to management, excluding data-entry actions, provider selection and simulation controls. This is a documented reference path, not a measured completion time or usability result. Maximum graph depth and optimal paths across every route remain to be audited.

## 4. Label dictionary

- Xem hồ sơ: opens tutor details; does not imply a booking is already placed.
- Học thử 1 buổi: one lesson; no weekly renewal.
- Lịch theo tuần: repeated weekdays over the selected course duration.
- Một tối T3 hoặc T5: at least one matching evening, not a requirement for both.
- Cuối tuần: Saturday or Sunday.
- Học phí đợt này: amount due for the current selected payment option.
- Chờ xác nhận: a submitted request, with the old lesson still unchanged.
- Tải file lịch .ics: creates a downloadable file; does not sync a calendar account.

## 5. Proposed card sorting

Question: how do parents group lesson, payment, communication and account information? Use content cards such as tutor reviews, lesson details, next invoice, trial terms, change request, message tutor, pause future weeks and contact support. Run an open sort first; ask participants to name groups. Keep an ungrouped option. Do not force the current four navigation groups. Record groupings, labels, uncertainty and sample limitations; revise the IA only with evidence.

## 6. Proposed tree test

Use a text-only navigation tree. Tasks: find an upcoming lesson; identify the next amount due; request a new time; find whether a trial renews; locate help about a pending request. Define acceptable destinations before testing. Record direct/indirect success, first destination, backtracking and confidence. Test the structure without visual UI cues. No tree-test scores exist yet.

## 7. Scenario journey — assumptions and planned evidence

| Stage | Touchpoints | Action | Assumed question/emotion | Risk | Opportunity | Evidence status |
| --- | --- | --- | --- | --- | --- | --- |
| Recognize need | Parent/child discussion; school feedback | Decide whether tutoring is appropriate | “What support would actually help?” / uncertainty | Designing only for parents' stated needs while missing child's fit | Ask about a recent real decision and involve child perspective appropriately | Hypothesis; interviews pending |
| Consider | Referrals, search, profile, reviews | Compare fit and credentials | “Can I trust this tutor?” / caution | Treating badges as enough evidence of fit | Make qualifications, teaching approach and review context visible | Concept/UI; parent validation pending |
| Prepare | Availability and schedule | Match date, duration and routine | “Will this fit our week?” / concern | Wrong or silently changed time | Shared dates, preserved selections, review summary | Evaluator issue and technical checks |
| Commit | Checkout and payment | Explain amount due and commitment | “What do I owe now?” / hesitation | Wrong totals or unclear recurring commitment | Unified quote and explicit trial/weekly/full options | Technical checks; comprehension study pending |
| Learn and maintain | Lessons, invoices, messages | Attend and track upcoming obligations | “What is next?” / reassurance if clear | Stale information or a changed schedule | Booking-derived session and invoice views | Implementation; field use unvalidated |
| Change or leave | Reschedule, future-week pause, help | Request change or stop continuation | “Has my request changed the lesson?” / concern | Pending confused with confirmed | Request state, cancellation and clear renewal eligibility | Evaluator check; user study pending |

These thoughts and emotions are hypotheses, not participant quotes.

## 8. Decision log — alternatives and trade-offs

| Decision | Alternatives considered in this revision | Choice and rationale | Cost/limitation | Validation |
| --- | --- | --- | --- | --- |
| Preserve edited booking | Reset defaults on every visit vs restore selected start time | Restore the valid slot from booking; avoids silently replacing a parent's explicit choice | Day/duration changes may still require a different valid option | Slot restore regression + browser round trip |
| Price rules | Per-screen calculations vs one authoritative quote | Shared quote for trial/weekly/full and invoice views | Requires explicit transitions when plan type changes | Cross-plan and stale-total regression tests |
| Payment feedback | Immediate success vs explicit simulation states | Pending, failed, retry and user-triggered simulated reconciliation | Controls are a demo harness, not a production payment UX | Browser walkthrough; no real bank integration claimed |
| Schedule changes | Immediate mutation vs a pending request | Preserve confirmed lesson and allow cancellation of the request | Approval workflow is not connected to a real tutor | Browser walkthrough; participant comprehension pending |
| Schedule availability | Allow every day/time vs tutor-specific allowed bands and overlap checks | Restrict availability and propose non-overlapping replacements | Fixtures describe bands, not live capacity; mixed days can have no common slot | Regression tests; usability validation pending |
| Calendar | Claim account sync vs create portable .ics file | Download a real file, explicitly requiring manual import | Not connected calendar sync; calendar-app import QA remains to be completed | File structure/time/escaping tests and browser download |
| Filter behavior | Staged Apply/Cancel vs immediate filtering | Live updates with explicit “closing keeps selections” copy | Changes persist when closing; must be tested for understanding | Source/browser checks; parent study pending |
| Research presentation | Invent outcomes vs label actual evidence classes | Real implementation findings, proposed protocol, clearly marked synthetic example only | Cannot claim measured task success or impact yet | Evidence audit; requires real sessions to complete |

## 9. Prospective prioritization

P0: wrong date/time/amount or false confirmation. P1: finding the right tutor, keyboard operation, comprehension of status and recovery. P2: visual polish and efficiency improvements. These are risk-based priorities, not measured user frequency. Re-prioritize when actual observations are available.
