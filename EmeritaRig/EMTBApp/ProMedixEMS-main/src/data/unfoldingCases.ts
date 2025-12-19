/**
 * ProMedix EMS - Unfolding Case Database
 * High-impact clinical scenarios for EMT-B training
 * Week 1-2 Deliverable: 5 priority cases with 3-4 stages each
 */

import { UnfoldingCase } from '../types/ClinicalReasoning';

/**
 * CASE 1: Cardiac Arrest with ROSC Management
 * Learning Focus: Post-resuscitation care, ACS recognition, transport priorities
 */
export const cardiacArrestROSC: UnfoldingCase = {
  id: 'case-001-cardiac-rosc',
  title: 'Cardiac Arrest with Return of Spontaneous Circulation',
  initialPresentation: `
You are dispatched to a private residence for a "man down." On arrival, you find a 56-year-old male lying supine on the living room floor. The patient's wife states he suddenly grabbed his chest, said he felt dizzy, and collapsed approximately 5 minutes ago. She immediately called 911 and has been performing CPR as instructed by the dispatcher.
  `,
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Initial Assessment',
      newInformation: `
PRIMARY ASSESSMENT:
- Patient unresponsive, no spontaneous respirations
- No palpable carotid pulse
- Wife has been performing CPR for approximately 5 minutes
- AED pads already applied by first responders (just arrived)
- Room air temperature normal, no obvious trauma
      `,
      question: 'What is your IMMEDIATE priority action?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Stop CPR and reassess the patient for signs of life',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Never interrupt CPR without a good reason (AED analyzing, ROSC, rescuer fatigue)',
          consequences: 'Unnecessary interruption reduces perfusion and decreases survival chances',
        },
        {
          id: 'b',
          text: 'Continue high-quality CPR while ensuring AED is ready to analyze',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'CPR continues without interruption, maintaining perfusion',
        },
        {
          id: 'c',
          text: 'Immediately apply oxygen via non-rebreather mask at 15 LPM',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Oxygen is useless without circulation; CPR/defibrillation takes priority',
          differentialConsideration: 'While oxygen is important, it cannot be delivered to tissues without adequate circulation',
        },
        {
          id: 'd',
          text: 'Obtain a detailed medical history from the wife before continuing',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'History is important but not at the expense of delaying critical interventions',
          consequences: 'Delay in definitive care reduces survival probability',
        },
      ],
      correctAnswerId: 'b',
      explanation: `
**Clinical Reasoning:**
In cardiac arrest management, the priority is high-quality CPR with minimal interruptions. The AHA emphasizes:
1. **Chest compressions first** - maintain cerebral and coronary perfusion
2. **Minimize interruptions** - any pause reduces survival chances
3. **Early defibrillation** - but don't interrupt CPR to apply pads (already done)

**Why Other Options Are Incorrect:**
- Option A: Interrupting CPR without cause reduces perfusion
- Option C: Oxygen requires circulation to be effective; CPR is the priority
- Option D: History is important but should not delay resuscitation

**Key Clinical Pearl:**
"Push hard, push fast, minimize interruptions" - every second without compressions decreases survival by 7-10%.
      `,
      hints: [
        {
          level: 1,
          text: 'Consider the ABCs - what does this patient lack that nothing else matters without?',
          deductionPoints: 2,
        },
        {
          level: 2,
          text: 'AHA guidelines emphasize minimal interruptions to what critical intervention?',
          deductionPoints: 5,
        },
        {
          level: 3,
          text: 'The most important intervention in cardiac arrest is high-quality CPR',
          deductionPoints: 10,
        },
      ],
      criticalDecision: true,
      pointValue: 20,
    },
    {
      stageNumber: 2,
      stageTitle: 'AED Analysis and Shock Delivery',
      newInformation: `
SITUATION UPDATE:
- CPR continued for 2 minutes with proper technique
- AED now analyzing rhythm
- AED advises "SHOCK ADVISED"
- All rescuers clear, shock delivered at 200 joules
- Immediately resumed CPR for 2 minutes
- After 2 minutes of CPR, you reassess:

REASSESSMENT FINDINGS:
- Carotid pulse now palpable, regular, approximately 90 bpm
- Patient begins gasping respirations, approximately 8 breaths/min
- SpO2 88% on room air (pulse ox now reading)
- Patient remains unresponsive (GCS 3)
- AED shows organized rhythm
      `,
      question: 'The patient has achieved ROSC. What is your NEXT immediate intervention?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Continue CPR until the patient regains consciousness',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'CPR is contraindicated when there is a pulse - causes injury',
          consequences: 'Unnecessary chest compressions on a patient with ROSC can cause rib fractures and impair recovery',
        },
        {
          id: 'b',
          text: 'Provide assisted ventilations with BVM and supplemental oxygen while preparing for transport',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Patient receives adequate oxygenation and ventilation during critical post-ROSC period',
        },
        {
          id: 'c',
          text: 'Remove the AED pads since the patient now has a pulse',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'AED should remain connected in case patient re-arrests',
          differentialConsideration: 'Post-ROSC patients are at high risk for re-arrest; AED should stay connected',
        },
        {
          id: 'd',
          text: 'Administer aspirin 324mg while waiting for ALS to arrive',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Patient is unresponsive with inadequate respirations - cannot safely take oral medications',
          consequences: 'Aspiration risk is extremely high in unresponsive patients',
        },
      ],
      correctAnswerId: 'b',
      explanation: `
**Clinical Reasoning - Post-ROSC Management:**
ROSC (Return of Spontaneous Circulation) is achieved, but the patient is NOT stable:

**Critical Assessment:**
1. **Pulse present** → STOP CPR (avoid injury)
2. **Inadequate respirations** (8/min, gasping) → Requires assisted ventilation
3. **Low SpO2** (88%) → Needs supplemental oxygen
4. **Unresponsive** → High aspiration risk, cannot protect airway

**AHA Post-ROSC Priorities:**
1. Adequate oxygenation and ventilation
2. Avoid hyperventilation (causes increased ICP and decreased cardiac output)
3. Target SpO2 94-99%
4. Monitor for re-arrest (keep AED/monitor connected)
5. Rapid transport to appropriate facility (STEMI center if suspected cardiac cause)

**Why Other Options Are Incorrect:**
- Option A: CPR with a pulse causes harm
- Option C: Patient may re-arrest; keep AED connected
- Option D: Aspiration risk in unresponsive patient

**Key Clinical Pearl:**
Post-ROSC care is as critical as the resuscitation itself. Ventilate at 10-12 breaths/min - avoid hyperventilation which decreases cerebral perfusion.
      `,
      hints: [
        {
          level: 1,
          text: 'Patient has a pulse but inadequate breathing - what does this suggest?',
          deductionPoints: 2,
        },
        {
          level: 2,
          text: 'Post-ROSC patients need ventilatory support. What is the appropriate rate?',
          deductionPoints: 5,
          unlockAfterSeconds: 30,
        },
        {
          level: 3,
          text: 'Assisted ventilations with BVM and oxygen - avoid hyperventilation',
          deductionPoints: 10,
          unlockAfterSeconds: 45,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
    {
      stageNumber: 3,
      stageTitle: 'Patient Awakening and Assessment',
      newInformation: `
TRANSPORT INITIATED - 5 MINUTES POST-ROSC:
- Patient being ventilated with BVM, 15 LPM O2
- SpO2 now 96%
- Patient begins to regain consciousness
- Opens eyes to verbal stimuli
- Confused, doesn't remember what happened
- Following simple commands ("squeeze my hand")

VITAL SIGNS:
- BP: 92/58 mmHg
- HR: 98 bpm, regular
- RR: 10/min (assisted ventilations)
- SpO2: 96% on 15 LPM
- Skin: Cool, pale, diaphoretic
- GCS: E3 V4 M6 = 13

PATIENT STATES:
"My chest really hurts... it feels like pressure... going down my left arm"
      `,
      question: 'Based on this presentation, what is your PRIMARY suspected diagnosis?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Traumatic injury from CPR causing rib fractures',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'While CPR can cause rib fractures, the radiation to left arm and initial presentation suggest cardiac origin',
        },
        {
          id: 'b',
          text: 'Acute coronary syndrome (likely STEMI) that caused the cardiac arrest',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Correct recognition leads to appropriate transport destination (STEMI center)',
        },
        {
          id: 'c',
          text: 'Anxiety attack with hyperventilation leading to syncope',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Minimizing serious cardiac presentations as anxiety is dangerous',
          consequences: 'Missed STEMI diagnosis results in delayed definitive care and worse outcomes',
        },
        {
          id: 'd',
          text: 'Pulmonary embolism causing cardiac arrest',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'PE is possible but less likely given chest pain prior to arrest and radiation pattern',
        },
      ],
      correctAnswerId: 'b',
      explanation: `
**Clinical Reasoning - Acute Coronary Syndrome Recognition:**

**Red Flags for ACS/STEMI:**
1. ✅ **Classic chest pain** - pressure sensation
2. ✅ **Radiation to left arm** - highly specific for cardiac origin
3. ✅ **Sudden cardiac arrest** - consistent with ventricular fibrillation from acute MI
4. ✅ **Demographics** - 56-year-old male in high-risk category
5. ✅ **Hypotension** - suggests cardiogenic compromise

**Differential Diagnosis Thinking:**
- **Trauma from CPR**: Possible but doesn't explain pre-arrest chest pain and arm radiation
- **Anxiety**: Dangerous dismissal of serious pathology; anxiety doesn't cause cardiac arrest
- **Pulmonary Embolism**: Possible but less likely without risk factors; pain pattern suggests cardiac

**Critical Actions Now Required:**
1. **12-lead ECG if available** (ALS intercept or hospital)
2. **Aspirin 324mg** - patient now conscious and can chew (if not allergic)
3. **Nitroglycerin** - only if BP >100 systolic and no contraindications
4. **STEMI Alert** - pre-notification to receiving facility
5. **Rapid transport** to PCI-capable facility (door-to-balloon time critical)

**Key Clinical Pearl:**
Any cardiac arrest patient with chest pain and radiation should be presumed STEMI until proven otherwise. Time is muscle - every minute delays myocardial salvage.
      `,
      hints: [
        {
          level: 1,
          text: 'What does chest pressure radiating to the left arm classically indicate?',
          deductionPoints: 3,
        },
        {
          level: 2,
          text: 'Consider what would cause both the initial arrest AND the current chest pain',
          deductionPoints: 6,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
    {
      stageNumber: 4,
      stageTitle: 'Treatment and Transport Decisions',
      newInformation: `
CURRENT STATUS (8 minutes post-ROSC):
- Patient alert and oriented to person only
- Chest pain continues, 8/10 severity
- No allergies reported by patient/wife
- Takes daily aspirin 81mg, atorvastatin
- No history of Viagra/Cialis use
- BP rechecked: 94/60 mmHg

ALS INTERCEPT AVAILABLE:
- Paramedic unit 8 minutes away
- You are currently 6 minutes from nearest hospital (no PCI capability)
- STEMI center with cath lab is 18 minutes away
      `,
      question: 'What is your BEST transport decision and immediate treatment plan?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Transport to nearest hospital (6 min) for stabilization, then potential transfer',
          reasoningRequired: true,
          isDistractor: true,
          differentialConsideration: 'While closer, this causes delay in definitive PCI and violates "door-to-balloon" time guidelines',
          consequences: 'Delay to PCI by 30-60 minutes; increased mortality risk',
        },
        {
          id: 'b',
          text: 'Wait for ALS intercept, then transport to STEMI center with paramedic care en route',
          reasoningRequired: false,
          isDistractor: true,
          consequences: 'Unnecessary 8-minute delay on scene; time is muscle',
        },
        {
          id: 'c',
          text: 'Immediately transport to STEMI center, administer aspirin 324mg en route, request ALS intercept if possible',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Optimal care: right hospital, appropriate medication, minimal delay',
        },
        {
          id: 'd',
          text: 'Administer nitroglycerin 0.4mg SL for chest pain, then reassess before making transport decision',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Nitro is contraindicated with BP <100 systolic; could cause severe hypotension',
          consequences: 'Dangerous hypotension in already compromised patient',
        },
      ],
      correctAnswerId: 'c',
      explanation: `
**Clinical Reasoning - STEMI Transport Protocol:**

**Critical Decision Factors:**

**1. Destination Selection:**
- **STEMI Center Direct Transport**: AHA guidelines support bypassing closer hospitals for PCI-capable centers
- **Door-to-Balloon Time**: Goal <90 minutes from first medical contact
- **Scene Time**: Should not exceed 10 minutes for STEMI
- **Risk vs. Benefit**: 12 additional minutes to definitive care is acceptable

**2. Medication Administration:**
- **Aspirin 324mg**: Indicated, patient conscious and can chew
  - Reduces mortality by 23% in ACS
  - Patient already on 81mg daily (can give additional)
  - No contraindications reported
- **Nitroglycerin**: CONTRAINDICATED
  - BP 94/60 is below 100 systolic threshold
  - Could cause catastrophic hypotension
  - Risk of cardiac arrest recurrence

**3. ALS Intercept Decision:**
- Can request intercept en route if timing works
- Should NOT delay scene departure
- Paramedics can provide 12-lead, IV access, additional medications
- But should not add significant time delay

**Why Other Options Are Suboptimal:**
- **Option A**: Delays definitive PCI; transfer adds 30-60 minutes
- **Option B**: Unnecessary on-scene delay; transport immediately
- **Option D**: Nitro dangerous with hypotension; BP too low

**Key Clinical Pearl:**
"Right patient, right hospital, right time" - STEMI patients need PCI, not just a hospital. Bypass protocols save lives.

**Post-Arrest STEMI Management Priorities:**
1. ✅ Oxygen to maintain SpO2 94-99%
2. ✅ Aspirin (if conscious and can swallow)
3. ✅ IV access en route
4. ✅ Continuous cardiac monitoring
5. ✅ STEMI alert to receiving facility
6. ❌ NO nitro if BP <100
7. ❌ NO morphine (associated with worse outcomes)
      `,
      hints: [
        {
          level: 1,
          text: 'Where does a STEMI patient need to be for definitive treatment?',
          deductionPoints: 3,
        },
        {
          level: 2,
          text: 'Check the blood pressure before considering nitroglycerin - what is the threshold?',
          deductionPoints: 5,
        },
        {
          level: 3,
          text: 'STEMI center direct transport + aspirin. Nitro contraindicated with BP <100',
          deductionPoints: 10,
        },
      ],
      criticalDecision: true,
      pointValue: 30,
    },
  ],
  learningObjectives: [
    'Demonstrate high-quality CPR with minimal interruptions',
    'Recognize and manage return of spontaneous circulation (ROSC)',
    'Identify acute coronary syndrome presentation',
    'Apply appropriate post-arrest care protocols',
    'Make appropriate transport destination decisions for STEMI patients',
    'Understand aspirin and nitroglycerin indications/contraindications',
    'Recognize critical hypotension and its implications for treatment',
  ],
  difficulty: 'intermediate',
  bodySystem: 'cardiac',
  estimatedTime: 15,
  nremtRelevance: [
    'Cardiovascular emergencies',
    'Resuscitation and AED',
    'Patient assessment',
    'Pharmacology',
    'EMS operations',
  ],
  protocolReferences: [
    'AHA 2020 ACLS Guidelines',
    'AHA 2020 BLS Guidelines',
    'NREMT Cardiac Arrest Management Protocol',
    'Regional STEMI Bypass Protocol',
  ],
  created: '2025-11-28T00:00:00Z',
  lastUpdated: '2025-11-28T00:00:00Z',
};

