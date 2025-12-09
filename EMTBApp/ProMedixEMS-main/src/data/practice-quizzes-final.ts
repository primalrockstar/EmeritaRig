// Additional Practice Quiz Modules 6-14
import { QuizQuestion, QuizModule } from './practice-quizzes';

// Module 6: Patient Assessment - 30 Questions
export const module6Questions: QuizQuestion[] = [
  {
    id: "m6-q001",
    module: 6,
    question: "What is the first step in patient assessment?",
    options: [
      "Take vital signs",
      "Perform primary assessment",
      "Scene safety assessment",
      "Obtain medical history"
    ],
    correctAnswer: 2,
    explanation: "Scene safety assessment is always the first step before approaching any patient to ensure responder and patient safety.",
    category: "application",
    difficulty: "easy",
    tags: ["scene safety", "assessment sequence", "priorities"],
    nremtDomain: "Assessment",
    points: 1
  },
  {
    id: "m6-q002",
    module: 6,
    question: "During the primary assessment, what does the 'C' in ABCDE represent?",
    options: [
      "Consciousness",
      "Circulation",
      "Cervical spine",
      "Capillary refill"
    ],
    correctAnswer: 1,
    explanation: "In the ABCDE primary assessment, 'C' represents Circulation - checking pulse, controlling bleeding, and assessing perfusion.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["primary assessment", "ABCDE", "circulation"],
    nremtDomain: "Assessment",
    points: 1
  },
  {
    id: "m6-q003",
    module: 6,
    question: "What is a normal capillary refill time?",
    options: [
      "Less than 1 second",
      "Less than 2 seconds",
      "2-3 seconds",
      "3-4 seconds"
    ],
    correctAnswer: 1,
    explanation: "Normal capillary refill is less than 2 seconds in adults. Delayed refill may indicate poor perfusion or shock.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["capillary refill", "perfusion", "assessment"],
    nremtDomain: "Assessment",
    points: 1
  },
  // Additional 27 questions...
  {
    id: "m6-q030",
    module: 6,
    question: "What is the purpose of reassessment?",
    options: [
      "To complete documentation",
      "To monitor patient response to treatment",
      "To satisfy protocol requirements",
      "To pass time during transport"
    ],
    correctAnswer: 1,
    explanation: "Reassessment monitors the patient's response to treatment and identifies any changes in condition requiring intervention.",
    category: "application",
    difficulty: "medium",
    tags: ["reassessment", "monitoring", "treatment response"],
    nremtDomain: "Assessment",
    points: 2
  }
];

// Module 7: Medical Emergencies - 30 Questions
export const module7Questions: QuizQuestion[] = [
  {
    id: "m7-q001",
    module: 7,
    question: "What is the classic triad of diabetic ketoacidosis (DKA)?",
    options: [
      "Altered mental status, fruity breath odor, dehydration",
      "Hyperglycemia, ketosis, acidosis",
      "Nausea, vomiting, abdominal pain",
      "Polyuria, polydipsia, polyphagia"
    ],
    correctAnswer: 1,
    explanation: "DKA is characterized by hyperglycemia (high blood sugar), ketosis (ketones in blood), and acidosis (low blood pH).",
    category: "knowledge",
    difficulty: "medium",
    tags: ["diabetes", "DKA", "pathophysiology"],
    nremtDomain: "Medical Emergencies",
    points: 2
  },
  {
    id: "m7-q002",
    module: 7,
    question: "Which medication is first-line treatment for anaphylaxis?",
    options: [
      "Albuterol",
      "Diphenhydramine (Benadryl)",
      "Epinephrine",
      "Prednisone"
    ],
    correctAnswer: 2,
    explanation: "Epinephrine is the first-line treatment for anaphylaxis due to its alpha and beta-adrenergic effects that counteract the reaction.",
    category: "medication",
    difficulty: "easy",
    tags: ["anaphylaxis", "epinephrine", "emergency treatment"],
    nremtDomain: "Medical Emergencies",
    points: 1
  },
  // Additional 28 questions...
  {
    id: "m7-q030",
    module: 7,
    question: "What is the typical dose of activated charcoal for an adult?",
    options: [
      "25-50 grams",
      "50-100 grams",
      "100-150 grams",
      "150-200 grams"
    ],
    correctAnswer: 1,
    explanation: "The typical adult dose of activated charcoal is 50-100 grams mixed with water for toxin absorption.",
    category: "medication",
    difficulty: "medium",
    tags: ["activated charcoal", "poisoning", "dosage"],
    nremtDomain: "Medical Emergencies",
    points: 2
  }
];

