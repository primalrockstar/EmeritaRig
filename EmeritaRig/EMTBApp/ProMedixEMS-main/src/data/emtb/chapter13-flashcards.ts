// Chapter 13: Shock Recognition & Response - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter13Flashcards: Flashcard[] = [
  {
    id: 'ch13-001',
    question: 'Define shock and name the four main categories.',
    answer: 'Shock is inadequate tissue perfusion leading to cellular dysfunction. Categories: hypovolemic, cardiogenic, distributive (septic, neurogenic, anaphylactic), and obstructive.',
    category: 'Foundations',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch13-002',
    question: 'Key early signs of compensated shock.',
    answer: 'Tachycardia, cool pale clammy skin, delayed cap refill, anxiety, thirst; BP may be normal.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch13-003',
    question: 'First-line management priorities for hypovolemic shock in trauma.',
    answer: 'Control external bleeding (tourniquet/pressure), airway/oxygenation/ventilation, rapid transport, treat for hypothermia, permissive hypotension if indicated by protocol.',
    category: 'Management',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch13-004',
    question: 'Classic findings that suggest anaphylactic shock.',
    answer: 'Sudden onset after exposure with urticaria, angioedema, wheezing/stridor, hypotension, GI symptoms; treat with IM epinephrine immediately.',
    category: 'Anaphylaxis',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch13-005',
    question: 'Cardiogenic shock EMS priorities.',
    answer: 'Airway/oxygenation, gentle ventilation if needed, avoid fluid overload, consider nitro cautiously if no hypotension and per orders, rapid transport to PCI-capable facility.',
    category: 'Cardiogenic',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch13-006',
    question: 'Distinguish neurogenic vs. hypovolemic shock skin and pulse findings.',
    answer: 'Neurogenic: warm, dry skin below injury, normal-to-slow heart rate. Hypovolemic: cool, pale, clammy with tachycardia.',
    category: 'Differentiation',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch13-007',
    question: 'Obstructive shock EMS examples and actions.',
    answer: 'Examples: tension pneumothorax, cardiac tamponade, massive PE. Actions: support ABCs; request ALS for needle decompression/advanced care; rapid transport.',
    category: 'Obstructive',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch13-008',
    question: 'Role of temperature management in shock.',
    answer: 'Prevent hypothermia (blankets, warm environment). Hypothermia worsens coagulopathy and shock outcomes.',
    category: 'Resuscitation',
    difficulty: 'easy',
    type: 'assessment'
  },
  {
    id: 'ch13-009',
    question: 'Septic shock clues in prehospital assessment.',
    answer: 'Fever or hypothermia, possible infection source, altered mental status, tachypnea, hypotension; warm skin early, cool late.',
    category: 'Sepsis',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch13-010',
    question: 'Define permissive hypotension and when to consider it.',
    answer: 'Maintaining lower-than-normal SBP (e.g., 80–90 mmHg) in penetrating torso trauma with uncontrolled hemorrhage to limit bleeding, per protocol and without TBI.',
    category: 'Trauma',
    difficulty: 'hard',
    type: 'definition'
  },
  {
    id: 'ch13-011',
    question: 'Why avoid excessive ventilation in shock?',
    answer: 'Hyperventilation decreases venous return and cardiac output; ventilate just enough to maintain adequate oxygenation and ventilation.',
    category: 'Ventilation',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch13-012',
    question: 'Tourniquet key steps and documentation.',
    answer: 'Place 2–3 inches above wound, avoid joints, tighten to stop bleeding, note the time, do not periodically loosen, document time and response.',
    category: 'Hemorrhage Control',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch13-013',
    question: 'Pediatric shock early sign often missed.',
    answer: 'Tachycardia with delayed cap refill and poor perfusion despite normal blood pressure; hypotension is late.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch13-014',
    question: 'Anaphylaxis dosing pearls for IM epinephrine.',
    answer: 'Adult 0.3 mg IM lateral thigh; Pediatric 0.15 mg IM; repeat per protocol q5–10 min while monitoring ABCs and transport rapidly.',
    category: 'Anaphylaxis',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch13-015',
    question: 'Define decompensated shock clinical red flags.',
    answer: 'Hypotension, AMS, weak/absent peripheral pulses, mottled/cyanotic skin, severe dyspnea. Immediate transport and aggressive management.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'recognition'
  }
];

export default chapter13Flashcards;
