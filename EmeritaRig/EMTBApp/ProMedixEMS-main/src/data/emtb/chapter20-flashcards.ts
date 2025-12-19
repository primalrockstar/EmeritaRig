// Chapter 20: Endocrine and Blood Emergencies - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter20Flashcards: Flashcard[] = [
  {
    id: 'ch20-001',
    question: 'What is the normal blood glucose range?',
    answer: '70-100 mg/dL fasting, with hypoglycemia <70 mg/dL and hyperglycemia >180 mg/dL.',
    category: 'Endocrine Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch20-002',
    question: 'What are the classic signs of hypoglycemia?',
    answer: 'Altered mental status, sweating, shakiness, rapid pulse, hunger, anxiety, and potential seizure.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch20-003',
    question: 'When can EMTs administer oral glucose?',
    answer: 'Conscious patient with diabetes, suspected hypoglycemia, and ability to swallow safely.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch20-004',
    question: 'What is diabetic ketoacidosis (DKA)?',
    answer: 'Life-threatening complication of diabetes with high glucose, ketosis, and metabolic acidosis.',
    category: 'Endocrine Emergencies',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch20-005',
    question: 'What are the signs of DKA?',
    answer: 'High glucose, dehydration, fruity breath odor, Kussmaul respirations, nausea, vomiting.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch20-006',
    question: 'What is the difference between Type 1 and Type 2 diabetes?',
    answer: 'Type 1: autoimmune insulin deficiency, usually younger. Type 2: insulin resistance, usually older.',
    category: 'Pathophysiology',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch20-007',
    question: 'What causes sickle cell crisis?',
    answer: 'Triggers like infection, dehydration, cold, stress cause sickled cells to block blood vessels.',
    category: 'Hematologic Emergencies',
    difficulty: 'medium',
    type: 'scenario'
  },
  {
    id: 'ch20-008',
    question: 'How do you treat a patient in sickle cell crisis?',
    answer: 'Pain management, oxygen, IV fluids, keep warm, rapid transport to appropriate facility.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch20-009',
    question: 'What is Kussmaul breathing?',
    answer: 'Deep, rapid breathing pattern seen in DKA as body attempts to eliminate excess acid.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch20-010',
    question: 'What should you suspect in an unconscious diabetic patient?',
    answer: 'Hypoglycemia until proven otherwise - check glucose and consider oral glucose if conscious.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'scenario'
  },
  {
    id: 'ch20-011',
    question: 'What is the onset difference between hypoglycemia and hyperglycemia?',
    answer: 'Hypoglycemia: rapid onset (minutes to hours). Hyperglycemia: gradual onset (hours to days).',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch20-012',
    question: 'What is hemolysis?',
    answer: 'Destruction of red blood cells, which can occur in sickle cell disease.',
    category: 'Hematologic Disorders',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch20-013',
    question: 'Why are diabetic patients prone to infections?',
    answer: 'High glucose impairs immune function and provides environment for bacterial growth.',
    category: 'Pathophysiology',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch20-014',
    question: 'What complications should you watch for in sickle cell patients?',
    answer: 'Stroke, acute chest syndrome, priapism, splenic sequestration, and severe pain.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch20-015',
    question: 'What questions should you ask a diabetic patient?',
    answer: 'Last meal, medication compliance, recent illness, usual glucose levels, and symptom onset.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'application'
  }
];

export default chapter20Flashcards;