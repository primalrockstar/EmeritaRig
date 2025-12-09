// Chapter 14: BLS Resuscitation Protocols - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter14Flashcards: Flashcard[] = [
  {
    id: 'ch14-001',
    question: 'Adult high-quality CPR compression rate and depth?',
    answer: 'Rate 100–120/min; depth at least 2 inches (5 cm); full recoil; minimize interruptions.',
    category: 'CPR',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch14-002',
    question: 'Compression-to-ventilation ratio for adult single rescuer and two-rescuer with advanced airway?',
    answer: '30:2 for single rescuer without advanced airway; with advanced airway, continuous compressions with 1 breath every 6 seconds.',
    category: 'CPR',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch14-003',
    question: 'AED steps upon arrival to a pulseless adult patient.',
    answer: 'Start CPR, power on AED, attach pads, analyze rhythm, follow prompts, clear before shock, resume CPR immediately after shock or no-shock prompt.',
    category: 'AED',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch14-004',
    question: 'Pediatric CPR depth and rate guidelines.',
    answer: 'Depth about 1/3 AP diameter (2 inches/5 cm child, 1.5 inches/4 cm infant); rate 100–120/min.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch14-005',
    question: 'When to use pediatric AED pads vs. adult pads?',
    answer: 'Use pediatric pads for children under 8 years or under 55 lb if available; otherwise use adult pads with anterior–posterior placement if needed.',
    category: 'AED',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch14-006',
    question: 'Ventilation rate during CPR with a BVM and advanced airway in place (adult).',
    answer: '1 breath every 6 seconds (10/min) without pausing compressions.',
    category: 'Ventilation',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch14-007',
    question: 'Reversible causes of cardiac arrest (H’s and T’s) to consider.',
    answer: 'Hypovolemia, hypoxia, hydrogen ion (acidosis), hypo-/hyperkalemia, hypothermia; tension pneumothorax, tamponade, toxins, thrombosis (PE/MI).',
    category: 'Cardiac Arrest',
    difficulty: 'hard',
    type: 'definition'
  },
  {
    id: 'ch14-008',
    question: 'Choking adult becomes unresponsive. Next steps?',
    answer: 'Lower to ground, call for AED, start CPR; each time you open airway, look for and remove visible object; attempt breaths and continue cycles.',
    category: 'Airway Obstruction',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch14-009',
    question: 'Post-ROSC care priorities for EMT-B.',
    answer: 'Support airway/oxygenation (titrate to 94–99%), maintain ventilation, monitor vitals, keep patient warm, rapid transport, consider advanced care needs.',
    category: 'ROSC',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch14-010',
    question: 'Team CPR: how often should compressors switch to reduce fatigue?',
    answer: 'About every 2 minutes or during rhythm analysis to maintain quality compressions.',
    category: 'Team Dynamics',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch14-011',
    question: 'Special consideration for AED use in hypothermic arrest.',
    answer: 'Follow AED prompts; deliver shocks as indicated and handle gently; focus on high-quality CPR and prevent further heat loss.',
    category: 'Hypothermia',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch14-012',
    question: 'Infant choking with severe obstruction: preferred maneuver.',
    answer: 'Five back slaps and five chest thrusts alternating until relief or patient becomes unresponsive; then CPR.',
    category: 'Airway Obstruction',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch14-013',
    question: 'Compression hand placement adult vs. infant.',
    answer: 'Adult: two hands on center of chest, lower half of sternum. Infant: two fingers (single rescuer) or two-thumb encircling technique (two rescuers).',
    category: 'CPR',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch14-014',
    question: 'Managing an arrest in pregnancy: key positioning and considerations.',
    answer: 'Manual left uterine displacement or tilt to relieve aortocaval compression; high suspicion for reversible causes; prepare for rapid transport.',
    category: 'Special Populations',
    difficulty: 'hard',
    type: 'application'
  },
  {
    id: 'ch14-015',
    question: 'When is it appropriate to withhold or terminate resuscitation for EMT-B?',
    answer: 'Per local protocol/medical direction: obvious death, valid DNR/POLST, or termination orders after criteria met; otherwise continue and transport as directed.',
    category: 'Ethics & Protocol',
    difficulty: 'medium',
    type: 'assessment'
  }
];

export default chapter14Flashcards;
