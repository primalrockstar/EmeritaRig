// Chapter 9: Airway Management - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter9Flashcards: Flashcard[] = [
  {
    id: 'ch9-001',
    question: 'List signs of inadequate breathing that indicate positive pressure ventilation (PPV).',
    answer: 'Altered mental status, inadequate rate or tidal volume, cyanosis, use of accessory muscles, shallow/irregular breathing, poor chest rise, SpO2 < 90% despite O2.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch9-002',
    question: 'What is the preferred airway maneuver for suspected spinal injury?',
    answer: 'Jaw-thrust maneuver without head tilt.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch9-003',
    question: 'Contraindications for an oropharyngeal airway (OPA)?',
    answer: 'Intact gag reflex; patient who is conscious or semi-conscious and able to protect their airway.',
    category: 'Adjuncts',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch9-004',
    question: 'How do you size an OPA and NPA?',
    answer: 'OPA: corner of mouth to earlobe/jaw angle. NPA: tip of nose to earlobe; choose diameter that fits nostril without forcing.',
    category: 'Adjuncts',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch9-005',
    question: 'Indications and contraindications for NPA use.',
    answer: 'Indications: semiconscious with gag reflex needing airway support. Contraindications: suspected basilar skull fracture (CSF, raccoon eyes, Battle sign) or significant facial trauma.',
    category: 'Adjuncts',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch9-006',
    question: 'BVM ventilation rates for adult, child, and infant with pulse.',
    answer: 'Adult: 1 breath every 5–6 sec; Child/Infant: 1 breath every 3–5 sec; each over 1 sec to visible chest rise.',
    category: 'Ventilation',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch9-007',
    question: 'What is preoxygenation and why is it important?',
    answer: 'Providing high-flow oxygen prior to airway interventions to build oxygen reserves and prevent desaturation during attempts.',
    category: 'Oxygenation',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch9-008',
    question: 'Describe the head-tilt chin-lift maneuver and its contraindication.',
    answer: 'Extension of head with elevation of chin to open airway; contraindicated in suspected cervical spine injury.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch9-009',
    question: 'What SpO2 target should you maintain during oxygen therapy?',
    answer: 'Generally 94–99% in most patients; avoid hyperoxia in suspected stroke/MI per local protocols.',
    category: 'Oxygenation',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch9-010',
    question: 'Describe indications for suctioning and maximum suction times.',
    answer: 'Indications: visible secretions, gurgling, obstructed airway. Max times: Adults 15 sec, Children 10 sec, Infants 5 sec; pre-oxygenate and re-oxygenate between attempts.',
    category: 'Suction',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch9-011',
    question: 'Explain how to perform the Sellick maneuver and current considerations.',
    answer: 'Cricoid pressure to occlude esophagus during ventilation/intubation; routine use is controversial and not recommended unless directed by protocol.',
    category: 'Airway',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch9-012',
    question: 'Common causes of airway obstruction in unconscious patients and initial management.',
    answer: 'Tongue obstruction, secretions, foreign body; perform airway maneuvers, suction, OPA/NPA as indicated, and ventilate with BVM.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch9-013',
    question: 'Signs of hypoxia vs. hypercapnia.',
    answer: 'Hypoxia: restlessness, anxiety, cyanosis, tachycardia. Hypercapnia: headache, flushed skin, confusion, drowsiness, bounding pulse.',
    category: 'Assessment',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch9-014',
    question: 'What is CPAP and when is it indicated for EMT-B use (where allowed)?',
    answer: 'Continuous Positive Airway Pressure; indicated for spontaneous breathing patients with moderate respiratory distress (e.g., CHF, COPD) with adequate BP and without contraindications (vomiting, altered LOC, pneumothorax).',
    category: 'Ventilation',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch9-015',
    question: 'Explain the oxygen delivery devices and typical flow rates (NC, NRB, BVM).',
    answer: 'Nasal cannula: 1–6 L/min (~24–44% FiO2). Nonrebreather mask: 10–15 L/min (~60–90% FiO2). BVM with reservoir: 15 L/min (up to ~100% with good seal).',
    category: 'Oxygenation',
    difficulty: 'medium',
    type: 'recognition'
  }
];

export default chapter9Flashcards;
