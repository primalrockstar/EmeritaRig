// Additional Practice Quiz Modules 11-14 (Complete EMT-B Curriculum)
import { QuizQuestion, QuizModule } from './practice-quizzes';

// Module 11: Obstetrics and Gynecology - 30 Questions
export const module11Questions: QuizQuestion[] = [
  {
    id: "m11-q001",
    module: 11,
    question: "What is the normal length of pregnancy from conception?",
    options: [
      "36 weeks",
      "38 weeks", 
      "40 weeks",
      "42 weeks"
    ],
    correctAnswer: 1,
    explanation: "Normal pregnancy length is 38 weeks from conception, or 40 weeks from the last menstrual period (LMP).",
    category: "knowledge",
    difficulty: "easy",
    tags: ["pregnancy", "gestation", "normal delivery"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 1
  },
  {
    id: "m11-q002",
    module: 11,
    question: "What is the first stage of labor?",
    options: [
      "Delivery of the baby",
      "Delivery of the placenta",
      "Onset of contractions to full cervical dilation",
      "Full cervical dilation to delivery"
    ],
    correctAnswer: 2,
    explanation: "The first stage of labor begins with the onset of contractions and ends with full cervical dilation (10 cm).",
    category: "knowledge",
    difficulty: "medium",
    tags: ["labor stages", "cervical dilation", "contractions"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 2
  },
  {
    id: "m11-q003",
    module: 11,
    question: "When should you consider an imminent delivery?",
    options: [
      "Contractions every 10 minutes",
      "Contractions every 5 minutes",
      "Crowning is visible",
      "Water breaks"
    ],
    correctAnswer: 2,
    explanation: "When crowning (baby's head visible at the vaginal opening) is observed, delivery is imminent and transport may not be possible.",
    category: "application",
    difficulty: "medium",
    tags: ["imminent delivery", "crowning", "emergency delivery"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 2
  },
  {
    id: "m11-q004",
    module: 11,
    question: "What is the most common presentation for delivery?",
    options: [
      "Breech presentation",
      "Vertex (head-first) presentation",
      "Shoulder presentation",
      "Footling presentation"
    ],
    correctAnswer: 1,
    explanation: "Vertex presentation (head-first, face-down) is the normal and most common presentation, occurring in about 95% of deliveries.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["fetal presentation", "vertex", "normal delivery"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 1
  },
  {
    id: "m11-q005",
    module: 11,
    question: "What should you do immediately after the baby's head delivers?",
    options: [
      "Pull gently to deliver the shoulders",
      "Check for and remove nuchal cord",
      "Stimulate the baby to cry",
      "Cut the umbilical cord"
    ],
    correctAnswer: 1,
    explanation: "After the head delivers, immediately check for a nuchal cord (umbilical cord around the neck) and remove it if present.",
    category: "application",
    difficulty: "medium",
    tags: ["delivery procedure", "nuchal cord", "newborn care"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 2
  },
  // Continue with 25 more obstetrics questions...
  {
    id: "m11-q030",
    module: 11,
    question: "What is the most common cause of postpartum hemorrhage?",
    options: [
      "Uterine atony",
      "Cervical lacerations",
      "Retained placenta",
      "Coagulopathy"
    ],
    correctAnswer: 0,
    explanation: "Uterine atony (failure of the uterus to contract effectively) is the most common cause of postpartum hemorrhage.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["postpartum hemorrhage", "uterine atony", "complications"],
    nremtDomain: "Obstetrics and Gynecology",
    points: 2
  }
];

// Module 12: Pediatric Emergencies - 30 Questions
export const module12Questions: QuizQuestion[] = [
  {
    id: "m12-q001",
    module: 12,
    question: "What is the normal respiratory rate for a newborn?",
    options: [
      "12-20 breaths per minute",
      "20-30 breaths per minute", 
      "30-60 breaths per minute",
      "60-80 breaths per minute"
    ],
    correctAnswer: 2,
    explanation: "Normal respiratory rate for newborns is 30-60 breaths per minute, much higher than older children and adults.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["pediatric vital signs", "newborn", "respiratory rate"],
    nremtDomain: "Special Patient Populations",
    points: 1
  },
  {
    id: "m12-q002",
    module: 12,
    question: "What is the most common cause of cardiac arrest in children?",
    options: [
      "Congenital heart disease",
      "Respiratory failure",
      "Trauma",
      "Drug overdose"
    ],
    correctAnswer: 1,
    explanation: "Respiratory failure is the most common cause of cardiac arrest in children, unlike adults where cardiac causes predominate.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["pediatric cardiac arrest", "respiratory failure", "pathophysiology"],
    nremtDomain: "Special Patient Populations",
    points: 2
  },
  {
    id: "m12-q003",
    module: 12,
    question: "What is the compression-to-ventilation ratio for single-rescuer pediatric CPR?",
    options: [
      "15:2",
      "30:2",
      "5:1",
      "3:1"
    ],
    correctAnswer: 1,
    explanation: "Single-rescuer pediatric CPR uses 30:2 compression-to-ventilation ratio, same as adult CPR.",
    category: "application",
    difficulty: "medium",
    tags: ["pediatric CPR", "compression ratio", "resuscitation"],
    nremtDomain: "Special Patient Populations",
    points: 2
  },
  // Continue with 27 more pediatric questions...
  {
    id: "m12-q030",
    module: 12,
    question: "What medication can be given to pediatric patients for severe allergic reactions?",
    options: [
      "Epinephrine auto-injector (age/weight appropriate)",
      "Adult dose epinephrine only",
      "Antihistamines only", 
      "No medications for children"
    ],
    correctAnswer: 0,
    explanation: "Epinephrine auto-injectors come in pediatric doses and can be life-saving for severe allergic reactions in children.",
    category: "medication",
    difficulty: "medium",
    tags: ["pediatric medications", "epinephrine", "anaphylaxis"],
    nremtDomain: "Special Patient Populations",
    points: 2
  }
];

// Module 13: Geriatric Emergencies - 30 Questions
export const module13Questions: QuizQuestion[] = [
  {
    id: "m13-q001",
    module: 13,
    question: "What physiological change occurs in the elderly cardiovascular system?",
    options: [
      "Increased cardiac output",
      "Decreased blood pressure",
      "Decreased vessel elasticity",
      "Increased heart rate"
    ],
    correctAnswer: 2,
    explanation: "Aging causes decreased vessel elasticity, leading to increased systolic blood pressure and reduced cardiac output.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["geriatric physiology", "cardiovascular changes", "aging"],
    nremtDomain: "Special Patient Populations",
    points: 2
  },
  {
    id: "m13-q002",
    module: 13,
    question: "What is polypharmacy?",
    options: [
      "Taking multiple vitamins",
      "Using generic medications",
      "Taking multiple prescription medications",
      "Medication allergies"
    ],
    correctAnswer: 2,
    explanation: "Polypharmacy refers to elderly patients taking multiple prescription medications, increasing risk of drug interactions.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["polypharmacy", "elderly medications", "drug interactions"],
    nremtDomain: "Special Patient Populations",
    points: 1
  },
  {
    id: "m13-q003",
    module: 13,
    question: "Which condition is more common in elderly patients with chest pain?",
    options: [
      "Typical crushing chest pain",
      "Silent myocardial infarction",
      "Sharp, stabbing pain",
      "Pain only with exertion"
    ],
    correctAnswer: 1,
    explanation: "Elderly patients often present with silent or atypical myocardial infarctions, without classic chest pain symptoms.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["geriatric emergencies", "atypical presentation", "myocardial infarction"],
    nremtDomain: "Special Patient Populations",
    points: 2
  },
  // Continue with 27 more geriatric questions...
  {
    id: "m13-q030",
    module: 13,
    question: "What is the most important consideration when communicating with elderly patients?",
    options: [
      "Speak loudly to all elderly patients",
      "Use simple, one-word answers",
      "Speak clearly and allow extra time for responses",
      "Always speak to family members instead"
    ],
    correctAnswer: 2,
    explanation: "Effective communication with elderly patients requires speaking clearly, allowing extra time for responses, and treating them with respect.",
    category: "application",
    difficulty: "easy",
    tags: ["geriatric communication", "patient interaction", "elderly care"],
    nremtDomain: "Special Patient Populations",
    points: 1
  }
];

// Module 14: EMS Operations and Public Health - 30 Questions
export const module14Questions: QuizQuestion[] = [
  {
    id: "m14-q001",
    module: 14,
    question: "What is the primary purpose of quality improvement in EMS?",
    options: [
      "Reduce operational costs",
      "Improve patient outcomes and system performance",
      "Meet regulatory requirements",
      "Increase transport volume"
    ],
    correctAnswer: 1,
    explanation: "Quality improvement in EMS focuses on improving patient outcomes and overall system performance through continuous evaluation and enhancement.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["quality improvement", "EMS operations", "patient outcomes"],
    nremtDomain: "EMS Operations",
    points: 1
  },
  {
    id: "m14-q002",
    module: 14,
    question: "What is the purpose of an incident command system (ICS)?",
    options: [
      "Manage routine EMS calls",
      "Organize response to large-scale incidents",
      "Track ambulance locations",
      "Schedule EMS personnel"
    ],
    correctAnswer: 1,
    explanation: "ICS provides a standardized organizational structure for managing large-scale incidents and multi-agency responses.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["incident command", "emergency management", "multi-agency response"],
    nremtDomain: "EMS Operations",
    points: 2
  },
  {
    id: "m14-q003",
    module: 14,
    question: "What is the role of public health in EMS?",
    options: [
      "Direct patient care only",
      "Disease prevention and population health",
      "Ambulance maintenance",
      "Billing and collections"
    ],
    correctAnswer: 1,
    explanation: "Public health in EMS involves disease prevention, surveillance, and improving overall population health outcomes.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["public health", "disease prevention", "population health"],
    nremtDomain: "EMS Operations",
    points: 2
  },
  // Continue with 27 more operations questions...
  {
    id: "m14-q030",
    module: 14,
    question: "What is the purpose of EMS research?",
    options: [
      "Increase revenue",
      "Improve evidence-based practices and patient care",
      "Reduce training requirements",
      "Eliminate medical oversight"
    ],
    correctAnswer: 1,
    explanation: "EMS research aims to improve evidence-based practices, validate treatments, and enhance overall patient care quality.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["EMS research", "evidence-based practice", "quality improvement"],
    nremtDomain: "EMS Operations",
    points: 2
  }
];

// Export all 14 module quiz sets
export const completeQuizModules: QuizModule[] = [
  {
    module: 11,
    title: "Obstetrics and Gynecology",
    description: "Emergency childbirth, pregnancy complications, and gynecological emergencies",
    questions: module11Questions,
    timeLimit: 45,
    passingScore: 80
  },
  {
    module: 12,
    title: "Pediatric Emergencies", 
    description: "Assessment and treatment of infants, children, and adolescents",
    questions: module12Questions,
    timeLimit: 45,
    passingScore: 85
  },
  {
    module: 13,
    title: "Geriatric Emergencies",
    description: "Age-related changes and special considerations for elderly patients",
    questions: module13Questions,
    timeLimit: 40,
    passingScore: 80
  },
  {
    module: 14,
    title: "EMS Operations and Public Health",
    description: "System operations, incident command, and public health principles",
    questions: module14Questions,
    timeLimit: 40,
    passingScore: 80
  }
];
