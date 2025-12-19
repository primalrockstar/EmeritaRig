export interface QuizQuestion {
  id: string;
  module: number;
  chapter: number;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  points: number;
  category: Difficulty;
  nremtDomain?: string;
}

export interface QuizModule {
  module: number;
  title: string;
  description: string;
  chapters: number[];
  focusAreas: string[];
  keySkills: string[];
  difficultyMix: Record<Difficulty, number>;
  timeLimit?: number;
  questions?: QuizQuestion[];
  passingScore?: number;
}

const QUESTIONS_PER_CHAPTER = 10;
const TOTAL_CHAPTERS = 45;
const TOTAL_MODULES = 15;

const chapterTitleMap = {
  1: 'Introduction to EMS Systems',
  2: 'The Emergency Medical Responder',
  3: 'The Emergency Medical Technician',
  4: 'EMS System Communication and Documentation',
  5: 'Medical Terminology and Anatomy Overview',
  6: 'Medical-Legal Issues and Ethics',
  7: 'Infection Control and Workforce Safety',
  8: 'Lifting, Moving, and Transporting Patients',
  9: 'Patient Assessment Fundamentals',
  10: 'Airway Management and Respiration',
  11: 'Circulation and Shock',
  12: 'Respiratory Emergencies',
  13: 'Cardiac Emergencies',
  14: 'Neurologic Emergencies',
  15: 'Endocrine and Hematologic Emergencies',
  16: 'Allergic Reactions and Anaphylaxis',
  17: 'Immune System Disorders',
  18: 'Gastrointestinal Emergencies',
  19: 'Genitourinary Emergencies',
  20: 'Toxicology and Substance Abuse',
  21: 'Environmental Emergencies',
  22: 'Infectious Diseases and Travel Medicine',
  23: 'Behavioral and Psychiatric Emergencies',
  24: 'Obstetrics and Gynecology',
  25: 'Neonatal Care and Pediatrics',
  26: 'Pediatric Emergencies and Special Considerations',
  27: 'Geriatric Emergencies',
  28: 'Special Needs and Disability Care',
  29: 'Trauma Systems and Operations',
  30: 'Soft Tissue Injuries and Wound Care',
  31: 'Musculoskeletal Trauma',
  32: 'Head, Neck, and Spine Trauma',
  33: 'Chest and Abdominal Trauma',
  34: 'Burns and Thermal Injuries',
  35: 'Shock, Resuscitation, and Critical Care',
  36: 'Mass-Casualty Incidents and Triage',
  37: 'Hazardous Materials and Rescue Operations',
  38: 'Terrorism Response and Disaster Management',
  39: 'Vehicle Extrication and Special Operations',
  40: 'EMS Quality Improvement and Evidence-Based Practice',
  41: 'Wellness, Resilience, and Professional Development',
  42: 'Advanced Cardiovascular Anatomy and Physiology',
  43: 'Advanced Respiratory Physiology and Assessment',
  44: 'Advanced Neurologic Integration for Field Care',
  45: 'Advanced Endocrine and Metabolic Systems Review'
} as const;

type ChapterNumber = keyof typeof chapterTitleMap;
type Difficulty = 'knowledge' | 'application' | 'analysis';

interface ModuleDefinition {
  module: number;
  title: string;
  description: string;
  chapters: number[];
  focusAreas: string[];
  keySkills: string[];
  domain: 'clinical' | 'operations' | 'special populations' | 'critical care';
  difficultyMix: Record<Difficulty, number>;
}

