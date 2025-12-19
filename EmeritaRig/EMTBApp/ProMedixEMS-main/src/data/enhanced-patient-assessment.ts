// Enhanced Patient Assessment Practice Module with Interactive Scenarios
// State-of-the-art features: Real-time feedback, adaptive scenarios, performance analytics

import { NATIONAL_PROTOCOL_FOUNDATION, type NationalProtocol } from './national-protocols';

export interface AssessmentScenario {
  id: string;
  title: string;
  type: 'medical' | 'trauma' | 'pediatric' | 'geriatric' | 'behavioral';
  difficulty: 'novice' | 'advanced-beginner' | 'competent' | 'proficient' | 'expert';
  estimatedTime: number; // minutes
  description: string;
  setting: string;
  
  // Initial presentation
  initialPresentation: {
    dispatch: string;
    sceneDescription: string;
    patientPosition: string;
    obviousInjuries: string[];
    environmentalHazards: string[];
  };
  
  // Patient data
  patient: {
    age: number;
    sex: 'male' | 'female' | 'non-binary';
    appearance: string;
    mentalStatus: 'alert' | 'verbal' | 'painful' | 'unresponsive';
    chiefComplaint: string;
  };
  
  // Assessment findings (revealed through proper assessment steps)
  assessmentFindings: {
    primary: {
      airway: AssessmentFinding;
      breathing: AssessmentFinding;
      circulation: AssessmentFinding;
      disability: AssessmentFinding;
      exposure: AssessmentFinding;
    };
    vitals: {
      pulse: AssessmentFinding;
      bloodPressure: AssessmentFinding;
      respirations: AssessmentFinding;
      temperature: AssessmentFinding;
      oxygenSaturation: AssessmentFinding;
      bloodGlucose?: AssessmentFinding;
    };
    secondary: {
      head: AssessmentFinding;
      neck: AssessmentFinding;
      chest: AssessmentFinding;
      abdomen: AssessmentFinding;
      pelvis: AssessmentFinding;
      extremities: AssessmentFinding;
      posterior: AssessmentFinding;
    };
    history: {
      sample: SAMPLEHistory;
      opqrst?: OPQRSTAssessment;
    };
  };
  
  // Dynamic elements that change based on interventions
  complications?: ScenarioComplication[];
  interventionResponses: { [intervention: string]: InterventionResponse };
  
  // Learning objectives and assessment criteria
  learningObjectives: string[];
  criticalActions: string[];
  commonMistakes: string[];
  expertTips: string[];
}

export interface AssessmentFinding {
  normal: string;
  abnormal?: string;
  critical?: string;
  requiresIntervention?: boolean;
  interventionRequired?: string;
  timeToReveal?: number; // seconds for progressive revelation
}

export interface SAMPLEHistory {
  signs: string[];
  allergies: string[];
  medications: string[];
  pastHistory: string[];
  lastOralIntake: string;
  events: string;
}

export interface OPQRSTAssessment {
  onset: string;
  provocation: string;
  quality: string;
  radiation: string;
  severity: number; // 1-10 scale
  timing: string;
}

export interface ScenarioComplication {
  id: string;
  trigger: string; // What action triggers this
  timeDelay: number; // Seconds after trigger
  description: string;
  newFindings: { [area: string]: string };
  urgency: 'low' | 'moderate' | 'high' | 'critical';
}

export interface InterventionResponse {
  success: string;
  failure: string;
  partialSuccess?: string;
  physiologicalChange?: { [parameter: string]: string };
}

// Assessment Step Templates for Interactive Practice
export interface AssessmentStepTemplate {
  id: string;
  category: 'scene-size-up' | 'primary' | 'secondary' | 'history' | 'vitals' | 'interventions' | 'reassessment';
  name: string;
  description: string;
  requiredActions: AssessmentAction[];
  timeLimit?: number; // seconds
  prerequisites?: string[]; // IDs of steps that must be completed first
  criticalForSuccess: boolean;
}

export interface AssessmentAction {
  id: string;
  text: string;
  type: 'observation' | 'physical-exam' | 'question' | 'intervention' | 'measurement';
  bodyPart?: string;
  technique?: string;
  expectedResponse: string;
  points: number;
  critical?: boolean;
  alternativeAcceptableActions?: string[];
}

