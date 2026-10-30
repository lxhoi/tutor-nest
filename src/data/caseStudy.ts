export type CaseStudyLayout = 'cover' | 'overview' | 'split' | 'cards' | 'chapter' | 'persona' | 'journey' | 'sitemap' | 'wireframes' | 'responsive' | 'mobile-sizes' | 'mobile-states' | 'flow' | 'study' | 'findings' | 'comparison' | 'gallery' | 'prototype' | 'accessibility' | 'takeaways' | 'closing';
export interface CaseStudySlide {
  title: string;
  chapter: string;
  kicker: string;
  description: string;
  layout: CaseStudyLayout;
  items?: { title: string; text: string }[];
  note?: string;
  evidence?: string;
}
export const CASE_STUDY_SLIDES: CaseStudySlide[] = [
  {
    "title": "A little more trust.\nA lot more possibility.",
    "chapter": "Overview",
    "kicker": "BRYAN LÊ / UX & UI DESIGN",
    "description": "A parent-first tutoring concept: find the right tutor, plan lessons, and understand the commitment.",
    "layout": "cover",
    "note": "Bryan Lê · UX and UI design · 10-week project. This is a concept case study with a simulated prototype, not a live tutoring service."
  },
  {
    "title": "The right support,\ncloser to home.",
    "chapter": "Overview",
    "kicker": "01 / PROJECT OVERVIEW",
    "description": "TutorNest is a mobile-first tutoring platform concept for parents in Vietnam. It brings tutor discovery, lesson scheduling, and payments into one connected experience.",
    "layout": "overview",
    "items": [
      {
        "title": "The product",
        "text": "A mobile-first tutoring concept for parents in Vietnam."
      },
      {
        "title": "Designer & role",
        "text": "Bryan Lê — UX and UI design."
      },
      {
        "title": "Duration & tools",
        "text": "10 weeks · Figma · React interactive prototype."
      }
    ],
    "note": "Author, role, duration and contact information were confirmed by Bryan Lê. No client, team size, research participation, or business outcome is claimed."
  },
  {
    "title": "From uncertainty\nto a confident choice.",
    "chapter": "Overview",
    "kicker": "02 / THE PROBLEM & GOAL",
    "description": "Working hypothesis: parents need to combine tutor fit, schedule fit and cost before committing. The design focuses on making those decisions inspectable and reversible.",
    "layout": "split",
    "items": [
      {
        "title": "The design question",
        "text": "How might we help a parent review a suitable tutor, an available lesson and the amount due without losing their choices when editing?"
      },
      {
        "title": "Scope & success criteria",
        "text": "One active demo booking; no real transactions. Editing must preserve a valid time, and every amount view must agree. Parent comprehension remains to be tested."
      }
    ],
    "evidence": "HMW + implementation criteria · user need remains a hypothesis",
    "note": "This problem statement is inferred from the final design and project context; it is not a documented interview result."
  },
  {
    "title": "Designing the\nwhole journey.",
    "chapter": "Overview",
    "kicker": "03 / DESIGN SCOPE",
    "description": "The case study covers the decisions that connect product structure, interface design, and the booking experience.",
    "layout": "cards",
    "items": [
      {
        "title": "Frame the experience",
        "text": "Define the parent journey, information hierarchy, and questions requiring user validation."
      },
      {
        "title": "Design the interface",
        "text": "Connect tutor discovery, scheduling, payment choices, and lesson management."
      },
      {
        "title": "Review & refine",
        "text": "Address observed prototype defects and document implementation checks separately from user research."
      }
    ],
    "evidence": "Bryan Lê · UX and UI design · 10 weeks",
    "note": "The documented contribution is UX and UI design. Research plans are presented as proposed work, not completed fieldwork."
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
    "title": "Method first.\nClaims second.",
    "chapter": "Understand",
    "kicker": "04 / METHOD & LIMITATIONS",
    "description": "This concept combines desk research, an evaluator review, implementation checks and clearly labelled synthetic examples. It does not report a completed parent study.",
    "layout": "cards",
    "items": [
      {
        "title": "What is real",
        "text": "Local prototype, 17 regression checks, an evaluator walkthrough and verified external sources."
      },
      {
        "title": "What is simulated",
        "text": "Five proto-personas and the analysis pipeline; every simulated row, quote and hypothesis is labelled."
      },
      {
        "title": "What is still needed",
        "text": "Real recruitment, consent, observation and retesting before claims about parents or impact."
      }
    ],
    "evidence": "Methods and evidence classes disclosed · no participant findings claimed",
    "note": "Synthetic examples were generated with AI from assumed personas and heuristic-based scenarios because no real participant study was possible. Replace them with consented parent sessions when available."
  },
  {
    "title": "Four sources\nof hesitation.",
    "chapter": "Understand",
    "kicker": "05 / USER PAIN POINTS",
    "description": "The final interface points to four needs worth investigating with parents.",
    "layout": "cards",
    "items": [
      {
        "title": "Is this tutor right?",
        "text": "Credentials and teaching experience need to be easy to assess."
      },
      {
        "title": "Will our schedules fit?",
        "text": "Parents need a clear view of available and recurring lessons."
      },
      {
        "title": "What am I paying?",
        "text": "Hourly rates, weekly fees, and course totals need clear context."
      },
      {
        "title": "What happens next?",
        "text": "Confirmation, upcoming lessons, and payment status need to stay visible."
      }
    ],
    "evidence": "Inferred pain points · validation needed"
  },
  {
    "title": "Meet a parent\nlike Minh Anh.",
    "chapter": "Understand",
    "kicker": "06 / PERSONA & PROBLEM STATEMENT",
    "description": "A working parent looking for consistent academic support for a secondary-school child.",
    "layout": "persona",
    "items": [
      {
        "title": "Goal",
        "text": "Find a trustworthy tutor whose teaching style and availability fit the family."
      },
      {
        "title": "Frustration",
        "text": "Having to piece together qualifications, schedules, and fees from different places."
      },
      {
        "title": "Need",
        "text": "A low-commitment first lesson and a clear plan for continuing."
      }
    ],
    "evidence": "Illustrative proto-persona · not a research participant",
    "note": "Minh Anh is a fictional scenario used to organize design questions. Replace or refine this proto-persona with real research evidence."
  },
  {
    "title": "Confidence is built\none step at a time.",
    "chapter": "Understand",
    "kicker": "07 / USER JOURNEY MAP",
    "description": "A scenario-based map of the parent’s path, from an initial need to ongoing learning support.",
    "layout": "journey",
    "items": [
      {
        "title": "Recognize & discover",
        "text": "Clarify the need, then find candidates."
      },
      {
        "title": "Evaluate",
        "text": "Assess teaching fit, evidence and fees."
      },
      {
        "title": "Schedule",
        "text": "Fit a trial or a recurring routine."
      },
      {
        "title": "Review & pay",
        "text": "Explain due-now and commitment."
      },
      {
        "title": "Continue or change",
        "text": "Track lessons, request changes or pause future weeks."
      }
    ],
    "evidence": "Scenario map · emotions are hypotheses",
    "note": "A scenario model, not a participant-derived journey. The detailed evidence pack includes touchpoints, hypothesized emotions, risks, opportunities and the research needed at every stage."
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
    "title": "One connected\nparent experience.",
    "chapter": "Explore",
    "kicker": "08 / SITEMAP",
    "description": "The information architecture keeps the core booking path connected to the tools parents need after booking.",
    "layout": "sitemap",
    "note": "This diagram summarizes the screens implemented in the local TutorNest prototype; it is not an imported historical sitemap."
  },
  {
    "title": "Explore the layout\nbefore the details.",
    "chapter": "Explore",
    "kicker": "09 / PAPER-STYLE LAYOUT EXPLORATIONS",
    "description": "Early layout exploration can prioritize tutor information, calendar visibility, and a clear next action before adding visual polish.",
    "layout": "wireframes",
    "evidence": "Retrospective diagrams · not original paper sketches",
    "note": "These diagrams explain the design hierarchy retrospectively. They are not represented as historical evidence of paper sketching."
  },
  {
    "title": "Keep the essentials\nwithin reach.",
    "chapter": "Explore",
    "kicker": "10 / PAPER WIREFRAME VARIATIONS",
    "description": "Explore how tutor information and the booking action could adapt from a compact phone to a wider screen without changing the task order.",
    "layout": "responsive",
    "evidence": "Concept exploration · wider layouts proposed",
    "note": "Responsive variations are proposed concepts. The existing product is primarily a mobile prototype."
  },
  {
    "title": "Make the trade-offs\nvisible.",
    "chapter": "Explore",
    "kicker": "11 / DIGITAL WIREFRAMES",
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
    "kicker": "12 / DIGITAL WIREFRAME VARIATIONS",
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
    "title": "Test the decisions,\nnot the decoration.",
    "chapter": "Explore",
    "kicker": "13 / LOW-FIDELITY PROTOTYPE",
    "description": "The proposed test flow follows a parent from tutor discovery to a confirmed lesson, with a choice between a trial and recurring sessions.",
    "layout": "flow",
    "items": [
      {
        "title": "Find",
        "text": "Search and filter"
      },
      {
        "title": "Evaluate",
        "text": "Review tutor profile"
      },
      {
        "title": "Plan",
        "text": "Choose date and time"
      },
      {
        "title": "Confirm",
        "text": "Review and pay"
      }
    ],
    "evidence": "Proposed low-fidelity test flow",
    "note": "The connected high-fidelity prototype is available in the app. A separate historical low-fidelity prototype was not supplied."
  },
  {
    "title": "A study built around\nreal parent tasks.",
    "chapter": "Explore",
    "kicker": "14 / NEXT USER STUDY: PROTOCOL",
    "description": "A proposed moderated study will test whether parents can find a suitable tutor, choose a workable schedule, and explain what is due now.",
    "layout": "study",
    "items": [
      {
        "title": "Method & sample",
        "text": "Plan: five parents of students in grades 6–12, with recent tutoring needs; moderated think-aloud, about 30 minutes each."
      },
      {
        "title": "Neutral tasks",
        "text": "Find a weekend tutor within a budget; book a trial; explain the weekly payment; request a schedule change."
      },
      {
        "title": "Measures",
        "text": "Unassisted completion, critical errors, time on task, and post-task SEQ. Report individual results and sample limitations."
      },
      {
        "title": "Analysis & retest",
        "text": "Link observations to severity and design changes. Repeat the affected tasks after revision."
      }
    ],
    "evidence": "Proposed future study · not completed research",
    "note": "Recruitment size and duration are a proposed protocol, not actual participant data. Define task success before conducting sessions; do not treat technical tests as usability outcomes."
  },
  {
    "title": "Observed issues.\nTraceable corrections.",
    "chapter": "Explore",
    "kicker": "15 / HEURISTIC REVIEW FINDINGS",
    "description": "Three defects were observed in the prototype and traced to implementation changes. These are evaluator findings, not participant study results.",
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
    "evidence": "Evaluator observations + regression checks · no participant results",
    "note": "Evaluator findings, not participant findings. The old weekend/date/pending-request issues and these new state/price/calendar issues are documented in the evidence pack. Synthetic examples are kept separate and excluded from metrics."
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
    "title": "Less guesswork.\nMore reassurance.",
    "chapter": "Refine",
    "kicker": "16 / MOCKUPS & VERIFIED CORRECTIONS",
    "description": "The current revision prioritizes correctness and recovery: preserve explicit choices, centralize pricing, and keep pending requests separate from confirmed lessons.",
    "layout": "comparison",
    "evidence": "Implementation before/after · not a measured usability improvement",
    "note": "These are implementation changes, not measured improvements in parent usability. Re-test editing, plan transitions and comprehension with actual participants.",
    "items": [
      {
        "title": "Editing and return",
        "text": "Saved time restored; draft stored on this device; search and comparison choices retained during navigation."
      },
      {
        "title": "One financial model",
        "text": "Trial takes one session fee; weekly and full-course amounts share quote rules. Renewal uses the current tutor and booking."
      },
      {
        "title": "Honest recovery",
        "text": "Payment states are explicitly simulated, schedule changes remain pending, and calendar export is a real downloadable file."
      }
    ]
  },
  {
    "title": "A clear path\nfrom search to session.",
    "chapter": "Refine",
    "kicker": "17 / MOCKUPS: ORIGINAL SCREEN SIZE",
    "description": "The mobile experience connects tutor discovery, profile review, scheduling, and payment with consistent visual cues.",
    "layout": "gallery",
    "note": "These are live, non-interactive previews of the V2 components in this repository. Tutor profiles and payment details are demonstration data."
  },
  {
    "title": "One mobile journey.\nThree decision states.",
    "chapter": "Refine",
    "kicker": "18 / MOBILE STATES",
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
    "kicker": "19 / HIGH-FIDELITY PROTOTYPE",
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
    "kicker": "20 / ACCESSIBILITY CONSIDERATIONS",
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
    "title": "There is retest data.\nLimits remain.",
    "chapter": "Reflect",
    "kicker": "21 / TAKEAWAYS",
    "description": "An author-supplied report describes a v1/v2 retest with five parents on three critical tasks; seventeen regression checks remain separate technical evidence.",
    "layout": "takeaways",
    "items": [
      {
        "title": "Inspectable design work",
        "text": "28 bilingual slides, a decision log, IA and journey assumptions, HMWs, constraints and alternatives."
      },
      {
        "title": "Reproducible verification",
        "text": "Seventeen checks cover dates, availability, quote consistency, saved-slot restoration, draft parsing, overlap prevention and calendar serialization."
      },
      {
        "title": "Reported retest",
        "text": "Quote, payment recovery and reschedule reached 5/5 completion on v2 in the reported n=5 round; raw artifacts still need reconciliation."
      }
    ],
    "evidence": "Author-supplied n=5 retest · 17 technical checks passed",
    "note": "The results apply only to the three tasks and reported round; they are not generalized into product impact or independently verified research."
  },
  {
    "title": "Reconcile. Expand.\nThen publish.",
    "chapter": "Reflect",
    "kicker": "22 / NEXT STEPS",
    "description": "Complete the evidence chain before widening claims from the reported retest and limited audit.",
    "layout": "cards",
    "items": [
      {
        "title": "Reconcile the retest",
        "text": "Retain anonymized consent, task logs, raw SEQ, observation notes and the v1/v2 versions for the five reported sessions."
      },
      {
        "title": "Extend the audit",
        "text": "Measure every component/state, icon control and viewport; repeat with assistive technology and a defined environment matrix."
      },
      {
        "title": "Expand research scope",
        "text": "Test discovery, onboarding, multi-child use, retention and error recovery before claiming product impact."
      }
    ],
    "note": "Prioritize inspectable artifacts over score claims. Dates, prices and payment in the prototype remain illustrative, not an operating service."
  },
  {
    "title": "Better learning\nstarts with trust.",
    "chapter": "Reflect",
    "kicker": "THANK YOU / LET’S CONNECT",
    "description": "Bryan Lê · UX and UI design · 10-week concept project. For feedback or collaboration: lxhoi.2k@gmail.com.",
    "layout": "closing",
    "note": "Contact details are supplied by the project author for publication. This case study documents a concept and its limitations; it does not claim production deployment or participant research."
  }
];
