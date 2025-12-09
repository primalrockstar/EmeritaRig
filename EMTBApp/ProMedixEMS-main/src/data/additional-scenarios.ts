// Additional Scenario-Based Questions - Batch 1
// Adding more medically accurate scenarios across all domains

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalRespiratoryScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-resp-009",
    module: 7,
    chapter: 15,
    scenario: "A 50-year-old male with emphysema complains of worsening shortness of breath over 3 days. He has a productive cough with green sputum, fever of 101.5°F, and diminished breath sounds on the right side. SpO2 89%.",
    question: "This presentation suggests:",
    options: [
      "Normal COPD exacerbation",
      "Pneumonia with possible pleural effusion",
      "Asthma attack",
      "Pulmonary embolism"
    ],
    correctAnswer: 1,
    explanation: "Fever, productive cough with colored sputum, and diminished breath sounds on one side suggest pneumonia, possibly with pleural effusion. High-flow oxygen and transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pneumonia", "COPD", "pleural effusion", "infection"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Respiratory Infection Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-resp-010",
    module: 7,
    chapter: 15,
    scenario: "A 4-year-old child is in severe respiratory distress with high fever (104°F), drooling, and sitting in tripod position. The child is unable to speak and appears anxious. Parents state symptoms started suddenly 2 hours ago.",
    question: "Based on these findings, you should suspect:",
    options: [
      "Croup",
      "Asthma attack",
      "Epiglottitis",
      "Foreign body airway obstruction"
    ],
    correctAnswer: 2,
    explanation: "High fever, drooling, tripod position, and sudden onset suggest epiglottitis. Do not examine throat, keep child calm, position of comfort, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["epiglottitis", "pediatric", "airway emergency", "tripod position"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Airway Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-resp-011",
    module: 7,
    chapter: 15,
    scenario: "You're called to a factory where a worker was exposed to chlorine gas after a chemical spill. The patient is coughing, has difficulty breathing, and burning eyes. Other workers also report symptoms.",
    question: "What is your priority action?",
    options: [
      "Immediately enter and begin treatment",
      "Ensure scene safety and request hazmat team",
      "Have patient walk out to meet you",
      "Ventilate the area first"
    ],
    correctAnswer: 1,
    explanation: "Chemical exposure with multiple patients requires scene safety first. Request hazmat team and wait for scene to be declared safe before entry.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hazmat", "chemical exposure", "scene safety", "chlorine"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Hazmat Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalTraumaScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-trauma-chest-001",
    module: 8,
    chapter: 26,
    scenario: "A 28-year-old was stabbed in the right chest. You note a sucking chest wound with bubbling blood. Patient is in severe distress with decreased breath sounds on the right side.",
    question: "What is your immediate treatment?",
    options: [
      "Apply occlusive dressing taped on all four sides",
      "Apply occlusive dressing taped on three sides",
      "Pack wound with gauze",
      "Leave wound open to allow air escape"
    ],
    correctAnswer: 1,
    explanation: "Sucking chest wound requires occlusive dressing taped on three sides to create flutter-valve effect, preventing air entry while allowing escape.",
    category: "scenario",
    difficulty: "hard",
    tags: ["penetrating trauma", "chest wound", "occlusive dressing"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Penetrating Chest Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-extremity-001",
    module: 8,
    chapter: 27,
    scenario: "A 16-year-old soccer player has an obviously deformed ankle after landing awkwardly. Distal pulse is absent and the foot appears pale and cool compared to the other side.",
    question: "What should you do?",
    options: [
      "Splint in position found",
      "Attempt one gentle realignment and reassess pulse",
      "Apply ice and wait for ALS",
      "Transport immediately without splinting"
    ],
    correctAnswer: 1,
    explanation: "Absent distal pulse after extremity injury indicates compromised circulation. One gentle attempt to realign to restore pulse is indicated, then splint and reassess.",
    category: "scenario",
    difficulty: "hard",
    tags: ["extremity trauma", "vascular compromise", "splinting"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Musculoskeletal Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-bleeding-001",
    module: 8,
    chapter: 23,
    scenario: "A patient has severe arterial bleeding from a leg wound following an industrial accident. Direct pressure is not controlling the hemorrhage and you can't locate the pressure point.",
    question: "What is your next intervention?",
    options: [
      "Continue direct pressure only",
      "Apply tourniquet 2-3 inches above wound",
      "Elevate extremity and apply ice",
      "Wait for ALS arrival"
    ],
    correctAnswer: 1,
    explanation: "Life-threatening extremity hemorrhage not controlled by direct pressure requires tourniquet application 2-3 inches above wound. Note time of application.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hemorrhage control", "tourniquet", "arterial bleeding"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Hemorrhage Control Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-head-003",
    module: 8,
    chapter: 25,
    scenario: "A 45-year-old fell off a ladder and struck his head. He was unconscious for approximately 2 minutes but is now awake and answering questions appropriately. He refuses transport.",
    question: "What should you do?",
    options: [
      "If he's alert, let him sign refusal",
      "Strongly encourage transport explaining risk of delayed complications",
      "Force transport against his will",
      "Have him see his personal doctor tomorrow"
    ],
    correctAnswer: 1,
    explanation: "Loss of consciousness after head trauma requires medical evaluation due to risk of intracranial bleeding. Strongly encourage transport and document thoroughly if refused.",
    category: "scenario",
    difficulty: "medium",
    tags: ["head trauma", "LOC", "refusal", "patient education"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Head Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-burn-001",
    module: 8,
    chapter: 28,
    scenario: "A 30-year-old was cooking when hot grease spilled on her arm. The burn covers her entire forearm with blisters forming. She is in significant pain but vitals are stable.",
    question: "What percentage of body surface area is affected using the rule of nines for an adult?",
    options: [
      "4.5%",
      "9%",
      "18%",
      "1%"
    ],
    correctAnswer: 0,
    explanation: "Using rule of nines, entire arm is 9%. Forearm only is approximately half of that, or 4.5%. This is considered a moderate burn requiring evaluation.",
    category: "scenario",
    difficulty: "medium",
    tags: ["burns", "rule of nines", "BSA calculation"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Burn Management Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-shock-001",
    module: 8,
    chapter: 24,
    scenario: "A 22-year-old male was in a high-speed MVC. He is pale, cool, and diaphoretic. BP 80/40, P 130 weak, R 28. No obvious external bleeding but abdomen is distended and rigid.",
    question: "This patient is most likely experiencing:",
    options: [
      "Spinal shock from back injury",
      "Cardiogenic shock from cardiac contusion",
      "Hypovolemic shock from internal bleeding",
      "Neurogenic shock from head injury"
    ],
    correctAnswer: 2,
    explanation: "Hypotension, tachycardia, and distended rigid abdomen after trauma suggest internal abdominal bleeding. Rapid transport to trauma center indicated.",
    category: "scenario",
    difficulty: "hard",
    tags: ["hypovolemic shock", "internal bleeding", "abdominal trauma"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Shock Management Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalPediatricScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ped-resp-001",
    module: 9,
    chapter: 30,
    scenario: "A 2-year-old has been sick with cold symptoms for 3 days. Parents called 911 because the child woke up with difficulty breathing, nasal flaring, and intercostal retractions. RR 60, SpO2 91%.",
    question: "These findings are most consistent with:",
    options: [
      "Simple cold that will resolve",
      "Bronchiolitis requiring oxygen and transport",
      "Asthma attack",
      "Pneumonia"
    ],
    correctAnswer: 1,
    explanation: "Toddler with URI symptoms progressing to respiratory distress with retractions and hypoxia suggests bronchiolitis. Oxygen, position of comfort, transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["bronchiolitis", "pediatric respiratory", "retractions"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Respiratory Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-seizure-001",
    module: 9,
    chapter: 30,
    scenario: "Parents report their 18-month-old had a seizure lasting about 2 minutes that just stopped. Child is now sleepy but breathing normally. Temp is 103.5°F rectally. No previous seizure history.",
    question: "This is most likely:",
    options: [
      "Epilepsy",
      "Febrile seizure",
      "Head injury",
      "Poisoning"
    ],
    correctAnswer: 1,
    explanation: "Brief seizure in young child with high fever and no seizure history suggests febrile seizure. Cool child gradually, provide oxygen, transport for evaluation.",
    category: "scenario",
    difficulty: "medium",
    tags: ["febrile seizure", "pediatric", "hyperthermia"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Seizure Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-trauma-001",
    module: 9,
    chapter: 30,
    scenario: "A 5-year-old was struck by a car while crossing the street. The child is conscious, crying, and has obvious deformity to the left femur. BP 80/40, P 160, RR 36.",
    question: "What does this blood pressure indicate in a 5-year-old?",
    options: [
      "Normal for age and situation",
      "Hypotension indicating significant blood loss",
      "Hypertension from pain",
      "Measurement error - recheck"
    ],
    correctAnswer: 1,
    explanation: "Normal systolic BP for ages 1-10 is approximately 70 + (2 x age). For 5yo: 80 minimum. BP 80/40 is hypotensive, indicating significant blood loss. Rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pediatric trauma", "hypotension", "shock", "vital signs"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ped-abuse-001",
    module: 9,
    chapter: 30,
    scenario: "You respond for a 3-year-old with a fractured arm. Parents state the child fell off a low couch. However, you note multiple bruises in various stages of healing on the back and buttocks, and the child appears fearful.",
    question: "What should you do?",
    options: [
      "Confront the parents about your suspicions",
      "Treat injuries, transport, and report suspicions to ED staff and appropriate authorities",
      "Ignore concerns and just treat medical issues",
      "Take the child without parental consent"
    ],
    correctAnswer: 1,
    explanation: "EMTs are mandated reporters. Document findings objectively, provide care, transport, and report suspicions to hospital and authorities per protocol.",
    category: "scenario",
    difficulty: "medium",
    tags: ["child abuse", "mandated reporter", "documentation"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Child Abuse Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalObstetricScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ob-labor-001",
    module: 9,
    chapter: 31,
    scenario: "A 26-year-old woman in active labor states she feels pressure and needs to push. This is her third baby. Contractions are 1 minute apart. You see crowning.",
    question: "What should you do?",
    options: [
      "Transport immediately - don't allow pushing",
      "Prepare for imminent delivery on scene",
      "Have her hold her legs together during transport",
      "Wait for ALS to arrive"
    ],
    correctAnswer: 1,
    explanation: "Crowning indicates imminent delivery. Prepare sterile field, support head, guide delivery. Transport after delivery if uncomplicated.",
    category: "scenario",
    difficulty: "medium",
    tags: ["imminent delivery", "crowning", "childbirth"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Emergency Childbirth Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ob-hemorrhage-001",
    module: 9,
    chapter: 31,
    scenario: "You assisted with delivery 10 minutes ago. The placenta has delivered, but the mother is experiencing heavy vaginal bleeding, soaking multiple pads. She appears pale and dizzy.",
    question: "What is your treatment priority?",
    options: [
      "Massage uterine fundus, treat for shock, rapid transport",
      "Pack vagina with trauma dressings",
      "Have mother stand and walk",
      "Wait - bleeding is normal after delivery"
    ],
    correctAnswer: 0,
    explanation: "Postpartum hemorrhage requires fundal massage to promote uterine contraction, high-flow oxygen, treat for shock, rapid transport. Never pack vagina.",
    category: "scenario",
    difficulty: "hard",
    tags: ["postpartum hemorrhage", "obstetric emergency", "fundal massage"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Obstetric Hemorrhage Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-breech-001",
    module: 9,
    chapter: 31,
    scenario: "During delivery, you notice the baby's buttocks presenting first instead of the head. Mother is pushing and delivery appears imminent.",
    question: "What should you do?",
    options: [
      "Proceed with delivery - support body and allow head to deliver",
      "Push baby back and transport",
      "Pull on visible body parts to speed delivery",
      "Have mother stop pushing completely"
    ],
    correctAnswer: 0,
    explanation: "Breech delivery: support body as it delivers, keep body warm, maintain airway for head delivery. Do not pull. Be prepared for complications.",
    category: "scenario",
    difficulty: "hard",
    tags: ["breech delivery", "complicated birth", "obstetric"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Complicated Delivery Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-preeclampsia-001",
    module: 9,
    chapter: 31,
    scenario: "A 32-year-old woman at 36 weeks pregnancy complains of severe headache, visual disturbances, and upper abdominal pain. BP 170/110, significant edema noted in hands and feet.",
    question: "These findings suggest:",
    options: [
      "Normal pregnancy symptoms",
      "Preeclampsia/eclampsia",
      "Migraine headache",
      "Dehydration"
    ],
    correctAnswer: 1,
    explanation: "Hypertension, headache, visual changes, and edema in pregnancy suggest preeclampsia. High risk for seizures. Dim lights, minimize stimulation, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["preeclampsia", "hypertensive emergency", "pregnancy complications"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Hypertensive Disorders of Pregnancy Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ob-ectopic-001",
    module: 9,
    chapter: 31,
    scenario: "A 28-year-old female with missed period and positive pregnancy test has severe lower abdominal pain on the right side and vaginal spotting. She appears pale, BP 90/60, P 110.",
    question: "You should suspect:",
    options: [
      "Normal early pregnancy",
      "Ectopic pregnancy",
      "Miscarriage only",
      "Urinary tract infection"
    ],
    correctAnswer: 1,
    explanation: "One-sided abdominal pain, vaginal bleeding, and signs of shock in early pregnancy suggest ectopic pregnancy. Treat for shock, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["ectopic pregnancy", "abdominal pain", "shock"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Gynecologic Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalGeriatricScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ger-falls-001",
    module: 9,
    chapter: 32,
    scenario: "An 82-year-old female fell at home and was on the floor for 6 hours before being found. She is confused, has cool skin, and weak pulse. Temp 94.8°F, BP 100/60, P 90 irregular.",
    question: "In addition to fall injuries, you should suspect:",
    options: [
      "Nothing else - focus only on injuries",
      "Hypothermia and dehydration",
      "Heat exhaustion",
      "Stroke"
    ],
    correctAnswer: 1,
    explanation: "Prolonged down time can cause hypothermia and dehydration in elderly. Remove wet clothing, cover with blankets, warm environment, assess for injuries.",
    category: "scenario",
    difficulty: "medium",
    tags: ["geriatric", "hypothermia", "falls", "dehydration"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Geriatric Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ger-polypharmacy-001",
    module: 9,
    chapter: 32,
    scenario: "A 78-year-old male is confused and weak. Family shows you 15 different prescription bottles. They state he sometimes gets confused about which pills to take when.",
    question: "What should you do with the medications?",
    options: [
      "Leave them - only transport patient",
      "Bring all medications to hospital for review",
      "Discard old medications",
      "Tell family to organize them better"
    ],
    correctAnswer: 1,
    explanation: "Bring all medications to hospital. Polypharmacy is common in elderly and can cause interactions, overdose, or noncompliance issues requiring medical review.",
    category: "scenario",
    difficulty: "medium",
    tags: ["geriatric", "polypharmacy", "medication", "confusion"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Geriatric Patient Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ger-hip-001",
    module: 9,
    chapter: 32,
    scenario: "An 85-year-old female fell and cannot get up. She has severe hip pain, and the affected leg appears shortened and externally rotated. Distal pulse present.",
    question: "This presentation is most consistent with:",
    options: [
      "Muscle strain",
      "Hip fracture",
      "Knee injury",
      "Back injury"
    ],
    correctAnswer: 1,
    explanation: "Shortened, externally rotated leg after fall in elderly suggests hip fracture. Immobilize in position found, provide analgesia per protocol, gentle transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["geriatric", "hip fracture", "falls", "musculoskeletal"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Musculoskeletal Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalNeurologicalScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-neuro-stroke-001",
    module: 7,
    chapter: 16,
    scenario: "A 68-year-old male has sudden onset right-sided weakness and slurred speech that started 45 minutes ago per family. He is alert but frustrated. BP 180/95, P 88, glucose 110 mg/dL.",
    question: "What is your priority action?",
    options: [
      "Perform detailed neurological exam",
      "Note exact time of onset and provide rapid transport to stroke center",
      "Wait to see if symptoms improve",
      "Give aspirin for suspected stroke"
    ],
    correctAnswer: 1,
    explanation: "Stroke symptoms require noting exact onset time (for thrombolytic eligibility) and rapid transport to stroke center. Time is brain tissue.",
    category: "scenario",
    difficulty: "medium",
    tags: ["stroke", "CVA", "neurological emergency", "time-critical"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Stroke Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-neuro-seizure-001",
    module: 7,
    chapter: 16,
    scenario: "You arrive to find a patient having a generalized tonic-clonic seizure that has been ongoing for 6 minutes according to family. The patient is cyanotic with labored breathing.",
    question: "What is your immediate concern?",
    options: [
      "Restrain patient to prevent injury",
      "Insert oral airway during seizure",
      "Status epilepticus - protect airway, prepare to assist ventilations",
      "Give oral glucose"
    ],
    correctAnswer: 2,
    explanation: "Seizure >5 minutes is status epilepticus, a medical emergency. Protect from injury, maintain airway, suction as needed, prepare to assist ventilations, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["status epilepticus", "seizure", "airway management"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Seizure Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-neuro-syncope-001",
    module: 7,
    chapter: 16,
    scenario: "A 45-year-old female fainted at church while standing during a long service. She is now awake and alert, slightly embarrassed. Vitals are normal. She states she missed breakfast.",
    question: "This is most consistent with:",
    options: [
      "Cardiac arrest",
      "Vasovagal syncope",
      "Stroke",
      "Seizure"
    ],
    correctAnswer: 1,
    explanation: "Syncope while standing for prolonged period, especially if hungry, suggests vasovagal syncope. Still requires assessment and transport for evaluation of underlying causes.",
    category: "scenario",
    difficulty: "medium",
    tags: ["syncope", "vasovagal", "fainting"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Altered Mental Status Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-neuro-headache-001",
    module: 7,
    chapter: 16,
    scenario: "A 52-year-old complains of the worst headache of her life that came on suddenly while exercising. She also has neck stiffness and photophobia. BP 170/100.",
    question: "These symptoms are concerning for:",
    options: [
      "Migraine headache",
      "Subarachnoid hemorrhage",
      "Tension headache",
      "Dehydration"
    ],
    correctAnswer: 1,
    explanation: "Sudden severe 'worst headache of life' with neck stiffness suggests subarachnoid hemorrhage. Dim lights, minimal stimulation, head elevated if no spinal concern, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["subarachnoid hemorrhage", "headache", "neurological emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Neurological Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalEnvironmentalScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-env-heat-001",
    module: 7,
    chapter: 20,
    scenario: "A marathon runner collapsed at mile 20 on a hot day (95°F). Patient is confused, hot and dry skin, temp 106°F. BP 90/60, P 120.",
    question: "This patient is experiencing:",
    options: [
      "Heat exhaustion",
      "Heat stroke",
      "Heat cramps",
      "Dehydration only"
    ],
    correctAnswer: 1,
    explanation: "Hot dry skin, altered mental status, and hyperthermia >104°F indicates heat stroke, a life-threatening emergency. Aggressive cooling, treat for shock, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["heat stroke", "hyperthermia", "environmental emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Environmental Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-cold-001",
    module: 7,
    chapter: 20,
    scenario: "A homeless patient found outside in 20°F weather is confused and shivering uncontrollably. Temp 92°F, BP 100/70, P 100. Fingers appear waxy and white.",
    question: "What conditions does this patient have?",
    options: [
      "Hypothermia only",
      "Frostbite only",
      "Both hypothermia and frostbite",
      "Neither - just cold"
    ],
    correctAnswer: 2,
    explanation: "Temp <95°F is hypothermia; waxy white extremities indicate frostbite. Remove wet clothing, passive rewarming, handle gently, don't rub frostbitten areas.",
    category: "scenario",
    difficulty: "medium",
    tags: ["hypothermia", "frostbite", "cold emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cold Injury Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-env-drowning-001",
    module: 8,
    chapter: 29,
    scenario: "A 12-year-old was pulled from a pool by lifeguards. Patient is unconscious, not breathing, but has a weak pulse. Water is draining from mouth.",
    question: "What is your immediate action?",
    options: [
      "Perform abdominal thrusts to clear water",
      "Start CPR immediately",
      "Open airway, suction if needed, begin rescue breathing",
      "Wait for water to drain completely"
    ],
    correctAnswer: 2,
    explanation: "Drowning victim with pulse but no breathing needs airway management and rescue breathing. Don't delay for water removal - small amount won't prevent ventilation.",
    category: "scenario",
    difficulty: "hard",
    tags: ["drowning", "rescue breathing", "submersion"],
    nremtDomain: "Special Situations",
    nationalProtocolAlignment: "NHTSA 2022 - Drowning Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-lightning-001",
    module: 7,
    chapter: 20,
    scenario: "Multiple victims were struck by lightning at a golf course. Triage shows: Patient A - deceased, no pulse; Patient B - conscious with burns; Patient C - unconscious but breathing.",
    question: "In lightning strike scenario with limited resources, who gets priority?",
    options: [
      "Patient A - appears dead but may respond to CPR",
      "Patient B - conscious and in pain",
      "Patient C - unconscious",
      "Evacuate all equally"
    ],
    correctAnswer: 0,
    explanation: "Lightning strike reverses normal triage - treat 'dead' first as they may respond to CPR. Conscious patients will likely survive. This is exception to START triage.",
    category: "scenario",
    difficulty: "hard",
    tags: ["lightning", "reverse triage", "MCI"],
    nremtDomain: "Operations",
    nationalProtocolAlignment: "NHTSA 2022 - Mass Casualty Incident Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  }
];

export const additionalToxicologyScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-tox-opioid-001",
    module: 7,
    chapter: 19,
    scenario: "A 24-year-old is found unconscious with respiratory rate of 6, pinpoint pupils, and needle marks on arms. Bystanders report suspected heroin use.",
    question: "What is indicated if available per local protocol?",
    options: [
      "Stimulate patient to wake up",
      "Assist ventilations and administer naloxone per protocol",
      "Oral glucose",
      "Activated charcoal"
    ],
    correctAnswer: 1,
    explanation: "Suspected opioid overdose with respiratory depression requires assisted ventilations and naloxone administration per local protocol. Support airway first.",
    category: "scenario",
    difficulty: "medium",
    tags: ["opioid overdose", "naloxone", "overdose", "narcan"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Overdose Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-tox-alcohol-001",
    module: 7,
    chapter: 19,
    scenario: "A 19-year-old at a party is extremely intoxicated, vomiting, and barely responsive. Friends state he drank large amounts in short time. RR 8, SpO2 90%.",
    question: "What is your concern?",
    options: [
      "Let him sleep it off",
      "Alcohol poisoning with risk of respiratory failure and aspiration",
      "Normal college drinking behavior",
      "Just monitor - no treatment needed"
    ],
    correctAnswer: 1,
    explanation: "Severe alcohol intoxication with decreased responsiveness and slow RR indicates alcohol poisoning. Risk of aspiration and respiratory failure. Position to protect airway, consider assisted ventilations, transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["alcohol poisoning", "intoxication", "aspiration risk"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Poisoning Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
