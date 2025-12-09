// Practice Quiz Questions for EMT-B Modules
// 30 questions per module including medications

export interface QuizQuestion {
  id: string;
  module: number;
  chapter?: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  category: 'knowledge' | 'application' | 'analysis' | 'medication' | 'protocol' | 'scenario';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  nremtDomain?: string;
  points: number;
}

export interface QuizModule {
  module: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number; // minutes
  passingScore: number; // percentage
}

// Module 1: Preparatory (Chapters 1-4) - 30 Questions
export const module1Questions: QuizQuestion[] = [
  {
    id: "m1-q001",
    module: 1,
    chapter: 1,
    question: "What is the primary purpose of the EMS system?",
    options: [
      "To transport patients to hospitals quickly",
      "To provide emergency medical care and transport when needed",
      "To replace hospital emergency departments",
      "To train medical professionals"
    ],
    correctAnswer: 1,
    explanation: "The EMS system's primary purpose is to provide emergency medical care and transport when needed, ensuring patients receive appropriate care from the scene through definitive treatment.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["EMS system", "purpose", "emergency care"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q002",
    module: 1,
    chapter: 1,
    question: "Which level of EMS certification typically has the most extensive scope of practice?",
    options: [
      "Emergency Medical Responder (EMR)",
      "Emergency Medical Technician (EMT)",
      "Advanced Emergency Medical Technician (AEMT)",
      "Paramedic"
    ],
    correctAnswer: 3,
    explanation: "Paramedics have the most extensive scope of practice, including advanced airway management, medication administration, cardiac monitoring, and advanced procedures.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["certification levels", "scope of practice", "paramedic"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q003",
    module: 1,
    chapter: 1,
    question: "A patient refuses treatment after you explain the risks. What should you do?",
    options: [
      "Leave immediately without documentation",
      "Force treatment because it's in their best interest",
      "Document the refusal and have the patient sign",
      "Call law enforcement to intervene"
    ],
    correctAnswer: 2,
    explanation: "When a competent adult refuses treatment, document the refusal thoroughly, ensure they understand the risks, and have them sign the refusal form if possible.",
    category: "application",
    difficulty: "medium",
    tags: ["refusal", "documentation", "patient rights"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q004",
    module: 1,
    chapter: 2,
    question: "What is the most important factor in preventing injury during patient care?",
    options: [
      "Moving quickly to complete care",
      "Using proper body mechanics",
      "Having the newest equipment",
      "Working alone to avoid confusion"
    ],
    correctAnswer: 1,
    explanation: "Using proper body mechanics is crucial for preventing injury to both the EMT and patient. This includes proper lifting techniques, equipment usage, and ergonomic practices.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["safety", "body mechanics", "injury prevention"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q005",
    module: 1,
    chapter: 2,
    question: "Which personal protective equipment (PPE) is most appropriate for a patient with suspected tuberculosis?",
    options: [
      "Surgical mask only",
      "N95 respirator and eye protection",
      "Gloves and gown only",
      "Full hazmat suit"
    ],
    correctAnswer: 1,
    explanation: "For airborne diseases like tuberculosis, use an N95 respirator (or higher level) and eye protection. Standard precautions with gloves and gown should also be used.",
    category: "application",
    difficulty: "medium",
    tags: ["PPE", "tuberculosis", "airborne precautions"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q006",
    module: 1,
    chapter: 2,
    question: "You respond to a motor vehicle crash and notice leaking fuel. What is your immediate priority?",
    options: [
      "Begin patient assessment immediately",
      "Establish scene safety and consider evacuation",
      "Start fire suppression",
      "Direct traffic around the scene"
    ],
    correctAnswer: 1,
    explanation: "Scene safety is always the first priority. With leaking fuel present, there's a significant fire/explosion risk requiring immediate safety assessment and possible evacuation.",
    category: "analysis",
    difficulty: "medium",
    tags: ["scene safety", "hazards", "priorities"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q007",
    module: 1,
    chapter: 3,
    question: "What is required for implied consent?",
    options: [
      "Patient must be conscious and oriented",
      "Patient must sign a written form",
      "Patient is unresponsive with a life-threatening emergency",
      "Family member must give permission"
    ],
    correctAnswer: 2,
    explanation: "Implied consent applies when a patient is unresponsive and has a life-threatening emergency. It assumes a reasonable person would consent to life-saving treatment.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["implied consent", "legal", "emergency treatment"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q008",
    module: 1,
    chapter: 3,
    question: "Which action would most likely result in a charge of assault?",
    options: [
      "Treating an unconscious patient",
      "Documenting patient refusal",
      "Threatening to restrain a patient who refuses care",
      "Asking for identification"
    ],
    correctAnswer: 2,
    explanation: "Assault is the threat of unwanted contact. Threatening to restrain a competent patient who refuses care could constitute assault.",
    category: "analysis",
    difficulty: "hard",
    tags: ["assault", "legal issues", "patient rights"],
    nremtDomain: "Preparatory",
    points: 3
  },
  {
    id: "m1-q009",
    module: 1,
    chapter: 3,
    question: "When can patient information be shared without consent?",
    options: [
      "When family members ask for updates",
      "When required by law (e.g., gunshot wounds)",
      "When coworkers are curious about the call",
      "When posting on social media for educational purposes"
    ],
    correctAnswer: 1,
    explanation: "Patient information can be shared without consent when required by law, such as reporting gunshot wounds, communicable diseases, or child abuse to appropriate authorities.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["confidentiality", "HIPAA", "mandatory reporting"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q010",
    module: 1,
    chapter: 4,
    question: "What is the most appropriate response when medical control gives an order outside your scope of practice?",
    options: [
      "Follow the order immediately",
      "Refuse and document the refusal",
      "Question the order and clarify your scope of practice",
      "Have your partner perform the procedure"
    ],
    correctAnswer: 2,
    explanation: "When receiving orders outside your scope of practice, question the order professionally and clarify your certification level and authorized procedures.",
    category: "analysis",
    difficulty: "medium",
    tags: ["medical control", "scope of practice", "orders"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q011",
    module: 1,
    chapter: 4,
    question: "Which radio communication technique is most appropriate?",
    options: [
      "Speak rapidly to save time",
      "Use medical terminology exclusively",
      "Speak clearly and concisely using plain English",
      "Include all personal patient information"
    ],
    correctAnswer: 2,
    explanation: "Effective radio communication requires speaking clearly and concisely using plain English when possible, avoiding unnecessary medical jargon that might cause confusion.",
    category: "application",
    difficulty: "easy",
    tags: ["communication", "radio", "medical control"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q012",
    module: 1,
    chapter: 1,
    question: "What is the primary role of the EMT in the healthcare system?",
    options: [
      "To diagnose medical conditions",
      "To provide emergency care and safe transport",
      "To prescribe medications",
      "To perform surgical procedures"
    ],
    correctAnswer: 1,
    explanation: "The EMT's primary role is to provide emergency care and safe transport to patients, serving as the initial link in the emergency medical care system.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["EMT role", "healthcare system", "emergency care"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q013",
    module: 1,
    chapter: 2,
    question: "Which situation poses the greatest risk for exposure to bloodborne pathogens?",
    options: [
      "Taking vital signs",
      "Applying a cervical collar",
      "Controlling severe bleeding",
      "Administering oxygen"
    ],
    correctAnswer: 2,
    explanation: "Controlling severe bleeding involves direct contact with blood and body fluids, creating the highest risk for exposure to bloodborne pathogens like HIV and Hepatitis B.",
    category: "analysis",
    difficulty: "medium",
    tags: ["bloodborne pathogens", "infection control", "bleeding"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q014",
    module: 1,
    chapter: 2,
    question: "After exposure to potentially infectious material, what should you do first?",
    options: [
      "Continue patient care",
      "Immediately cleanse the affected area",
      "Report to supervisor after the shift",
      "Take prophylactic antibiotics"
    ],
    correctAnswer: 1,
    explanation: "Immediately after exposure, cleanse the affected area thoroughly with soap and water (or appropriate antiseptic), then follow exposure protocols.",
    category: "application",
    difficulty: "medium",
    tags: ["exposure protocol", "decontamination", "safety"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q015",
    module: 1,
    chapter: 3,
    question: "A 16-year-old patient refuses treatment for a broken arm. What should you do?",
    options: [
      "Treat anyway because they're a minor",
      "Respect their refusal",
      "Obtain consent from a parent or guardian",
      "Call law enforcement"
    ],
    correctAnswer: 2,
    explanation: "Minors typically cannot refuse treatment. You must obtain consent from a parent or guardian. If unavailable and it's an emergency, treat under implied consent.",
    category: "application",
    difficulty: "medium",
    tags: ["minor consent", "refusal", "legal"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q016",
    module: 1,
    chapter: 3,
    question: "What constitutes battery in the context of EMS?",
    options: [
      "Threatening to restrain a patient",
      "Providing care without consent",
      "Asking personal medical questions",
      "Transporting against patient wishes"
    ],
    correctAnswer: 1,
    explanation: "Battery is unlawful physical contact. Providing care without proper consent (to a competent adult) can constitute battery.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["battery", "consent", "legal"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q017",
    module: 1,
    chapter: 4,
    question: "When documenting patient care, which principle is most important?",
    options: [
      "Use complex medical terminology",
      "Include personal opinions about the patient",
      "Record facts objectively and completely",
      "Keep documentation brief to save time"
    ],
    correctAnswer: 2,
    explanation: "Documentation should be factual, objective, complete, and accurate. Avoid opinions, use clear language, and include all relevant details.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["documentation", "medical records", "objectivity"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q018",
    module: 1,
    chapter: 1,
    question: "Which best describes the concept of 'scope of practice'?",
    options: [
      "Skills an EMT wants to perform",
      "Legal boundaries of what an EMT is authorized to do",
      "Skills learned in EMT school",
      "Actions taken during emergencies only"
    ],
    correctAnswer: 1,
    explanation: "Scope of practice defines the legal boundaries and specific skills/procedures that an EMT is authorized to perform based on their certification level.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["scope of practice", "legal boundaries", "certification"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q019",
    module: 1,
    chapter: 2,
    question: "What is the most effective way to prevent the spread of infectious diseases in EMS?",
    options: [
      "Avoiding sick patients",
      "Taking antibiotics regularly",
      "Consistent use of Standard Precautions",
      "Working only day shifts"
    ],
    correctAnswer: 2,
    explanation: "Standard Precautions (treating all patients as potentially infectious) with appropriate PPE is the most effective method to prevent disease transmission.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["infection control", "standard precautions", "prevention"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q020",
    module: 1,
    chapter: 2,
    question: "You arrive at a scene where there are downed power lines near the patient. What should you do?",
    options: [
      "Quickly remove the patient from danger",
      "Use wooden tools to move the wires",
      "Establish a safety zone and call the power company",
      "Pour water on the lines to extinguish sparks"
    ],
    correctAnswer: 2,
    explanation: "Never approach downed power lines. Establish a safety zone, call the power company, and wait for them to secure the scene before approaching.",
    category: "analysis",
    difficulty: "medium",
    tags: ["electrical hazards", "scene safety", "power lines"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q021",
    module: 1,
    chapter: 3,
    question: "What is the difference between expressed and informed consent?",
    options: [
      "There is no difference",
      "Expressed is verbal, informed includes understanding risks",
      "Informed is written, expressed is verbal",
      "Expressed is for emergencies, informed is for routine care"
    ],
    correctAnswer: 1,
    explanation: "Expressed consent is verbal or written agreement. Informed consent requires the patient to understand the treatment, risks, benefits, and alternatives.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["consent types", "informed consent", "patient education"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q022",
    module: 1,
    chapter: 3,
    question: "When is it appropriate to breach patient confidentiality?",
    options: [
      "When family members request information",
      "When curious about the patient's condition",
      "When required to report communicable diseases",
      "When discussing cases for entertainment"
    ],
    correctAnswer: 2,
    explanation: "Confidentiality can be breached when legally required, such as reporting communicable diseases, gunshot wounds, or suspected abuse to appropriate authorities.",
    category: "application",
    difficulty: "medium",
    tags: ["confidentiality", "mandatory reporting", "legal requirements"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q023",
    module: 1,
    chapter: 4,
    question: "What information should be included in every radio report to medical control?",
    options: [
      "Patient's name and address",
      "Unit ID, patient age/sex, chief complaint, vital signs",
      "Family medical history",
      "Patient's insurance information"
    ],
    correctAnswer: 1,
    explanation: "Radio reports should include unit ID, patient age/sex, chief complaint, pertinent assessment findings, vital signs, and treatments provided.",
    category: "application",
    difficulty: "easy",
    tags: ["radio reports", "medical control", "communication"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q024",
    module: 1,
    chapter: 1,
    question: "Which organization is responsible for developing national EMS education standards?",
    options: [
      "Department of Transportation (DOT)",
      "National Registry of EMTs (NREMT)",
      "American Heart Association (AHA)",
      "Centers for Disease Control (CDC)"
    ],
    correctAnswer: 0,
    explanation: "The Department of Transportation, through NHTSA, develops national EMS education standards and curriculum guidelines.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["education standards", "DOT", "NHTSA"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q025",
    module: 1,
    chapter: 2,
    question: "What is the primary purpose of proper lifting techniques?",
    options: [
      "To appear professional",
      "To prevent injury to yourself and others",
      "To complete tasks quickly",
      "To meet regulatory requirements"
    ],
    correctAnswer: 1,
    explanation: "Proper lifting techniques primarily prevent injury to both the EMT and patient, ensuring safe patient handling and career longevity.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["lifting techniques", "injury prevention", "safety"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q026",
    module: 1,
    chapter: 2,
    question: "Which factor is most important when sizing up a vehicle crash scene?",
    options: [
      "Number of patients",
      "Time of day",
      "Mechanism of injury and scene safety",
      "Weather conditions"
    ],
    correctAnswer: 2,
    explanation: "Mechanism of injury and scene safety are most important, helping predict potential injuries and ensuring responder safety before patient care begins.",
    category: "analysis",
    difficulty: "medium",
    tags: ["scene assessment", "mechanism of injury", "safety"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q027",
    module: 1,
    chapter: 3,
    question: "A patient with altered mental status due to hypoglycemia cannot give consent. What legal principle applies?",
    options: [
      "Expressed consent",
      "Informed consent",
      "Implied consent",
      "Advanced directive"
    ],
    correctAnswer: 2,
    explanation: "Implied consent applies when a patient cannot consent due to altered mental status but has a condition requiring immediate treatment.",
    category: "application",
    difficulty: "medium",
    tags: ["implied consent", "altered mental status", "emergency treatment"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q028",
    module: 1,
    chapter: 4,
    question: "What is the most important characteristic of effective patient care documentation?",
    options: [
      "Length and detail",
      "Use of medical abbreviations",
      "Accuracy and objectivity",
      "Speed of completion"
    ],
    correctAnswer: 2,
    explanation: "Documentation must be accurate and objective, recording facts without opinions or assumptions, as it serves as a legal record of care provided.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["documentation", "accuracy", "legal record"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "m1-q029",
    module: 1,
    chapter: 1,
    question: "What is continuous quality improvement (CQI) in EMS?",
    options: [
      "Annual training requirements",
      "Equipment maintenance schedules",
      "Ongoing evaluation and improvement of patient care",
      "Budget planning processes"
    ],
    correctAnswer: 2,
    explanation: "CQI is the ongoing evaluation of EMS care through case reviews, outcome analysis, and system improvements to enhance patient care quality.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["quality improvement", "CQI", "patient care"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "m1-q030",
    module: 1,
    chapter: 4,
    question: "During transport, medical control orders you to administer a medication outside your scope of practice. What should you do?",
    options: [
      "Administer the medication as ordered",
      "Refuse and explain your scope of practice limitations",
      "Have the patient self-administer",
      "Ignore the order"
    ],
    correctAnswer: 1,
    explanation: "You must refuse orders outside your scope of practice and clearly explain your certification limitations to medical control. Document the interaction.",
    category: "analysis",
    difficulty: "hard",
    tags: ["scope of practice", "medical control", "medication orders"],
    nremtDomain: "Preparatory",
    points: 3
  }
];

// Module 2: Anatomy & Physiology (Chapters 5-9) - 30 Questions
export const module2Questions: QuizQuestion[] = [
  {
    id: "m2-q001",
    module: 2,
    chapter: 5,
    question: "What is the anatomical position?",
    options: [
      "Standing upright, arms at sides, palms facing backward",
      "Standing upright, arms at sides, palms facing forward",
      "Lying supine with arms crossed",
      "Sitting upright with hands on knees"
    ],
    correctAnswer: 1,
    explanation: "The anatomical position is standing upright, facing forward, arms at sides with palms facing forward. This is the reference position for all anatomical descriptions.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["anatomical position", "medical terminology", "reference position"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q002",
    module: 2,
    chapter: 5,
    question: "The term 'proximal' means:",
    options: [
      "Farther from the midline",
      "Closer to the center of the body",
      "Closer to the point of attachment",
      "Toward the back"
    ],
    correctAnswer: 2,
    explanation: "Proximal means closer to the point of attachment to the trunk. For example, the shoulder is proximal to the elbow.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["directional terms", "proximal", "anatomy"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q003",
    module: 2,
    chapter: 6,
    question: "Which plane divides the body into right and left halves?",
    options: [
      "Frontal plane",
      "Transverse plane",
      "Sagittal plane",
      "Coronal plane"
    ],
    correctAnswer: 2,
    explanation: "The sagittal plane divides the body into right and left halves. The midsagittal plane divides it into equal halves.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["body planes", "sagittal plane", "anatomy"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q004",
    module: 2,
    chapter: 6,
    question: "The heart is located in which body cavity?",
    options: [
      "Abdominal cavity",
      "Cranial cavity",
      "Thoracic cavity",
      "Pelvic cavity"
    ],
    correctAnswer: 2,
    explanation: "The heart is located in the thoracic cavity, specifically within the mediastinum between the lungs.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["body cavities", "heart location", "thoracic cavity"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q005",
    module: 2,
    chapter: 6,
    question: "Which organ system is primarily responsible for maintaining fluid balance?",
    options: [
      "Respiratory system",
      "Circulatory system",
      "Renal system",
      "Nervous system"
    ],
    correctAnswer: 2,
    explanation: "The renal (urinary) system, particularly the kidneys, is primarily responsible for maintaining fluid and electrolyte balance in the body.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["renal system", "fluid balance", "kidneys"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q006",
    module: 2,
    chapter: 7,
    question: "What is the normal respiratory rate for a healthy adult at rest?",
    options: [
      "8-12 breaths per minute",
      "12-20 breaths per minute",
      "20-30 breaths per minute",
      "30-40 breaths per minute"
    ],
    correctAnswer: 1,
    explanation: "Normal adult respiratory rate at rest is 12-20 breaths per minute. Rates below 12 or above 20 may indicate respiratory compromise.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["vital signs", "respiratory rate", "normal values"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q007",
    module: 2,
    chapter: 7,
    question: "During inspiration, what happens to the diaphragm?",
    options: [
      "It relaxes and moves upward",
      "It contracts and moves downward",
      "It remains stationary",
      "It moves side to side"
    ],
    correctAnswer: 1,
    explanation: "During inspiration, the diaphragm contracts and moves downward, increasing the thoracic cavity volume and drawing air into the lungs.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["breathing mechanics", "diaphragm", "inspiration"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q008",
    module: 2,
    chapter: 8,
    question: "What is the normal range for systolic blood pressure in a healthy adult?",
    options: [
      "90-120 mmHg",
      "120-140 mmHg",
      "140-160 mmHg",
      "60-90 mmHg"
    ],
    correctAnswer: 0,
    explanation: "Normal systolic blood pressure is less than 120 mmHg. The range 90-120 mmHg represents normal to optimal values.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["blood pressure", "vital signs", "normal values"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q009",
    module: 2,
    chapter: 8,
    question: "Which chamber of the heart pumps blood to the lungs?",
    options: [
      "Right atrium",
      "Left atrium",
      "Right ventricle",
      "Left ventricle"
    ],
    correctAnswer: 2,
    explanation: "The right ventricle pumps deoxygenated blood to the lungs through the pulmonary artery for oxygenation.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["heart anatomy", "pulmonary circulation", "ventricles"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q010",
    module: 2,
    chapter: 9,
    question: "What is the primary difference between pediatric and adult airways?",
    options: [
      "Pediatric airways are wider",
      "Pediatric airways have larger tongues proportionally",
      "Pediatric airways are less flexible",
      "No significant differences exist"
    ],
    correctAnswer: 1,
    explanation: "Pediatric airways have proportionally larger tongues, smaller airways, and different anatomical positioning, making them more susceptible to obstruction.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["pediatric anatomy", "airway differences", "development"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q011",
    module: 2,
    chapter: 5,
    question: "The term 'lateral' refers to:",
    options: [
      "Toward the midline",
      "Away from the midline",
      "Toward the front",
      "Toward the back"
    ],
    correctAnswer: 1,
    explanation: "Lateral means away from the midline of the body. For example, the arms are lateral to the chest.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["directional terms", "lateral", "anatomy"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q012",
    module: 2,
    chapter: 6,
    question: "Which body system controls involuntary functions like heart rate and breathing?",
    options: [
      "Central nervous system",
      "Peripheral nervous system",
      "Autonomic nervous system",
      "Somatic nervous system"
    ],
    correctAnswer: 2,
    explanation: "The autonomic nervous system controls involuntary functions including heart rate, breathing, digestion, and blood pressure.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["nervous system", "autonomic functions", "involuntary"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q013",
    module: 2,
    chapter: 6,
    question: "What is the largest organ in the human body?",
    options: [
      "Liver",
      "Lungs",
      "Skin",
      "Brain"
    ],
    correctAnswer: 2,
    explanation: "The skin is the largest organ in the human body, providing protection, temperature regulation, and sensory functions.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["skin", "organ systems", "anatomy"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q014",
    module: 2,
    chapter: 7,
    question: "Gas exchange occurs in which structures of the respiratory system?",
    options: [
      "Bronchi",
      "Bronchioles",
      "Alveoli",
      "Trachea"
    ],
    correctAnswer: 2,
    explanation: "Gas exchange occurs in the alveoli, tiny air sacs where oxygen enters the blood and carbon dioxide is removed.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["respiratory system", "alveoli", "gas exchange"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q015",
    module: 2,
    chapter: 7,
    question: "What is the normal oxygen saturation level for a healthy adult?",
    options: [
      "85-90%",
      "90-95%",
      "95-100%",
      "100%"
    ],
    correctAnswer: 2,
    explanation: "Normal oxygen saturation (SpO2) for healthy adults is 95-100%. Values below 95% may indicate respiratory compromise.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["oxygen saturation", "pulse oximetry", "normal values"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q016",
    module: 2,
    chapter: 8,
    question: "Which blood vessels carry oxygenated blood away from the heart?",
    options: [
      "Veins",
      "Arteries",
      "Capillaries",
      "Venules"
    ],
    correctAnswer: 1,
    explanation: "Arteries carry oxygenated blood away from the heart to body tissues (except pulmonary arteries which carry deoxygenated blood to lungs).",
    category: "knowledge",
    difficulty: "easy",
    tags: ["circulation", "arteries", "blood vessels"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q017",
    module: 2,
    chapter: 8,
    question: "What is the normal resting heart rate for a healthy adult?",
    options: [
      "40-60 beats per minute",
      "60-100 beats per minute",
      "100-120 beats per minute",
      "120-140 beats per minute"
    ],
    correctAnswer: 1,
    explanation: "Normal resting heart rate for healthy adults is 60-100 beats per minute. Athletes may have lower rates due to conditioning.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["heart rate", "vital signs", "normal values"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q018",
    module: 2,
    chapter: 9,
    question: "At what age do the fontanelles (soft spots) typically close in infants?",
    options: [
      "6 months",
      "12-18 months",
      "2-3 years",
      "5 years"
    ],
    correctAnswer: 1,
    explanation: "The anterior fontanelle typically closes between 12-18 months, while the posterior fontanelle closes by 2-3 months.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["pediatric development", "fontanelles", "skull"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q019",
    module: 2,
    chapter: 9,
    question: "How does aging affect the respiratory system?",
    options: [
      "Increases lung elasticity",
      "Improves gas exchange",
      "Decreases chest wall compliance",
      "Enhances respiratory muscle strength"
    ],
    correctAnswer: 2,
    explanation: "Aging decreases chest wall compliance, reduces lung elasticity, and weakens respiratory muscles, making breathing less efficient.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["aging", "respiratory changes", "geriatric"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q020",
    module: 2,
    chapter: 5,
    question: "Which term describes a position toward the head?",
    options: [
      "Caudal",
      "Cephalad",
      "Distal",
      "Ventral"
    ],
    correctAnswer: 1,
    explanation: "Cephalad (or superior) means toward the head or upper part of the body. Caudal means toward the tail or lower part.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["directional terms", "cephalad", "anatomy"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q021",
    module: 2,
    chapter: 6,
    question: "What is homeostasis?",
    options: [
      "Growth and development",
      "Response to injury",
      "Maintenance of stable internal environment",
      "Cellular reproduction"
    ],
    correctAnswer: 2,
    explanation: "Homeostasis is the body's ability to maintain a stable internal environment despite external changes, including temperature, pH, and fluid balance.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["homeostasis", "physiology", "internal environment"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q022",
    module: 2,
    chapter: 7,
    question: "What triggers the body's primary drive to breathe?",
    options: [
      "Low oxygen levels",
      "High carbon dioxide levels",
      "High oxygen levels",
      "Low carbon dioxide levels"
    ],
    correctAnswer: 1,
    explanation: "The primary respiratory drive is triggered by high carbon dioxide levels (hypercapnia) detected by chemoreceptors in the medulla.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["respiratory drive", "carbon dioxide", "breathing control"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q023",
    module: 2,
    chapter: 8,
    question: "Which component of blood is responsible for clotting?",
    options: [
      "Red blood cells",
      "White blood cells",
      "Platelets",
      "Plasma"
    ],
    correctAnswer: 2,
    explanation: "Platelets (thrombocytes) are responsible for blood clotting, forming plugs at injury sites and initiating the coagulation cascade.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["blood components", "platelets", "clotting"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q024",
    module: 2,
    chapter: 8,
    question: "What is stroke volume?",
    options: [
      "Total blood volume in the body",
      "Amount of blood pumped per heartbeat",
      "Blood pressure measurement",
      "Heart rate per minute"
    ],
    correctAnswer: 1,
    explanation: "Stroke volume is the amount of blood pumped by the left ventricle with each heartbeat, typically 60-80 mL in adults.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["stroke volume", "cardiac output", "heart function"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q025",
    module: 2,
    chapter: 9,
    question: "What is a key difference in the pediatric cardiovascular system?",
    options: [
      "Children have lower heart rates",
      "Children have less blood volume per kilogram",
      "Children's hearts are less sensitive to hypoxia",
      "Children have limited ability to increase stroke volume"
    ],
    correctAnswer: 3,
    explanation: "Children have limited ability to increase stroke volume, so they rely primarily on increasing heart rate to improve cardiac output.",
    category: "knowledge",
    difficulty: "hard",
    tags: ["pediatric physiology", "cardiac output", "development"],
    nremtDomain: "Anatomy and Physiology",
    points: 3
  },
  {
    id: "m2-q026",
    module: 2,
    chapter: 6,
    question: "Which body system produces hormones?",
    options: [
      "Respiratory system",
      "Digestive system",
      "Endocrine system",
      "Lymphatic system"
    ],
    correctAnswer: 2,
    explanation: "The endocrine system produces hormones that regulate various body functions including metabolism, growth, and reproduction.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["endocrine system", "hormones", "body systems"],
    nremtDomain: "Anatomy and Physiology",
    points: 1
  },
  {
    id: "m2-q027",
    module: 2,
    chapter: 7,
    question: "What happens to dead space ventilation in respiratory disease?",
    options: [
      "It decreases significantly",
      "It remains unchanged",
      "It increases, reducing efficiency",
      "It eliminates completely"
    ],
    correctAnswer: 2,
    explanation: "Dead space ventilation increases in respiratory disease, meaning more air doesn't participate in gas exchange, reducing respiratory efficiency.",
    category: "application",
    difficulty: "hard",
    tags: ["dead space", "respiratory disease", "ventilation"],
    nremtDomain: "Anatomy and Physiology",
    points: 3
  },
  {
    id: "m2-q028",
    module: 2,
    chapter: 8,
    question: "What is the function of the coronary arteries?",
    options: [
      "Supply blood to the lungs",
      "Supply blood to the brain",
      "Supply blood to the heart muscle",
      "Return blood to the heart"
    ],
    correctAnswer: 2,
    explanation: "Coronary arteries supply oxygenated blood to the heart muscle (myocardium). Blockage can cause myocardial infarction.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["coronary circulation", "heart muscle", "blood supply"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q029",
    module: 2,
    chapter: 9,
    question: "How does pregnancy affect the cardiovascular system?",
    options: [
      "Decreases blood volume",
      "Increases blood volume and heart rate",
      "Decreases heart rate",
      "No significant changes occur"
    ],
    correctAnswer: 1,
    explanation: "Pregnancy increases blood volume by 40-50% and increases heart rate to meet increased metabolic demands of mother and fetus.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["pregnancy", "cardiovascular changes", "physiology"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  },
  {
    id: "m2-q030",
    module: 2,
    chapter: 5,
    question: "A patient has a wound on the medial aspect of the thigh. Where is this located?",
    options: [
      "Outer side of the thigh",
      "Inner side of the thigh",
      "Front of the thigh",
      "Back of the thigh"
    ],
    correctAnswer: 1,
    explanation: "Medial refers to toward the midline of the body. The medial aspect of the thigh is the inner side, closer to the other leg.",
    category: "application",
    difficulty: "medium",
    tags: ["directional terms", "medial", "clinical application"],
    nremtDomain: "Anatomy and Physiology",
    points: 2
  }
];

// Export all quiz modules
export const quizModules: QuizModule[] = [
  {
    module: 1,
    title: "Preparatory",
    description: "EMS Systems, Safety, Legal and Ethical Issues, Communications and Documentation",
    questions: module1Questions,
    timeLimit: 45,
    passingScore: 80
  },
  {
    module: 2,
    title: "Anatomy & Physiology",
    description: "Medical Terminology, Body Systems, Human Development, and Pathophysiology",
    questions: module2Questions,
    timeLimit: 45,
    passingScore: 80
  }
  // Additional modules will be added in separate files due to size
];

export default quizModules;
