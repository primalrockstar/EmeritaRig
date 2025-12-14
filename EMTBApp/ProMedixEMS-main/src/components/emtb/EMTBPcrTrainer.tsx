import React, { useState, useEffect } from 'react';
import { usePerformanceTracker } from '../../hooks/usePerformanceTracker';
import { PcrTracker, calculatePcrScore } from '../../services/pcrTracker';

// Import scenarios from seed data
const SCENARIOS = [
  {
    "title": "Pediatric Stridor (Croup)",
    "category": "Peds",
    "pcr_text": "3-year-old with inspiratory stridor, barking cough, and low-grade fever. Mother reports recent upper respiratory infection. Patient not improving with home nebulized albuterol.",
    "correct_error": "This is viral croup. Provide supplemental oxygen and transport per Pediatric Respiratory Protocol.",
    "chaos_events": ["Mom screams hysterically", "Nebulizer tubing missing from kit"],
    "stress_fto_responses": ["Don't agitate the child! Pediatric Protocol 2.4 violation!", "This is a load and go situation!"],
    "options": [
      {"text": "Administer supplemental oxygen via nasal cannula and prepare for rapid transport", "is_correct": true},
      {"text": "Intubate the patient for airway control", "is_correct": false, "feedback": "OUT OF SCOPE! Endotracheal intubation requires Paramedic level certification. EMT-B scope is limited to basic airway management."},
      {"text": "Start an IV line for fluid resuscitation", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and minimize agitation"}
  },
  {
    "title": "Febrile Seizure",
    "category": "Peds",
    "pcr_text": "2-year-old post-ictal following a 2-minute generalized seizure. Temperature 102°F. Mother reports first seizure episode.",
    "correct_error": "Febrile seizure resolved. Assess ABCs, check blood glucose, and transport per Pediatric Seizure Protocol.",
    "chaos_events": ["Parent screaming and blocking access", "Pediatric pads missing from AED"],
    "stress_fto_responses": ["Seizure protocol! Check glucose immediately!", "Load and go - time critical!"],
    "options": [
      {"text": "Assess ABCs, check blood glucose, provide supportive care, and transport", "is_correct": true},
      {"text": "Intubate for airway protection", "is_correct": false, "feedback": "OUT OF SCOPE! Endotracheal intubation requires Paramedic level certification. EMT-B scope is limited to basic airway management."},
      {"text": "Administer intramuscular diazepam", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and secure scene"}
  },
  {
    "title": "Pediatric Anaphylaxis",
    "category": "Peds",
    "pcr_text": "5-year-old with urticaria, facial swelling, and respiratory distress following bee sting. No known allergies reported previously.",
    "correct_error": "Anaphylaxis confirmed. Administer epinephrine auto-injector per Pediatric Anaphylaxis Protocol.",
    "chaos_events": ["Child biting and kicking", "EpiPen missing from medical kit"],
    "stress_fto_responses": ["Airway is swelling shut! Intubate now!", "Protocol violation - child is crashing!"],
    "options": [
      {"text": "Administer epinephrine auto-injector, provide supplemental oxygen, and transport", "is_correct": true},
      {"text": "Start IV line and administer epinephrine intravenously", "is_correct": false, "feedback": "OUT OF SCOPE! IV access and IV medications require AEMT level certification. EMT-B uses auto-injectors only."},
      {"text": "Administer oral diphenhydramine only", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and monitor closely"}
  },
  {
    "title": "Pediatric Head Trauma",
    "category": "Peds",
    "pcr_text": "4-year-old fell from bicycle, GCS 14, small scalp laceration with minimal bleeding. Helmet was not worn.",
    "correct_error": "Mild traumatic brain injury. Apply C-spine precautions and transport per Pediatric Trauma Protocol.",
    "chaos_events": ["Parent screaming and demanding immediate treatment", "Blood making scene slippery"],
    "stress_fto_responses": ["Head injury! This is a load and go!", "Don't move the child without precautions!"],
    "options": [
      {"text": "Apply C-spine immobilization, control bleeding, and transport", "is_correct": true},
      {"text": "Intubate immediately for airway protection", "is_correct": false, "feedback": "OUT OF SCOPE! Endotracheal intubation requires Paramedic level certification. EMT-B scope is limited to basic airway management."},
      {"text": "Apply cold pack to head", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and C-spine precautions"}
  },
  {
    "title": "Infant Cardiac Arrest",
    "category": "Peds",
    "pcr_text": "6-month-old unresponsive, pulseless, with suspected SIDS. Parents performed CPR prior to arrival.",
    "correct_error": "Infant cardiac arrest. Initiate CPR and use pediatric AED pads per Pediatric Cardiac Arrest Protocol.",
    "chaos_events": ["Parent screaming uncontrollably", "Pediatric AED pads missing"],
    "stress_fto_responses": ["CPR now! Pediatric protocol!", "Don't delay - infant is critical!"],
    "options": [
      {"text": "Initiate CPR, apply pediatric AED pads, and transport", "is_correct": true},
      {"text": "Intubate and defibrillate with adult energy dose", "is_correct": false, "feedback": "OUT OF SCOPE! Endotracheal intubation requires Paramedic certification. EMT-B must use pediatric AED pads and cannot intubate."},
      {"text": "Administer epinephrine intravenously", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and handle gently"}
  },
  {
    "title": "Active Shooter - Warm Zone",
    "category": "MCI",
    "pcr_text": "Multiple victims in active shooter incident warm zone. Police actively clearing hot zone.",
    "correct_error": "MCI triage in progress. Do not enter hot zone per Active Threat Protocol.",
    "chaos_events": ["Police yelling evacuation orders", "Victim bleeding out nearby"],
    "stress_fto_responses": ["Enter hot zone to save lives!", "Protocol violation - people dying!"],
    "options": [
      {"text": "Triage visible victims, provide care in warm zone, and prepare for transport", "is_correct": true},
      {"text": "Enter hot zone to provide immediate care", "is_correct": false, "feedback": "OUT OF SCOPE! Remain in warm zone until cleared. Refer to MCI Protocol."},
      {"text": "Delay transport to perform full secondary assessments", "is_correct": false}
    ],
    "hazards": {"type": "Active Shooter/Safety", "action": "Follow police commands"}
  },
  {
    "title": "IED Blast Injury",
    "category": "MCI",
    "pcr_text": "Victim of IED blast with traumatic amputation and severe bleeding. Multiple casualties on scene.",
    "correct_error": "Blast injury with amputation. Apply tourniquet and triage per Blast Injury Protocol.",
    "chaos_events": ["Secondary explosion risk", "Debris falling"],
    "stress_fto_responses": ["Tourniquet now! Hemorrhage protocol!", "Load and go - MCI priority!"],
    "options": [
      {"text": "Apply tourniquet proximal to injury, control bleeding, and transport per triage", "is_correct": true},
      {"text": "Attempt CPR on black-tagged victim", "is_correct": false, "feedback": "OUT OF SCOPE! Black tags do not receive CPR. Refer to MCI Triage Protocol."},
      {"text": "Delay transport for detailed secondary assessment", "is_correct": false}
    ],
    "hazards": {"type": "Blast Injury/Safety", "action": "Check for secondary devices"}
  },
  {
    "title": "Chemical Attack Victim",
    "category": "MCI",
    "pcr_text": "Victim exposed to chemical agent with respiratory distress and skin burns. HazMat not yet on scene.",
    "correct_error": "Chemical exposure. Decontaminate and provide supportive care per HazMat Protocol.",
    "chaos_events": ["Gas cloud shifting", "Risk of secondary contamination"],
    "stress_fto_responses": ["Decontaminate immediately!", "Protocol violation - victim deteriorating!"],
    "options": [
      {"text": "Remove contaminated clothing, rinse with water, administer oxygen, and transport", "is_correct": true},
      {"text": "Enter hot zone to rescue additional victims", "is_correct": false, "feedback": "OUT OF SCOPE! Await HazMat clearance. Refer to Chemical Incident Protocol."},
      {"text": "Administer antidote without decontamination", "is_correct": false}
    ],
    "hazards": {"type": "Chemical/Safety", "action": "Decontaminate before transport"}
  },
  {
    "title": "Vehicle Ramming Attack",
    "category": "MCI",
    "pcr_text": "Victims from vehicle ramming attack with multiple injuries. Scene unsecured.",
    "correct_error": "Terrorism incident. Triage and transport priority victims per MCI Protocol.",
    "chaos_events": ["Looter attempting to interfere", "Victims trapped in vehicle"],
    "stress_fto_responses": ["Rescue everyone now!", "Protocol 5.1 - full triage required!"],
    "options": [
      {"text": "Perform rapid triage, stabilize priority victims, and transport", "is_correct": true},
      {"text": "Attempt to extricate and treat all victims immediately", "is_correct": false, "feedback": "OUT OF SCOPE! Follow triage priorities. Refer to MCI Protocol."},
      {"text": "Delay care until police secure scene completely", "is_correct": false}
    ],
    "hazards": {"type": "Terrorism/Safety", "action": "Secure scene with law enforcement"}
  },
  {
    "title": "Structure Fire Rescue",
    "category": "MCI",
    "pcr_text": "Victims with smoke inhalation from structure fire. Fire department actively fighting fire.",
    "correct_error": "Smoke inhalation. Administer oxygen and transport per Fire Incident Protocol.",
    "chaos_events": ["Fire spreading to adjacent buildings", "Victim becoming unresponsive"],
    "stress_fto_responses": ["Enter structure to rescue!", "Protocol violation - people trapped!"],
    "options": [
      {"text": "Administer supplemental oxygen, do not enter structure, and transport", "is_correct": true},
      {"text": "Enter burning structure to perform rescue", "is_correct": false, "feedback": "OUT OF SCOPE! Firefighter responsibility. Refer to Fire Incident Protocol."},
      {"text": "Delay transport for complete secondary assessment", "is_correct": false}
    ],
    "hazards": {"type": "Fire/Safety", "action": "Avoid smoke inhalation"}
  },
  {
    "title": "Femoral Fracture",
    "category": "Trauma",
    "pcr_text": "25-year-old fell from height with deformed right femur, pale and diaphoretic. Neurovascular intact distal.",
    "correct_error": "Femoral fracture. Immobilize limb and transport per Trauma Protocol.",
    "chaos_events": ["Heavy rain making backboard slippery", "Patient screaming in pain"],
    "stress_fto_responses": ["Splint the fracture now!", "Load and go - shock setting in!"],
    "options": [
      {"text": "Immobilize limb with traction splint if available, manage pain, and transport", "is_correct": true},
      {"text": "Perform needle decompression for suspected pneumothorax", "is_correct": false, "feedback": "OUT OF SCOPE! Needle decompression requires Paramedic level certification. EMT-B scope does not include invasive procedures."},
      {"text": "Suture any open wounds", "is_correct": false}
    ],
    "hazards": {"type": "Trauma/Safety", "action": "Secure scene and C-spine"}
  },
  {
    "title": "Sucking Chest Wound",
    "category": "Trauma",
    "pcr_text": "Penetrating chest trauma with audible sucking sound and frothy blood. Patient tachypneic.",
    "correct_error": "Open pneumothorax. Apply occlusive dressing per Chest Trauma Protocol.",
    "chaos_events": ["Bystander attempting to help inappropriately", "Large amount of blood on scene"],
    "stress_fto_responses": ["Dress that wound!", "Protocol violation - air entering!"],
    "options": [
      {"text": "Apply occlusive dressing, high-flow oxygen, and transport", "is_correct": true},
      {"text": "Perform needle decompression", "is_correct": false, "feedback": "OUT OF SCOPE! ALS procedure. Refer to Chest Trauma Protocol."},
      {"text": "Suture the chest wound", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE"}
  },
  {
    "title": "Abdominal Evisceration",
    "category": "Trauma",
    "pcr_text": "GSW to abdomen with bowel evisceration. Patient alert but in pain.",
    "correct_error": "Abdominal trauma with evisceration. Cover with moist dressing per Trauma Protocol.",
    "chaos_events": ["Patient vomiting", "Scene becoming chaotic"],
    "stress_fto_responses": ["Cover the exposed bowel!", "Don't touch - sterile field!"],
    "options": [
      {"text": "Cover evisceration with moist sterile dressing and transport", "is_correct": true},
      {"text": "Suture the eviscerated tissue", "is_correct": false, "feedback": "OUT OF SCOPE! Surgical procedure. Refer to Abdominal Trauma Protocol."},
      {"text": "Manually reduce the evisceration", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE and minimize contamination"}
  },
  {
    "title": "Traumatic Amputation",
    "category": "Trauma",
    "pcr_text": "Complete amputation of right arm at mid-forearm from industrial accident.",
    "correct_error": "Traumatic amputation. Apply tourniquet and transport stump per Trauma Protocol.",
    "chaos_events": ["Tourniquet slipping due to blood", "Patient screaming"],
    "stress_fto_responses": ["Tourniquet proximal!", "Load and go - hemorrhage control!"],
    "options": [
      {"text": "Apply tourniquet proximal to injury, wrap stump, and transport", "is_correct": true},
      {"text": "Suture the amputation site", "is_correct": false, "feedback": "OUT OF SCOPE! Surgical procedure. Refer to Amputation Protocol."},
      {"text": "Attempt limb reattachment", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE"}
  },
  {
    "title": "Flail Chest",
    "category": "Trauma",
    "pcr_text": "MVC victim with paradoxical chest wall movement and respiratory distress.",
    "correct_error": "Flail chest. Provide oxygen and pain management per Chest Trauma Protocol.",
    "chaos_events": ["Rain pouring down", "Patient becoming combative"],
    "stress_fto_responses": ["Intubate for airway!", "Protocol 3.2 - immediate intervention!"],
    "options": [
      {"text": "Administer high-flow oxygen, manage pain if allowed, and transport", "is_correct": true},
      {"text": "Perform needle decompression", "is_correct": false, "feedback": "OUT OF SCOPE! ALS procedure. Refer to Respiratory Trauma Protocol."},
      {"text": "Apply external chest splinting", "is_correct": false}
    ],
    "hazards": {"type": "Trauma/Safety", "action": "C-spine immobilization"}
  },
  {
    "title": "Suspected STEMI",
    "category": "Medical",
    "pcr_text": "55-year-old with crushing chest pain, diaphoresis, and nausea. History of CAD.",
    "correct_error": "Suspected myocardial infarction. Administer aspirin and transport per Cardiac Protocol.",
    "chaos_events": ["Patient vomiting on scene", "Heavy traffic delaying transport"],
    "stress_fto_responses": ["Aspirin now!", "Load and go - cardiac protocol!"],
    "options": [
      {"text": "Administer aspirin if no contraindications, oxygen, monitor, and transport", "is_correct": true},
      {"text": "Perform manual defibrillation", "is_correct": false, "feedback": "OUT OF SCOPE! AED only for EMT. Refer to Cardiac Arrest Protocol."},
      {"text": "Administer nitroglycerin intravenously", "is_correct": false}
    ],
    "hazards": {"type": "Medical/Safety", "action": "Scene safety"}
  },
  {
    "title": "Acute Asthma",
    "category": "Medical",
    "pcr_text": "40-year-old with severe wheezing and shortness of breath. Using personal albuterol inhaler.",
    "correct_error": "Acute asthma exacerbation. Administer nebulized albuterol per Respiratory Protocol.",
    "chaos_events": ["Oxygen tank running low", "Patient resistant to treatment"],
    "stress_fto_responses": ["Nebulize immediately!", "Protocol violation - can't breathe!"],
    "options": [
      {"text": "Administer nebulized albuterol and supplemental oxygen", "is_correct": true},
      {"text": "Administer adenosine for SVT", "is_correct": false, "feedback": "OUT OF SCOPE! Adenosine requires Paramedic level certification. EMT-B scope is limited to basic medications."},
      {"text": "Perform endotracheal intubation", "is_correct": false}
    ],
    "hazards": {"type": "Respiratory/Safety", "action": "Use PPE"}
  },
  {
    "title": "Suspected Stroke",
    "category": "Medical",
    "pcr_text": "60-year-old with sudden left-sided weakness and slurred speech. Last seen normal 1 hour ago.",
    "correct_error": "Suspected stroke. Assess ABCs and transport per Stroke Protocol.",
    "chaos_events": ["Family member interfering with assessment", "Patient vomiting"],
    "stress_fto_responses": ["Stroke protocol - time is brain!", "Load and go immediately!"],
    "options": [
      {"text": "Assess ABCs, determine last known well time, and transport to stroke center", "is_correct": true},
      {"text": "Administer tPA in field", "is_correct": false, "feedback": "OUT OF SCOPE! Hospital procedure. Refer to Stroke Protocol."},
      {"text": "Perform manual defibrillation", "is_correct": false}
    ],
    "hazards": {"type": "Medical/Safety", "action": "Scene safety"}
  },
  {
    "title": "Hypoglycemia",
    "category": "Medical",
    "pcr_text": "30-year-old diabetic with altered mental status. Blood glucose 40 mg/dL.",
    "correct_error": "Hypoglycemia. Administer oral glucose per Diabetic Protocol.",
    "chaos_events": ["Dog barking loudly nearby", "Oral glucose gel unavailable"],
    "stress_fto_responses": ["Glucose now!", "Check sugar - protocol!"],
    "options": [
      {"text": "Administer oral glucose if patient can swallow, monitor, and transport", "is_correct": true},
      {"text": "Administer insulin subcutaneously", "is_correct": false, "feedback": "OUT OF SCOPE! Hospital adjustment. Refer to Hypoglycemia Protocol."},
      {"text": "Start IV dextrose infusion", "is_correct": false}
    ],
    "hazards": {"type": "Medical/Safety", "action": "Wear gloves"}
  },
  {
    "title": "Opioid Overdose",
    "category": "Medical",
    "pcr_text": "25-year-old unresponsive with pinpoint pupils and respiratory depression. Suspected opioid overdose.",
    "correct_error": "Opioid overdose. Administer naloxone per Overdose Protocol.",
    "chaos_events": ["Patient vomiting during care", "Signs of polysubstance abuse"],
    "stress_fto_responses": ["Narcan immediately!", "Give it - OD protocol!"],
    "options": [
      {"text": "Administer naloxone intranasally or IM, support airway, and transport", "is_correct": true},
      {"text": "Administer adenosine for bradycardia", "is_correct": false, "feedback": "OUT OF SCOPE! Incorrect medication. Refer to Overdose Protocol."},
      {"text": "Perform endotracheal intubation", "is_correct": false}
    ],
    "hazards": {"type": "Biohazard/Safety", "action": "Don PPE"}
  },
  {
    "title": "Imminent Delivery",
    "category": "OB",
    "pcr_text": "28-year-old at term with crowning presentation. Contractions every 2 minutes.",
    "correct_error": "Imminent delivery. Assist with delivery per OB Protocol.",
    "chaos_events": ["Father fainting on scene", "Nuchal cord suspected"],
    "stress_fto_responses": ["Deliver the baby!", "OB protocol - now!"],
    "options": [
      {"text": "Prepare for delivery, provide support, and transport if needed", "is_correct": true},
      {"text": "Perform internal vaginal examination", "is_correct": false, "feedback": "OUT OF SCOPE! Advanced assessment. Refer to OB Protocol."},
      {"text": "Administer oxytocin IM", "is_correct": false}
    ],
    "hazards": {"type": "OB/Safety", "action": "Maintain sterile field"}
  },
  {
    "title": "Pre-Eclampsia",
    "category": "OB",
    "pcr_text": "35-year-old pregnant with severe headache, BP 180/110, and peripheral edema at 32 weeks.",
    "correct_error": "Pre-eclampsia. Transport in left lateral position per OB Protocol.",
    "chaos_events": ["Patient becoming confused", "Signs of vaginal bleeding"],
    "stress_fto_responses": ["High BP crisis!", "Protocol violation - eclampsia risk!"],
    "options": [
      {"text": "Monitor vital signs, position left lateral, and transport", "is_correct": true},
      {"text": "Administer magnesium sulfate IV", "is_correct": false, "feedback": "OUT OF SCOPE! IV magnesium sulfate requires Paramedic level certification. EMT-B scope does not include IV medications."},
      {"text": "Perform emergency delivery", "is_correct": false}
    ],
    "hazards": {"type": "OB/Safety", "action": "Monitor blood pressure"}
  },
  {
    "title": "Suicidal Ideation",
    "category": "Psych",
    "pcr_text": "20-year-old expressing suicidal thoughts and depression. No current means available.",
    "correct_error": "Suicidal ideation. De-escalate and transport per Behavioral Protocol.",
    "chaos_events": ["Patient attempting to run into traffic", "Family members crying"],
    "stress_fto_responses": ["Restrain them!", "Talk them down - protocol!"],
    "options": [
      {"text": "Use verbal de-escalation, assess for means, and transport", "is_correct": true},
      {"text": "Administer chemical restraints", "is_correct": false, "feedback": "OUT OF SCOPE! ALS procedure. Refer to Behavioral Protocol."},
      {"text": "Force administer oral medication", "is_correct": false}
    ],
    "hazards": {"type": "Behavioral/Safety", "action": "Scene safety"}
  },
  {
    "title": "Acute Psychosis",
    "category": "Psych",
    "pcr_text": "45-year-old hallucinating and displaying aggressive behavior. No known psychiatric history.",
    "correct_error": "Acute psychosis. De-escalate and transport per Behavioral Protocol.",
    "chaos_events": ["Patient becoming physically violent", "Police arriving on scene"],
    "stress_fto_responses": ["Sedate immediately!", "Protocol 6.1 - chemical restraint!"],
    "options": [
      {"text": "Attempt verbal de-escalation, use physical restraint if needed, and transport", "is_correct": true},
      {"text": "Administer chemical restraints", "is_correct": false, "feedback": "OUT OF SCOPE! ALS procedure. Refer to Behavioral Protocol."},
      {"text": "Deploy less-lethal weapons", "is_correct": false}
    ],
    "hazards": {"type": "Behavioral/Safety", "action": "Request law enforcement assistance"}
  },
  {
    "title": "Sexual Assault",
    "category": "Medical",
    "pcr_text": "18-year-old reporting recent sexual assault, anxious and tearful.",
    "correct_error": "Sexual assault. Provide support and transport per Assault Protocol.",
    "chaos_events": ["Police deploying taser nearby", "Patient highly emotional"],
    "stress_fto_responses": ["Examine for evidence!", "Protocol violation - victim needs care!"],
    "options": [
      {"text": "Provide emotional support, maintain privacy, and transport to appropriate facility", "is_correct": true},
      {"text": "Perform internal examination", "is_correct": false, "feedback": "OUT OF SCOPE! Forensic exam by trained personnel. Refer to Sexual Assault Protocol."},
      {"text": "Administer sedative medication", "is_correct": false}
    ],
    "hazards": {"type": "Sensitive/Safety", "action": "Maintain patient privacy"}
  }
];

interface Scenario {
  id: string;
  title: string;
  category: string;
  pcr_text: string;
  correct_error: string;
  chaos_events: string[];
  stress_fto_responses: string[];
  options: Array<{
    text: string;
    is_correct: boolean;
    feedback?: string;
  }>;
  hazards: {
    type: string;
    action: string;
  };
  // Compatibility fields
  expectedReport?: string;
  patientInfo?: any;
  history?: string;
  assessment?: string;
  actions?: string[];
}

const EMTBPcrTrainer: React.FC = () => {
  const { trackEvent, getPcrRecommendedActions } = usePerformanceTracker();
  const pcrTracker = PcrTracker.getInstance();

  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [reportText, setReportText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showChaosEvents, setShowChaosEvents] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Create scenarios array with IDs
  const scenarios: Scenario[] = SCENARIOS.map((scenario, index) => ({
    ...scenario,
    id: `scenario-${index + 1}`,
    expectedReport: scenario.correct_error
  }));

  useEffect(() => {
    // Load first scenario
    setCurrentScenario(scenarios[0]);
    setStartTime(Date.now());
  }, []);

  const handleSubmitReport = () => {
    if (!currentScenario) return;

    let score = 0;
    let deficiencies: string[] = [];
    let feedbackMessages: string[] = [];

    // FTO Evaluation Logic
    if (selectedOption !== null) {
      const selectedAnswer = currentScenario.options[selectedOption];
      if (selectedAnswer.is_correct) {
        score += 50; // Correct action choice
        feedbackMessages.push('✅ Correct action selected');
      } else {
        score += 10; // Wrong action but at least attempted
        deficiencies.push('Incorrect action selection');
        if (selectedAnswer.feedback) {
          feedbackMessages.push(`❌ ${selectedAnswer.feedback}`);
        }
      }
    } else {
      deficiencies.push('No action selected');
      feedbackMessages.push('⚠️ No treatment action chosen');
    }

    // PCR Documentation Scoring (if provided)
    if (reportText.trim()) {
      const report = reportText.toLowerCase();
      let docScore = 0;

      // Check for key elements
      if (report.includes(currentScenario.category.toLowerCase())) docScore += 10;
      if (report.includes('protocol') || report.includes('assessment')) docScore += 10;
      if (report.includes('transport') || report.includes('transfer')) docScore += 10;
      if (report.length > 50) docScore += 10; // Adequate documentation length

      score += docScore;
      if (docScore >= 30) {
        feedbackMessages.push('✅ Good documentation quality');
      } else {
        deficiencies.push('Incomplete PCR documentation');
      }
    } else {
      deficiencies.push('Missing PCR documentation');
    }

    // Chaos Events Impact
    if (showChaosEvents) {
      score += 10; // Recognized chaos events
      feedbackMessages.push('✅ Chaos events acknowledged');
    } else {
      deficiencies.push('Failed to recognize chaos events');
    }

    // Scope of Practice Check
    const hasScopeViolation = currentScenario.options.some(opt => !opt.is_correct && selectedOption !== null && currentScenario.options[selectedOption] === opt);
    if (hasScopeViolation) {
      score -= 20; // Penalty for scope violations
    }

    score = Math.max(0, Math.min(100, score));

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    // Create PCR event with FTO data
    const pcrEvent = {
      reportId: `pcr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      scenarioId: currentScenario.id,
      module: 1, // EMT-B PCR training
      score,
      timeSpent,
      deficiencies,
      strengths: feedbackMessages.filter(f => f.startsWith('✅')),
      timestamp: new Date(),
      passed: score >= 70,
      ftoResponses: currentScenario.stress_fto_responses,
      chaosAcknowledged: showChaosEvents
    };

    // Track in PCR system
    pcrTracker.trackPcrSubmission(pcrEvent);

    // Track in performance system
    trackEvent({
      activityType: 'pcr',
      activityId: pcrEvent.reportId,
      topic: 'EMT-B FTO Training',
      score,
      timeSpent,
      metadata: {
        scenario: currentScenario.title,
        category: currentScenario.category,
        deficiencies: deficiencies.length,
        scopeViolation: hasScopeViolation,
        passed: score >= 70
      }
    });

    setScore(score);
    setFeedback(feedbackMessages.join('\n'));
    setShowAnswer(true);
  };

  const nextScenario = () => {
    const currentIndex = scenarios.findIndex(s => s.id === currentScenario?.id);
    const nextIndex = (currentIndex + 1) % scenarios.length;
    setCurrentScenario(scenarios[nextIndex]);
    setReportText('');
    setFeedback(null);
    setScore(null);
    setShowAnswer(false);
    setSelectedOption(null);
    setShowChaosEvents(false);
    setStartTime(Date.now());
  };

  if (!currentScenario) {
    return <div className="flex justify-center items-center h-64">Loading FTO training scenarios...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">EMT-B FTO Training Simulator</h1>
        <p className="text-slate-400">Real-world scenarios with FTO evaluation, chaos events, and protocol validation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scenario Panel */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-400">{currentScenario.title}</h2>
              <span className="px-2 py-1 bg-slate-700 text-xs font-semibold rounded text-slate-300">
                {currentScenario.category}
              </span>
            </div>

            {/* PCR Text */}
            <div className="bg-slate-900/50 p-4 rounded-lg mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">Scenario</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{currentScenario.pcr_text}</p>
            </div>

            {/* Hazard Awareness */}
            <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded-lg mb-4">
              <h3 className="text-sm font-semibold text-amber-400 uppercase mb-2">🛡️ Hazard Alert</h3>
              <p className="text-amber-300 text-sm">
                <strong>{currentScenario.hazards.type}:</strong> {currentScenario.hazards.action}
              </p>
            </div>

            {/* Chaos Events */}
            <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-red-400 uppercase">🚨 Chaos Events</h3>
                <button
                  onClick={() => setShowChaosEvents(!showChaosEvents)}
                  className="text-xs px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  {showChaosEvents ? 'Hide' : 'Show'}
                </button>
              </div>
              {showChaosEvents && (
                <ul className="text-red-300 text-sm space-y-1">
                  {currentScenario.chaos_events.map((event, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Action Selection & PCR Form */}
        <div className="space-y-6">
          {/* Action Options */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold text-green-400 mb-4">Select Your Action</h2>

            <div className="space-y-3">
              {currentScenario.options.map((option, idx) => (
                <label key={idx} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="action"
                    value={idx}
                    checked={selectedOption === idx}
                    onChange={() => setSelectedOption(idx)}
                    disabled={showAnswer}
                    className="mt-1 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-slate-300 text-sm leading-relaxed">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PCR Documentation */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Patient Care Report</h2>

            <textarea
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Document your assessment, interventions, transport decision, and rationale..."
              className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:border-purple-500 focus:outline-none"
              disabled={showAnswer}
            />

            {!showAnswer && (
              <button
                onClick={handleSubmitReport}
                disabled={selectedOption === null}
                className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg text-white font-medium transition-colors"
              >
                Submit FTO Evaluation
              </button>
            )}
          </div>

          {/* FTO Feedback */}
          {feedback && score !== null && (
            <div className={`p-6 rounded-xl border ${
              score >= 70 ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'
            }`}>
              <h3 className={`text-lg font-bold mb-3 ${
                score >= 70 ? 'text-green-400' : 'text-red-400'
              }`}>
                {score >= 70 ? '✅ FTO Evaluation Passed' : '❌ FTO Evaluation Failed'}
              </h3>

              <div className="space-y-4 mb-4">
                {/* Action Selection Feedback */}
                {selectedOption !== null && (
                  <div className={`p-3 rounded-lg ${
                    currentScenario.options[selectedOption].is_correct
                      ? 'bg-green-900/30 border border-green-500/30'
                      : 'bg-red-900/30 border border-red-500/30'
                  }`}>
                    <h4 className="font-semibold text-sm mb-1">
                      Your Action: {currentScenario.options[selectedOption].is_correct ? '✅ Correct' : '❌ Incorrect'}
                    </h4>
                    <p className="text-sm text-slate-300">{currentScenario.options[selectedOption].text}</p>
                    {currentScenario.options[selectedOption].feedback && (
                      <p className="text-sm text-red-400 mt-2">{currentScenario.options[selectedOption].feedback}</p>
                    )}
                  </div>
                )}

                {/* FTO Responses */}
                <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-400 text-sm mb-2">🎯 FTO Stress Responses</h4>
                  <ul className="text-blue-300 text-xs space-y-1">
                    {currentScenario.stress_fto_responses.map((response, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>{response}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Overall Feedback */}
                <div className="text-sm text-slate-300 whitespace-pre-line">{feedback}</div>
              </div>

              <div className="flex items-center justify-between text-sm font-mono bg-slate-900/50 p-2 rounded">
                <span>FTO Score:</span>
                <span className={score >= 70 ? 'text-green-400' : 'text-red-400'}>
                  {score}%
                </span>
              </div>

              <button
                onClick={nextScenario}
                className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
              >
                Next Scenario ({scenarios.findIndex(s => s.id === currentScenario.id) + 1}/{scenarios.length})
              </button>
            </div>
          )}

          {/* Correct Answer Reference */}
          {showAnswer && (
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">📚 Correct Protocol Response</h3>
              <p className="text-slate-300 text-sm mb-4">{currentScenario.correct_error}</p>

              <div className="bg-green-900/20 border border-green-500/30 p-3 rounded-lg mb-3">
                <h4 className="font-semibold text-green-400 text-sm mb-2">✅ Correct Action</h4>
                {currentScenario.options.filter(opt => opt.is_correct).map((opt, idx) => (
                  <p key={idx} className="text-green-300 text-sm">{opt.text}</p>
                ))}
              </div>

              <div className="text-xs text-slate-500">
                <strong>EMT-B Scope of Practice:</strong> Remember, EMTs can only perform interventions within their certified scope. Always reference your local protocols.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Make PcrTracker globally available for testing
(window as any).PcrTracker = PcrTracker;

export default EMTBPcrTrainer;