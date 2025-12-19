// NREMT Content Domain Mapping for EMT-B Chapters
// Exact weightings to match official NREMT specifications

export const NREMT_CONTENT_DISTRIBUTION = {
  'Scene Size-up and Safety': { min: 15, max: 19, target: 17 }, // 17%
  'Primary Assessment': { min: 39, max: 43, target: 41 }, // 41%
  'Secondary Assessment': { min: 5, max: 9, target: 7 }, // 7%
  'Patient Treatment and Transport': { min: 20, max: 24, target: 22 }, // 22%
  'Operations': { min: 10, max: 14, target: 12 } // 12%
};

// Map chapters to NREMT content domains (sequential numbering)
export const chapterToContentDomain: Record<number, string> = {
  // Module 1: Preparatory (Chapters 1-4)
  1: 'Scene Size-up and Safety', // EMS Systems, Safety, Legal
  2: 'Scene Size-up and Safety', // Safety, PPE, Scene Assessment
  3: 'Operations', // Legal, Consent, Documentation
  4: 'Operations', // Communication, Medical Control

  // Module 2: Anatomy & Physiology (Chapters 5-9)
  5: 'Primary Assessment', // Medical Terminology, Body Systems
  6: 'Primary Assessment', // Body Planes, Cavities, Systems
  7: 'Primary Assessment', // Respiratory System
  8: 'Primary Assessment', // Cardiovascular System
  9: 'Primary Assessment', // Pediatric/Geriatric Anatomy

  // Module 3: Pathophysiology (Chapters 10-14)
  10: 'Secondary Assessment', // Disease Processes
  11: 'Patient Treatment and Transport', // Pharmacology Basics
  12: 'Patient Treatment and Transport', // Medication Administration
  13: 'Primary Assessment', // Pathophysiology Integration
  14: 'Secondary Assessment', // Assessment Integration

  // Module 4: Life Span Development (Chapters 15-19)
  15: 'Primary Assessment', // Human Development
  16: 'Primary Assessment', // Pediatric Considerations
  17: 'Primary Assessment', // Geriatric Considerations
  18: 'Primary Assessment', // Developmental Variations
  19: 'Secondary Assessment', // Age-Related Assessment

  // Module 5: Airway Management (Chapters 20-24)
  20: 'Primary Assessment', // Airway Assessment
  21: 'Patient Treatment and Transport', // Basic Airway Management
  22: 'Patient Treatment and Transport', // Advanced Airway (ALS only)
  23: 'Patient Treatment and Transport', // Ventilation Support
  24: 'Primary Assessment', // Airway Integration

  // Module 6: Patient Assessment (Chapters 25-29)
  25: 'Scene Size-up and Safety', // Scene Size-up
  26: 'Primary Assessment', // Primary Assessment
  27: 'Secondary Assessment', // Secondary Assessment
  28: 'Secondary Assessment', // Patient History
  29: 'Secondary Assessment', // Physical Exam

  // Module 7: Medical Emergencies (Chapters 30-34)
  30: 'Primary Assessment', // Respiratory Emergencies
  31: 'Primary Assessment', // Cardiovascular Emergencies
  32: 'Primary Assessment', // Neurological Emergencies
  33: 'Patient Treatment and Transport', // Endocrine Emergencies
  34: 'Patient Treatment and Transport', // Medical Emergency Treatment

  // Module 8: Trauma Emergencies (Chapters 35-39)
  35: 'Scene Size-up and Safety', // Trauma Scene Assessment
  36: 'Primary Assessment', // Trauma Primary Assessment
  37: 'Patient Treatment and Transport', // Bleeding Control
  38: 'Patient Treatment and Transport', // Trauma Treatment
  39: 'Patient Treatment and Transport', // Trauma Transport

  // Module 9: Special Populations (Chapters 40-44) - Adjusted for 41 chapters total
  40: 'Primary Assessment', // Pediatric Emergencies
  41: 'Primary Assessment', // Geriatric Emergencies
  42: 'Primary Assessment', // Special Patient Types
  43: 'Patient Treatment and Transport', // Special Population Treatment
  44: 'Operations', // Special Population Operations

  // Module 10: EMS Operations (Chapters 45-49) - Adjusted for 41 chapters total
  45: 'Operations', // System Operations
  46: 'Operations', // Quality Improvement
  47: 'Operations', // Incident Command
  48: 'Operations', // Public Health
  49: 'Operations', // Professional Development
};

// Helper function to get domain distribution for question generation
export const getDomainQuestionCount = (totalQuestions: number = 120): Record<string, number> => {
  const distribution: Record<string, number> = {};

  for (const [domain, config] of Object.entries(NREMT_CONTENT_DISTRIBUTION)) {
    distribution[domain] = Math.round((config.target / 100) * totalQuestions);
  }

  return distribution;
};

// Helper function to get eligible chapters for a domain
export const getChaptersForDomain = (domain: string): number[] => {
  return Object.entries(chapterToContentDomain)
    .filter(([_, chapterDomain]) => chapterDomain === domain)
    .map(([chapter]) => parseInt(chapter));
};

// Calculate actual distribution achieved (for validation)
export const calculateActualDistribution = (): Record<string, number> => {
  const distribution: Record<string, number> = {
    'Scene Size-up and Safety': 0,
    'Primary Assessment': 0,
    'Secondary Assessment': 0,
    'Patient Treatment and Transport': 0,
    'Operations': 0
  };

  for (const domain of Object.values(chapterToContentDomain)) {
    distribution[domain]++;
  }

  const total = Object.values(distribution).reduce((a, b) => a + b, 0);

  // Convert to percentages
  for (const domain of Object.keys(distribution)) {
    distribution[domain] = Math.round((distribution[domain] / total) * 100);
  }

  return distribution;
};