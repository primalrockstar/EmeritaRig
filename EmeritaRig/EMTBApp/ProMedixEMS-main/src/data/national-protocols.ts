// National Protocol Foundation Data (NHTSA 2022 National Model EMS Clinical Guidelines)
// Shared dataset for protocol-aligned modules across the platform

export interface NationalProtocol {
  id: string;
  title: string;
  description: string;
  pageRange: string;
  documentSection: string;
  keyPoints: string[];
  clinicalIndications: string[];
  contraindications: string[];
  procedures: string[];
  dosages?: {
    medication: string;
    adult: string;
    pediatric: string;
    notes: string;
  }[];
  equipmentRequired: string[];
  legalConsiderations: string[];
  qualityAssurance: string[];
}

export const NATIONAL_PROTOCOL_FOUNDATION: NationalProtocol[] = [
  {
    id: 'acute-coronary-syndrome',
    title: 'Acute Coronary Syndrome',
    description: 'Evidence-based assessment and treatment protocols for suspected cardiac events',
    pageRange: 'Pages 45-78',
    documentSection: 'Section 3.2 - Cardiovascular Emergencies',
    keyPoints: [
      '12-lead ECG acquisition within 10 minutes',
      'Aspirin administration unless contraindicated',
      'Nitroglycerin for chest pain with systolic BP >90',
      'Continuous cardiac monitoring',
      'Rapid transport to appropriate facility'
    ],
    clinicalIndications: [
      'Chest pain or discomfort',
      'Shortness of breath',
      'Nausea or vomiting',
      'Diaphoresis',
      'Arm, jaw, or back pain',
      'Weakness or fatigue'
    ],
    contraindications: [
      'Aspirin allergy (for aspirin)',
      'Systolic BP <90 mmHg (for nitroglycerin)',
      'Use of phosphodiesterase inhibitors within 24-48 hours'
    ],
    procedures: [
      'Primary assessment and vital signs',
      '12-lead ECG',
      'Establish IV access',
      'Administer oxygen if SpO2 <94%',
      'Pain assessment using 1-10 scale',
      'Medication administration per protocol'
    ],
    dosages: [
      {
        medication: 'Aspirin',
        adult: '324mg chewed',
        pediatric: 'Not typically indicated',
        notes: 'Give immediately unless contraindicated'
      },
      {
        medication: 'Nitroglycerin',
        adult: '0.4mg sublingual, may repeat x2',
        pediatric: 'Consult medical control',
        notes: 'Check BP before each dose'
      }
    ],
    equipmentRequired: [
      '12-lead ECG machine',
      'IV supplies',
      'Oxygen delivery system',
      'Cardiac monitor',
      'Medications as listed'
    ],
    legalConsiderations: [
      'Obtain informed consent when possible',
      'Document refusal if patient declines care',
      'Follow scope of practice guidelines',
      'Medical control consultation as required'
    ],
    qualityAssurance: [
      'Door-to-balloon time documentation',
      'Medication administration compliance',
      'ECG transmission quality',
      'Transport destination appropriateness'
    ]
  },
  {
    id: 'respiratory-distress',
    title: 'Respiratory Distress and Failure',
    description: 'Comprehensive airway management and respiratory support protocols',
    pageRange: 'Pages 112-145',
    documentSection: 'Section 4.1 - Respiratory Emergencies',
    keyPoints: [
      'Immediate airway assessment and positioning',
      'High-flow oxygen for severe distress',
      'Albuterol for bronchospasm',
      'Positive pressure ventilation for failure',
      'Rapid sequence intubation readiness'
    ],
    clinicalIndications: [
      'Shortness of breath',
      'Abnormal respiratory rate or effort',
      'Cyanosis or altered skin color',
      'Use of accessory muscles',
      'Altered mental status',
      'SpO2 <90% on room air'
    ],
    contraindications: [
      'Known allergy to beta-agonists (for albuterol)',
      'Tension pneumothorax (relative)',
      'Complete airway obstruction requiring surgical intervention'
    ],
    procedures: [
      'Airway positioning and suctioning',
      'Oxygen administration',
      'Nebulizer treatment setup',
      'Bag-valve-mask ventilation',
      'Advanced airway placement if indicated',
      'Continuous monitoring'
    ],
    dosages: [
      {
        medication: 'Albuterol',
        adult: '2.5mg nebulized',
        pediatric: '0.5mL (2.5mg) in 3mL NS',
        notes: 'May repeat every 20 minutes'
      },
      {
        medication: 'Oxygen',
        adult: '15L/min via NRB mask',
        pediatric: 'Adjust flow based on age/size',
        notes: 'Titrate to SpO2 >94%'
      }
    ],
    equipmentRequired: [
      'Oxygen delivery devices',
      'Nebulizer setup',
      'Bag-valve-mask',
      'Suction equipment',
      'Pulse oximetry',
      'Capnography if available'
    ],
    legalConsiderations: [
      'Implied consent for life-threatening conditions',
      'Parent/guardian consent for minors',
      'Documentation of treatment rationale',
      'Scope of practice compliance'
    ],
    qualityAssurance: [
      'Response time to treatment',
      'Oxygen saturation improvement',
      'Medication effectiveness',
      'Airway management success rate'
    ]
  },
  {
    id: 'traumatic-brain-injury',
    title: 'Traumatic Brain Injury',
    description: 'Evidence-based management of head trauma and neurological emergencies',
    pageRange: 'Pages 89-111',
    documentSection: 'Section 5.3 - Neurological Emergencies',
    keyPoints: [
      'Rapid neurological assessment',
      'Maintain adequate oxygenation and ventilation',
      'Control bleeding and stabilize C-spine',
      'Monitor for signs of increased ICP',
      'Transport to trauma center'
    ],
    clinicalIndications: [
      'Head trauma with loss of consciousness',
      'Altered mental status',
      'Unequal pupils',
      'Focal neurological deficits',
      'Severe headache',
      'Projectile vomiting'
    ],
    contraindications: [
      'None absolute - treat according to presentation',
      'Avoid hyperventilation unless herniation signs',
      'Careful with sedatives unless intubating'
    ],
    procedures: [
      'Glasgow Coma Scale assessment',
      'Spinal immobilization',
      'Airway management with C-spine protection',
      'Frequent neurological checks',
      'Blood glucose assessment',
      'Temperature management'
    ],
    dosages: [
      {
        medication: 'Oxygen',
        adult: 'Maintain SpO2 >94%',
        pediatric: 'Same target saturation',
        notes: 'Avoid hyperoxia'
      },
      {
        medication: 'Normal Saline',
        adult: '250-500mL bolus if hypotensive',
        pediatric: '20mL/kg bolus',
        notes: 'Maintain systolic BP >90'
      }
    ],
    equipmentRequired: [
      'Spinal immobilization devices',
      'Glasgow Coma Scale reference',
      'Oxygen delivery system',
      'Blood glucose meter',
      'IV supplies',
      'Transport stretcher with head elevation'
    ],
    legalConsiderations: [
      'Implied consent for altered patients',
      'Mandatory reporting for suspected abuse',
      'Documentation of neurological findings',
      'Transport to appropriate trauma facility'
    ],
    qualityAssurance: [
      'Time to definitive care',
      'Neurological deterioration prevention',
      'Appropriate facility selection',
      'Spinal immobilization compliance'
    ]
  },
  {
    id: 'anaphylaxis',
    title: 'Anaphylaxis and Severe Allergic Reactions',
    description: 'Rapid recognition and treatment of life-threatening allergic reactions',
    pageRange: 'Pages 168-203',
    documentSection: 'Section 6.4 - Immunological Emergencies',
    keyPoints: [
      'Early recognition of anaphylaxis',
      'Immediate epinephrine administration',
      'Aggressive airway management',
      'Fluid resuscitation for shock',
      'Rapid transport to emergency facility'
    ],
    clinicalIndications: [
      'Known allergen exposure',
      'Rapid onset of symptoms',
      'Skin reactions (hives, swelling)',
      'Respiratory compromise',
      'Hypotension or shock',
      'Gastrointestinal symptoms'
    ],
    contraindications: [
      'No absolute contraindications for epinephrine in anaphylaxis',
      'Use caution with severe hypertension',
      'Consider dosage in elderly patients'
    ],
    procedures: [
      'Remove or discontinue allergen if possible',
      'Administer epinephrine immediately',
      'Establish large-bore IV access',
      'Airway management as needed',
      'Continuous cardiac monitoring',
      'Prepare for repeat epinephrine'
    ],
    dosages: [
      {
        medication: 'Epinephrine 1:1000',
        adult: '0.3-0.5mg IM',
        pediatric: '0.01mg/kg IM (max 0.3mg)',
        notes: 'May repeat every 5-15 minutes'
      },
      {
        medication: 'Diphenhydramine',
        adult: '25-50mg IV/IM',
        pediatric: '1-2mg/kg IV/IM',
        notes: 'Adjunctive therapy, not first-line'
      }
    ],
    equipmentRequired: [
      'Epinephrine auto-injectors',
      'Advanced airway equipment',
      'IV supplies and fluids',
      'Cardiac monitor',
      'Blood pressure monitoring',
      'Oxygen delivery devices'
    ],
    legalConsiderations: [
      'Implied consent for life-threatening emergency',
      'Use of patient\'s prescribed epinephrine',
      'Document allergen if known',
      'Scope of practice for medication administration'
    ],
    qualityAssurance: [
      'Time to epinephrine administration',
      'Symptom resolution documentation',
      'Appropriate medication dosing',
      'Transport time optimization'
    ]
  },
  {
    id: 'stroke-management',
    title: 'Suspected Stroke (CVA)',
    description: 'Time-sensitive stroke identification, assessment, and transport priorities',
    pageRange: 'Pages 146-172',
    documentSection: 'Section 5.1 - Neurological Emergencies',
    keyPoints: [
      'Use validated stroke scale (e.g., FAST-ED, LAMS)',
      'Document last known well time',
      'Rapid glucose assessment',
      'Prioritize stroke-capable facility',
      'Advance notification to receiving hospital'
    ],
    clinicalIndications: [
      'Sudden facial droop or weakness',
      'Arm drift or unilateral weakness',
      'Speech difficulty or aphasia',
      'Visual disturbances',
      'Coordination or balance issues',
      'Altered mental status of sudden onset'
    ],
    contraindications: [
      'None for assessment — manage airway and transport',
      'Avoid hypotension and hyperventilation',
      'Do not delay transport for IV access'
    ],
    procedures: [
      'Primary assessment with ABC stabilization',
      'Stroke scale application and documentation',
      'Check blood glucose to rule out hypoglycemia',
      'Monitor vital signs and cardiac rhythm',
      'Transport to stroke center based on local protocols'
    ],
    dosages: [
      {
        medication: 'Oxygen',
        adult: 'Titrate to SpO2 94-99%',
        pediatric: 'Same target saturation',
        notes: 'Avoid routine high-flow oxygen if saturation adequate'
      }
    ],
    equipmentRequired: [
      'Glucose meter and supplies',
      'Stroke scale reference',
      'Cardiac monitor',
      'Blood pressure cuff',
      'Oxygen delivery devices'
    ],
    legalConsiderations: [
      'Document last known well and witness statements',
      'Follow destination determination policies',
      'Communicate assessment findings to hospital',
      'Maintain HIPAA compliance'
    ],
    qualityAssurance: [
      'On-scene time metrics',
      'Stroke scale accuracy',
      'Pre-notification compliance',
      'Appropriate destination selection'
    ]
  },
  {
    id: 'diabetic-emergencies',
    title: 'Diabetic Emergencies',
    description: 'Recognition and management of hypoglycemia and hyperglycemia',
    pageRange: 'Pages 204-228',
    documentSection: 'Section 3.5 - Endocrine and Metabolic Emergencies',
    keyPoints: [
      'Check blood glucose early',
      'Treat hypoglycemia immediately',
      'Assess for altered mental status',
      'Consider oral glucose if patient can swallow',
      'Monitor for co-morbid conditions'
    ],
    clinicalIndications: [
      'Altered mental status',
      'Diaphoresis or pallor',
      'Seizure activity',
      'Signs of dehydration',
      'History of diabetes',
      'High or low blood glucose reading'
    ],
    contraindications: [
      'Oral glucose contraindicated if patient cannot protect airway',
      'Use caution with excessive fluids in heart failure',
      'Follow medical direction for insulin pumps'
    ],
    procedures: [
      'Blood glucose measurement',
      'Airway management as needed',
      'Oral glucose administration when appropriate',
      'IV access and fluid support if within scope',
      'Continuous monitoring of mental status'
    ],
    dosages: [
      {
        medication: 'Oral Glucose',
        adult: '15-24 grams PO',
        pediatric: '0.3 g/kg (max 15 g)',
        notes: 'Only if patient can swallow and follow commands'
      },
      {
        medication: 'Normal Saline',
        adult: '250-500mL IV bolus for hypotension',
        pediatric: '20mL/kg bolus',
        notes: 'Consult medical direction for repeat dosing'
      }
    ],
    equipmentRequired: [
      'Glucose meter',
      'Oral glucose gel',
      'IV supplies (if scope allows)',
      'Oxygen delivery devices',
      'Vital sign monitoring'
    ],
    legalConsiderations: [
      'Document glucose readings and interventions',
      'Note patient capacity for refusal',
      'Follow local protocol for hypoglycemia refusals',
      'Maintain records of insulin pump adjustments'
    ],
    qualityAssurance: [
      'Documentation completeness',
      'Repeat glucose measurement after treatment',
      'Transport decisions based on improvement',
      'Adherence to standing orders'
    ]
  },
  {
    id: 'shock-hypoperfusion',
    title: 'Shock and Hypoperfusion',
    description: 'Early identification and management of shock states at the EMT level',
    pageRange: 'Pages 229-256',
    documentSection: 'Section 4.3 - Shock Management',
    keyPoints: [
      'Rapid recognition of perfusion deficits',
      'Control external bleeding immediately',
      'Maintain airway and ventilation',
      'Initiate fluid resuscitation per protocol',
      'Prioritize transport to appropriate facility'
    ],
    clinicalIndications: [
      'Hypotension or narrow pulse pressure',
      'Tachycardia',
      'Cool clammy skin',
      'Altered mental status',
      'Delayed capillary refill',
      'Suspected internal or external blood loss'
    ],
    contraindications: [
      'Avoid Trendelenburg positioning',
      'Use caution with excessive fluids in cardiogenic shock',
      'Follow trauma protocols for spinal precautions'
    ],
    procedures: [
      'Scene safety and mechanism assessment',
      'Airway support with oxygen supplementation',
      'Bleeding control (tourniquets, hemostatic agents)',
      'Patient positioning to optimize perfusion',
      'Rapid transport with ongoing reassessment'
    ],
    dosages: [
      {
        medication: 'Normal Saline',
        adult: '500-1000mL bolus titrated to perfusion',
        pediatric: '20mL/kg bolus',
        notes: 'Follow local trauma protocols for permissive hypotension'
      }
    ],
    equipmentRequired: [
      'Bleeding control kit',
      'BP cuff and monitoring',
      'Oxygen delivery devices',
      'Backboard or vacuum mattress',
      'IV supplies if within scope'
    ],
    legalConsiderations: [
      'Document mechanism and interventions',
      'Use approved tourniquets and record time applied',
      'Follow trauma triage criteria',
      'Coordinate with receiving facility'
    ],
    qualityAssurance: [
      'Hemorrhage control effectiveness',
      'Transport time metrics',
      'Vital sign trends',
      'Protocol compliance audits'
    ]
  },
  {
    id: 'obstetric-emergencies',
    title: 'Obstetric Emergencies',
    description: 'Prehospital management of obstetric complications within EMT scope',
    pageRange: 'Pages 257-288',
    documentSection: 'Section 7.2 - Obstetrics',
    keyPoints: [
      'Assess stage of labor and imminent delivery',
      'Prepare for neonatal resuscitation',
      'Manage postpartum hemorrhage',
      'Position patient to prevent supine hypotension',
      'Rapid transport for high-risk presentations'
    ],
    clinicalIndications: [
      'Pregnant patient with abdominal pain',
      'Vaginal bleeding or fluid loss',
      'Contractions or crowning',
      'Hypertensive symptoms',
      'Decreased fetal movement',
      'History of complications in current pregnancy'
    ],
    contraindications: [
      'Do not delay transport for non-imminent delivery',
      'Avoid internal exams',
      'Follow breech or prolapse protocols per medical control'
    ],
    procedures: [
      'Primary assessment and vital signs',
      'Assess fetal position and presentation',
      'Support delivery if unavoidable',
      'Manage cord or limb prolapse per protocol',
      'Provide postpartum care and neonatal warming'
    ],
    dosages: [
      {
        medication: 'Oxygen',
        adult: 'Titrate to SpO2 ≥ 95%',
        pediatric: 'N/A',
        notes: 'Provide supplemental oxygen to mother as needed'
      }
    ],
    equipmentRequired: [
      'OB delivery kit',
      'Neonatal resuscitation equipment',
      'Suction device',
      'Warm blankets',
      'Blood pressure monitoring'
    ],
    legalConsiderations: [
      'Document delivery times and complications',
      'Maintain mother and infant identification',
      'Follow mandatory reporting for suspected abuse',
      'Consult medical control for high-risk scenarios'
    ],
    qualityAssurance: [
      'Maternal and neonatal outcomes',
      'Documentation completeness',
      'Compliance with high-risk transport guidelines',
      'Postpartum hemorrhage management review'
    ]
  },
  {
    id: 'stroke-cva',
    title: 'Stroke / Cerebrovascular Accident (CVA)',
    description: 'Time-critical assessment and management of acute stroke patients',
    pageRange: 'Pages 189-212',
    documentSection: 'Section 5.3 - Neurological Emergencies',
    keyPoints: [
      'Establish exact time of symptom onset',
      'Use stroke assessment scale (Cincinnati or FAST)',
      'Obtain blood glucose to rule out hypoglycemia',
      'Rapid transport to stroke center',
      'Minimize scene and transport times'
    ],
    clinicalIndications: [
      'Sudden onset facial droop',
      'Arm drift or weakness',
      'Slurred speech or inability to speak',
      'Sudden severe headache',
      'Vision changes',
      'Altered mental status',
      'Loss of balance or coordination'
    ],
    contraindications: [
      'Do not give anything by mouth',
      'Do not delay transport for non-critical interventions',
      'Avoid over-oxygenation (target SpO2 94-98%)'
    ],
    procedures: [
      'Rapid neurological assessment',
      'Cincinnati Stroke Scale or FAST assessment',
      'Blood glucose check',
      'Vital signs including oxygen saturation',
      'Position patient with head elevated 30° if no c-spine concern',
      'Rapid transport to designated stroke center'
    ],
    equipmentRequired: [
      'Blood glucose meter',
      'Pulse oximeter',
      'Blood pressure monitor',
      'Oxygen delivery system',
      'Stroke assessment tools'
    ],
    legalConsiderations: [
      'Document exact time of symptom onset',
      'Document last known normal time',
      'Maintain detailed neurological assessment',
      'Follow destination protocols for stroke centers'
    ],
    qualityAssurance: [
      'Scene-to-door time <60 minutes',
      'Stroke scale documentation',
      'Appropriate hospital destination',
      'Time of onset documentation accuracy'
    ]
  },
  {
    id: 'seizures',
    title: 'Seizures',
    description: 'Management of active seizures and postictal patients',
    pageRange: 'Pages 213-238',
    documentSection: 'Section 5.4 - Neurological Emergencies',
    keyPoints: [
      'Protect patient from injury during seizure',
      'Do not restrain or insert objects in mouth',
      'Position for airway protection after seizure',
      'Monitor for status epilepticus (>5 minutes)',
      'Check blood glucose'
    ],
    clinicalIndications: [
      'Witnessed seizure activity',
      'Postictal confusion or drowsiness',
      'History of seizure disorder',
      'Tongue biting or incontinence',
      'Muscle rigidity or jerking movements'
    ],
    contraindications: [
      'Never restrain actively seizing patient',
      'Do not insert anything in mouth',
      'Avoid excessive stimulation in postictal phase'
    ],
    procedures: [
      'Protect from injury, remove hazards',
      'Maintain airway once seizure stops',
      'Position on side (recovery position)',
      'Check blood glucose',
      'Suction if needed',
      'Provide oxygen if hypoxic',
      'Monitor for recurrent seizures'
    ],
    dosages: [
      {
        medication: 'Oxygen',
        adult: 'Titrate to SpO2 ≥ 94%',
        pediatric: 'Same',
        notes: 'Many postictal patients are hypoxic'
      },
      {
        medication: 'Oral Glucose',
        adult: '15g if hypoglycemic and able to swallow',
        pediatric: 'Per protocol',
        notes: 'Only if patient can protect airway'
      }
    ],
    equipmentRequired: [
      'Suction device',
      'Airway adjuncts',
      'Blood glucose meter',
      'Oxygen delivery system',
      'Padding to protect patient'
    ],
    legalConsiderations: [
      'Implied consent during active seizure',
      'Document seizure characteristics and duration',
      'Mandatory reporting for first-time seizure in some states'
    ],
    qualityAssurance: [
      'Appropriate airway management',
      'Blood glucose documentation',
      'Seizure duration and characteristics documented',
      'Treatment of underlying causes'
    ]
  },
  {
    id: 'diabetic-emergencies',
    title: 'Diabetic Emergencies',
    description: 'Assessment and treatment of hypo- and hyperglycemic emergencies',
    pageRange: 'Pages 239-265',
    documentSection: 'Section 5.5 - Metabolic Emergencies',
    keyPoints: [
      'Check blood glucose on all altered mental status patients',
      'Hypoglycemia is immediately life-threatening',
      'Oral glucose if patient can protect airway',
      'Monitor for improvement after glucose administration',
      'Encourage transport even if patient improves'
    ],
    clinicalIndications: [
      'Altered mental status in diabetic patient',
      'Diaphoresis and shakiness',
      'Confusion or combativeness',
      'History of diabetes',
      'Fruity breath odor (DKA)',
      'Polyuria, polydipsia (hyperglycemia)'
    ],
    contraindications: [
      'Oral glucose contraindicated if unable to swallow',
      'Do not give if patient cannot protect airway'
    ],
    procedures: [
      'Rapid assessment and blood glucose check',
      'Administer oral glucose if <60 mg/dL and able to swallow',
      'Reassess in 10-15 minutes',
      'Provide oxygen if hypoxic',
      'Monitor mental status',
      'Rapid transport if no improvement'
    ],
    dosages: [
      {
        medication: 'Oral Glucose',
        adult: '15-20g (1 tube)',
        pediatric: '10-15g per protocol',
        notes: 'Patient must be able to swallow and protect airway'
      }
    ],
    equipmentRequired: [
      'Blood glucose meter',
      'Oral glucose gel/paste',
      'Oxygen delivery system',
      'Suction device'
    ],
    legalConsiderations: [
      'Altered patients lack capacity to refuse',
      'Implied consent applies',
      'Document glucose readings and interventions',
      'Encourage transport even if improved'
    ],
    qualityAssurance: [
      'Blood glucose documentation',
      'Response to treatment',
      'Repeat glucose measurements',
      'Transport compliance for improved patients'
    ]
  },
  {
    id: 'allergic-reactions-anaphylaxis',
    title: 'Allergic Reactions and Anaphylaxis',
    description: 'Recognition and emergency treatment of severe allergic reactions',
    pageRange: 'Pages 266-295',
    documentSection: 'Section 6.1 - Immunologic Emergencies',
    keyPoints: [
      'Recognize signs of anaphylaxis early',
      'Epinephrine is first-line treatment',
      'Be prepared for repeat doses',
      'Rapid deterioration possible',
      'Transport all anaphylaxis patients'
    ],
    clinicalIndications: [
      'Hives or urticaria',
      'Swelling of face, lips, or tongue',
      'Difficulty breathing or wheezing',
      'Stridor',
      'Hypotension',
      'Recent exposure to known allergen',
      'Sense of impending doom'
    ],
    contraindications: [
      'No absolute contraindications in life-threatening anaphylaxis',
      'Epinephrine caution in elderly with cardiac history (still give if needed)'
    ],
    procedures: [
      'Remove allergen if possible',
      'Assist with or administer epinephrine per protocol',
      'High-flow oxygen',
      'Rapid transport',
      'Monitor for repeat dosing need',
      'Position patient appropriately based on breathing/BP'
    ],
    dosages: [
      {
        medication: 'Epinephrine Auto-Injector',
        adult: '0.3mg IM (EpiPen)',
        pediatric: '0.15mg IM (EpiPen Jr for <30kg)',
        notes: 'May repeat in 5-15 minutes if no improvement'
      }
    ],
    equipmentRequired: [
      'Epinephrine auto-injectors',
      'Oxygen delivery system',
      'Blood pressure monitor',
      'Pulse oximeter',
      'BVM for respiratory support'
    ],
    legalConsiderations: [
      'Standing orders vs. online medical control',
      'Document allergen and exposure',
      'Patient education about carrying epinephrine',
      'Refusal strongly discouraged'
    ],
    qualityAssurance: [
      'Time to epinephrine administration',
      'Repeat dosing when indicated',
      'Appropriate hospital destination',
      'Documentation of allergen and response'
    ]
  },
  {
    id: 'behavioral-emergencies',
    title: 'Behavioral and Psychiatric Emergencies',
    description: 'Safe assessment and management of patients in behavioral crisis',
    pageRange: 'Pages 356-385',
    documentSection: 'Section 8.2 - Behavioral Health',
    keyPoints: [
      'Scene safety is paramount',
      'De-escalation techniques first',
      'Never compromise crew safety',
      'Medical causes must be ruled out',
      'Law enforcement involvement when needed'
    ],
    clinicalIndications: [
      'Suicidal ideation or attempts',
      'Homicidal threats',
      'Violent or aggressive behavior',
      'Severe depression or anxiety',
      'Psychosis or hallucinations',
      'Substance-induced altered behavior'
    ],
    contraindications: [
      'Do not approach violent patient without law enforcement',
      'Avoid restraint if de-escalation possible',
      'Never turn back on agitated patient'
    ],
    procedures: [
      'Ensure scene safety',
      'Assess for medical causes (hypoglycemia, hypoxia, trauma)',
      'Use calm, respectful communication',
      'Maintain safe distance and exit route',
      'Request law enforcement if needed',
      'Follow restraint protocols only when necessary',
      'Document thoroughly'
    ],
    equipmentRequired: [
      'Blood glucose meter',
      'Pulse oximeter',
      'Soft restraints (per protocol)',
      'Communication device'
    ],
    legalConsiderations: [
      'Understand emergency detention laws',
      'Document capacity assessment',
      'Restraint use must be justified and documented',
      'Follow mandatory reporting requirements',
      'Coordinate with law enforcement for involuntary transport'
    ],
    qualityAssurance: [
      'Scene safety assessment documentation',
      'Medical causes ruled out',
      'De-escalation attempts documented',
      'Restraint justification and monitoring',
      'Proper hospital destination'
    ]
  }
];
