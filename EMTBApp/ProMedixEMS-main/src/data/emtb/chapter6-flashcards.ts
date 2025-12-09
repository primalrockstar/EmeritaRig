// Chapter 6: Body Systems for Emergency Care - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter6Flashcards: Flashcard[] = [
  {
    id: 'ch6-001',
    question: 'What are the primary functions of the respiratory system?',
    answer: 'Gas exchange (oxygen in, carbon dioxide out), acid-base regulation, speech, and olfaction.',
    category: 'Respiratory',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch6-002',
    question: 'Normal adult respiratory rate and tidal volume?',
    answer: 'RR: 12–20 breaths/min; tidal volume ~500 mL at rest.',
    category: 'Respiratory',
    difficulty: 'easy',
    type: 'assessment'
  },
  {
    id: 'ch6-003',
    question: 'Describe the path of blood flow through the heart starting at the vena cavae.',
    answer: 'Vena cavae → right atrium → tricuspid valve → right ventricle → pulmonic valve → pulmonary arteries → lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → systemic circulation.',
    category: 'Cardiovascular',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch6-004',
    question: 'Define perfusion and shock.',
    answer: 'Perfusion: adequate circulation of blood to meet tissue needs. Shock: state of inadequate perfusion resulting in cellular hypoxia and organ dysfunction.',
    category: 'Cardiovascular',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch6-005',
    question: 'What organ is the primary controller of blood glucose and what are the key hormones?',
    answer: 'The pancreas: insulin lowers blood glucose; glucagon raises blood glucose.',
    category: 'Endocrine',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch6-006',
    question: 'Explain the difference between the central and peripheral nervous systems.',
    answer: 'CNS: brain and spinal cord; integrates and processes information. PNS: nerves outside CNS; transmits sensory and motor signals (somatic and autonomic).',
    category: 'Nervous',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch6-007',
    question: 'What are the signs of sympathetic vs. parasympathetic activation?',
    answer: 'Sympathetic (fight or flight): tachycardia, bronchodilation, pupil dilation, vasoconstriction. Parasympathetic (rest/digest): bradycardia, bronchoconstriction, pupil constriction, increased GI activity.',
    category: 'Nervous',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch6-008',
    question: 'Name the major components of the musculoskeletal system and their roles.',
    answer: 'Bones (structure, protection, mineral storage), muscles (movement, heat), joints (articulation), tendons (muscle-bone), ligaments (bone-bone).',
    category: 'Musculoskeletal',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch6-009',
    question: 'What is the function of the alveoli and how do they relate to ventilation vs. oxygenation?',
    answer: 'Alveoli are the site of gas exchange via diffusion. Ventilation = air movement; oxygenation = loading O2 onto hemoglobin. You can ventilate without adequate oxygenation (e.g., V/Q mismatch).',
    category: 'Respiratory',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch6-010',
    question: 'Identify two organs in the RUQ and two in the LUQ of the abdomen.',
    answer: 'RUQ: liver, gallbladder. LUQ: stomach, spleen.',
    category: 'GI',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch6-011',
    question: 'Describe the path of urine from formation to excretion.',
    answer: 'Kidneys (nephrons) → ureters → urinary bladder → urethra → external environment.',
    category: 'Renal/Urinary',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch6-012',
    question: 'What is the primary function of the spleen and a clinical risk if it ruptures?',
    answer: 'Spleen filters blood and participates in immune response. Rupture can cause life-threatening internal hemorrhage.',
    category: 'Immune/Lymphatic',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch6-013',
    question: 'Define stroke volume, heart rate, and cardiac output and their relationship.',
    answer: 'Stroke volume (SV): blood ejected per beat; Heart rate (HR): beats per minute; Cardiac output (CO) = SV × HR.',
    category: 'Cardiovascular',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch6-014',
    question: 'A patient with COPD has chronic CO2 retention. Why might they rely on hypoxic drive?',
    answer: 'Long-term CO2 retention blunts central chemoreceptor response to CO2. The body relies more on peripheral chemoreceptors responding to low O2 to stimulate breathing.',
    category: 'Respiratory',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch6-015',
    question: 'Name the three meninges and explain the clinical significance of a subdural hematoma.',
    answer: 'Three meninges: dura mater, arachnoid mater, pia mater. Subdural hematoma is venous bleeding between dura and arachnoid, often slower onset, common in elderly on anticoagulants.',
    category: 'Nervous',
    difficulty: 'hard',
    type: 'assessment'
  }
];

export default chapter6Flashcards;
