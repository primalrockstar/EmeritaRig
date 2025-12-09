// Additional Scenario-Based Questions - Batch 10
// Final batches toward 300 scenario target
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalPharmacologyScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-pharm-nitro-timing-001",
    module: 7,
    chapter: 15,
    scenario: "A chest pain patient took one of their own nitroglycerin tablets 5 minutes ago with no relief. BP is 130/85. They want to take another.",
    question: "Can they take another dose?",
    options: [
      "No - must wait 30 minutes",
      "Yes - can repeat every 3-5 minutes up to 3 doses total if BP remains adequate",
      "No - one dose maximum in field",
      "Only if ALS arrives"
    ],
    correctAnswer: 1,
    explanation: "Nitroglycerin dosing: can repeat every 3-5 minutes, maximum 3 doses (or per protocol), if systolic BP >100 mmHg. Recheck BP before each dose. Document each administration and patient response.",
    category: "scenario",
    difficulty: "medium",
    tags: ["nitroglycerin", "medication administration", "dosing intervals"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Nitroglycerin Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-pharm-activated-charcoal-001",
    module: 7,
    chapter: 19,
    scenario: "A poison control center recommends activated charcoal for a medication overdose patient who is alert and able to swallow.",
    question: "What is a contraindication to activated charcoal?",
    options: [
      "Patient doesn't like the taste",
      "Caustic ingestion, decreased LOC, unable to swallow",
      "Any poisoning",
      "Age over 12"
    ],
    correctAnswer: 1,
    explanation: "Activated charcoal contraindications: altered mental status (aspiration risk), unable to swallow, caustics (acids/alkalis), hydrocarbons, metals. Only given on poison control or medical direction order. Not effective for all poisons.",
    category: "scenario",
    difficulty: "medium",
    tags: ["activated charcoal", "poisoning", "contraindications"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Poisoning Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-pharm-oxygen-copd-001",
    module: 6,
    chapter: 9,
    scenario: "A COPD patient is in moderate respiratory distress. SpO2 is 88%. Patient states 'I'm not supposed to have too much oxygen - it will stop my breathing.'",
    question: "What is the appropriate oxygen therapy?",
    options: [
      "No oxygen - patient is correct",
      "Give oxygen to maintain SpO2 94-99% (or 88-92% if COPD and local protocol specifies) - don't withhold needed oxygen",
      "Withhold oxygen completely",
      "Only nasal cannula at 1 LPM"
    ],
    correctAnswer: 1,
    explanation: "COPD oxygen therapy: give oxygen to correct hypoxia. Old teaching about hypoxic drive overstated - hypoxia kills faster. Aim SpO2 94-99% (some protocols specify 88-92% for COPD). Monitor respiratory effort. Never withhold needed oxygen.",
    category: "scenario",
    difficulty: "hard",
    tags: ["oxygen therapy", "COPD", "hypoxic drive", "SpO2 targets"],
    nremtDomain: "Airway Management",
    nationalProtocolAlignment: "NHTSA 2022 - COPD Oxygen Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-pharm-glucagon-001",
    module: 7,
    chapter: 16,
    scenario: "An unconscious diabetic patient's family has an emergency glucagon kit. You are BLS with no IV access capability.",
    question: "Can EMT-Bs administer glucagon in some systems?",
    options: [
      "Never - ALS only medication",
      "Yes, in some systems EMTs can administer IM glucagon per protocol for unconscious hypoglycemia",
      "Only oral glucose allowed",
      "Glucagon doesn't work"
    ],
    correctAnswer: 1,
    explanation: "Glucagon: some EMS systems allow EMT administration of IM glucagon for unconscious hypoglycemia. Check local protocols. Alternative when no IV access. Can cause vomiting - position patient on side. Raises blood glucose from glycogen stores.",
    category: "scenario",
    difficulty: "medium",
    tags: ["glucagon", "hypoglycemia", "IM injection", "scope of practice"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Hypoglycemia Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-pharm-mdis-spacer-001",
    module: 7,
    chapter: 14,
    scenario: "A patient needs albuterol MDI but is having such severe respiratory distress they can't coordinate the breath with inhaler actuation.",
    question: "What device can help?",
    options: [
      "Nothing can help",
      "Spacer device improves medication delivery and doesn't require coordination",
      "Nebulizer only option",
      "Give up on albuterol"
    ],
    correctAnswer: 1,
    explanation: "MDI with spacer: spacer chamber allows patient to breathe medication without coordinating actuation. Especially helpful in severe distress, children, elderly. Shake inhaler, actuate into spacer, patient breathes from spacer. More effective delivery.",
    category: "scenario",
    difficulty: "easy",
    tags: ["MDI", "spacer", "albuterol", "medication delivery"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Medication Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  }
];

export const additionalMCIScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-mci-start-triage-001",
    module: 10,
    chapter: 38,
    scenario: "Using START triage at an MCI, you find a patient who is breathing over 30/minute, has delayed capillary refill, and cannot follow simple commands.",
    question: "What triage category?",
    options: [
      "Green (minor)",
      "Red (immediate) - all three parameters abnormal",
      "Yellow (delayed)",
      "Black (deceased)"
    ],
    correctAnswer: 1,
    explanation: "START triage RED if: not breathing after airway opening (but then BLACK if still not breathing), RR >30 or <10, cap refill >2 sec, or cannot follow commands. This patient has RR >30, delayed cap refill, AND altered mental status = RED (immediate).",
    category: "scenario",
    difficulty: "hard",
    tags: ["START triage", "MCI", "triage categories"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - MCI Triage Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-mci-walking-wounded-001",
    module: 10,
    chapter: 38,
    scenario: "At an MCI scene, incident commander announces 'all walking wounded move to the green zone.' What triage category are these patients?",
    question: "Walking wounded are typically triaged as:",
    options: [
      "Red",
      "Green (minor) - if can walk, injuries are minor",
      "Yellow",
      "Not triaged"
    ],
    correctAnswer: 1,
    explanation: "Walking wounded: if patient can walk and follow commands, injuries are minor = GREEN triage. Quick way to identify green patients at MCI - direct to collection point. Focus resources on red/yellow patients. Green treated last.",
    category: "scenario",
    difficulty: "easy",
    tags: ["MCI", "walking wounded", "green triage"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - MCI Management Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-mci-black-tag-001",
    module: 10,
    chapter: 38,
    scenario: "At MCI with limited resources, you find a patient in cardiac arrest. You open airway but patient does not start breathing.",
    question: "In START triage, this patient is:",
    options: [
      "Red - start CPR",
      "Black (deceased/expectant) - limited resources in MCI, focus on savable patients",
      "Yellow",
      "Always resuscitate regardless"
    ],
    correctAnswer: 1,
    explanation: "MCI triage BLACK: obvious death, cardiac arrest not breathing after airway positioning. Limited resources - focus on patients most likely to survive. Different than normal care. Difficult ethical decision but saves most lives overall.",
    category: "scenario",
    difficulty: "hard",
    tags: ["MCI", "black tag", "expectant", "triage ethics"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - MCI Black Tag Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-mci-retriage-001",
    module: 10,
    chapter: 38,
    scenario: "A patient initially triaged yellow (delayed) now has decreased level of consciousness and tachypnea over 30/min.",
    question: "What should you do?",
    options: [
      "Leave as yellow - already triaged",
      "Retriage to red (immediate) - patient condition worsened",
      "Move to green",
      "Triage is permanent"
    ],
    correctAnswer: 1,
    explanation: "Retriage: patient conditions change. Continually reassess and update triage categories. Deteriorating patient needs upgrade to higher priority. Improving patients can be downgraded. Triage is dynamic process at MCI.",
    category: "scenario",
    difficulty: "medium",
    tags: ["retriage", "MCI", "dynamic assessment"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - MCI Retriage Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalVehicleOperationsScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-vehicle-due-regard-001",
    module: 10,
    chapter: 36,
    scenario: "You are responding code 3 (lights and sirens) to emergency. You approach a red light at busy intersection.",
    question: "What is required by 'due regard' doctrine?",
    options: [
      "You can proceed at full speed - you have right of way",
      "Must slow, ensure intersection is clear, proceed with caution - emergency vehicle doesn't guarantee safety",
      "Lights/sirens allow ignoring all traffic laws",
      "Other cars must stop regardless"
    ],
    correctAnswer: 1,
    explanation: "Due regard: emergency vehicles must operate with regard for safety of others. At red lights/stop signs: slow/stop, ensure clear, proceed carefully. Lights/sirens request right of way but don't guarantee it. Most ambulance crashes at intersections.",
    category: "scenario",
    difficulty: "medium",
    tags: ["due regard", "emergency driving", "intersection safety"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Emergency Vehicle Operations Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-vehicle-patient-compartment-001",
    module: 10,
    chapter: 36,
    scenario: "You are treating a critical patient in the back of ambulance during transport. Your partner is driving code 3 with significant vehicle movement.",
    question: "What is essential for provider safety?",
    options: [
      "Stand to reach equipment",
      "Always wear seatbelt when vehicle is in motion - unbuckle only when absolutely necessary",
      "Seatbelts not needed in patient compartment",
      "Safety doesn't matter in emergency"
    ],
    correctAnswer: 1,
    explanation: "Provider safety: wear seatbelt whenever possible, even in patient compartment. Unbelted providers become projectiles in crashes. Plan care to minimize time unbelted. Dead/injured providers can't help patients. Most serious ambulance injuries are unbelted providers.",
    category: "scenario",
    difficulty: "medium",
    tags: ["ambulance safety", "seatbelt", "provider safety"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Ambulance Safety Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-vehicle-warning-device-001",
    module: 10,
    chapter: 37,
    scenario: "You arrive at nighttime vehicle crash on highway. Where should you place warning devices/flares?",
    question: "What is proper placement?",
    options: [
      "Right at scene only",
      "Behind scene: one at 10 feet, one at 100 feet, one at 200 feet (or per protocol) to warn oncoming traffic",
      "In front of scene only",
      "Warning devices not necessary"
    ],
    correctAnswer: 1,
    explanation: "Warning device placement: behind scene at increasing distances (typical: 10', 100', 200') to warn approaching traffic. Consider traffic speed - faster traffic needs more warning distance. Protect scene from being struck. Follow local protocol for distances.",
    category: "scenario",
    difficulty: "easy",
    tags: ["scene safety", "warning devices", "flares", "highway operations"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Highway Scene Safety Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-vehicle-helicopter-safety-001",
    module: 10,
    chapter: 36,
    scenario: "A medical helicopter is landing at your scene on sloped ground. You need to approach the aircraft with patient.",
    question: "What is the safe approach?",
    options: [
      "Approach from any direction",
      "Approach from downhill side only, never from uphill side (tail rotor danger), wait for crew signal",
      "Approach from uphill side",
      "Run to helicopter immediately"
    ],
    correctAnswer: 1,
    explanation: "Helicopter safety: approach from DOWNHILL side (tail rotor higher on uphill side), wait for crew signal, stay in pilot's view, never approach from rear (tail rotor invisible/lethal), crouch under rotor, secure loose items. Flight crew directs all operations.",
    category: "scenario",
    difficulty: "medium",
    tags: ["helicopter safety", "air medical", "landing zone"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Air Medical Operations Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalLegalEthicalScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-legal-dni-001",
    module: 3,
    chapter: 3,
    scenario: "A cardiac arrest patient's family shows you a valid DNR (Do Not Resuscitate) order after you've started CPR.",
    question: "What should you do?",
    options: [
      "Continue CPR - already started",
      "Stop resuscitation efforts, verify DNR validity, contact medical direction if questions",
      "Ignore DNR - family could be lying",
      "DNR doesn't apply to EMS"
    ],
    correctAnswer: 1,
    explanation: "Valid DNR: stop resuscitation when presented with valid DNR/POLST, even if already started. Verify document meets legal requirements, contact medical direction if unsure. DNRs are legally binding. Respect patient's wishes documented in advance directive.",
    category: "scenario",
    difficulty: "hard",
    tags: ["DNR", "advance directive", "ethics", "resuscitation"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - DNR Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-legal-minor-consent-001",
    module: 3,
    chapter: 3,
    scenario: "A 16-year-old was injured at school. Minor is alert and refusing care. Parent cannot be reached.",
    question: "Can you treat without parental consent?",
    options: [
      "No - must have parent permission",
      "Yes - implied consent for minor in emergency when parent unavailable, or actual emergency",
      "Never treat minors",
      "Minors can always refuse"
    ],
    correctAnswer: 1,
    explanation: "Minor consent: normally need parent/guardian. Exceptions: emancipated minor, parent unavailable in emergency (implied consent), life threat. School officials may have in loco parentis authority. When in doubt, err on side of treatment. Document efforts to contact parent.",
    category: "scenario",
    difficulty: "medium",
    tags: ["consent", "minor", "implied consent", "legal"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Consent Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-legal-assault-battery-001",
    module: 3,
    chapter: 3,
    scenario: "A competent adult patient is refusing assessment and treatment. You restrain the patient and force transport because 'you know what's best.'",
    question: "This could be considered:",
    options: [
      "Good patient care",
      "Assault and battery, false imprisonment - illegal",
      "Required by your job",
      "Standard practice"
    ],
    correctAnswer: 1,
    explanation: "Competent adult can refuse care. Forcing treatment/transport without consent = assault (threat of harm), battery (unwanted touching), false imprisonment. Patient must be competent to refuse. Forcing care on competent patient is illegal and unethical.",
    category: "scenario",
    difficulty: "medium",
    tags: ["assault", "battery", "consent", "legal liability"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Legal Issues Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-legal-abandonment-001",
    module: 3,
    chapter: 3,
    scenario: "You start treating a patient, then leave scene before ALS arrives because you get another call. Patient's condition is unstable.",
    question: "This represents:",
    options: [
      "Acceptable - new call is priority",
      "Abandonment - terminating care without transfer to equal or higher level",
      "Good resource management",
      "No legal issue"
    ],
    correctAnswer: 1,
    explanation: "Abandonment: terminating care without transferring to equal/higher level provider. Once you start care, responsible until: patient refuses, transfer to equal/higher care, at hospital, or competent authority terminates. Leaving unstable patient = abandonment.",
    category: "scenario",
    difficulty: "medium",
    tags: ["abandonment", "legal duty", "ethics"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Legal Duty Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-legal-mandatory-reporting-001",
    module: 3,
    chapter: 3,
    scenario: "You suspect a 5-year-old has been physically abused based on injury pattern and inconsistent history from parents.",
    question: "What is your legal obligation?",
    options: [
      "Keep suspicions to yourself",
      "Report to appropriate authorities - mandated reporter",
      "Confront parents",
      "Only report if certain"
    ],
    correctAnswer: 1,
    explanation: "Mandatory reporting: EMS are mandated reporters for suspected child/elder/vulnerable adult abuse. Report suspicions to appropriate authority (child protective services, police). Don't need proof - investigation will determine. Failure to report is crime. Document objectively.",
    category: "scenario",
    difficulty: "easy",
    tags: ["mandatory reporting", "child abuse", "legal duty"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Mandatory Reporting Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  }
];
