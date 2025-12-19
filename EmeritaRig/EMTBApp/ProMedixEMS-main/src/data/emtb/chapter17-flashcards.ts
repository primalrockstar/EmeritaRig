// Chapter 17: Cardiovascular Emergency Response - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter17Flashcards: Flashcard[] = [
  {
    id: 'ch17-001',
    question: 'What is Acute Coronary Syndrome (ACS)?',
    answer: 'Spectrum of conditions caused by sudden reduction in blood flow to heart muscle.',
    category: 'Cardiac Emergencies',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch17-002',
    question: 'What is the difference between STEMI and NSTEMI?',
    answer: 'STEMI: complete coronary artery blockage with ST elevation. NSTEMI: partial blockage without ST elevation.',
    category: 'Cardiac Emergencies',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch17-003',
    question: 'What are the classic signs and symptoms of myocardial infarction?',
    answer: 'Chest pain/pressure, shortness of breath, nausea, sweating, pain radiating to arm/jaw/back.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch17-004',
    question: 'When should EMTs assist with nitroglycerin administration?',
    answer: 'Chest pain, prescribed to patient, systolic BP >100 mmHg, no recent erectile dysfunction medication use.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch17-005',
    question: 'What is the primary benefit of aspirin in cardiac emergencies?',
    answer: 'Antiplatelet medication that reduces blood clot formation and prevents further coronary occlusion.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch17-006',
    question: 'What is angina pectoris?',
    answer: 'Chest pain due to temporary insufficient blood flow to heart muscle.',
    category: 'Cardiac Emergencies',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch17-007',
    question: 'What are signs of congestive heart failure (CHF)?',
    answer: 'Shortness of breath, pedal edema, orthopnea, paroxysmal nocturnal dyspnea, crackles in lungs.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch17-008',
    question: 'What is cardiogenic shock?',
    answer: 'Heart failure severe enough to cause shock with inadequate tissue perfusion.',
    category: 'Cardiac Emergencies',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch17-009',
    question: 'How does nitroglycerin work?',
    answer: 'Dilates coronary arteries and reduces preload, decreasing cardiac workload.',
    category: 'Pharmacology',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch17-010',
    question: 'What are atypical presentations of MI?',
    answer: 'Common in women, elderly, diabetics - may present as weakness, nausea, back pain, or shortness of breath.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'recognition'
  },
  {
    id: 'ch17-011',
    question: 'What is the time goal for STEMI patients (door-to-balloon)?',
    answer: 'Less than 90 minutes from first medical contact to balloon inflation for primary PCI.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch17-012',
    question: 'What positioning is best for CHF patients?',
    answer: 'High Fowler\'s position (sitting upright) to reduce venous return and ease breathing.',
    category: 'Treatment',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch17-013',
    question: 'What are contraindications to nitroglycerin?',
    answer: 'Systolic BP <100 mmHg, recent erectile dysfunction medication (24-48 hrs), right heart infarction.',
    category: 'Treatment',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch17-014',
    question: 'What is orthopnea?',
    answer: 'Difficulty breathing when lying flat, requiring patient to sit up or sleep with multiple pillows.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch17-015',
    question: 'When should you activate cardiac alert/STEMI protocol?',
    answer: 'Chest pain with 12-lead showing STEMI, or high suspicion ACS meeting criteria per local protocol.',
    category: 'Protocol',
    difficulty: 'medium',
    type: 'assessment'
  }
];

export default chapter17Flashcards;