// Scenario Bank - Progressive difficulty with adaptive features
const baseAssessmentScenarios: AssessmentScenario[] = [
  {
    id: 'medical-001',
    title: 'Chest Pain Emergency',
    type: 'medical',
    difficulty: 'advanced-beginner',
    estimatedTime: 15,
    description: 'Adult patient experiencing acute chest pain with classic presentation',
    setting: 'Private residence, second floor apartment',
    
    initialPresentation: {
      dispatch: 'Respond Code 2 for 58-year-old male, conscious, breathing, chest pain',
      sceneDescription: 'Well-lit living room, patient sitting on couch, family member present',
      patientPosition: 'Sitting upright, leaning forward slightly',
      obviousInjuries: [],
      environmentalHazards: ['Narrow stairway access', 'Small elevator in building']
    },
    
    patient: {
      age: 58,
      sex: 'male',
      appearance: 'Well-dressed, overweight, diaphoretic, appears anxious',
      mentalStatus: 'alert',
      chiefComplaint: 'Severe chest pain that started 45 minutes ago'
    },
    
    assessmentFindings: {
      primary: {
        airway: {
          normal: 'Patent airway, speaking in full sentences',
          timeToReveal: 2
        },
        breathing: {
          normal: 'Respirations appear slightly labored, 20/min',
          abnormal: 'Using accessory muscles slightly',
          timeToReveal: 5
        },
        circulation: {
          normal: 'Pulse palpable at radial, strong and regular',
          abnormal: 'Skin cool and diaphoretic',
          requiresIntervention: true,
          interventionRequired: 'Consider aspirin, oxygen, nitroglycerin',
          timeToReveal: 3
        },
        disability: {
          normal: 'Alert and oriented x4, no neurological deficits noted',
          timeToReveal: 4
        },
        exposure: {
          normal: 'No obvious trauma or additional injuries visible',
          timeToReveal: 2
        }
      },
      
      vitals: {
        pulse: {
          normal: '92 bpm, strong and regular',
          timeToReveal: 8
        },
        bloodPressure: {
          normal: '156/94 mmHg',
          abnormal: 'Elevated pressure may indicate hypertension',
          timeToReveal: 12
        },
        respirations: {
          normal: '20/min, slightly labored',
          timeToReveal: 6
        },
        temperature: {
          normal: '98.4°F (36.9°C)',
          timeToReveal: 10
        },
        oxygenSaturation: {
          normal: '94% on room air',
          abnormal: 'Slightly low, may benefit from supplemental oxygen',
          requiresIntervention: true,
          interventionRequired: 'Apply high-flow oxygen',
          timeToReveal: 8
        }
      },
      
      secondary: {
        head: {
          normal: 'No trauma, PERRL, no jugular vein distention',
          timeToReveal: 15
        },
        neck: {
          normal: 'No tracheal deviation, no lymphadenopathy',
          timeToReveal: 16
        },
        chest: {
          normal: 'Equal bilateral chest rise, clear lung sounds bilaterally',
          abnormal: 'Patient reports crushing substernal pain radiating to left arm',
          timeToReveal: 12
        },
        abdomen: {
          normal: 'Soft, non-tender, no masses palpated',
          timeToReveal: 18
        },
        pelvis: {
          normal: 'Stable, no tenderness',
          timeToReveal: 20
        },
        extremities: {
          normal: 'No deformities, pulses present bilaterally',
          abnormal: 'Slight weakness in left arm during pain episodes',
          timeToReveal: 22
        },
        posterior: {
          normal: 'No spinal tenderness, no obvious injury',
          timeToReveal: 25
        }
      },
      
      history: {
        sample: {
          signs: ['Chest pain', 'Diaphoresis', 'Slight shortness of breath', 'Nausea'],
          allergies: ['NKDA'],
          medications: ['Lisinopril 10mg daily', 'Metformin 500mg BID'],
          pastHistory: ['Hypertension', 'Type 2 diabetes', 'Father died of MI at age 60'],
          lastOralIntake: 'Coffee and toast 2 hours ago',
          events: 'Watching TV when pain started suddenly, described as crushing'
        },
        opqrst: {
          onset: 'Sudden, 45 minutes ago while watching television',
          provocation: 'Nothing makes it better, movement makes it slightly worse',
          quality: 'Crushing, squeezing pressure',
          radiation: 'Radiates to left arm and jaw',
          severity: 8,
          timing: 'Constant since onset, not improving'
        }
      }
    },
    
    complications: [
      {
        id: 'deterioration-001',
        trigger: 'no-oxygen-in-10-minutes',
        timeDelay: 600,
        description: 'Patient becomes more short of breath',
        newFindings: {
          breathing: 'Respirations now 24/min, more labored',
          oxygenSaturation: 'Now 91% on room air'
        },
        urgency: 'high'
      }
    ],
    
    interventionResponses: {
      'oxygen-administration': {
        success: 'Patient reports slight improvement in breathing, SpO2 improves to 98%',
        failure: 'No equipment available or improper application'
      },
      'aspirin-administration': {
        success: 'Patient states no immediate change in pain but treatment appropriate',
        failure: 'Patient reports aspirin allergy - check history first'
      },
      'nitroglycerin-assistance': {
        success: 'Pain decreases from 8/10 to 6/10, blood pressure drops to 142/88',
        failure: 'Patient does not have prescribed nitroglycerin'
      }
    },
    
    learningObjectives: [
      'Perform systematic primary assessment for medical emergency',
      'Recognize signs and symptoms of acute coronary syndrome',
      'Appropriately obtain SAMPLE history and OPQRST pain assessment',
      'Demonstrate proper vital sign measurement techniques',
      'Make appropriate transport decisions for cardiac emergency'
    ],
    
    criticalActions: [
      'Ensure scene safety and don appropriate PPE',
      'Assess and maintain airway, breathing, circulation',
      'Apply supplemental oxygen',
      'Obtain complete set of vital signs',
      'Complete SAMPLE history and OPQRST assessment',
      'Consider aspirin administration per protocol',
      'Make prompt transport decision'
    ],
    
    commonMistakes: [
      'Failing to assess oxygen saturation',
      'Not completing full OPQRST assessment',
      'Overlooking family history of cardiac disease',
      'Inadequate pain scale documentation',
      'Delayed transport decision'
    ],
    
    expertTips: [
      'Always assess oxygen saturation in chest pain patients',
      'Family history is crucial for risk stratification',
      'Document exact quotes for pain description',
      'Monitor for changes during transport',
      'Communicate clearly with receiving facility'
    ]
  },
  
  {
    id: 'trauma-001',
    title: 'Motor Vehicle Collision',
    type: 'trauma',
    difficulty: 'competent',
    estimatedTime: 18,
    description: 'Single-vehicle collision with conscious driver, mechanism suggests possible injuries',
    setting: 'Two-lane highway, single vehicle vs. tree, daylight hours',
    
    initialPresentation: {
      dispatch: 'Code 3 response, motor vehicle vs. tree, one patient conscious and breathing',
      sceneDescription: 'Vehicle front-end damage, airbag deployed, patient still in driver seat',
      patientPosition: 'Sitting in driver seat, restrained by seatbelt',
      obviousInjuries: ['Facial lacerations from airbag', 'Steering wheel deformity'],
      environmentalHazards: ['Traffic hazard', 'Possible fuel leak', 'Broken glass']
    },
    
    patient: {
      age: 34,
      sex: 'female',
      appearance: 'Alert but shaken, minor bleeding from face',
      mentalStatus: 'alert',
      chiefComplaint: 'Neck and chest pain, asks about her car'
    },
    
    assessmentFindings: {
      primary: {
        airway: {
          normal: 'Airway patent, speaking clearly',
          abnormal: 'Small amount of blood in mouth from lip laceration',
          timeToReveal: 2
        },
        breathing: {
          normal: 'Breathing appears adequate',
          abnormal: 'Reports chest pain with deep inspiration',
          requiresIntervention: true,
          interventionRequired: 'Spinal immobilization, oxygen',
          timeToReveal: 4
        },
        circulation: {
          normal: 'Pulse present, skin warm and dry',
          abnormal: 'Minor facial bleeding controlled',
          timeToReveal: 3
        },
        disability: {
          normal: 'Alert and oriented x4',
          abnormal: 'Reports neck pain and stiffness',
          requiresIntervention: true,
          interventionRequired: 'Cervical spine immobilization',
          timeToReveal: 5
        },
        exposure: {
          normal: 'No obvious major injuries visible',
          abnormal: 'Seatbelt mark across chest',
          timeToReveal: 6
        }
      },
      
      vitals: {
        pulse: {
          normal: '88 bpm, strong and regular',
          timeToReveal: 10
        },
        bloodPressure: {
          normal: '124/78 mmHg',
          timeToReveal: 15
        },
        respirations: {
          normal: '16/min, adequate depth',
          abnormal: 'Slight splinting due to chest pain',
          timeToReveal: 8
        },
        temperature: {
          normal: '98.6°F (37°C)',
          timeToReveal: 12
        },
        oxygenSaturation: {
          normal: '98% on room air',
          timeToReveal: 10
        }
      },
      
      secondary: {
        head: {
          normal: 'PERRL, no skull deformity',
          abnormal: 'Small laceration on forehead, minor hematoma',
          timeToReveal: 18
        },
        neck: {
          normal: 'No obvious deformity',
          abnormal: 'Tenderness to palpation of cervical spine',
          requiresIntervention: true,
          interventionRequired: 'Maintain cervical spine immobilization',
          timeToReveal: 20
        },
        chest: {
          normal: 'Equal bilateral expansion',
          abnormal: 'Tenderness over sternum, seatbelt mark visible',
          timeToReveal: 22
        },
        abdomen: {
          normal: 'Soft, non-distended',
          abnormal: 'Mild tenderness with seatbelt mark',
          timeToReveal: 25
        },
        pelvis: {
          normal: 'Stable to gentle pressure',
          timeToReveal: 28
        },
        extremities: {
          normal: 'No deformities, good distal pulses',
          abnormal: 'Minor abrasions on hands from airbag',
          timeToReveal: 30
        },
        posterior: {
          normal: 'No spinal step-offs or deformity when log-rolled',
          timeToReveal: 35
        }
      },
      
      history: {
        sample: {
          signs: ['Neck pain', 'Chest pain', 'Facial lacerations', 'Headache'],
          allergies: ['Penicillin'],
          medications: ['Birth control pills'],
          pastHistory: ['No significant medical history'],
          lastOralIntake: 'Lunch 3 hours ago',
          events: 'Swerved to avoid deer, lost control, hit tree at approximately 35 mph'
        }
      }
    },
    
    interventionResponses: {
      'cervical-stabilization': {
        success: 'Patient reports feeling more secure, maintains alignment',
        failure: 'Inadequate immobilization may worsen injury'
      },
      'oxygen-administration': {
        success: 'Patient breathing becomes less labored',
        failure: 'No improvement if oxygen not indicated'
      },
      'spinal-immobilization': {
        success: 'Patient properly secured to backboard, reports comfort',
        failure: 'Improper technique causes increased pain'
      }
    },
    
    learningObjectives: [
      'Perform systematic trauma assessment',
      'Recognize need for spinal immobilization',
      'Assess mechanism of injury for hidden injuries',
      'Properly perform secondary assessment',
      'Make appropriate trauma transport decisions'
    ],
    
    criticalActions: [
      'Scene safety assessment including traffic control',
      'Cervical spine stabilization',
      'Primary assessment with exposure',
      'Spinal immobilization',
      'Complete secondary assessment',
      'Rapid transport decision based on mechanism'
    ],
    
    commonMistakes: [
      'Inadequate spinal immobilization',
      'Missing mechanism-based injuries',
      'Insufficient exposure for assessment',
      'Delayed transport for minor injuries',
      'Poor documentation of mechanism'
    ],
    
    expertTips: [
      'High-speed collision warrants trauma center',
      'Seatbelt marks indicate significant force',
      'Always assess for internal injuries with chest pain',
      'Document exact mechanism for hospital',
      'Consider air transport for rural locations'
    ]
  },
  {
    id: 'medical-002',
    title: 'Acute Ischemic Stroke',
    type: 'medical',
    difficulty: 'competent',
    estimatedTime: 16,
    description: 'Adult patient with sudden onset unilateral weakness and speech difficulty',
    setting: 'Single-story home, living room, afternoon',
    initialPresentation: {
      dispatch: 'Code 2; 68-year-old female with facial droop and slurred speech',
      sceneDescription: 'Patient seated on sofa, family member present providing history',
      patientPosition: 'Sitting upright, leaning to right side',
      obviousInjuries: [],
      environmentalHazards: []
    },
    patient: {
      age: 68,
      sex: 'female',
      appearance: 'Awake, anxious, mild right-sided facial droop',
      mentalStatus: 'verbal',
      chiefComplaint: 'Sudden weakness in right arm and difficulty speaking'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent, managing own secretions', timeToReveal: 2 },
        breathing: { normal: '16/min, equal chest rise', timeToReveal: 4 },
        circulation: { normal: 'Radial pulse present, skin warm', abnormal: 'BP elevated', timeToReveal: 5 },
        disability: {
          normal: 'Alert to person and place',
          abnormal: 'Difficulty forming words, right arm drift',
          requiresIntervention: true,
          interventionRequired: 'Rapid stroke assessment & transport',
          timeToReveal: 6
        },
        exposure: { normal: 'No trauma or additional findings', timeToReveal: 3 }
      },
      vitals: {
        pulse: { normal: '82 bpm, regular', timeToReveal: 7 },
        bloodPressure: {
          normal: '178/96 mmHg',
          abnormal: 'Hypertensive range supports stroke suspicion',
          timeToReveal: 9
        },
        respirations: { normal: '16/min, non-labored', timeToReveal: 8 },
        temperature: { normal: '98.1°F (36.7°C)', timeToReveal: 10 },
        oxygenSaturation: {
          normal: '95% on room air',
          requiresIntervention: false,
          timeToReveal: 8
        },
        bloodGlucose: { normal: '112 mg/dL', timeToReveal: 11 }
      },
      secondary: {
        head: { normal: 'Facial droop on right, pupils equal', timeToReveal: 12 },
        neck: { normal: 'No JVD, trachea midline', timeToReveal: 13 },
        chest: { normal: 'Clear lung sounds bilaterally', timeToReveal: 14 },
        abdomen: { normal: 'Soft, non-tender', timeToReveal: 15 },
        pelvis: { normal: 'Stable, no tenderness', timeToReveal: 15 },
        extremities: {
          normal: 'Weak grip on right, strong on left',
          abnormal: 'Right arm pronator drift',
          timeToReveal: 16
        },
        posterior: { normal: 'No abnormalities', timeToReveal: 18 }
      },
      history: {
        sample: {
          signs: ['Right facial droop', 'Slurred speech', 'Arm weakness'],
          allergies: ['NKDA'],
          medications: ['Lisinopril', 'Atorvastatin'],
          pastHistory: ['Hypertension', 'Atrial fibrillation (no anticoagulant due to recent surgery)'],
          lastOralIntake: 'Lunch 1 hour ago',
          events: 'Symptoms began 20 minutes prior while watching television'
        },
        opqrst: {
          onset: 'Abrupt, witnessed by spouse',
          provocation: 'No relieving/aggravating factors',
          quality: 'Numbness and heaviness',
          radiation: 'Localized to right side',
          severity: 6,
          timing: 'Constant since onset'
        }
      }
    },
    interventionResponses: {
      'stroke-alert': {
        success: 'Hospital stroke team activated, door-to-needle time improved',
        failure: 'Delayed notification results in longer CT and thrombolytic activation'
      },
      'oxygen-administration': {
        success: 'SpO2 improves to 99%, patient reports easier breathing',
        failure: 'No effect if applied at high concentrations without hypoxia'
      }
    },
    learningObjectives: [
      'Perform Cincinnati/FAST stroke assessment accurately',
      'Differentiate stroke from hypoglycemia using point-of-care glucose',
      'Prioritize rapid transport to stroke center',
      'Communicate last known well time and neurologic findings'
    ],
    criticalActions: [
      'Establish last known well time',
      'Perform focused neurologic assessment',
      'Check blood glucose to rule out hypoglycemia',
      'Initiate rapid transport to stroke-capable facility'
    ],
    commonMistakes: [
      'Failing to obtain last-known-well time',
      'Delaying transport for non-critical interventions',
      'Not reassessing neurologic deficits en route',
      'Omitting stroke alert notification'
    ],
    expertTips: [
      'Document exact phrases used by caregivers for time of onset',
      'Use arm drift and speech pattern to trend changes en route',
      'Keep head of stretcher elevated 30 degrees if tolerated',
      'Provide advance report with stroke scale findings'
    ]
  },
  {
    id: 'medical-003',
    title: 'Symptomatic Hypoglycemia',
    type: 'medical',
    difficulty: 'advanced-beginner',
    estimatedTime: 12,
    description: 'Young adult with altered mental status related to diabetes management',
    setting: 'Coffee shop, busy afternoon crowd',
    initialPresentation: {
      dispatch: 'Code 2; 24-year-old male, confused and diaphoretic',
      sceneDescription: 'Patient seated at table, friends nearby, EMS has clear access',
      patientPosition: 'Sitting, slumped forward',
      obviousInjuries: [],
      environmentalHazards: ['Hot beverages on table']
    },
    patient: {
      age: 24,
      sex: 'male',
      appearance: 'Pale, diaphoretic, sluggish responses',
      mentalStatus: 'painful',
      chiefComplaint: 'Unable to articulate; friends report "low blood sugar"'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Maintains airway with prompting', timeToReveal: 2 },
        breathing: { normal: '18/min, adequate volume', timeToReveal: 3 },
        circulation: {
          normal: 'Radial pulse rapid',
          abnormal: 'Skin cool, clammy',
          requiresIntervention: true,
          interventionRequired: 'Immediate glucose administration',
          timeToReveal: 4
        },
        disability: {
          normal: 'Responds to pain',
          abnormal: 'Disoriented, slurred speech',
          timeToReveal: 4
        },
        exposure: { normal: 'No trauma noted', timeToReveal: 5 }
      },
      vitals: {
        pulse: { normal: '112 bpm, rapid', timeToReveal: 6 },
        bloodPressure: { normal: '118/70 mmHg', timeToReveal: 7 },
        respirations: { normal: '18/min', timeToReveal: 6 },
        temperature: { normal: '97.9°F (36.6°C)', timeToReveal: 8 },
        oxygenSaturation: { normal: '98% on room air', timeToReveal: 7 },
        bloodGlucose: {
          normal: '42 mg/dL',
          abnormal: 'Critically low value requiring treatment',
          requiresIntervention: true,
          interventionRequired: 'Oral glucose or IV dextrose',
          timeToReveal: 5
        }
      },
      secondary: {
        head: { normal: 'No trauma, pupils equal', timeToReveal: 10 },
        neck: { normal: 'Trachea midline, no JVD', timeToReveal: 11 },
        chest: { normal: 'Clear lung sounds', timeToReveal: 11 },
        abdomen: { normal: 'Soft, non-tender', timeToReveal: 12 },
        pelvis: { normal: 'Stable, no tenderness', timeToReveal: 12 },
        extremities: { normal: 'Fine tremors in hands', timeToReveal: 13 },
        posterior: { normal: 'No injuries', timeToReveal: 14 }
      },
      history: {
        sample: {
          signs: ['Diaphoresis', 'Confusion'],
          allergies: ['Penicillin'],
          medications: ['Insulin pump', 'Metformin'],
          pastHistory: ['Type 1 diabetes since age 12'],
          lastOralIntake: 'Skipped breakfast, only coffee',
          events: 'Insulin pump delivered bolus without food intake'
        },
        opqrst: {
          onset: 'Gradual over 20 minutes',
          provocation: 'Improves briefly with juice',
          quality: 'Dizziness and tunnel vision',
          radiation: 'No radiation',
          severity: 7,
          timing: 'Worsening before EMS arrival'
        }
      }
    },
    interventionResponses: {
      'oral-glucose': {
        success: 'Mental status improves to alert within 5 minutes',
        failure: 'Aspirates if airway not protected'
      },
      'iv-dextrose': {
        success: 'Rapid improvement, blood glucose rises above 100 mg/dL',
        failure: 'Infiltration causes tissue irritation'
      }
    },
    learningObjectives: [
      'Differentiate hypoglycemia from other causes of AMS',
      'Safely administer oral glucose when patient can protect airway',
      'Coordinate IV access for dextrose when indicated',
      'Provide post-treatment dietary coaching and transport considerations'
    ],
    criticalActions: [
      'Obtain finger-stick glucose early',
      'Ensure airway protection during glucose administration',
      'Reassess mental status post intervention',
      'Document response and transport decision'
    ],
    commonMistakes: [
      'Delaying glucose check',
      'Giving oral glucose when patient cannot swallow',
      'Failing to reassess glucose after treatment',
      'Declining transport without full recovery'
    ],
    expertTips: [
      'Ask about insulin pump settings and recent boluses',
      'Carry glucose gel for rapid administration',
      'Encourage meal follow-up within 30 minutes',
      'Document exact glucose values pre and post treatment'
    ]
  },
  {
    id: 'trauma-002',
    title: 'Fall from Construction Scaffold',
    type: 'trauma',
    difficulty: 'proficient',
    estimatedTime: 20,
    description: 'Middle-aged male falls 15 feet with suspected pelvic injury',
    setting: 'Construction site with uneven terrain and equipment present',
    initialPresentation: {
      dispatch: 'Code 3; 45-year-old male fell from scaffold, conscious',
      sceneDescription: 'Active construction site, scaffold collapsed, coworkers assisting',
      patientPosition: 'Supine on ground, immobilized by coworkers',
      obviousInjuries: ['Deformity left leg', 'Bleeding from scalp abrasion'],
      environmentalHazards: ['Loose debris', 'Tools on ground', 'Potential falling materials']
    },
    patient: {
      age: 45,
      sex: 'male',
      appearance: 'Anxious, pale, moaning in pain',
      mentalStatus: 'verbal',
      chiefComplaint: 'Severe pelvic and left leg pain'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent, speaking in short sentences', timeToReveal: 2 },
        breathing: {
          normal: '24/min, shallow',
          abnormal: 'Complains of pain with inspiration',
          requiresIntervention: true,
          interventionRequired: 'High-flow oxygen, consider assisted ventilations if decompensating',
          timeToReveal: 4
        },
        circulation: {
          normal: 'Radial pulse weak',
          abnormal: 'Skin cool, clammy, suspected pelvic bleed',
          requiresIntervention: true,
          interventionRequired: 'Pelvic stabilization, rapid transport',
          timeToReveal: 4
        },
        disability: {
          normal: 'Alert and oriented x3',
          abnormal: 'Reports numbness in left foot',
          timeToReveal: 5
        },
        exposure: {
          normal: 'Multiple abrasions',
          abnormal: 'Instability at pelvis, obvious deformity lower limb',
          timeToReveal: 6
        }
      },
      vitals: {
        pulse: {
          normal: '122 bpm, weak',
          abnormal: 'Tachycardic due to hypovolemia',
          timeToReveal: 7
        },
        bloodPressure: {
          normal: '96/58 mmHg',
          abnormal: 'Hypotensive; consider internal bleeding',
          timeToReveal: 8
        },
        respirations: { normal: '24/min, shallow', timeToReveal: 7 },
        temperature: { normal: '97.6°F (36.4°C)', timeToReveal: 9 },
        oxygenSaturation: {
          normal: '93% on room air',
          requiresIntervention: true,
          interventionRequired: 'Supplemental oxygen',
          timeToReveal: 7
        }
      },
      secondary: {
        head: { normal: 'Scalp abrasion with controlled bleeding', timeToReveal: 11 },
        neck: {
          normal: 'No deformity',
          abnormal: 'Reports neck soreness, maintain c-spine',
          requiresIntervention: true,
          interventionRequired: 'C-spine immobilization',
          timeToReveal: 11
        },
        chest: { normal: 'Clear lung sounds, tenderness over ribs', timeToReveal: 12 },
        abdomen: { normal: 'Soft but tender in lower quadrants', timeToReveal: 12 },
        pelvis: {
          normal: 'Unstable with crepitus',
          abnormal: 'Suspected pelvic fracture',
          requiresIntervention: true,
          interventionRequired: 'Pelvic binder',
          timeToReveal: 13
        },
        extremities: {
          normal: 'Left leg shortened and externally rotated',
          abnormal: 'Absent pedal pulse left foot initially',
          timeToReveal: 14
        },
        posterior: { normal: 'No step-offs, abrasions along back', timeToReveal: 15 }
      },
      history: {
        sample: {
          signs: ['Pelvic instability', 'Hypotension', 'Tachycardia'],
          allergies: ['NKDA'],
          medications: ['Ibuprofen PRN'],
          pastHistory: ['No significant history'],
          lastOralIntake: 'Lunch 2 hours ago',
          events: 'Scaffold board snapped, patient fell with partial rotation'
        }
      }
    },
    interventionResponses: {
      'pelvic-binder': {
        success: 'Stabilizes pelvis, improves blood pressure slightly',
        failure: 'Improper placement causes increased pain and minimal stabilization'
      },
      'rapid-transport': {
        success: 'Patient arrives at trauma center with minimal delay',
        failure: 'On-scene delays worsen hemorrhagic shock'
      }
    },
    learningObjectives: [
      'Identify life-threatening injuries from high-mechanism falls',
      'Prioritize pelvic stabilization and rapid transport',
      'Coordinate with rescue for safe extrication on uneven terrain',
      'Monitor perfusion status continuously during transport'
    ],
    criticalActions: [
      'Manual c-spine stabilization on arrival',
      'Apply pelvic binder promptly',
      'Control external bleeding and reassess pulses',
      'Declare trauma alert and expedite transport'
    ],
    commonMistakes: [
      'Delaying binder application until transport',
      'Failing to reassess distal pulses after immobilization',
      'Allowing hypothermia during prolonged extrication',
      'Not documenting mechanism details sufficiently'
    ],
    expertTips: [
      'Use scoop stretcher to minimize movement',
      'Pad binder contact points to avoid pressure sores',
      'Assign team member to monitor mental status continuously',
      'Communicate pelvic instability to receiving hospital early'
    ]
  },
  {
    id: 'pediatric-001',
    title: 'Pediatric Febrile Seizure',
    type: 'pediatric',
    difficulty: 'advanced-beginner',
    estimatedTime: 10,
    description: 'Toddler with generalized seizure activity and fever',
    setting: 'Second-floor apartment, concerned parent present',
    initialPresentation: {
      dispatch: 'Code 2; 3-year-old with active seizure, fever reported',
      sceneDescription: 'Child on couch postictal, mother nearby, apartment warm',
      patientPosition: 'Supine, recovering from seizure',
      obviousInjuries: [],
      environmentalHazards: ['Limited space for equipment']
    },
    patient: {
      age: 3,
      sex: 'female',
      appearance: 'Drowsy, flushed cheeks',
      mentalStatus: 'verbal',
      chiefComplaint: 'Mother reports shaking episode lasting 90 seconds'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent, no obstruction', timeToReveal: 2 },
        breathing: { normal: '24/min, clear lungs', timeToReveal: 3 },
        circulation: {
          normal: 'Pulse strong',
          abnormal: 'Skin hot to touch',
          timeToReveal: 3
        },
        disability: {
          normal: 'Postictal but arousable to voice',
          timeToReveal: 4
        },
        exposure: { normal: 'No trauma, diaper dry', timeToReveal: 4 }
      },
      vitals: {
        pulse: { normal: '126 bpm', timeToReveal: 5 },
        bloodPressure: { normal: '96/60 mmHg', timeToReveal: 6 },
        respirations: { normal: '24/min', timeToReveal: 5 },
        temperature: {
          normal: '103.2°F (39.6°C)',
          abnormal: 'High fever precipitating seizure',
          timeToReveal: 6
        },
        oxygenSaturation: { normal: '99% on room air', timeToReveal: 5 }
      },
      secondary: {
        head: { normal: 'Tympanic membranes mildly erythematous', timeToReveal: 8 },
        neck: { normal: 'Supple, no nuchal rigidity', timeToReveal: 8 },
        chest: { normal: 'No retractions, lungs clear', timeToReveal: 9 },
        abdomen: { normal: 'Soft, active bowel sounds', timeToReveal: 9 },
        pelvis: { normal: 'Stable', timeToReveal: 9 },
        extremities: { normal: 'No swelling, warm', timeToReveal: 10 },
        posterior: { normal: 'No rash or trauma', timeToReveal: 10 }
      },
      history: {
        sample: {
          signs: ['High fever', 'Recent seizure'],
          allergies: ['None'],
          medications: ['Acetaminophen given 2 hours ago'],
          pastHistory: ['Previous febrile seizure at age 2'],
          lastOralIntake: 'Juice 30 minutes ago',
          events: 'Fever since morning, seizure occurred suddenly during nap'
        }
      }
    },
    interventionResponses: {
      'cooling-measures': {
        success: 'Temperature reduced gradually with tepid cloths',
        failure: 'Aggressive cooling causes shivering and discomfort'
      },
      'antipyretic-assist': {
        success: 'Parent instructed to administer appropriate dosing per pediatrician',
        failure: 'Overdose risk if dosing not verified'
      }
    },
    learningObjectives: [
      'Manage postictal pediatric patient airway and breathing',
      'Educate caregivers on febrile seizure course',
      'Coordinate transport while monitoring fever control',
      'Document seizure duration and characteristics'
    ],
    criticalActions: [
      'Ensure airway patency and position child on side if vomiting',
      'Assess temperature and manage fever safely',
      'Gather accurate seizure timeline from caregiver',
      'Advise transport for evaluation despite seizure resolution'
    ],
    commonMistakes: [
      'Applying ice packs directly to skin',
      'Assuming seizure indicates epilepsy without full assessment',
      'Not calming caregiver or providing education',
      'Leaving child unattended during transport preparation'
    ],
    expertTips: [
      'Encourage caregiver to bring medication bottles to hospital',
      'Explain typical benign nature to reduce anxiety',
      'Monitor for recurrence en route',
      'Document fever management interventions carefully'
    ]
  },
  {
    id: 'geriatric-001',
    title: 'Congestive Heart Failure Exacerbation',
    type: 'geriatric',
    difficulty: 'competent',
    estimatedTime: 17,
    description: 'Elderly patient with orthopnea and peripheral edema',
    setting: 'Assisted living facility bedroom',
    initialPresentation: {
      dispatch: 'Code 2; 82-year-old male with respiratory distress',
      sceneDescription: 'Patient sitting upright in bed, oxygen tubing nearby',
      patientPosition: 'Tripoding, using accessory muscles',
      obviousInjuries: [],
      environmentalHazards: []
    },
    patient: {
      age: 82,
      sex: 'male',
      appearance: 'Cyanotic lips, anxious',
      mentalStatus: 'verbal',
      chiefComplaint: 'Severe shortness of breath and chest tightness'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent but speaking in short sentences', timeToReveal: 2 },
        breathing: {
          normal: '28/min, labored',
          abnormal: 'Crackles audible without stethoscope',
          requiresIntervention: true,
          interventionRequired: 'CPAP and high-flow oxygen',
          timeToReveal: 3
        },
        circulation: {
          normal: 'Weak radial pulses',
          abnormal: 'Peripheral edema present, JVD noted',
          requiresIntervention: true,
          interventionRequired: 'Nitroglycerin if BP allows',
          timeToReveal: 4
        },
        disability: { normal: 'Alert but fatigued', timeToReveal: 4 },
        exposure: { normal: 'No trauma, significant ankle edema', timeToReveal: 5 }
      },
      vitals: {
        pulse: { normal: '110 bpm, irregularly irregular', timeToReveal: 6 },
        bloodPressure: { normal: '162/96 mmHg', timeToReveal: 6 },
        respirations: { normal: '28/min', timeToReveal: 6 },
        temperature: { normal: '98.0°F (36.6°C)', timeToReveal: 7 },
        oxygenSaturation: {
          normal: '88% on nasal cannula 2 L/min',
          requiresIntervention: true,
          interventionRequired: 'Increase oxygen delivery',
          timeToReveal: 5
        }
      },
      secondary: {
        head: { normal: 'No trauma, cyanotic lips', timeToReveal: 8 },
        neck: { normal: 'Jugular venous distention at 45°', timeToReveal: 8 },
        chest: {
          normal: 'Crackles mid-to-lower lung fields',
          abnormal: 'Possible wheezes indicating cardiac asthma',
          timeToReveal: 9
        },
        abdomen: { normal: 'Soft, mildly distended', timeToReveal: 9 },
        pelvis: { normal: 'Stable', timeToReveal: 9 },
        extremities: {
          normal: 'Pitting edema +2 in ankles',
          timeToReveal: 10
        },
        posterior: { normal: 'Lung sounds diminished at bases', timeToReveal: 10 }
      },
      history: {
        sample: {
          signs: ['Dyspnea', 'Peripheral edema'],
          allergies: ['Sulfa drugs'],
          medications: ['Lasix', 'Lisinopril', 'Metoprolol', 'Nitroglycerin'],
          pastHistory: ['Chronic CHF', 'Atrial fibrillation'],
          lastOralIntake: 'Small dinner 2 hours prior',
          events: 'Missed diuretic dose yesterday, increased fluid intake'
        }
      }
    },
    interventionResponses: {
      'cpap-initiation': {
        success: 'SpO2 improves to 95%, work of breathing decreases',
        failure: 'Patient becomes fatigued if pressure too high'
      },
      'nitroglycerin-administration': {
        success: 'Blood pressure decreases slightly, chest tightness relieved',
        failure: 'Contraindicated if recent PDE inhibitor use'
      }
    },
    learningObjectives: [
      'Recognize CHF exacerbation signs quickly',
      'Apply CPAP safely and monitor tolerance',
      'Assess medication compliance impacts',
      'Coordinate ALS intercept for IV diuretics when indicated'
    ],
    criticalActions: [
      'Initiate CPAP with appropriate PEEP',
      'Administer nitroglycerin if no contraindications',
      'Monitor lung sounds and vitals frequently',
      'Prepare for rapid transport to cardiac-capable facility'
    ],
    commonMistakes: [
      'Delaying CPAP application',
      'Failing to check for PDE inhibitor use',
      'Overlooking fluid overload cues',
      'Inadequate blood pressure monitoring on nitro'
    ],
    expertTips: [
      'Use humidified oxygen when possible for comfort',
      'Secure tubing to prevent CPAP leaks',
      'Ask staff about recent weight changes',
      'Document improvement after each intervention'
    ]
  },
  {
    id: 'behavioral-001',
    title: 'Behavioral Crisis with Suicidal Ideation',
    type: 'behavioral',
    difficulty: 'competent',
    estimatedTime: 14,
    description: 'Adult experiencing major depressive crisis with plan for self-harm',
    setting: 'Small apartment, law enforcement on scene',
    initialPresentation: {
      dispatch: 'Code 1 upgraded to Code 2; welfare check reports suicide note',
      sceneDescription: 'Patient seated on floor, officers present, scene safe',
      patientPosition: 'Sitting, hugging knees',
      obviousInjuries: [],
      environmentalHazards: ['Kitchen knives secured by police']
    },
    patient: {
      age: 32,
      sex: 'female',
      appearance: 'Tearful, withdrawn',
      mentalStatus: 'alert',
      chiefComplaint: 'States she "doesn’t want to be here anymore"'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent', timeToReveal: 2 },
        breathing: { normal: '18/min', timeToReveal: 2 },
        circulation: { normal: 'Radial pulse strong, skin warm', timeToReveal: 3 },
        disability: {
          normal: 'Alert and oriented',
          abnormal: 'Expresses suicidal ideation with plan',
          requiresIntervention: true,
          interventionRequired: 'Crisis intervention and transport for evaluation',
          timeToReveal: 3
        },
        exposure: { normal: 'No injuries noted', timeToReveal: 3 }
      },
      vitals: {
        pulse: { normal: '92 bpm', timeToReveal: 4 },
        bloodPressure: { normal: '124/78 mmHg', timeToReveal: 4 },
        respirations: { normal: '18/min', timeToReveal: 4 },
        temperature: { normal: '98.4°F (36.9°C)', timeToReveal: 5 },
        oxygenSaturation: { normal: '99% on room air', timeToReveal: 4 }
      },
      secondary: {
        head: { normal: 'No trauma', timeToReveal: 6 },
        neck: { normal: 'No ligature marks', timeToReveal: 6 },
        chest: { normal: 'Normal rise, equal breath sounds', timeToReveal: 7 },
        abdomen: { normal: 'Soft', timeToReveal: 7 },
        pelvis: { normal: 'No tenderness', timeToReveal: 7 },
        extremities: { normal: 'No self-harm injuries present', timeToReveal: 8 },
        posterior: { normal: 'No injuries', timeToReveal: 8 }
      },
      history: {
        sample: {
          signs: ['Tearfulness', 'Flat affect'],
          allergies: ['NKDA'],
          medications: ['Sertraline 100 mg daily'],
          pastHistory: ['Major depressive disorder'],
          lastOralIntake: 'Coffee this morning',
          events: 'Lost job last week, wrote note and contacted friend'
        }
      }
    },
    interventionResponses: {
      'verbal-de-escalation': {
        success: 'Patient engages, agrees to voluntary transport',
        failure: 'Patient becomes more withdrawn without empathetic approach'
      },
      'safe-transport': {
        success: 'Arrives at facility without incident',
        failure: 'Inadequate monitoring allows self-harm attempt'
      }
    },
    learningObjectives: [
      'Use empathetic communication to establish rapport',
      'Assess suicide risk elements (plan, means, intent)',
      'Coordinate with law enforcement for safe transport',
      'Document statements verbatim for legal protection'
    ],
    criticalActions: [
      'Establish scene safety with law enforcement',
      'Conduct risk assessment and determine level of care needed',
      'Secure patient belongings that could cause harm',
      'Provide calm, supportive transport with constant observation'
    ],
    commonMistakes: [
      'Minimizing patient statements',
      'Failing to involve mental health resources early',
      'Leaving patient unattended',
      'Not documenting quotes verbatim'
    ],
    expertTips: [
      'Use open-ended questions and allow silence for responses',
      'Offer patient choice in small decisions to build trust',
      'Brief receiving facility with detailed narrative',
      'Include support person in plan when appropriate'
    ]
  },
  {
    id: 'trauma-003',
    title: 'Penetrating Trauma – Stab Wound',
    type: 'trauma',
    difficulty: 'competent',
    estimatedTime: 15,
    description: 'Adult sustained single stab wound to upper abdomen',
    setting: 'Restaurant kitchen, bystanders present',
    initialPresentation: {
      dispatch: 'Code 3; 27-year-old male stabbed during altercation',
      sceneDescription: 'Kitchen area secured by police, patient on floor',
      patientPosition: 'Supine with knees flexed',
      obviousInjuries: ['Stab wound LUQ', 'Blood on clothing'],
      environmentalHazards: ['Wet floor', 'Knife secured by law enforcement']
    },
    patient: {
      age: 27,
      sex: 'male',
      appearance: 'Pale, anxious, clutching abdomen',
      mentalStatus: 'alert',
      chiefComplaint: 'Severe abdominal pain and dizziness'
    },
    assessmentFindings: {
      primary: {
        airway: { normal: 'Patent', timeToReveal: 2 },
        breathing: { normal: '22/min, shallow', timeToReveal: 3 },
        circulation: {
          normal: 'Radial pulse weak',
          abnormal: 'Active bleeding controlled with direct pressure',
          requiresIntervention: true,
          interventionRequired: 'Occlusive dressing, rapid transport',
          timeToReveal: 3
        },
        disability: { normal: 'Alert, oriented x3', timeToReveal: 3 },
        exposure: { normal: 'Single penetrating wound left upper quadrant', timeToReveal: 4 }
      },
      vitals: {
        pulse: { normal: '118 bpm, thready', timeToReveal: 5 },
        bloodPressure: {
          normal: '104/66 mmHg',
          abnormal: 'Trending downward sign of shock',
          timeToReveal: 6
        },
        respirations: { normal: '22/min', timeToReveal: 5 },
        temperature: { normal: '97.8°F (36.5°C)', timeToReveal: 6 },
        oxygenSaturation: { normal: '95% on room air', timeToReveal: 5 }
      },
      secondary: {
        head: { normal: 'No trauma', timeToReveal: 7 },
        neck: { normal: 'Trachea midline', timeToReveal: 7 },
        chest: { normal: 'Clear lung sounds', timeToReveal: 8 },
        abdomen: {
          normal: 'Rigid LUQ, guarding present',
          abnormal: 'Obvious stab wound approx. 2 cm with minimal external bleed',
          timeToReveal: 8
        },
        pelvis: { normal: 'Stable', timeToReveal: 8 },
        extremities: { normal: 'No deformities, skin cool', timeToReveal: 9 },
        posterior: { normal: 'No additional wounds', timeToReveal: 9 }
      },
      history: {
        sample: {
          signs: ['Abdominal pain', 'Lightheadedness'],
          allergies: ['NKDA'],
          medications: ['None'],
          pastHistory: ['No significant history'],
          lastOralIntake: 'Meal 1 hour prior',
          events: 'Altercation with coworker, single stab wound left abdomen'
        }
      }
    },
    interventionResponses: {
      'occlusive-dressing': {
        success: 'Bleeding controlled, prevents evisceration',
        failure: 'Improper seal allows continued blood loss'
      },
      'rapid-transport': {
        success: 'Arrival to trauma center within golden hour',
        failure: 'Delay increases hemorrhage risk'
      }
    },
    learningObjectives: [
      'Manage penetrating trauma with minimal on-scene time',
      'Assess for signs of internal bleeding',
      'Maintain high suspicion for diaphragmatic injury',
      'Prepare for shock management en route'
    ],
    criticalActions: [
      'Control external hemorrhage with occlusive dressing',
      'Do not remove impaled objects',
      'Prioritize rapid transport and notify trauma center',
      'Monitor vital signs and mental status closely'
    ],
    commonMistakes: [
      'Packing wound instead of occluding',
      'Delayed transport for unnecessary interventions',
      'Forgetting to reassess dressing for continued bleeding',
      'Poor documentation of MOI and patient statements'
    ],
    expertTips: [
      'Use hemostatic gauze only for uncontrolled external bleed',
      'Consider ALS intercept for IV access and fluids',
      'Keep patient warm to prevent coagulopathy',
      'Document abdominal quadrants tender or rigid'
    ]
  },
  {
    id: 'medical-004',
    title: 'Opioid Overdose with Respiratory Depression',
    type: 'medical',
    difficulty: 'advanced-beginner',
    estimatedTime: 11,
    description: 'Adult found with shallow respirations after suspected opioid use',
    setting: 'Public restroom, bystander initiated CPR',
    initialPresentation: {
      dispatch: 'Code 3; unresponsive 30-year-old male, suspected overdose',
      sceneDescription: 'Patient on floor, bystander performing rescue breaths with mask',
      patientPosition: 'Supine',
      obviousInjuries: [],
      environmentalHazards: ['Paraphernalia present']
    },
    patient: {
      age: 30,
      sex: 'male',
      appearance: 'Cyanotic, pinpoint pupils',
      mentalStatus: 'unresponsive',
      chiefComplaint: 'No verbal response'
    },
    assessmentFindings: {
      primary: {
        airway: {
          normal: 'Partially obstructed by relaxed musculature',
          requiresIntervention: true,
          interventionRequired: 'Airway positioning, adjunct, BVM',
          timeToReveal: 1
        },
        breathing: {
          normal: '6 breaths per minute, shallow',
          abnormal: 'Apneic without assistance',
          requiresIntervention: true,
          interventionRequired: 'BVM ventilation and naloxone',
          timeToReveal: 1
        },
        circulation: {
          normal: 'Radial pulse weak but present',
          timeToReveal: 2
        },
        disability: { normal: 'GCS 6 (E1 V1 M4)', timeToReveal: 2 },
        exposure: { normal: 'Track marks on forearms', timeToReveal: 3 }
      },
      vitals: {
        pulse: { normal: '52 bpm', timeToReveal: 4 },
        bloodPressure: { normal: '98/60 mmHg', timeToReveal: 4 },
        respirations: {
          normal: '6/min assisted',
          abnormal: 'Respiratory arrest without ventilation',
          timeToReveal: 3
        },
        temperature: { normal: '96.8°F (36°C)', timeToReveal: 5 },
        oxygenSaturation: {
          normal: '78% on room air',
          requiresIntervention: true,
          interventionRequired: 'BVM with oxygen',
          timeToReveal: 3
        }
      },
      secondary: {
        head: { normal: 'No trauma, pupils pinpoint', timeToReveal: 6 },
        neck: { normal: 'No trauma, trachea midline', timeToReveal: 6 },
        chest: { normal: 'Breath sounds diminished bilaterally', timeToReveal: 7 },
        abdomen: { normal: 'Soft, non-distended', timeToReveal: 7 },
        pelvis: { normal: 'Stable', timeToReveal: 7 },
        extremities: { normal: 'Multiple track marks, cool skin', timeToReveal: 8 },
        posterior: { normal: 'No trauma', timeToReveal: 8 }
      },
      history: {
        sample: {
          signs: ['Unresponsive', 'Shallow breathing'],
          allergies: ['Unknown'],
          medications: ['Unknown'],
          pastHistory: ['Substance use disorder per friend'],
          lastOralIntake: 'Unknown',
          events: 'Found down with syringe nearby'
        }
      }
    },
    interventionResponses: {
      'naloxone-administration': {
        success: 'Begins breathing spontaneously after 2 mg IN',
        failure: 'No response if polysubstance or insufficient dose'
      },
      'bvm-ventilation': {
        success: 'SpO2 improves to 96% with assisted ventilations',
        failure: 'Gastric insufflation if poor technique'
      }
    },
    learningObjectives: [
      'Provide airway management prior to naloxone',
      'Deliver naloxone safely via intranasal route',
      'Monitor for renarcotization and recurrent depression',
      'Coordinate transport even after apparent recovery'
    ],
    criticalActions: [
      'Immediate airway positioning and BVM support',
      'Administer naloxone titrated to adequate respirations',
      'Place patient on cardiac and SpO2 monitoring',
      'Educate about overdose risks and encourage transport'
    ],
    commonMistakes: [
      'Giving naloxone before supporting ventilation',
      'Failing to reassess airway after consciousness returns',
      'Allowing patient to refuse transport without observation',
      'Discarding paraphernalia without documentation'
    ],
    expertTips: [
      'Titrate naloxone to respiratory drive to avoid precipitated withdrawal',
      'Prepare for vomiting after reversal',
      'Inform patient naloxone duration is shorter than most opioids',
      'Refer to local harm-reduction resources during transport'
    ]
  }
];

