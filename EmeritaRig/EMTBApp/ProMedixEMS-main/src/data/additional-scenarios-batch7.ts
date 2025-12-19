// Additional Scenario-Based Questions - Batch 7
// Comprehensive EMT-B domain coverage focusing on high-yield topics
// NHTSA 2022 Protocol-Aligned

import { EnhancedQuizQuestion } from './enhanced-quiz-system';

export const additionalCardiacScenarios3: EnhancedQuizQuestion[] = [
  {
    id: "scenario-cardiac-aed-pacemaker-001",
    module: 7,
    chapter: 13,
    scenario: "A cardiac arrest patient has a pacemaker or ICD bulge visible on left upper chest. You are preparing to apply AED pads.",
    question: "How should you position the AED pads?",
    options: [
      "Place pads directly over device",
      "Place pads at least 1 inch away from device - can use anterior-posterior placement if needed",
      "Cannot use AED on pacemaker patients",
      "Remove pacemaker first"
    ],
    correctAnswer: 1,
    explanation: "Pacemakers/ICDs: place AED pads at least 1 inch from device. Can use anterior-posterior (front-back) placement. Device may deliver shock - stand clear. AED use is appropriate despite implanted device.",
    category: "scenario",
    difficulty: "medium",
    tags: ["AED", "pacemaker", "ICD", "pad placement"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Cardiac Arrest With Devices Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-aed-water-001",
    module: 7,
    chapter: 13,
    scenario: "A drowning victim has been pulled from pool and is in cardiac arrest. Patient's chest is wet. AED is ready to apply.",
    question: "What should you do before applying AED?",
    options: [
      "Apply AED directly - water doesn't matter",
      "Quickly dry chest, then apply AED pads",
      "Wait 10 minutes for patient to dry naturally",
      "Cannot use AED on wet patients"
    ],
    correctAnswer: 1,
    explanation: "Wet patient: quickly dry chest before AED pad application to ensure good contact and reduce arc risk. Don't delay excessively - rapid defibrillation is priority. Remove from standing water. Continue CPR while preparing AED.",
    category: "scenario",
    difficulty: "easy",
    tags: ["AED", "drowning", "wet patient", "special circumstances"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Drowning/Cardiac Arrest Protocol",
    emtScopeCompliant: true,
    points: 2,
    timeEstimate: 60
  },
  {
    id: "scenario-cardiac-aed-hairy-chest-001",
    module: 7,
    chapter: 13,
    scenario: "A cardiac arrest patient has a very hairy chest. You apply AED pads but they won't stick well and AED gives 'check electrode' message.",
    question: "What action is appropriate?",
    options: [
      "Press harder on pads",
      "If pads won't adhere and you have second set, use first set to quickly remove hair, then apply second set for analysis",
      "Shave entire chest carefully",
      "Skip AED use"
    ],
    correctAnswer: 1,
    explanation: "Excessive chest hair: if pads won't stick - quickly rip off first set (removes hair), apply new pads for analysis. Or use razor if immediately available. Don't delay defibrillation excessively - some systems just press firmly.",
    category: "scenario",
    difficulty: "medium",
    tags: ["AED", "pad adhesion", "chest hair", "troubleshooting"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - AED Application Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-cardiac-stemi-recognition-001",
    module: 7,
    chapter: 15,
    scenario: "A 60-year-old has crushing substernal chest pain for 40 minutes, radiating to left arm and jaw. Diaphoretic, nauseous. BP 130/85, P 100, RR 20. 12-lead EKG shows ST elevation in inferior leads.",
    question: "This presentation suggests:",
    options: [
      "Stable angina",
      "STEMI (ST-Elevation Myocardial Infarction) - requires immediate cath lab",
      "Anxiety attack",
      "GERD"
    ],
    correctAnswer: 1,
    explanation: "STEMI: ST elevation on 12-lead = acute MI with coronary occlusion needing emergent cath lab. Classic symptoms + EKG changes. Early recognition and rapid transport to PCI center critical. Time = muscle.",
    category: "scenario",
    difficulty: "hard",
    tags: ["STEMI", "12-lead EKG", "myocardial infarction", "chest pain"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - STEMI Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-cardiac-chf-001",
    module: 7,
    chapter: 15,
    scenario: "An elderly patient has severe dyspnea, is sitting bolt upright, has pink frothy sputum, crackles in all lung fields, and swollen ankles. JVD present. History of heart failure.",
    question: "This clinical picture represents:",
    options: [
      "Asthma",
      "Acute pulmonary edema/CHF exacerbation",
      "Pneumonia",
      "PE"
    ],
    correctAnswer: 1,
    explanation: "Acute pulmonary edema/CHF: pink frothy sputum (hallmark), orthopnea, crackles, JVD, edema. Heart failure causes fluid backup into lungs. High-flow O2, position upright, CPAP if available, rapid transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["CHF", "pulmonary edema", "heart failure", "respiratory distress"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - CHF/Pulmonary Edema Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalTraumaScenarios4: EnhancedQuizQuestion[] = [
  {
    id: "scenario-trauma-shock-assessment-001",
    module: 8,
    chapter: 24,
    scenario: "A trauma patient has cool/pale/clammy skin, weak rapid pulse 130, BP 90/60, altered mental status. No obvious external bleeding but has abdominal rigidity from MVC.",
    question: "These findings indicate:",
    options: [
      "Compensated shock likely from internal bleeding",
      "Normal response to trauma",
      "Decompensated shock",
      "Spinal shock only"
    ],
    correctAnswer: 0,
    explanation: "Compensated shock: body compensation maintains BP temporarily (90 systolic borderline), but shows cool skin, tachycardia, AMS. Internal abdominal bleeding likely. Rapid transport, treat for shock, high-flow O2, keep warm.",
    category: "scenario",
    difficulty: "hard",
    tags: ["shock assessment", "internal bleeding", "trauma", "hemodynamics"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Shock Management Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-golden-hour-001",
    module: 8,
    chapter: 24,
    scenario: "A critical trauma patient with penetrating chest wound needs rapid transport. Scene time is already 12 minutes. Partner wants to start full secondary assessment on scene.",
    question: "What is appropriate?",
    options: [
      "Complete full secondary on scene",
      "Load and go - perform detailed assessment en route, minimize scene time for critical trauma",
      "Wait for ALS",
      "Scene time doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "Critical trauma (penetrating torso, severe bleeding, shock, altered mental status): 'load and go' - minimize scene time (<10 min ideal), primary assessment, bleeding control, spinal precautions, rapid transport. Full assessment en route.",
    category: "scenario",
    difficulty: "medium",
    tags: ["golden hour", "load and go", "scene time", "trauma priority"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Trauma Triage Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-flail-chest-001",
    module: 8,
    chapter: 26,
    scenario: "A trauma patient has a segment of chest wall moving opposite to the rest of chest (paradoxical motion). Patient is in severe respiratory distress with decreased breath sounds on that side.",
    question: "This indicates:",
    options: [
      "Normal breathing effort",
      "Flail chest (multiple rib fractures) - high risk for pulmonary contusion",
      "Pneumothorax only",
      "Muscle spasm"
    ],
    correctAnswer: 1,
    explanation: "Flail segment: 2+ ribs broken in 2+ places = unstable segment with paradoxical motion. Often has underlying pulmonary contusion. High-flow O2, positive pressure if needed, position injured side down if tolerated, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["flail chest", "paradoxical motion", "rib fractures", "chest trauma"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Chest Trauma Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-sucking-chest-wound-001",
    module: 8,
    chapter: 26,
    scenario: "A patient has a puncture wound to chest that is making sucking sounds with breathing. You have occlusive dressings available.",
    question: "How should you dress this wound?",
    options: [
      "Pack wound with gauze",
      "Apply occlusive dressing taped on 3 sides (flutter valve) or commercial chest seal",
      "Leave open",
      "Tape all 4 sides completely sealed"
    ],
    correctAnswer: 1,
    explanation: "Open pneumothorax (sucking chest wound): cover with occlusive dressing - commercial chest seal preferred, or tape 3 sides (allows air out not in). Monitor for tension pneumothorax. Seal prevents air sucking in wound.",
    category: "scenario",
    difficulty: "medium",
    tags: ["open pneumothorax", "sucking chest wound", "occlusive dressing"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Open Chest Wound Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-tension-pneumo-001",
    module: 8,
    chapter: 26,
    scenario: "After sealing a chest wound, patient develops worsening respiratory distress, hypotension, JVD, and tracheal deviation. Breath sounds absent on injured side.",
    question: "You should suspect:",
    options: [
      "Normal progression",
      "Tension pneumothorax developing - may need to burp or remove dressing",
      "Heart attack",
      "Sealed wound is working well"
    ],
    correctAnswer: 1,
    explanation: "Tension pneumothorax: progressive air accumulation increases pressure - absent breath sounds, JVD, hypotension, tracheal deviation (late), severe distress. May need to briefly lift occlusive dressing to release pressure. Life-threatening.",
    category: "scenario",
    difficulty: "hard",
    tags: ["tension pneumothorax", "chest trauma", "decompensation"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Tension Pneumothorax Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-trauma-evisceration-001",
    module: 8,
    chapter: 26,
    scenario: "An assault victim has abdominal organs protruding through a large laceration. Organs are exposed to air.",
    question: "How should you manage the exposed organs?",
    options: [
      "Push organs back into abdomen",
      "Cover with moist sterile dressing, then occlusive dressing, do not push organs back in",
      "Leave uncovered",
      "Rinse with tap water"
    ],
    correctAnswer: 1,
    explanation: "Evisceration: do NOT push organs back in - cover with moist sterile dressing, then occlusive layer, keep warm. Position knees bent to reduce tension. High risk for infection and shock. Rapid transport.",
    category: "scenario",
    difficulty: "medium",
    tags: ["evisceration", "abdominal trauma", "organ exposure"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Abdominal Evisceration Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-trauma-traction-splint-001",
    module: 8,
    chapter: 27,
    scenario: "A patient has an isolated mid-shaft femur fracture with severe pain and muscle spasm. Distal pulses present. No other injuries noted.",
    question: "What splinting device is indicated?",
    options: [
      "Air splint",
      "Traction splint",
      "Rigid splint only",
      "No splint needed"
    ],
    correctAnswer: 1,
    explanation: "Mid-shaft femur fracture: traction splint indicated - reduces pain, bleeding, muscle spasm. Contraindications: hip/knee injury, pelvic fracture, partial amputation. Check distal PMS before and after application.",
    category: "scenario",
    difficulty: "medium",
    tags: ["traction splint", "femur fracture", "splinting"],
    nremtDomain: "Trauma",
    nationalProtocolAlignment: "NHTSA 2022 - Femur Fracture Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];

export const additionalMedicalEmergencyScenarios: EnhancedQuizQuestion[] = [
  {
    id: "scenario-med-diabetic-dka-001",
    module: 7,
    chapter: 16,
    scenario: "A known diabetic has blood glucose 450 mg/dL, is lethargic, has deep/rapid (Kussmaul) respirations, and fruity breath odor. Patient is dehydrated.",
    question: "This presentation suggests:",
    options: [
      "Hypoglycemia",
      "Diabetic ketoacidosis (DKA) - requires hospital treatment",
      "Normal for diabetics",
      "Give oral glucose"
    ],
    correctAnswer: 1,
    explanation: "DKA: very high glucose (>300), dehydration, Kussmaul respirations (fast/deep to blow off CO2), fruity breath (ketones), AMS. Common in Type 1. Can't fix in field - needs IV insulin/fluids. Supportive care, rapid transport.",
    category: "scenario",
    difficulty: "hard",
    tags: ["DKA", "diabetic emergency", "hyperglycemia", "Kussmaul"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Hyperglycemic Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-med-sickle-cell-crisis-001",
    module: 7,
    chapter: 15,
    scenario: "An African American patient with known sickle cell disease has severe diffuse pain crisis. Vitals stable currently. Patient states 'this happens sometimes' and usually requires hospitalization.",
    question: "What is appropriate management?",
    options: [
      "No transport needed - happens all the time",
      "Transport for pain management and hydration - crisis can cause organ damage",
      "Tell patient to take aspirin",
      "Apply ice to painful areas"
    ],
    correctAnswer: 1,
    explanation: "Sickle cell crisis: sickled RBCs block capillaries causing severe pain and potential organ damage (stroke, acute chest syndrome). Needs IV fluids, O2, pain control (opioids). Transport even if 'usual crisis.' Avoid cold.",
    category: "scenario",
    difficulty: "medium",
    tags: ["sickle cell crisis", "hematologic emergency", "pain crisis"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Sickle Cell Crisis Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  },
  {
    id: "scenario-med-dialysis-emergency-001",
    module: 7,
    chapter: 15,
    scenario: "A dialysis patient missed their last two dialysis treatments. Patient is lethargic, has generalized weakness, and irregular heart rhythm. States 'I feel terrible.'",
    question: "What is your primary concern?",
    options: [
      "Dehydration",
      "Hyperkalemia causing life-threatening dysrhythmia",
      "Hypoglycemia",
      "No emergency present"
    ],
    correctAnswer: 1,
    explanation: "Missed dialysis: potassium builds up (hyperkalemia) - causes dysrhythmias, weakness, cardiac arrest. Also fluid overload, uremia. Life-threatening. Monitor cardiac rhythm, rapid transport. Don't use AV fistula for BP or IV.",
    category: "scenario",
    difficulty: "hard",
    tags: ["dialysis", "renal failure", "hyperkalemia", "dysrhythmia"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Renal Failure Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-med-abdominal-aortic-aneurysm-001",
    module: 7,
    chapter: 15,
    scenario: "A 70-year-old male has sudden onset of severe tearing abdominal/back pain. Patient is pale, diaphoretic, hypotensive 80/50, tachycardic 120. Pulsatile abdominal mass palpated.",
    question: "You should suspect:",
    options: [
      "Kidney stone",
      "Ruptured abdominal aortic aneurysm (AAA) - life-threatening",
      "Gastritis",
      "Constipation"
    ],
    correctAnswer: 1,
    explanation: "Ruptured AAA: sudden tearing abd/back pain, pulsatile mass, hypotension/shock. Extremely high mortality. Gentle handling, treat shock, rapid transport to trauma/vascular center. Avoid aggressive palpation. Often in elderly males.",
    category: "scenario",
    difficulty: "hard",
    tags: ["AAA", "abdominal aortic aneurysm", "vascular emergency", "shock"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Abdominal Emergency Protocol",
    emtScopeCompliant: true,
    points: 4,
    timeEstimate: 90
  },
  {
    id: "scenario-med-appendicitis-001",
    module: 7,
    chapter: 15,
    scenario: "A patient has RLQ abdominal pain that started as periumbilical pain, now localized to McBurney's point. Pain worse with movement. Low-grade fever, nausea. Rebound tenderness present.",
    question: "This presentation is classic for:",
    options: [
      "Gastroenteritis",
      "Appendicitis",
      "Kidney stone",
      "Constipation"
    ],
    correctAnswer: 1,
    explanation: "Appendicitis: starts periumbilical, migrates to RLQ (McBurney's point), fever, N/V, rebound tenderness, worse with movement. Can rupture causing peritonitis/sepsis. Position of comfort, NPO, transport. Avoid palpating excessively.",
    category: "scenario",
    difficulty: "medium",
    tags: ["appendicitis", "abdominal pain", "RLQ pain"],
    nremtDomain: "Medical Emergencies",
    nationalProtocolAlignment: "NHTSA 2022 - Acute Abdomen Protocol",
    emtScopeCompliant: true,
    points: 3,
    timeEstimate: 75
  }
];
