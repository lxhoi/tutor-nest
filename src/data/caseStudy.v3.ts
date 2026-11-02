import type { CaseStudySlide } from './caseStudy';
import { CASE_STUDY_V2_SLIDES } from './caseStudy.v2';

// V3 retains V2's evidence boundaries and adds an explicit audit trail.
// It is a target-8 portfolio revision, not a claim that every research artifact is verified.
const evidenceRegister: CaseStudySlide = {
  title: 'Evidence register', chapter: 'Understanding the user', kicker: '', layout: 'cards',
  description: 'Every research claim in this revision is tagged to its available source and its limit.',
  items: [
    { title: 'Participant IDs', text: 'Baseline worksheet: P1–P4 parents and P5–P6 tutors, moderated prototype v1, 2–6 Oct 2026. Portfolio findings use parent records only.' },
    { title: 'Task records', text: 'Parent records cover candidate discovery, Compare, schedule selection and trial booking. Easy / difficulty / not completed outcomes are reported; full timing and assistance logs are not supplied.' },
    { title: 'Claim sources', text: 'SRC-01 desk research/proto-persona; SRC-02 parent flow and sitemap; SRC-03 baseline worksheet; SRC-04 author-supplied retest and accessibility report.' },
    { title: 'Claim limits', text: 'No consent records, raw recordings, complete task timings, formal severity, or tested-build mapping were supplied. Findings cannot establish market fit or whole-product conformance.' },
  ],
};

const reportedRetest: CaseStudySlide = {
  title: 'Reported retest: three critical decisions', chapter: 'Refining the design', kicker: '', layout: 'cards',
  description: 'A separate author-supplied report records five parents completing three V1/V2 tasks. The report is kept distinct from the baseline worksheet.',
  items: [
    { title: 'Quote & commitment', text: 'Reported completion: 2/5 → 5/5. Mean time: 48s → 22s. SEQ: 4.2/7 → 6.4/7.' },
    { title: 'Payment recovery', text: 'Reported completion: 1/5 → 5/5. Mean time: 75s → 28s. SEQ: 3.6/7 → 6.2/7.' },
    { title: 'Pending reschedule & undo', text: 'Reported completion: 3/5 → 5/5. Mean time: 36s → 18s. SEQ: 4.8/7 → 6.6/7.' },
    { title: 'Boundary', text: 'Raw rows, consent and V1/V2 build mapping still need reconciliation. Results cover three tasks only, not discovery, onboarding, retention or market outcomes.' },
  ],
};

const releaseReadiness: CaseStudySlide = {
  title: 'What must be true before an 8/10 claim', chapter: 'Going forward', kicker: '', layout: 'cards',
  description: 'V3 is structured to make validation reviewable. These are release gates, not completed evidence.',
  items: [
    { title: 'Reconcile the record', text: 'Store anonymized task rows, moderator prompts, consent status and tested-build IDs for every result cited.' },
    { title: 'Validate IA', text: 'Run tree testing for Compare, payment schedule, reschedule and help; report first click, success and backtracking.' },
    { title: 'Extend accessibility', text: 'Audit every critical state across iOS VoiceOver, Android TalkBack, keyboard, zoom and touch-target inventory.' },
  ],
};

export const CASE_STUDY_V3_SLIDES: CaseStudySlide[] = [
  ...CASE_STUDY_V2_SLIDES.slice(0, 6), evidenceRegister,
  ...CASE_STUDY_V2_SLIDES.slice(6, 17), reportedRetest,
  ...CASE_STUDY_V2_SLIDES.slice(17, -1), releaseReadiness,
];