interface ScenarioVariantTemplate {
  key: string;
  label: string;
  setting: string;
  dispatchPrefix: string;
  patientPosition: string;
  patientAge: number;
  patientSex: 'male' | 'female' | 'non-binary';
  difficulty: AssessmentScenario['difficulty'];
  estimatedTime: number;
  hazards: string[];
  environmentNote: string;
  complaintFocus: string;
  basePulse?: number;
  baseRespirations?: number;
  typeOverride?: AssessmentScenario['type'];
}

const protocolScenarioTypeMap: Partial<Record<string, AssessmentScenario['type']>> = {
  'traumatic-brain-injury': 'trauma',
  'shock-hypoperfusion': 'trauma',
  'obstetric-emergencies': 'medical'
};

const scenarioVariantTemplates: ScenarioVariantTemplate[] = [
  {
    key: 'urban-response',
    label: 'Urban Response',
    setting: 'High-rise condominium living room',
    dispatchPrefix: 'Respond Code 2 to urban high-rise for',
    patientPosition: 'Seated upright on sofa, forward-leaning posture',
    patientAge: 56,
    patientSex: 'male',
    difficulty: 'competent',
    estimatedTime: 18,
    hazards: ['Limited elevator access', 'Family members crowding scene'],
    environmentNote: 'Crowded apartment with limited space for equipment deployment and multiple bystanders observing.',
    complaintFocus: 'Applying guideline-driven care in a confined residential space.',
    basePulse: 96,
    baseRespirations: 20
  },
  {
    key: 'rural-transport',
    label: 'Rural Highway Transport',
    setting: 'Two-lane rural highway shoulder during dusk hours',
    dispatchPrefix: 'Respond Code 3 to rural highway incident for',
    patientPosition: 'Supine on long spine board with head elevated 20°',
    patientAge: 42,
    patientSex: 'female',
    difficulty: 'proficient',
    estimatedTime: 22,
    hazards: ['Limited lighting', 'Oncoming traffic', 'Extended transport time'],
    environmentNote: 'Low-light roadway with limited resources requiring rapid packaging and prolonged transport planning.',
    complaintFocus: 'Maintaining perfusion during extended rural transport.',
    basePulse: 104,
    baseRespirations: 24,
    typeOverride: 'trauma'
  },
  {
    key: 'clinic-transfer',
    label: 'Urgent Care Interfacility Transfer',
    setting: 'Community urgent care clinic exam room',
    dispatchPrefix: 'Respond Code 2 to urgent care requesting transfer for',
    patientPosition: 'Semi-Fowler position on exam bed with monitor attached',
    patientAge: 68,
    patientSex: 'female',
    difficulty: 'advanced-beginner',
    estimatedTime: 16,
    hazards: ['Narrow hallways', 'Crowded waiting area', 'Multiple handoff points'],
    environmentNote: 'Clinical environment with staff requesting rapid transport coordination and comprehensive handoff.',
    complaintFocus: 'Coordinating care with medical direction and receiving facility.',
    basePulse: 88,
    baseRespirations: 18
  },
  {
    key: 'public-event',
    label: 'Special Event First Aid',
    setting: 'Large public event first aid station',
    dispatchPrefix: 'Standby unit activate for',
    patientPosition: 'Sitting in treatment chair, leaning to one side',
    patientAge: 33,
    patientSex: 'non-binary',
    difficulty: 'novice',
    estimatedTime: 14,
    hazards: ['Crowd noise', 'Limited privacy', 'Unpredictable access routes'],
    environmentNote: 'Busy event venue requiring crowd management, rapid assessment, and discrete documentation.',
    complaintFocus: 'Managing crowd communication while executing national protocol benchmarks.',
    basePulse: 92,
    baseRespirations: 20
  },
  {
    key: 'simulation-validation',
    label: 'Simulation Lab Validation',
    setting: 'Accredited EMS simulation lab with evaluator oversight',
    dispatchPrefix: 'Initiate evaluation scenario focused on',
    patientPosition: 'Simulation manikin supine on training stretcher',
    patientAge: 48,
    patientSex: 'male',
    difficulty: 'expert',
    estimatedTime: 12,
    hazards: ['Time-limited evaluation window', 'Multiple evaluators observing'],
    environmentNote: 'Controlled lab environment emphasizing documentation accuracy and protocol fidelity.',
    complaintFocus: 'Demonstrating full protocol sequence under timed evaluation.',
    basePulse: 90,
    baseRespirations: 18
  }
];