const moduleDefinitions: ModuleDefinition[] = [
  {
    module: 1,
    title: 'EMS Foundations and Professional Practice',
    description: 'Core concepts of EMS systems, provider roles, communication, documentation, and professional standards.',
    chapters: [1, 2, 3, 4, 40, 41],
    focusAreas: ['systems', 'professionalism', 'communication', 'documentation'],
    keySkills: ['role recognition', 'system navigation', 'scenario documentation'],
    domain: 'operations',
    difficultyMix: { knowledge: 16, application: 10, analysis: 4 }
  },
  {
    module: 2,
    title: 'Foundational Anatomy, Legal, and Safety',
    description: 'Medical terminology, anatomy fundamentals, legal considerations, infection control, and workforce safety.',
    chapters: [5, 6, 7, 8],
    focusAreas: ['anatomy basics', 'legal frameworks', 'safety', 'infection control'],
    keySkills: ['terminology fluency', 'legal decision-making', 'PPE protocol'],
    domain: 'clinical',
    difficultyMix: { knowledge: 14, application: 12, analysis: 4 }
  },
  {
    module: 3,
    title: 'Patient Assessment and Airway Mastery',
    description: 'Comprehensive assessment techniques, vital signs, airway management, and respiratory foundations.',
    chapters: [9, 10, 11],
    focusAreas: ['assessment flow', 'airway', 'respiration', 'circulation'],
    keySkills: ['primary survey', 'airway adjuncts', 'shock recognition'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 14, analysis: 4 }
  },
  {
    module: 4,
    title: 'Medical Emergencies: Respiratory and Cardiac',
    description: 'Recognition and management of respiratory and cardiac emergencies in prehospital settings.',
    chapters: [12, 13],
    focusAreas: ['asthma', 'COPD', 'CHF', 'ACS'],
    keySkills: ['auscultation', 'oxygen titration', 'cardiac pharmacology'],
    domain: 'clinical',
    difficultyMix: { knowledge: 10, application: 16, analysis: 4 }
  },
  {
    module: 5,
    title: 'Medical Emergencies: Neurologic to Immunologic',
    description: 'Neurologic, endocrine, hematologic, allergic, and immune system emergencies with EMT-level interventions.',
    chapters: [14, 15, 16, 17],
    focusAreas: ['stroke', 'diabetes', 'anaphylaxis', 'immune compromise'],
    keySkills: ['neuro assessment', 'glucose management', 'Epi administration'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 14, analysis: 4 }
  },
  {
    module: 6,
    title: 'Medical Emergencies: GI, GU, and Toxicology',
    description: 'Assessment and management of gastrointestinal, genitourinary, and toxicologic emergencies.',
    chapters: [18, 19, 20],
    focusAreas: ['abdominal pain', 'renal emergencies', 'overdose'],
    keySkills: ['focused exam', 'poison control coordination', 'decontamination'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 12, analysis: 6 }
  },
  {
    module: 7,
    title: 'Environmental and Infectious Emergencies',
    description: 'Environmental exposures, infectious disease response, and travel medicine considerations.',
    chapters: [21, 22],
    focusAreas: ['temperature extremes', 'drowning', 'vector-borne illness'],
    keySkills: ['environmental assessment', 'CDC coordination', 'infection control'],
    domain: 'clinical',
    difficultyMix: { knowledge: 14, application: 12, analysis: 4 }
  },
  {
    module: 8,
    title: 'Behavioral Health and Crisis Response',
    description: 'Assessment and management of behavioral, psychiatric, and crisis situations in the field.',
    chapters: [23],
    focusAreas: ['de-escalation', 'behavioral emergencies', 'mental health'],
    keySkills: ['verbal de-escalation', 'risk assessment', 'patient advocacy'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 12, analysis: 6 }
  },
  {
    module: 9,
    title: 'Obstetrics, Gynecology, and Neonatal Care',
    description: 'Assessment and management of obstetric, gynecologic, and neonatal emergencies with EMT scope.',
    chapters: [24, 25],
    focusAreas: ['labor assessment', 'postpartum complications', 'newborn care'],
    keySkills: ['APGAR scoring', 'neonatal resuscitation', 'obstetric emergencies'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 14, analysis: 4 }
  },
  {
    module: 10,
    title: 'Pediatric and Special Population Care',
    description: 'Pediatric emergencies, special needs patients, and geriatric considerations.',
    chapters: [26, 27, 28],
    focusAreas: ['pediatric assessment triangle', 'geriatrics', 'developmental disabilities'],
    keySkills: ['age-adjusted vitals', 'family-centered care', 'resource coordination'],
    domain: 'special populations',
    difficultyMix: { knowledge: 12, application: 12, analysis: 6 }
  },
  {
    module: 11,
    title: 'Trauma Systems and Soft Tissue Care',
    description: 'Trauma system operations, triage, soft tissue injuries, and bleeding control.',
    chapters: [29, 30],
    focusAreas: ['trauma triage', 'bleeding control', 'wound management'],
    keySkills: ['tourniquet use', 'hemostatic agents', 'field triage'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 14, analysis: 4 }
  },
  {
    module: 12,
    title: 'Musculoskeletal, Spine, and Head Trauma',
    description: 'Musculoskeletal, head, neck, and spine trauma assessment and management.',
    chapters: [31, 32],
    focusAreas: ['fracture management', 'spinal precautions', 'traumatic brain injury'],
    keySkills: ['splinting', 'spinal motion restriction', 'neurologic monitoring'],
    domain: 'clinical',
    difficultyMix: { knowledge: 12, application: 12, analysis: 6 }
  },
  {
    module: 13,
    title: 'Chest, Abdominal Trauma, and Burns',
    description: 'Thoracic and abdominal trauma, burns, and critical shock management.',
    chapters: [33, 34, 35],
    focusAreas: ['thoracic trauma', 'abdominal injury', 'burn resuscitation'],
    keySkills: ['needle decompression recognition', 'fluid resuscitation', 'burn triage'],
    domain: 'critical care',
    difficultyMix: { knowledge: 10, application: 16, analysis: 4 }
  },
  {
    module: 14,
    title: 'Operational Readiness and Special Incidents',
    description: 'Mass-casualty incidents, hazardous materials, terrorism response, vehicle extrication, and special operations.',
    chapters: [36, 37, 38, 39],
    focusAreas: ['MCI triage', 'hazmat PPE', 'disaster response', 'extrication'],
    keySkills: ['START triage', 'hazmat awareness', 'rescuer safety'],
    domain: 'operations',
    difficultyMix: { knowledge: 12, application: 14, analysis: 4 }
  },
  {
    module: 15,
    title: 'Advanced Clinical Reinforcement Modules',
    description: 'Bonus deep-dive anatomy and physiology refreshers to reinforce high-acuity decision-making.',
    chapters: [42, 43, 44, 45],
    focusAreas: ['cardiovascular integration', 'respiratory mechanics', 'neurologic pathways', 'endocrine balance'],
    keySkills: ['pathophysiology synthesis', 'advanced assessment cues', 'clinical correlation'],
    domain: 'critical care',
    difficultyMix: { knowledge: 14, application: 10, analysis: 6 }
  }
];

