// Chapter 10: Comprehensive Patient Assessment - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter10Flashcards: Flashcard[] = [
  {
    id: 'ch10-001',
    question: 'List the steps of the assessment sequence from arrival to transport decision.',
    answer: 'Scene size-up (PPE, hazards, MOI/NOI, patients, resources, SMR) → Primary assessment (GI, LOC, ABCs, disability, expose, priority) → History and focused exam (SAMPLE, OPQRST, targeted exam, baseline vitals) → Secondary exam (focused or head-to-toe) → Reassessment and trending.',
    category: 'Assessment Flow',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch10-002',
    question: 'During primary assessment, which life threats must be addressed immediately and in what order?',
    answer: 'Airway obstruction → inadequate breathing → severe external bleeding → circulatory compromise/shock. Treat as found before proceeding.',
    category: 'Primary Survey',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch10-003',
    question: 'What does AVPU stand for and what does it assess?',
    answer: 'Alert, responds to Verbal, responds to Pain, Unresponsive; assesses level of responsiveness.',
    category: 'Neurologic',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch10-004',
    question: 'Define SAMPLE and OPQRST and when to use them.',
    answer: 'SAMPLE: Signs/Symptoms, Allergies, Medications, Past history, Last oral intake, Events. OPQRST: Onset, Provocation/Palliation, Quality, Region/Radiation, Severity, Time. Use OPQRST to deepen pain/symptom history within the SAMPLE framework.',
    category: 'History',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch10-005',
    question: 'Name three immediate SMR indicators during scene size-up or primary.',
    answer: 'Dangerous MOI, neck/back pain or tenderness, neurologic deficit (numbness/weakness), paresthesia, altered mental status, or intoxication interfering with exam.',
    category: 'Trauma',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch10-006',
    question: 'Which vital sign changes suggest early shock?',
    answer: 'Tachycardia, cool/clammy skin, delayed capillary refill, tachypnea; blood pressure may be normal initially.',
    category: 'Shock',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch10-007',
    question: 'When should you do a head-to-toe exam versus a focused exam?',
    answer: 'Head-to-toe for significant MOI, multiple injuries, altered/decreased responsiveness, or when no clear chief complaint. Focused exam for isolated, non-critical chief complaint with stable presentation.',
    category: 'Exam Strategy',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch10-008',
    question: 'List baseline vitals you should obtain and trend.',
    answer: 'Heart rate, respiratory rate, blood pressure, pulse oximetry, skin signs (color, temperature, moisture), pupils, temperature when available, pain score, GCS if altered.',
    category: 'Vitals',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch10-009',
    question: 'A 72-year-old on anticoagulants with minor head injury is alert and oriented. What’s your concern and action?',
    answer: 'High risk of intracranial hemorrhage despite minor trauma. Perform focused neuro exam, monitor closely, and transport for evaluation with early notification.',
    category: 'Geriatrics',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch10-010',
    question: 'How frequently do you reassess unstable vs. stable patients?',
    answer: 'Unstable/critical: every 5 minutes. Stable: every 15 minutes.',
    category: 'Reassessment',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch10-011',
    question: 'List two pediatric assessment priorities that differ from adults.',
    answer: 'Use the Pediatric Assessment Triangle (appearance, work of breathing, circulation to skin); hypotension is a late sign—act on early respiratory distress or poor perfusion.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch10-012',
    question: 'What findings and timestamps are critical to include in the PCR for assessment?',
    answer: 'Chief complaint in patient’s words; timeline of events; initial and repeat vitals with times; primary/secondary findings; interventions, times, and responses; transport decision; handoff details.',
    category: 'Documentation',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch10-013',
    question: 'When is a “load-and-go” decision appropriate?',
    answer: 'Any time a life threat is found/likely (airway compromise, inadequate breathing, uncontrolled bleeding/shock, altered mental status with concern for stroke, STEMI, major trauma) where scene time should be minimized.',
    category: 'Decision Making',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch10-014',
    question: 'Explain the difference between signs and symptoms with examples.',
    answer: 'Signs are objective findings (wheezes, cyanosis, diaphoresis). Symptoms are subjective patient-reported experiences (chest pain, shortness of breath, nausea).',
    category: 'Clinical Fundamentals',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch10-015',
    question: 'You find a trauma patient with agonal breathing. What’s your immediate sequence of actions?',
    answer: 'Manual inline stabilization if indicated → open airway (jaw-thrust) → suction if needed → OPA if no gag → BVM with O₂ for inadequate respirations → identify/treat major hemorrhage → rapid transport decision.',
    category: 'Primary Survey',
    difficulty: 'hard',
    type: 'scenario'
  }
];

export default chapter10Flashcards;
