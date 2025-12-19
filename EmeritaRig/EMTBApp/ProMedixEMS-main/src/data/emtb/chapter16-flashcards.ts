// Chapter 16: Respiratory Emergencies Essentials - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter16Flashcards: Flashcard[] = [
  {
    id: 'ch16-001',
    question: 'What is dyspnea?',
    answer: 'Difficulty breathing or shortness of breath.',
    category: 'Respiratory Assessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch16-002',
    question: 'What is the difference between hypoxia and hypoxemia?',
    answer: 'Hypoxemia: low oxygen levels in blood. Hypoxia: inadequate oxygen levels in body tissues.',
    category: 'Pathophysiology',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch16-003',
    question: 'What does stridor indicate?',
    answer: 'High-pitched sound during inspiration indicating upper airway obstruction.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch16-004',
    question: 'What are the three main types of adventitious lung sounds?',
    answer: 'Wheezes (bronchospasm), crackles (fluid in alveoli), and stridor (upper airway obstruction).',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch16-005',
    question: 'What is the difference between respiratory distress and respiratory failure?',
    answer: 'Distress: difficulty breathing with increased work of breathing. Failure: inadequate gas exchange threatening life.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch16-006',
    question: 'What medication should EMTs assist with for bronchospasm?',
    answer: 'Prescribed bronchodilator inhaler (albuterol/salbutamol) following protocol.',
    category: 'Treatment',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch16-007',
    question: 'Signs of severe respiratory distress requiring immediate intervention?',
    answer: 'Tripod positioning, accessory muscle use, cyanosis, altered mental status, inability to speak in full sentences.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch16-008',
    question: 'What is the tripod position and why do patients use it?',
    answer: 'Sitting upright, leaning forward with hands on knees. Maximizes lung expansion and eases breathing.',
    category: 'Assessment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch16-009',
    question: 'How do you assess breathing adequacy?',
    answer: 'Rate, rhythm, depth, effort, breath sounds, skin color, mental status, and oxygen saturation.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch16-010',
    question: 'What is bronchospasm?',
    answer: 'Constriction of smooth muscle in bronchioles causing wheezing and difficulty breathing.',
    category: 'Pathophysiology',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch16-011',
    question: 'When should you provide positive pressure ventilation?',
    answer: 'Respiratory failure, inadequate tidal volume, altered mental status from hypoxia, or apnea.',
    category: 'Treatment',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch16-012',
    question: 'What oxygen delivery device provides the highest concentration?',
    answer: 'Non-rebreather mask with reservoir bag can deliver up to 90-95% oxygen.',
    category: 'Treatment',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch16-013',
    question: 'How do you differentiate asthma from COPD exacerbation?',
    answer: 'Asthma: younger, acute onset, wheezing. COPD: older, smoking history, chronic symptoms, barrel chest.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch16-014',
    question: 'What is the most common cause of upper airway obstruction in unconscious patients?',
    answer: 'The tongue falling back and occluding the airway.',
    category: 'Airway Management',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch16-015',
    question: 'Red flags indicating imminent respiratory arrest?',
    answer: 'Decreasing respiratory rate, shallow breathing, cyanosis, altered mental status, and fatigue.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'scenario'
  }
];

export default chapter16Flashcards;