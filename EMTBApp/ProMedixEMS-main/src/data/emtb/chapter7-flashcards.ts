// Chapter 7: Lifespan Considerations in EMS - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter7Flashcards: Flashcard[] = [
  {
    id: 'ch7-001',
    question: 'Normal vital sign ranges for a newborn (0–1 month)?',
    answer: 'HR 90–180 bpm, RR 30–60/min, SBP ~50–70 mmHg, Temp ~98–100°F (36.7–37.8°C).',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch7-002',
    question: 'What is the preferred airway positioning for infants?',
    answer: 'Neutral sniffing position; avoid hyperextension which can occlude the airway.',
    category: 'Airway',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch7-003',
    question: 'List two anatomical differences in pediatric airways that increase obstruction risk.',
    answer: 'Larger occiput and tongue relative to mouth; narrower, funnel-shaped airway with cricoid narrowing.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch7-004',
    question: 'Define fontanelles and their clinical significance.',
    answer: 'Soft spots on infant skull where sutures have not fused; sunken may indicate dehydration, bulging may indicate increased ICP.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch7-005',
    question: 'Normal vital signs for older adults compared to younger adults?',
    answer: 'Slightly higher SBP due to decreased vascular compliance; resting HR similar; RR similar; temperature regulation may be impaired.',
    category: 'Geriatrics',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch7-006',
    question: 'List common physiologic changes in the elderly that impact EMS care.',
    answer: 'Decreased baroreceptor sensitivity, reduced renal function, fragile skin, decreased chest wall compliance, polypharmacy, cognitive impairment risk.',
    category: 'Geriatrics',
    difficulty: 'hard',
    type: 'recognition'
  },
  {
    id: 'ch7-007',
    question: 'Pediatric assessment triangle (PAT) components?',
    answer: 'Appearance, Work of Breathing, Circulation to Skin.',
    category: 'Pediatrics',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch7-008',
    question: 'What is the safest seat for infant transport in an ambulance?',
    answer: 'An approved, rear-facing car seat properly secured to the ambulance cot or bench per local policy; never hold infants unrestrained.',
    category: 'Transport',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch7-009',
    question: 'How does dehydration present differently in infants?',
    answer: 'Fewer wet diapers, sunken fontanelle, dry mucous membranes, poor skin turgor, lethargy; tachycardia may be an early sign.',
    category: 'Pediatrics',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch7-010',
    question: 'A confused elderly patient fell. List high-risk medications for bleeding.',
    answer: 'Warfarin, DOACs (apixaban, rivaroxaban), antiplatelets (clopidogrel, aspirin). Increased risk of intracranial hemorrhage.',
    category: 'Geriatrics',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch7-011',
    question: 'Explain why fever can be less pronounced in geriatric infections.',
    answer: 'Impaired thermoregulation and blunted immune response can mask typical fever; look for subtle signs (confusion, weakness).',
    category: 'Geriatrics',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch7-012',
    question: 'Define separation anxiety and peak age in pediatrics.',
    answer: 'Fear and distress when separated from primary caregiver; peaks around 10–18 months.',
    category: 'Pediatrics',
    difficulty: 'easy',
    type: 'definition'
  },
  {
    id: 'ch7-013',
    question: 'What positioning helps relieve dyspnea in late pregnancy?',
    answer: 'Left lateral recumbent or semi-Fowler to avoid supine hypotensive syndrome (aortocaval compression).',
    category: 'OB',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch7-014',
    question: 'List two communication tips for interacting with older adults with hearing impairment.',
    answer: 'Face the patient, speak clearly and slowly, reduce background noise, confirm understanding, consider written prompts.',
    category: 'Geriatrics',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch7-015',
    question: 'An infant with bronchiolitis presents with nasal flaring and intercostal retractions. What does this indicate?',
    answer: 'Increased work of breathing and potential respiratory distress/failure; prioritize airway/oxygenation and consider suctioning/CPAP per protocol.',
    category: 'Pediatrics',
    difficulty: 'hard',
    type: 'scenario'
  }
];

export default chapter7Flashcards;