const nremtDomainMap: Record<number, string> = {
  1: 'Preparatory',
  2: 'Anatomy and Physiology',
  3: 'Patient Assessment',
  4: 'Airway, Respiration, and Ventilation',
  5: 'Pharmacology',
  6: 'Shock and Resuscitation',
  7: 'Medical Emergencies',
  8: 'Medical Emergencies',
  9: 'Medical Emergencies',
  10: 'Special Patient Populations',
  11: 'Trauma',
  12: 'Trauma',
  13: 'Special Patient Populations',
  14: 'EMS Operations',
  15: 'Advanced Clinical Integration'
} as const;

interface ChapterMetadata {
  chapter: number;
  title: (typeof chapterTitleMap)[ChapterNumber];
  module: number;
  moduleTitle: string;
  moduleDescription: string;
  moduleFocus: string[];
  moduleSkills: string[];
  domain: ModuleDefinition['domain'];
  difficultyMix: Record<Difficulty, number>;
}

type TemplatesByDifficulty = Record<Difficulty, TemplateFn[]>;

type TemplateContext = {
  topic: string;
  chapter: number;
  module: number;
  moduleTitle: string;
  domain: ModuleDefinition['domain'];
  moduleFocus: string[];
  focusIndex: number;
  difficulty: Difficulty;
};

type TemplateResult = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags?: string[];
  topicOverride?: string;
};

type TemplateFn = (context: TemplateContext) => TemplateResult;

const chapterNumbers = Object.keys(chapterTitleMap)
  .map((value) => Number(value))
  .sort((a, b) => a - b);

const moduleMap = moduleDefinitions.reduce<Record<number, ModuleDefinition>>((accumulator, definition) => {
  definition.chapters.forEach((chapter) => {
    accumulator[chapter] = definition;
  });
  return accumulator;
}, {});