const createProtocolAlignedScenario = (
  protocolIndex: number,
  protocolId: string,
  protocolTitle: string,
  protocolDescription: string,
  protocolKeyPoints: string[],
  clinicalIndications: string[],
  legalConsiderations: string[],
  equipmentRequired: string[],
  dosages: NationalProtocol['dosages'] | undefined,
  variant: ScenarioVariantTemplate
): AssessmentScenario => {
  const type = variant.typeOverride ?? protocolScenarioTypeMap[protocolId] ?? 'medical';
  const keyPoints = protocolKeyPoints.length ? protocolKeyPoints : [protocolTitle];
  const primaryFocus = keyPoints[0] ?? protocolTitle;
  const secondaryFocus = keyPoints[1] ?? primaryFocus;
  const scenarioIndex = protocolIndex + 1;
  const scenarioId = `${protocolId}-${variant.key}-${scenarioIndex}`;
  const medicationList = dosages?.length
    ? dosages.map((entry) => `${entry.medication} (${entry.adult})`)
    : ['No medications administered prior to EMS arrival'];

  return {
    id: scenarioId,
    title: `${protocolTitle} – ${variant.label}`,
    type,
    difficulty: variant.difficulty,
    estimatedTime: variant.estimatedTime,
    description: `${variant.label} scenario following the national ${protocolTitle} guidelines with emphasis on ${variant.complaintFocus}`,
    setting: variant.setting,
    initialPresentation: {
      dispatch: `${variant.dispatchPrefix} ${protocolTitle.toLowerCase()}`,
      sceneDescription: variant.environmentNote,
      patientPosition: variant.patientPosition,
      obviousInjuries: type === 'trauma'
        ? [`Presentation consistent with ${protocolTitle.toLowerCase()} mechanism.`]
        : [],
      environmentalHazards: variant.hazards
    },
    patient: {
      age: variant.patientAge,
      sex: variant.patientSex,
      appearance: `Presentation consistent with ${protocolDescription.toLowerCase()}`,
      mentalStatus: 'alert',
      chiefComplaint: variant.complaintFocus
    },
    assessmentFindings: {
      primary: {
        airway: {
          normal: 'Airway patent, patient speaking clearly',
          timeToReveal: 2
        },
        breathing: {
          normal: `Respirations ${variant.baseRespirations ?? 20} per minute with adequate chest rise`,
          abnormal: type === 'trauma'
            ? 'Mild asymmetry noted, requires focused reassessment'
            : `Slight distress consistent with ${protocolTitle.toLowerCase()}`,
          requiresIntervention: true,
          interventionRequired: primaryFocus,
          timeToReveal: 5
        },
        circulation: {
          normal: 'Radial pulse present, skin warm to touch',
          abnormal: `Perfusion trending towards protocol risk factors, monitor closely for ${secondaryFocus.toLowerCase()}`,
          requiresIntervention: true,
          interventionRequired: secondaryFocus,
          timeToReveal: 6
        },
        disability: {
          normal: 'Neurological status intact, oriented x4',
          timeToReveal: 4
        },
        exposure: {
          normal: 'No additional injuries identified on rapid exam',
          timeToReveal: 3
        }
      },
      vitals: {
        pulse: {
          normal: `${variant.basePulse ?? 96} bpm`,
          timeToReveal: 8
        },
        bloodPressure: {
          normal: '132/86 mmHg',
          abnormal: type === 'trauma'
            ? 'Borderline perfusion; anticipate need for rapid transport'
            : 'Slightly elevated, consistent with stress response',
          timeToReveal: 10
        },
        respirations: {
          normal: `${variant.baseRespirations ?? 20}/min`,
          timeToReveal: 7
        },
        temperature: {
          normal: '98.6°F',
          timeToReveal: 9
        },
        oxygenSaturation: {
          normal: '94% on room air',
          abnormal: keyPoints.some((point) => point.toLowerCase().includes('oxygen'))
            ? 'Trends to 90% without intervention'
            : undefined,
          requiresIntervention: true,
          interventionRequired: 'Initiate oxygen per guideline',
          timeToReveal: 11
        },
        bloodGlucose: type === 'medical'
          ? {
              normal: '102 mg/dL',
              abnormal: protocolId === 'diabetic-emergencies' ? 'Episodes of hypoglycemia reported earlier' : undefined,
              timeToReveal: 12
            }
          : undefined
      },
      secondary: {
        head: {
          normal: 'No signs of trauma or abnormal findings',
          timeToReveal: 14
        },
        neck: {
          normal: 'No JVD, trachea midline',
          timeToReveal: 16
        },
        chest: {
          normal: 'Symmetric expansion, clear lung fields',
          abnormal: type === 'trauma'
            ? 'Localized tenderness over affected area'
            : `Patient notes ${clinicalIndications[0]?.toLowerCase() ?? 'symptom onset'} during inspiration`,
          timeToReveal: 18
        },
        abdomen: {
          normal: 'Soft, non-tender, no distention',
          timeToReveal: 18
        },
        pelvis: {
          normal: 'Stable, no pain on palpation',
          timeToReveal: 20
        },
        extremities: {
          normal: 'Distal pulses intact, no edema',
          abnormal: type === 'trauma'
            ? 'Slight weakness noted in affected extremity'
            : undefined,
          timeToReveal: 22
        },
        posterior: {
          normal: 'No deformities, step-offs, or lesions',
          timeToReveal: 24
        }
      },
      history: {
        sample: {
          signs: clinicalIndications.slice(0, 4),
          allergies: ['NKDA'],
          medications: medicationList,
          pastHistory: [`History relevant to ${protocolTitle.toLowerCase()} risk factors`],
          lastOralIntake: 'Within two hours of EMS arrival',
          events: `Onset consistent with ${protocolDescription.toLowerCase()}`
        },
        opqrst: type === 'trauma'
          ? undefined
          : {
              onset: 'Symptoms began suddenly approximately 35 minutes prior to EMS arrival',
              provocation: 'Movement and exertion increase severity',
              quality: 'Patient describes pressure and discomfort consistent with guideline presentation',
              radiation: 'Localized with occasional radiation per protocol expectations',
              severity: 7,
              timing: 'Persistent with intermittent spikes in intensity'
            }
      }
    },
    complications: [
      {
        id: `${scenarioId}-comp-1`,
        trigger: 'guideline-deviation',
        timeDelay: 420,
        description: `Patient condition worsens if ${primaryFocus.toLowerCase()} is delayed beyond 7 minutes.`,
        newFindings: {
          oxygenSaturation: 'Drops by 4%',
          mentalStatus: 'Becomes increasingly anxious and less cooperative'
        },
        urgency: 'high'
      }
    ],
    interventionResponses: {
      'guideline-adherent-care': {
        success: `Interventions align with ${protocolTitle} benchmarks; patient stabilizes and scene time remains within best practice targets.`,
        failure: 'Incomplete adherence leads to prolonged scene time and degraded patient status.',
        partialSuccess: 'Core steps completed but documentation lacks detail linking to the national guideline.',
        physiologicalChange: {
          oxygenSaturation: 'Improves to 98% with supplemental oxygen',
          bloodPressure: 'Stabilizes within acceptable range'
        }
      },
      'documentation-review': {
        success: 'Report clearly references national protocol standards and rationale for interventions.',
        failure: 'Documentation omits key guideline citations and response to treatment.',
        partialSuccess: 'Most required elements included but lacks explicit linkage to national standards.'
      }
    },
    learningObjectives: keyPoints.slice(0, 3),
    criticalActions: [
      primaryFocus,
      secondaryFocus,
      'Document interventions referencing NHTSA 2022 guidance'
    ],
    commonMistakes: [
      `Delaying ${primaryFocus.toLowerCase()}`,
      'Incomplete SAMPLE or OPQRST history collection',
      'Omitting patient consent or refusal status in documentation'
    ],
    expertTips: [
      legalConsiderations[0] ?? 'Confirm medical control expectations early.',
      equipmentRequired[0] ? `Stage ${equipmentRequired[0].toLowerCase()} before patient contact.` : 'Verify essential equipment readiness before patient contact.',
      'Narrate decision-making in the PCR to reinforce protocol alignment.'
    ]
  };
};

