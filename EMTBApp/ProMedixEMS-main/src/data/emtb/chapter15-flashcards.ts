// Chapter 15: Medical Overview Essentials - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter15Flashcards: Flashcard[] = [
  {
    id: 'ch15-001',
    question: 'What is the difference between a medical emergency and trauma?',
    answer: 'Medical: illness-related, internal cause, gradual or sudden onset. Trauma: injury-related, external force, mechanism of injury present.',
    category: 'Medical Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch15-002',
    question: 'What does SAMPLE stand for in medical history taking?',
    answer: 'Signs/symptoms, Allergies, Medications, Pertinent past history, Last oral intake, Events leading up.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch15-003',
    question: 'What does OPQRST help assess in medical patients?',
    answer: 'Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Timing - used for symptom analysis.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch15-004',
    question: 'Why is medical history more important in medical patients than trauma patients?',
    answer: 'Medical conditions require understanding chronological symptom development, previous episodes, medications, and comorbidities to guide appropriate care.',
    category: 'Medical Assessment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch15-005',
    question: 'What is the chief complaint?',
    answer: 'The primary reason the patient called for help, stated in their own words.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch15-006',
    question: 'Define acute versus chronic medical conditions.',
    answer: 'Acute: sudden onset, severe symptoms requiring immediate attention. Chronic: long-term condition that persists over time.',
    category: 'Medical Terminology',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch15-007',
    question: 'What is an exacerbation?',
    answer: 'Worsening of a chronic condition or symptoms.',
    category: 'Medical Terminology',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch15-008',
    question: 'What information should you gather about medications during SAMPLE?',
    answer: 'Prescription drugs, over-the-counter medications, supplements, compliance issues, and recent changes.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch15-009',
    question: 'How do you determine transport priority for medical patients?',
    answer: 'Based on severity of condition, response to treatment, need for advanced interventions, and potential for deterioration.',
    category: 'Transport Decisions',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch15-010',
    question: 'What are activities of daily living (ADL)?',
    answer: 'Basic self-care tasks like bathing, dressing, eating used to assess functional status.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch15-011',
    question: 'What is polypharmacy and why is it important?',
    answer: 'Use of multiple medications, common in elderly patients; increases risk of drug interactions and adverse effects.',
    category: 'Medications',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch15-012',
    question: 'How should you approach a patient with an altered mental status?',
    answer: 'Establish baseline mental status, check glucose, consider hypoxia, assess medications, and look for environmental clues.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'scenario'
  },
  {
    id: 'ch15-013',
    question: 'What environmental clues help in medical assessment?',
    answer: 'Medication bottles, medical devices, home oxygen, mobility aids, living conditions, and signs of self-care ability.',
    category: 'Scene Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch15-014',
    question: 'When might a medical condition cause trauma?',
    answer: 'Syncope causing fall, seizure causing injury, hypoglycemia causing motor vehicle accident, or cardiac event while driving.',
    category: 'Medical Assessment',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch15-015',
    question: 'What communication techniques work best with medical patients?',
    answer: 'Active listening, open-ended questions, empathy, avoiding medical jargon, and involving family when appropriate.',
    category: 'Communication',
    difficulty: 'medium',
    type: 'application'
  }
];

export default chapter15Flashcards;