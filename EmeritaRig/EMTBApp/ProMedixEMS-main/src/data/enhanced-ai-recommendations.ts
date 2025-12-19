// Enhanced AI Recommendation Engine - Advanced Clinical Decision Support
import { emtbChapterFlashcards, getFlashcardsByChapter } from './emtb-flashcards';
import { emsFormulary } from './drug-calculator';
import { emsProtocols } from './ems-protocols';

// Enhanced interfaces for smarter clinical decision-making
interface PatientPresentation {
  id: string;
  chiefComplaint: string;
  vitalSigns: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    respiratoryRate?: number;
    oxygenSaturation?: number;
    temperature?: number;
    glucoseLevel?: number;
    glasgowComaScale?: number;
  };
  symptoms: string[];
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  ageGroup: 'pediatric' | 'adult' | 'geriatric';
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  timeOnset: string;
  environmentalFactors?: string[];
}

interface EnhancedRecommendation {
  id: string;
  type: 'medication' | 'protocol' | 'assessment' | 'transport' | 'notification';
  priority: 'immediate' | 'urgent' | 'routine';
  confidenceScore: number; // 0-100
  recommendation: string;
  rationale: string;
  contraindications: string[];
  warningFlags: string[];
  dosageCalculation?: {
    medication: string;
    dose: string;
    route: string;
    frequency: string;
    maxDose?: string;
  };
  monitoring: string[];
  expectedOutcome: string;
  alternativeOptions: string[];
  studyReferences: Array<{
    chapterNumber: number;
    chapterTitle: string;
    relevantTopics: string[];
  }>;
  timeSensitive: boolean;
  requiresMedicalControl: boolean;
}

interface LearningContext {
  recentQueries: string[];
  strugglingAreas: string[];
  masteredTopics: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  currentStudyGoals: string[];
  completedChapters: number[];
  practiceScores: { [key: string]: number };
}

interface ClinicalDecisionNode {
  id: string;
  condition: string;
  criteria: Array<{
    parameter: string;
    operator: '>' | '<' | '>=' | '<=' | '==' | '!=' | 'includes' | 'excludes';
    value: any;
    weight: number; // Importance weight 1-10
  }>;
  outcomes: Array<{
    recommendation: EnhancedRecommendation;
    probability: number;
  }>;
  childNodes?: ClinicalDecisionNode[];
}

class EnhancedAIRecommendationEngine {
  private decisionTrees: ClinicalDecisionNode[] = [];
  private learningContext: LearningContext;
  private knowledgeBase: {
    chapters: any[];
    medications: any[];
    protocols: any[];
    flashcards: any[];
  };

  constructor() {
    // Initialize knowledge base
    this.knowledgeBase = {
      chapters: emtbChapterFlashcards,
      medications: emsFormulary,
      protocols: emsProtocols,
      flashcards: emtbChapterFlashcards
    };

    this.learningContext = {
      recentQueries: [],
      strugglingAreas: [],
      masteredTopics: [],
      preferredLearningStyle: 'mixed',
      currentStudyGoals: [],
      completedChapters: [],
      practiceScores: {}
    };

    this.initializeDecisionTrees();
  }