const protocolDerivedAssessmentScenarios: AssessmentScenario[] = (() => {
  const targetTotal = 25;
  const needed = Math.max(0, targetTotal - baseAssessmentScenarios.length);
  if (needed === 0) {
    return [];
  }

  const generated: AssessmentScenario[] = [];
  let protocolIndex = 0;

  for (const protocol of NATIONAL_PROTOCOL_FOUNDATION) {
    const clinical = protocol.clinicalIndications;
    const legal = protocol.legalConsiderations;
  const equipment = protocol.equipmentRequired;
  const dosages = protocol.dosages;

    for (const variant of scenarioVariantTemplates) {
      if (generated.length >= needed) {
        break;
      }

      generated.push(
        createProtocolAlignedScenario(
          protocolIndex,
          protocol.id,
          protocol.title,
          protocol.description,
          protocol.keyPoints,
          clinical,
          legal,
          equipment,
          dosages,
          variant
        )
      );

      protocolIndex += 1;
    }

    if (generated.length >= needed) {
      break;
    }
  }

  return generated;
})();

const defaultFinding: AssessmentFinding = {
  normal: 'Within normal limits',
  requiresIntervention: false
};

const defaultSAMPLE: SAMPLEHistory = {
  signs: ['None reported'],
  allergies: ['None known'],
  medications: ['None'],
  pastHistory: ['None'],
  lastOralIntake: 'Unknown',
  events: 'Unknown'
};

