// Chapter 8: Lifting and Moving Patients - 15 Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter8Flashcards: Flashcard[] = [
  {
    id: 'ch8-001',
    question: 'List four principles of safe lifting in EMS.',
    answer: 'Plan the move; keep weight close to your body; lift with your legs, not your back; avoid twisting; communicate and lift on command.',
    category: 'Lifting',
    difficulty: 'easy',
    type: 'assessment'
  },
  {
    id: 'ch8-002',
    question: 'When is an emergency move indicated?',
    answer: 'When there is immediate danger to the patient or rescuer (fire, explosives, unstable scene) or to access a more critical patient.',
    category: 'Moves',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch8-003',
    question: 'Name two types of emergency moves and describe them.',
    answer: 'Clothes drag: pull by clothing to move along long axis. Blanket drag: use a blanket under patient to reduce friction and maintain alignment.',
    category: 'Moves',
    difficulty: 'medium',
    type: 'recognition'
  },
  {
    id: 'ch8-004',
    question: 'Define urgent vs. non-urgent moves with examples.',
    answer: 'Urgent: needed for patient’s condition (e.g., rapid extrication for unstable trauma). Non-urgent: patient stable, move after full assessment and packaging.',
    category: 'Moves',
    difficulty: 'medium',
    type: 'definition'
  },
  {
    id: 'ch8-005',
    question: 'What device is preferred for suspected spinal injury during extrication?',
    answer: 'A long backboard or vacuum mattress per local protocol; maintain manual inline stabilization and apply a properly sized cervical collar.',
    category: 'Spinal Care',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch8-006',
    question: 'Describe stair chair vs. scoop stretcher use cases.',
    answer: 'Stair chair: seated transport up/down stairs for alert, cooperative patients without spinal injury. Scoop: scoop up supine patient with minimal movement; useful in tight spaces; not for long transport without padding.',
    category: 'Equipment',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch8-007',
    question: 'What is log roll used for and key safety points?',
    answer: 'Used to turn a supine patient onto their side/backboard for assessment or packaging; maintain C-spine, roll on command, control head/neck, avoid twisting.',
    category: 'Spinal Care',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch8-008',
    question: 'A bariatric patient requires transport. List two equipment considerations.',
    answer: 'Use bariatric-capable stretcher and ramps/winch if available; increase personnel; consider additional straps and wider cot for safety.',
    category: 'Bariatrics',
    difficulty: 'hard',
    type: 'scenario'
  },
  {
    id: 'ch8-009',
    question: 'When should a rapid extrication technique be used?',
    answer: 'For an unstable patient in a vehicle requiring immediate removal due to life threats or when the patient’s condition cannot be adequately managed inside the vehicle.',
    category: 'Extrication',
    difficulty: 'medium',
    type: 'application'
  },
  {
    id: 'ch8-010',
    question: 'Describe position of comfort for patients with respiratory distress and for late pregnancy.',
    answer: 'Respiratory distress: Fowler or semi-Fowler. Late pregnancy: left lateral recumbent or tilt to relieve aortocaval compression.',
    category: 'Positioning',
    difficulty: 'easy',
    type: 'recognition'
  },
  {
    id: 'ch8-011',
    question: 'What technique minimizes cot tipping during loading/unloading?',
    answer: 'Keep center of gravity low, head-first down inclines and foot-first up, communicate, and load/unload on command with adequate personnel.',
    category: 'Transport',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch8-012',
    question: 'List contraindications for the recovery position.',
    answer: 'Suspected spinal injury without spinal precautions; significant trauma requiring immobilization; altered mental status without airway protection.',
    category: 'Positioning',
    difficulty: 'hard',
    type: 'assessment'
  },
  {
    id: 'ch8-013',
    question: 'When transporting a patient with nausea/vomiting and intact airway, what position is preferred?',
    answer: 'Recovery position (lateral recumbent) to protect the airway unless contraindicated by trauma.',
    category: 'Positioning',
    difficulty: 'easy',
    type: 'application'
  },
  {
    id: 'ch8-014',
    question: 'Explain the minimum team roles and commands for a four-person lift.',
    answer: 'One leader at the head gives commands; two side lifters and one at the feet. Lift, move, and lower on coordinated commands to prevent injury.',
    category: 'Lifting',
    difficulty: 'medium',
    type: 'assessment'
  },
  {
    id: 'ch8-015',
    question: 'Describe power grip vs. hook grip and when to use them.',
    answer: 'Power grip: palms up, fingers and thumbs wrapped around handle for maximum force; use for lifting stretchers/equipment. Hook grip: fingers hooked without thumb for carrying handles when limited space.',
    category: 'Lifting',
    difficulty: 'hard',
    type: 'recognition'
  }
];

export default chapter8Flashcards;
