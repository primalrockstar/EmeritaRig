// Chapter 11: Airway Management Techniques - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter11Flashcards: Flashcard[] = [
  {
    id: 'ch11-001',
    question: 'Preferred airway opening maneuver in suspected spinal trauma?',
    answer: 'Jaw-thrust maneuver without head tilt.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch11-002',
    question: 'OPA and NPA sizing landmarks?',
    answer: 'OPA: corner of mouth to earlobe/jaw angle. NPA: tip of nose to earlobe; choose diameter that fits nostril.',
    category: 'Adjuncts',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch11-003',
    question: 'Maximum suction times for adults, children, infants (single attempt)?',
    answer: 'Adults 15 sec; Children 10 sec; Infants 5 sec; re-oxygenate between attempts.',
    category: 'Suction',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch11-004',
    question: 'List two contraindications for NPA placement.',
    answer: 'Suspected basilar skull fracture (CSF otorrhea/rhinorrhea, raccoon eyes, Battle sign) or significant mid-face trauma.',
    category: 'Adjuncts',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch11-005',
    question: 'BVM ventilation rates with a pulse for adult vs child/infant?',
    answer: 'Adult: 1 breath every 5–6 sec. Child/Infant: 1 breath every 3–5 sec; deliver each breath over ~1 sec to visible chest rise.',
    category: 'Ventilation',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch11-006',
    question: 'Name two signs of inadequate ventilation.',
    answer: 'Poor chest rise, altered mental status, cyanosis, bradypnea/tachypnea with poor tidal volume, use of accessory muscles, low SpO₂ despite O₂.',
    category: 'Assessment',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch11-007',
    question: 'Explain why two-person BVM is preferred.',
    answer: 'One provider can maintain a better mask seal and airway while the second squeezes the bag, improving tidal volumes and reducing gastric insufflation.',
    category: 'Ventilation',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch11-008',
    question: 'Steps for relieving FBAO in a responsive infant.',
    answer: 'Deliver 5 back slaps followed by 5 chest thrusts; repeat until the object is expelled or the infant becomes unresponsive.',
    category: 'FBAO',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch11-009',
    question: 'When should oxygen be titrated vs delivered at high flow?',
    answer: 'Titrate to SpO₂ 94–99% in most cases; consider high-flow for severe distress, carbon monoxide poisoning, or per local protocol exceptions.',
    category: 'Oxygenation',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch11-010',
    question: 'Describe proper mask seal hand position for BVM.',
    answer: 'E–C clamp: thumbs and index fingers form a “C” on mask; remaining fingers lift the mandible to maintain airway (the “E”).',
    category: 'Ventilation',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch11-011',
    question: 'Why avoid hyperventilation in resuscitation?',
    answer: 'It increases intrathoracic pressure, reduces venous return and cardiac output, and worsens outcomes; target recommended rates with visible chest rise.',
    category: 'Resuscitation',
    difficulty: 'hard',
    type: 'definition'
  },
  {
    id: 'ch11-012',
    question: 'List typical flow rates and FiO₂ for NC, NRB, and BVM.',
    answer: 'NC: 1–6 L/min (~24–44% FiO₂); NRB: 10–15 L/min (~60–90%); BVM with reservoir: 15 L/min (up to ~100% with good seal).',
    category: 'Oxygenation',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch11-013',
    question: 'Airway approach for unresponsive patient with suspected emesis in the oropharynx?',
    answer: 'Roll if safe, suction promptly, insert appropriate adjunct (OPA if no gag), ventilate with BVM as needed, and reassess.',
    category: 'Airway',
    difficulty: 'medium',
    type: 'scenario'
  },
  {
    id: 'ch11-014',
    question: 'Provide two indications for OPA and two for NPA.',
    answer: 'OPA: unresponsive without gag; to facilitate BVM ventilation. NPA: semiconscious with gag reflex; trismus or oral trauma where OPA not tolerated.',
    category: 'Adjuncts',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch11-015',
    question: 'What’s the first step after inserting any airway adjunct?',
    answer: 'Reassess airway patency, breathing adequacy, and patient tolerance; be ready to remove if gagging or vomiting occurs.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'application'
  }
];

export default chapter11Flashcards;