/**
 * CASE 2: Multi-System Trauma - Motorcycle Collision
 * Learning Focus: Rapid trauma assessment, shock management, transport priority
 */
export const multiSystemTrauma: UnfoldingCase = {
  id: 'case-002-trauma-motorcycle',
  title: 'Multi-System Trauma - Motorcycle Collision',
  initialPresentation: `
You are dispatched to a highway intersection for a motorcycle vs. vehicle collision. On arrival, you find a 24-year-old male lying in the roadway, approximately 30 feet from his motorcycle. He is wearing a helmet but no protective leathers. Police have secured the scene. The patient is moaning and trying to move.
  `,
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Scene Size-up and Primary Assessment',
      newInformation: `
PRIMARY ASSESSMENT:
- Airway: Patent, moaning
- Breathing: Rapid, shallow, 28/min
- Circulation: Radial pulse weak and rapid (130 bpm), skin pale/cool/diaphoretic
- Disability: GCS 13 (E3, V4, M6), moving all extremities but guarding abdomen
- Exposure: Deformity to left thigh, road rash on arms/legs

CRITICAL FINDING:
- Large pool of blood around left leg
- Bright red blood spurting from an open wound on the left thigh
      `,
      question: 'What is your IMMEDIATE priority intervention?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Apply a cervical collar and immobilize to a backboard',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Spinal immobilization is important but secondary to exsanguinating hemorrhage',
          consequences: 'Patient bleeds out while you focus on the spine (C-A-B-C approach)',
        },
        {
          id: 'b',
          text: 'Apply direct pressure to the thigh wound; if ineffective, apply a tourniquet',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Controls life-threatening hemorrhage immediately (MARCH algorithm)',
        },
        {
          id: 'c',
          text: 'Administer high-flow oxygen via non-rebreather mask',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'Oxygen is needed for shock, but bleeding control takes precedence',
        },
        {
          id: 'd',
          text: 'Obtain a full set of vital signs including blood pressure',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Never delay life-saving interventions for diagnostics',
        },
      ],
      correctAnswerId: 'b',
      explanation: `
**Clinical Reasoning - Exsanguinating Hemorrhage:**
In trauma, massive hemorrhage kills faster than airway or breathing issues.

**MARCH Algorithm / C-ABC:**
1. **M**assive Hemorrhage - Control it FIRST (Tourniquet/Direct Pressure)
2. **A**irway
3. **R**espiration
4. **C**irculation
5. **H**ypothermia / Head Injury

**Why Other Options Are Incorrect:**
- **Option A (C-Spine):** Important, but patient will die from blood loss first.
- **Option C (Oxygen):** Necessary, but secondary to stopping the leak.
- **Option D (Vitals):** Treat the obvious life threat before measuring it.

**Key Clinical Pearl:**
"Tourniquets save lives." If direct pressure fails or the wound is arterial (spurting), apply a tourniquet high and tight immediately.
      `,
      hints: [
        {
          level: 1,
          text: 'Bright red spurting blood indicates arterial bleeding - this is a life threat.',
          deductionPoints: 2,
        },
        {
          level: 2,
          text: 'Follow the C-ABC or MARCH algorithm. What kills the patient fastest?',
          deductionPoints: 5,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
    {
      stageNumber: 2,
      stageTitle: 'Secondary Assessment and Shock Management',
      newInformation: `
INTERVENTIONS PERFORMED:
- Tourniquet applied to left thigh; bleeding controlled
- C-collar applied
- High-flow oxygen initiated

VITAL SIGNS:
- BP: 88/50 mmHg
- HR: 135 bpm
- RR: 30/min
- SpO2: 94% on O2
- Skin: Pale, cool, clammy

PHYSICAL EXAM FINDINGS:
- Abdomen: Rigid and distended, bruising around umbilicus (Cullen's sign)
- Pelvis: Stable
- Chest: Clear breath sounds bilaterally, no flail segments
      `,
      question: 'The patient is showing signs of decompensated shock. Based on the exam, what is the likely cause besides the leg injury?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Tension Pneumothorax',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'Breath sounds are clear; unlikely pneumothorax',
        },
        {
          id: 'b',
          text: 'Neurogenic Shock',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Neurogenic shock presents with bradycardia and warm skin',
        },
        {
          id: 'c',
          text: 'Intra-abdominal Hemorrhage',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Recognizing internal bleeding drives the decision for rapid transport to a trauma center',
        },
        {
          id: 'd',
          text: 'Cardiac Tamponade',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'Beck\'s triad (JVD, muffled heart sounds) not described',
        },
      ],
      correctAnswerId: 'c',
      explanation: `
**Clinical Reasoning - Shock Identification:**
The patient is in **Hypovolemic Shock** (Hemorrhagic).

**Evidence:**
1. **Hypotension (88/50)** + **Tachycardia (135)** = Decompensated Shock
2. **Rigid/Distended Abdomen** = Internal Bleeding (likely spleen/liver laceration)
3. **Cullen's Sign** = Retroperitoneal bleeding (late sign, but specific)
4. **Mechanism** = High-energy impact

**Why Other Options Are Incorrect:**
- **Tension Pneumo:** Breath sounds are clear.
- **Neurogenic Shock:** HR would be slow/normal, skin warm/dry.
- **Cardiac Tamponade:** No JVD or muffled heart sounds mentioned.

**Key Clinical Pearl:**
Unexplained shock in a trauma patient is abdominal or pelvic hemorrhage until proven otherwise. "The belly is a black box of blood."
      `,
      hints: [
        {
          level: 1,
          text: 'Rigid, distended abdomen suggests bleeding in which cavity?',
          deductionPoints: 3,
        },
        {
          level: 2,
          text: 'Tachycardia + Hypotension + Pale/Cool Skin = Hypovolemic Shock',
          deductionPoints: 5,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
    {
      stageNumber: 3,
      stageTitle: 'Transport Decision',
      newInformation: `
CURRENT STATUS:
- Patient is becoming less responsive (GCS dropping to 11)
- BP 80/40 mmHg
- HR 140 bpm

TRANSPORT OPTIONS:
- Community Hospital (Level 3 Trauma): 10 minutes away
- University Medical Center (Level 1 Trauma): 25 minutes away
- Helicopter Air Ambulance (HEMS): 15 minutes ETA to scene + 10 min flight to Level 1
      `,
      question: 'What is the MOST appropriate transport decision?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Transport to Community Hospital (Level 3) for stabilization',
          reasoningRequired: true,
          isDistractor: true,
          consequences: 'Delay in definitive surgical care (laparotomy) increases mortality',
        },
        {
          id: 'b',
          text: 'Rapid transport by ground to Level 1 Trauma Center (25 min)',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Direct access to trauma surgeons and blood products. 25 min is acceptable if HEMS is delayed.',
        },
        {
          id: 'c',
          text: 'Call for Helicopter (HEMS) and wait on scene',
          reasoningRequired: true,
          isDistractor: true,
          commonError: 'Waiting 15 mins for chopper + load time > 25 min ground transport',
          consequences: 'Extended scene time kills trauma patients. Only use HEMS if ground time > 30-45 mins or inaccessible.',
        },
        {
          id: 'd',
          text: 'Stay on scene to start two large-bore IVs before transport',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Never delay transport for IVs in trauma',
          consequences: 'Platinum 10 minutes violated. IVs should be done en route.',
        },
      ],
      correctAnswerId: 'b',
      explanation: `
**Clinical Reasoning - Trauma Transport Guidelines:**
The goal is **Definitive Surgical Care** (Operating Room).

**Decision Matrix:**
- **Level 1 Trauma Center:** Has 24/7 surgeons, OR, blood bank. Essential for internal bleeding.
- **Time Factor:** Ground (25 min) vs. Air (15 min wait + load + 10 min flight = ~30+ min). Ground is faster.
- **Level 3 Hospital:** Can stabilize, but patient needs surgery NOW. Transfer takes too long.

**Golden Hour:**
Patient is in decompensated shock. Every minute counts.
- **Stay and Play (IVs):** Wrong. Do it en route.
- **HEMS:** Only if ground transport is significantly longer (>45 mins) or extrication is prolonged.

**Key Clinical Pearl:**
"Diesel Therapy" is often the best treatment for trauma. Don't delay scene time for procedures that can be done in the ambulance.
      `,
      hints: [
        {
          level: 1,
          text: 'Calculate the total time for HEMS (wait + load + flight) vs Ground.',
          deductionPoints: 5,
        },
        {
          level: 2,
          text: 'This patient needs a surgeon to stop internal bleeding. Which facility has that?',
          deductionPoints: 5,
        },
      ],
      criticalDecision: true,
      pointValue: 30,
    },
  ],
  learningObjectives: [
    'Prioritize hemorrhage control (MARCH algorithm)',
    'Recognize signs of decompensated shock',
    'Identify indications for rapid trauma transport',
    'Differentiate between Level 1 and Level 3 trauma capabilities',
    'Understand the "Golden Hour" and "Platinum 10 Minutes"',
  ],
  difficulty: 'advanced',
  bodySystem: 'trauma',
  estimatedTime: 15,
  nremtRelevance: [
    'Trauma Assessment',
    'Bleeding and Shock',
    'EMS Operations',
  ],
  protocolReferences: [
    'PHTLS Guidelines',
    'CDC Field Triage Guidelines',
  ],
  created: '2025-11-29T00:00:00Z',
  lastUpdated: '2025-11-29T00:00:00Z',
};

