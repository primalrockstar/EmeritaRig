// Additional Scenario-Based Questions - Batch 4
// Comprehensive EMT-B domain coverage
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalTraumaScenarios3: EnhancedQuizQuestion[] = [
  {
    id: "scenario-trauma-spine-001",
    module: 8,
    chapter: 25,
    scenario: "A 25-year-old fell 8 feet from a ladder onto concrete. He is ambulatory at scene, walking around, complaining only of lower back pain. No other injuries noted.",
    question: "What spinal precautions are indicated?",
    options: [
      "None - patient is ambulatory",
      "Full spinal immobilization based on mechanism",
      "Collar only",
      "Patient can refuse since walking"
    ],
    correctAnswer: 1,
    explanation: "Significant mechanism (>6 feet fall) with back pain indicates spinal precautions despite ambulation. Patients with spinal injuries can initially walk.",
    category: "scenario",
    difficulty: "medium",
    tags: ["spinal injury", "mechanism of injury", "immobilization"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Spinal Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-pelvis-001",
    module: 8,
    chapter: 27,
    scenario: "A pedestrian struck by car has pelvic instability noted during assessment. BP 90/60, P 120, cool/pale skin. Patient is conscious.",
    question: "What is your primary concern?",
    options: [
      "Pain management",
      "Life-threatening internal hemorrhage",
      "Urinary retention",
      "Hip dislocation"
    ],
    correctAnswer: 1,
    explanation: "Pelvic fracture with shock signs indicates major internal bleeding. Stabilize pelvis with binder/sheet, treat for shock, rapid transport to trauma center.",
    category: "scenario",
    difficulty: "hard",
    tags: ["pelvic fracture", "internal bleeding", "shock", "trauma"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Musculoskeletal Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-abdominal-001",
    module: 8,
    chapter: 26,
    scenario: "A stabbing victim has a knife still impaled in the left upper abdomen. Patient is alert, BP 110/70, P 100, breathing normally.",
    question: "How should you manage the impaled object?",
    options: [
      "Remove knife to control bleeding",
      "Stabilize knife in place with bulky dressings",
      "Remove if <3 inches deep",
      "Push knife in further to seal wound"
    ],
    correctAnswer: 1,
    explanation: "Never remove impaled objects in field - stabilize in place with bulky dressings. Removal can worsen bleeding and damage. Only exception: impaled in cheek obstructing airway.",
    category: "scenario",
    difficulty: "medium",
    tags: ["impaled object", "penetrating trauma", "abdominal injury"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Penetrating Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-crush-001",
    module: 8,
    chapter: 27,
    scenario: "A construction worker had his leg trapped under heavy machinery for 45 minutes. Rescue is about to lift the machinery. Patient is conscious, BP 120/80, P 90.",
    question: "What should you anticipate after the crushing weight is removed?",
    options: [
      "Immediate improvement",
      "Potential crush syndrome with sudden deterioration",
      "No change expected",
      "Immediate bleeding only"
    ],
    correctAnswer: 1,
    explanation: "Crush syndrome: After prolonged crushing, release causes toxins/potassium to flood circulation causing dysrhythmias, shock, kidney failure. Prepare for rapid deterioration, aggressive treatment.",
    category: "scenario",
    difficulty: "hard",
    tags: ["crush syndrome", "compartment syndrome", "prolonged extrication"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Crush Injury Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-facial-001",
    module: 8,
    chapter: 25,
    scenario: "An assault victim has severe facial trauma with bleeding into the mouth. Patient is conscious but having difficulty breathing and swallowing blood.",
    question: "What is your airway management priority?",
    options: [
      "Lay patient flat and suction",
      "Position sitting up or on side, aggressive suctioning",
      "Insert OPA immediately",
      "Apply oxygen mask"
    ],
    correctAnswer: 1,
    explanation: "Facial trauma with bleeding requires upright or lateral positioning to prevent aspiration, aggressive suctioning, airway monitoring. Be prepared for rapid deterioration.",
    category: "scenario",
    difficulty: "hard",
    tags: ["facial trauma", "airway emergency", "bleeding", "aspiration"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Facial Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-open-fracture-001",
    module: 8,
    chapter: 27,
    scenario: "A motorcyclist has an open tibia fracture with bone protruding through skin. Distal pulse is present. Wound is contaminated with road debris.",
    question: "How should you manage this wound?",
    options: [
      "Push bone back in and dress wound",
      "Cover with sterile dressing, splint in position found, irrigate if allowed by protocol",
      "Clean wound thoroughly before splinting",
      "Apply tourniquet above fracture"
    ],
    correctAnswer: 1,
    explanation: "Open fracture: Cover with sterile dressing (moist if bone exposed), splint in position found, don't push bone back in. Control bleeding with direct pressure, not tourniquet unless necessary.",
    category: "scenario",
    difficulty: "medium",
    tags: ["open fracture", "bone exposure", "wound care", "splinting"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Musculoskeletal Trauma Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-head-concussion-001",
    module: 8,
    chapter: 25,
    scenario: "A football player was 'knocked out' for about 30 seconds. Now awake, denies loss of consciousness, wants to return to game. GCS 15, pupils equal, no other injuries.",
    question: "What should you recommend?",
    options: [
      "Allow return to play - patient is fine now",
      "Strongly encourage medical evaluation - LOC requires assessment",
      "Monitor on sideline for 10 minutes then allow return",
      "No evaluation needed if GCS is 15"
    ],
    correctAnswer: 1,
    explanation: "Any loss of consciousness after head trauma requires medical evaluation for concussion and potential intracranial injury. Symptoms can worsen hours later. No return to play.",
    category: "scenario",
    difficulty: "medium",
    tags: ["concussion", "head injury", "sports injury", "LOC"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Head Injury Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalCardiacScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-cardiac-defibrillation-001",
    module: 7,
    chapter: 13,
    scenario: "During CPR, your AED analyzes and advises 'shock advised.' You deliver shock. What rhythm was most likely present?",
    question: "Which rhythm is shockable by AED?",
    options: [
      "Asystole (flatline)",
      "Ventricular fibrillation or pulseless ventricular tachycardia",
      "PEA (pulseless electrical activity)",
      "Normal sinus rhythm"
    ],
    correctAnswer: 1,
    explanation: "AEDs shock only VF (ventricular fibrillation) and pulseless VT (ventricular tachycardia). Asystole and PEA are non-shockable rhythms requiring only CPR.",
    category: "scenario",
    difficulty: "medium",
    tags: ["AED", "shockable rhythms", "VF", "VT"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Arrest Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-lvad-001",
    module: 7,
    chapter: 13,
    scenario: "You respond to a 'cardiac arrest.' Patient is unresponsive, not breathing, but you cannot find a pulse. Family states patient has an LVAD (Left Ventricular Assist Device).",
    question: "What should you do?",
    options: [
      "Start CPR immediately - no pulse means cardiac arrest",
      "Check for LVAD function (hum/vibration), blood pressure - may not have palpable pulse",
      "Do not treat - LVAD patients cannot be resuscitated",
      "Defibrillate immediately"
    ],
    correctAnswer: 1,
    explanation: "LVAD patients may not have palpable pulse but can have adequate perfusion. Check for LVAD hum, blood pressure, consciousness. If truly pulseless/apneic, follow cardiac arrest protocol.",
    category: "scenario",
    difficulty: "hard",
    tags: ["LVAD", "cardiac device", "special situations", "pulse assessment"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Special Cardiac Situations Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-cardiac-witnessed-arrest-001",
    module: 7,
    chapter: 13,
    scenario: "You witness a patient suddenly collapse in front of you. They are unresponsive and not breathing normally. You are alone with AED immediately available.",
    question: "What is your immediate action?",
    options: [
      "Leave to call for help",
      "Perform 5 cycles of CPR first",
      "Apply AED immediately and follow prompts",
      "Check for pulse for 30 seconds"
    ],
    correctAnswer: 2,
    explanation: "Witnessed sudden cardiac arrest in adult with AED available: immediately apply AED and follow prompts. Early defibrillation is critical for VF/VT survival.",
    category: "scenario",
    difficulty: "medium",
    tags: ["witnessed arrest", "early defibrillation", "AED", "sudden cardiac death"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Arrest Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-cpr-quality-001",
    module: 7,
    chapter: 13,
    scenario: "During CPR, your partner is compressing the chest but you notice compressions are only going down about 1 inch and rate is about 80/minute.",
    question: "What should you do?",
    options: [
      "Continue - this is adequate",
      "Coach partner: compress at least 2 inches deep, 100-120/min rate",
      "Take over immediately without saying anything",
      "Compressions don't matter much - just ventilate well"
    ],
    correctAnswer: 1,
    explanation: "High-quality CPR requires: depth 2-2.4 inches in adults, rate 100-120/min, full recoil, minimal interruptions. Coach partners on quality indicators.",
    category: "scenario",
    difficulty: "medium",
    tags: ["CPR quality", "compression depth", "rate", "teamwork"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - High-Quality CPR Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-rosc-001",
    module: 7,
    chapter: 13,
    scenario: "After 6 minutes of CPR and one shock, patient suddenly has strong carotid pulse, begins breathing, and opens eyes. What has occurred?",
    question: "This indicates:",
    options: [
      "Agonal respirations - continue CPR",
      "Return of Spontaneous Circulation (ROSC)",
      "Temporary improvement - shock again",
      "Patient was not in arrest"
    ],
    correctAnswer: 1,
    explanation: "ROSC (Return of Spontaneous Circulation): pulse returns, breathing resumes, possibly consciousness. Stop compressions, provide supportive care, high-flow O2, monitor closely, rapid transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["ROSC", "post-cardiac arrest", "resuscitation"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Post-Resuscitation Care Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalPediatricScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-ped-assessment-001",
    module: 9,
    chapter: 30,
    scenario: "A 2-year-old has been crying for 30 minutes per parents. Child is alert, strong cry, pink color, breathing normally. Parents are very anxious.",
    question: "Using the Pediatric Assessment Triangle, this child is:",
    options: [
      "Critically ill requiring immediate intervention",
      "Stable with no immediate life threats",
      "In respiratory distress",
      "In shock"
    ],
    correctAnswer: 1,
    explanation: "PAT (Pediatric Assessment Triangle): Appearance (alert, strong cry), Work of Breathing (normal), Circulation (pink color) all normal. Child is stable. Reassure parents, assess thoroughly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pediatric assessment", "PAT", "appearance"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-cpr-001",
    module: 9,
    chapter: 30,
    scenario: "You find a 6-month-old infant unresponsive and not breathing. You are alone. What should you do first?",
    question: "What is your first action?",
    options: [
      "Leave to activate EMS",
      "Perform 2 minutes (5 cycles) of CPR, then activate EMS",
      "Check for pulse for 30 seconds",
      "Apply AED immediately"
    ],
    correctAnswer: 1,
    explanation: "Unwitnessed pediatric/infant arrest when alone: perform 2 minutes CPR first (oxygen is critical), then activate EMS. Different than adult (call first).",
    category: "scenario",
    difficulty: "hard",
    tags: ["infant CPR", "sequence", "lone rescuer"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Resuscitation Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ped-dehydration-001",
    module: 9,
    chapter: 30,
    scenario: "A 3-year-old has had vomiting and diarrhea for 2 days. Child is lethargic, sunken eyes, dry mucous membranes, skin tenting present. HR 150, RR 30.",
    question: "These findings indicate:",
    options: [
      "Mild dehydration",
      "Moderate to severe dehydration",
      "Normal for viral illness",
      "Septic shock"
    ],
    correctAnswer: 1,
    explanation: "Signs of moderate-severe dehydration in children: lethargy, sunken eyes, dry mucous membranes, decreased skin turgor (tenting), tachycardia. Requires rapid transport, may need IV fluids.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pediatric dehydration", "hypovolemia", "assessment"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Medical Emergencies Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-foreign-body-001",
    module: 9,
    chapter: 30,
    scenario: "A 10-month-old suddenly began choking during feeding. Infant cannot cry, is making high-pitched sounds, and appears panicked. Weak cough present.",
    question: "What is your immediate intervention?",
    options: [
      "Encourage continued coughing",
      "Back slaps and chest thrusts",
      "Abdominal thrusts",
      "Finger sweep"
    ],
    correctAnswer: 1,
    explanation: "Severe airway obstruction in infant (<1 year): alternate 5 back slaps with 5 chest thrusts. No abdominal thrusts in infants. No blind finger sweeps.",
    category: "scenario",
    difficulty: "medium",
    tags: ["infant choking", "FBAO", "emergency airway"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Airway Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-ped-shaken-baby-001",
    module: 9,
    chapter: 30,
    scenario: "A 4-month-old is unresponsive with no obvious trauma. Parents state baby 'just got sleepy.' You note retinal hemorrhages during assessment and bruising on upper arms.",
    question: "You should suspect:",
    options: [
      "SIDS",
      "Non-accidental trauma (shaken baby syndrome)",
      "Viral infection",
      "Normal infant behavior"
    ],
    correctAnswer: 1,
    explanation: "Shaken baby syndrome: retinal hemorrhages, altered consciousness, no external trauma or inconsistent history, bruising from grabbing. Mandated reporter - document objectively, report to authorities.",
    category: "scenario",
    difficulty: "hard",
    tags: ["child abuse", "shaken baby", "non-accidental trauma", "mandated reporting"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Child Abuse Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-ped-vital-signs-001",
    module: 9,
    chapter: 30,
    scenario: "A 2-year-old has respiratory infection. Vitals: HR 140, RR 32, BP 90/60, Temp 101°F. Parents are concerned about 'high heart rate.'",
    question: "Are these vital signs concerning for a 2-year-old?",
    options: [
      "Yes - tachycardia indicates shock",
      "Normal for age with fever",
      "Bradycardia is present",
      "Severe hypertension"
    ],
    correctAnswer: 1,
    explanation: "Pediatric vital signs vary by age. 2-year-old normal: HR 80-140, RR 20-30, BP ~90/60. These vitals are within normal limits, slightly elevated with fever. Know age-appropriate normals.",
    category: "scenario",
    difficulty: "medium",
    tags: ["pediatric vital signs", "normal values", "fever"],
    nremtDomain: "Special Patient Populations",
    nationalProtocolAlignment: "NHTSA 2022 - Pediatric Assessment Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalEnvironmentalScenarios2: EnhancedQuizQuestion[] = [
  {
    id: "scenario-env-heat-exhaustion-001",
    module: 7,
    chapter: 20,
    scenario: "A construction worker on hot day (95°F) has heavy sweating, weakness, nausea, and headache. Temp 100.5°F, skin cool and moist. Alert and oriented.",
    question: "This presentation is most consistent with:",
    options: [
      "Heat stroke",
      "Heat exhaustion",
      "Heat cramps only",
      "Dehydration only"
    ],
    correctAnswer: 1,
    explanation: "Heat exhaustion: heavy sweating, cool/moist skin, N/V, weakness, mild temp elevation, normal mental status. Move to cool area, oral fluids if able, monitor for progression to heat stroke.",
    category: "scenario",
    difficulty: "medium",
    tags: ["heat exhaustion", "environmental", "hyperthermia"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Heat Emergency Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-env-hypothermia-severe-001",
    module: 7,
    chapter: 20,
    scenario: "A homeless patient found outside in winter has core temp 85°F, is barely responsive, bradycardic at 40 bpm, and rigid. Appears 'frozen.'",
    question: "How should you handle this patient?",
    options: [
      "Rapid active rewarming with heat packs",
      "Gentle handling, passive rewarming, treat as if 'frozen solid'",
      "Vigorous rubbing to restore circulation",
      "CPR should not be attempted"
    ],
    correctAnswer: 1,
    explanation: "Severe hypothermia (<90°F): extremely gentle handling (rough movement can trigger VF), passive rewarming, remove wet clothes, insulate. 'Not dead until warm and dead.' No rough movement/rubbing.",
    category: "scenario",
    difficulty: "hard",
    tags: ["severe hypothermia", "gentle handling", "rewarming"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cold Injury Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-altitude-001",
    module: 7,
    chapter: 20,
    scenario: "A hiker at 11,000 feet elevation has severe headache, nausea, ataxia (stumbling), and appears confused. Symptoms started over past 6 hours.",
    question: "This presentation suggests:",
    options: [
      "Dehydration only",
      "High Altitude Cerebral Edema (HACE)",
      "Normal altitude adjustment",
      "Heat stroke"
    ],
    correctAnswer: 1,
    explanation: "HACE: severe headache, ataxia, altered mental status at altitude. Life-threatening. Immediate descent, high-flow oxygen, rapid transport. Can progress to coma and death.",
    category: "scenario",
    difficulty: "hard",
    tags: ["altitude sickness", "HACE", "mountain emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Environmental Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-env-snake-bite-001",
    module: 7,
    chapter: 20,
    scenario: "A patient was bitten by a snake on the leg during hiking. Bite site has two puncture marks with swelling and pain. Patient is anxious but vital signs stable.",
    question: "What is appropriate field treatment?",
    options: [
      "Apply tourniquet above bite",
      "Make incision and suck out venom",
      "Keep extremity immobilized below heart level, calm patient, rapid transport",
      "Apply ice directly to bite"
    ],
    correctAnswer: 2,
    explanation: "Snakebite: keep extremity still/below heart, remove jewelry, calm patient (activity spreads venom), rapid transport. NO tourniquet, cutting, sucking, or ice. Monitor for swelling progression.",
    category: "scenario",
    difficulty: "medium",
    tags: ["snake bite", "envenomation", "wilderness emergency"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Envenomation Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
