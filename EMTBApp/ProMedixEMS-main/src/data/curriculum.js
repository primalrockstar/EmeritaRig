// THE RIG - EMT-B Field Manual Curriculum Structure
// AAOS 12th Edition Aligned - Tactical Study Companion

export const CURRICULUM_MODULES = [
  {
    id: "mod-1",
    title: "Foundations of EMS",
    description: "EMS system fundamentals, safety protocols, legal frameworks, and communication systems that form the backbone of emergency medical operations.",
    chapters: [
      { id: "ch-1", title: "EMS System Fundamentals" },
      { id: "ch-2", title: "Safety & Wellness" },
      { id: "ch-3", title: "Legal & Ethical Issues" },
      { id: "ch-4", title: "Communications" }
    ]
  },
  {
    id: "mod-2",
    title: "Clinical Foundations",
    description: "Essential medical terminology, human anatomy, developmental stages, patient movement techniques, and team-based emergency response coordination.",
    chapters: [
      { id: "ch-5", title: "Medical Terminology" },
      { id: "ch-6", title: "Anatomy & Physiology" },
      { id: "ch-7", title: "Life Span Development" },
      { id: "ch-8", title: "Patient Movement" },
      { id: "ch-9", title: "Team Response" }
    ]
  },
  {
    id: "mod-3",
    title: "Patient Assessment",
    description: "Systematic patient evaluation techniques and airway management protocols critical for rapid assessment and intervention in emergency situations.",
    chapters: [
      { id: "ch-10", title: "Patient Evaluation" },
      { id: "ch-11", title: "Airway Management" }
    ]
  },
  {
    id: "mod-4",
    title: "Pharmacology & Shock",
    description: "Medication administration protocols, shock recognition and management, and basic life support interventions within EMT-B scope of practice.",
    chapters: [
      { id: "ch-12", title: "Medication Standards" },
      { id: "ch-13", title: "Shock Management" },
      { id: "ch-14", title: "BLS Overview" }
    ]
  },
  {
    id: "mod-5",
    title: "Medical I",
    description: "Primary medical emergencies including respiratory distress, cardiovascular conditions, neurological assessments, endocrine disorders, and abdominal complaints.",
    chapters: [
      { id: "ch-15", title: "Respiratory Emergencies" },
      { id: "ch-16", title: "Cardiovascular Emergencies" },
      { id: "ch-17", title: "Neurological Emergencies" },
      { id: "ch-18", title: "Endocrine Emergencies" },
      { id: "ch-19", title: "Abdominal Emergencies" }
    ]
  },
  {
    id: "mod-6",
    title: "Medical II",
    description: "Advanced medical conditions including hematological disorders, allergic reactions, toxicological emergencies, psychiatric crises, and gynecological issues.",
    chapters: [
      { id: "ch-20", title: "Hematological Disorders" },
      { id: "ch-21", title: "Allergic Reactions" },
      { id: "ch-22", title: "Toxicological Emergencies" },
      { id: "ch-23", title: "Psychiatric Emergencies" },
      { id: "ch-24", title: "Gynecological Emergencies" }
    ]
  },
  {
    id: "mod-7",
    title: "Trauma I",
    description: "Traumatic injury assessment and management including multisystem trauma, hemorrhage control, soft tissue injuries, facial trauma, and spinal immobilization.",
    chapters: [
      { id: "ch-25", title: "Multisystem Trauma" },
      { id: "ch-26", title: "Hemorrhage Control" },
      { id: "ch-27", title: "Soft Tissue Injuries" },
      { id: "ch-28", title: "Facial Trauma" },
      { id: "ch-29", title: "Spinal Trauma" }
    ]
  },
  {
    id: "mod-8",
    title: "Trauma II",
    description: "Advanced traumatic conditions including thoracic injuries, abdominal/genitourinary trauma, orthopedic emergencies, and environmental trauma considerations.",
    chapters: [
      { id: "ch-30", title: "Thoracic Trauma" },
      { id: "ch-31", title: "Abdominal & Genitourinary Trauma" },
      { id: "ch-32", title: "Orthopedic Trauma" },
      { id: "ch-33", title: "Environmental Trauma" }
    ]
  },
  {
    id: "mod-9",
    title: "Special Populations",
    description: "Special considerations for obstetrical patients, pediatric emergencies, geriatric care, and patients with special needs requiring adapted assessment and treatment.",
    chapters: [
      { id: "ch-34", title: "Obstetrical Emergencies" },
      { id: "ch-35", title: "Pediatric Emergencies" },
      { id: "ch-36", title: "Geriatric Emergencies" },
      { id: "ch-37", title: "Special Needs Patients" }
    ]
  },
  {
    id: "mod-10",
    title: "Operations",
    description: "Emergency operations including patient transportation, rescue techniques, incident command systems, and mass casualty incident management protocols.",
    chapters: [
      { id: "ch-38", title: "Patient Transportation" },
      { id: "ch-39", title: "Rescue Operations" },
      { id: "ch-40", title: "Incident Command" },
      { id: "ch-41", title: "Mass Casualty Incidents" }
    ]
  },
  {
    id: "mod-11",
    title: "Advanced Deep Dives",
    description: "Advanced content exceeding standard EMT-B curriculum - for comprehensive understanding and NREMT preparation. CONTENT EXCEEDS EMT-B SCOPE.",
    isBonus: true,
    chapters: [
      { id: "ch-42", title: "Advanced Cardiology" },
      { id: "ch-43", title: "Advanced Respiratory" },
      { id: "ch-44", title: "Advanced Neurology" },
      { id: "ch-45", title: "Advanced Endocrinology" }
    ]
  },
  {
    id: "mod-12",
    title: "Body Systems Primer",
    description: "Fundamental anatomy and physiology primer covering cellular structure through major organ systems. Educational foundation content.",
    isBonus: true,
    chapters: [
      { id: "topic-1", title: "Cells & Tissues" },
      { id: "topic-2", title: "Skeletal System" },
      { id: "topic-3", title: "Muscular System" },
      { id: "topic-4", title: "Cardiovascular System" },
      { id: "topic-5", title: "Respiratory System" },
      { id: "topic-6", title: "Nervous System" },
      { id: "topic-7", title: "Endocrine System" },
      { id: "topic-8", title: "Digestive System" },
      { id: "topic-9", title: "Urinary System" }
    ]
  }
];

// Helper functions for curriculum navigation
export const getModuleById = (moduleId) => {
  return CURRICULUM_MODULES.find(module => module.id === moduleId);
};

export const getChapterById = (chapterId) => {
  for (const module of CURRICULUM_MODULES) {
    const chapter = module.chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      return { chapter, module };
    }
  }
  return null;
};

export const getAllChapters = () => {
  return CURRICULUM_MODULES.flatMap(module =>
    module.chapters.map(chapter => ({
      ...chapter,
      moduleId: module.id,
      moduleTitle: module.title,
      isBonus: module.isBonus || false
    }))
  );
};

export const getRegularModules = () => {
  return CURRICULUM_MODULES.filter(module => !module.isBonus);
};

export const getBonusModules = () => {
  return CURRICULUM_MODULES.filter(module => module.isBonus);
};

// Compatibility exports for textAnalysis.ts
export const chapters = getAllChapters();
export const studyModules = CURRICULUM_MODULES;