const chapterMetadata: ChapterMetadata[] = chapterNumbers.map((chapter) => {
  const module = moduleMap[chapter];
  if (!module) {
    throw new Error(`Module definition missing for chapter ${chapter}`);
  }

  return {
    chapter,
    title: chapterTitleMap[chapter as ChapterNumber],
    module: module.module,
    moduleTitle: module.title,
    moduleDescription: module.description,
    moduleFocus: module.focusAreas,
    moduleSkills: module.keySkills,
    domain: module.domain,
    difficultyMix: module.difficultyMix
  };
});

const knowledgeTemplates: TemplateFn[] = [
  ({ topic }) => ({
    question: `Which statement best defines ${topic}?`,
    options: [
      `${topic} outlines standard EMS responsibilities in prehospital care`,
      `${topic} describes hospital-only specialties beyond EMT scope`,
      `${topic} focuses strictly on billing requirements for EMS`,
      `${topic} is exclusively a legal doctrine unrelated to EMS`
    ],
    correctAnswer: 0,
    explanation: `${topic} provides EMS professionals with foundational expectations for field practice.`,
    tags: ['definition', 'fundamentals']
  }),
  ({ topic }) => ({
    question: `What is the primary objective of ${topic} in EMS?`,
    options: [
      'To guide consistent, evidence-based patient care',
      'To replace protocols with provider preference',
      'To eliminate the need for documentation',
      'To remove medical oversight requirements'
    ],
    correctAnswer: 0,
    explanation: 'Protocols and core concepts ensure consistent care aligned with medical oversight.',
    tags: ['protocols', 'evidence-based']
  }),
  ({ topic }) => ({
    question: `Which component is most closely associated with ${topic}?`,
    options: [
      'Structured prehospital assessment flow',
      'Hospital admission procedures',
      'Insurance reimbursement schedules',
      'Interfacility transfer contracts'
    ],
    correctAnswer: 0,
    explanation: 'Structured assessments are central to most EMS educational topics.',
    tags: ['assessment', 'structure']
  }),
  ({ topic }) => ({
    question: `How does ${topic} support patient outcomes?`,
    options: [
      'By standardizing the EMT approach to emergencies',
      'By limiting EMT communication with other providers',
      'By prioritizing transport speed over assessment',
      'By reducing post-incident reviews'
    ],
    correctAnswer: 0,
    explanation: 'Consistent approaches reduce errors and ensure essential interventions occur on time.',
    tags: ['patient outcomes', 'consistency']
  }),
  ({ moduleTitle }) => ({
    question: `The module ${moduleTitle} primarily emphasizes which educational priority?`,
    options: [
      'Building the essential knowledge base for EMT practice',
      'Focusing exclusively on advanced paramedic procedures',
      'Limiting exposure to interprofessional collaboration',
      'Discouraging cross-training with allied responders'
    ],
    correctAnswer: 0,
    explanation: `${moduleTitle} reinforces foundational EMS knowledge needed for confident practice.`,
    tags: ['module overview', 'education priorities']
  }),
  ({ focusIndex, moduleFocus }) => ({
    question: `Which element best captures the focus area "${moduleFocus[focusIndex]}"?`,
    options: [
      `${moduleFocus[focusIndex]} addresses critical knowledge EMTs apply routinely`,
      'It is an administrative regulation unrelated to care',
      'It applies only to hospital-based clinicians',
      'It represents optional training rarely used in field work'
    ],
    correctAnswer: 0,
    explanation: 'Module focus areas highlight essential knowledge, judgment, or skills for daily EMS operations.',
    tags: ['focus area', 'knowledge']
  }),
  ({ topic }) => ({
    question: `Which statement about documentation of ${topic} is most accurate?`,
    options: [
      'Documentation should capture objective findings related to the topic',
      'Documentation should rely on memory after the call',
      'Only interventions require documentation',
      'Narratives may exclude patient responses and trends'
    ],
    correctAnswer: 0,
    explanation: 'Objective, topical documentation preserves clinical reasoning and patient outcomes.',
    tags: ['documentation', 'professionalism']
  }),
  ({ topic }) => ({
    question: `What role does communication play when managing ${topic}?`,
    options: [
      'It ensures team coordination and patient safety',
      'It is nonessential if protocols are memorized',
      'It is only relevant during transport',
      'It primarily serves billing requirements'
    ],
    correctAnswer: 0,
    explanation: 'Clear communication ties assessment to action, sharing critical information with the team.',
    tags: ['communication', 'teamwork']
  }),
  ({ topic }) => ({
    question: `Which best describes a quality improvement consideration for ${topic}?`,
    options: [
      'Reviewing call data to refine performance trends',
      'Assuming outcomes without feedback',
      'Avoiding peer review due to workload',
      'Limiting training to initial certification'
    ],
    correctAnswer: 0,
    explanation: 'Quality improvement requires data-driven reflection on topic-specific performance.',
    tags: ['quality improvement', 'data']
  }),
  ({ topic }) => ({
    question: `How should EMS providers interpret scope of practice regarding ${topic}?`,
    options: [
      'Perform interventions as defined by protocols and medical direction',
      'Adopt any procedure demonstrated online',
      'Match hospital capabilities regardless of training',
      'Delegate responsibilities to untrained personnel'
    ],
    correctAnswer: 0,
    explanation: 'Scope of practice defines safe boundaries for interventions related to each topic.',
    tags: ['scope of practice', 'safety']
  })
];

