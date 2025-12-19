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
export const studyModules: StudyModule[] = [
  // Bonus Module: Advanced Clinical Deep Dives
  {
    id: 11,
    title: "Advanced Clinical Deep Dives",
    description: "Extended clinical scenarios, advanced case studies, and professional development topics",
    chapters: [42, 43, 44, 45],
    estimatedHours: 8,
    isBonus: true
  }
];

// All bonus chapters with their basic information
export const chapters: Chapter[] = [
  // Bonus Module (Advanced Clinical Deep Dives)
  { id: 42, title: "Advanced Cardiac Life Support Integration", moduleId: 11, estimatedStudyTime: "2 hours", objectives: ["Integrate EMT with ACLS care", "Understand advanced interventions", "Coordinate with advanced providers"] },
  { id: 43, title: "Complex Medical Case Studies", moduleId: 11, estimatedStudyTime: "2 hours", objectives: ["Analyze complex cases", "Apply critical thinking", "Develop treatment plans"] },
  { id: 44, title: "Professional Development and Leadership", moduleId: 11, estimatedStudyTime: "2 hours", objectives: ["Develop leadership skills", "Engage in lifelong learning", "Contribute to profession"] },
  { id: 45, title: "EMS Research and Evidence-Based Practice", moduleId: 11, estimatedStudyTime: "2 hours", objectives: ["Understand research principles", "Apply evidence-based practice", "Contribute to EMS improvement"] }
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