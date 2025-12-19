// Chapter 5: Essential Terminology for Responders - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter5Flashcards: Flashcard[] = [
  {
    id: 'ch5-001',
    question: 'Define the anatomical position.',
    answer: 'Standing upright, facing forward, arms at sides with palms forward, feet shoulder-width apart. Used as a universal reference for directional terms.',
    category: 'Anatomy Terms',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch5-002',
    question: 'Differentiate between proximal and distal.',
    answer: 'Proximal: closer to the point of attachment or trunk. Distal: farther from the point of attachment or trunk.',
    category: 'Directional Terms',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch5-003',
    question: 'What do the prefixes tachy- and brady- mean?',
    answer: 'Tachy- means fast (e.g., tachycardia = fast heart rate). Brady- means slow (e.g., bradycardia = slow heart rate).',
    category: 'Medical Terminology',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch5-004',
    question: 'Interpret the suffixes -itis and -ectomy.',
    answer: '-itis = inflammation (e.g., appendicitis). -ectomy = surgical removal (e.g., appendectomy).',
    category: 'Medical Terminology',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch5-005',
    question: 'List the three anatomical planes and a brief description of each.',
    answer: 'Sagittal: left/right divisions; Frontal (coronal): front/back divisions; Transverse: top/bottom divisions.',
    category: 'Anatomy Terms',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch5-006',
    question: 'Define medial vs. lateral and superior vs. inferior.',
    answer: 'Medial: toward the midline; Lateral: away from the midline. Superior: above/closer to the head; Inferior: below/closer to the feet.',
    category: 'Directional Terms',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch5-007',
    question: 'Expand the abbreviations: HR, BP, RR, SpO2, LOC, A&O×4.',
    answer: 'HR: heart rate; BP: blood pressure; RR: respiratory rate; SpO2: peripheral oxygen saturation; LOC: level of consciousness; A&O×4: alert and oriented to person, place, time, and event.',
    category: 'Abbreviations',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch5-008',
    question: 'What do the terms anterior/posterior and dorsal/ventral mean?',
    answer: 'Anterior (ventral): front of the body; Posterior (dorsal): back of the body.',
    category: 'Directional Terms',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch5-009',
    question: 'Define OPQRST and what each letter assesses.',
    answer: 'Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time. Structure used to assess pain and symptoms.',
    category: 'Assessment Mnemonics',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch5-010',
    question: 'Define SAMPLE and what each letter represents.',
    answer: 'Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading up to illness/injury.',
    category: 'Assessment Mnemonics',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch5-011',
    question: 'Interpret medical roots: cardio-, neuro-, hemo-/hema-, pneumo-/pulmo-.',
    answer: 'Cardio-: heart; Neuro-: nervous system/nerve; Hemo-/Hema-: blood; Pneumo-/Pulmo-: lungs/air.',
    category: 'Medical Terminology',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch5-012',
    question: 'What does NPO mean? What about PO and PRN?',
    answer: 'NPO: nothing by mouth; PO: by mouth; PRN: as needed.',
    category: 'Abbreviations',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch5-013',
    question: 'What is DCAP-BTLS used for and what does it stand for?',
    answer: 'Used during trauma assessment to note injuries: Deformities, Contusions, Abrasions, Punctures/Penetrations, Burns, Tenderness, Lacerations, Swelling.',
    category: 'Assessment Mnemonics',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch5-014',
    question: 'Differentiate hypoxia, hypoxemia, and ischemia.',
    answer: 'Hypoxia: low oxygen at the tissue level; Hypoxemia: low oxygen in arterial blood; Ischemia: inadequate blood flow/perfusion to tissues.',
    category: 'Clinical Terms',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch5-015',
    question: 'Explain SBAR and MIST handoff structures briefly.',
    answer: 'SBAR: Situation, Background, Assessment, Recommendation. MIST: Mechanism/Medical complaint, Injuries/Illness, Signs/Symptoms and vitals, Treatments given and response.',
    category: 'Communication',
    difficulty: 'medium',
    type: 'definition'
  }
];

export default chapter5Flashcards;