const applicationTemplates: TemplateFn[] = [
  ({ topic, moduleTitle }) => ({
    question: `During a scenario emphasizing ${moduleTitle}, an EMT encounters a patient requiring applied knowledge of ${topic}. What is the best first action?`,
    options: [
      'Initiate the assessment or intervention pathway aligned with the topic',
      'Delay care until advanced providers arrive',
      'Focus on non-emergent paperwork tasks',
      'Deviate from protocols based on anecdote'
    ],
    correctAnswer: 0,
    explanation: 'Scenario-based questions expect the EMT to apply the structured approach relevant to the topic.',
    tags: ['scenario', 'prioritization']
  }),
  ({ topic }) => ({
    question: `When troubleshooting complications related to ${topic}, which step prevents escalation?`,
    options: [
      'Reassess patient response and adjust interventions promptly',
      'Assume the complication will resolve without action',
      'Ignore changes in mental status',
      'Cease documentation to save time'
    ],
    correctAnswer: 0,
    explanation: 'Timely reassessment and adjustment prevent minor issues from becoming critical.',
    tags: ['reassessment', 'complications']
  }),
  ({ focusIndex, moduleFocus }) => ({
    question: `Which practical technique aligns with the focus "${moduleFocus[focusIndex]}"?`,
    options: [
      'Apply the corresponding assessment tools and interventions during field care',
      'Defer all actions until hospital arrival',
      'Select techniques based solely on provider comfort',
      'Ignore patient feedback during interventions'
    ],
    correctAnswer: 0,
    explanation: 'Focus areas translate directly into hands-on assessment and intervention strategies.',
    tags: ['skills', 'field care']
  }),
  ({ topic }) => ({
    question: `What documentation detail best demonstrates competent management of ${topic}?`,
    options: [
      'Linking patient presentation, interventions, and response in the narrative',
      'Recording only the chief complaint and leaving narrative blank',
      'Listing vital signs without context',
      'Documenting personal opinions about the call'
    ],
    correctAnswer: 0,
    explanation: 'Thorough documentation captures assessment, interventions, and patient outcomes.',
    tags: ['documentation', 'competency']
  }),
  ({ topic }) => ({
    question: `Which safety consideration is essential when applying skills related to ${topic}?`,
    options: [
      'Ensure scene safety and personal protective equipment are in place',
      'Assume safety if the scene appears quiet',
      'Prioritize speed over PPE compliance',
      'Disregard partner feedback about hazards'
    ],
    correctAnswer: 0,
    explanation: 'Scene safety and PPE prevent provider injury while delivering care.',
    tags: ['scene safety', 'PPE']
  }),
  ({ module }) => ({
    question: `How should an EMT integrate cross-disciplinary communication for module ${module}?`,
    options: [
      'Share concise handoffs linking assessment findings to treatments',
      'Provide unrelated background stories to receiving staff',
      'Avoid communication to save time',
      'Transfer care without verifying understanding'
    ],
    correctAnswer: 0,
    explanation: 'Coordinated communication ensures continuity and accuracy during handoff.',
    tags: ['handoff', 'communication']
  }),
  ({ topic }) => ({
    question: `Which patient education point reinforces proper management of ${topic}?`,
    options: [
      'Explain the rationale behind EMS interventions and expected responses',
      'Avoid discussing care to prevent questions',
      'Provide unrelated information to distract the patient',
      'Use jargon without checking understanding'
    ],
    correctAnswer: 0,
    explanation: 'Patient education builds trust and supports adherence to post-call instructions.',
    tags: ['patient education', 'communication']
  }),
  ({ focusIndex, moduleFocus }) => ({
    question: `In real-world operations, how is "${moduleFocus[focusIndex]}" most effectively demonstrated?`,
    options: [
      'By anticipating scene variables and adapting within protocol',
      'By waiting for orders before acting on obvious threats',
      'By ignoring atypical findings',
      'By focusing solely on transport speed'
    ],
    correctAnswer: 0,
    explanation: 'Effective field practice blends anticipation with protocol-driven adjustments.',
    tags: ['situational awareness', 'adaptation']
  }),
  ({ topic }) => ({
    question: `Which assessment strategy best differentiates common presentations related to ${topic}?`,
    options: [
      'Use structured decision pathways that compare likely etiologies',
      'Rely exclusively on patient appearance',
      'Bypass vital sign trends when making decisions',
      'Exclude collateral history from the assessment'
    ],
    correctAnswer: 0,
    explanation: 'Comparative assessment highlights subtle differences between similar conditions.',
    tags: ['differentials', 'assessment']
  }),
  ({ topic }) => ({
    question: `What team-based approach enhances outcomes for cases involving ${topic}?`,
    options: [
      'Assign roles that complement each provider’s strengths',
      'Work independently without coordination',
      'Overrule partner input to maintain control',
      'Avoid preplanning roles before high-risk calls'
    ],
    correctAnswer: 0,
    explanation: 'Role clarity improves efficiency and patient safety during emergent care.',
    tags: ['teamwork', 'roles']
  }),
  ({ topic }) => ({
    question: `Which consideration ensures cultural responsiveness when addressing ${topic}?`,
    options: [
      'Adapt explanations to meet the patient’s cultural or language needs',
      'Assume all patients share identical beliefs',
      'Avoid interpreter services to save time',
      'Dismiss family input during assessment'
    ],
    correctAnswer: 0,
    explanation: 'Culturally responsive care promotes trust and accurate assessment.',
    tags: ['cultural competency', 'patient-centered']
  }),
  ({ topic }) => ({
    question: `When integrating technology or telemedicine support for ${topic}, what is critical?`,
    options: [
      'Verify data accuracy and communicate findings to medical control',
      'Use technology without confirming patient identifiers',
      'Share patient data on unsecured channels',
      'Ignore telemedicine input during decision-making'
    ],
    correctAnswer: 0,
    explanation: 'Technology tools must be integrated thoughtfully to support clinical decisions.',
    tags: ['technology', 'medical control']
  })
];

