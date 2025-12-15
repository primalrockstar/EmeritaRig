// THE RIG - EMT-B Field Manual Curriculum Structure
// AAOS 12th Edition Aligned - Tactical Study Companion

export const CURRICULUM_MODULES = [
  {
    id: "mod-1",
    title: "Foundations of EMS",
    aaos_alignment: "Chapters 1-4",
    description: "EMS system fundamentals, safety protocols, legal frameworks, and communication systems that form the backbone of emergency medical operations.",
    chapters: [
      { id: "ch-1", title: "EMS System Fundamentals", aaos_chapter: 1 },
      { id: "ch-2", title: "Safety & Wellness", aaos_chapter: 2 },
      { id: "ch-3", title: "Legal & Ethical Issues", aaos_chapter: 3 },
      { id: "ch-4", title: "Communications", aaos_chapter: 4 }
    ]
  },
  {
    id: "mod-2",
    title: "Clinical Foundations",
    aaos_alignment: "Chapters 5-9",
    description: "Essential medical terminology, human anatomy, developmental stages, patient movement techniques, and team-based emergency response coordination.",
    chapters: [
      { id: "ch-5", title: "Medical Terminology", aaos_chapter: 5 },
      { id: "ch-6", title: "Anatomy & Physiology", aaos_chapter: 6 },
      { id: "ch-7", title: "Life Span Development", aaos_chapter: 7 },
      { id: "ch-8", title: "Patient Movement", aaos_chapter: 8 },
      { id: "ch-9", title: "Team Response", aaos_chapter: 9 }
    ]
  },
  {
    id: "mod-3",
    title: "Patient Assessment",
    aaos_alignment: "Chapters 10-11",
    description: "Systematic patient evaluation techniques and airway management protocols critical for rapid assessment and intervention in emergency situations.",
    chapters: [
      { id: "ch-10", title: "Patient Evaluation", aaos_chapter: 10 },
      { id: "ch-11", title: "Airway Management", aaos_chapter: 11 }
    ]
  },
  {
    id: "mod-4",
    title: "Pharmacology & Shock",
    aaos_alignment: "Chapters 12-14",
    description: "Medication administration protocols, shock recognition and management, and basic life support interventions within EMT-B scope of practice.",
    chapters: [
      { id: "ch-12", title: "Medication Standards", aaos_chapter: 12 },
      { id: "ch-13", title: "Shock Management", aaos_chapter: 13 },
      { id: "ch-14", title: "BLS Overview", aaos_chapter: 14 }
    ]
  },
  {
    id: "mod-5",
    title: "Medical I",
    aaos_alignment: "Chapters 15-19",
    description: "Primary medical emergencies including respiratory distress, cardiovascular conditions, neurological assessments, endocrine disorders, and abdominal complaints.",
    chapters: [
      { id: "ch-15", title: "Respiratory Emergencies", aaos_chapter: 15 },
      { id: "ch-16", title: "Cardiovascular Emergencies", aaos_chapter: 16 },
      { id: "ch-17", title: "Neurological Emergencies", aaos_chapter: 17 },
      { id: "ch-18", title: "Endocrine Emergencies", aaos_chapter: 18 },
      { id: "ch-19", title: "Abdominal Emergencies", aaos_chapter: 19 }
    ]
  },
  {
    id: "mod-6",
    title: "Medical II",
    aaos_alignment: "Chapters 20-24",
    description: "Advanced medical conditions including hematological disorders, allergic reactions, toxicological emergencies, psychiatric crises, and gynecological issues.",
    chapters: [
      { id: "ch-20", title: "Hematological Disorders", aaos_chapter: 20 },
      { id: "ch-21", title: "Allergic Reactions", aaos_chapter: 21 },
      { id: "ch-22", title: "Toxicological Emergencies", aaos_chapter: 22 },
      { id: "ch-23", title: "Psychiatric Emergencies", aaos_chapter: 23 },
      { id: "ch-24", title: "Gynecological Emergencies", aaos_chapter: 24 }
    ]
  },
  {
    id: "mod-7",
    title: "Trauma I",
    aaos_alignment: "Chapters 25-29",
    description: "Traumatic injury assessment and management including multisystem trauma, hemorrhage control, soft tissue injuries, facial trauma, and spinal immobilization.",
    chapters: [
      { id: "ch-25", title: "Multisystem Trauma", aaos_chapter: 25 },
      { id: "ch-26", title: "Hemorrhage Control", aaos_chapter: 26 },
      { id: "ch-27", title: "Soft Tissue Injuries", aaos_chapter: 27 },
      { id: "ch-28", title: "Facial Trauma", aaos_chapter: 28 },
      { id: "ch-29", title: "Spinal Trauma", aaos_chapter: 29 }
    ]
  },
  {
    id: "mod-8",
    title: "Trauma II",
    aaos_alignment: "Chapters 30-33",
    description: "Advanced traumatic conditions including thoracic injuries, abdominal/genitourinary trauma, orthopedic emergencies, and environmental trauma considerations.",
    chapters: [
      { id: "ch-30", title: "Thoracic Trauma", aaos_chapter: 30 },
      { id: "ch-31", title: "Abdominal & Genitourinary Trauma", aaos_chapter: 31 },
      { id: "ch-32", title: "Orthopedic Trauma", aaos_chapter: 32 },
      { id: "ch-33", title: "Environmental Trauma", aaos_chapter: 33 }
    ]
  },
  {
    id: "mod-9",
    title: "Special Populations",
    aaos_alignment: "Chapters 34-37",
    description: "Special considerations for obstetrical patients, pediatric emergencies, geriatric care, and patients with special needs requiring adapted assessment and treatment.",
    chapters: [
      { id: "ch-34", title: "Obstetrical Emergencies", aaos_chapter: 34 },
      { id: "ch-35", title: "Pediatric Emergencies", aaos_chapter: 35 },
      { id: "ch-36", title: "Geriatric Emergencies", aaos_chapter: 36 },
      { id: "ch-37", title: "Special Needs Patients", aaos_chapter: 37 }
    ]
  },
  {
    id: "mod-10",
    title: "Operations",
    aaos_alignment: "Chapters 38-41",
    description: "Emergency operations including patient transportation, rescue techniques, incident command systems, and mass casualty incident management protocols.",
    chapters: [
      { id: "ch-38", title: "Patient Transportation", aaos_chapter: 38 },
      { id: "ch-39", title: "Rescue Operations", aaos_chapter: 39 },
      { id: "ch-40", title: "Incident Command", aaos_chapter: 40 },
      { id: "ch-41", title: "Mass Casualty Incidents", aaos_chapter: 41 }
    ]
  },
  {
    id: "mod-11",
    title: "Advanced Deep Dives",
    aaos_alignment: "Beyond EMT-B Scope",
    description: "Advanced content exceeding standard EMT-B curriculum - for comprehensive understanding and NREMT preparation. CONTENT EXCEEDS EMT-B SCOPE.",
    isBonus: true,
    chapters: [
      { id: "ch-42", title: "Advanced Cardiology", aaos_chapter: null },
      { id: "ch-43", title: "Advanced Respiratory", aaos_chapter: null },
      { id: "ch-44", title: "Advanced Neurology", aaos_chapter: null },
      { id: "ch-45", title: "Advanced Endocrinology", aaos_chapter: null }
    ]
  },
  {
    id: "mod-12",
    title: "Body Systems Primer",
    aaos_alignment: "Foundational Anatomy",
    description: "Fundamental anatomy and physiology primer covering cellular structure through major organ systems. Educational foundation content.",
    isBonus: true,
    chapters: [
      { id: "topic-1", title: "Cells & Tissues", aaos_chapter: null },
      { id: "topic-2", title: "Skeletal System", aaos_chapter: null },
      { id: "topic-3", title: "Muscular System", aaos_chapter: null },
      { id: "topic-4", title: "Cardiovascular System", aaos_chapter: null },
      { id: "topic-5", title: "Respiratory System", aaos_chapter: null },
      { id: "topic-6", title: "Nervous System", aaos_chapter: null },
      { id: "topic-7", title: "Endocrine System", aaos_chapter: null },
      { id: "topic-8", title: "Digestive System", aaos_chapter: null },
      { id: "topic-9", title: "Urinary System", aaos_chapter: null }
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