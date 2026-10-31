export type CaseStudyLayout = 'cover' | 'overview' | 'split' | 'cards' | 'chapter' | 'persona' | 'journey' | 'sitemap' | 'wireframes' | 'responsive' | 'mobile-sizes' | 'mobile-states' | 'flow' | 'study' | 'research-summary' | 'findings' | 'comparison' | 'gallery' | 'prototype' | 'accessibility' | 'heuristics' | 'takeaways' | 'closing';
export interface CaseStudySlide {
  title: string;
  chapter: string;
  kicker: string;
  description: string;
  layout: CaseStudyLayout;
  items?: { title: string; text: string; evidence?: string; response?: string; score?: number }[];
  note?: string;
  evidence?: string;
  researchMethod?: string;
  journeyPersona?: string;
  journeyGoal?: string;
  journeyRows?: { label: string; values: string[] }[];
}
export const CASE_STUDY_SLIDES: CaseStudySlide[] = [
  {
    "title": "From scattered search\nto a confident booking.",
    "chapter": "Project overview",
    "kicker": "BRYAN LÊ / UX & UI DESIGN",
    "description": "A parent-focused tutoring concept: compare a credible tutor, choose an available trial, and understand the commitment before paying.",
    "layout": "cover",
    "note": "A 10-week UX/UI concept by Bryan Lê. This case study now follows the parent path from discovery to booking. All tutor profiles, verification labels, availability, policies and payment choices in the prototype are demo data."
  },
  {
    "title": "Project overview",
    "chapter": "Project overview",
    "kicker": "PROJECT OVERVIEW",
    "description": "TutorNest is a mobile tutoring marketplace concept for parents in Vietnam. This case study follows the parent booking path from search to confirmation.",
    "layout": "overview",
    "items": [
      {
        "title": "Product",
        "text": "A mobile-first tutoring marketplace concept."
      },
      {
        "title": "Audience",
        "text": "Parents in Vietnam looking for tutoring for their child."
      },
      {
        "title": "Core experience",
        "text": "Search, compare, check availability, book and confirm a lesson."
      }
    ],
    "note": "All tutor profiles, verification labels, availability, policies and payment choices shown in the prototype are demo data. This is a concept, not a live service."
  },
  {
    "title": "Project overview",
    "chapter": "Project overview",
    "kicker": "PROJECT OVERVIEW",
    "description": "Parents could find tutors, but the supplied study notes point to friction when judging tutor credibility, comparing options and completing payment.",
    "layout": "split",
    "items": [
      {
        "title": "The problem",
        "text": "Parents need a clear way to assess tutor fit and trust, choose a workable time, and understand what they will pay before booking."
      },
      {
        "title": "The goal",
        "text": "Help parents compare tutors, select an available lesson and review the booking terms with confidence."
      }
    ],
    "evidence": "Author-supplied usability notes · parent sample n=4",
    "note": "The counts describe four parent participants in one reported study. They are not estimates of behavior across Vietnamese parents."
  },
  {
    "title": "Project overview",
    "chapter": "Project overview",
    "kicker": "PROJECT OVERVIEW",
    "description": "A solo UX/UI concept project with a parent-first scope and proposed measures for future validation.",
    "layout": "cards",
    "items": [
      {
        "title": "My role & duration",
        "text": "Bryan Lê · UX/UI design · 10 weeks."
      },
      {
        "title": "Responsibilities & tools",
        "text": "Research synthesis, problem framing, IA, parent flow, wireframes, prototype and usability review · Figma and React."
      },
      {
        "title": "Scope & success measures",
        "text": "Search through booking confirmation. Proposed measures cover independent comparison, correct schedule selection, policy/payment understanding and recovery after interruption."
      }
    ],
    "evidence": "Author-supplied role, duration and project records · measures are proposals",
    "note": "The concept excludes tutor-side operations, production verification, live inventory and real payment processing. Proposed measures are not achieved results or numeric targets."
  },
  {
    "title": "Understanding the user",
    "chapter": "Understanding the user",
    "kicker": "CHAPTER 01",
    "description": "Understanding the user",
    "layout": "chapter",
    "items": [
      {
        "title": "User research",
        "text": ""
      },
      {
        "title": "Personas",
        "text": ""
      },
      {
        "title": "Problem statements",
        "text": ""
      },
      {
        "title": "User journey maps",
        "text": ""
      }
    ]
  },
  {
    "title": "User research: summary",
    "chapter": "Understanding the user",
    "kicker": "USER RESEARCH: SUMMARY",
    "description": "The project records combine competitor and community review with a reported moderated usability study. The study plan and completed-session worksheet do not describe the same evidence.",
    "researchMethod": "The supplied records include secondary research, a parent booking flow and sitemap, and moderated prototype sessions. No completed interview findings or survey results were supplied; session location and duration are not stated.",
    "layout": "research-summary",
    "items": [
      {
        "title": "Secondary research",
        "text": "Competitor and community sources informed a six-stage parent journey and proto-persona Linh. This is a starting hypothesis, not direct interview evidence."
      },
      {
        "title": "Usability sessions",
        "text": "The worksheet reports six moderated sessions from 2–6 Oct 2026: four parents and two tutors. Findings in this case study use the four parent records."
      },
      {
        "title": "Evidence limits",
        "text": "No consent records, raw session logs, full task timings, SEQ/SUS results, formal issue severity or tested-build IDs were supplied. Card sorting and tree testing are not reported."
      }
    ],
    "evidence": "Author-supplied plan and worksheet · n=6 overall · parent findings n=4",
    "note": "The plan mentions interviews and proposed measures; the supplied worksheet does not include completed interview findings or SEQ/SUS results. It also differs from the plan on task count. Keep the separate n=5 follow-up report and AI-generated sample out of this study."
  },
  {
    "title": "User research: pain points",
    "chapter": "Understanding the user",
    "kicker": "USER RESEARCH: PAIN POINTS",
    "description": "The parent-study worksheet records three recurring points of friction in the tested booking concept. The small sample identifies issues to investigate, not market-wide needs.",
    "layout": "findings",
    "items": [
      {
        "title": "Trust needed more evidence",
        "text": "4/4 parents asked who verified tutor details, whether reviews came from completed lessons, or how the tutor teaches children.",
        "response": "Make evidence and its source visible. The current design labels example verification data as illustrative; real verification and review provenance remain open."
      },
      {
        "title": "Compare and filters were hard to find",
        "text": "3/4 parents missed Compare at first or needed a prompt; several missed or questioned the available filters.",
        "response": "Make comparison easier to discover and clarify active filters. The updated interface is a design response, not a measured improvement."
      },
      {
        "title": "Card-only payment stopped bookings",
        "text": "2/4 parents stopped at the payment step when only card payment was available. 3/4 also raised cancellation, refund or support questions.",
        "response": "Show payment, policy and support information before commitment. Demo QR/MoMo paths are simulated and do not validate real payment operations."
      }
    ],
    "evidence": "Author-supplied parent usability worksheet · n=4",
    "note": "The worksheet reports task codes and observations but not a full task-level timing or assistance log. Two completed bookings do not establish an unassisted completion rate."
  },
  {
    "title": "Persona: Linh",
    "chapter": "Understanding the user",
    "kicker": "PERSONA: LINH",
    "description": "Linh is a proto-persona synthesized from competitor and community sources. The problem statement below is a design hypothesis, not a profile validated through interviews.",
    "layout": "persona",
    "items": [
      {
        "title": "Goal",
        "text": "Find a tutor whose subject, experience, schedule and price fit her child and household."
      },
      {
        "title": "Friction to investigate",
        "text": "Scattered listings make qualifications, reviews, price and availability difficult to compare."
      },
      {
        "title": "Design need",
        "text": "A choice that is easy to review, with visible evidence, an available time and a clear amount due."
      }
    ],
    "evidence": "Proto-persona from secondary research · not a study participant",
    "note": "The source material describes Linh as a synthesis of platform/community reviews and competitor analysis. It does not establish that a person named Linh was interviewed; the four parent participants are reported separately."
  },
  {
    "title": "User journey map",
    "chapter": "Understanding the user",
    "kicker": "USER JOURNEY MAP",
    "description": "This map links the parent’s actions and tasks to reported feelings and design opportunities. The six-stage frame comes from secondary research; only parts of search through booking were observed in the parent usability study.",
    "layout": "journey",
    "journeyPersona": "Parent proto-persona Linh · synthesized from secondary research; not a tested participant profile.",
    "journeyGoal": "Find a suitable tutor, assess trust and fit, then book a lesson that works for the family’s schedule and budget.",
    "items": [
      {
        "title": "Recognize need"
      },
      {
        "title": "Find candidates"
      },
      {
        "title": "Vet & compare"
      },
      {
        "title": "Check availability"
      },
      {
        "title": "Book & pay"
      },
      {
        "title": "Learn & continue"
      }
    ],
    "journeyRows": [
      {
        "label": "Action",
        "values": [
          "Recognize a need for tutoring.",
          "Search and filter tutors.",
          "Review profiles and compare.",
          "Choose a date and time.",
          "Review terms and attempt payment.",
          "Attend, manage or rebook lessons."
        ]
      },
      {
        "label": "Task list",
        "values": [
          "Clarify subject, grade and budget.",
          "Find candidates with relevant filters.",
          "Check fit, qualifications and reviews.",
          "Select and confirm an available slot.",
          "Understand trial terms and amount due.",
          "Track lessons and decide whether to continue."
        ]
      },
      {
        "label": "Feeling / evidence",
        "values": [
          "Hypothesis · need not observed.",
          "4/4 found candidates; 3/4 had filter friction.",
          "4/4 wanted more trust proof; 3/4 missed Compare.",
          "3/4 chose a slot easily; one corrected a date.",
          "2/4 completed; 2/4 stopped at card-only payment.",
          "Unknown · no longitudinal evidence."
        ]
      },
      {
        "label": "Improvement opportunity",
        "values": [
          "Explore the family’s latest tutoring decision.",
          "Use plain filters and show active criteria.",
          "Expose Compare; explain verification and review sources.",
          "Clarify selected date/time and preserve it on Back.",
          "Show cost and policy before payment.",
          "Research follow-up, rescheduling and rebooking."
        ]
      }
    ],
    "evidence": "Secondary-research journey framework · partial task evidence from parent usability study",
    "note": "Feelings in the journey are hypotheses, not direct quotes. The parent study provides task observations for a small parent sample, not a complete journey validation. The final stage and its opportunities require follow-up research."
  },
  {
    "title": "Starting the design",
    "chapter": "Starting the design",
    "kicker": "CHAPTER 02",
    "description": "Starting the design",
    "layout": "chapter",
    "items": [
      {
        "title": "Sitemap",
        "text": ""
      },
      {
        "title": "Paper wireframes",
        "text": ""
      },
      {
        "title": "Digital wireframes",
        "text": ""
      },
      {
        "title": "Low-fidelity prototype",
        "text": ""
      },
      {
        "title": "Usability studies",
        "text": ""
      }
    ]
  },
  {
    "title": "Sitemap",
    "chapter": "Starting the design",
    "kicker": "SITEMAP",
    "description": "The revised IA follows the decision sequence parents used in the study: find options, compare evidence, choose a time, review terms and manage the booking.",
    "layout": "sitemap",
    "note": "This is a design synthesis of the sitemap and flow documentation, narrowed to parent tasks. It was not validated with card sorting or tree testing. Observations from the parent study support specific findability issues around filters and Compare."
  },
  {
    "title": "Paper wireframes",
    "chapter": "Starting the design",
    "kicker": "PAPER WIREFRAMES",
    "description": "Retrospective low-fidelity layouts explore the information parents need while finding a tutor, reviewing a profile and planning a lesson.",
    "layout": "wireframes",
    "evidence": "Wireframe-style reconstructions · original paper sketches not supplied",
    "note": "These diagrams explain hierarchy and task order. They are not presented as historical paper sketches."
  },
  {
    "title": "Paper wireframe screen size variations",
    "chapter": "Starting the design",
    "kicker": "PAPER WIREFRAME SCREEN SIZE VARIATIONS",
    "description": "The same core search screen is explored at three illustrative mobile widths to show how the layout could adapt.",
    "layout": "mobile-sizes",
    "evidence": "Illustrative width variations · no original device measurements supplied",
    "note": "These are retrospective wireframe reconstructions, not original paper variations or a responsive-device test.",
    "items": [
      {
        "title": "Compact",
        "text": ""
      },
      {
        "title": "Standard",
        "text": ""
      },
      {
        "title": "Roomier",
        "text": ""
      }
    ]
  },
  {
    "title": "Digital wireframes",
    "chapter": "Starting the design",
    "kicker": "DIGITAL WIREFRAMES",
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
    "title": "Digital wireframe screen size variation(s)",
    "chapter": "Starting the design",
    "kicker": "DIGITAL WIREFRAME SCREEN SIZE VARIATION(S)",
    "description": "A wider-screen concept shows how tutor details and the booking action could adapt while keeping the parent task order.",
    "layout": "responsive",
    "evidence": "Proposed wider layout · not a tested responsive product",
    "note": "The implemented concept is primarily mobile. These layout variations are proposals and have not been validated across devices."
  },
  {
    "title": "Low-fidelity prototype",
    "chapter": "Starting the design",
    "kicker": "LOW-FIDELITY PROTOTYPE",
    "description": "the parent-flow diagram shows a shortest route of 15 steps and 3 decisions from app entry to booking confirmation. The count describes the supplied flow diagram, not observed taps or time.",
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
    "evidence": "Documented parent flow · 15 diagram steps · 3 decisions",
    "note": "The flow-map document says 15 steps and 3 decisions on the shortest path. The current local prototype route has seven primary screens from Home through confirmation (six transitions), excluding data entry and branches; these counts use different units."
  },
  {
    "title": "Usability study: parameters",
    "chapter": "Starting the design",
    "kicker": "USABILITY STUDY: PARAMETERS",
    "description": "The completed-session worksheet is the available record of a moderated prototype study. Details absent from that record remain unreported.",
    "layout": "study",
    "items": [
      {
        "title": "Study type",
        "text": "Moderated usability sessions on a prototype. The plan and worksheet differ on the number of tasks."
      },
      {
        "title": "Participants & dates",
        "text": "Six reported participants: four parents and two tutors. Sessions are dated 2–6 Oct 2026."
      },
      {
        "title": "Tasks",
        "text": "Parent tasks covered finding tutors, comparing options, selecting a schedule and attempting a trial booking."
      },
      {
        "title": "Measures & gaps",
        "text": "The worksheet codes outcomes as easy, difficulty or not completed and records observations. Location, duration, full task timings, SEQ/SUS and formal severity are not reported. Future measures should include independent discovery, schedule accuracy, policy comprehension and recovery."
      }
    ],
    "evidence": "Author-supplied worksheet · parent-only analysis n=4",
    "note": "Consent, recording links and exact tested-build IDs were not supplied. Do not infer these from the study plan or from the separate follow-up report."
  },
  {
    "title": "Usability study: findings",
    "chapter": "Starting the design",
    "kicker": "USABILITY STUDY: FINDINGS",
    "description": "The worksheet reports task-level signals from four parents. These findings point to prototype issues; they do not establish prevalence or market fit.",
    "layout": "findings",
    "items": [
      {
        "title": "Trust needed context",
        "text": "4/4 parents asked for more evidence: who verified credentials, whether reviews came from completed lessons, or what the tutor was like with children.",
        "response": "The updated design labels verification data as illustrative. A real verification policy and review provenance are still required."
      },
      {
        "title": "Compare was easy to miss",
        "text": "3/4 parents did not find Compare on their own right away; one needed a moderator prompt. Several also missed or questioned filters.",
        "response": "The updated design makes comparison selection and a floating compare action on the results screen. This is an implementation response, not a measured improvement."
      },
      {
        "title": "Payment blocked 2/4 bookings",
        "text": "Two parents stopped when the initial prototype offered only card payment. Three also raised cancellation, refund or support questions.",
        "response": "The updated design offers simulated VietQR/MoMo paths and clearer demo states. It does not process a real transaction or validate operating policies."
      }
    ],
    "evidence": "Author-supplied usability worksheet · parent sample n=4",
    "note": "The separate n=5 report covers three other tasks and is not a retest of this baseline. The reports have not been independently reconciled to raw task logs or tested builds."
  },
  {
    "title": "Refining the design",
    "chapter": "Refining the design",
    "kicker": "CHAPTER 03",
    "description": "Refining the design",
    "layout": "chapter",
    "items": [
      {
        "title": "Mockups",
        "text": ""
      },
      {
        "title": "High-fidelity prototype",
        "text": ""
      },
      {
        "title": "Accessibility",
        "text": ""
      }
    ]
  },
  {
    "title": "Mockups",
    "chapter": "Refining the design",
    "kicker": "MOCKUPS",
    "description": "The updated design responds to the reported trust, comparison and payment issues. Separate evaluator review also corrected schedule, quote and calendar-feedback defects in the local prototype.",
    "layout": "comparison",
    "evidence": "Design response in current implementation · no user improvement claim",
    "note": "Implementation review also fixed a saved 19:30 slot reverting after Back, a trial receiving the full-course discount, and a calendar button claiming sync without integration. Regression checks confirm code behavior, not usability. The baseline study does not retest these changes; a separate n=5 report covers three other tasks and still needs build mapping.",
    "items": [
      {
        "title": "Make comparison visible",
        "text": "Show comparison selection on result cards and a persistent action after two tutors are chosen. The baseline report does not measure the effect."
      },
      {
        "title": "Clarify payment and terms",
        "text": "Present simulated VietQR/MoMo choices and clearer amount/policy context. No real payment provider or verified operating policy is connected."
      },
      {
        "title": "State trust evidence precisely",
        "text": "Label tutor and verification details as examples. Real verification evidence, review provenance and support operations remain unimplemented."
      }
    ]
  },
  {
    "title": "Mockups: Original screen size",
    "chapter": "Refining the design",
    "kicker": "MOCKUPS: ORIGINAL SCREEN SIZE",
    "description": "The mobile mockups connect tutor discovery, profile review, scheduling, payment and confirmation.",
    "layout": "gallery",
    "note": "These are previews of the implemented concept, not evidence of production use.",
    "evidence": "Live mobile component previews · profile and payment data are illustrative"
  },
  {
    "title": "Mockups: Screen size variations",
    "chapter": "Refining the design",
    "kicker": "MOCKUPS: SCREEN SIZE VARIATIONS",
    "description": "A wider-screen mockup concept explores how the parent booking flow could work beyond the primary mobile layout.",
    "layout": "responsive",
    "evidence": "Proposed wider-screen concept · not a validated responsive release",
    "note": "The mobile design is the primary prototype. Wider-screen layouts are exploratory and have not been tested with parents."
  },
  {
    "title": "High-fidelity prototype",
    "chapter": "Refining the design",
    "kicker": "HIGH-FIDELITY PROTOTYPE",
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
    "note": "Use Open interactive prototype to enter the local updated-design experience. The Figma link opens the final design board. Payment actions are simulated."
  },
  {
    "title": "Accessibility considerations",
    "chapter": "Refining the design",
    "kicker": "ACCESSIBILITY CONSIDERATIONS",
    "description": "A limited author-supplied accessibility audit is described alongside a ten-part evaluator heuristic review. Neither is a whole-product accessibility certification.",
    "layout": "heuristics",
    "evidence": "Limited accessibility audit · evaluator heuristic review",
    "note": "The report names VoiceOver on iPhone 14, TalkBack on Galaxy S23, and keyboard testing on a MacBook Pro. It records 4.54:1 and 8.6:1 for two samples, plus passing 200% zoom, focus and touch-target checks within its scope. No full component/state inventory or independent audit was supplied.",
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
        "text": "Shared components and tokens; notes from the initial prototype small text and date controls."
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
        "text": "Filters and Compare exist; users of the initial prototype missed controls or wanted more filters."
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
        "text": "Support was unclear in the initial prototype; no real service support exists."
      }
    ]
  },
  {
    "title": "Going forward",
    "chapter": "Going forward",
    "kicker": "CHAPTER 04",
    "description": "Going forward",
    "layout": "chapter",
    "items": [
      {
        "title": "Takeaways",
        "text": ""
      },
      {
        "title": "Next steps",
        "text": ""
      }
    ]
  },
  {
    "title": "Takeaways",
    "chapter": "Going forward",
    "kicker": "TAKEAWAYS",
    "description": "The work combines a small reported baseline, a parent-first design response and a separate follow-up report that must remain distinct.",
    "layout": "takeaways",
    "items": [
      {
        "title": "Parent-first scope",
        "text": "The case study follows discovery, comparison, scheduling and booking. Tutor operations and live transactions are outside scope."
      },
      {
        "title": "What the baseline says",
        "text": "Four parents asked for more trust evidence; three missed Compare initially; two stopped at card-only payment. Treat these as small-sample signals."
      },
      {
        "title": "What remains unknown",
        "text": "A separate author-supplied report describes five parents completing three other tasks. It does not validate this full flow or prove the design changes caused better outcomes."
      }
    ],
    "evidence": "Two author-supplied reports · not independently verified",
    "note": "Keep study rounds, tasks, sample sizes and prototype builds separate. Do not claim production impact or market fit."
  },
  {
    "title": "Next steps",
    "chapter": "Going forward",
    "kicker": "NEXT STEPS",
    "description": "The fastest credibility gains come from reconciling the supplied sessions and retesting the parent booking decisions that the baseline exposed.",
    "layout": "cards",
    "items": [
      {
        "title": "Next 1–2 days",
        "text": "Keep the deck parent-only; reconcile n=6 baseline vs separate n=5 retest; publish anonymized source mapping and remove unsupported market-wide claims."
      },
      {
        "title": "Next 1–2 weeks",
        "text": "Recover consent and task-level records; map exact builds of the initial and updated prototypes; run a comparable parent retest for Compare, trust cues, fee/policy comprehension and payment recovery."
      },
      {
        "title": "Longer term",
        "text": "Run card sorting/tree testing, test multiple children and post-booking tasks, then validate real availability, support and payment operations with appropriate safeguards."
      }
    ],
    "note": "If raw session evidence, consent or tested builds do not exist, retain the reports as author-supplied evidence and do not imply independent verification."
  },
  {
    "title": "Let’s connect!",
    "chapter": "Going forward",
    "kicker": "LET’S CONNECT!",
    "description": "Bryan Lê · UX and UI design · 10-week concept project. A parent-first case study grounded in supplied research artifacts and limited to what those materials support.",
    "layout": "closing",
    "note": "Contact details are supplied by the project author. This concept is not a production service and does not claim participant research beyond the author-supplied records."
  }
];
