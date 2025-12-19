// Additional Scenario-Based Questions - Batch 9
// Comprehensive EMT-B domain coverage - Critical interventions
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalBleedingScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-bleed-tourniquet-application-001",
    module: 8,
    chapter: 24,
    scenario: "A traumatic amputation of lower leg has severe arterial bleeding that direct pressure cannot control. Pressure dressing soaked through immediately.",
    question: "What is your next intervention?",
    options: [
      "Continue direct pressure indefinitely",
      "Apply tourniquet 2-3 inches above wound, tighten until bleeding stops, note time",
      "Apply tourniquet below wound",
      "Elevate only"
    ],
    correctAnswer: 1,
    explanation: "Life-threatening extremity bleeding not controlled by direct pressure: tourniquet indicated. Place 2-3 inches above wound (proximal), tighten until bleeding stops, note time applied, don't remove in field. Tourniquets save lives.",
    category: "scenario",
    difficulty: "medium",
    tags: ["tourniquet", "hemorrhage control", "amputation", "life threat"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Hemorrhage Control Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-bleed-nosebleed-001",
    module: 8,
    chapter: 24,
    scenario: "An elderly patient on blood thinners has severe nosebleed for 30 minutes. Patient is sitting upright, leaning back, and blood is running down throat causing nausea.",
    question: "What is the correct positioning?",
    options: [
      "Lean back - current position is correct",
      "Lean forward, pinch nostrils, don't swallow blood",
      "Lie flat",
      "Tilt head to side"
    ],
    correctAnswer: 1,
    explanation: "Epistaxis (nosebleed): sit upright leaning FORWARD (not back - causes swallowing blood/nausea), pinch nostrils for 15 min, ice bridge of nose. Leaning back makes blood go down throat. Severe/prolonged bleeding needs evaluation, especially on anticoagulants.",
    category: "scenario",
    difficulty: "easy",
    tags: ["epistaxis", "nosebleed", "positioning"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Nosebleed Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-bleed-internal-pelvis-001",
    module: 8,
    chapter: 27,
    scenario: "A MVC patient has pelvic instability and signs of shock. You estimate potential blood loss in pelvis could be significant.",
    question: "Pelvic fractures can hold how much blood?",
    options: [
      "100-200 mL",
      "1-4 liters (life-threatening amount)",
      "50 mL maximum",
      "Pelvic fractures don't bleed significantly"
    ],
    correctAnswer: 1,
    explanation: "Pelvic fracture can contain 1-4 liters of blood (most of patient's volume) - life-threatening internal hemorrhage. Stabilize pelvis with binder/sheet to reduce pelvic volume and bleeding. Treat for shock, rapid transport to trauma center.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pelvic fracture", "internal bleeding", "shock", "blood loss"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Pelvic Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-bleed-hemophilia-001",
    module: 7,
    chapter: 15,
    scenario: "A patient with hemophilia has minor trauma (bumped arm). Small bruise is forming. Patient states 'this could get bad because I don't clot well.'",
    question: "What is appropriate?",
    options: [
      "No transport needed for minor bruise",
      "Transport for evaluation - hemophilia patients can develop severe bleeding from minor trauma",
      "Apply ice and release",
      "Hemophilia only affects major bleeding"
    ],
    correctAnswer: 1,
    explanation: "Hemophilia: genetic clotting disorder - even minor trauma can cause severe/prolonged bleeding, internal bleeding, joint bleeding. These patients know their disease. Transport for evaluation and possible clotting factor replacement.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hemophilia", "bleeding disorder", "clotting disorder"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Bleeding Disorder Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-bleed-vaginal-nonpregnant-001",
    module: 9,
    chapter: 31,
    scenario: "A non-pregnant 30-year-old has heavy vaginal bleeding, has soaked multiple pads. Denies pregnancy. BP 100/60, P 110. Pale appearance.",
    question: "What is appropriate management?",
    options: [
      "Internal exam to find source",
      "External pads only, treat for shock, rapid transport - don't pack vagina",
      "This is normal menstruation",
      "No treatment needed"
    ],
    correctAnswer: 1,
    explanation: "Vaginal bleeding: place external pads (count for documentation), NEVER pack vagina or perform internal exam in field. Treat for shock if significant bleeding, rapid transport. Could be miscarriage, ectopic, infection, other gynecologic emergency.",
    category: "scenario",
    difficulty: "medium",
    tags: ["vaginal bleeding", "gynecologic emergency", "shock"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Gynecologic Emergency Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalCommunicationScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-comm-hearing-impaired-001",
    module: 3,
    chapter: 4,
    scenario: "Your patient is completely deaf and communicates through sign language, which you don't know. Patient is conscious and alert with chest pain.",
    question: "How should you communicate?",
    options: [
      "Don't attempt communication",
      "Write notes, use gestures, speak clearly facing patient (lip reading), get translator",
      "Shout louder",
      "Only talk to family"
    ],
    correctAnswer: 1,
    explanation: "Hearing impaired: face patient when speaking (lip reading), write notes, use simple gestures, be patient. Many read lips. Get interpreter if possible. Don't shout or exaggerate mouth movements. Always include patient in communication.",
    category: "scenario",
    difficulty: "easy",
    tags: ["communication", "hearing impaired", "patient interaction"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Communication Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-comm-language-barrier-001",
    module: 3,
    chapter: 4,
    scenario: "Your patient speaks only Spanish. You speak only English. Patient appears in distress, holding chest, but you cannot understand detailed history.",
    question: "What resources can help?",
    options: [
      "Give up on history",
      "Use translation apps, get family member, call translation service, use universal gestures",
      "Guess at problem",
      "Transport without any assessment"
    ],
    correctAnswer: 1,
    explanation: "Language barriers: use translation services (phone/app), family members who speak English, universal gestures (point to pain), facial expressions. Document use of interpreter. Focus on vital signs and physical findings. Don't let language prevent care.",
    category: "scenario",
    difficulty: "easy",
    tags: ["language barrier", "translation", "communication"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Cultural Competence Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-comm-angry-patient-001",
    module: 3,
    chapter: 4,
    scenario: "A patient is yelling at you, using profanity, saying you're incompetent. Patient has legitimate medical complaint (chest pain) but is verbally abusive.",
    question: "What is the best approach?",
    options: [
      "Yell back",
      "Stay calm, professional, don't take personally, set boundaries, focus on care, request police if needed for safety",
      "Refuse to treat",
      "Argue about competence"
    ],
    correctAnswer: 1,
    explanation: "Angry patients: stay calm, professional, don't personalize. Fear, pain, medical conditions can cause anger. Set boundaries ('I'm here to help, but need you to...'), ensure safety. Can refuse if physical threat. Document objectively.",
    category: "scenario",
    difficulty: "medium",
    tags: ["difficult patient", "communication", "de-escalation"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Difficult Patient Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-comm-radio-report-001",
    module: 10,
    chapter: 34,
    scenario: "You need to give radio report to hospital about chest pain patient.",
    question: "What should NOT be included on radio?",
    options: [
      "Age and chief complaint",
      "Patient's name and personal details (HIPAA violation over open radio)",
      "Vital signs",
      "ETA"
    ],
    correctAnswer: 1,
    explanation: "Radio reports: don't use patient names (HIPAA) - use age/sex. Include: age/sex, chief complaint, pertinent assessment, vitals, treatment, ETA. Keep concise. Radio is open channel - protect privacy. Written report has full details.",
    category: "scenario",
    difficulty: "easy",
    tags: ["radio communication", "HIPAA", "reporting"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Communication Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  }
];

export const additionalAssessmentScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-assess-chief-complaint-001",
    module: 4,
    chapter: 8,
    scenario: "A patient called 911 for 'chest pain.' During assessment you also discover patient has toe pain, headache, and back pain. What is the chief complaint?",
    question: "What should you focus on as chief complaint?",
    options: [
      "Toe pain",
      "Chest pain - the reason patient called 911, most life-threatening",
      "All complaints are equal",
      "Oldest symptom"
    ],
    correctAnswer: 1,
    explanation: "Chief complaint: main reason patient called EMS. Guides assessment and treatment priorities. May have multiple complaints, but focus on most serious/concerning. Chest pain is life threat - priority over minor complaints.",
    category: "scenario",
    difficulty: "easy",
    tags: ["chief complaint", "assessment", "prioritization"],
    nremtDomain: "Assessment",
    nationalProtocolAlignment: "NHTSA 2022 - Patient Assessment Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-assess-opqrst-001",
    module: 4,
    chapter: 8,
    scenario: "A patient has abdominal pain. You use OPQRST to gather information.",
    question: "What does the 'Q' stand for?",
    options: [
      "Quantity",
      "Quality (describe the pain - sharp, dull, cramping, etc.)",
      "Quick onset",
      "Quiet location"
    ],
    correctAnswer: 1,
    explanation: "OPQRST for pain: Onset, Provokes/Palliates, Quality (sharp/dull/cramping/burning), Radiation, Severity (1-10), Time. Quality helps differential diagnosis - tearing = AAA, crushing = MI, cramping = colic.",
    category: "scenario",
    difficulty: "easy",
    tags: ["OPQRST", "pain assessment", "assessment tool"],
    nremtDomain: "Assessment",
    nationalProtocolAlignment: "NHTSA 2022 - Pain Assessment Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-assess-sample-history-001",
    module: 4,
    chapter: 8,
    scenario: "You're obtaining SAMPLE history. Patient tells you they take 'a heart pill, water pill, and sugar pill.'",
    question: "What should you do?",
    options: [
      "Accept that answer",
      "Get actual medication names from bottles/list - 'heart pill' could be many drugs",
      "Guess which medications",
      "Not important"
    ],
    correctAnswer: 1,
    explanation: "SAMPLE - Medications: get actual names from bottles/medication list. 'Heart pill' could be nitro, beta blocker, aspirin, ACE inhibitor, etc. Bring all medications to hospital. Specific drugs give diagnostic clues.",
    category: "scenario",
    difficulty: "easy",
    tags: ["SAMPLE history", "medications", "assessment"],
    nremtDomain: "Assessment",
    nationalProtocolAlignment: "NHTSA 2022 - Medical History Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-assess-trending-vitals-001",
    module: 4,
    chapter: 8,
    scenario: "Your patient's BP was 120/80 initially, second set 110/70, third set 90/60. Heart rate increasing. Patient appears more altered.",
    question: "This trend indicates:",
    options: [
      "Improvement",
      "Decompensation - worsening shock",
      "Normal variation",
      "BP cuff malfunction"
    ],
    correctAnswer: 1,
    explanation: "Trending vital signs shows patient trajectory. Dropping BP + rising HR + altered mental status = decompensating shock. Trends more valuable than single measurement. Reassess vitals frequently in unstable patients (every 5 min).",
    category: "scenario",
    difficulty: "medium",
    tags: ["vital signs", "trending", "shock", "decompensation"],
    nremtDomain: "Assessment",
    nationalProtocolAlignment: "NHTSA 2022 - Vital Signs Monitoring Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-assess-pediatric-triangle-001",
    module: 9,
    chapter: 30,
    scenario: "Using Pediatric Assessment Triangle, you assess Appearance, Work of Breathing, and Circulation to skin. A child has normal appearance, normal breathing, but pale/mottled skin.",
    question: "This suggests problem with:",
    options: [
      "Airway",
      "Circulation/perfusion",
      "Disability",
      "Child is completely normal"
    ],
    correctAnswer: 1,
    explanation: "Pediatric Assessment Triangle: quick visual assessment - Appearance (mental status), Work of Breathing, Circulation (skin color/perfusion). Abnormal circulation to skin (pale/mottled/cyanotic) suggests shock, cardiac, or respiratory problem affecting perfusion.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pediatric assessment triangle", "circulation", "perfusion"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalDocumentationScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-doc-correction-001",
    module: 3,
    chapter: 6,
    scenario: "You realize you documented the wrong blood glucose value on your PCR.",
    question: "What is the proper way to correct?",
    options: [
      "Use white-out",
      "Single line through error, write correction, initial and date",
      "Erase completely",
      "Start new PCR"
    ],
    correctAnswer: 1,
    explanation: "PCR corrections: single line through error (keep original visible), write correct information, initial and date/time correction. Never obliterate, erase, or use white-out - looks like hiding information. Corrections show honesty.",
    category: "scenario",
    difficulty: "easy",
    tags: ["documentation", "PCR", "error correction"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Documentation Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-doc-refusal-001",
    module: 3,
    chapter: 6,
    scenario: "A patient with chest pain refuses transport after your assessment and education about risks. Patient is alert and oriented, no signs of impairment.",
    question: "What documentation is required?",
    options: [
      "Just have patient sign",
      "Document full assessment, education provided, risks explained, patient understands, competent to refuse, signature obtained",
      "No documentation needed",
      "Just write 'patient refused'"
    ],
    correctAnswer: 1,
    explanation: "Refusal documentation: complete assessment done, patient's competence, education/risks explained, patient verbalized understanding, offered alternatives, patient signature, witness signature. Refusals are high lawsuit risk - thorough documentation critical.",
    category: "scenario",
    difficulty: "medium",
    tags: ["refusal", "documentation", "informed refusal"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Refusal Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-doc-objective-001",
    module: 3,
    chapter: 6,
    scenario: "You respond to an assault. Patient has facial injuries.",
    question: "What is appropriate documentation?",
    options: [
      "'Patient was drunk and got in a bar fight'",
      "'Patient has 3cm laceration to left cheek, swelling to right eye. Patient states assaulted by unknown person.'",
      "'Patient deserved it'",
      "'Victim of assault'"
    ],
    correctAnswer: 1,
    explanation: "Objective documentation: describe what you see/hear, quote patient statements, avoid judgments/assumptions. Don't document opinions about fault, deservedness, intoxication unless clinically relevant. Facts only. Could be court evidence.",
    category: "scenario",
    difficulty: "easy",
    tags: ["documentation", "objectivity", "assault", "legal"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Documentation Standards Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  }
];
