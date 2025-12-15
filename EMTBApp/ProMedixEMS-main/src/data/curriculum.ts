export interface StudyModule {
  id: number;
  title: string;
  description: string;
  chapters: number[];
  estimatedHours: number;
  isBonus?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  moduleId: number;
  estimatedStudyTime: string;
  objectives: string[];
}

// EMT-B Study Modules organized by the National EMS Education Standards
// Modules mirror the STUDY_NOTES_MODULE_MAP.md structure
export const studyModules: StudyModule[] = [
  {
    id: 1,
    title: "Foundations of EMS Practice",
    description: "Broad orientation topics grouped so learners see system, safety, legal, and communications content together.",
    chapters: [1, 2, 3, 4],
    estimatedHours: 8,
    isBonus: false
  },
  {
    id: 2,
    title: "Clinical Foundations",
    description: "Core science and movement skills; additional chapter (9) carries interprofessional competencies that bridge Module 1 and assessment content.",
    chapters: [5, 6, 7, 8, 9],
    estimatedHours: 12,
    isBonus: false
  },
  {
    id: 3,
    title: "Patient Assessment Mastery",
    description: "Dedicated full-length module for comprehensive assessment; typically taught over several lab sessions so the chapter stands alone.",
    chapters: [10],
    estimatedHours: 6,
    isBonus: false
  },
  {
    id: 4,
    title: "Airway & Ventilatory Management",
    description: "Airway mastery is a standalone block with extensive lab practice; keeping a single focus clarifies priorities.",
    chapters: [11],
    estimatedHours: 8,
    isBonus: false
  },
  {
    id: 5,
    title: "Pharmacology for EMT-B",
    description: "Medication administration scope for EMT-B is concentrated into one detailed unit.",
    chapters: [12],
    estimatedHours: 4,
    isBonus: false
  },
  {
    id: 6,
    title: "Shock & Circulatory Management",
    description: "Shock physiology and BLS life support are paired because protocol updates overlap heavily.",
    chapters: [13, 14],
    estimatedHours: 6,
    isBonus: false
  },
  {
    id: 7,
    title: "Medical Emergency Response",
    description: "Respiratory and cardiovascular crises live together for systems-based review.",
    chapters: [15, 16, 17],
    estimatedHours: 9,
    isBonus: false
  },
  {
    id: 8,
    title: "Neurologic & Systemic Emergencies",
    description: "High-acuity neurologic, abdominal, metabolic, and hematologic conditions.",
    chapters: [18, 19, 20],
    estimatedHours: 9,
    isBonus: false
  },
  {
    id: 9,
    title: "Specialized Emergency Care",
    description: "Allergic, toxicological, behavioral, and gynecologic emergencies frequently taught as a specialty block.",
    chapters: [21, 22, 23, 24],
    estimatedHours: 8,
    isBonus: false
  },
  {
    id: 10,
    title: "Trauma Response Principles",
    description: "Trauma system fundamentals with hemorrhage and soft tissue management.",
    chapters: [25, 26, 27],
    estimatedHours: 6,
    isBonus: false
  },
  {
    id: 11,
    title: "Traumatic Injury Management",
    description: "Craniofacial, spinal, and thoracic trauma require contiguous emphasis.",
    chapters: [28, 29, 30],
    estimatedHours: 9,
    isBonus: false
  },
  {
    id: 12,
    title: "Environmental & Musculoskeletal Emergencies",
    description: "Environmental exposure paired with orthopedic and abdominal trauma follow-ups.",
    chapters: [31, 32, 33],
    estimatedHours: 6,
    isBonus: false
  },
  {
    id: 13,
    title: "Special Patient Populations",
    description: "Obstetric, neonatal, pediatric, geriatric, and special populations consolidated for comparative study.",
    chapters: [34, 35, 36, 37],
    estimatedHours: 8,
    isBonus: false
  },
  {
    id: 14,
    title: "EMS Operations & Disaster Response",
    description: "Operations, technical rescue, ICS, and MCI are operationally linked and typically taught consecutively.",
    chapters: [38, 39, 40, 41],
    estimatedHours: 8,
    isBonus: false
  },
  // Advanced Track: Extended physiology deep dives and cellular refreshers for accelerated cohorts
  {
    id: 15,
    title: "Advanced Track",
    description: "Chapters 42–45, Bonus anatomy series. Extended physiology deep dives and cellular refreshers for accelerated cohorts.",
    chapters: [42, 43, 44, 45],
    estimatedHours: 12,
    isBonus: true
  }
];

