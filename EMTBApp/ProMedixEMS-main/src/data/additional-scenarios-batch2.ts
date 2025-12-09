// Additional Scenario-Based Questions - Batch 2
// NHTSA 2022 Protocol-Aligned Scenarios
// Comprehensive coverage across all EMT-B domains

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalCardiacScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-cardiac-011",
    module: 7,
    chapter: 13,
    scenario: "A 71-year-old male with a pacemaker complains of weakness and dizziness. His heart rate is 40 bpm, BP 85/50. He states his pacemaker was checked 3 months ago.",
    question: "What should you suspect?",
    options: [
      "Normal function of pacemaker in elderly patients",
      "Pacemaker malfunction",
      "Medication side effect only",
      "Anxiety causing symptoms"
    ],
    correctAnswer: 1,
    explanation: "Bradycardia with hypotension in patient with pacemaker suggests malfunction. Treat symptomatically, monitor closely, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pacemaker", "bradycardia", "cardiac device", "hypotension"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-cardiac-012",
    module: 7,
    chapter: 13,
    scenario: "During transport of a cardiac patient, your AED advises 'shock delivered.' After the shock, you should:",
    question: "What is your immediate next action?",
    options: [
      "Check for pulse immediately",
      "Resume CPR starting with compressions",
      "Wait 30 seconds then check pulse",
      "Give rescue breaths first"
    ],
    correctAnswer: 1,
    explanation: "After AED shock delivery, immediately resume CPR starting with chest compressions. Minimize interruptions in compressions.",
    category: "scenario",
    difficulty: "medium",
    tags: ["AED", "post-shock", "CPR", "resuscitation"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Arrest Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-013",
    module: 7,
    chapter: 13,
    scenario: "A 54-year-old diabetic female has chest discomfort she describes as 'indigestion.' She is nauseous and feels very tired. BP 130/85, P 88, SpO2 96%. She took antacids with no relief.",
    question: "What should you suspect?",
    options: [
      "Simple indigestion - no cardiac involvement",
      "Atypical presentation of acute coronary syndrome",
      "Gastritis only",
      "Anxiety attack"
    ],
    correctAnswer: 1,
    explanation: "Women and diabetics often present with atypical ACS symptoms including 'indigestion,' nausea, and fatigue rather than classic chest pain. Treat as potential ACS.",
    category: "scenario",
    difficulty: "hard",
    tags: ["atypical ACS", "female cardiac", "diabetic", "silent MI"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - ACS Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-cardiac-014",
    module: 7,
    chapter: 13,
    scenario: "You're performing CPR on an adult. After 5 cycles (about 2 minutes), your partner says 'I see organized rhythm on the monitor.' What should you do?",
    question: "What is your next action?",
    options: [
      "Stop CPR and prepare to transport",
      "Pause to check for pulse, resume CPR if no pulse",
      "Continue CPR for 5 more cycles",
      "Administer another AED shock"
    ],
    correctAnswer: 1,
    explanation: "When organized rhythm appears, briefly pause to check for pulse. If no pulse (PEA), immediately resume CPR. Minimize interruptions.",
    category: "scenario",
    difficulty: "medium",
    tags: ["CPR", "rhythm check", "PEA", "pulse check"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Arrest Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-015",
    module: 7,
    chapter: 13,
    scenario: "A 63-year-old male took three of his nitroglycerin tablets at home before calling 911. He still has chest pain and now has a headache. BP 88/52, P 110, R 20.",
    question: "Should you assist with another nitroglycerin dose?",
    options: [
      "Yes, he still has chest pain",
      "No, his blood pressure is too low",
      "Yes, after raising his legs",
      "Yes, but cut the dose in half"
    ],
    correctAnswer: 1,
    explanation: "Hypotension (BP <100 systolic) is a contraindication for nitroglycerin. Treat hypotension, give oxygen, rapid transport. Do not give more nitro.",
    category: "scenario",
    difficulty: "medium",
    tags: ["nitroglycerin", "contraindication", "hypotension", "chest pain"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - ACS Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalRespiratoryScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-resp-012",
    module: 7,
    chapter: 15,
    scenario: "An asthmatic patient used their MDI (metered dose inhaler) but you notice they activated it and then inhaled. They didn't hold their breath afterward.",
    question: "What is the problem with this technique?",
    options: [
      "Technique was perfect",
      "Should inhale first, then activate inhaler, then hold breath",
      "Should hold breath before using inhaler",
      "Should breathe rapidly after using inhaler"
    ],
    correctAnswer: 1,
    explanation: "Proper MDI technique: exhale, activate while inhaling slowly, hold breath 5-10 seconds to allow medication absorption. Poor technique reduces effectiveness.",
    category: "scenario",
    difficulty: "medium",
    tags: ["inhaler technique", "MDI", "asthma", "patient education"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-resp-013",
    module: 7,
    chapter: 15,
    scenario: "A COPD patient on home oxygen tells you their doctor said 'too much oxygen can hurt me.' You find SpO2 of 86% on 2 LPM. What should you do?",
    question: "What is the appropriate oxygen management?",
    options: [
      "Keep at 2 LPM as ordered by doctor",
      "Remove all oxygen per patient concern",
      "Increase oxygen to maintain SpO2 94-98% and monitor",
      "Give oxygen only if SpO2 drops below 80%"
    ],
    correctAnswer: 2,
    explanation: "In acute setting, hypoxia is more dangerous than hypercapnia. Increase oxygen to target SpO2 94-98%, monitor respiratory rate and mental status closely.",
    category: "scenario",
    difficulty: "hard",
    tags: ["COPD", "oxygen therapy", "hypoxic drive", "SpO2"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-resp-014",
    module: 7,
    chapter: 15,
    scenario: "A patient with severe difficulty breathing is sitting upright, leaning forward on hands, with pursed-lip breathing. You attempt to lay them supine for transport.",
    question: "What is likely to happen?",
    options: [
      "Patient will breathe easier lying down",
      "Respiratory distress will worsen significantly",
      "No change in breathing effort",
      "Heart rate will decrease"
    ],
    correctAnswer: 1,
    explanation: "Tripod position helps breathing by utilizing accessory muscles. Forcing supine position in respiratory distress worsens oxygenation. Transport in position of comfort.",
    category: "scenario",
    difficulty: "medium",
    tags: ["positioning", "respiratory distress", "tripod position", "orthopnea"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-resp-015",
    module: 7,
    chapter: 15,
    scenario: "A patient with suspected pulmonary edema has pink frothy sputum and severe dyspnea. SpO2 is 84%. You apply NRB at 15 LPM but SpO2 only improves to 88%.",
    question: "What should you consider?",
    options: [
      "88% is acceptable, no further action needed",
      "Assist ventilations with BVM and PEEP if available",
      "Reduce oxygen flow",
      "Have patient lie flat"
    ],
    correctAnswer: 1,
    explanation: "Pulmonary edema with persistent hypoxia despite high-flow oxygen may require assisted ventilations with PEEP to improve alveolar recruitment and oxygenation.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pulmonary edema", "CPAP", "PEEP", "assisted ventilation"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - CHF/Pulmonary Edema Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalTraumaScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-trauma-mva-001",
    module: 8,
    chapter: 24,
    scenario: "You arrive at an MVC to find a patient still in the vehicle, conscious, complaining of neck pain. The vehicle has moderate front-end damage and deployed airbags.",
    question: "What is your approach to this patient?",
    options: [
      "Have patient exit vehicle and then assess",
      "Manual c-spine stabilization, assess in vehicle, proper extrication",
      "Apply collar through window, then have patient exit",
      "No spinal precautions needed - airbags deployed"
    ],
    correctAnswer: 1,
    explanation: "Significant MOI with neck pain requires manual c-spine stabilization, assessment in vehicle, and proper spinal precautions during extrication.",
    category: "scenario",
    difficulty: "medium",
    tags: ["MVC", "spinal precautions", "extrication", "c-spine"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Spinal Motion Restriction Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-amputation-001",
    module: 8,
    chapter: 23,
    scenario: "An industrial accident resulted in complete amputation of three fingers. Bleeding is controlled. You find the amputated fingers on the scene.",
    question: "How should you handle the amputated parts?",
    options: [
      "Place directly on ice",
      "Wrap in dry gauze, place in plastic bag, keep bag on ice",
      "Submerge in sterile water",
      "Leave at scene - not salvageable"
    ],
    correctAnswer: 1,
    explanation: "Amputated parts: wrap in sterile gauze moistened with saline, place in plastic bag, keep bag cool (not directly on ice). Transport with patient.",
    category: "scenario",
    difficulty: "medium",
    tags: ["amputation", "amputated parts", "preservation", "reimplantation"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Soft Tissue Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-impalement-001",
    module: 8,
    chapter: 23,
    scenario: "A construction worker has a large piece of rebar impaled through his thigh. He is alert, BP 120/70, P 100. The rebar is protruding 2 feet on each side.",
    question: "How should you manage this injury?",
    options: [
      "Remove rebar and pack wound",
      "Cut rebar to manageable length, stabilize in place",
      "Pull rebar out in direction it entered",
      "Transport with full-length rebar"
    ],
    correctAnswer: 1,
    explanation: "Impaled objects should be stabilized in place. Fire department can cut protruding portions to manageable length. Never remove impaled objects in field.",
    category: "scenario",
    difficulty: "medium",
    tags: ["impaled object", "penetrating trauma", "stabilization"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Penetrating Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-evisceration-001",
    module: 8,
    chapter: 23,
    scenario: "A stabbing victim has an open abdominal wound with intestines protruding. Patient is conscious and in severe pain.",
    question: "How should you dress this wound?",
    options: [
      "Push intestines back in and apply dry dressing",
      "Cover with moist sterile dressing, then occlusive dressing",
      "Apply pressure directly to intestines",
      "Cover with dry gauze only"
    ],
    correctAnswer: 1,
    explanation: "Evisceration: never replace organs. Cover with moist sterile dressing, then occlusive dressing to maintain moisture. Position of comfort, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["evisceration", "abdominal trauma", "wound care"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Abdominal Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-flail-001",
    module: 8,
    chapter: 26,
    scenario: "An assault victim has a section of chest wall moving opposite to the rest of the chest during breathing. Paradoxical motion is noted on left side. Patient is in respiratory distress.",
    question: "This indicates:",
    options: [
      "Normal breathing pattern after assault",
      "Flail chest from multiple rib fractures",
      "Pneumothorax only",
      "Muscle spasm"
    ],
    correctAnswer: 1,
    explanation: "Paradoxical chest movement indicates flail segment from multiple rib fractures. High-flow oxygen, support ventilations if needed, monitor for underlying injuries.",
    category: "scenario",
    difficulty: "hard",
    tags: ["flail chest", "paradoxical motion", "chest trauma", "rib fractures"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Chest Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-eye-001",
    module: 8,
    chapter: 23,
    scenario: "A chemical splash to the eyes occurred at a laboratory. The chemical is unknown. Patient has severe pain and cannot open eyes.",
    question: "What is your immediate treatment?",
    options: [
      "Apply eye patches and transport",
      "Continuous irrigation with water or saline for 20+ minutes",
      "Wait for chemical identification before treatment",
      "Apply neutralizing agent"
    ],
    correctAnswer: 1,
    explanation: "Chemical eye injuries require immediate continuous irrigation with water or saline for minimum 20 minutes. Don't delay for chemical identification. Never use neutralizing agents.",
    category: "scenario",
    difficulty: "medium",
    tags: ["chemical burn", "eye injury", "irrigation", "chemical exposure"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Eye Injury Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-nosebleed-001",
    module: 8,
    chapter: 23,
    scenario: "An 80-year-old on blood thinners has severe epistaxis for 30 minutes that won't stop. He has swallowed significant amount of blood and feels nauseous.",
    question: "What is your concern and treatment?",
    options: [
      "Simple nosebleed - have patient lean back",
      "Potential airway compromise and blood loss - position forward, suction available",
      "Stop all blood thinners immediately",
      "Pack nose with gauze deeply"
    ],
    correctAnswer: 1,
    explanation: "Severe epistaxis can cause airway compromise and significant blood loss, especially on anticoagulants. Lean forward, pinch nose, suction available, rapid transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["epistaxis", "nosebleed", "anticoagulants", "hemorrhage control"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Hemorrhage Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalAlertedMentalStatus: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ams-001",
    module: 7,
    chapter: 16,
    scenario: "A 40-year-old diabetic is confused and combative. Family states this came on suddenly. Glucose meter reads 45 mg/dL. Patient is refusing all treatment.",
    question: "What should you do?",
    options: [
      "Accept refusal since patient is awake",
      "Patient lacks capacity due to hypoglycemia - treat as emergency",
      "Restrain patient and force IV",
      "Leave and have family monitor"
    ],
    correctAnswer: 1,
    explanation: "Altered mental status from hypoglycemia means patient lacks decision-making capacity. Treat as medical emergency. Give oral glucose if able to swallow safely.",
    category: "scenario",
    difficulty: "hard",
    tags: ["hypoglycemia", "altered mental status", "implied consent", "capacity"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Diabetic Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ams-002",
    module: 7,
    chapter: 16,
    scenario: "An elderly patient is increasingly confused over several days per family. No focal deficits. Patient has fever of 101.8°F and burning on urination.",
    question: "What is the likely cause of altered mental status?",
    options: [
      "Stroke",
      "Urinary tract infection",
      "Normal aging",
      "Alzheimer's disease"
    ],
    correctAnswer: 1,
    explanation: "Infections, especially UTIs, commonly cause altered mental status in elderly. Fever and urinary symptoms support this. Requires medical evaluation and treatment.",
    category: "scenario",
    difficulty: "medium",
    tags: ["UTI", "infection", "geriatric", "altered mental status"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Altered Mental Status Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ams-003",
    module: 7,
    chapter: 16,
    scenario: "A patient post-seizure is slowly becoming more alert but remains confused. This is most likely:",
    question: "What phase of seizure activity is this?",
    options: [
      "Aura phase",
      "Ictal phase",
      "Postictal phase",
      "Status epilepticus"
    ],
    correctAnswer: 2,
    explanation: "Postictal phase follows seizure, characterized by confusion, drowsiness, gradually improving awareness. Can last minutes to hours. Supportive care and transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["seizure", "postictal", "recovery phase"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Seizure Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ams-004",
    module: 7,
    chapter: 16,
    scenario: "A college student at a party is extremely confused, agitated, pupils dilated, skin hot and dry, tachycardic. Friends are evasive about substance use.",
    question: "This presentation suggests:",
    options: [
      "Alcohol intoxication only",
      "Stimulant or anticholinergic drug use",
      "Heat exhaustion",
      "Diabetic emergency"
    ],
    correctAnswer: 1,
    explanation: "Hot dry skin, dilated pupils, tachycardia, and agitation suggest stimulants or anticholinergics. Cool patient, supportive care, monitor closely, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["toxicology", "stimulants", "anticholinergic", "substance abuse"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Toxicological Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalAnaphylaxisScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-anaphylaxis-001",
    module: 7,
    chapter: 18,
    scenario: "A patient at a restaurant develops hives, swelling of lips and tongue, and difficulty breathing 10 minutes after eating seafood. BP 90/60, P 120, wheezing noted.",
    question: "This is most consistent with:",
    options: [
      "Mild allergic reaction",
      "Anaphylaxis",
      "Food poisoning",
      "Anxiety attack"
    ],
    correctAnswer: 1,
    explanation: "Rapid onset multisystem reaction (skin, airway, cardiovascular) after exposure indicates anaphylaxis. Administer epinephrine per protocol if available, high-flow O2, rapid transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["anaphylaxis", "allergic reaction", "epinephrine", "food allergy"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Allergic Reaction/Anaphylaxis Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-anaphylaxis-002",
    module: 7,
    chapter: 18,
    scenario: "A patient used their EpiPen 5 minutes ago. Symptoms initially improved but now breathing difficulty is worsening again. The patient has a second EpiPen.",
    question: "What should you do?",
    options: [
      "Wait - only one dose allowed",
      "Consult medical control for second dose if local protocol allows",
      "Second dose is never appropriate",
      "Give second dose after 30 minutes only"
    ],
    correctAnswer: 1,
    explanation: "Anaphylaxis can require multiple epinephrine doses. If symptoms recur/persist and second auto-injector available, consult medical control per protocol. Typically 5-15 min between doses.",
    category: "scenario",
    difficulty: "hard",
    tags: ["epinephrine", "repeat dose", "anaphylaxis", "medication"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Anaphylaxis Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-anaphylaxis-003",
    module: 7,
    chapter: 18,
    scenario: "A bee sting victim has localized swelling, redness, and pain at sting site only. No respiratory distress, no systemic symptoms. Vital signs normal.",
    question: "This represents:",
    options: [
      "Anaphylaxis requiring epinephrine",
      "Local reaction not requiring epinephrine",
      "Early anaphylaxis - give epinephrine now",
      "Severe allergic reaction"
    ],
    correctAnswer: 1,
    explanation: "Localized reaction at sting site without systemic symptoms is not anaphylaxis. Monitor closely for progression, supportive care, cold compress to site.",
    category: "scenario",
    difficulty: "medium",
    tags: ["bee sting", "local reaction", "allergic reaction assessment"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Allergic Reaction Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalDiabeticEmergencies: EnhancedQuizQuestion[] = [
  {
    id: "scenario-diabetes-003",
    module: 7,
    chapter: 17,
    scenario: "A diabetic patient has glucose of 450 mg/dL, is lethargic, with deep rapid breathing and a fruity odor on breath. BP 100/60, P 110.",
    question: "This patient is likely experiencing:",
    options: [
      "Hypoglycemia",
      "Diabetic ketoacidosis (DKA)",
      "Normal blood sugar variation",
      "Insulin reaction"
    ],
    correctAnswer: 1,
    explanation: "Hyperglycemia with Kussmaul respirations and fruity breath suggests DKA. High-flow oxygen if hypoxic, IV fluids if available per protocol, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["DKA", "hyperglycemia", "Kussmaul respirations", "ketoacidosis"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Diabetic Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-diabetes-004",
    module: 7,
    chapter: 17,
    scenario: "You give oral glucose to a hypoglycemic patient who was initially confused. After 10 minutes, patient is alert and oriented with glucose now 85 mg/dL. Patient refuses further care.",
    question: "What should you do?",
    options: [
      "Accept refusal - patient is now fine",
      "Strongly encourage transport - hypoglycemia can recur",
      "Force transport against will",
      "Leave after patient signs refusal"
    ],
    correctAnswer: 1,
    explanation: "Even after glucose correction, patient should be transported. Hypoglycemia can recur, and underlying cause needs evaluation. Document thoroughly if patient refuses.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hypoglycemia", "refusal", "recurrence risk", "patient education"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Diabetic Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalPoisoningScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-poison-002",
    module: 7,
    chapter: 19,
    scenario: "A 3-year-old ingested an unknown number of grandmother's pills 15 minutes ago. Child is awake, no symptoms yet. Pill bottle identified as blood pressure medication.",
    question: "What is your management?",
    options: [
      "Wait for symptoms before transporting",
      "Induce vomiting immediately",
      "Immediate transport - symptoms may be delayed",
      "Give activated charcoal at home"
    ],
    correctAnswer: 2,
    explanation: "Many poisonings have delayed onset. Transport all pediatric ingestions immediately, bring pill bottle, contact poison control en route. Don't induce vomiting.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pediatric poisoning", "ingestion", "medication", "poison control"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Poisoning Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-poison-003",
    module: 7,
    chapter: 19,
    scenario: "A suicidal patient admits to taking 'a whole bottle' of Tylenol (acetaminophen) 2 hours ago. Patient feels fine and states 'I changed my mind.'",
    question: "What is your concern?",
    options: [
      "No concern - patient feels fine",
      "Acetaminophen overdose can cause delayed liver failure",
      "Only concern if patient seems intoxicated",
      "Tylenol is not toxic in overdose"
    ],
    correctAnswer: 1,
    explanation: "Acetaminophen overdose may have minimal initial symptoms but causes severe liver damage hours later. All intentional overdoses require immediate hospital evaluation.",
    category: "scenario",
    difficulty: "hard",
    tags: ["acetaminophen", "overdose", "delayed toxicity", "liver failure"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Overdose Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-poison-004",
    module: 7,
    chapter: 19,
    scenario: "A landscaper was spraying pesticides and now has excessive salivation, tearing, sweating, small pupils, and difficulty breathing. SLUDGEM symptoms noted.",
    question: "This presentation suggests:",
    options: [
      "Heat exhaustion",
      "Organophosphate poisoning",
      "Allergic reaction",
      "Asthma attack"
    ],
    correctAnswer: 1,
    explanation: "SLUDGEM (Salivation, Lacrimation, Urination, Defecation, GI upset, Emesis, Miosis) indicates cholinergic toxicity from organophosphates. Decontaminate, supportive care, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["organophosphate", "pesticide", "SLUDGEM", "cholinergic"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Hazmat/Poisoning Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];