  private initializeDecisionTrees(): void {
    this.decisionTrees = [
      // Cardiac Emergency Decision Tree
      {
        id: 'cardiac_emergency',
        condition: 'Cardiac-related presentation',
        criteria: [
          { parameter: 'chiefComplaint', operator: 'includes', value: 'chest pain', weight: 9 },
          { parameter: 'chiefComplaint', operator: 'includes', value: 'cardiac arrest', weight: 10 },
          { parameter: 'heartRate', operator: '>', value: 150, weight: 7 },
          { parameter: 'heartRate', operator: '<', value: 50, weight: 7 },
        ],
        outcomes: [
          {
            recommendation: {
              id: 'cardiac_protocol',
              type: 'protocol',
              priority: 'immediate',
              confidenceScore: 95,
              recommendation: 'Initiate cardiac emergency protocol immediately',
              rationale: 'Patient presentation indicates high-risk cardiac emergency requiring immediate intervention',
              contraindications: ['Known allergy to aspirin', 'Active bleeding'],
              warningFlags: ['Hypotension', 'Altered mental status', 'Severe dyspnea'],
              monitoring: ['Continuous ECG', 'Vital signs q5min', 'O2 saturation', 'Pain level'],
              expectedOutcome: 'Stabilization of cardiac rhythm and hemodynamics',
              alternativeOptions: ['Advanced cardiac life support', 'Immediate transport'],
              studyReferences: [
                { chapterNumber: 17, chapterTitle: 'Cardiovascular Emergencies', relevantTopics: ['Chest pain', 'ACS', 'Cardiac arrest'] },
                { chapterNumber: 15, chapterTitle: 'Shock and Resuscitation', relevantTopics: ['CPR', 'AED usage'] }
              ],
              timeSensitive: true,
              requiresMedicalControl: true
            },
            probability: 0.95
          }
        ],
        childNodes: [
          {
            id: 'chest_pain_specific',
            condition: 'Chest pain with cardiac symptoms',
            criteria: [
              { parameter: 'symptoms', operator: 'includes', value: 'crushing chest pain', weight: 8 },
              { parameter: 'symptoms', operator: 'includes', value: 'left arm pain', weight: 6 },
              { parameter: 'symptoms', operator: 'includes', value: 'shortness of breath', weight: 7 }
            ],
            outcomes: [
              {
                recommendation: {
                  id: 'acs_protocol',
                  type: 'medication',
                  priority: 'urgent',
                  confidenceScore: 88,
                  recommendation: 'Administer aspirin 324mg chewed if no contraindications',
                  rationale: 'Chest pain with cardiac features suggests possible ACS - aspirin indicated',
                  contraindications: ['Aspirin allergy', 'Active GI bleeding', 'Age <16 years'],
                  warningFlags: ['Blood pressure <90 systolic', 'Heart rate <50 or >150'],
                  dosageCalculation: {
                    medication: 'Aspirin',
                    dose: '324mg',
                    route: 'PO (chewed)',
                    frequency: 'Once',
                    maxDose: '324mg'
                  },
                  monitoring: ['Pain reassessment', 'Vital signs', 'ECG changes'],
                  expectedOutcome: 'Reduced platelet aggregation, potential pain relief',
                  alternativeOptions: ['Nitroglycerin if prescribed', 'High-flow oxygen'],
                  studyReferences: [
                    { chapterNumber: 17, chapterTitle: 'Cardiovascular Emergencies', relevantTopics: ['Aspirin administration', 'Chest pain management'] }
                  ],
                  timeSensitive: true,
                  requiresMedicalControl: false
                },
                probability: 0.88
              }
            ]
          }
        ]
      },

      // Respiratory Emergency Decision Tree
      {
        id: 'respiratory_emergency',
        condition: 'Respiratory distress or failure',
        criteria: [
          { parameter: 'chiefComplaint', operator: 'includes', value: 'difficulty breathing', weight: 9 },
          { parameter: 'respiratoryRate', operator: '>', value: 28, weight: 8 },
          { parameter: 'respiratoryRate', operator: '<', value: 8, weight: 9 },
          { parameter: 'oxygenSaturation', operator: '<', value: 90, weight: 10 }
        ],
        outcomes: [
          {
            recommendation: {
              id: 'respiratory_support',
              type: 'protocol',
              priority: 'immediate',
              confidenceScore: 93,
              recommendation: 'Provide high-flow oxygen and prepare for assisted ventilation',
              rationale: 'Respiratory compromise requires immediate oxygen support and airway management',
              contraindications: ['COPD patients - use caution with high-flow O2'],
              warningFlags: ['Cyanosis', 'Use of accessory muscles', 'Altered mental status'],
              monitoring: ['SpO2 continuous', 'Respiratory rate and effort', 'Skin color', 'Mental status'],
              expectedOutcome: 'Improved oxygenation and respiratory stability',
              alternativeOptions: ['BVM ventilation', 'Advanced airway management'],
              studyReferences: [
                { chapterNumber: 10, chapterTitle: 'Airway Management', relevantTopics: ['Oxygen therapy', 'BVM ventilation'] },
                { chapterNumber: 16, chapterTitle: 'Respiratory Emergencies', relevantTopics: ['Dyspnea', 'Respiratory failure'] }
              ],
              timeSensitive: true,
              requiresMedicalControl: false
            },
            probability: 0.93
          }
        ],
        childNodes: [
          {
            id: 'asthma_specific',
            condition: 'Asthma exacerbation',
            criteria: [
              { parameter: 'medicalHistory', operator: 'includes', value: 'asthma', weight: 8 },
              { parameter: 'symptoms', operator: 'includes', value: 'wheezing', weight: 7 },
              { parameter: 'currentMedications', operator: 'includes', value: 'inhaler', weight: 6 }
            ],
            outcomes: [
              {
                recommendation: {
                  id: 'bronchodilator_assist',
                  type: 'medication',
                  priority: 'urgent',
                  confidenceScore: 85,
                  recommendation: 'Assist with patient\'s prescribed bronchodilator inhaler',
                  rationale: 'Asthma exacerbation responds well to bronchodilator therapy',
                  contraindications: ['Medication not prescribed to patient', 'Expired medication'],
                  warningFlags: ['Inability to speak in full sentences', 'Silent chest', 'Cyanosis'],
                  dosageCalculation: {
                    medication: 'Patient\'s prescribed inhaler',
                    dose: 'As prescribed (typically 2 puffs)',
                    route: 'Inhalation',
                    frequency: 'May repeat per protocol',
                  },
                  monitoring: ['Respiratory effort', 'Wheezing assessment', 'Peak flow if available'],
                  expectedOutcome: 'Bronchodilation and improved air movement',
                  alternativeOptions: ['Nebulizer treatment', 'Epinephrine for severe cases'],
                  studyReferences: [
                    { chapterNumber: 16, chapterTitle: 'Respiratory Emergencies', relevantTopics: ['Asthma management', 'Inhaler assistance'] }
                  ],
                  timeSensitive: true,
                  requiresMedicalControl: false
                },
                probability: 0.85
              }
            ]
          }
        ]
      },

      // Neurological Emergency Decision Tree
      {
        id: 'neurological_emergency',
        condition: 'Neurological presentation',
        criteria: [
          { parameter: 'glasgowComaScale', operator: '<', value: 15, weight: 8 },
          { parameter: 'symptoms', operator: 'includes', value: 'altered mental status', weight: 9 },
          { parameter: 'symptoms', operator: 'includes', value: 'seizure', weight: 10 },
          { parameter: 'symptoms', operator: 'includes', value: 'stroke symptoms', weight: 9 }
        ],
        outcomes: [
          {
            recommendation: {
              id: 'neuro_assessment',
              type: 'assessment',
              priority: 'urgent',
              confidenceScore: 90,
              recommendation: 'Perform comprehensive neurological assessment including FAST exam',
              rationale: 'Neurological symptoms require systematic assessment for stroke or other CNS emergencies',
              contraindications: [],
              warningFlags: ['Rapidly declining GCS', 'Focal neurological deficits', 'Posturing'],
              monitoring: ['GCS trending', 'Pupil assessment', 'Motor function', 'Speech clarity'],
              expectedOutcome: 'Identification of stroke or other neurological emergency',
              alternativeOptions: ['Glucose check', 'Consider naloxone if suspected overdose'],
              studyReferences: [
                { chapterNumber: 20, chapterTitle: 'Neurologic Emergencies', relevantTopics: ['Stroke assessment', 'FAST exam', 'GCS scoring'] },
                { chapterNumber: 19, chapterTitle: 'Diabetic Emergencies', relevantTopics: ['Altered mental status', 'Glucose assessment'] }
              ],
              timeSensitive: true,
              requiresMedicalControl: true
            },
            probability: 0.90
          }
        ]
      },

      // Trauma Emergency Decision Tree
      {
        id: 'trauma_emergency',
        condition: 'Traumatic injury presentation',
        criteria: [
          { parameter: 'chiefComplaint', operator: 'includes', value: 'trauma', weight: 10 },
          { parameter: 'chiefComplaint', operator: 'includes', value: 'fall', weight: 7 },
          { parameter: 'chiefComplaint', operator: 'includes', value: 'motor vehicle', weight: 9 },
          { parameter: 'severity', operator: '==', value: 'severe', weight: 8 }
        ],
        outcomes: [
          {
            recommendation: {
              id: 'trauma_protocol',
              type: 'protocol',
              priority: 'immediate',
              confidenceScore: 92,
              recommendation: 'Initiate trauma assessment and spine immobilization protocols',
              rationale: 'Traumatic injuries require systematic assessment and spine precautions',
              contraindications: [],
              warningFlags: ['Signs of shock', 'Neurological deficits', 'Multiple injuries'],
              monitoring: ['Vital signs q5min', 'Neurological status', 'Signs of internal bleeding'],
              expectedOutcome: 'Stabilization and appropriate trauma center transport',
              alternativeOptions: ['Rapid transport', 'ALS intercept'],
              studyReferences: [
                { chapterNumber: 25, chapterTitle: 'Trauma Overview', relevantTopics: ['Trauma assessment', 'Spine immobilization'] },
                { chapterNumber: 26, chapterTitle: 'Head and Spine Injuries', relevantTopics: ['Spinal precautions', 'Head injury management'] }
              ],
              timeSensitive: true,
              requiresMedicalControl: false
            },
            probability: 0.92
          }
        ]
      }
    ];
  }