const createScenario = (
  id: string,
  title: string,
  type: AssessmentScenario['type'],
  difficulty: AssessmentScenario['difficulty'],
  description: string,
  dispatch: string,
  sceneDescription: string,
  patientPosition: string,
  obviousInjuries: string[],
  hazards: string[],
  age: number,
  sex: 'male' | 'female',
  complaint: string,
  objectives: string[],
  criticalActions: string[]
): AssessmentScenario => ({
  id,
  title,
  type,
  difficulty,
  estimatedTime: 15,
  description,
  setting: 'Residential',
  initialPresentation: {
    dispatch,
    sceneDescription,
    patientPosition,
    obviousInjuries,
    environmentalHazards: hazards
  },
  patient: {
    age,
    sex,
    appearance: 'Distressed',
    mentalStatus: 'alert',
    chiefComplaint: complaint
  },
  assessmentFindings: {
    primary: {
      airway: { ...defaultFinding, normal: 'Patent' },
      breathing: { ...defaultFinding, normal: 'Adequate' },
      circulation: { ...defaultFinding, normal: 'Strong radial pulse' },
      disability: { ...defaultFinding, normal: 'GCS 15' },
      exposure: { ...defaultFinding, normal: 'No gross bleeding' }
    },
    vitals: {
      pulse: { ...defaultFinding, normal: '80 bpm' },
      bloodPressure: { ...defaultFinding, normal: '120/80' },
      respirations: { ...defaultFinding, normal: '16 rpm' },
      temperature: { ...defaultFinding, normal: '98.6 F' },
      oxygenSaturation: { ...defaultFinding, normal: '98%' },
      bloodGlucose: { ...defaultFinding, normal: '100 mg/dL' }
    },
    secondary: {
      head: defaultFinding,
      neck: defaultFinding,
      chest: defaultFinding,
      abdomen: defaultFinding,
      pelvis: defaultFinding,
      extremities: defaultFinding,
      posterior: defaultFinding
    },
    history: {
      sample: defaultSAMPLE
    }
  },
  interventionResponses: {},
  learningObjectives: objectives,
  criticalActions: criticalActions,
  commonMistakes: [],
  expertTips: []
});

