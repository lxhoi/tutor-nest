# TutorNest — IA, journey and decision record

Status: the current concept and evaluator decisions are documented retrospectively. The supplied Phase 4 PDF reports moderated v1 usability notes for six people, including four parents; those notes support specific search/compare/booking findings but do not report card sorting or tree testing. Decisions below do not imply a historical ideation timeline. See `PHASE_2_3_4_EVIDENCE_REVIEW_VI.md` for source reconciliation.

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
| Recognize need | Parent/child discussion; school feedback | Decide whether tutoring is appropriate | “What support would actually help?” / uncertainty | Designing only for parents' stated needs while missing child's fit | Ask about a recent real decision and involve child perspective appropriately | Phase 2 hypothesis; not included in Phase 4 tasks |
| Find candidates | Referrals, search, filters | Find tutors by subject, grade, price and schedule | “Where should I start?” / uncertainty | Hidden filters or insufficient location criteria | Keep core filters visible and plain-language | Phase 4 report: 4/4 found candidates; 3/4 had filter friction or wanted more filters |
| Vet and compare | Profile, credentials, reviews, compare | Compare fit and evidence | “Can I trust this tutor?” / caution | Treating badges as enough evidence of fit | Explain what verification covers; show review provenance | Phase 4 report: 4/4 asked for more trust evidence; 3/4 missed Compare initially |
| Check availability | Tutor calendar and schedule | Match date, duration and routine | “Will this fit our week?” / concern | Wrong or silently changed time | Clear date controls and persistent selection | Phase 4 report: 3/4 selected a slot without difficulty; one corrected the wrong day |
| Commit | Checkout and payment | Explain amount due and commitment | “What do I owe now?” / hesitation | Card-only payment and unclear policy | Show amount, policy, support and available payment choices before commitment | Phase 4 report: 2/4 completed booking; 2/4 stopped at card-only payment |
| Learn and maintain | Lessons, invoices, messages | Attend and track upcoming obligations | “What is next?” / reassurance if clear | Stale information or a changed schedule | Booking-derived session and invoice views | Phase 4 asked about expectations after booking; ongoing behavior not observed |
| Change or leave | Reschedule, future-week pause, help | Request change or stop continuation | “Has my request changed the lesson?” / concern | Pending confused with confirmed | Request state, cancellation and clear renewal eligibility | Separate n=5 report covers a reschedule task; not part of Phase 4 baseline |

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
| Research presentation | Blend reported/synthetic outcomes vs separate evidence classes | Attribute Phase 4 baseline notes, keep the separate n=5 retest distinct, and exclude the synthetic example | Supplied reports still lack independently reconciled raw records/builds | Evidence audit; reconcile source artifacts and retest current parent flow |

## 9. Prospective prioritization

P0: wrong date/time/amount or false confirmation. P1: finding the right tutor, keyboard operation, comprehension of status and recovery. P2: visual polish and efficiency improvements. These are risk-based priorities, not measured user frequency. Re-prioritize when actual observations are available.