/**
 * CASE 3: Pediatric Respiratory Distress - Asthma
 * Learning Focus: Pediatric assessment triangle, respiratory management
 */
export const pediatricRespiratory: UnfoldingCase = {
  id: 'case-003-peds-asthma',
  title: 'Pediatric Respiratory Distress',
  initialPresentation: `
You are called to an elementary school for a 7-year-old female with difficulty breathing. The school nurse meets you at the door and states the student has a history of asthma and "her inhaler isn't working."
  `,
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Pediatric Assessment Triangle (PAT)',
      newInformation: `
FROM THE DOORWAY (10 feet away):
- Appearance: Anxious, sitting in tripod position, focused on breathing
- Work of Breathing: Retractions present, audible wheezing without stethoscope, nasal flaring
- Circulation: Pale skin, circumoral cyanosis (blue around lips)
      `,
      question: 'Based on the PAT, what is your initial impression and immediate action?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Respiratory Distress - Administer oxygen via non-rebreather',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Correct. Patient is sick but compensating. Oxygen is first line.',
        },
        {
          id: 'b',
          text: 'Respiratory Failure - Begin bag-valve-mask ventilations',
          reasoningRequired: true,
          isDistractor: true,
          commonError: 'Patient is alert (Appearance) and moving air. BVM is for failure/arrest.',
        },
        {
          id: 'c',
          text: 'Stable - Obtain full history and vitals',
          reasoningRequired: false,
          isDistractor: true,
          consequences: 'Delay in treatment. PAT shows "Sick" patient.',
        },
        {
          id: 'd',
          text: 'Anaphylaxis - Administer EpiPen immediately',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'No hives or swelling mentioned yet. Asthma is known history.',
        },
      ],
      correctAnswerId: 'a',
      explanation: `
**Clinical Reasoning - Pediatric Assessment Triangle:**
The PAT helps you form a "Sick vs. Not Sick" impression instantly.

**Findings:**
- **Appearance:** Alert but anxious (Compensating)
- **Work of Breathing:** High (Retractions, Tripod)
- **Circulation:** Poor (Pale, Cyanosis)

**Conclusion:** Respiratory **Distress** (not yet Failure).
- **Failure** would involve altered mental status (Appearance) or slow/shallow breathing.
- **Action:** Oxygenation is the priority. BVM is aggressive if she is still alert.

**Key Clinical Pearl:**
In kids, "Appearance" (Mental Status) is the most sensitive indicator of oxygenation. If they are alert, they are likely perfusing the brain.
      `,
      hints: [
        {
          level: 1,
          text: 'Is the patient alert? If yes, it is likely Distress, not Failure.',
          deductionPoints: 3,
        },
      ],
      criticalDecision: true,
      pointValue: 20,
    },
    {
      stageNumber: 2,
      stageTitle: 'Assessment and Treatment',
      newInformation: `
VITAL SIGNS:
- HR: 140 bpm
- RR: 36/min
- SpO2: 88% on Room Air -> 94% on NRB
- Lung Sounds: Tight expiratory wheezes bilaterally; minimal air movement in bases

HISTORY:
- History of asthma, hospitalized once last year
- Ran out of Albuterol inhaler 2 days ago
- Coughing for 2 days, got worse after recess today
      `,
      question: 'What is the indicated medication intervention?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Administer Albuterol 2.5mg via nebulizer',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Bronchodilator opens airways, treating the root cause (bronchoconstriction).',
        },
        {
          id: 'b',
          text: 'Administer Epinephrine 1:1000 IM',
          reasoningRequired: true,
          isDistractor: true,
          differentialConsideration: 'Epi is for anaphylaxis or severe status asthmaticus (failure). Start with Albuterol.',
        },
        {
          id: 'c',
          text: 'Administer Nitroglycerin',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Contraindicated in pediatrics and not indicated for asthma.',
        },
        {
          id: 'd',
          text: 'Have patient breathe into a paper bag',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Dangerous. This is not hyperventilation syndrome.',
        },
      ],
      correctAnswerId: 'a',
      explanation: `
**Clinical Reasoning - Asthma Management:**
Pathophysiology: Bronchoconstriction + Inflammation.

**Treatment:**
1. **Oxygen:** Correct hypoxia.
2. **Beta-2 Agonist (Albuterol):** Relaxes smooth muscle to open airways.
3. **Anticholinergic (Atrovent):** Often mixed (DuoNeb) for additive effect.

**Why Not Epi?**
Epinephrine is reserved for:
1. Anaphylaxis (hives, swelling, hypotension).
2. "Status Asthmaticus" - impending respiratory failure where air movement is too poor for nebulizers to work.
Currently, she has wheezes (air movement), so Albuterol is the first step.

**Key Clinical Pearl:**
"All that wheezes is not asthma" - but with a history of asthma and no signs of anaphylaxis/heart failure, treat for asthma.
      `,
      hints: [
        {
          level: 1,
          text: 'Beta-agonists are the first-line treatment for bronchospasm.',
          deductionPoints: 5,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
  ],
  learningObjectives: [
    'Apply the Pediatric Assessment Triangle (PAT)',
    'Differentiate Respiratory Distress vs. Failure',
    'Treat pediatric asthma exacerbations',
    'Recognize signs of hypoxia in children',
  ],
  difficulty: 'intermediate',
  bodySystem: 'pediatric',
  estimatedTime: 15,
  nremtRelevance: [
    'Pediatric Emergencies',
    'Respiratory Emergencies',
    'Pharmacology',
  ],
  protocolReferences: [
    'NREMT Pediatric Respiratory Distress',
    'PALS Guidelines',
  ],
  created: '2025-11-29T00:00:00Z',
  lastUpdated: '2025-11-29T00:00:00Z',
};

