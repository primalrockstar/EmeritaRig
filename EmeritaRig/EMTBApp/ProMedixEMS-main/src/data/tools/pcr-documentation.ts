// PCR Documentation Templates and Scenario Library
// Provides standardized narrative scaffolding plus 25 documentation drills for the interactive scenarios hub

export type PCRTemplateKey = 'SOAP' | 'CHART' | 'HYBRID';

export interface PCRDocumentationTemplates {
  version: string;
  templates: Record<PCRTemplateKey, Record<string, unknown>>;
}

export interface PCRDocumentationScenario {
  id: string;
  title: string;
  category: 'cardiac' | 'medical' | 'respiratory' | 'neurologic' | 'trauma' | 'behavioral' | 'obstetric' | 'pediatric' | 'environmental' | 'special';
  complexity: 'foundational' | 'intermediate' | 'advanced' | 'critical';
  dispatch: {
    time: string;
    complaint: string;
    location: string;
    respondingUnits: string[];
  };
  patient: {
    age: number;
    sex: 'male' | 'female' | 'non-binary';
    weightKg?: number;
    pronouns?: string;
    language?: string;
  };
  chiefComplaint: string;
  summary: string;
  primaryFindings: string[];
  vitals: Array<{
    time: string;
    bp: string;
    pulse: number;
    respirations: number;
    spo2?: number;
    tempC?: number;
    gcs?: string;
    glucose?: number;
    painScore?: number;
  }>;
  interventions: Array<{
    time: string;
    action: string;
    response?: string;
  }>;
  documentationFocus: string[];
  riskAlerts: string[];
  narrativeTips: string[];
}

export const PCR_DOCUMENTATION_TEMPLATES: PCRDocumentationTemplates = {
  version: '1.0',
  templates: {
    SOAP: {
      meta: {
        incident_number: '',
        agency: '',
        unit: '',
        times: {
          dispatch: '',
          en_route: '',
          on_scene: '',
          patient_contact: '',
          depart_scene: '',
          arrive_destination: '',
          transfer_of_care: ''
        },
        crew: [
          { name: '', cert: 'EMT/EMT-A/Paramedic', role: 'lead/driver/attendant' }
        ],
        receiving_facility: { name: '', destination_type: 'hospital/clinic/home', department: '' }
      },
      S_subjective: {
        chief_complaint: '',
        patient_statement: '',
        OPQRST: {
          onset: '',
          provocation_palliation: '',
          quality: '',
          region_radiation: '',
          severity_0_10: null,
          time_course: ''
        },
        SAMPLE: {
          signs_symptoms: '',
          allergies: '',
          medications: '',
          past_history: '',
          last_oral_intake: '',
          events_prior: ''
        },
        bystander_witness_info: ''
      },
      O_objective: {
        general_impression: '',
        mental_status: { AVPU: 'A/V/P/U', GCS: { E: null, V: null, M: null, total: null } },
        airway: '',
        breathing: '',
        circulation: '',
        pertinent_positives: '',
        pertinent_negatives: '',
        vitals: [
          { time: '', BP: '', HR: '', RR: '', 'SpO2_%': null, 'Temp_C': null, 'EtCO2_mmHg': null, 'Pain_0_10': null }
        ],
        exam: {
          head: '',
          neck: '',
          chest: '',
          abdomen: '',
          pelvis: '',
          back: '',
          extremities: '',
          neuro: '',
          skin: ''
        },
        diagnostics: {
          glucose_mgdl: null,
          ecg_summary: '',
          '12lead_attachment_id': '',
          other: ''
        }
      },
      A_assessment: {
        working_impression: '',
        differential: [''],
        criticality: 'critical/unstable/potentially-unstable/stable'
      },
      P_plan: {
        interventions: [
          {
            time: '',
            type: 'oxygen/airway/medication/procedure/splint/defib/other',
            details: '',
            dose_route: '',
            response: 'improved/unchanged/worsened',
            reassessment_notes: ''
          }
        ],
        transport: {
          mode: 'emergent/non-emergent',
          position: 'supine/semi-fowler/fowler/left-lateral/immobilized',
          monitoring: 'ECG/pulse-ox/capno/BP q5-15',
          reassessments: [
            { time: '', summary: '' }
          ],
          destination: '',
          reason_for_destination: ''
        },
        handoff: {
          receiving_provider: '',
          report_summary: '',
          questions_answered: true
        }
      },
      signatures: {
        patient_or_guardian: { name: '', type: 'consent/refusal', signature_id: '' },
        crew: [{ name: '', signature_id: '' }],
        receiving_staff: { name: '', signature_id: '' }
      },
      required_fields: [
        'meta.incident_number',
        'S_subjective.chief_complaint',
        'O_objective.vitals[0]',
        'A_assessment.working_impression',
        'P_plan.interventions',
        'P_plan.transport.destination'
      ]
    },

    CHART: {
      C_chief_complaint: { text: '', duration: '', severity_0_10: null },
      H_history: {
        mechanism_or_nature: '',
        OPQRST: { onset: '', provocation_palliation: '', quality: '', region_radiation: '', severity_0_10: null, time_course: '' },
        SAMPLE: { allergies: '', medications: '', past_history: '', last_oral_intake: '', events_prior: '' },
        scene_factors: 'environmental hazards, extrication, # patients, law/fire present'
      },
      A_assessment: {
        general_impression: '',
        primary_survey: { airway: '', breathing: '', circulation: '', disability: '', exposure: '' },
        vitals: [
          { time: '', BP: '', HR: '', RR: '', 'SpO2_%': null, 'Pain_0_10': null }
        ],
        focused_or_head_to_toe_exam: '',
        pertinent_negatives: ''
      },
      R_treatment: [
        { time: '', action: '', dose_route: '', device_settings: '', response: '' }
      ],
      T_transport: {
        priority: 'high/low',
        mode: 'emergent/non-emergent',
        position: '',
        destination: '',
        ETA_min: null,
        reassessments: [{ time: '', summary: '' }],
        transfer_of_care: { time: '', to: '', summary: '' }
      },
      required_fields: [
        'C_chief_complaint.text',
        'A_assessment.vitals[0]',
        'R_treatment',
        'T_transport.destination'
      ]
    },

    HYBRID: {
      dispatch_and_scene: {
        cad_number: '',
  dispatch_complaint: '',
  location: { address: '', gps: '' },
        scene_description: '',
        safety_hazards: '',
        patients_count: 1
      },
      initial_impression: {
        chief_complaint: '',
        appearance: '',
        mental_status: { AVPU: 'A/V/P/U', GCS_total: null }
      },
      assessment_findings: {
        subjective: { OPQRST_summary: '', SAMPLE_summary: '' },
        objective: {
          primary_survey: { airway: '', breathing: '', circulation: '', disability: '', exposure: '' },
          vitals_trend: [
            { time: '', BP: '', HR: '', RR: '', 'SpO2_%': null, 'EtCO2_mmHg': null, 'Temp_C': null, 'Pain_0_10': null }
          ],
          exam_focused_or_h2t: ''
        },
        working_impression: '',
        differential: ['']
      },
      interventions_and_response: [
        { time: '', category: 'airway/breathing/circulation/medication/monitoring/splinting/other', details: '', response: '' }
      ],
      transport_and_disposition: {
        priority: 'load-and-go/stay-and-play',
        mode: 'emergent/non-emergent',
        position: '',
        ongoing_monitoring: 'ECG/SpO2/EtCO2/BP q5-15',
        reassessments: [{ time: '', summary: '' }],
        destination: '',
        handoff: { time: '', receiver: '', report_key_points: '' }
      },
      summary_statement: 'One to two concise sentences capturing presentation, key findings, most important treatments, and outcome.',
      attachments: {
        ecg_12lead_ids: [],
        photos_ids: [],
        device_exports: []
      },
      required_fields: [
        'dispatch_and_scene.dispatch_complaint',
        'initial_impression.chief_complaint',
        'assessment_findings.working_impression',
        'transport_and_disposition.destination'
      ]
    }
  }
};

