// Additional Scenario-Based Questions - Batch 5
// Comprehensive EMT-B domain coverage
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalObstetricScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ob-prolapsed-cord-001",
    module: 9,
    chapter: 31,
    scenario: "During delivery, you notice the umbilical cord is presenting before the baby's head. The mother is fully dilated with strong contractions. Baby is not yet delivered.",
    question: "What is your immediate priority?",
    options: [
      "Push cord back into birth canal",
      "Position mother knees-to-chest, insert gloved fingers to relieve pressure on cord, rapid transport",
      "Continue with normal delivery",
      "Cut the cord immediately"
    ],
    correctAnswer: 1,
    explanation: "Prolapsed cord: emergency - cord compression cuts off baby's oxygen. Elevate baby's presenting part off cord with gloved hand, position mother head down/knees up, high-flow O2, rapid transport. Do not push cord back in.",
    category: "scenario",
    difficulty: "hard",
    tags: ["prolapsed cord", "OB emergency", "delivery complication"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Obstetric Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-breech-001",
    module: 9,
    chapter: 31,
    scenario: "During delivery, you see the baby's buttocks emerging first instead of the head. Mother is having strong contractions and pushing. This is her first baby.",
    question: "How should you proceed?",
    options: [
      "Attempt to turn baby manually",
      "Support baby's body as it delivers, create airway for baby's face if head delays, rapid transport",
      "Stop mother from pushing",
      "This is normal - proceed with regular delivery"
    ],
    correctAnswer: 1,
    explanation: "Breech presentation: allow body to deliver naturally, support baby's body, if head delays create airway by forming 'V' with fingers around baby's nose. Most need hospital delivery. Transport rapidly.",
    category: "scenario",
    difficulty: "hard",
    tags: ["breech presentation", "abnormal delivery", "OB emergency"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Complicated Childbirth Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-postpartum-hemorrhage-001",
    module: 9,
    chapter: 31,
    scenario: "10 minutes after delivery, the mother has delivered the placenta but continues to have heavy vaginal bleeding. She has soaked 3 pads and appears pale and weak. BP 90/60, P 120.",
    question: "What interventions are appropriate?",
    options: [
      "Apply direct pressure externally only",
      "Massage uterine fundus, place pads (no packing), treat for shock, rapid transport",
      "Pack vagina with gauze",
      "This is normal postpartum bleeding"
    ],
    correctAnswer: 1,
    explanation: "Postpartum hemorrhage (>500mL): massage uterine fundus firmly to promote contraction, allow baby to nurse if possible (releases oxytocin), treat for shock, rapid transport. Never pack vagina.",
    category: "scenario",
    difficulty: "medium",
    tags: ["postpartum hemorrhage", "uterine atony", "shock"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Postpartum Emergency Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ob-eclampsia-001",
    module: 9,
    chapter: 31,
    scenario: "A 30-week pregnant woman has a sudden seizure lasting 2 minutes. She now has postictal altered mental status. History of recent headache and 'swelling.' BP 180/110.",
    question: "This presentation most likely indicates:",
    options: [
      "Normal pregnancy",
      "Eclampsia (seizure from preeclampsia)",
      "Epilepsy unrelated to pregnancy",
      "Hypoglycemia"
    ],
    correctAnswer: 1,
    explanation: "Eclampsia: seizure in pregnant/postpartum woman, usually with hypertension, headache, edema. Life-threatening to mother and baby. Protect during seizure, left lateral positioning, high-flow O2, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["eclampsia", "preeclampsia", "pregnancy complications", "seizure"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pregnancy Complications Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-premature-birth-001",
    module: 9,
    chapter: 31,
    scenario: "A woman at 32 weeks gestation delivers a tiny baby (approximately 4 pounds). Baby is breathing but respiratory effort is weak. Baby appears bluish.",
    question: "What special considerations apply to this premature infant?",
    options: [
      "No special treatment needed",
      "Aggressive warming, gentle ventilatory support if needed, wrap in plastic/foil to prevent heat loss, rapid transport",
      "Stimulate vigorously",
      "Wait for spontaneous improvement"
    ],
    correctAnswer: 1,
    explanation: "Premature infants: critical heat loss prevention (wrap in plastic, warm ambulance), gentle airway management (lungs fragile), assist ventilations carefully if needed, rapid transport to facility with NICU.",
    category: "scenario",
    difficulty: "hard",
    tags: ["premature birth", "neonatal resuscitation", "thermoregulation"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Neonatal Resuscitation Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalGeriatricScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-geri-polypharmacy-001",
    module: 9,
    chapter: 32,
    scenario: "An 82-year-old has altered mental status. Family provides 15 different prescription bottles. Patient takes medications for diabetes, heart disease, blood pressure, depression, and pain.",
    question: "What is your primary concern with this medication list?",
    options: [
      "Patient is non-compliant",
      "Polypharmacy increases risk for drug interactions, adverse effects, and medication errors",
      "Too many medications is normal for elderly",
      "Focus only on current symptoms"
    ],
    correctAnswer: 1,
    explanation: "Polypharmacy (multiple medications) in elderly: increased risk interactions, adverse effects, falls, confusion, medication errors. Bring all medications to hospital. Consider medication-related cause for symptoms.",
    category: "scenario",
    difficulty: "medium",
    tags: ["polypharmacy", "geriatric", "medication interactions"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Geriatric Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-geri-hip-fracture-001",
    module: 9,
    chapter: 32,
    scenario: "A 78-year-old fell from standing and cannot get up. She has severe hip pain and the affected leg is shortened and externally rotated. She takes blood thinners.",
    question: "Beyond treating the obvious fracture, what additional concern exists?",
    options: [
      "None - just splint and transport",
      "Blood thinner increases risk for significant internal bleeding; monitor for shock",
      "Hip fractures don't cause serious bleeding",
      "External rotation is normal"
    ],
    correctAnswer: 1,
    explanation: "Hip fracture in elderly on anticoagulants: can have significant internal bleeding into thigh/pelvis. Monitor for shock, gentle handling, splint in position found, rapid transport. High mortality in elderly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hip fracture", "geriatric trauma", "anticoagulation", "internal bleeding"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Geriatric Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-geri-sepsis-001",
    module: 9,
    chapter: 32,
    scenario: "A nursing home patient is 'just not acting right' per staff. Patient has mild confusion (baseline is alert), temp 99.5°F, HR 110, BP 100/60. No specific complaints.",
    question: "These subtle findings in an elderly patient may indicate:",
    options: [
      "Normal aging",
      "Early sepsis - elderly often present atypically",
      "Nothing concerning",
      "Dementia progression"
    ],
    correctAnswer: 1,
    explanation: "Elderly sepsis presentation: often subtle/atypical - mild confusion, minimal fever, weakness, 'just not right.' High index of suspicion. Sepsis can progress rapidly in elderly. Early recognition critical.",
    category: "scenario",
    difficulty: "hard",
    tags: ["sepsis", "geriatric", "atypical presentation", "infection"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Geriatric Medical Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-geri-ams-baseline-001",
    module: 9,
    chapter: 32,
    scenario: "You respond to a nursing home for 'altered mental status.' The patient is confused and disoriented. Nursing staff states 'she's always like this - that's her baseline dementia.'",
    question: "What should you do?",
    options: [
      "Accept staff statement and leave patient at facility",
      "Complete full assessment - baseline confusion doesn't rule out acute problem",
      "Dementia explains everything",
      "No treatment needed"
    ],
    correctAnswer: 1,
    explanation: "Never assume confusion is 'just baseline' - elderly with dementia still get stroke, hypoglycemia, hypoxia, infection, etc. Complete assessment, compare to true baseline if possible, check glucose, vitals, look for acute cause.",
    category: "scenario",
    difficulty: "medium",
    tags: ["altered mental status", "dementia", "geriatric assessment"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Altered Mental Status Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-geri-elder-abuse-001",
    module: 9,
    chapter: 32,
    scenario: "An 85-year-old has multiple bruises in various stages of healing, poor hygiene, appears malnourished. Caregiver is defensive and won't let you speak to patient alone. Patient seems fearful.",
    question: "You should suspect:",
    options: [
      "Normal aging changes",
      "Elder abuse/neglect - mandated reporter",
      "Increased fall risk only",
      "None of your concern"
    ],
    correctAnswer: 1,
    explanation: "Elder abuse signs: unexplained injuries, poor care, malnutrition, dehydration, fearful behavior, defensive caregivers. Mandated reporter - document objectively, report to authorities per protocol, ensure patient safety.",
    category: "scenario",
    difficulty: "hard",
    tags: ["elder abuse", "neglect", "mandated reporting", "vulnerable adult"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Vulnerable Adult Protection Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalToxicologyScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-tox-opioid-001",
    module: 7,
    chapter: 19,
    scenario: "An unresponsive patient has pinpoint pupils, respiratory rate of 6/min, and shallow breathing. Bystanders report possible heroin use.",
    question: "What is your immediate intervention priority?",
    options: [
      "Administer naloxone first",
      "Airway management and ventilatory support first, then naloxone if in protocol",
      "Wait for ALS",
      "Stimulate patient vigorously"
    ],
    correctAnswer: 1,
    explanation: "Opioid overdose: airway/breathing is first priority - assist ventilations, then naloxone per protocol. Naloxone won't help if patient not ventilated. Classic signs: unconscious, pinpoint pupils, respiratory depression.",
    category: "scenario",
    difficulty: "medium",
    tags: ["opioid overdose", "naloxone", "respiratory depression"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Opioid Overdose Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-tox-carbon-monoxide-001",
    module: 7,
    chapter: 19,
    scenario: "Multiple family members in a home have headache, nausea, and confusion. They report their gas heater has been running all day. They all 'feel better when they go outside.'",
    question: "You should suspect:",
    options: [
      "Food poisoning",
      "Carbon monoxide poisoning",
      "Flu outbreak",
      "Anxiety"
    ],
    correctAnswer: 1,
    explanation: "CO poisoning: headache, N/V, confusion, multiple victims, enclosed space with combustion source, improvement with fresh air. Remove all victims from area, high-flow O2, don't re-enter without fire department clearance.",
    category: "scenario",
    difficulty: "medium",
    tags: ["carbon monoxide", "poisoning", "inhalation", "scene safety"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Toxic Inhalation Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-tox-caustic-ingestion-001",
    module: 7,
    chapter: 19,
    scenario: "A child drank drain cleaner (caustic alkali). Child is conscious, crying, drooling, with burns visible around mouth. Parent asks if they should induce vomiting.",
    question: "What should you advise?",
    options: [
      "Yes, vomit it up immediately",
      "No - do not induce vomiting with caustic ingestion; causes re-injury to esophagus",
      "Give activated charcoal",
      "Give milk to neutralize"
    ],
    correctAnswer: 1,
    explanation: "Caustic ingestion (acids/alkalis): DO NOT induce vomiting - causes re-injury, may perforate esophagus. Give small amounts water/milk if able to swallow and alert, manage airway (swelling), rapid transport. No activated charcoal.",
    category: "scenario",
    difficulty: "hard",
    tags: ["caustic ingestion", "poisoning", "chemical burn", "pediatric"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Toxic Ingestion Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-tox-organophosphate-001",
    module: 7,
    chapter: 19,
    scenario: "A farmer spraying pesticides develops excessive salivation, lacrimation, urination, defecation, and muscle fasciculations. He is having difficulty breathing.",
    question: "These symptoms suggest:",
    options: [
      "Heat stroke",
      "Organophosphate poisoning (SLUDGEM symptoms)",
      "Stroke",
      "Allergic reaction"
    ],
    correctAnswer: 1,
    explanation: "Organophosphate poisoning (pesticides): SLUDGEM - Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis, Muscle fasciculations/Miosis. Also respiratory distress. Decon patient, supportive care, rapid transport. Antidote is atropine (ALS).",
    category: "scenario",
    difficulty: "hard",
    tags: ["organophosphate", "pesticide", "SLUDGEM", "toxic exposure"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Pesticide Poisoning Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-tox-alcohol-001",
    module: 7,
    chapter: 19,
    scenario: "An intoxicated patient is unresponsive with smell of alcohol. Blood glucose is 45 mg/dL. Friends say 'he's just drunk - let him sleep it off.'",
    question: "What is the most important consideration?",
    options: [
      "Alcohol alone explains everything",
      "Hypoglycemia and other conditions can coexist with intoxication - full assessment needed",
      "Let patient sleep",
      "Alcohol causes low blood sugar - it's normal"
    ],
    correctAnswer: 1,
    explanation: "Never assume 'just drunk' - intoxicated patients get head injuries, diabetes, overdoses, sepsis, etc. Complete assessment, check glucose, treat hypoglycemia. Alcohol impairs glucose production. Look for other causes.",
    category: "scenario",
    difficulty: "medium",
    tags: ["alcohol intoxication", "hypoglycemia", "altered mental status"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Altered Mental Status Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalRespiratoryScenarios3: EnhancedQuizQuestion[] = [
  {
    id: "scenario-resp-epiglottitis-001",
    module: 7,
    chapter: 14,
    scenario: "A 4-year-old has severe respiratory distress, high fever (104°F), drooling, sitting in tripod position, and refusing to lie down. Parents report sudden onset over 4 hours.",
    question: "You should suspect:",
    options: [
      "Croup",
      "Epiglottitis - do not examine throat, keep child calm, rapid transport",
      "Asthma",
      "Common cold"
    ],
    correctAnswer: 1,
    explanation: "Epiglottitis: severe respiratory distress, high fever, drooling, tripod position, toxic appearance. Life-threatening airway emergency. Do NOT examine throat/agitate child, keep calm, allow position of comfort, rapid transport to OR.",
    category: "scenario",
    difficulty: "hard",
    tags: ["epiglottitis", "airway emergency", "pediatric", "respiratory distress"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Airway Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-resp-croup-001",
    module: 7,
    chapter: 14,
    scenario: "A 2-year-old has a 'barking seal' cough, mild respiratory distress, and low-grade fever. Symptoms worse at night. Child is alert and can lie down comfortably.",
    question: "This presentation suggests:",
    options: [
      "Epiglottitis - extreme emergency",
      "Croup - usually less severe, barking cough, cool mist may help",
      "Bronchiolitis",
      "Foreign body"
    ],
    correctAnswer: 1,
    explanation: "Croup (laryngotracheobronchitis): barking cough, stridor, mild-moderate distress, worse at night, fever. Usually less severe than epiglottitis. Cool mist, position of comfort, calm child, transport. Monitor for worsening.",
    category: "scenario",
    difficulty: "medium",
    tags: ["croup", "pediatric respiratory", "stridor", "upper airway"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-resp-pulmonary-embolism-001",
    module: 7,
    chapter: 14,
    scenario: "A 55-year-old woman has sudden onset of severe shortness of breath and sharp chest pain with breathing. She had knee surgery 2 weeks ago. She is tachycardic, tachypneic, anxious, with normal lung sounds.",
    question: "You should suspect:",
    options: [
      "Myocardial infarction",
      "Pulmonary embolism (PE)",
      "Pneumonia",
      "Anxiety attack"
    ],
    correctAnswer: 1,
    explanation: "PE risk factors: recent surgery, immobilization, sudden dyspnea, pleuritic chest pain, tachycardia, normal or clear lung sounds. Life-threatening. High-flow O2, position of comfort, rapid transport. Can't diagnose in field but high suspicion.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pulmonary embolism", "PE", "chest pain", "dyspnea"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-resp-hyperventilation-001",
    module: 7,
    chapter: 14,
    scenario: "A 25-year-old is breathing very rapidly (40/min), complaining of tingling fingers, dizziness, and feeling like can't get enough air. No medical history. Started during argument with spouse.",
    question: "While considering hyperventilation syndrome, what must you rule out first?",
    options: [
      "Nothing - obviously anxiety",
      "Life-threatening causes of tachypnea (PE, MI, hypoxia, acidosis) before assuming psychological",
      "Have patient breathe in paper bag",
      "Tell patient to calm down"
    ],
    correctAnswer: 1,
    explanation: "Hyperventilation can be psychological OR medical emergency. Must rule out PE, MI, diabetic ketoacidosis, asthma, pneumonia, etc. Check vitals, SpO2, glucose, cardiac history. Never use paper bag (can cause hypoxia).",
    category: "scenario",
    difficulty: "hard",
    tags: ["hyperventilation", "tachypnea", "respiratory alkalosis", "differential diagnosis"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Distress Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];
