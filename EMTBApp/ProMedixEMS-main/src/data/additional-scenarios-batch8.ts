// Additional Scenario-Based Questions - Batch 8
// Comprehensive EMT-B domain coverage - Advanced scenarios
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalPediatricScenarios3: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ped-meningitis-001",
    module: 9,
    chapter: 30,
    scenario: "A 6-month-old has high fever (104°F), is lethargic, irritable when moved, has stiff neck, and a petechial (non-blanching) rash. Bulging fontanelle noted.",
    question: "These findings suggest:",
    options: [
      "Viral illness",
      "Meningitis - potentially life-threatening infection",
      "Normal infant fever",
      "Teething"
    ],
    correctAnswer: 1,
    explanation: "Bacterial meningitis: fever, stiff neck, altered mental status, petechial rash, bulging fontanelle (infants). Life-threatening. High-flow O2, treat fever, rapid transport, infection control precautions. Can progress to septic shock rapidly.",
    category: "scenario",
    difficulty: "hard",
    tags: ["meningitis", "pediatric infection", "sepsis", "petechial rash"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Infection Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ped-bronchiolitis-001",
    module: 9,
    chapter: 30,
    scenario: "A 4-month-old has 3 days of runny nose, now has wheezing, nasal flaring, intercostal retractions, RR 60, and is feeding poorly. No fever. RSV season.",
    question: "This presentation is consistent with:",
    options: [
      "Asthma",
      "Bronchiolitis - viral lower respiratory infection",
      "Pneumonia",
      "Croup"
    ],
    correctAnswer: 1,
    explanation: "Bronchiolitis (usually RSV): infants <2 years, wheezing, respiratory distress, follows URI. Position of comfort, humidified O2 if available, suction secretions, assess for dehydration. Can worsen rapidly. Most common in winter.",
    category: "scenario",
    difficulty: "medium",
    tags: ["bronchiolitis", "RSV", "infant respiratory", "wheezing"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-febrile-seizure-001",
    module: 9,
    chapter: 30,
    scenario: "A 2-year-old had a generalized seizure lasting 3 minutes during rapid fever spike to 103°F. First-time seizure. Now postictal but breathing normally.",
    question: "This most likely represents:",
    options: [
      "Epilepsy",
      "Febrile seizure - common in children 6mo-5yr with rapid fever rise",
      "Meningitis",
      "Brain tumor"
    ],
    correctAnswer: 1,
    explanation: "Febrile seizure: age 6mo-5yr, rapid fever rise, usually brief (<15min), generalized. Usually benign but still requires evaluation. Cool patient gradually, transport. First-time seizure always needs assessment to rule out serious causes.",
    category: "scenario",
    difficulty: "medium",
    tags: ["febrile seizure", "pediatric seizure", "fever"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Seizure Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-epipen-dosing-001",
    module: 9,
    chapter: 30,
    scenario: "A 4-year-old (40 lbs) is having anaphylaxis. Parent has both 0.15mg EpiPen Jr and adult 0.3mg EpiPen available.",
    question: "Which dose is appropriate?",
    options: [
      "0.3mg adult dose",
      "0.15mg EpiPen Jr for child <66 lbs (30kg)",
      "Half of adult dose",
      "Wait for ALS"
    ],
    correctAnswer: 1,
    explanation: "Pediatric epinephrine dosing: <66 lbs (30kg) = 0.15mg EpiPen Jr; >66 lbs = 0.3mg adult dose. This 40-lb child needs Jr dose. Time-critical - don't delay. Can repeat in 5-15 min if no improvement.",
    category: "scenario",
    difficulty: "medium",
    tags: ["epinephrine", "pediatric dosing", "anaphylaxis"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Anaphylaxis Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-sudden-infant-death-001",
    module: 9,
    chapter: 30,
    scenario: "You arrive to find a 3-month-old infant unresponsive, not breathing, no pulse. Infant is cool to touch, has dependent lividity. Parents state baby was 'fine when put down for nap 2 hours ago.'",
    question: "This presentation suggests:",
    options: [
      "Recent cardiac arrest - start CPR immediately",
      "SIDS with obvious death - follow local protocol for obvious death, support family",
      "Sleeping normally",
      "Hypothermia only"
    ],
    correctAnswer: 1,
    explanation: "SIDS with obvious death signs (cool, lividity, rigor): follow local protocol - may not require resuscitation. Provide family support, preserve scene for investigation, notify authorities. Handle with compassion - devastating for family.",
    category: "scenario",
    difficulty: "hard",
    tags: ["SIDS", "sudden infant death", "obvious death", "family support"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - SIDS Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalEnvironmentalScenarios3: EnhancedQuizQuestion[] = [
  {
    id: "scenario-env-drowning-001",
    module: 7,
    chapter: 20,
    scenario: "A near-drowning victim is pulled from pool. Patient is conscious but coughing, has difficulty breathing, and is anxious. SpO2 88% on room air.",
    question: "What is a critical consideration even though patient is conscious?",
    options: [
      "Patient is fine - just monitor",
      "Secondary drowning/ARDS can develop hours later - all drowning victims need hospital evaluation",
      "No transport needed if conscious",
      "Only freshwater drowning is dangerous"
    ],
    correctAnswer: 1,
    explanation: "All drowning victims need evaluation - secondary drowning/ARDS can develop 24-48hrs later from pulmonary injury. High-flow O2, monitor respiratory status, c-spine if trauma suspected (diving), transport even if improved.",
    category: "scenario",
    difficulty: "hard",
    tags: ["drowning", "near-drowning", "secondary drowning", "ARDS"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Drowning Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-lightning-strike-001",
    module: 7,
    chapter: 20,
    scenario: "Multiple people struck by lightning. You have 3 patients: (1) no pulse, (2) conscious with burns, (3) unresponsive but breathing.",
    question: "What is the triage priority for lightning strikes?",
    options: [
      "Treat breathing patients first",
      "Reverse triage - treat pulseless first (may only need CPR to restart heart)",
      "Treat burns first",
      "Treat conscious first"
    ],
    correctAnswer: 1,
    explanation: "Lightning reverse triage: treat apparent dead first - lightning causes cardiac arrest (VF/asystole) but may respond to CPR alone. Breathing patients likely to survive. Opposite of normal triage. Start CPR on pulseless immediately.",
    category: "scenario",
    difficulty: "hard",
    tags: ["lightning strike", "reverse triage", "MCI", "cardiac arrest"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Lightning Strike Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-frostbite-001",
    module: 7,
    chapter: 20,
    scenario: "A homeless patient has hard, waxy, white fingers and toes after prolonged cold exposure. No sensation in affected areas.",
    question: "How should you manage frostbite in field?",
    options: [
      "Rub vigorously to restore circulation",
      "Protect from further injury, cover with dry sterile dressings, do not rub or rewarm if refreezing possible",
      "Rewarm in hot water immediately",
      "Break blisters to drain fluid"
    ],
    correctAnswer: 1,
    explanation: "Frostbite: protect from further injury, cover with dry sterile dressings, do NOT rub (causes tissue damage), do NOT rewarm if risk of refreezing (worse damage). Remove jewelry. Separate digits with gauze. Transport for controlled rewarming.",
    category: "scenario",
    difficulty: "medium",
    tags: ["frostbite", "cold injury", "rewarming"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Frostbite Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-env-diving-emergency-001",
    module: 7,
    chapter: 20,
    scenario: "A scuba diver surfaced rapidly from 80 feet. Now has joint pain, difficulty breathing, chest pain, and neurological symptoms (numbness, paralysis). Happened 20 minutes ago.",
    question: "You should suspect:",
    options: [
      "Heart attack",
      "Decompression sickness (the bends) - needs hyperbaric oxygen",
      "Nitrogen narcosis",
      "Normal diving effects"
    ],
    correctAnswer: 1,
    explanation: "Decompression sickness: rapid ascent causes nitrogen bubbles in tissues/blood - joint pain ('bends'), neurological symptoms, respiratory distress. High-flow O2 (100%), supine position, rapid transport to hyperbaric chamber. Time-critical.",
    category: "scenario",
    difficulty: "hard",
    tags: ["decompression sickness", "diving emergency", "hyperbaric", "the bends"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Diving Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-bee-sting-local-001",
    module: 7,
    chapter: 18,
    scenario: "A patient was stung by a bee. Has local swelling, redness, and pain at sting site on arm. No respiratory distress, no hives, vitals normal. No history of bee allergy.",
    question: "This represents:",
    options: [
      "Anaphylaxis - give epinephrine",
      "Local reaction - supportive care, ice, monitor for progression",
      "Requires immediate transport",
      "Inject site with epinephrine"
    ],
    correctAnswer: 1,
    explanation: "Local reaction: swelling/pain at sting site only. NOT anaphylaxis (which has systemic symptoms: respiratory distress, hives, hypotension). Remove stinger by scraping, ice, monitor for allergic reaction development. Reassure patient.",
    category: "scenario",
    difficulty: "easy",
    tags: ["bee sting", "local reaction", "envenomation"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Insect Sting Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  }
];

export const additionalBehavioralScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-behav-depression-suicide-risk-001",
    module: 7,
    chapter: 21,
    scenario: "A patient states 'I just can't take it anymore.' When asked directly about suicidal thoughts, patient says 'I've thought about it but don't have a plan.' Patient is cooperative.",
    question: "What is appropriate management?",
    options: [
      "No transport needed - no plan",
      "Transport for evaluation - suicidal ideation is emergency even without plan",
      "Have patient sign refusal",
      "Tell patient to 'think positive'"
    ],
    correctAnswer: 1,
    explanation: "Any suicidal ideation requires evaluation. Risk factors: ideation, plan, means, prior attempts, depression, substance abuse, recent loss. Even without plan, patient needs psychiatric assessment. Don't leave patient alone. Calm, non-judgmental approach.",
    category: "scenario",
    difficulty: "medium",
    tags: ["suicide", "depression", "suicidal ideation", "psychiatric emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Suicide Risk Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-behav-excited-delirium-001",
    module: 7,
    chapter: 21,
    scenario: "Police on scene with extremely agitated patient who is sweating profusely, has superhuman strength, is paranoid, and insensitive to pain. Patient is restrained prone.",
    question: "What is your concern with prone restraint?",
    options: [
      "Prone position is safest",
      "Positional asphyxia risk - place supine or on side after restraint",
      "No concerns",
      "Leave prone indefinitely"
    ],
    correctAnswer: 1,
    explanation: "Excited delirium (often with stimulants): agitation, hyperthermia, strength, insensitivity to pain. High risk sudden death. Prone restraint causes positional asphyxia. Reposition to supine/side after secured. Cool patient. Monitor breathing continuously.",
    category: "scenario",
    difficulty: "hard",
    tags: ["excited delirium", "restraint", "positional asphyxia", "stimulants"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Excited Delirium Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-behav-psychosis-001",
    module: 7,
    chapter: 21,
    scenario: "A patient is experiencing auditory hallucinations telling them to 'hurt the devils.' Patient appears frightened and is backing away from you. No weapons visible.",
    question: "What is your priority approach?",
    options: [
      "Approach directly and restrain",
      "Ensure scene safety, calm voice, non-threatening posture, adequate distance, don't play into delusions",
      "Tell patient hallucinations aren't real",
      "Argue with patient"
    ],
    correctAnswer: 1,
    explanation: "Psychosis: maintain safety distance, calm non-threatening approach, don't argue with delusions or hallucinations. Patient may see you as threat. Have clear exit, adequate resources. Reality to patient is their perception. Don't provoke escalation.",
    category: "scenario",
    difficulty: "medium",
    tags: ["psychosis", "hallucinations", "de-escalation", "scene safety"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Behavioral Emergency Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-behav-medical-cause-001",
    module: 7,
    chapter: 21,
    scenario: "A patient with 'bizarre behavior' per police is confused, combative, and disoriented. Blood glucose is 35 mg/dL. No psychiatric history.",
    question: "This demonstrates:",
    options: [
      "Purely psychiatric problem",
      "Medical cause (hypoglycemia) can present as behavioral emergency - always assess for medical causes",
      "Patient is intoxicated",
      "No treatment needed"
    ],
    correctAnswer: 1,
    explanation: "Always rule out medical causes of altered behavior: hypoglycemia, hypoxia, head injury, stroke, infection, toxins, medication effects. Check glucose, vitals, SpO2. Hypoglycemia classic mimic of psychiatric emergency. Treat medical cause first.",
    category: "scenario",
    difficulty: "medium",
    tags: ["behavioral emergency", "hypoglycemia", "altered mental status", "differential diagnosis"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Altered Behavior Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalAirwayScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-airway-jaw-thrust-001",
    module: 6,
    chapter: 9,
    scenario: "An unresponsive trauma patient needs airway opening. You suspect cervical spine injury based on mechanism (fall from height).",
    question: "Which airway maneuver is indicated?",
    options: [
      "Head-tilt chin-lift",
      "Jaw-thrust without head extension",
      "No airway maneuver - will worsen injury",
      "Flex neck forward"
    ],
    correctAnswer: 1,
    explanation: "Trauma with suspected c-spine injury: jaw-thrust maneuver (no head tilt/extension) opens airway while maintaining neutral spine position. If jaw-thrust fails to open airway, use head-tilt chin-lift - airway is priority over spine.",
    category: "scenario",
    difficulty: "medium",
    tags: ["jaw-thrust", "c-spine precautions", "trauma airway"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Trauma Airway Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-airway-aspiration-risk-001",
    module: 6,
    chapter: 9,
    scenario: "An intoxicated patient is vomiting while supine on your stretcher. Patient has decreased level of consciousness.",
    question: "What is your immediate action?",
    options: [
      "Leave supine",
      "Turn patient to side/recovery position, suction airway",
      "Force patient to sit up",
      "Apply oxygen and wait"
    ],
    correctAnswer: 1,
    explanation: "Vomiting with decreased consciousness: immediate aspiration risk. Turn to side/recovery position, suction aggressively, monitor airway continuously. Aspiration can cause pneumonia, ARDS, airway obstruction, death. Positioning prevents aspiration.",
    category: "scenario",
    difficulty: "easy",
    tags: ["aspiration", "recovery position", "vomiting", "airway protection"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Protection Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-airway-dentures-001",
    module: 6,
    chapter: 9,
    scenario: "You are ventilating an elderly patient with BVM. Patient has full dentures. They are fitting well and maintaining good mask seal.",
    question: "What should you do with the dentures?",
    options: [
      "Always remove dentures immediately",
      "Leave in place if fitting well - helps maintain mask seal",
      "Dentures will cause obstruction",
      "Push dentures back to secure"
    ],
    correctAnswer: 1,
    explanation: "Dentures: leave in place if well-fitting - helps maintain facial structure and mask seal for BVM. Remove if loose/broken (aspiration risk) or interfering with airway. Check that they're secure during ventilation.",
    category: "scenario",
    difficulty: "easy",
    tags: ["dentures", "BVM", "mask seal", "airway management"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Management Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-airway-stoma-breathing-001",
    module: 6,
    chapter: 9,
    scenario: "A patient with laryngectomy (neck stoma) is in respiratory distress. Patient breathes only through stoma, not mouth/nose.",
    question: "How do you provide oxygen?",
    options: [
      "Nasal cannula in nose",
      "Apply oxygen mask or trach collar to stoma",
      "Regular face mask",
      "Cannot oxygenate these patients"
    ],
    correctAnswer: 1,
    explanation: "Laryngectomy (total): patient breathes only through neck stoma - no connection to mouth/nose. Apply oxygen directly to stoma using trach collar, pediatric mask over stoma, or specialized device. Cover mouth/nose won't help.",
    category: "scenario",
    difficulty: "medium",
    tags: ["laryngectomy", "stoma", "oxygen delivery", "special airway"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Surgical Airway Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