export const PCR_DOCUMENTATION_SCENARIOS: PCRDocumentationScenario[] = [
  {
    id: 'pcr-lab-01',
    title: 'Pressure-Like Chest Pain at Workplace',
    category: 'cardiac',
    complexity: 'advanced',
    dispatch: {
      time: '08:17',
      complaint: '55-year-old male with chest pressure',
      location: 'Corporate office, 5th floor',
      respondingUnits: ['Medic 4', 'Engine 2']
    },
    patient: { age: 55, sex: 'male', weightKg: 94 },
    chiefComplaint: 'Chest pressure radiating to left shoulder for 20 minutes',
    summary: 'Patient seated at desk clutching chest, diaphoretic, admits to skipping cardiac medications this morning.',
    primaryFindings: [
      'Skin cool, clammy, pale',
      'Irregular radial pulse',
      'Reports nausea and mild shortness of breath',
      'Risk factors: HTN, hyperlipidemia, smoker'
    ],
    vitals: [
      { time: '08:20', bp: '168/96', pulse: 108, respirations: 22, spo2: 93, painScore: 8 },
      { time: '08:30', bp: '152/88', pulse: 98, respirations: 20, spo2: 96, painScore: 6 }
    ],
    interventions: [
      { time: '08:22', action: 'Aspirin 324 mg chewed', response: 'Pain unchanged' },
      { time: '08:24', action: 'Assisted with prescribed nitroglycerin 0.4 mg SL', response: 'Pain decreased to 6/10' },
      { time: '08:27', action: '12-lead ECG acquired and transmitted', response: 'Findings suggestive of anterior ischemia' }
    ],
    documentationFocus: [
      'Exactly quote patient description of discomfort',
      'Timeline for medication administration and pain scale changes',
      'Document risk factors and medication compliance issue',
      'Record ECG transmission details and receiving facility notification'
    ],
    riskAlerts: [
      'Potential STEMI activation',
      'Need for documented consent for second nitroglycerin dose',
      'Clarify whether patient self-administered aspirin prior to arrival'
    ],
    narrativeTips: [
      'Use objective wording describing patient appearance and behavior',
      'Note family or coworker statements verbatim when relevant',
      'Capture mode of transport and crew roles during care'
    ]
  },
  {
    id: 'pcr-lab-02',
    title: 'Early Morning Hypoglycemia',
    category: 'medical',
    complexity: 'foundational',
    dispatch: {
      time: '05:42',
      complaint: 'Unresponsive diabetic patient',
      location: 'Residential bedroom',
      respondingUnits: ['Medic 6']
    },
    patient: { age: 62, sex: 'female', weightKg: 70 },
    chiefComplaint: 'Found unresponsive by spouse',
    summary: 'Patient supine in bed, cool and diaphoretic, responsive only to painful stimuli.',
    primaryFindings: [
      'Blood glucose 38 mg/dL',
      'Strong radial pulses',
      'No signs of trauma',
      'Spouse reports patient took insulin but skipped dinner'
    ],
    vitals: [
      { time: '05:45', bp: '132/78', pulse: 90, respirations: 16, spo2: 98, gcs: 'E2 V2 M5', tempC: 36.1 },
      { time: '05:55', bp: '128/80', pulse: 82, respirations: 16, spo2: 99, gcs: 'E4 V4 M6', tempC: 36.5 }
    ],
    interventions: [
      { time: '05:46', action: 'Airway repositioned, high-flow oxygen via NRB', response: 'SpO2 improved to 99%' },
      { time: '05:49', action: 'Oral glucose gel administered', response: 'Gradual improvement in responsiveness' },
      { time: '05:54', action: 'Re-checked CBG', response: 'Blood glucose increased to 92 mg/dL' }
    ],
    documentationFocus: [
      'Describe mental status with GCS and AVPU',
      'Include glucose values with device used',
      'Document patient education provided prior to refusal/transport decision',
      'Clarify who was present and witnessed improvement'
    ],
    riskAlerts: [
      'Potential for recurrent hypoglycemia if oral intake uncertain',
      'Need to document refusal carefully if transport declined',
      'Ensure EMS crew notes follow-up instructions verbatim'
    ],
    narrativeTips: [
      'Detail oral glucose administration technique and tolerance',
      'Record all reassessment vitals prior to disposition',
      'Note that family secured food for patient post-care'
    ]
  },
  {
    id: 'pcr-lab-03',
    title: 'Pediatric Asthma Exacerbation',
    category: 'pediatric',
    complexity: 'advanced',
    dispatch: {
      time: '16:11',
      complaint: '7-year-old having difficulty breathing',
      location: 'Elementary school nurse office',
      respondingUnits: ['Medic 2', 'Engine 7']
    },
    patient: { age: 7, sex: 'female', weightKg: 24, pronouns: 'she/her' },
    chiefComplaint: 'Shortness of breath after recess',
    summary: 'Child seated tripod position with audible wheezing, speaking in 2-3 word phrases.',
    primaryFindings: [
      'Accessory muscle use noted',
      'SpO2 91% on room air',
      'History of asthma, no rescue inhaler available at school',
      'Recent cold symptoms per school nurse'
    ],
    vitals: [
      { time: '16:14', bp: '100/62', pulse: 138, respirations: 32, spo2: 91 },
      { time: '16:22', bp: '104/66', pulse: 128, respirations: 28, spo2: 95 }
    ],
    interventions: [
      { time: '16:15', action: 'Coach-controlled nebulized albuterol 2.5 mg', response: 'Wheezing decreased, speech improved' },
      { time: '16:18', action: 'Initiated blow-by oxygen 6 L/min', response: 'SpO2 increased to 95%' }
    ],
    documentationFocus: [
      'Capture guardian consent details and contact information',
      'Document medication source and lot # if provided by school',
      'Describe child’s work of breathing objectively',
      'Record education for spacer use and follow-up care'
    ],
    riskAlerts: [
      'Potential for deterioration en route; include reassessment plan',
      'Need to document who accompanies child to hospital',
      'Ensure accurate pediatric dosing documentation'
    ],
    narrativeTips: [
      'Use developmental-appropriate language to quote patient',
      'Note school nurse statements and prior interventions',
      'Detail parental notification timeline'
    ]
  },
  {
    id: 'pcr-lab-04',
    title: 'High-Speed MVC with Distracted Driver',
    category: 'trauma',
    complexity: 'critical',
    dispatch: {
      time: '22:06',
      complaint: 'Rollover collision, one trapped',
      location: 'Highway interchange',
      respondingUnits: ['Medic 11', 'Rescue 3', 'Engine 12']
    },
    patient: { age: 28, sex: 'female', weightKg: 68 },
    chiefComplaint: 'Severe abdominal pain and shortness of breath',
    summary: 'Driver extricated after 12 minutes, restrained, steering wheel deformation noted.',
    primaryFindings: [
      'Skin cool, diaphoretic',
      'Abdominal guarding, seatbelt sign',
      'GCS 13 (E4 V3 M6)',
      'Multiple bruises to chest and lower abdomen'
    ],
    vitals: [
      { time: '22:12', bp: '92/60', pulse: 124, respirations: 28, spo2: 94, painScore: 9 },
      { time: '22:20', bp: '86/58', pulse: 132, respirations: 30, spo2: 93 }
    ],
    interventions: [
      { time: '22:07', action: 'C-spine maintained by rescue crew', response: 'Movement minimized' },
      { time: '22:15', action: 'Applied pelvic binder', response: 'Pain reduced slightly, hemodynamics unchanged' },
      { time: '22:18', action: 'High-flow oxygen via NRB 15 L/min', response: 'SpO2 maintained at 94%' }
    ],
    documentationFocus: [
      'Detail extrication timeline and command handoff',
      'Document trauma triage criteria met and notification to trauma center',
      'Include mechanism specifics (vehicle speed, intrusion, restraints)',
      'Record refusal or inability to obtain SAMPLE elements'
    ],
    riskAlerts: [
      'Potential intra-abdominal bleed',
      'Requirement to document pelvic binder placement and checks',
      'Need to record secondary survey limitations due to packaging'
    ],
    narrativeTips: [
      'Use chronological order from dispatch to arrival at trauma center',
      'Describe patient’s mental status changes over time',
      'Include EMS crew safety precautions observed'
    ]
  },
  {
    id: 'pcr-lab-05',
    title: 'Septic Shock from Nursing Facility',
    category: 'medical',
    complexity: 'critical',
    dispatch: {
      time: '11:48',
      complaint: 'Altered mental status, fever',
      location: 'Skilled nursing facility',
      respondingUnits: ['Medic 5']
    },
    patient: { age: 84, sex: 'female', weightKg: 56, language: 'English' },
    chiefComplaint: 'Lethargy and fever per staff',
    summary: 'Resident found minimally responsive, febrile with suspected UTI per nurse report.',
    primaryFindings: [
      'Skin hot and flushed',
      'Capillary refill > 3 seconds',
      'Staff reports foul-smelling urine',
      'Baseline oriented x3, now responsive to voice only'
    ],
    vitals: [
      { time: '11:50', bp: '88/52', pulse: 126, respirations: 24, spo2: 92, tempC: 39.3 },
      { time: '12:00', bp: '90/54', pulse: 120, respirations: 26, spo2: 95, tempC: 39.1 }
    ],
    interventions: [
      { time: '11:51', action: 'Initiated high-flow oxygen 15 L/min NRB', response: 'SpO2 improved to 95%' },
      { time: '11:55', action: 'Passive external cooling measures', response: 'Temperature down to 39.1°C by 12:00' },
      { time: '11:58', action: 'Collected medication list and recent vitals from staff', response: 'Information attached to ePCR' }
    ],
    documentationFocus: [
      'Document baseline mental status per staff statements',
      'Include sepsis screening criteria met',
      'Ensure timestamps for cooling measures and oxygen',
      'Capture conversation with medical command if initiated'
    ],
    riskAlerts: [
      'Need to note advanced directives or DNR status',
      'Document facility handoff and signed paperwork',
      'Highlight any delays in transport initiation'
    ],
    narrativeTips: [
      'Quote staff statements with names and titles',
      'Clarify that antibiotics started earlier in day per facility',
      'Record bed sores or skin findings noted during exam'
    ]
  },
  {
    id: 'pcr-lab-06',
    title: 'Behavioral Crisis with Suicidal Ideation',
    category: 'behavioral',
    complexity: 'advanced',
    dispatch: {
      time: '19:23',
      complaint: 'Suicidal threats, cutting noted',
      location: 'Apartment complex, third floor',
      respondingUnits: ['Medic 9', 'Police 21']
    },
    patient: { age: 32, sex: 'female', weightKg: 60, pronouns: 'she/her' },
    chiefComplaint: 'Despondent, "I don’t want to live"',
    summary: 'Patient seated on couch with superficial wrist lacerations, tearful and cooperative after police arrival.',
    primaryFindings: [
      'Small controlled bleeding from wrist scratches',
      'Denies ingestion, but empty wine bottles present',
      'Reports prior suicide attempt one year ago',
      'Roommate reports escalating depression over weeks'
    ],
    vitals: [
      { time: '19:27', bp: '118/76', pulse: 102, respirations: 20, spo2: 98 },
      { time: '19:40', bp: '114/74', pulse: 96, respirations: 18, spo2: 98 }
    ],
    interventions: [
      { time: '19:25', action: 'Applied wrist dressings and reassured patient', response: 'Bleeding controlled, patient calmer' },
      { time: '19:32', action: 'Facilitated phone call with crisis counselor', response: 'Patient agreed to voluntary transport' }
    ],
    documentationFocus: [
      'Document verbatim threats or statements',
      'Include police presence and patient search details',
      'Record mental health resources activated',
      'Note consent form signed for voluntary transport'
    ],
    riskAlerts: [
      'Must document removal of sharp objects',
      'Need to capture blood alcohol screening if performed',
      'Record continuous observation en route'
    ],
    narrativeTips: [
      'Avoid judgmental language, stick to observations',
      'List supportive contacts present and their statements',
      'Document patient’s affect, eye contact, and insight'
    ]
  },
  {
    id: 'pcr-lab-07',
    title: 'Third-Trimester Vaginal Bleeding',
    category: 'obstetric',
    complexity: 'critical',
    dispatch: {
      time: '02:11',
      complaint: 'Pregnant female bleeding at 32 weeks',
      location: 'Single-family home',
      respondingUnits: ['Medic 8']
    },
    patient: { age: 29, sex: 'female', weightKg: 82 },
    chiefComplaint: 'Vaginal bleeding, contractions every 6 minutes',
    summary: 'Patient side-lying on couch, soaked pad noted, reports decreased fetal movement.',
    primaryFindings: [
      'Approximately 250 mL bright red bleeding',
      'Fetal heart tones 140 bpm by Doppler',
      'No severe abdominal pain, uterus nontender',
      'Prenatal care with OB, previous C-section'
    ],
    vitals: [
      { time: '02:14', bp: '112/70', pulse: 96, respirations: 20, spo2: 99 },
      { time: '02:25', bp: '110/68', pulse: 100, respirations: 20, spo2: 99 }
    ],
    interventions: [
      { time: '02:16', action: 'Positioned patient left lateral, oxygen 4 L/min via nasal cannula', response: 'SpO2 maintained at 99%' },
      { time: '02:18', action: 'Contacted receiving OB hospital, activated OB alert', response: 'Instructions to monitor bleeding and contractions' }
    ],
    documentationFocus: [
      'Document fetal status, movement, and maternal contractions',
      'Include gravida/para history and prenatal complications',
      'Note estimated blood loss and pad counts',
      'Record consultation with hospital and transport decision rationale'
    ],
    riskAlerts: [
      'Potential placental abruption or previa',
      'Document refusal to perform vaginal exam per protocol',
      'Need to record passenger/partner presence and support provided'
    ],
    narrativeTips: [
      'Use clinical terms for bleeding description',
      'Quote patient regarding fetal movement changes',
      'Detail comfort measures and emotional support provided'
    ]
  },
  {
    id: 'pcr-lab-08',
    title: 'STEMI Alert from Fitness Center',
    category: 'cardiac',
    complexity: 'critical',
    dispatch: {
      time: '18:04',
      complaint: 'Male collapsed on treadmill',
      location: 'Community gym',
      respondingUnits: ['Medic 3', 'Engine 4']
    },
    patient: { age: 47, sex: 'male', weightKg: 90 },
    chiefComplaint: 'Crushing chest pain radiating to jaw and left arm',
    summary: 'Patient found on floor, conscious, holding chest, off-duty nurse started assessment prior to EMS arrival.',
    primaryFindings: [
      'Skin pale, diaphoretic',
      'Reports 10/10 pressure, began suddenly during workout',
      'No significant PMH except high cholesterol',
      'First 12-lead indicates anterior STEMI'
    ],
    vitals: [
      { time: '18:07', bp: '154/92', pulse: 110, respirations: 24, spo2: 95 },
      { time: '18:12', bp: '142/88', pulse: 102, respirations: 22, spo2: 97 }
    ],
    interventions: [
      { time: '18:08', action: 'Administered aspirin 324 mg', response: 'No change yet' },
      { time: '18:09', action: 'Assisted with nitroglycerin 0.4 mg SL', response: 'Pain decreased to 7/10' },
      { time: '18:10', action: 'Transmitted 12-lead to cath lab', response: 'Cath lab activated, ETA provided' }
    ],
    documentationFocus: [
      'Document time from symptom onset to first medical contact',
      'Include statement from off-duty nurse',
      'Record cath lab activation time and receiving physician',
      'Note contraindications for nitro or lack thereof'
    ],
    riskAlerts: [
      'Ensure clear documentation of allergies and PDE inhibitor denial',
      'Need to capture second nitro dose reasoning if given',
      'Highlight coordination with gym staff for crowd control'
    ],
    narrativeTips: [
      'Use bullet-like sentences for clarity of timeline',
      'Cite patient quote describing pain quality',
      'Mention family notification attempts'
    ]
  },
  {
    id: 'pcr-lab-09',
    title: 'Heat Exhaustion at Outdoor Festival',
    category: 'environmental',
    complexity: 'intermediate',
    dispatch: {
      time: '15:36',
      complaint: 'Adult dizzy, nearly syncopal',
      location: 'Downtown street festival',
      respondingUnits: ['Bike Medic Team', 'Medic 12']
    },
    patient: { age: 33, sex: 'female', weightKg: 65 },
    chiefComplaint: 'Dizziness and nausea after standing in sun',
    summary: 'Patient seated under shade, moist skin, reports not drinking water, wearing heavy costume.',
    primaryFindings: [
      'Orthostatic lightheadedness when standing',
      'Skin warm, moist',
      'Mentation intact but sluggish responses',
      'No cardiac history, taking oral contraceptive'
    ],
    vitals: [
      { time: '15:38', bp: '102/64', pulse: 118, respirations: 20, spo2: 98, tempC: 38.2 },
      { time: '15:48', bp: '110/70', pulse: 100, respirations: 18, spo2: 98, tempC: 37.6 }
    ],
    interventions: [
      { time: '15:39', action: 'Moved to shaded misting tent, removed heavy garments', response: 'Reports feeling slightly better' },
      { time: '15:40', action: 'Oral rehydration with electrolyte solution 500 mL', response: 'Pulse decreased to 108' },
      { time: '15:44', action: 'Applied cool packs to neck and groin', response: 'Temperature decreased to 37.6°C' }
    ],
    documentationFocus: [
      'Document environmental temperature and humidity if available',
      'Include patient hydration status and oral intake',
      'Note differential for heat exhaustion vs heat stroke',
      'Record education provided before discharge/transport'
    ],
    riskAlerts: [
      'Ensure documentation of decision to treat/refuse transport',
      'Need to capture ability to ambulate safely before release',
      'Document follow-up instructions including ER warning signs'
    ],
    narrativeTips: [
      'Describe clothing layers removed and cooling measures applied',
      'Note event medical command involvement',
      'Include crowd or scene challenges impacting care'
    ]
  },
  {
    id: 'pcr-lab-10',
    title: 'Postictal Recovery in Grocery Store',
    category: 'neurologic',
    complexity: 'intermediate',
    dispatch: {
      time: '13:02',
      complaint: 'Active seizure',
      location: 'Supermarket aisle',
      respondingUnits: ['Medic 7']
    },
    patient: { age: 41, sex: 'male', weightKg: 82 },
    chiefComplaint: 'Witnessed tonic-clonic seizure resolved prior to EMS arrival',
    summary: 'Patient supine on floor, now drowsy but arousable, small tongue laceration.',
    primaryFindings: [
      'Confused, oriented only to person',
      'Reports medication noncompliance',
      'Bystander video available of seizure onset',
      'No incontinence noted'
    ],
    vitals: [
      { time: '13:04', bp: '136/84', pulse: 96, respirations: 18, spo2: 99, glucose: 108 },
      { time: '13:14', bp: '128/80', pulse: 88, respirations: 16, spo2: 99 }
    ],
    interventions: [
      { time: '13:05', action: 'Airway and C-spine assessed, suctioned oral blood', response: 'Airway patent, no further bleeding' },
      { time: '13:10', action: 'Gathered history from friend via phone', response: 'Confirmed epilepsy diagnosis, last seizure 6 months ago' }
    ],
    documentationFocus: [
      'Document aura onset if known, seizure duration, postictal phase',
      'Include video evidence mention and retention',
      'Record discussion about medication adherence and follow-up',
      'Note driving restriction education if given'
    ],
    riskAlerts: [
      'Ensure refusal documentation if patient declines transport',
      'Need to reference bystander witness information',
      'Highlight absence of trauma evaluation if refused'
    ],
    narrativeTips: [
      'Chronologically outline seizure timeline from witness statements',
      'Include direct patient quotes once oriented',
      'Record environmental factors (floor surface, hazards)'
    ]
  },
  {
    id: 'pcr-lab-11',
    title: 'Industrial Crush Injury',
    category: 'trauma',
    complexity: 'advanced',
    dispatch: {
      time: '09:18',
      complaint: 'Arm caught in press machine',
      location: 'Manufacturing plant',
      respondingUnits: ['Medic 10', 'Rescue 5']
    },
    patient: { age: 45, sex: 'male', weightKg: 88 },
    chiefComplaint: 'Severe right forearm pain, trapped limb',
    summary: 'Patient standing with arm trapped between rollers, machinery locked out on arrival.',
    primaryFindings: [
      'Forearm flattened with obvious deformity',
      'Delayed capillary refill in right hand',
      'Patient anxious but oriented',
      'Employees already applied tourniquet distal to injury improperly'
    ],
    vitals: [
      { time: '09:20', bp: '140/90', pulse: 118, respirations: 24, spo2: 97 },
      { time: '09:35', bp: '130/86', pulse: 110, respirations: 22, spo2: 98 }
    ],
    interventions: [
      { time: '09:22', action: 'Repositioned tourniquet proximal to injury, documented time', response: 'Bleeding limited, radial pulse absent' },
      { time: '09:28', action: 'Pain management via medical command order (document as blank for EMT level)', response: 'Patient reported pain 6/10 from 9/10' },
      { time: '09:33', action: 'Coordinated with rescue for controlled extrication', response: 'Arm freed at 09:34' }
    ],
    documentationFocus: [
      'Record tourniquet times and adjustments clearly',
      'Document contact with plant safety officer and OSHA notifications',
      'Describe limb appearance pre and post release',
      'Note instruction to maintain patient fasting for surgery'
    ],
    riskAlerts: [
      'Potential crush syndrome; highlight need for ALS intercept',
      'Document refusal of IV/medications if not initiated',
      'Ensure photographic documentation per agency policy'
    ],
    narrativeTips: [
      'Detail mechanical entrapment and rescue timeline',
      'List PPE used due to industrial environment',
      'Record patient’s employer-provided information'
    ]
  },
  {
    id: 'pcr-lab-12',
    title: 'COPD Exacerbation with Home Oxygen',
    category: 'respiratory',
    complexity: 'advanced',
    dispatch: {
      time: '21:55',
      complaint: 'Difficulty breathing, home nebulizer ineffective',
      location: 'Apartment, 4th floor walk-up',
      respondingUnits: ['Medic 1']
    },
    patient: { age: 68, sex: 'male', weightKg: 76 },
    chiefComplaint: 'Increasing shortness of breath since afternoon',
    summary: 'Patient sitting forward on couch, nasal cannula at 3 L/min, audible wheezes, speaking one-word sentences.',
    primaryFindings: [
      'SpO2 86% on home oxygen',
      'Productive cough with yellow sputum',
      'Breath sounds diminished bilaterally with expiratory wheezes',
      'Uses rescue inhaler 4 times today with minimal relief'
    ],
    vitals: [
      { time: '21:58', bp: '148/88', pulse: 108, respirations: 28, spo2: 86 },
      { time: '22:05', bp: '142/84', pulse: 102, respirations: 24, spo2: 92 }
    ],
    interventions: [
      { time: '21:59', action: 'Switched to nebulized albuterol/ipratropium', response: 'Improved aeration, decreased wheezing' },
      { time: '22:01', action: 'Increased oxygen to 4 L/min via nebulizer circuit', response: 'SpO2 improved to 92%' },
      { time: '22:03', action: 'Encouraged pursed-lip breathing', response: 'Respiratory rate decreased to 24' }
    ],
    documentationFocus: [
      'Document home oxygen settings and equipment',
      'Record recent medication usage and compliance',
      'Include sputum description and infection indicators',
      'Capture stair carry challenges and manpower used'
    ],
    riskAlerts: [
      'Need to document ALS intercept if required for steroids',
      'Highlight decision to titrate oxygen cautiously due to COPD',
      'Record whether patient brought home medications'
    ],
    narrativeTips: [
      'Quote patient’s respiratory effort statements',
      'Detail caregiver involvement and instructions',
      'Clarify transport position (semi-Fowler)'
    ]
  },
  {
    id: 'pcr-lab-13',
    title: 'Neonatal Resuscitation in Bathroom',
    category: 'obstetric',
    complexity: 'critical',
    dispatch: {
      time: '04:03',
      complaint: 'Unexpected home birth, baby not breathing well',
      location: 'Apartment bathroom',
      respondingUnits: ['Medic 13', 'Engine 9']
    },
    patient: { age: 0, sex: 'female' },
    chiefComplaint: 'Newborn with poor tone and weak cry',
    summary: 'Infant delivered prior to EMS arrival, found on towel, cyanotic extremities, weak respiratory effort.',
    primaryFindings: [
      'APGAR estimated 4 at 1 minute',
      'Heart rate 90 bpm initially',
      'Poor muscle tone, minimal response to stimulation',
      'Mother 26 y/o, G2P1, limited prenatal care'
    ],
    vitals: [
      { time: '04:05', bp: 'N/A', pulse: 90, respirations: 12, spo2: 80 },
      { time: '04:08', bp: 'N/A', pulse: 140, respirations: 30, spo2: 92 }
    ],
    interventions: [
      { time: '04:04', action: 'Dried, warmed, stimulated infant, suctioned mouth/nose', response: 'Heart rate increased to 120' },
      { time: '04:06', action: 'Provided BVM ventilations with neonatal mask at 40 breaths/min', response: 'Improved cry and tone' }
    ],
    documentationFocus: [
      'Document APGAR scores at 1 and 5 minutes',
      'Include maternal history, complications, and delivery timeline',
      'Record neonatal resuscitation steps with times',
      'Note coordination of dual patient transport (mother and infant)'
    ],
    riskAlerts: [
      'Need to state if ALS or neonatal team requested',
      'Document clamp and cut of cord with times',
      'Highlight environmental challenges (space, sanitation)'
    ],
    narrativeTips: [
      'Use precise neonatal terminology (tone, color, reflex)',
      'Detail communication with receiving NICU',
      'Capture mother’s consent and emotional state'
    ]
  },
  {
    id: 'pcr-lab-14',
    title: 'Submersion Injury with Bystander CPR',
    category: 'environmental',
    complexity: 'critical',
    dispatch: {
      time: '14:22',
      complaint: 'Teen pulled from community pool, not breathing',
      location: 'Neighborhood pool',
      respondingUnits: ['Medic 14', 'Engine 6']
    },
    patient: { age: 15, sex: 'male', weightKg: 60 },
    chiefComplaint: 'Found submerged, pulseless per lifeguard',
    summary: 'Lifeguard performing CPR, AED applied with no shock advised, patient regained pulse prior to EMS arrival but remains unresponsive.',
    primaryFindings: [
      'SpO2 88% on BVM with 100% O2',
      'Lung sounds coarse bilaterally',
      'GCS 6 (E1 V1 M4)',
      'Skin cool, cyanotic lips'
    ],
    vitals: [
  { time: '14:24', bp: '110/70', pulse: 78, respirations: 16, spo2: 88 },
  { time: '14:32', bp: '116/74', pulse: 82, respirations: 16, spo2: 94 }
    ],
    interventions: [
      { time: '14:23', action: 'Secured airway, continued BVM ventilation with PEEP valve', response: 'SpO2 improved to 94%' },
      { time: '14:26', action: 'Applied cervical collar and backboard due to dive', response: 'Maintained alignment, no change' },
      { time: '14:28', action: 'Removed wet clothing, applied warm blankets', response: 'Core temperature stabilized at 36.2°C' }
    ],
    documentationFocus: [
      'Note resuscitation timeline, downtime, and bystander interventions',
      'Document water temperature if known',
      'Include neurological status and any gag reflex presence',
      'Record communication with trauma/pediatric receiving facility'
    ],
    riskAlerts: [
      'Potential cervical injury; note immobilization status',
      'Highlight aspiration risk and suctioning needs',
      'Ensure documentation of parental notification'
    ],
    narrativeTips: [
      'Detail AED findings and rhythm analysis',
      'Capture quotes from lifeguards regarding submersion duration',
      'Use objective descriptors for skin color and temperature'
    ]
  },
  {
    id: 'pcr-lab-15',
    title: 'Allergic Reaction after Restaurant Meal',
    category: 'medical',
    complexity: 'advanced',
    dispatch: {
      time: '19:11',
      complaint: 'Difficulty breathing, hives',
      location: 'Downtown restaurant',
      respondingUnits: ['Medic 4']
    },
    patient: { age: 24, sex: 'female', weightKg: 58 },
    chiefComplaint: 'Throat tightness and generalized itching',
    summary: 'Patient standing outside restaurant, facial swelling, speaks in strained voice, reports peanut allergy exposure.',
    primaryFindings: [
      'Generalized urticaria',
      'Swelling of lips and tongue',
      'Stridor and hoarse voice',
      'Carries expired epinephrine auto-injector'
    ],
    vitals: [
      { time: '19:13', bp: '110/68', pulse: 120, respirations: 28, spo2: 92 },
      { time: '19:18', bp: '118/74', pulse: 110, respirations: 22, spo2: 98 }
    ],
    interventions: [
      { time: '19:14', action: 'Administered epinephrine 0.3 mg IM (agency supply)', response: 'Breathing improved, voice stronger' },
      { time: '19:16', action: 'Initiated high-flow oxygen 10 L/min via NRB', response: 'SpO2 increased to 98%' },
      { time: '19:17', action: 'Assisted patient to sit upright, monitored airway', response: 'Stridor resolved by 19:18' }
    ],
    documentationFocus: [
      'Document allergen exposure details and time',
      'Record epinephrine lot number, expiration, and site of administration',
      'Note patient response timeline and remaining symptoms',
      'Include education regarding observation period and biphasic reactions'
    ],
    riskAlerts: [
      'Need to document ALS intercept for additional medications',
      'Highlight expired personal auto-injector and patient counseling',
      'Ensure ED notification of severe reaction'
    ],
    narrativeTips: [
      'Use patient quotes describing throat sensation',
      'Record restaurant staff statements about ingredient list',
      'Detail monitoring of airway and breath sounds en route'
    ]
  },
  {
    id: 'pcr-lab-16',
    title: 'Geriatric Fall with Head Laceration',
    category: 'trauma',
    complexity: 'foundational',
    dispatch: {
      time: '10:27',
      complaint: 'Elderly female fell, bleeding from head',
      location: 'Private residence bathroom',
      respondingUnits: ['Medic 15']
    },
    patient: { age: 78, sex: 'female', weightKg: 60 },
    chiefComplaint: 'Trip and fall while exiting shower',
    summary: 'Patient seated on floor, towel around head, alert and oriented, bleeding from 3 cm scalp laceration.',
    primaryFindings: [
      'Bleeding controlled with direct pressure',
      'Denies loss of consciousness',
      'On anticoagulant therapy (warfarin)',
      'No neck or back tenderness'
    ],
    vitals: [
      { time: '10:30', bp: '138/84', pulse: 88, respirations: 18, spo2: 97 },
      { time: '10:40', bp: '136/82', pulse: 86, respirations: 16, spo2: 98 }
    ],
    interventions: [
      { time: '10:31', action: 'Cleaned wound, applied pressure dressing', response: 'Bleeding controlled' },
      { time: '10:34', action: 'Assisted to stretcher with stand-and-pivot', response: 'No dizziness, tolerated well' }
    ],
    documentationFocus: [
      'Record anticoagulant use and last INR if known',
      'Document mechanism specifics including height of fall',
      'Note home hazards observed (wet floor, throw rugs)',
      'Capture refusal of spinal precautions if patient declines collar'
    ],
    riskAlerts: [
      'Potential delayed intracranial hemorrhage',
      'Need to document family notification and accompaniment',
      'Record wound appearance pre/post dressing'
    ],
    narrativeTips: [
      'Use precise anatomical description of laceration location',
      'Note baseline mental status per family',
      'Include home safety education provided'
    ]
  },
  {
    id: 'pcr-lab-17',
    title: 'Opioid Overdose Reversal',
    category: 'medical',
    complexity: 'advanced',
    dispatch: {
      time: '23:12',
      complaint: 'Unresponsive male, shallow breathing',
      location: 'Public restroom',
      respondingUnits: ['Medic 2', 'Police 14']
    },
    patient: { age: 29, sex: 'male', weightKg: 72 },
    chiefComplaint: 'Found unresponsive by friend',
    summary: 'Patient supine on restroom floor, pinpoint pupils, agonal respirations, paraphernalia nearby.',
    primaryFindings: [
      'Respiratory rate 6/min shallow',
      'Skin cyanotic, cool',
      'Gurgling airway, vomitus in mouth',
      'Friend reports recent heroin use'
    ],
    vitals: [
      { time: '23:13', bp: '118/66', pulse: 58, respirations: 6, spo2: 82 },
      { time: '23:18', bp: '122/70', pulse: 92, respirations: 16, spo2: 96 }
    ],
    interventions: [
      { time: '23:13', action: 'Airway suctioned, inserted OPA, BVM ventilations with 100% O2', response: 'SpO2 improved to 90%' },
      { time: '23:14', action: 'Administered naloxone 2 mg IN', response: 'Respirations increased to 12/min' },
      { time: '23:17', action: 'Second naloxone 2 mg IN for partial response', response: 'Patient awake, agitated' }
    ],
    documentationFocus: [
      'Record respiratory status before and after naloxone',
      'Document patient refusal of further care if applicable with mental status',
      'Include patient education on overdose risk and resources',
      'Note evidence secured by law enforcement'
    ],
    riskAlerts: [
      'Potential for re-narcotization; document monitoring plan',
      'Need to capture patient aggression post reversal',
      'Record refusal signatures if patient declines transport'
    ],
    narrativeTips: [
      'Detail airway management steps chronologically',
      'Quote patient statements post revival',
      'Note presence of drug paraphernalia and disposal'
    ]
  },
  {
    id: 'pcr-lab-18',
    title: 'Stroke Alert with Last Known Well Time',
    category: 'neurologic',
    complexity: 'critical',
    dispatch: {
      time: '06:41',
      complaint: 'Slurred speech, right-sided weakness',
      location: 'Private residence',
      respondingUnits: ['Medic 6']
    },
    patient: { age: 64, sex: 'male', weightKg: 82 },
    chiefComplaint: 'Difficulty speaking and right arm weakness',
    summary: 'Patient found seated at kitchen table, drooling, slurred speech, right facial droop.',
    primaryFindings: [
      'LKW 05:55 according to spouse',
      'FAST exam positive for facial and arm drift',
      'Blood glucose 110 mg/dL',
      'Blood pressure elevated 182/104'
    ],
    vitals: [
      { time: '06:44', bp: '182/104', pulse: 88, respirations: 18, spo2: 98 },
      { time: '06:52', bp: '178/100', pulse: 84, respirations: 18, spo2: 98 }
    ],
    interventions: [
      { time: '06:45', action: 'Performed Cincinnati stroke scale', response: 'Positive findings confirmed' },
      { time: '06:46', action: 'Contacted stroke center, prenotification sent', response: 'Stroke team activated' }
    ],
    documentationFocus: [
      'Record accurate last known well time and source',
      'Include stroke scale findings and times',
      'Document contraindications to thrombolytics if known',
      'Note transportation decision and route chosen'
    ],
    riskAlerts: [
      'Ensure glucose documented to rule out mimic',
      'Need to record any anticoagulant usage',
      'Highlight patient refusal of certain assessments if applicable'
    ],
    narrativeTips: [
      'Use time-stamped sentences',
      'Quote spouse statements describing onset',
      'Describe transport status (lights and sirens, crew roles)'
    ]
  },
  {
    id: 'pcr-lab-19',
    title: 'Dialysis Patient with Hyperkalemia Symptoms',
    category: 'medical',
    complexity: 'advanced',
    dispatch: {
      time: '12:12',
      complaint: 'Weakness after missed dialysis session',
      location: 'Dialysis clinic lobby',
      respondingUnits: ['Medic 16']
    },
    patient: { age: 58, sex: 'female', weightKg: 72 },
    chiefComplaint: 'Generalized weakness and palpitations',
    summary: 'Patient waiting for rescheduled dialysis, complains of muscle cramps, states last treatment 4 days ago.',
    primaryFindings: [
      'Irregular pulse',
      'Peaked T-waves on monitor (if available)',
      'No chest pain, mild shortness of breath',
      'AV fistula left forearm with bruit/thrill present'
    ],
    vitals: [
      { time: '12:15', bp: '150/88', pulse: 108, respirations: 20, spo2: 96 },
      { time: '12:25', bp: '148/90', pulse: 104, respirations: 20, spo2: 97 }
    ],
    interventions: [
      { time: '12:16', action: 'High-flow oxygen 4 L/min via nasal cannula', response: 'SpO2 maintained 97%' },
      { time: '12:18', action: 'Obtained 12-lead ECG, transmitted to ED', response: 'ED physician advised emergent transport' }
    ],
    documentationFocus: [
      'Record dialysis schedule and missed sessions',
      'Document fistula assessment and care',
      'Include ECG findings described objectively',
      'Note consultation with nephrologist or ED physician'
    ],
    riskAlerts: [
      'Potential for arrhythmias en route',
      'Need to capture medication list, especially potassium binders',
      'Highlight that no blood pressures taken on fistula arm'
    ],
    narrativeTips: [
      'Detail patient’s dietary indiscretions if reported',
      'Quote patient describing muscle cramp locations',
      'Include transport mode and monitoring decisions'
    ]
  },
  {
    id: 'pcr-lab-20',
    title: 'Community Flu Clinic Reaction',
    category: 'special',
    complexity: 'foundational',
    dispatch: {
      time: '09:05',
      complaint: 'Syncope after vaccination',
      location: 'Community center gym',
      respondingUnits: ['Medic 12']
    },
    patient: { age: 19, sex: 'male', weightKg: 68 },
    chiefComplaint: 'Lightheadedness and fainting after flu shot',
    summary: 'Patient collapsed briefly post vaccination, now alert, pale, denies trauma.',
    primaryFindings: [
      'No head strike',
      'Reports anxiety around needles',
      'Blood sugar 102 mg/dL',
      'No allergic signs'
    ],
    vitals: [
      { time: '09:08', bp: '104/66', pulse: 74, respirations: 16, spo2: 99 },
      { time: '09:18', bp: '118/72', pulse: 78, respirations: 16, spo2: 99 }
    ],
    interventions: [
      { time: '09:09', action: 'Supine positioning with legs elevated', response: 'Patient stated improved symptoms' },
      { time: '09:12', action: 'Provided oral hydration and snack', response: 'Color improved, vitals normalized' }
    ],
    documentationFocus: [
      'Document vaccination type, lot number if available',
      'Include witness statements and duration of loss of consciousness',
      'Record patient understanding of benign syncope',
      'Note decision regarding transport or release'
    ],
    riskAlerts: [
      'Potential for delayed allergic reaction; provide instructions',
      'Document refusal to seek further care if applicable',
      'Highlight observation period completed on scene'
    ],
    narrativeTips: [
      'Describe environment (crowded clinic) and any delays',
      'Include staff names providing information',
      'Use objective terms like "brief syncope" rather than "fainted"'
    ]
  },
  {
    id: 'pcr-lab-21',
    title: 'Teen Behavioral Outburst with Lacerations',
    category: 'behavioral',
    complexity: 'advanced',
    dispatch: {
      time: '17:33',
      complaint: 'Teen cut forearm during argument',
      location: 'Single-family home',
      respondingUnits: ['Medic 18', 'Police 10']
    },
    patient: { age: 16, sex: 'female', pronouns: 'she/her' },
    chiefComplaint: 'Anger outburst, admits to cutting for relief',
    summary: 'Patient cooperative but tearful, superficial lacerations to left forearm, denies suicidal intent but history of self-harm.',
    primaryFindings: [
      'Multiple parallel superficial cuts, bleeding controlled',
      'Parents present, concerned about safety',
      'No ingestion, vital signs stable',
      'Patient currently in therapy, missed last appointment'
    ],
    vitals: [
      { time: '17:36', bp: '112/70', pulse: 88, respirations: 18, spo2: 99 },
      { time: '17:45', bp: '110/68', pulse: 84, respirations: 16, spo2: 99 }
    ],
    interventions: [
      { time: '17:37', action: 'Cleansed and dressed lacerations', response: 'Bleeding fully controlled' },
      { time: '17:40', action: 'Coordinated with crisis hotline via phone', response: 'Plan for outpatient follow-up confirmed' }
    ],
    documentationFocus: [
      'Document patient statements verbatim about intent',
      'Include parental consent and involvement',
      'Record mental health resources contacted',
      'Note safety plan provided prior to disposition'
    ],
    riskAlerts: [
      'Need to document evaluation for deeper injuries',
      'Record decision if transport refused and signatures obtained',
      'Highlight mandatory reporting requirements if triggered'
    ],
    narrativeTips: [
      'Avoid stigmatizing language; be factual',
      'Detail coping skills discussed and referrals given',
      'Mention patient appearance, affect, and behavior objectively'
    ]
  },
  {
    id: 'pcr-lab-22',
    title: 'School Bus Multi-Patient Incident',
    category: 'trauma',
    complexity: 'critical',
    dispatch: {
      time: '07:05',
      complaint: 'School bus vs SUV, multiple injuries',
      location: 'Rural intersection',
      respondingUnits: ['Medic 19', 'Medic 20', 'Engine 8', 'Rescue 4']
    },
    patient: { age: 12, sex: 'male' },
    chiefComplaint: 'Headache, neck pain after bus collision',
    summary: 'Scene with 18 students, triage underway, this patient tagged yellow, seated with cervical collar applied by first responders.',
    primaryFindings: [
      'Complains of neck pain and headache',
      'No loss of consciousness reported',
      'Mild nausea, no vomiting',
      'Seatbelt worn'
    ],
    vitals: [
      { time: '07:09', bp: '108/68', pulse: 96, respirations: 20, spo2: 99 },
      { time: '07:20', bp: '110/70', pulse: 94, respirations: 18, spo2: 99 }
    ],
    interventions: [
      { time: '07:10', action: 'Secured to pediatric backboard with padding', response: 'Pain reduced from 6/10 to 4/10' },
      { time: '07:12', action: 'Coordinated with incident command for transport priority', response: 'Assigned to Medic 19 for transport' }
    ],
    documentationFocus: [
      'Record triage tag number and ICS roles',
      'Include patient accountability list entry',
      'Note communication with school officials and parents',
      'Document number of patients transported by unit'
    ],
    riskAlerts: [
      'Need to capture observation for concussive symptoms',
      'Highlight any deviation from mass-casualty protocol',
      'Document additional resources requested or cancelled'
    ],
    narrativeTips: [
      'Use ICS terminology (Triage Group, Transport Group)',
      'Detail time patient removed from scene',
      'Mention other agencies involved and their roles'
    ]
  },
  {
    id: 'pcr-lab-23',
    title: 'Residential Fire Smoke Inhalation',
    category: 'respiratory',
    complexity: 'advanced',
    dispatch: {
      time: '01:44',
      complaint: 'Smoke inhalation, difficulty breathing',
      location: 'Single-story home fire scene',
      respondingUnits: ['Medic 21', 'Engine 10']
    },
    patient: { age: 38, sex: 'female', weightKg: 62 },
    chiefComplaint: 'Shortness of breath after rescuing pets',
    summary: 'Patient walked out of structure, soot around mouth and nose, hoarse voice, coughing.',
    primaryFindings: [
      'SpO2 90% on room air',
      'Carbon monoxide exposure suspected',
      'Singed nasal hairs',
      'Reports wheezing history but no inhaler'
    ],
    vitals: [
      { time: '01:46', bp: '138/86', pulse: 118, respirations: 26, spo2: 90 },
      { time: '01:56', bp: '134/84', pulse: 108, respirations: 22, spo2: 96 }
    ],
    interventions: [
      { time: '01:47', action: 'High-flow oxygen via NRB 15 L/min', response: 'SpO2 improved to 96%' },
      { time: '01:49', action: 'Nebulized bronchodilator per protocol', response: 'Wheezing decreased' },
      { time: '01:52', action: 'Monitored EtCO2 and CO-oximetry if available', response: 'COHb 18%, notified receiving facility' }
    ],
    documentationFocus: [
      'Document airway assessment including swelling signs',
      'Include CO exposure readings and device used',
      'Record time patient exited structure and care provided by fire crew',
      'Note animal rescue attempts and smoke exposure duration'
    ],
    riskAlerts: [
      'Potential airway edema; highlight early warning signs',
      'Need to document ALS intercept for advanced airway readiness',
      'Record patient refusal of intubation if discussed'
    ],
    narrativeTips: [
      'Describe soot distribution objectively',
      'Note use of humidified oxygen if applied',
      'Detail instructions given regarding delayed airway swelling'
    ]
  },
  {
    id: 'pcr-lab-24',
    title: 'Cold Exposure with Mild Hypothermia',
    category: 'environmental',
    complexity: 'intermediate',
    dispatch: {
      time: '03:28',
      complaint: 'Homeless male cold exposure',
      location: 'Downtown park bench',
      respondingUnits: ['Medic 22']
    },
    patient: { age: 52, sex: 'male', weightKg: 74 },
    chiefComplaint: 'Shivering, numb fingers',
    summary: 'Patient found seated, wet clothing, states outside overnight, denies alcohol use.',
    primaryFindings: [
      'Core temperature 34°C (93.2°F)',
      'Slurred speech, slow movements',
      'No trauma, denies falling',
      'Mild frostnip fingertips'
    ],
    vitals: [
      { time: '03:30', bp: '118/72', pulse: 64, respirations: 16, spo2: 97, tempC: 34 },
      { time: '03:45', bp: '122/74', pulse: 68, respirations: 18, spo2: 98, tempC: 35 }
    ],
    interventions: [
      { time: '03:31', action: 'Removed wet clothing, applied warm blankets and heat packs', response: 'Shivering decreased' },
      { time: '03:35', action: 'Warm sweet fluids offered (if protocol allows)', response: 'Patient accepted, temp increased to 35°C' }
    ],
    documentationFocus: [
      'Document core temperature measurement method',
      'Note rewarming techniques and times',
      'Include social services referral and shelter information given',
      'Record assessment for co-ingestions or trauma'
    ],
    riskAlerts: [
      'Potential rebound hypothermia; document monitoring plan',
      'Need to capture refusal if patient declines shelter transport',
      'Record coordination with outreach teams'
    ],
    narrativeTips: [
      'Describe environmental conditions (wind, snow)',
      'Note patient orientation and decision-making capacity',
      'Include clothing items removed and stored'
    ]
  },
  {
    id: 'pcr-lab-25',
    title: 'COVID-19 Respiratory Deterioration',
    category: 'respiratory',
    complexity: 'critical',
    dispatch: {
      time: '20:18',
      complaint: 'COVID-positive patient struggling to breathe',
      location: 'Private residence bedroom',
      respondingUnits: ['Medic 23']
    },
    patient: { age: 61, sex: 'male', weightKg: 90 },
    chiefComplaint: 'Worsening shortness of breath on day 8 of illness',
    summary: 'Patient seated upright, home pulse oximeter reading 82%, audible crackles, on 4 L/min nasal cannula at baseline.',
    primaryFindings: [
      'SpO2 80% on arrival with NC 4 L/min',
      'Respiratory rate 30, accessory muscle use',
      'Reports chest tightness but no chest pain',
      'Has history of hypertension and type 2 diabetes'
    ],
    vitals: [
      { time: '20:20', bp: '146/88', pulse: 112, respirations: 30, spo2: 80 },
      { time: '20:26', bp: '140/86', pulse: 108, respirations: 26, spo2: 92 }
    ],
    interventions: [
      { time: '20:21', action: 'Transitioned to NRB 15 L/min over nasal cannula (NRB-over-NC technique)', response: 'SpO2 improved to 88%' },
      { time: '20:23', action: 'Applied CPAP 10 cm H2O with viral filter', response: 'SpO2 increased to 92%, work of breathing decreased' },
      { time: '20:24', action: 'Contacted receiving hospital with respiratory alert', response: 'Directed to negative-pressure room' }
    ],
    documentationFocus: [
      'Record isolation precautions and PPE used by crew',
      'Include oxygen delivery methods and adjustments',
      'Document patient’s proning tolerance or refusal',
      'Note comorbidities impacting treatment decisions'
    ],
    riskAlerts: [
      'Potential for rapid decompensation en route',
      'Need to document filter use and equipment disposal',
      'Highlight family notification and quarantine guidance'
    ],
    narrativeTips: [
      'Describe patient positioning (upright vs prone)',
      'Note remote assessment tools used (pulse ox, capno)',
      'Record supportive counseling provided to family'
    ]
  }
];
