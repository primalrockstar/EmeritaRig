// Additional Scenario-Based Questions - Batch 3
// Continuing systematic coverage of all EMT-B domains
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalOperationsScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ops-scene-safety-001",
    module: 1,
    chapter: 2,
    scenario: "You arrive at a reported 'man down' call in a parking lot. As you approach, you see a crowd of people yelling and one person appears injured on the ground. Several people are arguing loudly.",
    question: "What is your immediate priority?",
    options: [
      "Rush to the injured patient immediately",
      "Stage at a safe distance and request police",
      "Drive directly to the patient",
      "Attempt to calm the crowd first"
    ],
    correctAnswer: 1,
    explanation: "Scene safety is the highest priority. A potentially violent scene requires staging at a safe distance and requesting law enforcement before approaching.",
    category: "scenario",
    difficulty: "medium",
    tags: ["scene safety", "staging", "violence", "operations"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Scene Safety Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ops-mci-001",
    module: 10,
    chapter: 35,
    scenario: "You arrive first on scene of a multi-vehicle crash with approximately 15 patients visible. Multiple vehicles are smoking. You have one partner.",
    question: "What is your first action?",
    options: [
      "Begin treating most severely injured patient",
      "Establish command and request additional resources",
      "Start triaging all patients",
      "Move all patients away from vehicles"
    ],
    correctAnswer: 1,
    explanation: "In MCI, first arriving unit establishes command, does scene size-up, requests adequate resources, and initiates Incident Command System before patient care begins.",
    category: "scenario",
    difficulty: "hard",
    tags: ["MCI", "ICS", "command", "disaster"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Mass Casualty Incident Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ops-triage-001",
    module: 10,
    chapter: 35,
    scenario: "During START triage at an MCI, you assess a patient who is breathing 32 times per minute, has a radial pulse, and follows simple commands.",
    question: "What triage category is this patient?",
    options: [
      "Red (immediate)",
      "Yellow (delayed)",
      "Green (minor)",
      "Black (deceased/expectant)"
    ],
    correctAnswer: 1,
    explanation: "START triage: RR >30 = Red, but patient has radial pulse (perfusion) and follows commands (mental status). Yellow for RR alone if other criteria OK.",
    category: "scenario",
    difficulty: "hard",
    tags: ["START triage", "MCI", "categorization"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Triage Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ops-hazmat-001",
    module: 10,
    chapter: 36,
    scenario: "You're called to an industrial site for 'workers feeling sick.' On arrival, you see multiple patients outside complaining of burning eyes and difficulty breathing. A placard shows '1005.'",
    question: "What should you do?",
    options: [
      "Immediately treat patients",
      "Stage upwind, request hazmat team, reference ERG",
      "Move patients further from building",
      "Enter to assess for more patients"
    ],
    correctAnswer: 1,
    explanation: "Hazmat incident requires staging upwind/uphill, hazmat team activation, and using Emergency Response Guidebook (ERG) to identify material (1005 = Ammonia, anhydrous).",
    category: "scenario",
    difficulty: "hard",
    tags: ["hazmat", "ERG", "staging", "decontamination"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Hazmat Response Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ops-extrication-001",
    module: 10,
    chapter: 34,
    scenario: "A patient is trapped in a vehicle after MVC. Fire department is cutting the vehicle. Patient is conscious with c-spine immobilization applied. They start screaming 'get me out now!'",
    question: "What should you do?",
    options: [
      "Remove patient immediately per their wishes",
      "Continue protecting airway/spine while calming patient",
      "Sedate patient",
      "Leave vehicle until patient calms down"
    ],
    correctAnswer: 1,
    explanation: "Continue spinal precautions and proper extrication while providing reassurance. Rapid extrication only for immediate life threats or unsafe scene.",
    category: "scenario",
    difficulty: "medium",
    tags: ["extrication", "spinal precautions", "vehicle rescue"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Vehicle Extrication Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalMedicationScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-med-aspirin-001",
    module: 7,
    chapter: 13,
    scenario: "A 60-year-old with chest pain asks for aspirin. You check and find he takes warfarin (Coumadin) daily. No history of bleeding. BP 140/90.",
    question: "Should you administer aspirin?",
    options: [
      "No - warfarin is absolute contraindication",
      "Yes - warfarin is not contraindication for aspirin in ACS",
      "Only half dose",
      "Wait for ALS to decide"
    ],
    correctAnswer: 1,
    explanation: "Warfarin therapy is NOT a contraindication for aspirin in ACS. Active bleeding or aspirin allergy are contraindications. Give 324mg chewable.",
    category: "scenario",
    difficulty: "hard",
    tags: ["aspirin", "anticoagulant", "ACS", "contraindications"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - ACS Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-med-glucose-001",
    module: 7,
    chapter: 17,
    scenario: "A hypoglycemic patient is confused but able to sit up and follow commands. Gag reflex is intact. You have oral glucose available.",
    question: "Is oral glucose appropriate?",
    options: [
      "No - patient is too altered",
      "Yes - patient can protect airway and swallow",
      "No - only IV glucose allowed",
      "Yes but only if unconscious"
    ],
    correctAnswer: 1,
    explanation: "Oral glucose indicated if patient can protect airway (gag reflex present) and follow commands to swallow. Monitor closely for aspiration risk.",
    category: "scenario",
    difficulty: "medium",
    tags: ["oral glucose", "hypoglycemia", "medication administration"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Diabetic Emergency Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-albuterol-001",
    module: 7,
    chapter: 15,
    scenario: "An asthmatic patient needs their inhaler but it expired 3 months ago. No other inhaler available. Patient in moderate distress, SpO2 91%.",
    question: "What should you do?",
    options: [
      "Refuse to assist - medication expired",
      "Assist with expired inhaler - benefit outweighs risk",
      "Wait for ALS with unexpired medication",
      "Give double dose to compensate"
    ],
    correctAnswer: 1,
    explanation: "In emergency, recently expired medication (especially inhalers) is generally acceptable if no alternative available. Medication loses potency slowly, not suddenly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["albuterol", "expired medication", "clinical judgment"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-narcan-001",
    module: 7,
    chapter: 19,
    scenario: "You administer intranasal naloxone to an unresponsive patient with suspected opioid overdose. After 2 minutes, patient becomes combative and attempts to leave.",
    question: "What is your response?",
    options: [
      "Restrain patient and force transport",
      "Explain situation calmly, encourage transport, document if refuses",
      "Give more naloxone",
      "Let patient leave immediately"
    ],
    correctAnswer: 1,
    explanation: "Post-naloxone patients often refuse care. Explain risks (re-sedation as naloxone wears off), encourage transport, but cannot force. Document thoroughly.",
    category: "scenario",
    difficulty: "hard",
    tags: ["naloxone", "opioid overdose", "refusal", "AMA"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Overdose Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalAirwayScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-airway-choking-001",
    module: 6,
    chapter: 11,
    scenario: "At a restaurant, a 45-year-old is grabbing their throat but can cough weakly and make high-pitched sounds. They appear panicked.",
    question: "What is your immediate action?",
    options: [
      "Perform abdominal thrusts immediately",
      "Encourage continued coughing, stay with patient",
      "Perform back blows",
      "Finger sweep to remove object"
    ],
    correctAnswer: 1,
    explanation: "Partial airway obstruction with some air exchange: encourage coughing, do not intervene unless obstruction becomes complete. Monitor closely for deterioration.",
    category: "scenario",
    difficulty: "medium",
    tags: ["choking", "partial obstruction", "airway management"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Foreign Body Airway Obstruction Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-airway-bvm-001",
    module: 6,
    chapter: 11,
    scenario: "You're ventilating an apneic patient with BVM. You notice the chest rising excessively with each ventilation and hear gurgling sounds.",
    question: "What is likely happening?",
    options: [
      "Perfect ventilation technique",
      "Excessive tidal volume causing gastric distension",
      "Patient is improving",
      "Need to ventilate faster"
    ],
    correctAnswer: 1,
    explanation: "Excessive chest rise and gurgling indicate too much tidal volume causing gastric distension. Use gentle squeeze, just enough to make chest rise visibly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["BVM", "ventilation", "gastric distension"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Management Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-airway-opa-001",
    module: 6,
    chapter: 11,
    scenario: "You insert an OPA into an unconscious patient. Immediately the patient gags and begins to vomit.",
    question: "What should you do?",
    options: [
      "Push OPA in further",
      "Remove OPA, turn patient on side, suction",
      "Leave OPA in place and suction around it",
      "Ventilate faster"
    ],
    correctAnswer: 1,
    explanation: "Gag reflex indicates patient too responsive for OPA. Remove immediately, position for drainage, suction airway. Consider NPA instead.",
    category: "scenario",
    difficulty: "medium",
    tags: ["OPA", "gag reflex", "airway adjunct"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Adjunct Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-airway-suction-001",
    module: 6,
    chapter: 11,
    scenario: "You're suctioning thick secretions from an unconscious patient's airway. After 15 seconds, SpO2 drops from 94% to 88%.",
    question: "What should you do?",
    options: [
      "Continue suctioning until clear",
      "Stop suctioning, ventilate with 100% oxygen",
      "Suction more aggressively",
      "Ignore SpO2 - suction is priority"
    ],
    correctAnswer: 1,
    explanation: "Limit suctioning to 15 seconds maximum in adults to prevent hypoxia. Stop, ventilate with high-flow oxygen, then resume if needed.",
    category: "scenario",
    difficulty: "medium",
    tags: ["suctioning", "hypoxia", "airway management"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Management Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-airway-npa-001",
    module: 6,
    chapter: 11,
    scenario: "You need to insert an airway adjunct in a semi-conscious patient with suspected skull fracture. Clear fluid is draining from nose.",
    question: "Which airway adjunct should you choose?",
    options: [
      "NPA - always safe",
      "OPA - safer in skull fracture",
      "Neither - suction only",
      "OPA if patient tolerates"
    ],
    correctAnswer: 3,
    explanation: "Suspected basilar skull fracture with CSF leak contraindicates NPA (risk of brain penetration). Use OPA if patient tolerates (no gag reflex).",
    category: "scenario",
    difficulty: "hard",
    tags: ["skull fracture", "NPA", "OPA", "contraindication"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - Airway Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalShockScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-shock-cardiogenic-001",
    module: 8,
    chapter: 24,
    scenario: "A 70-year-old with history of MI has chest pain, BP 85/50, P 110, cool/clammy skin, crackles in lungs. Jugular veins appear distended.",
    question: "This presentation suggests:",
    options: [
      "Hypovolemic shock",
      "Cardiogenic shock",
      "Septic shock",
      "Anaphylactic shock"
    ],
    correctAnswer: 1,
    explanation: "Cardiogenic shock: cardiac history, chest pain, hypotension, pulmonary edema (crackles), JVD. Heart can't pump effectively. High-flow O2, position upright if breathing, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["cardiogenic shock", "heart failure", "pulmonary edema"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Shock Management Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-shock-septic-001",
    module: 8,
    chapter: 24,
    scenario: "An elderly nursing home patient has been 'sick' for 2 days with fever. Now BP 88/50, P 120, warm flushed skin, confused. Temp 103°F.",
    question: "This presentation is consistent with:",
    options: [
      "Hypovolemic shock",
      "Septic shock",
      "Neurogenic shock",
      "Normal for fever"
    ],
    correctAnswer: 1,
    explanation: "Septic shock: infection source (fever), hypotension, tachycardia, warm/flushed skin initially, altered mental status. High-flow O2, rapid transport, monitor closely.",
    category: "scenario",
    difficulty: "hard",
    tags: ["septic shock", "infection", "distributive shock"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Shock Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-shock-neurogenic-001",
    module: 8,
    chapter: 24,
    scenario: "A diving accident victim has spinal injury. BP 90/50, P 60, warm dry skin below injury level. Patient is alert.",
    question: "Why is the heart rate low despite hypotension?",
    options: [
      "Patient is very physically fit",
      "Neurogenic shock - loss of sympathetic tone",
      "Cardiogenic shock",
      "Measurement error"
    ],
    correctAnswer: 1,
    explanation: "Neurogenic shock from spinal injury: hypotension with bradycardia (not tachycardia) due to loss of sympathetic nervous system control. Warm skin, normal mentation initially.",
    category: "scenario",
    difficulty: "hard",
    tags: ["neurogenic shock", "spinal injury", "bradycardia"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Spinal Injury Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalBehavioralScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-behavioral-suicide-001",
    module: 7,
    chapter: 21,
    scenario: "A 25-year-old called 911 stating 'I want to die.' Patient is calm now but admits to taking pills 30 minutes ago. Now refusing transport stating they 'changed their mind.'",
    question: "What should you do?",
    options: [
      "Accept refusal - patient has right to refuse",
      "Attempt to convince to go, involve law enforcement if needed for emergency detention",
      "Leave after patient signs refusal",
      "Force into ambulance"
    ],
    correctAnswer: 1,
    explanation: "Suicidal ideation with action (overdose) is emergency requiring transport. Patient lacks capacity to refuse. Attempt persuasion, involve law enforcement for emergency detention if needed.",
    category: "scenario",
    difficulty: "hard",
    tags: ["suicide", "overdose", "refusal", "emergency detention"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Behavioral Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-behavioral-violent-001",
    module: 7,
    chapter: 21,
    scenario: "A psychiatric patient is becoming increasingly agitated, pacing, clenching fists, and speaking loudly. Police are not yet on scene.",
    question: "What is your best approach?",
    options: [
      "Physically restrain patient immediately",
      "Position near exit, speak calmly, do not turn back on patient",
      "Corner patient to prevent escape",
      "Stand very close to show you're not afraid"
    ],
    correctAnswer: 1,
    explanation: "De-escalation techniques: maintain safe distance and exit route, speak calmly and respectfully, do not corner or invade space, watch for escalation signs.",
    category: "scenario",
    difficulty: "medium",
    tags: ["behavioral emergency", "de-escalation", "scene safety"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Behavioral Crisis Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
