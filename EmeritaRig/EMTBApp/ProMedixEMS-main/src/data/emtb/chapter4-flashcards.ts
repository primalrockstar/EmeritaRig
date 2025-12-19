// Chapter 4: Communications & Documentation - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter4Flashcards: Flashcard[] = [
  {
    id: 'ch4-001',
    question: 'What are the core parts of a clear EMT radio report to a receiving hospital?',
    answer: 'Unit ID and ETA; patient age/sex; chief complaint; pertinent history/meds/allergies; vital signs; focused findings; treatments given and response; request (e.g., STEMI/stroke alert).',
    category: 'Radio Communications',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch4-002',
    question: 'What does SBAR stand for and when would you use it?',
    answer: 'Situation, Background, Assessment, Recommendation. Use for concise handoffs to ED/medical control to structure critical information.',
    category: 'Handoff',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch4-003',
    question: 'List the essential elements that must be documented in every PCR narrative.',
    answer: 'Dispatch nature/time; scene description and patient position/appearance; assessment (ABCs, exam) and all vitals with times; interventions with times/doses/routes and patient response; transport mode/position; destination and handoff; signatures/refusals as applicable.',
    category: 'Documentation',
    difficulty: 'hard',
    type: 'recognition'
  },
  {
    id: 'ch4-004',
    question: 'SOAP vs. CHART documentation—what do the acronyms mean?',
    answer: 'SOAP: Subjective, Objective, Assessment, Plan. CHART: Chief complaint, History, Assessment, Rx (treatment), Transport (or Response). Both provide structured PCR narratives.',
    category: 'Documentation',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch4-005',
    question: 'How should errors be corrected in a paper PCR?',
    answer: 'Single line through the error, write the correction nearby, initial, date/time the change. Never erase or obliterate; keep the record legible.',
    category: 'Legal/Ethics',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch4-006',
    question: 'You obtain a refusal from a competent adult with chest pain. What must be documented?',
    answer: 'Decision-making capacity; risks/benefits explained; vital signs; offer to return/alternative transport; encouragement to seek care; signatures (patient, witness) and times; instructions given.',
    category: 'Refusals',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch4-007',
    question: 'Give three examples of unacceptable abbreviations in EMS documentation and their preferred alternatives.',
    answer: '“QD/QOD” → write “daily/every other day”; “U” for units → write “units”; “cc” → write “mL”. Follow local approved abbreviations list.',
    category: 'Documentation',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch4-008',
    question: 'What privacy rules apply when giving a hospital radio report under HIPAA?',
    answer: 'Use minimum necessary information over open air; avoid names/identifiers if possible; use secure channels when available; share full PHI only for treatment, payment, or operations.',
    category: 'HIPAA',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch4-009',
    question: 'What is the correct order when calling medical control for a medication order?',
    answer: 'Identify unit/provider; patient age/sex; chief complaint; pertinent assessment and vitals; working impression; requested medication/dose/route; confirm/read-back the order; document time and provider name.',
    category: 'Medical Control',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch4-010',
    question: 'Why are exact times important in the PCR and how should they be recorded?',
    answer: 'Times support clinical/legal review and QI (response, on-scene, intervention, transport). Use synchronized 24-hour time (HH:MM) and link to vitals and treatments.',
    category: 'Documentation',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch4-011',
    question: 'Write a concise, complete ED bedside verbal report structure.',
    answer: 'Age/sex; CC and OPQRST summary; pertinent history/meds/allergies; exam highlights and vitals trend; treatments and response; current status; questions and transfer of care.',
    category: 'Handoff',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch4-012',
    question: 'What should you do if you forgot to document a treatment after submitting an ePCR?',
    answer: 'Submit a late entry/addendum per policy: date/time of the entry, what occurred, why late, signature/ID. Never alter original time stamps.',
    category: 'Legal/Ethics',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch4-013',
    question: 'Plain language vs. 10-codes—what is recommended and why?',
    answer: 'Plain language is preferred for interoperability and clarity during multi-agency incidents; reduces misinterpretation across jurisdictions.',
    category: 'Radio Communications',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch4-014',
    question: 'List three narrative pitfalls that create legal risk.',
    answer: 'Subjective language (appears/seems) without attribution; missing vitals/times; undocumented refusals or lack of informed risk discussion; copying/pasting errors.',
    category: 'Legal/Ethics',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch4-015',
    question: 'How should triage tags interface with documentation during MCIs?',
    answer: 'Record triage category and tag number in PCR/ePCR, link brief assessment and interventions, and update status/time with transport destination.',
    category: 'MCI',
    difficulty: 'medium',
    type: 'application'
  }
];

export default chapter4Flashcards;