/**
 * CASE 4: Diabetic Emergency - Hypoglycemia
 * Learning Focus: Altered mental status assessment, oral glucose vs glucagon
 */
export const diabeticEmergency: UnfoldingCase = {
  id: 'case-004-diabetic-hypo',
  title: 'Diabetic Emergency - "Acting Strange"',
  initialPresentation: `
You are dispatched to an office building for a 45-year-old male "acting strange." Co-workers say he started sweating profusely and talking nonsense during a meeting. He has a history of Type 1 Diabetes.
  `,
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Assessment and Vitals',
      newInformation: `
PRIMARY ASSESSMENT:
- Airway: Patent
- Breathing: Normal rate/depth
- Circulation: Rapid pulse, skin pale/cool/diaphoretic (soaking wet)
- Disability: Confused, disoriented to time/place. GCS 14 (E4, V4, M6).

VITAL SIGNS:
- BP: 130/80
- HR: 110 bpm
- RR: 18/min
- SpO2: 98% RA
      `,
      question: 'What is the most critical diagnostic tool to use right now?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Blood Glucose Glucometer',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Identifies the likely cause (hypoglycemia) immediately.',
        },
        {
          id: 'b',
          text: 'Stroke Scale (FAST)',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'Stroke is a differential, but "pale/cool/diaphoretic" strongly suggests hypoglycemia.',
        },
        {
          id: 'c',
          text: '12-Lead ECG',
          reasoningRequired: false,
          isDistractor: true,
          differentialConsideration: 'Important later, but BGL is the priority for AMS in a diabetic.',
        },
        {
          id: 'd',
          text: 'Pulse Oximeter',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Already done (98%). Hypoxia is ruled out.',
        },
      ],
      correctAnswerId: 'a',
      explanation: `
**Clinical Reasoning - AEIOU-TIPS:**
For Altered Mental Status (AMS), always check:
1. **Oxygen** (Hypoxia)
2. **Glucose** (Hypoglycemia)
3. **Stroke** (CVA)

**Clues for Hypoglycemia:**
- History of Type 1 Diabetes
- Sudden onset ("during a meeting")
- Sympathetic discharge: Tachycardia, Diaphoresis (Sweating), Pale skin.
- Stroke patients are usually dry; Hypoglycemic patients are "wet".

**Key Clinical Pearl:**
"Cool and clammy, give them candy." (Hypoglycemia). "Hot and dry, sugar is high." (Hyperglycemia/DKA).
      `,
      hints: [
        {
          level: 1,
          text: 'Diabetic + Confused + Sweating = ?',
          deductionPoints: 2,
        },
      ],
      criticalDecision: true,
      pointValue: 20,
    },
    {
      stageNumber: 2,
      stageTitle: 'Treatment',
      newInformation: `
DIAGNOSTIC UPDATE:
- Blood Glucose: 38 mg/dL (Low)
- Patient is conscious but confused. He can swallow on command and has a gag reflex.
      `,
      question: 'What is the preferred treatment?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Administer Oral Glucose (15g)',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Safe, effective, and non-invasive since airway is patent.',
        },
        {
          id: 'b',
          text: 'Administer Glucagon 1mg IM',
          reasoningRequired: true,
          isDistractor: true,
          differentialConsideration: 'Glucagon is second-line if patient cannot swallow or IV access fails.',
        },
        {
          id: 'c',
          text: 'Give him a diet soda',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Diet soda has no sugar! Must be regular soda or juice.',
        },
        {
          id: 'd',
          text: 'Wait for ALS to start an IV',
          reasoningRequired: false,
          isDistractor: true,
          consequences: 'Delays treatment. Oral glucose works fast.',
        },
      ],
      correctAnswerId: 'a',
      explanation: `
**Clinical Reasoning - Hypoglycemia Treatment:**
1. **Can swallow?** Yes -> **Oral Glucose** (Tube or Juice/Soda).
2. **Cannot swallow?** No -> **IV Dextrose** (ALS) or **Glucagon IM** (BLS/ALS).

Since the patient has a gag reflex and can swallow, oral glucose is the safest and most direct route.

**Key Clinical Pearl:**
Always re-check BGL 15 minutes after treatment. The "Rule of 15": 15g carbs, wait 15 mins, recheck.
      `,
      hints: [
        {
          level: 1,
          text: 'If the airway is patent, use the gut.',
          deductionPoints: 5,
        },
      ],
      criticalDecision: true,
      pointValue: 25,
    },
  ],
  learningObjectives: [
    'Assess Altered Mental Status (AEIOU-TIPS)',
    'Recognize signs of hypoglycemia vs hyperglycemia',
    'Select appropriate glucose administration route',
  ],
  difficulty: 'basic',
  bodySystem: 'medical',
  estimatedTime: 10,
  nremtRelevance: [
    'Endocrine Emergencies',
    'Patient Assessment',
  ],
  protocolReferences: [
    'NREMT Diabetic Emergencies',
  ],
  created: '2025-11-29T00:00:00Z',
  lastUpdated: '2025-11-29T00:00:00Z',
};

