export type CaseStudyLayout = 'cover' | 'overview' | 'split' | 'cards' | 'chapter' | 'persona' | 'journey' | 'sitemap' | 'wireframes' | 'responsive' | 'mobile-sizes' | 'mobile-states' | 'flow' | 'study' | 'findings' | 'comparison' | 'gallery' | 'prototype' | 'accessibility' | 'heuristics' | 'takeaways' | 'closing';
export interface CaseStudySlide {
  title: string;
  chapter: string;
  kicker: string;
  description: string;
  layout: CaseStudyLayout;
  items?: { title: string; text: string; evidence?: string; response?: string; score?: number }[];
  note?: string;
  evidence?: string;
}
export const CASE_STUDY_SLIDES: CaseStudySlide[] = [
  {
    "title": "From scattered search\nto a confident booking.",
    "chapter": "Overview",
    "kicker": "BRYAN LÊ / UX & UI DESIGN",
    "description": "A parent-focused tutoring concept: compare a credible tutor, choose an available trial, and understand the commitment before paying.",
    "layout": "cover",
    "note": "A 10-week UX/UI concept by Bryan Lê. This case study now follows the parent path from discovery to booking. All tutor profiles, verification labels, availability, policies and payment choices in the prototype are demo data."
  },
  {
    "title": "One clear path\nfor the parent.",
    "chapter": "Overview",
    "kicker": "01 / PROJECT OVERVIEW",
    "description": "TutorNest is a mobile-first concept for parents in Vietnam. This case study focuses on the parent key flow from search through booking confirmation; tutor operations sit outside the design scope.",
    "layout": "overview",
    "items": [
      {
        "title": "Product & audience",
        "text": "Mobile tutoring marketplace concept for parents in Vietnam."
      },
      {
        "title": "Role & duration",
        "text": "Bryan Lê — UX and UI design · 10 weeks."
      },
      {
        "title": "Scope & tools",
        "text": "Parent discovery-to-booking flow · Figma · React prototype."
      }
    ],
    "note": "The scope is a concept and a local prototype. The author supplied role, duration and tools. No operating service, client team or business outcome is claimed."
  },
  {
    "title": "Parents could find a tutor.\nTrust and payment slowed booking.",
    "chapter": "Overview",
    "kicker": "02 / THE PROBLEM & GOAL",
    "description": "The supplied Phase 4 study notes report that parents wanted more proof about tutor credibility and two of four stopped at payment when only card payment was available.",
    "layout": "split",
    "items": [
      {
        "title": "Observed v1 problem",
        "text": "All 4 parent participants asked for more proof about tutors. Three did not find Compare immediately; 2 of 4 did not complete booking at the card-only payment step."
      },
      {
        "title": "Design question",
        "text": "How might we help a parent compare tutor fit, choose an available trial and understand policy and payment before committing?"
      }
    ],
    "evidence": "Author-supplied Phase 4 notes · 4 parents · prototype v1",
    "note": "These counts describe four parent participants in the supplied report, not prevalence among Vietnamese parents. The notes do not include raw recordings, consent records or a versioned prototype file for independent verification."
  },
  {
    "title": "Narrow the work\nto one parent flow.",
    "chapter": "Overview",
    "kicker": "03 / DESIGN SCOPE",
    "description": "A parent can move from tutor search to a reviewed booking. The case study excludes tutor onboarding, tutor earnings and live payment operations.",
    "layout": "cards",
    "items": [
      {
        "title": "In scope",
        "text": "Search and filters → compare/profile → availability → trial choice → booking review → payment state → confirmation."
      },
      {
        "title": "Out of scope",
        "text": "Tutor setup and operations, production verification, live inventory, real payment processing and long-term learning outcomes."
      },
      {
        "title": "Evidence boundary",
        "text": "Phase 4 reports n=6 overall, including 4 parents and 2 tutors. Parent-flow findings use only the four parent records."
      }
    ],
    "evidence": "Parent key flow · reported study scope, not a market estimate",
    "note": "The supplied Phase 3 flow map counts 15 steps and 3 decisions for its shortest parent route. That is a design-flow count, not observed taps or task time."
  },
  {
    "title": "Define what makes\na booking clear.",
    "chapter": "Overview",
    "kicker": "04 / PROPOSED SUCCESS CRITERIA",
    "description": "Phase 4 surfaced friction around Compare, trust evidence and payment. The next study should measure task completion and understanding before setting numeric targets.",
    "layout": "study",
    "items": [
      {"title": "Find and compare independently", "text": "Measure the share of parents who find at least two tutors and open Compare without a moderator prompt."},
      {"title": "Choose the right time", "text": "Measure correct date/time selection for the scenario, corrections, and whether returning loses a selected slot."},
      {"title": "Understand before committing", "text": "After checkout, ask participants to explain the amount due, lesson type, and cancellation/refund terms."},
      {"title": "Recover after interruption", "text": "Check whether people distinguish pending, failed and confirmed states, then continue without losing their booking choices."}
    ],
    "evidence": "Proposed measures · not observed outcomes or achieved targets",
    "note": "Do not set thresholds before a standardized protocol and baseline. Choose targets after a pilot, record decision criteria in advance, then retest comparable tasks on the same build."
  },
  {
    "title": "Start with\nthe parent.",
    "chapter": "Understand",
    "kicker": "CHAPTER 01",
    "description": "Understanding the user",
    "layout": "chapter",
    "items": [
      {
        "title": "Research",
        "text": "Questions before solutions"
      },
      {
        "title": "Persona",
        "text": "A focused parent scenario"
      },
      {
        "title": "Journey",
        "text": "The moments that matter"
      }
    ]
  },
  {
    "title": "Use the evidence\nfor what it can support.",
    "chapter": "Understand",
    "kicker": "05 / METHOD & LIMITATIONS",
    "description": "Phase 2 frames a parent scenario from secondary research. Phase 3 maps the flow and IA. Phase 4 reports a moderated v1 usability round; the report was supplied by the author and is not independently verified here.",
    "layout": "cards",
    "items": [
      {
        "title": "Phase 2 · desk research",
        "text": "Competitor and community material informed Linh, a parent proto-persona, and a six-stage journey. It is a starting hypothesis, not interview evidence."
      },
      {
        "title": "Phase 3 · flow & IA",
        "text": "A parent booking flow and dual-sided sitemap are documented. This revision keeps the parent flow and removes tutor operations from the case narrative."
      },
      {
        "title": "Phase 4 · usability notes",
        "text": "The report lists 6 moderated sessions: 4 parents and 2 tutors. This case study uses the four parent records only; consent, raw logs and tested-build mapping were not supplied."
      },
      {
        "title": "What remains separate",
        "text": "The synthetic S1–S5 dataset is an AI-generated method example and is excluded. A separate author-supplied n=5 retest report covers only three other tasks."
      }
    ],
    "evidence": "Three supplied phase documents · reported participant results are bounded",
    "note": "Phase 4 includes a study plan and a separate note-taking summary. The plan proposes measures such as SEQ/SUS, but no SEQ or SUS results appear in the supplied notes. The report describes task-completion codes and qualitative observations."
  },
  {
    "title": "Three friction points\nin the parent flow.",
    "chapter": "Understand",
    "kicker": "06 / REPORTED PARENT FINDINGS",
    "description": "The Phase 4 report records useful task-level signals in a four-parent sample. They identify prototype issues to address, not market-wide needs.",
    "layout": "findings",
    "items": [
      {
        "title": "Trust needed context",
        "text": "4/4 parents asked for more evidence: who verified credentials, whether reviews came from completed lessons, or what the tutor was like with children.",
        "response": "V2 labels verification data as illustrative. A real verification policy and review provenance are still required."
      },
      {
        "title": "Compare was easy to miss",
        "text": "3/4 parents did not find Compare on their own right away; one needed a moderator prompt. Several also missed or questioned filters.",
        "response": "V2 exposes comparison selection and a floating compare action on the results screen. This is an implementation response, not a measured improvement."
      },
      {
        "title": "Payment blocked 2/4 bookings",
        "text": "Two parents stopped when the v1 prototype offered only card payment. Three also raised cancellation, refund or support questions.",
        "response": "V2 offers simulated VietQR/MoMo paths and clearer demo states. It does not process a real transaction or validate operating policies."
      }
    ],
    "evidence": "Author-supplied Phase 4 usability notes · 4 parents · v1",
    "note": "Report-level counts: all four parents asked for more trust evidence; three of four did not discover Compare immediately; two of four stopped at card-only payment. Tiny samples and missing raw task logs limit interpretation."
  },
  {
    "title": "Linh is a starting\nhypothesis, not a study result.",
    "chapter": "Understand",
    "kicker": "07 / PERSONA & PROBLEM STATEMENT",
    "description": "A parent scenario from Phase 2 helps frame the task: find a suitable tutor, verify fit, and book around a family routine.",
    "layout": "persona",
    "items": [
      {
        "title": "Goal",
        "text": "Find a tutor whose subject, experience, schedule and price fit her child and household."
      },
      {
        "title": "Friction to investigate",
        "text": "Scattered listings make credentials, reviews, price and availability hard to compare."
      },
      {
        "title": "Design need",
        "text": "A reviewable choice with visible evidence, an available time and a clear amount due."
      }
    ],
    "evidence": "Phase 2 proto-persona · synthesized from secondary research; not a participant",
    "note": "The Phase 2 PDF describes Linh as a proto-persona drawn from platform/community review and competitor analysis. It does not establish that a person named Linh was interviewed. Phase 4 participants are reported separately and do not validate this segment."
  },
  {
    "title": "Map the parent task\nwithout implying full validation.",
    "chapter": "Understand",
    "kicker": "08 / USER JOURNEY MAP",
    "description": "The Phase 2 six-stage journey spans need through follow-up. Phase 4 observes only parts of search, comparison, scheduling and booking; before-search and post-booking remain hypotheses.",
    "layout": "journey",
    "items": [
      {
        "title": "Recognize need",
        "text": "Parent/child/school. Clarify need and budget; design: ask about a recent decision.",
        "evidence": "Untested in Phase 4."
      },
      {
        "title": "Find candidates",
        "text": "Search/referrals. Find options by subject, grade, price and location; design: surface core filters.",
        "evidence": "4/4 found options; 3/4 had filter friction."
      },
      {
        "title": "Vet & compare",
        "text": "Profiles/reviews. Compare fit; design: explain verification and expose Compare.",
        "evidence": "4/4 wanted more trust proof; 3/4 missed Compare."
      },
      {
        "title": "Check availability",
        "text": "Calendar. Match an open time; design: clarify date and selected state.",
        "evidence": "3/4 chose a slot easily; one corrected a date."
      },
      {
        "title": "Book & pay",
        "text": "Summary/checkout. Review trial and cost; design: show payment, policy and support.",
        "evidence": "2/4 completed; 2/4 stopped at card-only payment."
      },
      {
        "title": "Learn & continue",
        "text": "Lessons/messages. Attend or rebook; design: test follow-up and schedule changes.",
        "evidence": "Debrief expectations only; no longitudinal data."
      }
    ],
    "evidence": "Six journey stages · partial task evidence from Phase 4",
    "note": "The feeling labels in the Phase 2 journey are hypotheses. Phase 4 begins inside the prototype and does not measure real-life discovery or long-term learning."
  },
  {
    "title": "Make the next\nstep obvious.",
    "chapter": "Explore",
    "kicker": "CHAPTER 02",
    "description": "Starting the design",
    "layout": "chapter",
    "items": [
      {
        "title": "Structure",
        "text": "Sitemap & core flow"
      },
      {
        "title": "Explore",
        "text": "Wireframes & variations"
      },
      {
        "title": "Evaluate",
        "text": "Prototype & study plan"
      }
    ]
  },
  {
    "title": "A parent-first map\nfor finding and booking.",
    "chapter": "Explore",
    "kicker": "09 / SITEMAP",
    "description": "The revised IA follows the decision sequence parents used in the study: find options, compare evidence, choose a time, review terms and manage the booking.",
    "layout": "sitemap",
    "note": "This is a design synthesis of the Phase 3 sitemap, narrowed to parent tasks. It was not validated with card sorting or tree testing. Phase 4 observations support specific findability issues around filters and Compare."
  },
  {
    "title": "Explore the layout\nbefore the details.",
    "chapter": "Explore",
    "kicker": "10 / LAYOUT EXPLORATIONS",
    "description": "Early layout exploration can prioritize tutor information, calendar visibility, and a clear next action before adding visual polish.",
    "layout": "wireframes",
    "evidence": "Retrospective diagrams · not original paper sketches",
    "note": "These diagrams explain the design hierarchy retrospectively. They are not represented as historical evidence of paper sketching."
  },
  {
    "title": "Keep the essentials\nwithin reach.",
    "chapter": "Explore",
    "kicker": "11 / RESPONSIVE LAYOUT CONCEPT",
    "description": "Explore how tutor information and the booking action could adapt from a compact phone to a wider screen without changing the task order.",
    "layout": "responsive",
    "evidence": "Concept exploration · wider layouts proposed",
    "note": "Responsive variations are proposed concepts. The existing product is primarily a mobile prototype."
  },
  {
    "title": "Make the trade-offs\nvisible.",
    "chapter": "Explore",
    "kicker": "12 / DIGITAL WIREFRAMES",
    "description": "The final hierarchy balances concise tutor cards with deeper profiles, explicit lesson choices, and a persistent booking summary.",
    "layout": "wireframes",
    "evidence": "Reconstructed low-fidelity layouts",
    "note": "Documented retrospective reasoning: alternatives include dense all-in-one results versus progressive profile detail, and defaults versus preserved edits. See the decision log for rationale, trade-offs and validation limits.",
    "items": [
      {
        "title": "Progressive detail",
        "text": "Shortlist first; inspect qualifications in the profile."
      },
      {
        "title": "Review before paying",
        "text": "Keep date, time and amount visible at checkout."
      }
    ]
  },
  {
    "title": "Mobile first.\nClear choices.",
    "chapter": "Explore",
    "kicker": "13 / DIGITAL WIREFRAME VARIATIONS",
    "description": "Three mobile wireframes connect tutor discovery, profile details and scheduling, with one clear next action per screen.",
    "layout": "wireframes",
    "evidence": "Reconstructed mobile wireframes · retrospective layout exploration",
    "note": "Mobile only. These diagrams explain the final hierarchy retrospectively, rather than documenting original sketches.",
    "items": [
      {
        "title": "Find the right tutor",
        "text": "Scan key details before exploring the profile."
      },
      {
        "title": "Plan the next step",
        "text": "Group lesson choices above the booking action."
      }
    ]
  },
  {
    "title": "The parent booking flow\nhas three decision gates.",
    "chapter": "Explore",
    "kicker": "14 / LOW-FIDELITY PROTOTYPE",
    "description": "Phase 3 documents a shortest route of 15 steps and 3 decisions from app entry to booking confirmation. The count describes the supplied flow diagram, not observed taps or time.",
    "layout": "flow",
    "items": [
      {
        "title": "Find",
        "text": "Search by subject and grade; filter candidates."
      },
      {
        "title": "Choose",
        "text": "Review credentials and reviews; compare if needed."
      },
      {
        "title": "Plan",
        "text": "Choose an available slot and a trial or recurring option."
      },
      {
        "title": "Commit",
        "text": "Review booking and payment, then reach confirmation."
      }
    ],
    "evidence": "Phase 3 parent flow · 15 diagram steps · 3 decisions",
    "note": "The Phase 3 PDF says 15 steps and 3 decisions on the shortest path. The current local V2 route has seven primary screens from Home through confirmation (six transitions), excluding data entry and branches; these counts use different units."
  },
  {
    "title": "The reported v1 study\nfocused on real parent tasks.",
    "chapter": "Explore",
    "kicker": "15 / REPORTED STUDY DESIGN & NOTES",
    "description": "The supplied Phase 4 notes describe moderated sessions on prototype v1, with think-aloud prompts and task observations. The records cover parent search, compare and booking as well as tutor tasks.",
    "layout": "study",
    "items": [
      {
        "title": "Sample in the report",
        "text": "6 participants: 4 parents of children in grades 2–11 and 2 tutors; sessions are dated 2–6 October 2026."
      },
      {
        "title": "Parent tasks recorded",
        "text": "Find candidates within a budget, compare tutors, choose a lesson time, and attempt a trial booking."
      },
      {
        "title": "Measures shown",
        "text": "Task-completion codes (easy / difficulty / not completed), observations, selected path notes and post-choice confidence ratings."
      },
      {
        "title": "Measures not shown",
        "text": "No task-level timing table, SEQ/SUS results, formal severity ratings, consent records or raw observation/recording links in the supplied PDF."
      }
    ],
    "evidence": "Author-supplied report · n=6 overall · parent analysis n=4",
    "note": "The plan in the PDF and the completed note-taking sheet differ: the plan proposes interviews plus two tasks per role, while the sheet records multiple tasks and does not show completed interview records. This case study reports only what the notes actually contain."
  },
  {
    "title": "Correct the prototype\nbefore polishing it.",
    "chapter": "Explore",
    "kicker": "16 / IMPLEMENTATION REVIEW",
    "description": "An evaluator walkthrough exposed state and pricing defects in the local prototype. Regression checks confirm specific code behavior; they do not measure parent usability.",
    "layout": "findings",
    "items": [
      {
        "title": "An edit changed the time",
        "text": "A 19:30 selection reverted to 18:00 after Back/Continue. The schedule now restores the valid saved slot instead of a fixed default."
      },
      {
        "title": "Amounts could disagree",
        "text": "A trial inherited a full-course discount in the invoice. Shared quote rules now make trial, weekly and full amounts consistent."
      },
      {
        "title": "Feedback overstated reality",
        "text": "The calendar button claimed sync without integration. It now downloads a real .ics file and explains that import is manual."
      }
    ],
    "evidence": "Evaluator observations + 17 regression checks · no usability effect claimed",
    "note": "These findings come from implementation review, separate from the Phase 4 parent sessions. The regression suite does not prove comprehension or task success."
  },
  {
    "title": "Clarity in\nevery detail.",
    "chapter": "Refine",
    "kicker": "CHAPTER 03",
    "description": "Refining the design",
    "layout": "chapter",
    "items": [
      {
        "title": "Mockups",
        "text": "From intent to interface"
      },
      {
        "title": "Prototype",
        "text": "A connected booking journey"
      },
      {
        "title": "Accessibility",
        "text": "Designing for understanding"
      }
    ]
  },
  {
    "title": "Turn the findings\ninto bounded responses.",
    "chapter": "Refine",
    "kicker": "17 / V2 DESIGN RESPONSES",
    "description": "The current V2 prototype responds to the v1 issues. These changes are visible in the implementation; only the separate author-supplied retest report speaks to measured before/after results for three other tasks.",
    "layout": "comparison",
    "evidence": "Design response in current code · payment and tutor data remain simulated",
    "note": "The Phase 4 PDF does not contain a v2 retest. Do not attribute the later n=5 report to this study; the separate report covers quote, payment recovery and reschedule tasks, with build mapping still pending.",
    "items": [
      {
        "title": "Make comparison visible",
        "text": "V2 shows compare selection on result cards and a floating action bar after two tutors are selected. The Phase 4 files do not report a retest of this change."
      },
      {
        "title": "Offer familiar demo payment paths",
        "text": "V2 presents VietQR and MoMo as simulated choices. QR artwork cannot be scanned for payment; there is no real provider integration."
      },
      {
        "title": "Make trust claims precise",
        "text": "V2 marks verification and tutor data as illustrative. Real verification evidence, review provenance, refund terms and support operations remain unimplemented."
      }
    ]
  },
  {
    "title": "A clear path\nfrom search to session.",
    "chapter": "Refine",
    "kicker": "18 / MOCKUPS: ORIGINAL SCREEN SIZE",
    "description": "The mobile experience connects tutor discovery, profile review, scheduling, and payment with consistent visual cues.",
    "layout": "gallery",
    "note": "These are live, non-interactive previews of the V2 components in this repository. Tutor profiles and payment details are demonstration data."
  },
  {
    "title": "One mobile journey.\nThree decision states.",
    "chapter": "Refine",
    "kicker": "19 / MOBILE STATES",
    "description": "Three mobile states make different decisions visible: evaluate a tutor, select a lesson, then review commitment before payment.",
    "layout": "mobile-states",
    "evidence": "Live mobile components · fixture data and payment remain simulated",
    "note": "These are state examples, not a responsive-device study. They show the implemented mobile flow after the copy and status corrections.",
    "items": [
      {
        "title": "Evaluate",
        "text": "Tutor profile and available bands"
      },
      {
        "title": "Choose",
        "text": "Date, duration and time slot"
      },
      {
        "title": "Review",
        "text": "Amount due and payment state"
      }
    ]
  },
  {
    "title": "Experience the\nbooking journey.",
    "chapter": "Refine",
    "kicker": "20 / HIGH-FIDELITY PROTOTYPE",
    "description": "Explore the working prototype from tutor search through scheduling, checkout, confirmation, and ongoing lesson management.",
    "layout": "prototype",
    "items": [
      {
        "title": "Discover",
        "text": "Find a tutor and review their profile."
      },
      {
        "title": "Book",
        "text": "Set a lesson schedule and review fees."
      },
      {
        "title": "Manage",
        "text": "See upcoming lessons and payment status."
      }
    ],
    "note": "Use Open interactive prototype to enter the local V2 experience. The Figma link opens the final design board. Payment actions are simulated."
  },
  {
    "title": "Reported audit.\nDefined scope.",
    "chapter": "Refine",
    "kicker": "21 / ACCESSIBILITY CONSIDERATIONS",
    "description": "An author-supplied report records a limited audit across iOS, Android and desktop. Its results are not generalized into a whole-product conformance claim.",
    "layout": "accessibility",
    "items": [
      {
        "title": "Multiple environments",
        "text": "The report names VoiceOver on iPhone 14, TalkBack on Galaxy S23, and keyboard testing on a MacBook Pro."
      },
      {
        "title": "Reported results",
        "text": "It records 4.54:1 and 8.6:1 for two samples, plus passing 200% zoom, focus and touch-target checks within its scope."
      },
      {
        "title": "Claim limit",
        "text": "There is no component/state inventory or independent audit. The case study does not claim whole-product WCAG AA conformance."
      }
    ],
    "evidence": "Author-supplied audit report · limited scope",
    "note": "Open Evidence for the original report and reconciliation addendum. Complete raw-log/build mapping before making a stronger claim."
  },
  {
    "title": "Ten heuristics.\nFour issues still visible.",
    "chapter": "Refine",
    "kicker": "22 / HEURISTIC REVIEW",
    "description": "Evaluator desk review of the current parent flow, cross-checked against the supplied v1 observations. Scores are reviewer judgments, not participant ratings or WCAG results.",
    "layout": "heuristics",
    "evidence": "Evaluator review · provisional heuristic scores, not user metrics",
    "note": "Nielsen heuristics are applied as a structured expert review. Ratings summarize the current local implementation and evidence on hand; they are not a usability scale. User validation and an expanded accessibility audit remain separate.",
    "items": [
      {
        "title": "Visibility of system status",
        "score": 7,
        "text": "Pending, failed and retry states are explicit in the demo; no live payment status exists."
      },
      {
        "title": "Match to the real world",
        "score": 7,
        "text": "Vietnamese labels and local demo payment; refund terms remain illustrative."
      },
      {
        "title": "User control and freedom",
        "score": 8,
        "text": "Back preserves choices; pending reschedule can be cancelled."
      },
      {
        "title": "Consistency and standards",
        "score": 7,
        "text": "Shared components and tokens; v1 notes small text and date controls."
      },
      {
        "title": "Error prevention",
        "score": 8,
        "text": "Slot, quote and conflict checks exist; tutor inventory is demo data."
      },
      {
        "title": "Recognition rather than recall",
        "score": 7,
        "text": "Booking summary shows date and fee; 3/4 initially missed Compare."
      },
      {
        "title": "Flexibility and efficiency",
        "score": 6,
        "text": "Filters and Compare exist; v1 users missed controls or wanted more filters."
      },
      {
        "title": "Aesthetic and minimalist design",
        "score": 6,
        "text": "Coherent visual system; one parent reported small text and tiny arrows."
      },
      {
        "title": "Help users recover from errors",
        "score": 7,
        "text": "Retry and preserved choices exist; support and refund details need prominence."
      },
      {
        "title": "Help and documentation",
        "score": 5,
        "text": "Support was unclear in v1; no real service support exists."
      }
    ]
  },
  {
    "title": "A foundation\nfor what comes next.",
    "chapter": "Reflect",
    "kicker": "CHAPTER 04",
    "description": "Going forward",
    "layout": "chapter",
    "items": [
      {
        "title": "Reflect",
        "text": "Design intent & lessons"
      },
      {
        "title": "Validate",
        "text": "Close the evidence gaps"
      },
      {
        "title": "Improve",
        "text": "Next product iterations"
      }
    ]
  },
  {
    "title": "Separate baseline evidence\nfrom the later retest.",
    "chapter": "Reflect",
    "kicker": "23 / WHAT THE EVIDENCE SUPPORTS",
    "description": "The Phase 4 PDF reports a v1 baseline with six participants; a separate report in the project describes a later five-parent retest on three tasks. Keep the rounds distinct.",
    "layout": "takeaways",
    "items": [
      {
        "title": "Parent-first scope",
        "text": "The case study follows search, compare, schedule and booking; tutor-side operations are excluded from the narrative."
      },
      {
        "title": "Baseline v1 report",
        "text": "2/4 parents completed the booking task; the other two stopped at card-only payment. 4/4 asked for more trust proof."
      },
      {
        "title": "Separate v1/v2 retest",
        "text": "A different author-supplied report states 5/5 completion on v2 for three tasks only. Keep it separate from the Phase 4 baseline and label its limits."
      }
    ],
    "evidence": "Two author-supplied reports · neither independently verified in this review",
    "note": "The Phase 4 PDF reports n=6 overall, with n=4 parents and two booking failures at payment. A separate report describes 5/5 completion on v2 for quote, payment recovery and reschedule. The latter does not cover search, comparison, onboarding or the whole flow; raw artifacts and build mapping remain outstanding."
  },
  {
    "title": "Close the evidence gaps\nbefore claiming a validated flow.",
    "chapter": "Reflect",
    "kicker": "24 / NEXT STEPS",
    "description": "The fastest credibility gains come from reconciling the supplied sessions and retesting the parent booking decisions that the baseline exposed.",
    "layout": "cards",
    "items": [
      {
        "title": "Next 1–2 days",
        "text": "Keep the deck parent-only; reconcile n=6 baseline vs separate n=5 retest; publish anonymized source mapping and remove unsupported market-wide claims."
      },
      {
        "title": "Next 1–2 weeks",
        "text": "Recover consent and task-level records; map exact v1/v2 builds; run a comparable parent retest for Compare, trust cues, fee/policy comprehension and payment recovery."
      },
      {
        "title": "Longer term",
        "text": "Run card sorting/tree testing, test multiple children and post-booking tasks, then validate real availability, support and payment operations with appropriate safeguards."
      }
    ],
    "note": "If raw session evidence, consent or tested builds do not exist, retain the reports as author-supplied evidence and do not imply independent verification."
  },
  {
    "title": "Better tutoring\nstarts with a clearer choice.",
    "chapter": "Reflect",
    "kicker": "THANK YOU / LET’S CONNECT",
    "description": "Bryan Lê · UX and UI design · 10-week concept project. A parent-first case study grounded in supplied research artifacts, bounded by what those artifacts can verify.",
    "layout": "closing",
    "note": "Contact details are supplied by the project author for publication. This case study documents a concept and its limitations; it does not claim production deployment or participant research."
  }
];