export const enhancedAssessmentScenarios: AssessmentScenario[] = [
  createScenario(
    'med-001', 'Chest Pain', 'medical', 'novice',
    '55-year-old male complaining of chest pressure.',
    'Chest Pain', 'Living room, patient seated', 'Seated in recliner', [], [], 55, 'male', 'Chest pressure',
    ['Recognize cardiac symptoms', 'Administer aspirin'], ['Administer Aspirin', 'Obtain 12-lead ECG']
  ),
  createScenario(
    'med-002', 'Stroke', 'medical', 'novice',
    '72-year-old female with slurred speech.',
    'Stroke / CVA', 'Bedroom, patient in bed', 'Lying in bed', ['Facial droop'], [], 72, 'female', 'Slurred speech',
    ['Perform stroke scale', 'Determine last known well'], ['Perform Cincinnati Stroke Scale', 'Check Blood Glucose']
  ),
  createScenario(
    'med-003', 'Seizure', 'medical', 'novice',
    '24-year-old male found seizing.',
    'Seizure', 'Public park', 'Supine on grass', ['Incontinence'], [], 24, 'male', 'Seizure',
    ['Protect airway', 'Check glucose'], ['Protect Head', 'Check Blood Glucose']
  ),
  createScenario(
    'med-004', 'Allergic Reaction', 'medical', 'novice',
    '30-year-old female with hives after eating.',
    'Allergic Reaction', 'Restaurant', 'Seated at table', ['Urticaria'], [], 30, 'female', 'Itching and swelling',
    ['Recognize anaphylaxis', 'Administer epinephrine'], ['Assess Airway', 'Administer Epinephrine if indicated']
  ),
  createScenario(
    'med-005', 'Diabetic Emergency', 'medical', 'novice',
    '45-year-old male confused and sweating.',
    'Diabetic Problem', 'Office building', 'Seated at desk', ['Diaphoresis'], [], 45, 'male', 'Confusion',
    ['Assess mental status', 'Check blood glucose'], ['Check Blood Glucose', 'Administer Oral Glucose if indicated']
  ),
  createScenario(
    'med-006', 'Overdose', 'medical', 'novice',
    '22-year-old female unresponsive.',
    'Overdose / Poisoning', 'Apartment', 'Supine on floor', ['Pinpoint pupils'], ['Needles present'], 22, 'female', 'Unresponsive',
    ['Assess respiratory drive', 'Administer Naloxone'], ['Assist Ventilations', 'Administer Naloxone']
  ),
  createScenario(
    'med-007', 'Abdominal Pain', 'medical', 'novice',
    '35-year-old female with severe RLQ pain.',
    'Abdominal Pain', 'Home', 'Fetal position on couch', [], [], 35, 'female', 'Stomach pain',
    ['Assess abdomen', 'Consider pregnancy'], ['Palpate Abdomen', 'Ask about LMP']
  ),
  createScenario(
    'med-008', 'Respiratory Distress', 'medical', 'novice',
    '60-year-old male with COPD exacerbation.',
    'Breathing Difficulty', 'Home', 'Tripod position', ['Cyanosis'], ['Oxygen tanks'], 60, 'male', 'Can\'t breathe',
    ['Assess lung sounds', 'Administer oxygen'], ['Auscultate Lung Sounds', 'Administer CPAP/Nebulizer']
  ),
  createScenario(
    'med-009', 'Heat Exhaustion', 'medical', 'novice',
    '28-year-old male collapsed at marathon.',
    'Heat / Cold Exposure', 'Outdoor event', 'Supine on ground', ['Hot skin'], ['High ambient temp'], 28, 'male', 'Dizziness',
    ['Cool patient', 'Hydrate'], ['Move to Cool Environment', 'Active Cooling']
  ),
  createScenario(
    'med-010', 'Syncope', 'medical', 'novice',
    '80-year-old female fainted at church.',
    'Fainting / Syncope', 'Church', 'Supine in pew', [], [], 80, 'female', 'Passed out',
    ['Assess cardiac cause', 'Check orthostatics'], ['12-lead ECG', 'Check Blood Glucose']
  ),
  createScenario(
    'trauma-001', 'Motor Vehicle Collision', 'trauma', 'advanced-beginner',
    'Driver in moderate speed MVC.',
    'Traffic Accident', 'Roadway', 'Seated in vehicle', ['Forehead laceration'], ['Traffic'], 30, 'male', 'Neck pain',
    ['C-spine precautions', 'Rapid trauma assessment'], ['C-Spine Stabilization', 'Rapid Extrication']
  ),
  createScenario(
    'trauma-002', 'Fall from Height', 'trauma', 'advanced-beginner',
    'Roofer fell 15 feet.',
    'Fall', 'Construction site', 'Supine on ground', ['Deformed leg'], ['Construction debris'], 40, 'male', 'Leg pain',
    ['Spinal immobilization', 'Splinting'], ['Full Spinal Motion Restriction', 'Splint Extremity']
  ),
  createScenario(
    'trauma-003', 'Penetrating Trauma', 'trauma', 'advanced-beginner',
    'Stab wound to the chest.',
    'Stabbing / GSW', 'Alleyway', 'Sitting against wall', ['Chest wound'], ['Police on scene'], 25, 'male', 'Shortness of breath',
    ['Occlusive dressing', 'Check lung sounds'], ['Apply Occlusive Dressing', 'Check for Exit Wound']
  ),
  createScenario(
    'trauma-004', 'Burn Injury', 'trauma', 'advanced-beginner',
    'Partial thickness burns from grease fire.',
    'Burns', 'Kitchen', 'Standing at sink', ['Red, blistered arms'], ['Smoke'], 35, 'female', 'Burning pain',
    ['Stop burning process', 'Estimate BSA'], ['Stop Burning Process', 'Cover with Dry Sterile Dressing']
  ),
  createScenario(
    'trauma-005', 'Head Injury', 'trauma', 'advanced-beginner',
    'Skateboarder struck head, no helmet.',
    'Traumatic Injury', 'Skate park', 'Confused, sitting', ['Hematoma'], [], 16, 'male', 'Headache',
    ['Assess GCS', 'Monitor mental status'], ['C-Spine Precautions', 'Frequent Neuro Checks']
  ),
  createScenario(
    'ped-001', 'Pediatric Fever', 'pediatric', 'competent',
    '3-year-old with high fever and lethargy.',
    'Sick Person', 'Home', 'In mother\'s arms', ['Flushed skin'], [], 3, 'female', 'Hot and sleepy',
    ['Assess hydration', 'Rule out sepsis'], ['Check Temperature', 'Assess Capillary Refill']
  ),
  createScenario(
    'ped-002', 'Pediatric Respiratory Distress', 'pediatric', 'competent',
    '5-year-old asthmatic with wheezing.',
    'Breathing Difficulty', 'School nurse office', 'Tripod', ['Retractions'], [], 5, 'male', 'Trouble breathing',
    ['Pediatric assessment triangle', 'Nebulizer'], ['Assess Work of Breathing', 'Administer Albuterol']
  ),
  createScenario(
    'ped-003', 'Pediatric Seizure', 'pediatric', 'competent',
    '18-month-old febrile seizure.',
    'Seizure', 'Home', 'Post-ictal', ['Hot to touch'], [], 1, 'female', 'Shaking',
    ['Cooling measures', 'Airway management'], ['Ensure Airway Patency', 'Check Glucose']
  ),
  createScenario(
    'ped-004', 'Pediatric Trauma', 'pediatric', 'competent',
    '7-year-old struck by car at low speed.',
    'Pedestrian Struck', 'Street', 'Supine', ['Abrasions'], ['Traffic'], 7, 'male', 'Crying',
    ['Pediatric immobilization', 'Distraction techniques'], ['C-Spine Stabilization', 'Rapid Transport']
  ),
  createScenario(
    'ped-005', 'Pediatric Allergic Reaction', 'pediatric', 'competent',
    '9-year-old peanut allergy exposure.',
    'Allergic Reaction', 'School cafeteria', 'Wheezing', ['Swollen lips'], [], 9, 'female', 'Throat closing',
    ['Epi-pen administration', 'Airway support'], ['Administer Epinephrine', 'Monitor Airway']
  ),
  createScenario(
    'med-011', 'Cardiac Arrest', 'medical', 'proficient',
    '65-year-old male witnessed collapse.',
    'Cardiac Arrest', 'Grocery store', 'Supine, CPR in progress', ['Cyanosis'], ['Crowd'], 65, 'male', 'Unresponsive',
    ['High-quality CPR', 'ACLS algorithms'], ['High Quality CPR', 'Early Defibrillation']
  ),
  createScenario(
    'trauma-006', 'Multi-System Trauma', 'trauma', 'proficient',
    'Motorcyclist vs Truck.',
    'Traffic Accident', 'Highway', 'Thrown 20 feet', ['Multiple fractures'], ['Traffic', 'Fuel leak'], 28, 'male', 'Unresponsive',
    ['Rapid trauma assessment', 'Manage shock'], ['Control Major Bleeding', 'Rapid Transport']
  ),
  createScenario(
    'ped-006', 'Pediatric Cardiac Arrest', 'pediatric', 'proficient',
    'Infant found unresponsive in crib.',
    'Cardiac Arrest', 'Home', 'Supine in crib', ['Mottled skin'], [], 0, 'female', 'Unresponsive',
    ['Infant CPR', 'PALS algorithms'], ['Start CPR', 'Airway Management']
  ),
  createScenario(
    'trauma-007', 'Mass Casualty Incident', 'trauma', 'expert',
    'Bus rollover with multiple patients.',
    'MCI', 'Highway', 'Chaos', ['Multiple victims'], ['Unstable vehicle'], 40, 'male', 'Various',
    ['Triage', 'Incident command'], ['Establish Command', 'START Triage']
  ),
  createScenario(
    'med-012', 'Complex Medical', 'medical', 'expert',
    'Renal failure patient with hyperkalemia.',
    'Sick Person', 'Dialysis center', 'Weak', ['Pale'], [], 55, 'female', 'Weakness',
    ['Recognize electrolyte imbalance', '12-lead interpretation'], ['12-Lead ECG', 'Calcium/Bicarb Consideration']
  )
];