const analysisTemplates: TemplateFn[] = [
  ({ topic }) => ({
    question: `An EMT is evaluating two patients with similar complaints related to ${topic}. What analytical step prevents mismanagement?`,
    options: [
      'Compare assessment findings to identify key differentiators',
      'Treat both patients identically regardless of nuances',
      'Document only one patient to save time',
      'Ignore conflicting history details'
    ],
    correctAnswer: 0,
    explanation: 'Analytical thinking differentiates subtle presentation differences to guide care.',
    tags: ['analysis', 'differentiation']
  }),
  ({ topic }) => ({
    question: `A trend review reveals frequent delays in managing ${topic}. What should be examined first?`,
    options: [
      'Process barriers that slow assessment and intervention',
      'Punitive actions against individual providers',
      'Reducing training on the topic',
      'Eliminating quality improvement meetings'
    ],
    correctAnswer: 0,
    explanation: 'Identifying system barriers enables targeted improvement.',
    tags: ['quality improvement', 'systems']
  }),
  ({ topic }) => ({
    question: `How can providers anticipate high-risk complications associated with ${topic}?`,
    options: [
      'By monitoring early indicators and preparing contingency plans',
      'By reacting only after life threats appear',
      'By ignoring atypical patient responses',
      'By assuming every case is textbook'
    ],
    correctAnswer: 0,
    explanation: 'Anticipation and contingency planning mitigate high-risk complications.',
    tags: ['anticipation', 'risk']
  }),
  ({ topic }) => ({
    question: `Which data point best supports updating protocols for ${topic}?`,
    options: [
      'Evidence showing improved outcomes with revised interventions',
      'Anecdotal stories without outcome tracking',
      'Personal preference from a single provider',
      'Unverified information from social media'
    ],
    correctAnswer: 0,
    explanation: 'Protocol updates should rely on measurable outcome improvements.',
    tags: ['protocols', 'evidence']
  }),
  ({ topic }) => ({
    question: `What analytical approach ensures accurate triage decisions when ${topic} is suspected?`,
    options: [
      'Weigh patient presentation against standardized triage criteria',
      'Transport every patient priority one without assessment',
      'Ignore mechanism of injury or illness',
      'Avoid consulting medical direction when uncertain'
    ],
    correctAnswer: 0,
    explanation: 'Structured triage criteria align patient needs with appropriate resources.',
    tags: ['triage', 'decision-making']
  }),
  ({ topic }) => ({
    question: `During debriefing, the team analyzes management of ${topic}. Which question drives improvement?`,
    options: [
      'Which decisions aligned with best practices and which did not?',
      'Who should be blamed for delays?',
      'Should documentation be shortened to save time?',
      'Can future calls avoid communication entirely?'
    ],
    correctAnswer: 0,
    explanation: 'Reflective questioning identifies strengths and gaps for future responses.',
    tags: ['debrief', 'reflective practice']
  }),
  ({ topic }) => ({
    question: `Which strategy integrates patient-specific factors into plans for ${topic}?`,
    options: [
      'Tailor interventions based on comorbidities and response trends',
      'Rely solely on protocol checklists without judgment',
      'Disregard patient preferences or history',
      'Delay care awaiting perfect information'
    ],
    correctAnswer: 0,
    explanation: 'Patient-centered analysis guides nuanced decision-making.',
    tags: ['patient-centered', 'comorbidities']
  }),
  ({ topic }) => ({
    question: `A crew compares outcomes across multiple calls involving ${topic}. What metric is most useful?`,
    options: [
      'Time to critical intervention and patient response',
      'Provider satisfaction with the call outcome',
      'Weather conditions during transport',
      'Number of patients transported lights-and-siren'
    ],
    correctAnswer: 0,
    explanation: 'Outcome metrics linked to interventions reveal performance trends.',
    tags: ['metrics', 'outcomes']
  })
];

