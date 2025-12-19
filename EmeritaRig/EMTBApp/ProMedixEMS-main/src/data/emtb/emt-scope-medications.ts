// EMT Scope of Practice Medications Dataset
// Provides standardized dosing references for EMT-level administration or assist

export interface EMTMedication {
  name: string;
  classification: string;
  forms: string[];
  dosage: {
    adult: string;
    pediatric: string;
    route: string;
  };
  indications: string[];
  contraindications: string[];
  precautions?: string[];
  sideEffects: string[];
  notes?: string[];
}

export const EMT_SCOPE_MEDICATIONS: EMTMedication[] = [
  {
    name: 'Oxygen',
    classification: 'Medical Gas',
    forms: ['Compressed gas cylinder', 'Fixed or portable delivery systems'],
    dosage: {
      adult: '2-15 L/min based on device (nasal cannula to BVM)',
      pediatric: '2-15 L/min based on device and presentation',
      route: 'Inhalation'
    },
    indications: [
      'Hypoxia or suspected hypoxia',
      'Respiratory distress or failure',
      'Shock, trauma, or altered mental status',
      'Carbon monoxide exposure'
    ],
    contraindications: ['None in prehospital emergency care'],
    precautions: [
      'Use lowest flow rate that maintains target SpO₂ 94-99%',
      'Humidify for long transports when available',
      'Monitor closely in COPD patients with chronic CO₂ retention'
    ],
    sideEffects: ['Dry mucous membranes', 'Possible oxygen toxicity with prolonged high concentrations'],
    notes: [
      'Document delivery device, flow rate, and patient response',
      'Verify cylinder pressure and equipment integrity before use'
    ]
  },
  {
    name: 'Oral Glucose (Dextrose Paste)',
    classification: 'Carbohydrate',
    forms: ['Tube or single-dose packet (typically 15-24 g)'],
    dosage: {
      adult: '15-24 g buccal; repeat per protocol if symptoms persist',
      pediatric: '0.5 g/kg up to 15 g buccal',
      route: 'Buccal/oral'
    },
    indications: [
      'Symptomatic hypoglycemia with blood glucose <70 mg/dL and ability to swallow',
      'Suspected hypoglycemia with altered mental status but intact gag reflex'
    ],
    contraindications: [
      'Inability to follow commands or protect airway',
      'Suspected or confirmed hyperglycemia without hypoglycemic signs',
      'Nausea, vomiting, or decreased level of consciousness'
    ],
    sideEffects: ['Nausea', 'Possible aspiration if improperly administered'],
    notes: ['Reassess blood glucose and mental status after administration']
  },
  {
    name: 'Activated Charcoal',
    classification: 'Adsorbent',
    forms: ['Premixed suspension (typically 25-50 g)'],
    dosage: {
      adult: '25-50 g orally as single dose per medical control',
      pediatric: '1 g/kg up to 25 g orally',
      route: 'Oral'
    },
    indications: [
      'Ingestion of certain toxins or medications within the past hour',
      'Medical control approval when contraindications absent'
    ],
    contraindications: [
      'Altered mental status without protected airway',
      'Ingestion of acids, alkalis, heavy metals, or hydrocarbons',
      'Known obstruction or decreased peristalsis'
    ],
    precautions: ['Requires medical direction in many jurisdictions'],
    sideEffects: ['Nausea and vomiting', 'Constipation or diarrhea', 'Risk of aspiration if vomiting occurs'],
    notes: ['Shake thoroughly before administration to suspend charcoal evenly']
  },
  {
    name: 'Aspirin (Acetylsalicylic Acid)',
    classification: 'Antiplatelet',
    forms: ['81 mg chewable tablets', '325 mg tablets'],
    dosage: {
      adult: '162-324 mg chewable (2-4 x 81 mg tablets)',
      pediatric: 'Not indicated for pediatric patients',
      route: 'Oral (chewed)'
    },
    indications: [
      'Chest pain or discomfort suggestive of acute coronary syndrome',
      'Medical direction approval when indicated'
    ],
    contraindications: [
      'Known hypersensitivity to aspirin',
      'Active gastrointestinal bleeding or ulcer disease',
      'Bleeding disorders',
      'Suspected aortic dissection'
    ],
    precautions: ['Use caution with history of asthma or taking anticoagulants'],
    sideEffects: ['Gastrointestinal upset', 'Tinnitus at high doses', 'Increased bleeding tendency'],
    notes: ['Ensure patient has not taken maximum daily dose prior to EMS arrival']
  },
  {
    name: 'Nitroglycerin (Assist with Prescribed)',
    classification: 'Vasodilator',
    forms: ['0.4 mg sublingual tablets', '0.4 mg metered-dose spray'],
    dosage: {
      adult: '0.4 mg SL every 5 minutes up to 3 doses with medical control',
      pediatric: 'Not typically administered to pediatric patients by EMT',
      route: 'Sublingual'
    },
    indications: [
      'Chest pain of suspected cardiac origin with patient prescription',
      'Medical control authorization',
      'Systolic blood pressure ≥ 100 mmHg and no contraindications'
    ],
    contraindications: [
      'Systolic blood pressure < 100 mmHg',
      'Recent use of phosphodiesterase inhibitors (24-48 hours)',
      'Head injury or intracranial hemorrhage',
      'Bradycardia < 50 bpm or tachycardia > 120 bpm without medical control'
    ],
    precautions: ['EMT assists only if medication is patient-prescribed unless protocol allows otherwise'],
    sideEffects: ['Hypotension', 'Headache', 'Dizziness', 'Flushing'],
    notes: ['Document blood pressure before and after each dose']
  },
  {
    name: 'Epinephrine Auto-Injector',
    classification: 'Sympathomimetic (Adrenergic agonist)',
    forms: ['0.3 mg adult auto-injector', '0.15 mg pediatric auto-injector'],
    dosage: {
      adult: '0.3 mg IM lateral thigh; repeat per protocol after 5 minutes if needed',
      pediatric: '0.15 mg IM lateral thigh for patients <30 kg; repeat per protocol',
      route: 'Intramuscular via auto-injector'
    },
    indications: [
      'Anaphylaxis with airway compromise, hypotension, or respiratory distress',
      'Angioedema or severe allergic reaction with rapid progression'
    ],
    contraindications: ['None in life-threatening anaphylaxis'],
    sideEffects: ['Tachycardia', 'Palpitations', 'Anxiety', 'Headache', 'Pallor'],
    notes: ['Hold injector in place for 10 seconds and massage site per manufacturer guidance']
  },
  {
    name: 'Naloxone',
    classification: 'Opioid Antagonist',
    forms: ['Intranasal spray (2 mg / 4 mg)', 'Intramuscular auto-injector', 'Vial for IM/IV'],
    dosage: {
      adult: '2-4 mg IN; repeat every 2-3 minutes titrated to respiratory effort',
      pediatric: '0.1 mg/kg IN/IM up to adult dose',
      route: 'Intranasal or intramuscular'
    },
    indications: [
      'Suspected opioid overdose with respiratory depression',
      'Unknown unconscious patient with pinpoint pupils and hypoventilation'
    ],
    contraindications: ['Known allergy or hypersensitivity to naloxone'],
    precautions: ['Titrate to adequate ventilation to avoid acute withdrawal'],
    sideEffects: ['Acute withdrawal symptoms', 'Nausea and vomiting', 'Agitation'],
    notes: ['Ventilatory support remains priority; medication does not replace airway management']
  },
  {
    name: 'Albuterol (Assist with Prescribed MDI or Nebulizer)',
    classification: 'Beta-2 Agonist Bronchodilator',
    forms: ['Metered-dose inhaler', 'Nebulized solution 2.5 mg/3 mL'],
    dosage: {
      adult: 'MDI: 1-2 puffs (90 mcg each); Nebulizer: 2.5 mg in 3 mL normal saline over 5-15 min',
      pediatric: 'MDI: 1-2 puffs; Nebulizer: 1.25-2.5 mg based on age/weight',
      route: 'Inhalation'
    },
    indications: [
      'Bronchospasm due to asthma, COPD, or allergic reaction',
      'Patient-prescribed medication with medical control approval'
    ],
    contraindications: [
      'Known hypersensitivity',
      'Inability to follow commands for proper inhaler use',
      'Severe tachyarrhythmias without medical control'
    ],
    sideEffects: ['Tachycardia', 'Tremors', 'Nervousness', 'Palpitations', 'Nausea'],
    notes: ['Instruct patient on proper inhaler technique and shake inhaler before use']
  },
  {
    name: 'Nitrous Oxide (50% N₂O / 50% O₂)',
    classification: 'Inhaled Analgesic',
    forms: ['Premixed cylinder with demand valve system'],
    dosage: {
      adult: 'Self-administered inhalation until pain relieved or side effects appear',
      pediatric: 'Self-administered inhalation if able to follow instructions',
      route: 'Inhalation with demand-valve'
    },
    indications: [
      'Moderate to severe pain in alert patients',
      'Burns, musculoskeletal trauma, or labor pain with intact airway'
    ],
    contraindications: [
      'Altered mental status or inability to self-administer',
      'Chest trauma with suspected pneumothorax',
      'Abdominal distention or bowel obstruction',
      'Decompression sickness or scuba injury',
      'Head injury with increased intracranial pressure'
    ],
    sideEffects: ['Dizziness', 'Nausea', 'Euphoria', 'Hallucinations'],
    notes: ['Ensure well-ventilated area and discontinue if SpO₂ drops or patient becomes drowsy']
  }
];