// Assessment Step Templates for Practice
export const assessmentStepTemplates: AssessmentStepTemplate[] = [
  {
    id: 'scene-size-up',
    category: 'scene-size-up',
    name: 'Scene Size-Up',
    description: 'Assess scene safety, hazards, mechanism, and resource needs',
    timeLimit: 60,
    criticalForSuccess: true,
    requiredActions: [
      {
        id: 'ppe-assessment',
        text: 'Don appropriate PPE before patient contact',
        type: 'observation',
        expectedResponse: 'Gloves minimum, additional PPE as indicated',
        points: 2,
        critical: true
      },
      {
        id: 'scene-safety',
        text: 'Assess and ensure scene safety',
        type: 'observation',
        expectedResponse: 'Identify and mitigate hazards before approaching',
        points: 3,
        critical: true
      },
      {
        id: 'moi-assessment',
        text: 'Determine mechanism of injury or nature of illness',
        type: 'observation',
        expectedResponse: 'Systematic evaluation of what happened',
        points: 2,
        critical: false
      },
      {
        id: 'resource-assessment',
        text: 'Consider need for additional resources',
        type: 'observation',
        expectedResponse: 'ALS, fire, police, utilities, etc.',
        points: 1,
        critical: false
      }
    ]
  },
  
  {
    id: 'primary-assessment',
    category: 'primary',
    name: 'Primary Assessment',
    description: 'Rapid assessment to identify and treat life threats',
    timeLimit: 90,
    prerequisites: ['scene-size-up'],
    criticalForSuccess: true,
    requiredActions: [
      {
        id: 'general-impression',
        text: 'Form general impression and identify chief complaint',
        type: 'observation',
        expectedResponse: 'Age, sex, distress level, obvious problems',
        points: 2,
        critical: false
      },
      {
        id: 'airway-assessment',
        text: 'Assess airway patency',
        type: 'physical-exam',
        bodyPart: 'airway',
        expectedResponse: 'Patent, compromised, or obstructed',
        points: 3,
        critical: true
      },
      {
        id: 'breathing-assessment',
        text: 'Assess breathing adequacy',
        type: 'physical-exam',
        bodyPart: 'chest',
        technique: 'Look, listen, feel',
        expectedResponse: 'Rate, depth, effort, quality',
        points: 3,
        critical: true
      },
      {
        id: 'circulation-assessment',
        text: 'Assess circulation and perfusion',
        type: 'physical-exam',
        bodyPart: 'pulse',
        technique: 'Palpate radial pulse, assess skin',
        expectedResponse: 'Pulse rate/quality, skin color/temperature/moisture',
        points: 3,
        critical: true
      },
      {
        id: 'disability-assessment',
        text: 'Assess disability (neurological status)',
        type: 'observation',
        technique: 'AVPU scale',
        expectedResponse: 'Alert, Verbal, Painful, Unresponsive',
        points: 2,
        critical: true
      }
    ]
  },
  {
    id: 'history-taking',
    category: 'history',
    name: 'History Taking',
    description: 'Gather SAMPLE history and OPQRST for present illness',
    timeLimit: 120,
    prerequisites: ['primary-assessment'],
    criticalForSuccess: true,
    requiredActions: [
      {
        id: 'sample-history',
        text: 'Obtain SAMPLE history',
        type: 'question',
        expectedResponse: 'Signs/Symptoms, Allergies, Meds, Past Hx, Last Intake, Events',
        points: 3,
        critical: true
      },
      {
        id: 'opqrst-assessment',
        text: 'Assess OPQRST (if pain/distress)',
        type: 'question',
        expectedResponse: 'Onset, Provocation, Quality, Radiation, Severity, Time',
        points: 3,
        critical: false
      }
    ]
  },
  {
    id: 'secondary-assessment',
    category: 'secondary',
    name: 'Secondary Assessment',
    description: 'Systematic physical exam and vital signs',
    timeLimit: 180,
    prerequisites: ['history-taking'],
    criticalForSuccess: true,
    requiredActions: [
      {
        id: 'vital-signs',
        text: 'Obtain baseline vital signs',
        type: 'physical-exam',
        expectedResponse: 'BP, Pulse, Resp, SpO2, Glucose, Temp',
        points: 3,
        critical: true
      },
      {
        id: 'physical-exam',
        text: 'Perform focused or rapid physical exam',
        type: 'physical-exam',
        expectedResponse: 'Assess affected body systems',
        points: 3,
        critical: false
      }
    ]
  },
  {
    id: 'reassessment',
    category: 'reassessment',
    name: 'Reassessment',
    description: 'Monitor changes and response to interventions',
    timeLimit: 60,
    prerequisites: ['secondary-assessment'],
    criticalForSuccess: true,
    requiredActions: [
      {
        id: 'repeat-primary',
        text: 'Repeat Primary Assessment',
        type: 'observation',
        expectedResponse: 'Re-check ABCs',
        points: 2,
        critical: true
      },
      {
        id: 'check-interventions',
        text: 'Check interventions',
        type: 'observation',
        expectedResponse: 'Ensure treatments are effective',
        points: 2,
        critical: true
      }
    ]
  }
];

// Performance Analytics Interface
export interface AssessmentPerformance {
  scenarioId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  totalScore: number;
  maxScore: number;
  criticalActionsMissed: string[];
  stepsCompleted: string[];
  timeByStep: { [stepId: string]: number };
  mistakes: string[];
  strengths: string[];
  areasForImprovement: string[];
  recommendedResources: string[];
}

// Adaptive Learning System
export interface AdaptiveLearningProfile {
  userId: string;
  skillLevel: 'novice' | 'advanced-beginner' | 'competent' | 'proficient' | 'expert';
  strongAreas: string[];
  weakAreas: string[];
  recentPerformance: AssessmentPerformance[];
  nextRecommendedScenarios: string[];
  personalizedFeedback: string[];
}

export default {
  enhancedAssessmentScenarios,
  assessmentStepTemplates
};