// Additional Scenario-Based Questions - Batch 6
// Comprehensive EMT-B domain coverage
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalNeurologicalScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-neuro-stroke-fast-001",
    module: 7,
    chapter: 17,
    scenario: "You're performing a stroke assessment. Patient has right-sided facial droop and right arm drift. Speech is clear and appropriate. Blood glucose is 95 mg/dL. Symptom onset was 45 minutes ago.",
    question: "What is your FAST exam finding?",
    options: [
      "Negative - speech is normal",
      "Positive - Face and Arm abnormal, Time critical",
      "Not a stroke - glucose is normal",
      "Wait to see if symptoms resolve"
    ],
    correctAnswer: 1,
    explanation: "FAST: Face droop, Arm drift, Speech difficulty, Time. Two of three components are positive = stroke alert. Time is critical for treatment. Normal glucose rules out hypoglycemia mimic. Rapid transport to stroke center.",
    category: "scenario",
    difficulty: "medium",
    tags: ["stroke", "FAST exam", "time-critical", "assessment"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Stroke Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-neuro-tia-001",
    module: 7,
    chapter: 17,
    scenario: "A patient had facial droop and slurred speech that lasted 10 minutes and completely resolved. Patient is now normal. Patient wants to refuse transport stating 'I'm fine now.'",
    question: "What should you tell the patient?",
    options: [
      "You're fine - symptoms resolved",
      "This could be a TIA (warning stroke) - high risk for major stroke within days, needs evaluation",
      "TIAs are harmless",
      "No treatment needed"
    ],
    correctAnswer: 1,
    explanation: "TIA (Transient Ischemic Attack): stroke symptoms that resolve <24hrs (often minutes). Warning sign - high risk for major stroke soon. Requires emergency evaluation and treatment to prevent full stroke. Transport recommended.",
    category: "scenario",
    difficulty: "medium",
    tags: ["TIA", "stroke", "refusal", "patient education"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - TIA Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-neuro-bells-palsy-001",
    module: 7,
    chapter: 17,
    scenario: "A 35-year-old has sudden onset of complete right-sided facial paralysis. Cannot close right eye or smile on right side. However, patient CAN wrinkle forehead on both sides. No arm/leg weakness. Speech normal.",
    question: "The ability to wrinkle forehead bilaterally suggests:",
    options: [
      "Stroke",
      "Bell's palsy (peripheral facial nerve) rather than stroke (central)",
      "Normal variation",
      "Migraine"
    ],
    correctAnswer: 1,
    explanation: "Stroke vs Bell's palsy: Stroke (central) - cannot wrinkle forehead on affected side. Bell's palsy (peripheral nerve) - CAN wrinkle forehead. Still transport for evaluation - other causes exist. Bell's usually resolves.",
    category: "scenario",
    difficulty: "hard",
    tags: ["Bell's palsy", "facial paralysis", "stroke differential", "assessment"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Neurological Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-neuro-postictal-001",
    module: 7,
    chapter: 16,
    scenario: "You arrive to find a patient who had a witnessed seizure 5 minutes ago. Patient is now sleepy, confused, combative when stimulated. Glucose is 110 mg/dL. Seizure lasted about 2 minutes.",
    question: "The patient's current state is best described as:",
    options: [
      "Still seizing",
      "Postictal phase - expected recovery period after seizure",
      "Stroke occurring",
      "Intoxicated"
    ],
    correctAnswer: 1,
    explanation: "Postictal state: period after seizure with confusion, fatigue, combativeness. Can last minutes to hours. Protect patient, suction if needed, position recovery/side-lying, transport. Document seizure details - first time?, how long?, etc.",
    category: "scenario",
    difficulty: "medium",
    tags: ["seizure", "postictal", "altered mental status"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Seizure Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-neuro-status-epilepticus-001",
    module: 7,
    chapter: 16,
    scenario: "A patient has been having continuous seizure activity for 8 minutes. Patient has not regained consciousness between seizures. Bystanders gave rectal diazepam 3 minutes ago.",
    question: "This presentation indicates:",
    options: [
      "Normal seizure - wait for it to stop",
      "Status epilepticus - life-threatening emergency",
      "Seizure disorder is well-controlled",
      "No intervention needed"
    ],
    correctAnswer: 1,
    explanation: "Status epilepticus: continuous seizure >5 minutes or multiple seizures without regaining consciousness. Life-threatening - brain damage, hypoxia, death. Protect airway, suction, O2, rapid transport for IV anticonvulsants.",
    category: "scenario",
    difficulty: "hard",
    tags: ["status epilepticus", "seizure", "emergency", "life threat"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Status Epilepticus Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-neuro-headache-red-flags-001",
    module: 7,
    chapter: 17,
    scenario: "A 45-year-old has 'the worst headache of my life' that came on suddenly while exercising. Patient also has stiff neck and photophobia (light sensitivity). No history of migraines.",
    question: "These 'red flag' headache symptoms suggest:",
    options: [
      "Migraine headache",
      "Subarachnoid hemorrhage (SAH) or other serious intracranial process",
      "Tension headache",
      "Dehydration"
    ],
    correctAnswer: 1,
    explanation: "Red flag headache: worst ever, sudden onset ('thunderclap'), stiff neck, fever, focal neuro signs. Suspect SAH (ruptured aneurysm), meningitis, mass. 'Worst headache of life' requires emergency evaluation.",
    category: "scenario",
    difficulty: "hard",
    tags: ["headache", "subarachnoid hemorrhage", "red flags", "neuro emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Acute Headache Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalMedicationScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-med-assisted-medication-001",
    module: 7,
    chapter: 12,
    scenario: "A patient with chest pain wants to take his own prescribed nitroglycerin. His BP is 140/90, he takes no erectile dysfunction medications, and has taken 0 doses today.",
    question: "Can you assist with his nitroglycerin?",
    options: [
      "No - EMTs cannot assist with any medications",
      "Yes - meets criteria: prescribed to patient, BP >100 systolic, no contraindications",
      "No - BP too high",
      "Yes but only if ALS approves"
    ],
    correctAnswer: 1,
    explanation: "EMT can assist with patient's own NTG if: prescribed to patient, systolic BP >100 mmHg, max 3 doses, no ED drugs within 24-48hrs. Monitor BP before each dose. Assist administration per protocol.",
    category: "scenario",
    difficulty: "medium",
    tags: ["nitroglycerin", "assisted medication", "chest pain"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Chest Pain Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-epipen-adult-001",
    module: 7,
    chapter: 18,
    scenario: "A patient is having anaphylaxis with severe respiratory distress and hypotension. Patient has their own prescribed EpiPen. You confirm it's not expired.",
    question: "Where do you administer the EpiPen?",
    options: [
      "Deltoid muscle",
      "Lateral thigh (vastus lateralis) - anterolateral aspect",
      "Abdomen",
      "Gluteus"
    ],
    correctAnswer: 1,
    explanation: "EpiPen/epinephrine auto-injector: lateral thigh (vastus lateralis), mid-anterolateral. Hold firmly 10 seconds. Can go through clothing if needed. Only auto-injectors in EMT scope (not vials). Monitor for improvement.",
    category: "scenario",
    difficulty: "medium",
    tags: ["epinephrine", "auto-injector", "anaphylaxis", "injection site"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Anaphylaxis Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-aspirin-contraindication-001",
    module: 7,
    chapter: 15,
    scenario: "A patient with chest pain takes daily aspirin at home. He wants you to give him aspirin. He has a history of stomach ulcers and had GI bleeding 2 months ago.",
    question: "Should you assist with aspirin?",
    options: [
      "Yes - chest pain patient needs aspirin",
      "No - GI bleeding/ulcer history is contraindication to aspirin",
      "Yes - he already takes it daily",
      "Only if patient insists"
    ],
    correctAnswer: 1,
    explanation: "Aspirin contraindications: aspirin allergy, GI bleeding, bleeding disorders, pediatric viral illness. Recent GI bleed is contraindication even if patient normally takes aspirin. Contact medical direction if unclear.",
    category: "scenario",
    difficulty: "medium",
    tags: ["aspirin", "contraindication", "GI bleeding"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Chest Pain Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-albuterol-side-effects-001",
    module: 7,
    chapter: 14,
    scenario: "After assisting a patient with their albuterol inhaler, patient reports feeling 'shaky' and their heart rate increased from 90 to 110. Otherwise, breathing has improved.",
    question: "This represents:",
    options: [
      "Allergic reaction - give epinephrine",
      "Expected side effects of albuterol - beta agonist causes tremor and tachycardia",
      "Overdose - dangerous",
      "Unrelated to medication"
    ],
    correctAnswer: 1,
    explanation: "Albuterol is beta-2 agonist: expected side effects include tremor, tachycardia, nervousness. Usually mild and tolerable versus severity of respiratory distress. Monitor vitals, document. Not allergic reaction.",
    category: "scenario",
    difficulty: "easy",
    tags: ["albuterol", "side effects", "beta agonist"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Distress Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-med-oral-glucose-unconscious-001",
    module: 7,
    chapter: 16,
    scenario: "A diabetic patient is unconscious with a blood glucose of 40 mg/dL. Family wants you to give oral glucose.",
    question: "Should you give oral glucose?",
    options: [
      "Yes - low blood sugar needs glucose",
      "No - patient cannot protect airway/swallow - oral glucose contraindicated when unconscious",
      "Yes if you put it between cheek and gum",
      "Force it down patient's throat"
    ],
    correctAnswer: 1,
    explanation: "Oral glucose contraindications: unconscious, unable to swallow, no gag reflex. Aspiration risk. Unconscious hypoglycemic needs IV dextrose (ALS) or glucagon IM. Never give oral meds to unconscious patient.",
    category: "scenario",
    difficulty: "medium",
    tags: ["oral glucose", "contraindication", "unconscious", "aspiration"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Hypoglycemia Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalOperationsScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ops-lifting-injury-001",
    module: 1,
    chapter: 2,
    scenario: "Your partner starts to lift a heavy patient without proper technique. You notice they are bending at waist with back curved instead of using legs.",
    question: "What should you do?",
    options: [
      "Continue the lift - can't stop now",
      "Stop the lift immediately, reposition with proper body mechanics before continuing",
      "Let partner learn from injury",
      "Help lift faster"
    ],
    correctAnswer: 1,
    explanation: "Stop unsafe lift immediately - better to reset than injure. Proper lifting: power grip, feet shoulder-width, bend knees not back, keep back straight, lift with legs, keep weight close. EMS has high back injury rate.",
    category: "scenario",
    difficulty: "easy",
    tags: ["body mechanics", "lifting", "safety", "injury prevention"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Provider Safety Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-ops-equipment-failure-001",
    module: 10,
    chapter: 36,
    scenario: "En route to hospital with critical patient, your cardiac monitor/defibrillator suddenly stops working. Patient is stable currently but could deteriorate.",
    question: "What is your best course of action?",
    options: [
      "Stop and fix equipment",
      "Continue to nearest appropriate facility, notify receiving hospital of equipment failure, prepare backup equipment if available",
      "Return to station for new equipment",
      "Cancel transport"
    ],
    correctAnswer: 1,
    explanation: "Equipment failure en route: continue transport unless patient requires that equipment NOW, notify hospital, switch to backup if available, document. Patient care priority over equipment troubleshooting during transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["equipment failure", "transport decisions", "contingency planning"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Transport Operations Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ops-family-interference-001",
    module: 10,
    chapter: 36,
    scenario: "You are treating a critical patient when a family member becomes aggressive, yelling and grabbing your arm, demanding you 'do something different.'",
    question: "How should you manage this situation?",
    options: [
      "Ignore them and continue",
      "Have partner manage family member (move to safe distance), request police if needed, ensure crew safety while continuing care",
      "Stop patient care to argue",
      "Physically remove family member yourself"
    ],
    correctAnswer: 1,
    explanation: "Aggressive family: crew safety first. Designate one person to calmly address family, move them to safe area, explain care being provided. Request police for safety if needed. Never argue or become physical. Continue patient care.",
    category: "scenario",
    difficulty: "medium",
    tags: ["scene safety", "family dynamics", "communication", "de-escalation"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Scene Safety Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ops-contaminated-sharps-001",
    module: 2,
    chapter: 2,
    scenario: "While cleaning up after a call, you notice a used needle that was not properly disposed of. It is on the ambulance floor.",
    question: "What is the appropriate action?",
    options: [
      "Pick it up with gloves and put in regular trash",
      "Use appropriate device (pickup tool/forceps) to place in sharps container, document exposure potential, complete incident report",
      "Kick it under the seat",
      "Leave it for someone else"
    ],
    correctAnswer: 1,
    explanation: "Improperly disposed sharps: safety hazard. Use mechanical device to pick up (never hands even with gloves), place in sharps container, document incident, report per protocol. Sharps must go in rigid puncture-proof containers.",
    category: "scenario",
    difficulty: "easy",
    tags: ["sharps safety", "infection control", "incident reporting"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Infection Control Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-ops-destination-decision-001",
    module: 10,
    chapter: 36,
    scenario: "You have a stroke patient with symptom onset 30 minutes ago. You are 5 minutes from a small community hospital and 25 minutes from a comprehensive stroke center.",
    question: "Which destination is most appropriate?",
    options: [
      "Community hospital - it's closer",
      "Stroke center - time-critical patient needs specialized facility (within window for intervention)",
      "Patient's choice only",
      "Closest facility always required"
    ],
    correctAnswer: 1,
    explanation: "Stroke within treatment window (<4.5hrs typically): transport to stroke center for interventions (tPA, thrombectomy). Bypass closer facility if within treatment window and transport time reasonable. Time saved at stroke center vs delay to treatment.",
    category: "scenario",
    difficulty: "hard",
    tags: ["destination decision", "stroke center", "specialty facility", "triage"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Stroke Transport Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ops-radio-malfunction-001",
    module: 10,
    chapter: 34,
    scenario: "You are transporting a critical patient but your radio fails and you cannot contact the receiving hospital or dispatch. Your cell phone also has no signal in this area.",
    question: "What should you do?",
    options: [
      "Stop and fix radio",
      "Continue transport, have hospital notified upon arrival, document communications failure",
      "Return to station",
      "Stop at facility with phone"
    ],
    correctAnswer: 1,
    explanation: "Radio failure: patient care priority - continue transport. Document communication failure, notify hospital on arrival. Have receiving facility back-notify dispatch. Don't delay critical patient transport for radio repair.",
    category: "scenario",
    difficulty: "medium",
    tags: ["communication failure", "contingency planning", "transport"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Communications Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalSpecialPopulationScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-special-autism-001",
    module: 9,
    chapter: 33,
    scenario: "You respond to a 12-year-old with autism who is having a seizure. Parents report this is his first seizure. Patient is now postictal and becoming agitated by your presence and loud equipment sounds.",
    question: "How should you adapt your approach?",
    options: [
      "Restrain patient for safety",
      "Reduce sensory stimuli (dim lights, quiet voices), allow parent close, give patient space, move slowly and deliberately",
      "Proceed with normal assessment quickly",
      "Cancel transport"
    ],
    correctAnswer: 1,
    explanation: "Autism spectrum: sensory sensitivities, communication differences, need routine. Reduce stimuli, speak calmly/simply, allow comfort items/caregiver, respect personal space. Still perform necessary assessment and care - adapt approach.",
    category: "scenario",
    difficulty: "medium",
    tags: ["autism", "special needs", "sensory sensitivity", "communication"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Special Healthcare Needs Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-special-tracheostomy-001",
    module: 9,
    chapter: 33,
    scenario: "You arrive to find an adult patient with a tracheostomy who is in respiratory distress. The patient normally uses a home ventilator which has malfunctioned.",
    question: "How do you provide ventilatory support?",
    options: [
      "Apply oxygen mask to face",
      "Apply BVM to tracheostomy stoma (or use pediatric mask over stoma), ventilate through trach",
      "Cannot help - need special equipment",
      "Attempt to remove tracheostomy first"
    ],
    correctAnswer: 1,
    explanation: "Tracheostomy: air comes in/out of neck stoma, not mouth/nose. Apply BVM directly to trach or use pediatric mask sealed over stoma. Suction trach if needed. Don't remove trach tube. May need to cover nose/mouth if air leak.",
    category: "scenario",
    difficulty: "medium",
    tags: ["tracheostomy", "special needs", "airway management", "ventilation"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Technology-Dependent Patients Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-special-bariatric-001",
    module: 9,
    chapter: 33,
    scenario: "You respond to a 450-pound patient in cardiac arrest on the second floor of a house. Standard equipment will not accommodate patient size.",
    question: "What operational considerations apply?",
    options: [
      "Refuse transport",
      "Request bariatric equipment and additional personnel, plan extrication route, consider alternative packaging/moving strategies",
      "Use standard equipment - it will work",
      "Tell patient to walk"
    ],
    correctAnswer: 1,
    explanation: "Bariatric patients: request specialized equipment (bariatric stretcher/lift), additional personnel (6-8 people), plan route/obstacles, protect patient dignity, no different medical care - equipment/logistics require planning. Crew injury risk high.",
    category: "scenario",
    difficulty: "medium",
    tags: ["bariatric", "special operations", "resource management"],
    nremtDomain: "EMS Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Bariatric Patient Management Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
