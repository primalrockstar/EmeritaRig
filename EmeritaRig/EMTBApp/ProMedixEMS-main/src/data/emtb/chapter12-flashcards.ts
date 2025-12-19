// Chapter 12: Medication Administration Essentials - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter12Flashcards: Flashcard[] = [
  {
    id: 'ch12-001',
    question: 'List the 6 Rights of medication administration (plus two extras often taught).',
    answer: 'Right patient, right medication, right dose, right route, right time, right documentation; plus right indication and check contraindications.',
    category: 'Safety',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch12-002',
    question: 'Indication and typical dose for adult aspirin in suspected ACS?',
    answer: 'Chest pain suspected of ACS with no allergy/bleeding risk; 162–324 mg chewable PO.',
    category: 'Aspirin',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch12-003',
    question: 'Before assisting nitroglycerin, what must be confirmed?',
    answer: 'Adequate SBP (e.g., >100–110 mmHg per protocol), no PDE5 inhibitors within 24–48 hours, and no suspicion of RV infarct; confirm correct med and dose.',
    category: 'Nitroglycerin',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch12-004',
    question: 'When is oral glucose indicated and contraindicated?',
    answer: 'Indicated for symptomatic hypoglycemia with intact gag and ability to swallow; contraindicated if unable to protect airway or altered with risk of aspiration.',
    category: 'Glucose',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch12-005',
    question: 'Typical adult and pediatric epinephrine IM doses for anaphylaxis?',
    answer: 'Adult 0.3 mg IM (1 mg/mL); Pediatric 0.15 mg IM; repeat per protocol with ongoing assessment.',
    category: 'Epinephrine',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch12-006',
    question: 'List two key priorities when using naloxone in suspected opioid overdose.',
    answer: 'Do not delay ventilation/CPR; administer naloxone (e.g., 4 mg IN) for respiratory depression and reassess. Airway/ventilation first.',
    category: 'Naloxone',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch12-007',
    question: 'Common adverse effects to watch for after albuterol administration.',
    answer: 'Tachycardia, tremor, nervousness, palpitations; reassess breath sounds and work of breathing.',
    category: 'Bronchodilators',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch12-008',
    question: 'Explain medication verification steps before giving any drug.',
    answer: 'Check 6 Rights; verify expiration/date/clarity; confirm indication; review contraindications; obtain orders if required; explain to patient; prepare correct route; reassess and document.',
    category: 'Safety',
    difficulty: 'easy',
    type: 'assessment'
  },
  {
    id: 'ch12-009',
    question: 'A patient used sildenafil last night and now has chest pain. What’s the nitro plan?',
    answer: 'Do not assist nitroglycerin due to PDE5 inhibitor use within 24–48 hours; provide other ACS care and transport with early notification.',
    category: 'Nitroglycerin',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch12-010',
    question: 'Oxygen titration targets for most adult patients?',
    answer: 'SpO₂ 94–99% unless protocol specifies otherwise (e.g., CO poisoning, pregnancy). Avoid unnecessary hyperoxia.',
    category: 'Oxygen',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch12-011',
    question: 'Two reasons to withhold aspirin in suspected ACS.',
    answer: 'True aspirin allergy or active GI bleeding/ulcer; consider other bleeding risk factors per protocol.',
    category: 'Aspirin',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch12-012',
    question: 'Outline documentation elements after administering a medication.',
    answer: 'Drug, dose, route, time, indication, vitals before/after, patient response, side effects, orders received, lot/expiration if required.',
    category: 'Documentation',
    difficulty: 'easy',
    type: 'assessment'
  },
  {
    id: 'ch12-013',
    question: 'Which patients might require higher oxygen targets or earlier high-flow delivery?',
    answer: 'CO poisoning, pregnancy with distress, severe hypoxemia, or per local protocol; otherwise titrate.',
    category: 'Oxygen',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch12-014',
    question: 'What is the role of medical direction in EMT-B medication administration?',
    answer: 'Provides online orders and offline protocols/standing orders; EMT must confirm indications/contraindications and document orders clearly.',
    category: 'Medical Direction',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch12-015',
    question: 'After oral glucose, what changes should you watch for and document?',
    answer: 'Improved mental status, symptom relief, repeat glucose if equipped, and any adverse effects; note time to improvement.',
    category: 'Glucose',
    difficulty: 'easy',
    type: 'assessment'
  }
];

export default chapter12Flashcards;
