export interface EMSProtocol {
  id: string;
  name: string;
  category: 'adult' | 'pediatric' | 'operations';
  certificationLevel: 'EMT' | 'AEMT' | 'Paramedic' | 'All';
  indications: string[];
  assessment: string[];
  interventions: string[];
  medications: string[];
  transport: string[];
  contraindications?: string[];
  specialConsiderations?: string[];
}

export const emsProtocols: EMSProtocol[] = [
  {
    id: 'cardiac-arrest-adult',
    name: 'Cardiac Arrest (Non-Traumatic) - Adult',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Unresponsive patient',
      'No pulse',
      'Not breathing or agonal respirations'
    ],
    assessment: [
      'Check responsiveness',
      'Check pulse and breathing simultaneously',
      'Attach AED/monitor',
      'Identify reversible causes (H\'s and T\'s)'
    ],
    interventions: [
      'Begin high-quality CPR immediately (30:2 ratio)',
      'Provide ventilations with BVM and 100% oxygen',
      'Attach AED and follow prompts for defibrillation',
      'Rotate compressors every 2 minutes',
      'Minimize interruptions in chest compressions',
      'Request ALS backup if available'
    ],
    medications: [
      'Ventilate with BVM attached to supplemental oxygen',
      'No oral medications are indicated during cardiac arrest',
      'Advanced medications (e.g., Epinephrine, Amiodarone) are ALS-level only'
    ],
    transport: [
      'Transport immediately with ongoing resuscitation',
      'Consider termination criteria per protocol',
      'Notify receiving facility'
    ],
    specialConsiderations: [
      'Use AED for rhythm analysis and defibrillation',
      'Focus on high-quality chest compressions',
      'Consider reversible causes: Hypovolemia, Hypoxia, Hydrogen ions, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis',
      'Work closely with ALS providers when available',
      'Follow local protocols for termination of resuscitation'
    ]
  },
  {
    id: 'acute-coronary-syndrome',
    name: 'Acute Coronary Syndrome',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Chest pain suggestive of cardiac origin',
      'ST elevation on 12-lead ECG',
      'History of coronary artery disease',
      'Cardiac risk factors present'
    ],
    assessment: [
      'Complete SAMPLE history',
      'Assess pain using OPQRST method',
      'Check vital signs every 5 minutes',
      'Evaluate for contraindications to aspirin/nitroglycerin',
      '12-lead ECG (if trained/authorized by local protocol)'
    ],
    interventions: [
      'Position patient in position of comfort',
      'Provide oxygen to maintain SpO2 ≥ 94%',
      'Assist with patient\'s prescribed medications per protocol',
      'Continuous monitoring of vital signs',
      'Prepare for rapid transport to appropriate facility',
      'Request ALS backup if available'
    ],
    medications: [
      'Aspirin 324 mg (4 x 81 mg) chewable, if no contraindication (EMT-B scope)',
      'Assist with patient\'s prescribed nitroglycerin per protocol (EMT-B scope)',
      'Oxygen as indicated',
      'Advanced medications (e.g., IV analgesics, additional antiplatelets) are ALS-level per local protocol'
    ],
    transport: [
      'Rapid transport to appropriate facility',
      'Bypass closer facilities for STEMI center if indicated',
      'Transmit 12-lead ECG to receiving facility',
      'Continuous monitoring during transport'
    ],
    contraindications: [
      'Aspirin: Known allergy or active bleeding',
      'Nitroglycerin: Hypotension, use of PDE5 inhibitors within 24–48 hours, suspected right ventricular infarction',
      'Follow local protocol for additional contraindications'
    ]
  },
  {
    id: 'stroke-alert',
    name: 'Stroke Alert Protocol',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Sudden onset neurological deficits',
      'Facial droop, arm weakness, speech difficulties',
      'Time of onset <4.5 hours',
      'Positive stroke screen (FAST, CPSS)'
    ],
    assessment: [
      'Establish time of last known normal',
      'Perform stroke screening tool (FAST)',
      'Check blood glucose level (if EMT-B trained)',
      'Assess airway, breathing, circulation',
      'Complete neurological assessment'
    ],
    interventions: [
      'Maintain airway patency',
      'Position head elevated 30 degrees if no trauma',
      'Provide oxygen to maintain SpO2 ≥ 94%',
      'Nothing by mouth (NPO)',
      'Protect affected extremities',
      'Request ALS backup if available'
    ],
    medications: [
      'Oral glucose if conscious and hypoglycemic (EMT-B scope)',
      'Oxygen therapy as indicated',
      'Advanced glucose management (IV Dextrose, Thiamine) - ALS level only',
      'Avoid antihypertensives - ALS responsibility'
    ],
    transport: [
      'Rapid transport to stroke center',
      'Notify receiving facility with stroke alert',
      'Continuous monitoring',
      'Document exact time of symptom onset'
    ],
    specialConsiderations: [
      'Time is brain - minimize scene time',
      'Consider helicopter transport if distance >30 minutes',
      'Family member should accompany if possible'
    ]
  },
  {
    id: 'anaphylaxis',
    name: 'Anaphylaxis Protocol',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Severe allergic reaction',
      'Respiratory distress with known allergen exposure',
      'Hypotension with allergic symptoms',
      'Multi-system involvement'
    ],
    assessment: [
      'Identify triggering allergen',
      'Assess airway for swelling',
      'Monitor for respiratory compromise',
      'Check for urticaria/angioedema',
      'Frequent vital sign monitoring'
    ],
    interventions: [
      'Remove/avoid continued allergen exposure',
      'Maintain airway with basic adjuncts',
  'Provide oxygen to maintain SpO2 ≥ 94%',
      'Position patient appropriately',
      'Request ALS backup immediately',
      'Prepare for rapid transport'
    ],
    medications: [
      'Administer or assist with epinephrine auto-injector per local protocol (EMT-B scope)',
      'Oxygen via non-rebreather mask as indicated',
      'Advanced medications require ALS level:',
      '  - Epinephrine IM dosing per weight (ALS/AEMT per protocol)',
      '  - Albuterol nebulizer (AEMT level)',
      '  - Diphenhydramine IV (AEMT level)',
      '  - Corticosteroids (Paramedic level)'
    ],
    transport: [
      'Rapid transport to emergency department',
      'Continuous monitoring',
      'Be prepared for rapid deterioration',
      'Notify hospital of anaphylaxis'
    ]
  },
  {
    id: 'respiratory-failure',
    name: 'Acute Respiratory Failure',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'SpO2 <90% on room air',
      'Severe respiratory distress',
      'Altered mental status with respiratory cause',
      'Cyanosis'
    ],
    assessment: [
      'Assess work of breathing',
      'Listen to lung sounds',
      'Check for JVD, peripheral edema',
      'Evaluate for pneumothorax',
      'Continuous pulse oximetry'
    ],
    interventions: [
      'Position patient upright if possible',
      'Provide oxygen to maintain SpO2 ≥ 94% (NRB or BVM as needed)',
      'Assist ventilations with BVM if needed',
      'Suction airway as needed',
      'Request ALS backup for advanced interventions'
    ],
    medications: [
      'Titrate oxygen to maintain SpO2 ≥ 94% (NRB or BVM as needed)',
      'Assist with patient\'s prescribed bronchodilator inhaler',
      'Advanced interventions require ALS level:',
      '  - Albuterol nebulizer (AEMT level)',
      '  - CPAP therapy (AEMT level)',
      '  - IV medications for CHF (Paramedic level)'
    ],
    transport: [
      'Rapid transport',
      'Continuous monitoring',
      'Be prepared for decompensation',
      'Notify receiving facility'
    ]
  },
  {
    id: 'diabetic-emergency',
    name: 'Diabetic Emergency',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Known diabetic with altered mental status',
      'Blood glucose <60 or >250mg/dL',
      'Signs of hypoglycemia or DKA',
      'Unconscious patient with diabetes history'
    ],
    assessment: [
      'Check blood glucose level when trained/equipped per local protocol',
      'Assess level of consciousness',
      'Look for medical alert tags',
      'Evaluate for signs of dehydration',
      'Check for fruity breath odor'
    ],
    interventions: [
      'Ensure airway patency',
      'Position patient appropriately',
  'Provide oxygen to maintain SpO2 ≥ 94% if hypoxic',
      'Continuous monitoring',
      'Protect from injury if altered',
      'Request ALS backup for advanced interventions'
    ],
    medications: [
      'Oral glucose 15g if conscious and able to swallow (EMT-B scope)',
      'Oxygen therapy as indicated',
      'Advanced glucose management requires ALS level:',
      '  - IV Dextrose (AEMT/Paramedic level)',
      '  - Glucagon IM (AEMT level)',
      '  - IV fluid therapy (AEMT/Paramedic level)'
    ],
    transport: [
      'Transport to appropriate facility',
      'Monitor blood glucose during transport if able',
      'Be prepared for rapid changes in consciousness',
      'Document response to treatment'
    ]
  },
  {
    id: 'seizure-adult',
    name: 'Seizure - Adult',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Active seizure activity',
      'Post-ictal state',
      'Status epilepticus',
      'First-time seizure'
    ],
    assessment: [
      'Ensure scene safety',
      'Assess duration of seizure',
      'Check blood glucose (if trained/equipped)',
      'Evaluate for trauma',
      'Obtain seizure history'
    ],
    interventions: [
      'Protect patient from injury',
      'Do not restrain or place objects in mouth',
      'Position in recovery position post-ictally',
      'Suction airway if needed',
  'Provide oxygen to maintain SpO2 ≥ 94%',
      'Request ALS backup for prolonged seizures'
    ],
    medications: [
      'Oral glucose if conscious and hypoglycemic (EMT-B scope)',
      'Oxygen therapy',
      'Advanced seizure management requires ALS level:',
      '  - IV Dextrose (AEMT/Paramedic level)',
      '  - Benzodiazepines for status epilepticus (Paramedic level)',
      '  - Rectal medications (AEMT level with protocols)'
    ],
    transport: [
      'Transport to emergency department',
      'Monitor for recurrent seizures',
      'Document seizure characteristics',
      'Reassure patient post-ictally'
    ]
  },
  {
    id: 'overdose-opioid',
    name: 'Opioid Overdose',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Respiratory depression',
      'Pinpoint pupils',
      'Decreased level of consciousness',
      'Known or suspected opioid use'
    ],
    assessment: [
      'Assess respiratory effort',
      'Check pupil size',
      'Evaluate level of consciousness',
      'Look for track marks',
      'Check for other drug use'
    ],
    interventions: [
      'Ensure airway patency',
      'Assist ventilations with BVM if needed',
  'Provide oxygen to maintain SpO2 ≥ 94%',
      'Continuous monitoring',
      'Request ALS backup',
      'Prepare for aggressive behavior post-naloxone'
    ],
    medications: [
      'Oxygen via BVM or non-rebreather mask',
      'Naloxone per local protocol: EMT-B may administer intranasal naloxone or assist with the patient’s device',
      'Advanced dosing routes and titration (IV/IM/IN) are AEMT/Paramedic level'
    ],
    transport: [
      'Transport all patients',
      'Monitor for re-sedation',
      'Be prepared for combative behavior',
      'Document response to naloxone'
    ]
  },
  {
    id: 'trauma-multi-system',
    name: 'Multi-System Trauma',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'High-energy mechanism of injury',
      'Multi-system involvement',
      'Hemodynamic instability',
      'Penetrating trauma'
    ],
    assessment: [
      'Primary survey (ABCDE)',
      'Rapid trauma assessment',
      'Identify life-threatening injuries',
      'Continuous reassessment',
      'Trauma team activation criteria'
    ],
    interventions: [
      'Maintain cervical spine immobilization',
      'Control hemorrhage with direct pressure',
  'Provide oxygen to maintain SpO2 ≥ 94%',
      'Prepare for rapid transport',
      'Request ALS backup for advanced interventions'
    ],
    medications: [
      'Oxygen 15L via non-rebreather mask or BVM',
      'Pain management with EMT-B scope medications only',
      'Advanced trauma interventions require ALS level:',
      '  - IV access and fluid resuscitation (AEMT/Paramedic)',
      '  - TXA administration (Paramedic level)',
      '  - IV pain management (Paramedic level)'
    ],
    transport: [
      'Rapid transport to trauma center',
      'Minimize scene time',
      'Continuous monitoring',
      'Trauma team notification'
    ]
  },
  {
    id: 'pediatric-respiratory',
    name: 'Pediatric Respiratory Distress',
    category: 'pediatric',
    certificationLevel: 'All',
    indications: [
      'Increased work of breathing',
      'Abnormal lung sounds',
      'Cyanosis or pallor',
      'Altered mental status'
    ],
    assessment: [
      'Pediatric Assessment Triangle',
      'Count respiratory rate',
      'Assess for retractions',
      'Listen to lung sounds',
      'Check oxygen saturation'
    ],
    interventions: [
      'Position of comfort',
      'Blow-by oxygen if tolerated',
      'Avoid agitating child',
      'Prepare appropriately sized equipment',
      'Request ALS backup for advanced interventions'
    ],
    medications: [
      'Oxygen via pediatric non-rebreather or blow-by (EMT-B scope)',
      'Assist with child\'s prescribed bronchodilator if available',
      'Advanced pediatric medications require ALS level:',
      '  - Albuterol nebulizer (AEMT level)',
      '  - Nebulized epinephrine for croup (AEMT/Paramedic per local protocol)',
      '  - Dexamethasone for croup (Paramedic level)'
    ],
    transport: [
      'Transport to pediatric-capable facility',
      'Allow parent/caregiver to accompany',
      'Continuous monitoring',
      'Be prepared for decompensation'
    ]
  },
  {
    id: 'pediatric-seizure',
    name: 'Pediatric Seizure',
    category: 'pediatric',
    certificationLevel: 'All',
    indications: [
      'Active seizure in child',
      'Febrile seizure',
      'Status epilepticus',
      'Post-ictal state'
    ],
    assessment: [
      'Ensure scene safety',
      'Assess for fever and recent illness (check temperature if available)',
      'Assess blood glucose if trained/equipped',
      'Evaluate for trauma',
      'Obtain seizure history from parents'
    ],
    interventions: [
      'Protect from injury',
      'Position appropriately',
      'Suction if needed',
      'Cooling measures for fever (remove clothes, cool environment)',
      'High-flow oxygen',
      'Request ALS backup for IV/IO access'
    ],
    medications: [
      'Oral glucose if conscious and hypoglycemic (EMT-B scope)',
      'Oxygen therapy',
      'Cooling measures for febrile seizures',
      'Advanced pediatric seizure management requires ALS level:',
      '  - IV/IO Dextrose (AEMT/Paramedic level)',
      '  - Benzodiazepines for status epilepticus (Paramedic level)',
      '  - Rectal medications (AEMT level with protocols)'
    ],
    transport: [
      'Transport to pediatric emergency department',
      'Allow parent to accompany',
      'Document seizure characteristics',
      'Monitor for recurrent seizures'
    ]
  },
  {
    id: 'psychiatric-emergency',
    name: 'Psychiatric Emergency',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Threat to self or others',
      'Altered behavior/judgment',
      'Suicidal or homicidal ideation',
      'Acute psychosis'
    ],
    assessment: [
      'Ensure scene safety',
      'Assess level of consciousness',
      'Check vital signs',
      'Evaluate for medical causes',
      'Assess suicide/violence risk'
    ],
    interventions: [
      'Maintain calm environment',
      'Establish rapport',
      'Remove potential weapons',
      'Consider physical restraints if necessary (per protocol)',
      'Request ALS backup if medical cause suspected'
    ],
    medications: [
      'Oral glucose if hypoglycemic and cooperative (EMT-B scope)',
      'Oxygen if indicated',
      'Advanced psychiatric medications require ALS level:',
      '  - IV Dextrose (AEMT/Paramedic level)',
      '  - Thiamine IV (Paramedic level)',
      '  - Antipsychotics and sedatives (Paramedic level)'
    ],
    transport: [
      'Transport to appropriate facility',
      'Consider law enforcement escort',
      'Continuous monitoring',
      'Document thoroughly'
    ]
  },
  {
    id: 'obstetric-emergency',
    name: 'Obstetric Emergency',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Active labor',
      'Imminent delivery',
      'Pregnancy complications',
      'Postpartum hemorrhage'
    ],
    assessment: [
      'Assess stage of labor',
      'Check for crowning',
      'Evaluate fetal heart rate if trained',
      'Assess for complications',
      'Check vital signs frequently'
    ],
    interventions: [
      'Position mother appropriately',
      'Prepare delivery kit',
      'Support perineum during delivery',
      'Clear airway of newborn',
      'Clamp and cut umbilical cord',
      'Control postpartum bleeding with uterine massage'
    ],
    medications: [
      'Oxygen for mother and/or newborn as indicated',
      'Direct pressure for bleeding control',
      'Advanced obstetric medications require ALS level:',
      '  - Oxytocin IM (AEMT/Paramedic level)',
      '  - IV fluids for hemorrhage (AEMT/Paramedic level)',
      '  - Tocolytics (Paramedic level)'
    ],
    transport: [
      'Transport mother and baby together',
      'Continuous monitoring of both',
      'Keep newborn warm',
      'Notify obstetric team'
    ]
  },
  {
    id: 'burn-injury',
    name: 'Burn Injury Management',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Thermal burns',
      'Chemical burns',
      'Electrical burns',
      'Significant burn surface area'
    ],
    assessment: [
      'Calculate percentage of burns (Rule of Nines)',
      'Assess depth of burns',
      'Evaluate for inhalation injury',
      'Check for other trauma',
      'Monitor for shock'
    ],
    interventions: [
      'Remove from source',
      'Remove burning clothing/jewelry',
      'Cool burns with room temperature water (10-20 minutes)',
      'Cover with sterile dressings',
      'Prevent hypothermia',
      'Request ALS backup for severe burns'
    ],
    medications: [
      'Oxygen for inhalation injury or respiratory distress',
      'Position patient to prevent shock',
      'Advanced burn management requires ALS level:',
      '  - IV access and fluid resuscitation (AEMT/Paramedic)',
      '  - Pain management with IV narcotics (Paramedic level)',
      '  - Parkland formula fluid calculations (Paramedic level)'
    ],
    transport: [
      'Rapid transport to burn center if indicated',
      'Maintain body temperature',
      'Continuous monitoring',
      'Document burn characteristics'
    ]
  },
  {
    id: 'hypothermia',
    name: 'Hypothermia Protocol',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Core body temperature <35°C (95°F)',
      'Exposure to cold environment',
      'Altered mental status in cold',
      'Shivering or absence of shivering'
    ],
    assessment: [
      'Check core temperature if equipped',
      'Assess level of consciousness',
      'Evaluate for frostbite',
      'Check cardiac rhythm if available',
      'Assess for underlying conditions'
    ],
    interventions: [
      'Handle patient gently',
      'Remove from cold environment',
      'Remove wet clothing',
      'Passive rewarming with blankets',
      'Insulate from ground',
      'Request ALS backup for severe hypothermia'
    ],
    medications: [
      'Oxygen therapy if indicated',
      'Handle with extreme gentleness',
      'Advanced hypothermia management requires ALS level:',
      '  - Warm IV fluids (39°C/102°F) (AEMT/Paramedic)',
      '  - IV Dextrose if hypoglycemic (AEMT/Paramedic)',
      '  - Thiamine if chronic alcoholism (Paramedic)'
    ],
    transport: [
      'Gentle handling during transport',
      'Continuous cardiac monitoring if available',
      'Gradual rewarming',
      'Notify receiving facility'
    ],
    specialConsiderations: [
      'Risk of ventricular fibrillation with rough handling',
      'Core temperature may continue to drop initially',
      'Consider extracorporeal rewarming for severe cases'
    ]
  }
  ,
  {
    id: 'airway-obstruction-adult',
    name: 'Airway Obstruction - Adult',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Choking with ineffective cough',
      'Stridor or inability to speak',
      'Signs of severe airway blockage'
    ],
    assessment: [
      'Assess ability to speak or cough',
      'Look for universal choking sign',
      'Evaluate for partial vs complete obstruction',
      'Monitor oxygen saturation and mental status'
    ],
    interventions: [
      'Encourage effective coughing if able',
      'Perform abdominal thrusts for conscious adult with severe obstruction',
      'Chest compressions for unresponsive patient with suspected obstruction',
      'Visual inspection and removal of visible objects only',
      'Suction airway as needed',
  'Provide oxygen to maintain SpO2 ≥ 94% after relief of obstruction'
    ],
    medications: [
      'Oxygen via non-rebreather or BVM as indicated'
    ],
    transport: [
      'Transport all patients after significant choking event',
      'Continuous monitoring for recurrent obstruction',
      'Consider ALS intercept if airway compromise persists'
    ],
    specialConsiderations: [
      'Do not perform blind finger sweeps',
      'Consider causes such as dentures or food bolus',
      'Be prepared for vomiting following relief'
    ]
  },
  {
    id: 'airway-obstruction-pediatric',
    name: 'Airway Obstruction - Pediatric',
    category: 'pediatric',
    certificationLevel: 'All',
    indications: [
      'Child with ineffective cough',
      'High-pitched inspiratory noise (stridor)',
      'Cyanosis with suspected foreign body'
    ],
    assessment: [
      'Age-appropriate assessment of airway and breathing',
      'Observe for retractions and inability to cry or speak',
      'Differentiate partial from complete obstruction'
    ],
    interventions: [
      'Infant (<1 yr): 5 back slaps and 5 chest thrusts while supine/prone as appropriate',
      'Child (>1 yr): Abdominal thrusts for severe obstruction',
      'If unresponsive: Begin CPR and check for visible object each cycle',
      'Avoid blind finger sweeps',
      'Provide oxygen after relief'
    ],
    medications: [
      'Oxygen via blow-by or pediatric mask as tolerated'
    ],
    transport: [
      'Transport all patients after choking event',
      'Allow caregiver to accompany when possible',
      'Monitor for airway swelling or recurrence'
    ]
  },
  {
    id: 'allergic-reaction-mild',
    name: 'Allergic Reaction (Mild to Moderate)',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Localized hives or itching',
      'Mild swelling without airway compromise',
      'No hypotension or severe respiratory distress'
    ],
    assessment: [
      'Identify likely allergen exposure',
      'Assess airway for progression of swelling',
      'Monitor respiratory status and vital signs'
    ],
    interventions: [
      'Remove ongoing exposure if safe (e.g., stinger scraping)',
      'Position of comfort',
      'Oxygen as needed for hypoxia',
      'Prepare for rapid escalation to anaphylaxis'
    ],
    medications: [
      'Assist with patient’s own antihistamine per local policy',
      'Epinephrine auto-injector if symptoms progress towards anaphylaxis (per protocol)'
    ],
    transport: [
      'Transport for observation if symptoms persistent',
      'Reassess frequently for worsening',
      'Consider ALS if progression occurs'
    ]
  },
  {
    id: 'heat-illness',
    name: 'Heat Illness (Heat Exhaustion/Heat Stroke)',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Exposure to high temperatures',
      'Cramps, dizziness, or altered mental status',
      'Hot, dry skin (late finding) or heavy sweating'
    ],
    assessment: [
      'Assess temperature if available',
      'Evaluate mental status and hydration',
      'Check for tachycardia and hypotension',
      'Look for environmental contributors (humidity, exertion)'
    ],
    interventions: [
      'Move to a cool environment',
      'Remove excess clothing and begin active cooling',
      'Cool packs to neck/groin/axillae; mist and fan if available',
      'Oral fluids if alert and not nauseated',
      'Oxygen as indicated'
    ],
    medications: [
      'No routine medications within EMT-B scope besides oxygen'
    ],
    transport: [
      'Rapid transport if altered or signs of heat stroke',
      'Continuous monitoring during cooling',
      'Notify receiving facility of suspected heat stroke'
    ]
  },
  {
    id: 'syncope',
    name: 'Syncope (Fainting)',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Transient loss of consciousness with spontaneous recovery',
      'Lightheadedness or presyncope',
      'No persistent neurologic deficit after event'
    ],
    assessment: [
      'Obtain orthostatic history and position-related factors',
      'Check for injury from fall',
      'Assess blood glucose if trained/equipped',
      'Review medications and recent fluid intake'
    ],
    interventions: [
      'Position supine with legs elevated if tolerated',
      'Oxygen for hypoxia',
      'Treat injuries from associated fall',
      'Reassure and monitor vitals'
    ],
    medications: [
      'Oral glucose if hypoglycemic and able to swallow',
      'Oxygen as indicated'
    ],
    transport: [
      'Transport for evaluation of underlying cause',
      'Consider ALS if abnormal vitals or concerning history'
    ]
  },
  {
    id: 'sepsis-screening',
    name: 'Sepsis Recognition (EMT-B Screening)',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Suspected infection with fever or hypothermia',
      'Tachycardia, tachypnea, or hypotension',
      'Altered mental status with possible infection'
    ],
    assessment: [
      'Screen for infection source (urinary, respiratory, skin)',
      'Assess temperature if available',
      'Monitor mental status and perfusion',
      'Identify red flags: mottling, very low BP'
    ],
    interventions: [
      'Oxygen for hypoxia',
      'Keep patient warm and position for comfort',
      'Limit scene time; early transport',
      'Early notification using “Sepsis Alert” if per local policy'
    ],
    medications: [
      'Oxygen only; IV fluids and antibiotics are not EMT-B scope'
    ],
    transport: [
      'Rapid transport to appropriate facility',
      'Continuous monitoring of vitals en route'
    ],
    specialConsiderations: [
      'High suspicion in elderly or immunocompromised patients',
      'Blood glucose check if altered, when trained/equipped'
    ]
  },
  {
    id: 'smr-operations',
    name: 'Spinal Motion Restriction (SMR)',
    category: 'operations',
    certificationLevel: 'All',
    indications: [
      'Blunt trauma with concerning mechanism',
      'Spine pain, tenderness, or neurologic deficit',
      'Altered mental status or intoxication'
    ],
    assessment: [
      'Use validated SMR decision points per local policy',
      'Assess midline tenderness and neurologic function',
      'Check for distracting injuries',
      'Evaluate reliability of patient exam'
    ],
    interventions: [
      'Apply cervical collar when indicated',
      'Use patient self-extrication when appropriate',
      'Secure to stretcher with straps and head blocks as needed',
      'Avoid routine long backboard use unless extrication requires'
    ],
    medications: [
      'None'
    ],
    transport: [
      'Transport with SMR in place if indicated',
      'Reassess neuro status frequently'
    ],
    specialConsiderations: [
      'Consider pediatric anatomical differences',
      'Minimize on-scene time in unstable patients'
    ]
  },
  {
    id: 'patient-refusal-ama',
    name: 'Patient Refusal / AMA',
    category: 'operations',
    certificationLevel: 'All',
    indications: [
      'Patient declines transport or treatment',
      'Patient appears to have decision-making capacity'
    ],
    assessment: [
      'Assess orientation and capacity to refuse',
      'Explain risks of refusal and alternatives',
      'Offer transport and re-evaluation at any time'
    ],
    interventions: [
      'Provide assessment within scope',
      'Advise to call back if symptoms worsen',
      'Obtain signatures per policy; document thorough discussion'
    ],
    medications: [
      'None'
    ],
    transport: [
      'No transport if refusal is valid and documented',
      'Encourage follow-up with healthcare provider'
    ],
    specialConsiderations: [
      'Involve law enforcement if safety concerns exist',
      'Consult medical control per policy when unsure'
    ]
  },
  {
    id: 'mci-triage',
    name: 'Mass Casualty Incident (MCI) Triage',
    category: 'operations',
    certificationLevel: 'All',
    indications: [
      'Multiple patients exceeding initial resources',
      'Scene requiring rapid triage and resource allocation'
    ],
    assessment: [
      'Use local triage system (e.g., START/JumpSTART)',
      'Rapid assessment: ability to walk, respirations, perfusion, mental status',
      'Assign triage categories and tags'
    ],
    interventions: [
      'Perform lifesaving interventions during triage only (e.g., airway opening, major bleeding control)',
      'Request additional resources and establish command',
      'Direct walking wounded to safe area'
    ],
    medications: [
      'None during triage phase'
    ],
    transport: [
      'Coordinate with incident command for destination decisions',
      'Load and go for critical patients as directed'
    ]
  },
  {
    id: 'drowning-submersion',
    name: 'Drowning / Submersion Injury',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'History of submersion with respiratory distress',
      'Coughing, hypoxia, or altered mental status post submersion'
    ],
    assessment: [
      'Consider spinal precautions if trauma suspected',
      'Assess for aspiration and respiratory compromise',
      'Check for hypothermia in cold water incidents'
    ],
    interventions: [
      'Remove from water ensuring rescuer safety',
      'Provide oxygen; assist ventilations as needed',
      'Suction airway if necessary',
      'Keep warm and monitor closely'
    ],
    medications: [
      'Oxygen therapy as indicated'
    ],
    transport: [
      'Transport all near-drowning victims for observation',
      'Monitor for delayed pulmonary edema'
    ]
  },
  {
    id: 'smoke-inhalation-co',
    name: 'Smoke Inhalation / Suspected CO Exposure',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Exposure to smoke in enclosed space',
      'Headache, nausea, confusion, or soot in airway'
    ],
    assessment: [
      'Scene safety and decontamination as needed',
      'Assess for airway burns and singed nasal hairs',
      'Monitor mental status and SpO2 (note: pulse ox may be unreliable in CO poisoning)'
    ],
    interventions: [
  'Provide high-concentration oxygen via non-rebreather mask; titrate to SpO2 ≥ 94% (100% O2 preferred in CO exposure)',
      'Remove from exposure environment',
      'Consider SMR if associated fall or trauma'
    ],
    medications: [
      'Oxygen therapy is primary treatment at EMT-B level'
    ],
    transport: [
      'Transport to facility; consider hyperbaric center per local policy',
      'Continuous monitoring en route'
    ]
  },
  {
    id: 'bites-stings',
    name: 'Bites and Stings',
    category: 'adult',
    certificationLevel: 'All',
    indications: [
      'Insect, spider, or animal bite/sting',
      'Localized pain, swelling, or systemic symptoms'
    ],
    assessment: [
      'Identify type of exposure when possible',
      'Assess for signs of infection or systemic reaction',
      'Monitor for anaphylaxis signs'
    ],
    interventions: [
      'Remove stinger by scraping if present',
      'Wash area with clean water if available',
      'Apply cold pack for swelling and pain',
      'Elevate affected limb if tolerated',
      'Oxygen as indicated'
    ],
    medications: [
      'Assist with patient’s own epinephrine auto-injector if anaphylaxis develops',
      'Over-the-counter analgesics only if per local policy and patient supplied'
    ],
    transport: [
      'Transport if systemic symptoms or high-risk exposure (e.g., snakebite)',
      'Observe localized reactions as per policy'
    ]
  },
  {
    id: 'chemical-exposure-decon',
    name: 'Chemical Exposure – Gross Decontamination (Ops)',
    category: 'operations',
    certificationLevel: 'All',
    indications: [
      'Exposure to hazardous chemical with potential skin/eye involvement',
      'Irritation, burning, or respiratory complaints'
    ],
    assessment: [
      'Ensure scene safety and PPE compliance',
      'Identify substance if safe and possible',
      'Evaluate for respiratory distress and burns'
    ],
    interventions: [
      'Initiate gross decontamination per local protocol',
      'Remove contaminated clothing',
      'Irrigate affected areas with copious water',
      'Avoid cross-contamination; establish hot/warm/cold zones'
    ],
    medications: [
      'Oxygen for respiratory symptoms'
    ],
    transport: [
      'Transport after decon when safe',
      'Notify receiving facility of contamination type'
    ],
    specialConsiderations: [
      'Follow HAZMAT guidance from incident command',
      'Do not delay decon when indicated'
    ]
  },
  {
    id: 'neonatal-care-basic',
    name: 'Neonatal Care – Basic Support',
    category: 'pediatric',
    certificationLevel: 'All',
    indications: [
      'Newborn immediately after delivery',
      'Respiratory distress or poor tone in newborn'
    ],
    assessment: [
      'Assess APGAR at 1 and 5 minutes if trained',
      'Evaluate tone, breathing, and color',
      'Check for meconium and airway patency'
    ],
    interventions: [
      'Dry, stimulate, and keep warm',
      'Position airway and suction mouth/nose as needed',
      'Provide BVM ventilations if apneic or HR <100',
      'Chest compressions if HR <60 after ventilation',
      'Maintain normal body temperature'
    ],
    medications: [
      'Oxygen and room air titration per newborn resuscitation basics'
    ],
    transport: [
      'Transport mother and newborn when feasible',
      'Monitor closely en route; keep newborn warm'
    ],
    specialConsiderations: [
      'Early recognition of hypothermia in neonates',
      'Coordinate with receiving neonatal-capable facility'
    ]
  }
];
