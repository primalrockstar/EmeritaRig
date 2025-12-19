// Chapter 25: Trauma Overview - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter25Flashcards: Flashcard[] = [
  {
    id: 'ch25-001',
    question: 'What is the Golden Hour in trauma?',
    answer: 'The first hour after trauma when definitive treatment is most critical for survival.',
    category: 'Trauma Principles',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch25-002',
    question: 'What is the difference between blunt and penetrating trauma?',
    answer: 'Blunt: injury without skin penetration. Penetrating: injury with breach of skin integrity.',
    category: 'Trauma Classification',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch25-003',
    question: 'What is mechanism of injury (MOI)?',
    answer: 'How the injury occurred, which helps predict injury patterns and severity.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch25-004',
    question: 'What is the primary survey in trauma?',
    answer: 'Initial assessment focusing on immediate life threats: ABCDE approach.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch25-005',
    question: 'What does ABCDE stand for in trauma assessment?',
    answer: 'Airway, Breathing, Circulation, Disability (neurologic), Exposure/Environment.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch25-006',
    question: 'When should you use "load and go" approach?',
    answer: 'Life-threatening injuries, unstable vital signs, or mechanism suggesting serious internal injury.',
    category: 'Transport Decisions',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch25-007',
    question: 'What is kinematics in trauma?',
    answer: 'Study of motion and forces involved in trauma to predict injury patterns.',
    category: 'Trauma Principles',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch25-008',
    question: 'What are the three phases of motor vehicle crash?',
    answer: 'Vehicle collision, body collision, organ collision.',
    category: 'Kinematics',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch25-009',
    question: 'What is index of suspicion?',
    answer: 'Anticipation of specific injuries based on mechanism of injury.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch25-010',
    question: 'What are signs of traumatic shock?',
    answer: 'Tachycardia, hypotension, pale/cool skin, altered mental status, decreased urine output.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch25-011',
    question: 'What are trauma center levels and their capabilities?',
    answer: 'Level I: full capabilities. Level II: most capabilities. Level III: limited. Level IV: stabilization.',
    category: 'Transport Decisions',
    difficulty: 'hard',
    type: 'recognition'
  },
  {
    id: 'ch25-012',
    question: 'What is multisystem trauma?',
    answer: 'Injuries affecting multiple body systems, requiring coordinated management.',
    category: 'Trauma Classification',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch25-013',
    question: 'What are high-energy mechanisms of injury?',
    answer: 'Falls >20 feet, MVCs >40 mph, pedestrian struck, motorcycle crashes, ejection.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch25-014',
    question: 'How do you prioritize trauma interventions?',
    answer: 'Address life threats first (airway, breathing, circulation), then immobilize and transport.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch25-015',
    question: 'What scene time goal should you have for unstable trauma patients?',
    answer: 'Less than 10 minutes on scene ("platinum 10") for load and go patients.',
    category: 'Transport Decisions',
    difficulty: 'medium',
    type: 'recognition'
  }
];

export default chapter25Flashcards;