  // Enhanced clinical recommendation system
  public generateRecommendations(presentation: PatientPresentation): EnhancedRecommendation[] {
    const recommendations: EnhancedRecommendation[] = [];
    
    // Analyze each decision tree
    for (const tree of this.decisionTrees) {
      const score = this.evaluateDecisionTree(tree, presentation);
      if (score > 0.5) { // Threshold for relevant recommendations
        const treeRecommendations = this.extractRecommendations(tree, presentation, score);
        recommendations.push(...treeRecommendations);
      }
    }

    // Sort by priority and confidence
    recommendations.sort((a, b) => {
      const priorityOrder = { immediate: 0, urgent: 1, routine: 2 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.confidenceScore - a.confidenceScore;
    });

    // Add study recommendations based on the clinical scenario
    this.addStudyRecommendations(recommendations, presentation);

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  private evaluateDecisionTree(tree: ClinicalDecisionNode, presentation: PatientPresentation): number {
    let totalScore = 0;
    let maxPossibleScore = 0;

    for (const criterion of tree.criteria) {
      maxPossibleScore += criterion.weight;
      
      const patientValue = this.extractPatientValue(presentation, criterion.parameter);
      const matches = this.evaluateCriterion(patientValue, criterion);
      
      if (matches) {
        totalScore += criterion.weight;
      }
    }

    return maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0;
  }

  private extractPatientValue(presentation: PatientPresentation, parameter: string): any {
    const parameterPath = parameter.split('.');
    let value: any = presentation;
    
    for (const path of parameterPath) {
      if (value && typeof value === 'object' && path in value) {
        value = value[path];
      } else {
        return null;
      }
    }
    
    return value;
  }

  private evaluateCriterion(patientValue: any, criterion: any): boolean {
    if (patientValue === null || patientValue === undefined) {
      return false;
    }

    switch (criterion.operator) {
      case '>':
        return typeof patientValue === 'number' && patientValue > criterion.value;
      case '<':
        return typeof patientValue === 'number' && patientValue < criterion.value;
      case '>=':
        return typeof patientValue === 'number' && patientValue >= criterion.value;
      case '<=':
        return typeof patientValue === 'number' && patientValue <= criterion.value;
      case '==':
        return patientValue === criterion.value;
      case '!=':
        return patientValue !== criterion.value;
      case 'includes':
        if (Array.isArray(patientValue)) {
          return patientValue.some(item => 
            typeof item === 'string' && item.toLowerCase().includes(criterion.value.toLowerCase())
          );
        }
        return typeof patientValue === 'string' && 
               patientValue.toLowerCase().includes(criterion.value.toLowerCase());
      case 'excludes':
        if (Array.isArray(patientValue)) {
          return !patientValue.some(item => 
            typeof item === 'string' && item.toLowerCase().includes(criterion.value.toLowerCase())
          );
        }
        return typeof patientValue === 'string' && 
               !patientValue.toLowerCase().includes(criterion.value.toLowerCase());
      default:
        return false;
    }
  }

  private extractRecommendations(tree: ClinicalDecisionNode, presentation: PatientPresentation, treeScore: number): EnhancedRecommendation[] {
    const recommendations: EnhancedRecommendation[] = [];
    
    // Add main tree recommendations
    for (const outcome of tree.outcomes) {
      const adjustedRecommendation = {
        ...outcome.recommendation,
        confidenceScore: Math.floor(outcome.recommendation.confidenceScore * treeScore * outcome.probability)
      };
      recommendations.push(adjustedRecommendation);
    }
    
    // Recursively evaluate child nodes
    if (tree.childNodes) {
      for (const childNode of tree.childNodes) {
        const childScore = this.evaluateDecisionTree(childNode, presentation);
        if (childScore > 0.6) { // Higher threshold for child nodes
          const childRecommendations = this.extractRecommendations(childNode, presentation, childScore);
          recommendations.push(...childRecommendations);
        }
      }
    }
    
    return recommendations;
  }

  private addStudyRecommendations(recommendations: EnhancedRecommendation[], presentation: PatientPresentation): void {
    // Find relevant study materials based on the clinical presentation
    const relevantChapters = this.identifyRelevantChapters(presentation);
    
    if (relevantChapters.length > 0) {
      const studyRecommendation: EnhancedRecommendation = {
        id: 'study_recommendation',
        type: 'assessment',
        priority: 'routine',
        confidenceScore: 75,
        recommendation: 'Review related EMT-B study materials for enhanced understanding',
        rationale: 'Studying relevant chapters will improve clinical decision-making for similar cases',
        contraindications: [],
        warningFlags: [],
        monitoring: ['Knowledge retention', 'Practical application'],
        expectedOutcome: 'Improved clinical knowledge and confidence',
        alternativeOptions: ['Flashcard review', 'Practice scenarios', 'Peer discussion'],
        studyReferences: relevantChapters,
        timeSensitive: false,
        requiresMedicalControl: false
      };
      
      recommendations.push(studyRecommendation);
    }
  }

  private identifyRelevantChapters(presentation: PatientPresentation): Array<{ chapterNumber: number; chapterTitle: string; relevantTopics: string[] }> {
    const chapters: Array<{ chapterNumber: number; chapterTitle: string; relevantTopics: string[] }> = [];
    
    // Map clinical presentations to relevant chapters
    const presentationKeywords = [
      presentation.chiefComplaint.toLowerCase(),
      ...presentation.symptoms.map(s => s.toLowerCase()),
      ...presentation.medicalHistory.map(h => h.toLowerCase())
    ].join(' ');

    // Chapter mapping based on content
    const chapterMappings = [
      { keywords: ['cardiac', 'chest pain', 'heart', 'myocardial'], chapters: [17, 15] },
      { keywords: ['respiratory', 'breathing', 'asthma', 'copd'], chapters: [16, 10] },
      { keywords: ['neurologic', 'stroke', 'seizure', 'altered mental'], chapters: [20, 19] },
      { keywords: ['trauma', 'injury', 'fall', 'fracture'], chapters: [25, 26, 27] },
      { keywords: ['pediatric', 'child', 'infant'], chapters: [32, 33] },
      { keywords: ['obstetric', 'pregnancy', 'delivery'], chapters: [34, 35] },
      { keywords: ['overdose', 'poisoning', 'substance'], chapters: [22, 23] },
      { keywords: ['diabetic', 'glucose', 'hypoglycemia'], chapters: [19] },
      { keywords: ['allergic', 'anaphylaxis', 'reaction'], chapters: [21] }
    ];

    for (const mapping of chapterMappings) {
      if (mapping.keywords.some(keyword => presentationKeywords.includes(keyword))) {
        for (const chapterNum of mapping.chapters) {
          const chapterCards = getFlashcardsByChapter(chapterNum);
          if (chapterCards.length > 0) {
            chapters.push({
              chapterNumber: chapterNum,
              chapterTitle: chapterCards[0].chapterTitle,
              relevantTopics: [...new Set(chapterCards.flatMap(card => card.tags).slice(0, 3))]
            });
          }
        }
      }
    }

    return chapters;
  }

  // Adaptive learning system
  public updateLearningContext(query: string, performance: { correct: boolean; timeSpent: number; difficulty: string }): void {
    this.learningContext.recentQueries.push(query);
    if (this.learningContext.recentQueries.length > 20) {
      this.learningContext.recentQueries = this.learningContext.recentQueries.slice(-20);
    }

    // Track performance
    const topic = this.extractTopicFromQuery(query);
    if (topic) {
      this.learningContext.practiceScores[topic] = performance.correct ? 
        (this.learningContext.practiceScores[topic] || 0) + 1 : 
        Math.max(0, (this.learningContext.practiceScores[topic] || 0) - 1);

      // Update struggling/mastered topics
      if (this.learningContext.practiceScores[topic] >= 5) {
        this.learningContext.masteredTopics.push(topic);
        this.learningContext.strugglingAreas = this.learningContext.strugglingAreas.filter(t => t !== topic);
      } else if (this.learningContext.practiceScores[topic] <= -3) {
        this.learningContext.strugglingAreas.push(topic);
        this.learningContext.masteredTopics = this.learningContext.masteredTopics.filter(t => t !== topic);
      }
    }
  }

  private extractTopicFromQuery(query: string): string | null {
    const topicKeywords = [
      'cardiac', 'respiratory', 'neurologic', 'trauma', 'pediatric', 
      'obstetric', 'pharmacology', 'assessment', 'airway', 'circulation'
    ];
    
    const lowerQuery = query.toLowerCase();
    for (const keyword of topicKeywords) {
      if (lowerQuery.includes(keyword)) {
        return keyword;
      }
    }
    
    return null;
  }

  // Personalized study recommendations
  public getPersonalizedStudyPlan(): Array<{
    chapterNumber: number;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    estimatedTime: string;
  }> {
    const plan: Array<{ chapterNumber: number; priority: 'high' | 'medium' | 'low'; reason: string; estimatedTime: string }> = [];
    
    // High priority: struggling areas
    for (const area of this.learningContext.strugglingAreas) {
      const relevantChapters = this.findChaptersForTopic(area);
      for (const chapter of relevantChapters) {
        plan.push({
          chapterNumber: chapter,
          priority: 'high',
          reason: `Struggling with ${area} - needs focused review`,
          estimatedTime: '45-60 minutes'
        });
      }
    }
    
    // Medium priority: incomplete chapters
    for (let i = 1; i <= 41; i++) {
      if (!this.learningContext.completedChapters.includes(i)) {
        plan.push({
          chapterNumber: i,
          priority: 'medium',
          reason: 'Not yet completed',
          estimatedTime: '30-45 minutes'
        });
      }
    }
    
    // Low priority: mastered topics for review
    for (const area of this.learningContext.masteredTopics) {
      const relevantChapters = this.findChaptersForTopic(area);
      for (const chapter of relevantChapters.slice(0, 1)) { // Only one chapter per mastered topic
        plan.push({
          chapterNumber: chapter,
          priority: 'low',
          reason: `Review of mastered topic: ${area}`,
          estimatedTime: '15-20 minutes'
        });
      }
    }
    
    return plan.slice(0, 10); // Return top 10 recommendations
  }

  private findChaptersForTopic(topic: string): number[] {
    const topicChapterMap: { [key: string]: number[] } = {
      'cardiac': [17, 15],
      'respiratory': [16, 10],
      'neurologic': [20, 19],
      'trauma': [25, 26, 27, 28],
      'pediatric': [32, 33],
      'obstetric': [34, 35],
      'pharmacology': [13, 14],
      'assessment': [11, 12],
      'airway': [10],
      'circulation': [15]
    };
    
    return topicChapterMap[topic] || [];
  }
}

// Export the enhanced recommendation engine
export const enhancedAIEngine = new EnhancedAIRecommendationEngine();

// Export types for use in other components
export type {
  PatientPresentation,
  EnhancedRecommendation,
  LearningContext,
  ClinicalDecisionNode
};
