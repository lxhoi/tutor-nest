import type { CaseStudySlide } from './caseStudy';
import { CASE_STUDY_V3_SLIDES } from './caseStudy.v3';

const iaValidation: CaseStudySlide = {
  title: 'IA validation plan', chapter: 'Starting the design', kicker: '', layout: 'cards',
  description: 'V4 makes IA validation a release requirement instead of presenting the sitemap as validated.',
  items: [
    { title: 'Tree-test tasks', text: 'Find Compare, payment schedule, reschedule and support. Capture first click, success, backtracking and confidence for each task.' },
    { title: 'Card-sort decisions', text: 'Test grouping for Manage learning, payments, saved tutors and help. Document the chosen taxonomy and alternatives rejected.' },
    { title: 'Success threshold', text: 'Set success criteria before recruitment; record the sample, task wording, moderation, task order and build ID.' },
  ],
};

const decisionTrace: CaseStudySlide = {
  title: 'Decision traceability', chapter: 'Refining the design', kicker: '', layout: 'cards',
  description: 'Each change should be traceable from source evidence to the decision, implementation and validation status.',
  items: [
    { title: 'ISS-01 · Compare', text: 'SRC-03: 3/4 parents initially missed Compare. Change: selection on results cards plus persistent action. Status: response implemented; independent retest pending.' },
    { title: 'ISS-02 · Payment recovery', text: 'SRC-03: 2/4 stopped at card-only payment. Change: simulated local payment routes and recovery states. SRC-04 reports 5/5 completion on the selected task; build mapping pending.' },
    { title: 'ISS-03 · Trust evidence', text: 'SRC-03: 4/4 asked for verification/review context. Change: illustrative labels and provenance requirement. Status: policy/operations not implemented.' },
  ],
};

const nineGate: CaseStudySlide = {
  title: '9/10 evidence gate', chapter: 'Going forward', kicker: '', layout: 'cards',
  description: 'A 9/10 portfolio claim requires these artifacts to be complete and reviewable; V4 does not claim they are complete.',
  items: [
    { title: 'Research repository', text: 'Anonymized participant/task rows, consent status, task scripts, prompts, timestamps, raw SEQ and observation/quote IDs.' },
    { title: 'Version reconciliation', text: 'Named V1/V2 tested builds, dated change log and before/after images that link each measured task result to the implemented change.' },
    { title: 'Accessibility matrix', text: 'Component × state × iOS VoiceOver × Android TalkBack × keyboard × zoom × touch target, with pass/fail and owner for every open issue.' },
    { title: 'Measured outcome boundary', text: 'Separate reported task metrics from product KPIs. Do not claim booking conversion, retention, market fit or WCAG conformance without corresponding evidence.' },
  ],
};

export const CASE_STUDY_V4_SLIDES: CaseStudySlide[] = [
  ...CASE_STUDY_V3_SLIDES.slice(0, 11), iaValidation,
  ...CASE_STUDY_V3_SLIDES.slice(11, 19), decisionTrace,
  ...CASE_STUDY_V3_SLIDES.slice(19, -1), nineGate,
];