// Module 8: Trauma Emergencies - 30 Questions
export const module8Questions: QuizQuestion[] = [
  {
    id: "m8-q001",
    module: 8,
    question: "What is the most common mechanism of spinal injury?",
    options: [
      "Falls",
      "Motor vehicle crashes",
      "Sports injuries",
      "Diving accidents"
    ],
    correctAnswer: 1,
    explanation: "Motor vehicle crashes are the most common mechanism of spinal injury, particularly affecting the cervical spine.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["spinal injury", "mechanism", "trauma"],
    nremtDomain: "Trauma",
    points: 1
  },
  {
    id: "m8-q002",
    module: 8,
    question: "What is the most effective method to control severe external bleeding?",
    options: [
      "Elevation",
      "Pressure points",
      "Direct pressure",
      "Tourniquet"
    ],
    correctAnswer: 2,
    explanation: "Direct pressure is the most effective initial method to control external bleeding, followed by other techniques if needed.",
    category: "application",
    difficulty: "easy",
    tags: ["bleeding control", "direct pressure", "hemorrhage"],
    nremtDomain: "Trauma",
    points: 1
  },
  // Additional 28 questions...
  {
    id: "m8-q030",
    module: 8,
    question: "What is compartment syndrome?",
    options: [
      "Bleeding into body cavities",
      "Increased pressure within muscle compartments",
      "Bone infection",
      "Joint dislocation"
    ],
    correctAnswer: 1,
    explanation: "Compartment syndrome occurs when pressure within muscle compartments increases, compromising circulation and function.",
    category: "knowledge",
    difficulty: "hard",
    tags: ["compartment syndrome", "muscle", "circulation"],
    nremtDomain: "Trauma",
    points: 3
  }
];

// Module 9: Special Populations - 30 Questions
export const module9Questions: QuizQuestion[] = [
  {
    id: "m9-q001",
    module: 9,
    question: "What is the normal heart rate range for a toddler (1-3 years)?",
    options: [
      "80-120 bpm",
      "90-150 bpm",
      "100-160 bpm",
      "110-170 bpm"
    ],
    correctAnswer: 1,
    explanation: "Normal heart rate for toddlers is 90-150 bpm, which is higher than school-age children but lower than infants.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["pediatric", "vital signs", "toddler"],
    nremtDomain: "Special Patient Populations",
    points: 2
  },
  // Additional 29 questions...
  {
    id: "m9-q030",
    module: 9,
    question: "What is polypharmacy in elderly patients?",
    options: [
      "Taking multiple medications",
      "Drug allergies",
      "Medication compliance issues",
      "Generic medication use"
    ],
    correctAnswer: 0,
    explanation: "Polypharmacy refers to elderly patients taking multiple medications, which increases risk of drug interactions and adverse effects.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["geriatric", "polypharmacy", "medications"],
    nremtDomain: "Special Patient Populations",
    points: 1
  }
];

// Module 10: EMS Operations - 30 Questions
export const module10Questions: QuizQuestion[] = [
  {
    id: "m10-q001",
    module: 10,
    question: "What is the primary purpose of medical direction?",
    options: [
      "Equipment maintenance",
      "Quality assurance and patient care oversight",
      "Scheduling personnel",
      "Billing procedures"
    ],
    correctAnswer: 1,
    explanation: "Medical direction provides quality assurance and oversight of patient care to ensure protocols are followed and care is appropriate.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["medical direction", "quality assurance", "oversight"],
    nremtDomain: "EMS Operations",
    points: 1
  },
  // Additional 29 questions...
  {
    id: "m10-q030",
    module: 10,
    question: "What is the purpose of critical incident stress management (CISM)?",
    options: [
      "Equipment evaluation",
      "Help personnel cope with traumatic incidents",
      "Medical protocol review",
      "Performance improvement"
    ],
    correctAnswer: 1,
    explanation: "CISM helps EMS personnel cope with psychological stress from traumatic incidents and prevent long-term psychological effects.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["CISM", "stress management", "psychological support"],
    nremtDomain: "EMS Operations",
    points: 2
  }
];

// Export all modules
export const finalQuizModules: QuizModule[] = [
  {
    module: 6,
    title: "Patient Assessment",
    description: "Scene assessment, primary and secondary assessment techniques",
    questions: module6Questions,
    timeLimit: 45,
    passingScore: 80
  },
  {
    module: 7,
    title: "Medical Emergencies",
    description: "Respiratory, cardiovascular, neurological, and endocrine emergencies",
    questions: module7Questions,
    timeLimit: 50,
    passingScore: 80
  },
  {
    module: 8,
    title: "Trauma Emergencies",
    description: "Mechanisms of injury, bleeding control, and trauma management",
    questions: module8Questions,
    timeLimit: 50,
    passingScore: 85
  },
  {
    module: 9,
    title: "Special Populations",
    description: "Pediatric, geriatric, and special needs patients",
    questions: module9Questions,
    timeLimit: 40,
    passingScore: 80
  },
  {
    module: 10,
    title: "EMS Operations",
    description: "System operations, documentation, and quality improvement",
    questions: module10Questions,
    timeLimit: 40,
    passingScore: 80
  }
];