/**
 * CASE 5: Behavioral/Medical - Excited Delirium
 * Learning Focus: Safety, medical causes of behavior, restraint
 */
export const behavioralMedical: UnfoldingCase = {
  id: 'case-005-behavioral-overdose',
  title: 'Behavioral Emergency - "Excited Delirium"',
  initialPresentation: `
Police request EMS for a 30-year-old male "acting crazy" in a parking lot. On arrival, the patient is shouting incoherently, pacing rapidly, and appears aggressive. He is shirtless and sweating profusely despite 40°F weather.
  `,
  stages: [
    {
      stageNumber: 1,
      stageTitle: 'Scene Safety and Initial Approach',
      newInformation: `
SCENE SIZE-UP:
- Patient is agitated, shouting at invisible people.
- Police are present but have not restrained him.
- No weapons visible.
      `,
      question: 'What is your FIRST priority?',
      questionType: 'single_choice',
      options: [
        {
          id: 'a',
          text: 'Ensure scene safety and request police assistance for restraint if needed',
          reasoningRequired: true,
          isDistractor: false,
          consequences: 'Safety first. You cannot treat if you are injured.',
        },
        {
          id: 'b',
          text: 'Approach the patient to check a pulse',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'Dangerous. Patient is volatile.',
        },
        {
          id: 'c',
          text: 'Administer Naloxone (Narcan)',
          reasoningRequired: false,
          isDistractor: true,
          commonError: 'No signs of opioid overdose (respiratory depression). This is excitation.',
        },
      ],
      correctAnswerId: 'a',
      explanation: `
**Clinical Reasoning - Behavioral Emergencies:**
1. **Safety:** Never approach a combative patient alone.
2. **Medical vs. Psychiatric:** This presentation (Sweating, Agitation, Hyperthermia) suggests **Excited Delirium** (Medical Emergency), often drug-induced (Cocaine/Meth/PCP).

**Key Clinical Pearl:**
"Excited Delirium" can lead to sudden cardiac arrest. These patients are hyperthermic and acidotic.
      `,
      hints: [],
      criticalDecision: true,
      pointValue: 20,
    },
  ],
  learningObjectives: [
    'Prioritize scene safety in behavioral emergencies',
    'Recognize Excited Delirium Syndrome',
    'Differentiate medical vs psychiatric causes',
  ],
  difficulty: 'intermediate',
  bodySystem: 'behavioral',
  estimatedTime: 10,
  nremtRelevance: [
    'Psychiatric Emergencies',
    'Safety and Wellness',
  ],
  protocolReferences: [
    'NREMT Behavioral Emergencies',
  ],
  created: '2025-11-29T00:00:00Z',
  lastUpdated: '2025-11-29T00:00:00Z',
};

// Export case collection
export const UNFOLDING_CASES: UnfoldingCase[] = [
  cardiacArrestROSC,
  multiSystemTrauma,
  pediatricRespiratory,
  diabeticEmergency,
  behavioralMedical,
];

export default UNFOLDING_CASES;
