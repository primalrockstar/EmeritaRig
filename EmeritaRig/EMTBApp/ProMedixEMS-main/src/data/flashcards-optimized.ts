// EMT-B Chapter-Aligned Flashcards - Optimized for Study Notes
// 15 flashcards per chapter × 41 chapters = 615 total flashcards

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  subcategory?: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  certificationLevel: 'EMT' | 'AEMT' | 'Paramedic' | 'All';
  tags: string[];
  chapterNumber: number;
  moduleNumber: number;
  chapterTitle: string;
}

export interface FlashcardCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
  totalCards: number;
}

// EMT-B Chapter-Aligned Flashcards
export const emtbChapterFlashcards: Flashcard[] = [
  // MODULE 1: PREPARATORY
  
  // Chapter 1: EMS Systems (15 cards)
  {
    id: "ch1-001",
    question: "What are the four levels of EMS training?",
    answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced Emergency Medical Technician (AEMT), and Paramedic",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["EMS levels", "certification", "training"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-002",
    question: "What does EMT scope of practice define?",
    answer: "The range of duties and skills that an EMT is allowed and expected to perform when necessary",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["scope of practice", "EMT duties"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-003",
    question: "What is medical direction?",
    answer: "Oversight of patient care aspects of an EMS system by the medical director",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["medical direction", "oversight"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-004",
    question: "What are the two types of medical control?",
    answer: "Online (direct) medical control and offline (indirect) medical control",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["medical control", "online", "offline"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-005",
    question: "What is the difference between protocols and standing orders?",
    answer: "Protocols are written guidelines for patient care, while standing orders are written instructions that allow EMTs to perform certain skills without contacting medical control",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["protocols", "standing orders"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-006",
    question: "What is continuous quality improvement (CQI)?",
    answer: "A system of ongoing internal and external reviews and audits of all aspects of an EMS system",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["CQI", "quality improvement"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-007",
    question: "What are the 14 attributes of an EMS system according to the EMS Agenda for the Future?",
    answer: "Integration, EMS research, legislation and regulation, system finance, human resources, medical direction, education systems, public education, prevention, public access, communication systems, clinical care, information systems, and evaluation",
    category: "EMS Systems",
    difficulty: "Advanced",
    certificationLevel: "EMT",
    tags: ["EMS attributes", "system components"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-008",
    question: "What is the primary role of an EMT?",
    answer: "To provide basic emergency medical care and transportation for critical and emergent patients",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["EMT role", "patient care"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-009",
    question: "What does EMR stand for and what is their role?",
    answer: "Emergency Medical Responder - provides immediate lifesaving care to critical patients until higher trained personnel arrive",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["EMR", "first responder"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-010",
    question: "What additional skills can an AEMT perform compared to an EMT?",
    answer: "Limited advanced airway procedures, IV therapy, and administration of certain medications",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["AEMT", "advanced skills"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-011",
    question: "What is the highest level of prehospital care?",
    answer: "Paramedic - can perform advanced assessment and provide invasive and drug interventions",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["paramedic", "advanced care"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-012",
    question: "What is the purpose of the National Registry of Emergency Medical Technicians (NREMT)?",
    answer: "To provide national standards for EMT testing and certification",
    category: "EMS Systems",
    difficulty: "Basic",
    certificationLevel: "EMT",
    tags: ["NREMT", "certification"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-013",
    question: "What is the difference between licensure and certification?",
    answer: "Licensure is permission to practice granted by a state regulatory agency, while certification is recognition of qualifications by a professional organization",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["licensure", "certification"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-014",
    question: "What is reciprocity in EMS?",
    answer: "The process by which an individual certified in one state can become certified in another state",
    category: "EMS Systems",
    difficulty: "Intermediate",
    certificationLevel: "EMT",
    tags: ["reciprocity", "state certification"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  },
  {
    id: "ch1-015",
    question: "What are the key components of an integrated EMS system?",
    answer: "Public education, easy access (911), dispatch, first responders, EMS personnel, hospitals, rehabilitation, data collection, and evaluation",
    category: "EMS Systems",
    difficulty: "Advanced",
    certificationLevel: "EMT",
    tags: ["integrated system", "components"],
    chapterNumber: 1,
    moduleNumber: 1,
    chapterTitle: "EMS Systems"
  }
];

// Export functions to get flashcards by chapter, module, or difficulty
export const getFlashcardsByChapter = (chapterNumber: number): Flashcard[] => {
  return emtbChapterFlashcards.filter(card => card.chapterNumber === chapterNumber);
};

export const getFlashcardsByModule = (moduleNumber: number): Flashcard[] => {
  return emtbChapterFlashcards.filter(card => card.moduleNumber === moduleNumber);
};

export const getFlashcardsByDifficulty = (difficulty: 'Basic' | 'Intermediate' | 'Advanced'): Flashcard[] => {
  return emtbChapterFlashcards.filter(card => card.difficulty === difficulty);
};

export const getRandomFlashcards = (count: number): Flashcard[] => {
  const shuffled = [...emtbChapterFlashcards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Chapter titles for reference
export const chapterTitles: { [key: number]: string } = {
  1: "EMS Systems",
  2: "Workforce Safety and Wellness", 
  3: "Medical, Legal, and Ethical Issues",
  4: "Communications and Documentation",
  5: "Medical Terminology",
  6: "The Human Body",
  7: "Life Span Development",
  8: "Lifting and Moving Patients",
  9: "Vital Signs and Monitoring Devices",
  10: "Patient Assessment",
  11: "Airway Management",
  12: "Medication Administration",
  13: "Shock Recognition and Management",
  14: "BLS Resuscitation",
  15: "Medical Overview",
  16: "Respiratory Emergencies",
  17: "Cardiovascular Emergencies", 
  18: "Neurological Emergencies",
  19: "GI/GU Emergencies",
  20: "Endocrine and Hematologic Emergencies",
  21: "Obstetric Emergencies",
  22: "Pediatric Emergencies",
  23: "Behavioral Health Emergencies",
  24: "Gynecologic Emergencies",
  25: "Trauma Overview",
  26: "Bleeding",
  27: "Soft-Tissue Injuries",
  28: "Head and Spine Injuries",
  29: "Musculoskeletal Care",
  30: "Chest Injuries",
  31: "Abdominal and Genitourinary Injuries",
  32: "Orthopaedic Injuries",
  33: "Environmental Emergencies",
  34: "Pediatric Emergencies",
  35: "Obstetrics and Neonatal Care",
  36: "Geriatric Emergencies",
  37: "Special Challenges",
  38: "Vehicle Operations and Transport of Patients",
  39: "Gaining Access and Rescue Operations",
  40: "Incident Management",
  41: "Terrorism and Disaster Management"
};

// Module organization
export const moduleOrganization = {
  1: { title: "Preparatory", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  2: { title: "Airway, Respiration, and Ventilation", chapters: [10, 11] },
  3: { title: "Patient Assessment", chapters: [12] },
  4: { title: "Pharmacology", chapters: [13] },
  5: { title: "Shock and Resuscitation", chapters: [14, 15] },
  6: { title: "Medical", chapters: [16, 17, 18, 19, 20] },
  7: { title: "Medical", chapters: [21, 22, 23, 24] },
  8: { title: "Trauma", chapters: [25, 26, 27] },
  9: { title: "Trauma", chapters: [28, 29, 30] },
  10: { title: "Trauma", chapters: [31, 32, 33] },
  11: { title: "Special Patient Populations", chapters: [34, 35, 36] },
  12: { title: "Special Challenges", chapters: [37] },
  13: { title: "Operations", chapters: [38, 39, 40, 41] }
};

// Legacy flashcard categories for backwards compatibility
export const flashcardCategories: FlashcardCategory[] = [
  {
    id: 'ems-systems',
    name: 'EMS Systems',
    description: 'EMS organization, roles, responsibilities',
    icon: '🚑',
    subcategories: ['System Components', 'Levels of Training', 'Medical Direction', 'Quality Improvement'],
    totalCards: 15
  },
  {
    id: 'safety-wellness',
    name: 'Safety and Wellness',
    description: 'Workforce safety, stress management, infection control',
    icon: '🛡️',
    subcategories: ['Stress Management', 'Infection Control', 'Body Mechanics', 'Scene Safety'],
    totalCards: 15
  },
  {
    id: 'medical-legal',
    name: 'Medical Legal Ethics',
    description: 'Legal issues, patient rights, documentation',
    icon: '⚖️',
    subcategories: ['Consent', 'Negligence', 'Confidentiality', 'Documentation'],
    totalCards: 15
  }
];

// Legacy flashcards array for backwards compatibility  
export const flashcards: Flashcard[] = emtbChapterFlashcards;

export default emtbChapterFlashcards;