const defaultTag = 'balanced-quiz';
const templateDifficultyOrder: Difficulty[] = ['knowledge', 'application', 'analysis'];

const slugifyTopic = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const combineTags = (
  metadata: ChapterMetadata,
  difficulty: Difficulty,
  topic: string,
  additional: string[] = []
) => {
  const topicSlug = slugifyTopic(topic);
  const baseTags = [
    defaultTag,
    `chapter-${metadata.chapter}`,
    `module-${metadata.module}`,
    metadata.domain,
    difficulty,
    topicSlug ? `topic-${topicSlug}` : ''
  ];
  const combined = new Set<string>([...baseTags, ...additional].filter(Boolean));
  return Array.from(combined);
};

const difficultyTemplateMap: TemplatesByDifficulty = {
  knowledge: knowledgeTemplates,
  application: applicationTemplates,
  analysis: analysisTemplates
};

const normalizeDifficultyCounts = (counts: Record<Difficulty, number>) => {
  const total = templateDifficultyOrder.reduce((sum, difficulty) => sum + counts[difficulty], 0);

  if (total === QUESTIONS_PER_CHAPTER) {
    return counts;
  }

  const scaled: Record<Difficulty, number> = { ...counts };
  const scaleFactor = QUESTIONS_PER_CHAPTER / total;

  templateDifficultyOrder.forEach((difficulty) => {
    scaled[difficulty] = Math.max(0, Math.round(scaled[difficulty] * scaleFactor));
  });

  let difference = QUESTIONS_PER_CHAPTER - templateDifficultyOrder.reduce(
    (sum, difficulty) => sum + scaled[difficulty],
    0
  );

  let index = 0;
  while (difference !== 0) {
    const difficulty = templateDifficultyOrder[index % templateDifficultyOrder.length];
    scaled[difficulty] += difference > 0 ? 1 : -1;
    difference += difference > 0 ? -1 : 1;
    index += 1;
  }

  return scaled;
};

