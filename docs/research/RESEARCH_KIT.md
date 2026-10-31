# TutorNest — research kit

Bryan Lê · UX/UI design · 10-week concept project

**Status: prospective protocol, separate from the author-supplied Phase 4 v1 usability notes and the later n=5 retest report.** Phase 4 reports six sessions (four parents, two tutors); the later report covers five parents and three tasks. Neither report is independently verified here. The protocol below was not the exact script used in those reports; its tasks, targets and templates remain proposed. Do not backfill missing session records or treat technical checks as user findings.

## 1. Research objectives

RQ1. Can parents identify tutors that fit a subject, grade, weekly schedule, and budget?
RQ2. What evidence do parents use to assess teaching fit and trust?
RQ3. Can parents distinguish a trial from a recurring booking and explain the amount due now?
RQ4. Can parents change a draft and request a lesson change without misunderstanding confirmation status?
RQ5. Can parents find payment and lesson information after returning to the service?

## 2. Recruitment screener

Recruit five adults with a child in grades 6–12 who have recently sought or are currently considering tutoring. This is an exploratory round, not a representative survey.

Record anonymous participant ID, eligibility, recent tutoring experience, general device familiarity, device/browser, and any voluntarily disclosed access needs relevant to participation. Seek variation in prior tutoring experience and digital confidence. Exclude project contributors and avoid recruiting only designers or close friends. Do not request a child's identity, school, grades, financial records, or other unnecessary personal data.

Ask:
1. Are you an adult responsible for arranging learning support for a child in grades 6–12?
2. Have you looked for tutoring recently, or are you currently considering it?
3. How did you last find and arrange a tutor?
4. Which device would you ordinarily use to make such arrangements?
5. Is there anything we should adapt so you can comfortably participate? Answering is optional.

## 3. Session introduction and consent

“We are evaluating a prototype, not your ability. Tutors, payments and policies are illustrative; do not enter bank details or make a payment. You may stop at any time or skip a question. With your permission, I will record task observations. Recording audio/video is optional and requires separate consent. We will use anonymous IDs in the case study.”

Before recording, document consent separately. Explain the storage location, who can access it, intended portfolio use, retention/deletion date, and withdrawal process. Use a retention period approved for the project; do not invent a legal compliance claim. Keep consent and contact details out of public research exports.

## 4. Session structure — proposed 30–40 minutes

- 5 minutes: consent and recent tutoring context.
- 20–25 minutes: tasks, think-aloud when comfortable.
- 5–10 minutes: debrief and closing.

Facilitator: do not name controls, correct a misunderstanding during a task, or point to the expected route. If a participant becomes stuck, first ask “What would you do next?” If assistance is required, record the exact prompt and classify completion as assisted. Do not coach users to produce the expected answer.

## 5. Neutral task scenarios and success criteria

| Task | Scenario | Start | Unassisted success | Critical error |
| --- | --- | --- | --- | --- |
| T1 Discovery | You need a maths tutor for grade 9, available on a weekend, at no more than 500,000 VND/hour. Find a candidate and explain why they fit. | Home | Identifies a fixture matching all criteria and explains fee unit and available day. | Chooses a tutor outside the budget/day/grade requirements. |
| T2 Trial and review | You prefer one trial on Tuesday 3 November 2026 at 19:30, lasting 90 minutes. Prepare the booking, review it, then go back and check the time before continuing. | Selected tutor profile | Trial, date, 19:30–21:00 and amount remain correct at final review; no payment is made. | Unnoticed date, time, duration or amount change. |
| T3 Commitment | You are considering two 90-minute lessons each week for eight weeks with the 500,000 VND/hour tutor. Explain what is due now and how that differs from the full plan. | Scheduling | Explains 1,500,000 VND now for weekly plan, 12,000,000 VND undiscounted course and 11,400,000 VND discounted full plan, as applicable to chosen option. | Confuses due-now and course total or trial and recurring commitment. |
| T4 Recovery | A simulated payment does not succeed. Continue as you would normally while keeping your booking choices. | Payment simulation | Understands that the booking is not yet confirmed, finds retry, preserves choices. | Believes a failed payment confirmed the lesson. |
| T5 Manage | You cannot attend the first lesson. Request a different available time, then explain what happens to the existing lesson while waiting. | Confirmed demo booking | Requests non-conflicting slot, recognizes pending status and unchanged confirmed lesson; can cancel request. | Believes a pending request has already changed the confirmed lesson. |
| T6 Find and return | Find the next amount due and explain whether your plan renews weekly. Return to your lesson details. | Management | Correctly identifies next invoice or that no weekly renewal applies; returns without losing context. | States a fabricated or stale amount, or treats trial/full plan as a renewing weekly plan. |

Tasks use the disclosed demo date and fixture data. Recheck fixtures before each session. The task text is read to participants; the success criteria and expected amounts are for the evaluator only. If two tasks influence each other, record task order and use a defined reset between scenarios.

## 6. Observation sheet — blank template

| Participant ID | Task ID | Prototype version | Start/end time | Outcome U/A/F | Assistance verbatim | Observed behavior | Verbatim quote with recording reference | Error | SEQ 1–7 | Evidence link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Not collected | | | | | | | | | | |

U = unassisted success; A = assisted success; F = not completed. Separate observation (“returned to payment twice”) from interpretation (“fee structure may be unclear”). Never invent quotes or backfill missing timestamps.

SEQ prompt after each task: “Overall, how difficult or easy was the task to complete?” Anchor 1 = very difficult and 7 = very easy. Keep wording and timing consistent. Report the exact instrument used. SUS is optional after the full experience; use a complete documented instrument if chosen. NPS is not a replacement for task success.

## 7. Analysis and severity

Create an issue record with issue ID, evidence IDs, affected task, observed frequency n/N among participants exposed to the condition, impact, recovery, proposed severity, design response, and retest reference.

- S0: not a confirmed usability issue.
- S1: noticeable friction with little effect on the outcome.
- S2: recoverable confusion or extra work.
- S3: blocked task, wrong date/time/amount, or materially misunderstood commitment.
- S4: a release-blocking risk with a concrete serious consequence; justify rather than automatically assigning it to every payment-related concern.

Distinguish evaluator-estimated severity from participant-derived severity. Consider frequency, impact, persistence, and recovery. Review disagreements. Prioritize S3/S4 issues first; with a small sample, report counts and contextual observations rather than generalizing to all parents.

## 8. Prospective decision rules

These are proposed gates, not achieved results:
- No unresolved critical date/time/amount error in the evaluated paths.
- In this exploratory round, aim for at least 4/5 unassisted completions on each core task; any failure still requires qualitative review.
- Investigate tasks with repeated assistance or low SEQ rather than passing solely because an average looks acceptable.
- Retest affected paths after a design change. Document task order, participant experience and version effects. Do not claim a causal improvement from incomparable rounds.

## 9. Retest report template

| Issue | Round/version | Evidence | Change | New round/version | Observed result | Remaining uncertainty |
| --- | --- | --- | --- | --- | --- | --- |
| Pending real sessions | | | | | | |

Report the sample, tasks, exclusions, assistance, missing records, individual results, limitations, and the distinction between intended and measured impact. Technical test counts belong in an implementation section, not the user research result column.

## 10. Deliverables required before claiming validated UX

Actual screener/consent records; anonymous participant table; session protocol; timestamped observations; synthesis; evidence-linked issues; task metrics; decision log; changed artifacts; retest results. Public exports must remove identifiers and private recording URLs. The author should review and accurately attribute their contributions before publication.