// All chapters with their basic information
export const chapters: Chapter[] = [
  // Module 1: Foundations of EMS Practice
  { id: 1, title: "EMS Systems", moduleId: 1, estimatedStudyTime: "2 hours", objectives: ["Describe the components of EMS systems", "Explain the roles of EMTs", "Understand quality improvement"] },
  { id: 2, title: "Legal and Ethical Issues", moduleId: 1, estimatedStudyTime: "2 hours", objectives: ["Understand legal responsibilities", "Apply ethical decision making", "Document patient care"] },
  { id: 3, title: "Communications", moduleId: 1, estimatedStudyTime: "2 hours", objectives: ["Use radio communications", "Document patient information", "Communicate with healthcare team"] },
  { id: 4, title: "Documentation", moduleId: 1, estimatedStudyTime: "2 hours", objectives: ["Complete PCR documentation", "Understand medico-legal aspects", "Maintain confidentiality"] },

  // Module 2: Clinical Foundations
  { id: 5, title: "Human Body Systems", moduleId: 2, estimatedStudyTime: "2 hours", objectives: ["Identify major body systems", "Understand anatomy and physiology", "Recognize system interactions"] },
  { id: 6, title: "Medical Terminology", moduleId: 2, estimatedStudyTime: "2 hours", objectives: ["Use medical terminology", "Understand word roots and prefixes", "Communicate effectively"] },
  { id: 7, title: "Pathophysiology Basics", moduleId: 2, estimatedStudyTime: "2 hours", objectives: ["Understand disease processes", "Recognize pathological changes", "Apply pathophysiological principles"] },
  { id: 8, title: "Life Span Development", moduleId: 2, estimatedStudyTime: "2 hours", objectives: ["Understand developmental stages", "Assess age-specific needs", "Adapt care for different ages"] },
  { id: 9, title: "Communication and Teamwork", moduleId: 2, estimatedStudyTime: "2 hours", objectives: ["Communicate with patients", "Work effectively in teams", "Manage stress and emotions"] },

  // Module 3: Patient Assessment Mastery
  { id: 10, title: "Patient Assessment", moduleId: 3, estimatedStudyTime: "6 hours", objectives: ["Perform scene size-up", "Conduct primary and secondary surveys", "Obtain vital signs and SAMPLE history"] },

  // Module 4: Airway & Ventilatory Management
  { id: 11, title: "Airway Management", moduleId: 4, estimatedStudyTime: "8 hours", objectives: ["Assess airway patency", "Perform basic airway maneuvers", "Provide oxygen therapy"] },

  // Module 5: Pharmacology for EMT-B
  { id: 12, title: "EMT-B Pharmacology", moduleId: 5, estimatedStudyTime: "4 hours", objectives: ["Understand medication administration", "Identify EMT-B medications", "Apply medication safety"] },

  // Module 6: Shock & Circulatory Management
  { id: 13, title: "Shock Recognition", moduleId: 6, estimatedStudyTime: "3 hours", objectives: ["Identify shock types", "Recognize shock signs", "Initiate shock management"] },
  { id: 14, title: "Circulatory Support", moduleId: 6, estimatedStudyTime: "3 hours", objectives: ["Perform CPR", "Use AED", "Provide basic circulatory support"] },

  // Module 7: Medical Emergency Response
  { id: 15, title: "Respiratory Emergencies", moduleId: 7, estimatedStudyTime: "3 hours", objectives: ["Assess respiratory distress", "Provide oxygen therapy", "Manage asthma and COPD"] },
  { id: 16, title: "Cardiovascular Emergencies", moduleId: 7, estimatedStudyTime: "3 hours", objectives: ["Recognize cardiac emergencies", "Manage chest pain", "Treat cardiac arrest"] },
  { id: 17, title: "Diabetes and Allergic Reactions", moduleId: 7, estimatedStudyTime: "3 hours", objectives: ["Manage diabetic emergencies", "Treat anaphylaxis", "Administer epinephrine"] },

  // Module 8: Neurologic & Systemic Emergencies
  { id: 18, title: "Stroke and Seizures", moduleId: 8, estimatedStudyTime: "3 hours", objectives: ["Assess stroke signs", "Manage seizures", "Perform Cincinnati Stroke Scale"] },
  { id: 19, title: "Infectious Diseases", moduleId: 8, estimatedStudyTime: "3 hours", objectives: ["Recognize infectious diseases", "Apply infection control", "Manage febrile patients"] },
  { id: 20, title: "Toxicological Emergencies", moduleId: 8, estimatedStudyTime: "3 hours", objectives: ["Assess toxic exposures", "Provide basic decontamination", "Contact poison control"] },

  // Module 9: Specialized Emergency Care
  { id: 21, title: "Behavioral Emergencies", moduleId: 9, estimatedStudyTime: "2 hours", objectives: ["Assess behavioral crises", "Apply de-escalation", "Ensure safety"] },
  { id: 22, title: "Gynecological Emergencies", moduleId: 9, estimatedStudyTime: "2 hours", objectives: ["Manage vaginal bleeding", "Assess pregnancy complications", "Provide emotional support"] },
  { id: 23, title: "Environmental Emergencies", moduleId: 9, estimatedStudyTime: "2 hours", objectives: ["Treat heat and cold injuries", "Manage submersion incidents", "Prevent further injury"] },
  { id: 24, title: "Submersion Incidents", moduleId: 9, estimatedStudyTime: "2 hours", objectives: ["Assess drowning victims", "Provide rescue breathing", "Monitor for complications"] },

  // Module 10: Trauma Response Principles
  { id: 25, title: "Trauma Systems", moduleId: 10, estimatedStudyTime: "2 hours", objectives: ["Understand trauma systems", "Apply trauma triage", "Recognize trauma patterns"] },
  { id: 26, title: "Hemorrhage Control", moduleId: 10, estimatedStudyTime: "2 hours", objectives: ["Control external bleeding", "Apply tourniquets", "Manage shock"] },
  { id: 27, title: "Soft Tissue Injuries", moduleId: 10, estimatedStudyTime: "2 hours", objectives: ["Assess wounds and burns", "Apply dressings", "Prevent infection"] },

  // Module 11: Traumatic Injury Management
  { id: 28, title: "Head and Spinal Trauma", moduleId: 11, estimatedStudyTime: "3 hours", objectives: ["Assess head injuries", "Manage spinal precautions", "Recognize increased ICP"] },
  { id: 29, title: "Thoracic and Abdominal Trauma", moduleId: 11, estimatedStudyTime: "3 hours", objectives: ["Assess chest injuries", "Manage abdominal trauma", "Recognize internal bleeding"] },
  { id: 30, title: "Musculoskeletal Trauma", moduleId: 11, estimatedStudyTime: "3 hours", objectives: ["Assess fractures", "Apply splinting", "Manage dislocations"] },

  // Module 12: Environmental & Musculoskeletal Emergencies
  { id: 31, title: "Cold Injuries", moduleId: 12, estimatedStudyTime: "2 hours", objectives: ["Treat hypothermia", "Manage frostbite", "Prevent cold injuries"] },
  { id: 32, title: "Heat Injuries", moduleId: 12, estimatedStudyTime: "2 hours", objectives: ["Treat heat exhaustion", "Manage heat stroke", "Prevent heat injuries"] },
  { id: 33, title: "Orthopedic Injuries", moduleId: 12, estimatedStudyTime: "2 hours", objectives: ["Assess joint injuries", "Apply splinting", "Manage pain"] },

  // Module 13: Special Patient Populations
  { id: 34, title: "Pediatric Patients", moduleId: 13, estimatedStudyTime: "2 hours", objectives: ["Assess pediatric patients", "Adapt equipment and techniques", "Recognize pediatric emergencies"] },
  { id: 35, title: "Geriatric Patients", moduleId: 13, estimatedStudyTime: "2 hours", objectives: ["Assess geriatric patients", "Understand age-related changes", "Adapt communication"] },
  { id: 36, title: "Patients with Special Needs", moduleId: 13, estimatedStudyTime: "2 hours", objectives: ["Assess special needs patients", "Use adaptive equipment", "Communicate effectively"] },
  { id: 37, title: "Obstetric Patients", moduleId: 13, estimatedStudyTime: "2 hours", objectives: ["Assess pregnant patients", "Manage normal delivery", "Recognize complications"] },

  // Module 14: EMS Operations & Disaster Response
  { id: 38, title: "Ambulance Operations", moduleId: 14, estimatedStudyTime: "2 hours", objectives: ["Operate ambulance safely", "Perform loading/unloading", "Maintain vehicle systems"] },
  { id: 39, title: "Multiple Casualty Incidents", moduleId: 14, estimatedStudyTime: "2 hours", objectives: ["Apply MCI triage", "Manage resources", "Coordinate with other agencies"] },
  { id: 40, title: "Disaster Response", moduleId: 14, estimatedStudyTime: "2 hours", objectives: ["Respond to disasters", "Apply ICS principles", "Provide mass casualty care"] },
  { id: 41, title: "Advanced Topics", moduleId: 14, estimatedStudyTime: "2 hours", objectives: ["Understand emerging issues", "Apply critical thinking", "Prepare for certification"] },

  // Bonus Module (Advanced Clinical Deep Dives) - Beyond EMT-B scope in some areas
  { id: 42, title: "Advanced Pharmacology Concepts", moduleId: 15, estimatedStudyTime: "2 hours", objectives: ["Understand medication interactions", "Advanced drug calculations", "Pharmacokinetics basics"] },
  { id: 43, title: "Advanced Patient Assessment", moduleId: 15, estimatedStudyTime: "2 hours", objectives: ["Detailed physical exam techniques", "ECG interpretation basics", "Lab value interpretation"] },
  { id: 44, title: "Advanced Cardiac Life Support Integration", moduleId: 15, estimatedStudyTime: "2 hours", objectives: ["Integrate EMT with ACLS care", "Understand advanced interventions", "Coordinate with advanced providers"] },
  { id: 45, title: "Complex Medical Case Studies", moduleId: 15, estimatedStudyTime: "2 hours", objectives: ["Analyze complex cases", "Apply critical thinking", "Develop treatment plans"] }
];

// Helper functions
export const getChaptersByModule = (moduleId: number): Chapter[] => {
  return chapters.filter(chapter => chapter.moduleId === moduleId);
};

export const getModuleById = (moduleId: number): StudyModule | undefined => {
  return studyModules.find(module => module.id === moduleId);
};

export const getChapterById = (chapterId: number): Chapter | undefined => {
  return chapters.find(chapter => chapter.id === chapterId);
};

export const getTotalChapters = (): number => chapters.length;

export const getBonusModules = (): StudyModule[] => {
  return studyModules.filter(module => module.isBonus);
};

export const getCoreModules = (): StudyModule[] => {
  return studyModules.filter(module => !module.isBonus);
};