const createGeneratedChapterQuestions = (metadata: ChapterMetadata): QuizQuestion[] => {
  const topics = metadata.moduleFocus.length > 0 ? metadata.moduleFocus : [metadata.title];
  const difficultyCounts = normalizeDifficultyCounts({ ...metadata.difficultyMix });

  const questions: QuizQuestion[] = [];
  let questionIndex = 0;
  const nremtDomain = nremtDomainMap[metadata.module] ?? 'General';

  templateDifficultyOrder.forEach((difficulty) => {
    const count = difficultyCounts[difficulty];
    const templates = difficultyTemplateMap[difficulty];

    for (let i = 0; i < count; i += 1) {
      const template = templates[i % templates.length];
      const topicIndex = questionIndex % topics.length;
      const topic = topics[topicIndex];
      const points = difficulty === 'knowledge' ? 1 : difficulty === 'application' ? 2 : 3;

      const generated = template({
        topic,
        chapter: metadata.chapter,
        module: metadata.module,
        moduleTitle: metadata.moduleTitle,
        domain: metadata.domain,
        moduleFocus: metadata.moduleFocus,
        focusIndex: topicIndex,
        difficulty
      });

      const resolvedTopic = generated.topicOverride ?? topic;
      const idSlug = slugifyTopic(
        `${metadata.chapter}-${metadata.module}-${difficulty}-${questionIndex}-${resolvedTopic}`
      );

      questions.push({
        id: `${metadata.chapter}-${metadata.module}-${difficulty}-${questionIndex}-${idSlug}`,
        module: metadata.module,
        chapter: metadata.chapter,
        topic: resolvedTopic,
        difficulty,
        question: generated.question,
        options: generated.options,
        correctAnswer: generated.correctAnswer,
        explanation: generated.explanation,
        tags: combineTags(metadata, difficulty, resolvedTopic, generated.tags),
        points,
        category: difficulty,
        nremtDomain
      });

      questionIndex += 1;
    }
  });

  return questions.slice(0, QUESTIONS_PER_CHAPTER);
};

const chapterQuestionBankInternal: Record<number, QuizQuestion[]> = {};

chapterMetadata.forEach((metadata) => {
  chapterQuestionBankInternal[metadata.chapter] = createGeneratedChapterQuestions(metadata);
});

export const chapterQuestionBank = chapterQuestionBankInternal;
export const chapterTitles = { ...chapterTitleMap };
export const balancedModuleDefinitions = moduleDefinitions;

export const chapter1Questions = chapterQuestionBank[1] ?? [];
export const chapter2Questions = chapterQuestionBank[2] ?? [];
export const chapter3Questions = chapterQuestionBank[3] ?? [];
export const chapter4Questions = chapterQuestionBank[4] ?? [];

const moduleStructure = moduleDefinitions.map((definition) => ({
  module: definition.module,
  title: definition.title,
  description: definition.description,
  chapters: definition.chapters,
  focusAreas: definition.focusAreas,
  keySkills: definition.keySkills,
  domain: definition.domain
}));

const completedChapterNumbers = chapterMetadata.map(({ chapter }) => chapter);

export const balancedQuizConfig = {
  totalQuestions: TOTAL_CHAPTERS * QUESTIONS_PER_CHAPTER,
  questionsPerChapter: QUESTIONS_PER_CHAPTER,
  totalChapters: TOTAL_CHAPTERS,
  totalModules: TOTAL_MODULES,
  chapterTitles,
  moduleStructure,
  implementationStatus: {
    chaptersCompleted: completedChapterNumbers.length,
    questionsCompleted: completedChapterNumbers.length * QUESTIONS_PER_CHAPTER,
    chaptersRemaining: 0,
    questionsRemaining: 0,
    completedChapterNumbers,
    pendingChapterNumbers: [] as number[]
  }
};

export const quizModules = moduleDefinitions.map((definition) => {
  const questions = definition.chapters.flatMap((chapter) => chapterQuestionBank[chapter] ?? []);
  return {
    module: definition.module,
    title: definition.title,
    description: definition.description,
    questions,
    timeLimit: Math.max(questions.length * 2, 60),
    passingScore: 80
  };
});

export default {
  chapterTitles,
  chapterQuestionBank,
  balancedQuizConfig,
  quizModules
};
