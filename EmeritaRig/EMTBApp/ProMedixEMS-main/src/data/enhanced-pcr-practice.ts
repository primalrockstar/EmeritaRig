// Enhanced PCR Report Practice Module - State-of-the-Art Documentation Training
// Features: Real-time validation, industry-standard templates, AI-powered feedback

export interface PCRScenario {
  id: string;
  title: string;
  type: 'medical' | 'trauma' | 'behavioral' | 'pediatric' | 'geriatric' | 'multi-patient';
  complexity: 'straightforward' | 'moderate' | 'complex' | 'critical';
  estimatedTime: number; // minutes to complete documentation
  
  // Scenario details
  callInformation: {
    dispatchTime: string;
    dispatchNature: string;
    responseMode: 'emergency' | 'non-emergency';
    arrivalTime: string;
    departTime?: string;
    hospitalArrivalTime?: string;
    unitNumber: string;
    crew: CrewMember[];
  };
  
  // Patient presentation and timeline
  patientEncounter: {
    patient: PatientDemographics;
    initialPresentation: InitialPresentation;
    assessmentFindings: ComprehensiveAssessment;
    interventions: InterventionRecord[];
    transport: TransportInformation;
    disposition: PatientDisposition;
  };
  
  // Documentation challenges
  documentationChallenges: DocumentationChallenge[];
  
  // Learning objectives
  learningObjectives: string[];
  assessmentCriteria: AssessmentCriterion[];
  commonErrors: string[];
  bestPractices: string[];
}

export interface CrewMember {
  name: string;
  certification: 'EMT-B' | 'AEMT' | 'Paramedic';
  role: 'primary' | 'secondary' | 'student';
}

export interface PatientDemographics {
  age: number;
  sex: 'male' | 'female' | 'non-binary' | 'unknown';
  weight?: number; // kg
  race?: string;
  primaryLanguage?: string;
  interpreterNeeded?: boolean;
}

export interface InitialPresentation {
  location: string;
  position: string;
  mentalStatus: string;
  chiefComplaint: string;
  apparentDistress: string;
  environmentalFactors?: string[];
}

export interface ComprehensiveAssessment {
  primary: {
    airway: string;
    breathing: string;
    circulation: string;
    disability: string;
    exposure: string;
  };
  vitals: VitalSignRecord[];
  secondary: {
    [bodySystem: string]: string;
  };
  neurologicalExam?: {
    gcs?: number;
    pupils?: string;
    motorFunction?: string;
    sensoryFunction?: string;
  };
  history: {
    sample: {
      signs: string[];
      allergies: string[];
      medications: string[];
      pastHistory: string[];
      lastOralIntake: string;
      events: string;
    };
    opqrst?: {
      onset: string;
      provocation: string;
      quality: string;
      radiation: string;
      severity: number;
      timing: string;
    };
  };
}

export interface VitalSignRecord {
  time: string;
  bloodPressure?: string;
  heartRate?: number;
  respiratoryRate?: number;
  temperature?: number;
  oxygenSaturation?: number;
  bloodGlucose?: number;
  painScore?: number;
  mentalStatus?: string;
  method?: string; // How measured
  position?: string; // Patient position during measurement
}

export interface InterventionRecord {
  time: string;
  intervention: string;
  dosage?: string;
  route?: string;
  performer: string;
  patientResponse: string;
  complications?: string;
  reassessmentTime?: string;
}

export interface TransportInformation {
  transportDecision: string;
  transportMode: 'ambulatory' | 'wheelchair' | 'stretcher' | 'carried';
  transportPriority: 'emergency' | 'non-emergency';
  destination: string;
  accompaniedBy?: string[];
  specialConsiderations?: string[];
}

export interface PatientDisposition {
  receivingFacility: string;
  receivingPhysician?: string;
  reportGivenTo: string;
  patientCondition: string;
  familyNotification?: string;
  continuingCare?: string[];
}

export interface DocumentationChallenge {
  id: string;
  type: 'legal-risk' | 'medical-complexity' | 'communication-barrier' | 'time-pressure' | 'ethical-dilemma';
  description: string;
  learningPoint: string;
  correctApproach: string;
}

export interface AssessmentCriterion {
  category: 'completeness' | 'accuracy' | 'objectivity' | 'legality' | 'professionalism';
  description: string;
  weight: number; // percentage of total score
  passingThreshold: number; // minimum score needed
}

// Documentation Templates and Standards
export interface DocumentationTemplate {
  id: string;
  name: string;
  format: 'SOAP' | 'CHART' | 'DAP' | 'APIE' | 'Narrative';
  sections: DocumentationSection[];
  guidelines: string[];
  requiredElements: string[];
}

export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  requiredElements: string[];
  optionalElements: string[];
  commonMistakes: string[];
  examples: string[];
}

// Enhanced PCR Scenarios with Real-World Complexity
export const enhancedPCRScenarios: PCRScenario[] = [
  {
    id: 'pcr-001',
    title: 'Acute Myocardial Infarction with Complications',
    type: 'medical',
    complexity: 'complex',
    estimatedTime: 25,
    
    callInformation: {
      dispatchTime: '14:23',
      dispatchNature: 'Chest pain, 60-year-old male, conscious, breathing',
      responseMode: 'emergency',
      arrivalTime: '14:31',
      departTime: '15:02',
      hospitalArrivalTime: '15:18',
      unitNumber: 'M-47',
      crew: [
        { name: 'J. Martinez', certification: 'EMT-B', role: 'primary' },
        { name: 'S. Johnson', certification: 'EMT-B', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 63,
        sex: 'male',
        weight: 85,
        race: 'Hispanic',
        primaryLanguage: 'Spanish',
        interpreterNeeded: false
      },
      
      initialPresentation: {
        location: 'Living room, single-story home',
        position: 'Sitting on couch, leaning forward',
        mentalStatus: 'Alert and oriented x4, anxious',
        chiefComplaint: 'Severe chest pain radiating to left arm and jaw',
        apparentDistress: 'Moderate to severe distress, diaphoretic',
        environmentalFactors: ['Family members present', 'Well-lit room', 'Easy access']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, speaking in short phrases due to pain',
          breathing: 'Slightly labored, 22/min, using accessory muscles',
          circulation: 'Pulse 94 bpm irregular, skin cool and diaphoretic',
          disability: 'Alert x4, no neurological deficits',
          exposure: 'No trauma, seatbelt-type chest pain pattern noted'
        },
        
        vitals: [
          {
            time: '14:35',
            bloodPressure: '168/102',
            heartRate: 94,
            respiratoryRate: 22,
            temperature: 98.2,
            oxygenSaturation: 92,
            painScore: 9,
            mentalStatus: 'Alert x4',
            method: 'Automated cuff, pulse oximetry',
            position: 'Sitting upright'
          },
          {
            time: '14:50',
            bloodPressure: '145/88',
            heartRate: 88,
            respiratoryRate: 18,
            oxygenSaturation: 98,
            painScore: 6,
            mentalStatus: 'Alert x4',
            method: 'Manual BP, pulse oximetry',
            position: 'Supine on stretcher'
          },
          {
            time: '15:10',
            bloodPressure: '142/86',
            heartRate: 86,
            respiratoryRate: 16,
            oxygenSaturation: 99,
            painScore: 4,
            mentalStatus: 'Alert x4, less anxious',
            method: 'Automated monitor',
            position: 'Supine, head elevated 30°'
          }
        ],
        
        secondary: {
          head: 'PERRL, no trauma, mild diaphoresis',
          neck: 'No JVD, no tracheal deviation, carotid pulses present',
          chest: 'Equal rise and fall, clear lung sounds bilaterally, point tenderness over sternum',
          cardiovascular: 'Irregular rhythm, no murmurs audible, peripheral pulses weak',
          abdomen: 'Soft, non-tender, bowel sounds present',
          extremities: 'No edema, weakness in left arm during pain episodes',
          neurological: 'Alert x4, no focal deficits, appropriate responses'
        },
        
        history: {
          sample: {
            signs: ['Chest pain', 'Diaphoresis', 'Shortness of breath', 'Nausea', 'Left arm pain'],
            allergies: ['Codeine - causes nausea'],
            medications: ['Lisinopril 20mg daily', 'Metformin 1000mg BID', 'Aspirin 81mg daily'],
            pastHistory: ['HTN x 10 years', 'DM Type 2 x 5 years', 'Father died of MI at 58'],
            lastOralIntake: 'Coffee and pastry at 13:00',
            events: 'Sudden onset while watching TV, pain unlike anything before'
          },
          opqrst: {
            onset: 'Sudden, 45 minutes ago while sitting',
            provocation: 'Nothing relieves, movement worsens slightly',
            quality: 'Crushing, squeezing, like elephant on chest',
            radiation: 'Left arm, jaw, occasionally to back',
            severity: 9,
            timing: 'Constant since onset, gradually worsening'
          }
        }
      },
      
      interventions: [
        {
          time: '14:36',
          intervention: 'High-flow oxygen via non-rebreather mask',
          dosage: '15 LPM',
          route: 'Inhalation',
          performer: 'J. Martinez',
          patientResponse: 'Improved breathing comfort, SpO2 increased to 98%'
        },
        {
          time: '14:38',
          intervention: 'Aspirin administration',
          dosage: '324mg',
          route: 'PO (chewed)',
          performer: 'S. Johnson',
          patientResponse: 'No immediate change in symptoms, tolerated well'
        },
        {
          time: '14:42',
          intervention: 'Nitroglycerin assistance',
          dosage: '0.4mg',
          route: 'Sublingual',
          performer: 'J. Martinez',
          patientResponse: 'Pain decreased from 9/10 to 6/10, BP dropped to 145/88',
          reassessmentTime: '14:47'
        },
        {
          time: '14:55',
          intervention: 'Second nitroglycerin dose',
          dosage: '0.4mg',
          route: 'Sublingual',
          performer: 'J. Martinez',
          patientResponse: 'Further pain reduction to 4/10, stable vital signs'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to cardiac center',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Metro General Hospital - Cardiac Center',
        accompaniedBy: ['Wife'],
        specialConsiderations: ['Cardiac monitor', 'IV access attempted en route', 'Frequent reassessment']
      },
      
      disposition: {
        receivingFacility: 'Metro General Hospital Emergency Department',
        receivingPhysician: 'Dr. Anderson',
        reportGivenTo: 'RN Kelly Thompson',
        patientCondition: 'Stable, chest pain improved with treatment',
        familyNotification: 'Wife accompanied patient, other family notified',
        continuingCare: ['Cardiology consultation', '12-lead ECG', 'Cardiac enzymes', 'Chest X-ray']
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'medical-complexity',
        description: 'Patient had atypical presentation with jaw pain predominating initially',
        learningPoint: 'Document exact patient quotes for pain description',
        correctApproach: 'Use quotation marks for patient\'s own words about symptoms'
      },
      {
        id: 'challenge-002',
        type: 'legal-risk',
        description: 'Patient initially refused transport after first nitroglycerin dose',
        learningPoint: 'Document all refusals and how they were addressed',
        correctApproach: 'Record exact conversation, patient education provided, and final decision'
      },
      {
        id: 'challenge-003',
        type: 'time-pressure',
        description: 'Multiple interventions performed simultaneously during critical period',
        learningPoint: 'Accurate timing is crucial for medication administration',
        correctApproach: 'Use synchronized watches, document exact times for all medications'
      }
    ],
    
    learningObjectives: [
      'Document cardiac emergency with appropriate medical terminology',
      'Record medication administration with complete details',
      'Demonstrate proper SOAP format for complex medical case',
      'Document patient refusal and subsequent consent appropriately',
      'Record vital sign trends and patient response to treatment'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All required elements present including times, doses, responses',
        weight: 30,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Medical information, medications, and vital signs correctly documented',
        weight: 25,
        passingThreshold: 90
      },
      {
        category: 'objectivity',
        description: 'Facts separated from opinions, patient quotes used appropriately',
        weight: 20,
        passingThreshold: 80
      },
      {
        category: 'legality',
        description: 'Documentation provides legal protection, consent issues addressed',
        weight: 15,
        passingThreshold: 85
      },
      {
        category: 'professionalism',
        description: 'Appropriate language, clear communication, proper format',
        weight: 10,
        passingThreshold: 75
      }
    ],
    
    commonErrors: [
      'Omitting exact medication times',
      'Failing to document patient refusal conversation',
      'Using subjective language instead of objective observations',
      'Incomplete vital sign documentation',
      'Missing reassessment after interventions'
    ],
    
    bestPractices: [
      'Use military time consistently throughout documentation',
      'Document exact patient quotes for symptoms',
      'Include all medication administration details',
      'Record vital signs with position and method',
      'Document decision-making process for treatment choices'
    ]
  },
  
  {
    id: 'pcr-002',
    title: 'Multi-Patient Motor Vehicle Collision',
    type: 'trauma',
    complexity: 'critical',
    estimatedTime: 35,
    
    callInformation: {
      dispatchTime: '22:15',
      dispatchNature: 'MVA with injuries, multiple patients, possible entrapment',
      responseMode: 'emergency',
      arrivalTime: '22:23',
      departTime: '23:12',
      hospitalArrivalTime: '23:28',
      unitNumber: 'M-12',
      crew: [
        { name: 'T. Williams', certification: 'EMT-B', role: 'primary' },
        { name: 'R. Davis', certification: 'AEMT', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 28,
        sex: 'female',
        weight: 65,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Driver seat of sedan, highway intersection',
        position: 'Conscious, sitting upright, restrained by seatbelt',
        mentalStatus: 'Alert but confused about events',
        chiefComplaint: 'Neck and back pain, asks repeatedly about other car',
        apparentDistress: 'Moderate distress, concerned about other occupants',
        environmentalFactors: ['Dark roadway', 'Rain', 'Traffic hazard', 'Fire department on scene']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, speaking clearly but asking repetitive questions',
          breathing: 'Adequate rate and depth, 18/min, no distress',
          circulation: 'Strong radial pulse, 92 bpm regular, skin warm and dry',
          disability: 'Alert but confused about time and events (A&O x2)',
          exposure: 'Seatbelt marks on chest, no obvious bleeding'
        },
        
        vitals: [
          {
            time: '22:28',
            bloodPressure: '134/88',
            heartRate: 92,
            respiratoryRate: 18,
            oxygenSaturation: 99,
            mentalStatus: 'Alert, oriented to person and place only',
            method: 'Manual BP, pulse oximetry',
            position: 'Sitting in vehicle'
          },
          {
            time: '22:45',
            bloodPressure: '138/90',
            heartRate: 96,
            respiratoryRate: 20,
            oxygenSaturation: 100,
            mentalStatus: 'Alert, oriented x3 (improving)',
            method: 'Automated BP',
            position: 'Supine on backboard'
          },
          {
            time: '23:05',
            bloodPressure: '142/92',
            heartRate: 98,
            respiratoryRate: 18,
            oxygenSaturation: 100,
            mentalStatus: 'Alert x4, recalls events now',
            method: 'Automated monitor',
            position: 'Supine on stretcher'
          }
        ],
        
        secondary: {
          head: 'Small contusion on forehead, PERRL, no skull deformity',
          neck: 'C-collar applied, tenderness to palpation C3-C5',
          chest: 'Equal expansion, clear bilaterally, seatbelt mark across sternum',
          abdomen: 'Soft, non-tender, seatbelt mark visible',
          pelvis: 'Stable to palpation, no tenderness',
          extremities: 'No deformities, distal pulses present, full ROM',
          posterior: 'No step-offs or deformity on log roll'
        },
        
        neurologicalExam: {
          gcs: 14,
          pupils: 'PERRL 3mm bilaterally',
          motorFunction: 'Moves all extremities on command',
          sensoryFunction: 'Intact to light touch all extremities'
        },
        
        history: {
          sample: {
            signs: ['Neck pain', 'Headache', 'Chest tenderness from seatbelt'],
            allergies: ['NKDA'],
            medications: ['None'],
            pastHistory: ['No significant medical history'],
            lastOralIntake: 'Dinner at 19:00',
            events: 'Other car ran red light, T-bone collision on driver side'
          }
        }
      },
      
      interventions: [
        {
          time: '22:25',
          intervention: 'Manual cervical spine stabilization',
          performer: 'T. Williams',
          patientResponse: 'Patient cooperative, maintained alignment'
        },
        {
          time: '22:30',
          intervention: 'Cervical collar application',
          dosage: 'Philadelphia collar, appropriately sized',
          performer: 'R. Davis',
          patientResponse: 'Tolerated well, reports feeling more secure'
        },
        {
          time: '22:38',
          intervention: 'Spinal immobilization to long backboard',
          performer: 'Fire department and EMS crew',
          patientResponse: 'Procedure completed without complications'
        },
        {
          time: '22:42',
          intervention: 'Oxygen administration',
          dosage: '2 LPM',
          route: 'Nasal cannula',
          performer: 'R. Davis',
          patientResponse: 'Maintained SpO2 100%'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to trauma center',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Regional Trauma Center',
        specialConsiderations: ['Spinal precautions', 'Neurological monitoring', 'Head injury protocol']
      },
      
      disposition: {
        receivingFacility: 'Regional Trauma Center Emergency Department',
        reportGivenTo: 'Dr. Martinez and RN Sarah Lee',
        patientCondition: 'Stable, improving mental status, spinal precautions maintained',
        continuingCare: ['CT head and C-spine', 'Neurosurgery consultation', 'Trauma surgery evaluation']
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'medical-complexity',
        description: 'Initial altered mental status requiring neurological monitoring',
        learningPoint: 'Document exact mental status changes with times',
        correctApproach: 'Use specific orientation assessments (A&O x2, x3, x4) with times'
      },
      {
        id: 'challenge-002',
        type: 'legal-risk',
        description: 'High-speed collision with potential for delayed symptom onset',
        learningPoint: 'Document mechanism of injury in detail for trauma center',
        correctApproach: 'Include speed estimates, point of impact, vehicle damage description'
      },
      {
        id: 'challenge-003',
        type: 'time-pressure',
        description: 'Multiple patients requiring triage and resource allocation',
        learningPoint: 'Document why this patient was prioritized for transport',
        correctApproach: 'Briefly note triage decisions and reasoning in narrative'
      }
    ],
    
    learningObjectives: [
      'Document trauma assessment with spinal precautions',
      'Record neurological status changes over time',
      'Demonstrate multi-patient incident documentation',
      'Document mechanism of injury appropriately',
      'Record team-based interventions and coordination'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'Trauma assessment, spinal care, and neurological status documented',
        weight: 35,
        passingThreshold: 90
      },
      {
        category: 'accuracy',
        description: 'Mechanism, times, and medical information accurate',
        weight: 25,
        passingThreshold: 85
      },
      {
        category: 'objectivity',
        description: 'Neurological changes documented objectively',
        weight: 20,
        passingThreshold: 80
      },
      {
        category: 'legality',
        description: 'Documentation supports trauma center transport decision',
        weight: 20,
        passingThreshold: 85
      }
    ],
    
    commonErrors: [
      'Vague mechanism of injury description',
      'Incomplete neurological assessment documentation',
      'Missing spinal immobilization details',
      'Inadequate time documentation for status changes',
      'Failure to document team member contributions'
    ],
    
    bestPractices: [
      'Document exact mechanism with specific details',
      'Record neurological status at regular intervals',
      'Include GCS scores when applicable',
      'Document all team members involved in care',
      'Note specific spinal precaution techniques used'
    ]
  },

  {
    id: 'pcr-003',
    title: 'Respiratory Distress - COPD Exacerbation',
    type: 'medical',
    complexity: 'moderate',
    estimatedTime: 20,
    
    callInformation: {
      dispatchTime: '03:42',
      dispatchNature: 'Difficulty breathing, 72-year-old female, conscious',
      responseMode: 'emergency',
      arrivalTime: '03:48',
      departTime: '04:15',
      hospitalArrivalTime: '04:29',
      unitNumber: 'M-23',
      crew: [
        { name: 'K. Thompson', certification: 'EMT-B', role: 'primary' },
        { name: 'M. Garcia', certification: 'EMT-B', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 72,
        sex: 'female',
        weight: 58,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Bedroom, assisted living facility',
        position: 'Sitting on edge of bed, tripod position',
        mentalStatus: 'Alert, anxious, difficulty speaking in full sentences',
        chiefComplaint: 'Can\'t catch my breath, getting worse for 2 days',
        apparentDistress: 'Severe respiratory distress, accessory muscle use',
        environmentalFactors: ['Facility staff present', 'Oxygen concentrator in room']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, speaking 2-3 words per breath',
          breathing: 'Labored, 28/min, pursed lip breathing, accessory muscles',
          circulation: 'Pulse 110 bpm regular, skin warm, slight cyanosis around lips',
          disability: 'Alert x3 (confused about time), follows commands',
          exposure: 'No trauma, barrel chest noted'
        },
        
        vitals: [
          {
            time: '03:52',
            bloodPressure: '152/88',
            heartRate: 110,
            respiratoryRate: 28,
            temperature: 100.8,
            oxygenSaturation: 84,
            painScore: 0,
            mentalStatus: 'Alert x3',
            method: 'Manual BP, pulse oximetry',
            position: 'Sitting upright'
          },
          {
            time: '04:05',
            bloodPressure: '145/85',
            heartRate: 105,
            respiratoryRate: 24,
            temperature: 100.8,
            oxygenSaturation: 91,
            painScore: 0,
            mentalStatus: 'Alert x4',
            method: 'Automated BP, pulse oximetry',
            position: 'High Fowler\'s on stretcher'
          }
        ],
        
        secondary: {
          respiratory: 'Decreased breath sounds bilaterally, expiratory wheezes, prolonged expiration',
          cardiovascular: 'Regular rate and rhythm, no murmurs',
          neurological: 'Alert, anxious, follows commands appropriately'
        },
        
        history: {
          sample: {
            signs: ['Shortness of breath', 'Productive cough with yellow sputum', 'Fatigue'],
            allergies: ['Penicillin'],
            medications: ['Albuterol inhaler', 'Prednisone', 'Lisinopril', 'Furosemide'],
            pastHistory: ['COPD', 'Hypertension', 'Heart failure'],
            lastOralIntake: '6 hours ago - water only',
            events: 'Gradual worsening over 2 days, used inhaler multiple times'
          }
        }
      },
      
      interventions: [
        {
          time: '03:54',
          intervention: 'High-flow oxygen via non-rebreather mask',
          dosage: '15 LPM',
          route: 'Inhalation',
          performer: 'K. Thompson',
          patientResponse: 'SpO2 improved from 84% to 91%, patient reports slight improvement'
        },
        {
          time: '04:02',
          intervention: 'Position of comfort - high Fowler\'s position',
          dosage: '',
          route: '',
          performer: 'M. Garcia',
          patientResponse: 'Patient states feels slightly better sitting up'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to medical center',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Regional Medical Center',
        accompaniedBy: ['Facility staff member'],
        specialConsiderations: ['High-flow oxygen', 'Continuous pulse oximetry', 'COPD exacerbation protocol']
      },
      
      disposition: {
        receivingFacility: 'Regional Medical Center Emergency Department',
        receivingPhysician: 'Dr. Chen',
        reportGivenTo: 'Charge nurse Jennifer',
        patientCondition: 'Stable but guarded, requiring advanced respiratory support',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'medical-complexity',
        description: 'Multiple chronic conditions affecting respiratory status',
        learningPoint: 'Document relationship between COPD and heart failure',
        correctApproach: 'Note how conditions interact and affect treatment decisions'
      }
    ],
    
    learningObjectives: [
      'Document respiratory emergency with accurate medical terminology',
      'Record chronic disease management and medication history',
      'Demonstrate proper vital sign trending documentation',
      'Document oxygen therapy administration and response'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All respiratory assessment elements documented',
        weight: 35,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Correct medical terminology and vital signs',
        weight: 30,
        passingThreshold: 90
      }
    ],
    
    commonErrors: [
      'Incomplete respiratory assessment documentation',
      'Missing medication history details',
      'Inadequate oxygen therapy documentation'
    ],
    
    bestPractices: [
      'Document exact respiratory sounds and locations',
      'Include all chronic medications and dosages',
      'Record specific oxygen delivery method and flow rate',
      'Note patient positioning throughout care'
    ]
  },

  {
    id: 'pcr-004',
    title: 'Pediatric Febrile Seizure',
    type: 'pediatric',
    complexity: 'moderate',
    estimatedTime: 18,
    
    callInformation: {
      dispatchTime: '16:33',
      dispatchNature: 'Pediatric seizure, 2-year-old, conscious and breathing',
      responseMode: 'emergency',
      arrivalTime: '16:39',
      departTime: '17:02',
      hospitalArrivalTime: '17:14',
      unitNumber: 'M-08',
      crew: [
        { name: 'A. Rodriguez', certification: 'EMT-B', role: 'primary' },
        { name: 'D. Kim', certification: 'EMT-B', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 2,
        sex: 'male',
        weight: 14,
        race: 'Asian'
      },
      
      initialPresentation: {
        location: 'Living room floor, single family home',
        position: 'Post-ictal, lying on side in mother\'s arms',
        mentalStatus: 'Lethargic but responsive to voice, confused',
        chiefComplaint: 'Mother reports child had seizure lasting 3-4 minutes',
        apparentDistress: 'Mild distress, sleepy appearing, flushed',
        environmentalFactors: ['Very concerned parents present', 'Other children in home']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, no secretions, breathing spontaneously',
          breathing: 'Adequate rate and depth, 24/min, clear bilaterally',
          circulation: 'Pulse 140 bpm regular, skin hot and flushed',
          disability: 'Lethargic but arousable, moving all extremities',
          exposure: 'No trauma, very warm to touch, flushed skin'
        },
        
        vitals: [
          {
            time: '16:43',
            bloodPressure: '95/60',
            heartRate: 140,
            respiratoryRate: 24,
            temperature: 103.8,
            oxygenSaturation: 98,
            painScore: 0,
            mentalStatus: 'Lethargic, responds to voice',
            method: 'Pediatric cuff, pulse oximetry',
            position: 'In mother\'s arms'
          },
          {
            time: '16:55',
            bloodPressure: '92/58',
            heartRate: 128,
            respiratoryRate: 22,
            temperature: 102.4,
            oxygenSaturation: 99,
            painScore: 0,
            mentalStatus: 'More alert, recognizes parents',
            method: 'Pediatric cuff, pulse oximetry',
            position: 'On stretcher with parent'
          }
        ],
        
        secondary: {
          neurological: 'Post-ictal state improving, pupils equal and reactive, no focal deficits',
          skin: 'Hot, flushed, diaphoretic',
          respiratory: 'Clear breath sounds bilaterally'
        },
        
        history: {
          sample: {
            signs: ['Fever for 2 days', 'Decreased appetite', 'General fussiness'],
            allergies: ['No known allergies'],
            medications: ['Children\'s Tylenol given 6 hours ago'],
            pastHistory: ['Healthy child, no previous seizures'],
            lastOralIntake: '2 hours ago - small amount of juice',
            events: 'Child developed high fever, then generalized tonic-clonic seizure'
          }
        }
      },
      
      interventions: [
        {
          time: '16:45',
          intervention: 'Passive cooling measures - remove excess clothing',
          dosage: '',
          route: '',
          performer: 'A. Rodriguez',
          patientResponse: 'Temperature decreased to 102.4°F, child more alert'
        },
        {
          time: '16:48',
          intervention: 'Position of comfort in parent\'s arms, then secure on stretcher',
          dosage: '',
          route: '',
          performer: 'D. Kim',
          patientResponse: 'Child calmer with parent present'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to children\'s hospital',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Children\'s Hospital',
        accompaniedBy: ['Mother'],
        specialConsiderations: ['Continuous observation', 'Vital signs q5min', 'Parent at bedside']
      },
      
      disposition: {
        receivingFacility: 'Children\'s Hospital Emergency Department',
        receivingPhysician: 'Dr. Martinez',
        reportGivenTo: 'Pediatric nurse',
        patientCondition: 'Stable, alert and interactive, first-time febrile seizure',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'communication-barrier',
        description: 'Obtaining history from distraught parents',
        learningPoint: 'Document parent\'s account accurately while managing emotions',
        correctApproach: 'Use direct quotes and calm, professional documentation'
      }
    ],
    
    learningObjectives: [
      'Document pediatric emergency with age-appropriate vital signs',
      'Record seizure activity and post-ictal period accurately',
      'Demonstrate proper fever management documentation',
      'Document family involvement in pediatric care'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All pediatric-specific elements documented',
        weight: 30,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Correct pediatric vital signs and terminology',
        weight: 25,
        passingThreshold: 90
      }
    ],
    
    commonErrors: [
      'Using adult vital sign ranges for pediatric patient',
      'Incomplete seizure description',
      'Missing parent/caregiver information'
    ],
    
    bestPractices: [
      'Use pediatric-specific vital sign ranges',
      'Document exact seizure description from witnesses',
      'Include parent involvement throughout care',
      'Note child\'s developmental appropriateness'
    ]
  },

  {
    id: 'pcr-005',
    title: 'Diabetic Emergency - Hypoglycemia',
    type: 'medical',
    complexity: 'straightforward',
    estimatedTime: 15,
    
    callInformation: {
      dispatchTime: '11:15',
      dispatchNature: 'Unconscious person, possible diabetic emergency',
      responseMode: 'emergency',
      arrivalTime: '11:22',
      departTime: '11:45',
      hospitalArrivalTime: '11:58',
      unitNumber: 'M-31',
      crew: [
        { name: 'L. Wilson', certification: 'EMT-B', role: 'primary' },
        { name: 'C. Brown', certification: 'AEMT', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 45,
        sex: 'female',
        weight: 68,
        race: 'African American'
      },
      
      initialPresentation: {
        location: 'Office building, employee break room',
        position: 'Supine on floor, coworkers around patient',
        mentalStatus: 'Unconscious, responds to painful stimuli',
        chiefComplaint: 'Coworkers found patient unconscious, known diabetic',
        apparentDistress: 'Unconscious, diaphoretic, pale',
        environmentalFactors: ['Concerned coworkers present', 'Insulin pen found nearby']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, no secretions, snoring respirations',
          breathing: 'Adequate rate and depth, 16/min, clear bilaterally',
          circulation: 'Pulse 92 bpm regular, skin cool and diaphoretic',
          disability: 'Unconscious, responds to pain, no obvious paralysis',
          exposure: 'No trauma, medical alert bracelet noted'
        },
        
        vitals: [
          {
            time: '11:26',
            bloodPressure: '118/78',
            heartRate: 92,
            respiratoryRate: 16,
            temperature: 98.6,
            oxygenSaturation: 97,
            painScore: 0,
            mentalStatus: 'Unconscious',
            method: 'Manual BP, pulse oximetry',
            position: 'Supine'
          },
          {
            time: '11:38',
            bloodPressure: '122/80',
            heartRate: 88,
            respiratoryRate: 18,
            temperature: 98.6,
            oxygenSaturation: 98,
            painScore: 0,
            mentalStatus: 'Alert and oriented x4',
            method: 'Automated BP, pulse oximetry',
            position: 'Sitting on stretcher'
          }
        ],
        
        secondary: {
          neurological: 'Initially unconscious, post-treatment alert x4, no deficits',
          skin: 'Initially cool and diaphoretic, improved after treatment',
          cardiovascular: 'Regular rate and rhythm'
        },
        
        history: {
          sample: {
            signs: ['Unconsciousness', 'Diaphoresis', 'Pale skin'],
            allergies: ['Sulfa drugs'],
            medications: ['Insulin (Humalog)', 'Metformin'],
            pastHistory: ['Type 1 diabetes', 'Hypertension'],
            lastOralIntake: 'Skipped lunch, coffee only at 10 AM',
            events: 'Normal morning, took insulin as usual, missed lunch meeting'
          }
        }
      },
      
      interventions: [
        {
          time: '11:28',
          intervention: 'Oral glucose administration',
          dosage: '15g',
          route: 'PO',
          performer: 'L. Wilson',
          patientResponse: 'Patient became conscious within 5 minutes, oriented x4'
        },
        {
          time: '11:35',
          intervention: 'Additional oral glucose administration',
          dosage: '15g',
          route: 'PO',
          performer: 'C. Brown',
          patientResponse: 'Patient reports feeling much better, strength improving'
        }
      ],
      
      transport: {
        transportDecision: 'Non-emergency transport for evaluation',
        transportMode: 'stretcher',
        transportPriority: 'non-emergency',
        destination: 'Community General Hospital',
        accompaniedBy: [],
        specialConsiderations: ['Vital signs q10min', 'Neurological checks', 'Blood glucose monitoring']
      },
      
      disposition: {
        receivingFacility: 'Community General Hospital Emergency Department',
        receivingPhysician: 'Dr. Patterson',
        reportGivenTo: 'Triage nurse',
        patientCondition: 'Stable, alert and oriented, diabetic emergency resolved',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'time-pressure',
        description: 'Rapid assessment and treatment of unconscious patient',
        learningPoint: 'Document timeline of consciousness changes accurately',
        correctApproach: 'Record exact times of interventions and response'
      }
    ],
    
    learningObjectives: [
      'Document diabetic emergency with proper glucose administration',
      'Record neurological status changes accurately',
      'Demonstrate medication administration documentation',
      'Document bystander information appropriately'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All diabetic emergency elements documented',
        weight: 30,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Correct medication dosage and timing',
        weight: 35,
        passingThreshold: 95
      }
    ],
    
    commonErrors: [
      'Missing exact glucose dosage amounts',
      'Incomplete neurological status documentation',
      'Not documenting bystander information'
    ],
    
    bestPractices: [
      'Document exact glucose amounts and times',
      'Record detailed neurological status changes',
      'Include medical alert bracelet information',
      'Note missed meals or medication timing issues'
    ]
  },

  {
    id: 'pcr-006',
    title: 'Elderly Fall with Hip Fracture',
    type: 'geriatric',
    complexity: 'moderate',
    estimatedTime: 22,
    
    callInformation: {
      dispatchTime: '09:18',
      dispatchNature: 'Fall, 84-year-old female, hip pain, unable to walk',
      responseMode: 'emergency',
      arrivalTime: '09:24',
      departTime: '09:58',
      hospitalArrivalTime: '10:12',
      unitNumber: 'M-45',
      crew: [
        { name: 'J. Anderson', certification: 'EMT-B', role: 'primary' },
        { name: 'P. Martinez', certification: 'EMT-B', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 84,
        sex: 'female',
        weight: 52,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Bathroom floor, assisted living apartment',
        position: 'Supine, left leg externally rotated and shortened',
        mentalStatus: 'Alert and oriented x4, moderate pain',
        chiefComplaint: 'Severe left hip pain after fall, unable to move leg',
        apparentDistress: 'Moderate distress from pain, anxious',
        environmentalFactors: ['Bathroom small space', 'Caregiver present', 'Walker nearby']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, speaking clearly',
          breathing: 'Adequate rate and depth, 20/min due to pain',
          circulation: 'Pulse 88 bpm regular, skin warm and dry',
          disability: 'Alert x4, left leg deformity and pain',
          exposure: 'Left hip deformity, external rotation, shortening'
        },
        
        vitals: [
          {
            time: '09:28',
            bloodPressure: '158/92',
            heartRate: 88,
            respiratoryRate: 20,
            temperature: 98.2,
            oxygenSaturation: 96,
            painScore: 8,
            mentalStatus: 'Alert x4',
            method: 'Manual BP, pulse oximetry',
            position: 'Supine on floor'
          },
          {
            time: '09:45',
            bloodPressure: '145/85',
            heartRate: 82,
            respiratoryRate: 18,
            temperature: 98.2,
            oxygenSaturation: 98,
            painScore: 6,
            mentalStatus: 'Alert x4',
            method: 'Automated BP, pulse oximetry',
            position: 'Immobilized on backboard'
          }
        ],
        
        secondary: {
          musculoskeletal: 'Left hip externally rotated, shortened, severe tenderness, unable to bear weight',
          neurological: 'Alert x4, follows commands, no deficits in upper extremities',
          skin: 'Intact, no lacerations, normal color and temperature'
        },
        
        history: {
          sample: {
            signs: ['Hip pain', 'Leg deformity', 'Unable to walk'],
            allergies: ['Codeine', 'Shellfish'],
            medications: ['Aricept', 'Lisinopril', 'Calcium', 'Vitamin D'],
            pastHistory: ['Dementia (early stage)', 'Hypertension', 'Osteoporosis'],
            lastOralIntake: '2 hours ago - breakfast',
            events: 'Patient reports tripping over bath mat while getting ready'
          }
        }
      },
      
      interventions: [
        {
          time: '09:32',
          intervention: 'Spinal immobilization on long backboard',
          dosage: '',
          route: '',
          performer: 'J. Anderson',
          patientResponse: 'Patient tolerated immobilization, pain slightly decreased'
        },
        {
          time: '09:36',
          intervention: 'Left leg immobilized in position found',
          dosage: '',
          route: '',
          performer: 'P. Martinez',
          patientResponse: 'Patient reports decreased pain with immobilization'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to trauma center',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Regional Medical Center',
        accompaniedBy: ['Caregiver'],
        specialConsiderations: ['Spinal immobilization', 'Vital signs q10min', 'Pain assessment']
      },
      
      disposition: {
        receivingFacility: 'Regional Medical Center Emergency Department',
        receivingPhysician: 'Dr. Lee',
        reportGivenTo: 'Charge nurse',
        patientCondition: 'Stable with isolated injury, suspected hip fracture',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'medical-complexity',
        description: 'Multiple age-related conditions affecting care',
        learningPoint: 'Document how dementia and osteoporosis impact assessment',
        correctApproach: 'Note cognitive status and fall risk factors'
      }
    ],
    
    learningObjectives: [
      'Document geriatric trauma with appropriate considerations',
      'Record fracture assessment and immobilization',
      'Demonstrate fall mechanism documentation',
      'Document age-related medication and condition factors'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All geriatric trauma elements documented',
        weight: 30,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Correct immobilization and assessment details',
        weight: 25,
        passingThreshold: 90
      }
    ],
    
    commonErrors: [
      'Incomplete fall mechanism documentation',
      'Missing medication list details',
      'Inadequate pain assessment documentation'
    ],
    
    bestPractices: [
      'Document exact fall mechanism and contributing factors',
      'Include all medications and medical conditions',
      'Note cognitive status throughout care',
      'Document immobilization techniques specifically'
    ]
  },

  {
    id: 'pcr-007',
    title: 'Behavioral Emergency - Suicidal Ideation',
    type: 'behavioral',
    complexity: 'complex',
    estimatedTime: 28,
    
    callInformation: {
      dispatchTime: '19:42',
      dispatchNature: 'Psychiatric emergency, 29-year-old male, threats of self-harm',
      responseMode: 'emergency',
      arrivalTime: '19:48',
      departTime: '20:25',
      hospitalArrivalTime: '20:38',
      unitNumber: 'M-19',
      crew: [
        { name: 'S. Taylor', certification: 'EMT-B', role: 'primary' },
        { name: 'B. Johnson', certification: 'EMT-B', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 29,
        sex: 'male',
        weight: 75,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Apartment bedroom, 3rd floor',
        position: 'Sitting on bed, cooperative but withdrawn',
        mentalStatus: 'Alert, oriented, depressed mood, admits to suicidal thoughts',
        chiefComplaint: 'Family called concerned about patient\'s statements about wanting to die',
        apparentDistress: 'Emotional distress, tearful, appears exhausted',
        environmentalFactors: ['Police on scene', 'Concerned family members', 'Medication bottles visible']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, speaking clearly but quietly',
          breathing: 'Adequate rate and depth, 16/min, occasional sighs',
          circulation: 'Pulse 78 bpm regular, skin warm and dry',
          disability: 'Alert x4, no neurological deficits, cooperative',
          exposure: 'No signs of self-harm or trauma'
        },
        
        vitals: [
          {
            time: '19:52',
            bloodPressure: '128/82',
            heartRate: 78,
            respiratoryRate: 16,
            temperature: 98.4,
            oxygenSaturation: 98,
            painScore: 0,
            mentalStatus: 'Alert x4, depressed',
            method: 'Manual BP, pulse oximetry',
            position: 'Sitting on bed'
          },
          {
            time: '20:10',
            bloodPressure: '125/80',
            heartRate: 76,
            respiratoryRate: 14,
            temperature: 98.4,
            oxygenSaturation: 99,
            painScore: 0,
            mentalStatus: 'Alert x4, calmer',
            method: 'Automated BP, pulse oximetry',
            position: 'Sitting on stretcher'
          }
        ],
        
        secondary: {
          psychiatric: 'Depressed mood, admits to passive suicidal ideation, denies active plan',
          neurological: 'Alert x4, appropriate responses, no cognitive deficits',
          physical: 'No signs of injury or self-harm'
        },
        
        history: {
          sample: {
            signs: ['Depression', 'Statements about wanting to die', 'Social withdrawal'],
            allergies: ['No known allergies'],
            medications: ['Sertraline', 'Lorazepam PRN'],
            pastHistory: ['Depression', 'Anxiety', 'Previous psychiatric hospitalization 2 years ago'],
            lastOralIntake: '6 hours ago - minimal food intake',
            events: 'Recent job loss, relationship ended, stopped taking medications 1 week ago'
          }
        }
      },
      
      interventions: [
        {
          time: '19:55',
          intervention: 'Established rapport, active listening, non-judgmental approach',
          dosage: '',
          route: '',
          performer: 'S. Taylor',
          patientResponse: 'Patient became more communicative, agreed to voluntary transport'
        },
        {
          time: '20:05',
          intervention: 'Continuous observation, removed potential harmful objects from reach',
          dosage: '',
          route: '',
          performer: 'B. Johnson',
          patientResponse: 'Patient remained cooperative, no escalation'
        }
      ],
      
      transport: {
        transportDecision: 'Voluntary psychiatric evaluation transport',
        transportMode: 'stretcher',
        transportPriority: 'non-emergency',
        destination: 'County Mental Health Crisis Center',
        accompaniedBy: ['Family member'],
        specialConsiderations: ['Continuous observation', 'Vital signs q15min', 'Therapeutic communication']
      },
      
      disposition: {
        receivingFacility: 'County Mental Health Crisis Center',
        receivingPhysician: 'Dr. Williams',
        reportGivenTo: 'Psychiatric nurse',
        patientCondition: 'Stable, cooperative, voluntary psychiatric evaluation',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'legal-risk',
        description: 'Documenting psychiatric emergency and involuntary hold considerations',
        learningPoint: 'Accurate documentation protects patient rights and legal requirements',
        correctApproach: 'Use exact quotes and objective observations only'
      },
      {
        id: 'challenge-002',
        type: 'ethical-dilemma',
        description: 'Balancing patient confidentiality with safety concerns',
        learningPoint: 'Document safety interventions without violating privacy',
        correctApproach: 'Focus on observable behaviors and necessary safety measures'
      }
    ],
    
    learningObjectives: [
      'Document psychiatric emergency with appropriate terminology',
      'Record suicidal assessment and safety interventions',
      'Demonstrate therapeutic communication documentation',
      'Document legal considerations for psychiatric transport'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All psychiatric assessment elements documented',
        weight: 25,
        passingThreshold: 85
      },
      {
        category: 'legality',
        description: 'Documentation supports psychiatric hold if needed',
        weight: 30,
        passingThreshold: 90
      },
      {
        category: 'professionalism',
        description: 'Respectful and non-judgmental language used',
        weight: 20,
        passingThreshold: 85
      }
    ],
    
    commonErrors: [
      'Using judgmental language or personal opinions',
      'Incomplete suicide risk assessment documentation',
      'Missing legal considerations for psychiatric holds'
    ],
    
    bestPractices: [
      'Use patient\'s exact words in quotes for suicidal statements',
      'Document specific safety interventions taken',
      'Include family/police involvement objectively',
      'Note voluntary vs. involuntary transport status clearly'
    ]
  },

  {
    id: 'pcr-008',
    title: 'Anaphylactic Reaction - Food Allergy',
    type: 'medical',
    complexity: 'complex',
    estimatedTime: 25,
    
    callInformation: {
      dispatchTime: '12:45',
      dispatchNature: 'Allergic reaction, 22-year-old female, difficulty breathing',
      responseMode: 'emergency',
      arrivalTime: '12:51',
      departTime: '13:18',
      hospitalArrivalTime: '13:29',
      unitNumber: 'M-07',
      crew: [
        { name: 'R. Chen', certification: 'EMT-B', role: 'primary' },
        { name: 'T. Davis', certification: 'AEMT', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 22,
        sex: 'female',
        weight: 62,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Restaurant table, busy lunch hour',
        position: 'Sitting upright, leaning forward, anxious',
        mentalStatus: 'Alert, anxious, difficulty speaking due to swelling',
        chiefComplaint: 'Throat swelling and difficulty breathing after eating shrimp',
        apparentDistress: 'Severe distress, stridor audible, facial swelling',
        environmentalFactors: ['Restaurant staff present', 'Friends with patient', 'EpiPen used by friend']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Compromised, inspiratory stridor, tongue and lip swelling',
          breathing: 'Labored, 28/min, accessory muscle use, wheezing',
          circulation: 'Pulse 120 bpm regular, skin flushed with hives',
          disability: 'Alert x4, anxious, no neurological deficits',
          exposure: 'Generalized urticaria, facial angioedema'
        },
        
        vitals: [
          {
            time: '12:54',
            bloodPressure: '95/58',
            heartRate: 120,
            respiratoryRate: 28,
            temperature: 99.2,
            oxygenSaturation: 88,
            painScore: 0,
            mentalStatus: 'Alert x4, anxious',
            method: 'Manual BP, pulse oximetry',
            position: 'Sitting upright'
          },
          {
            time: '13:08',
            bloodPressure: '110/68',
            heartRate: 100,
            respiratoryRate: 22,
            temperature: 99.2,
            oxygenSaturation: 94,
            painScore: 0,
            mentalStatus: 'Alert x4, less anxious',
            method: 'Automated BP, pulse oximetry',
            position: 'High Fowler\'s on stretcher'
          }
        ],
        
        secondary: {
          respiratory: 'Inspiratory stridor, bilateral wheezes, decreased air movement',
          cardiovascular: 'Tachycardic, hypotensive initially',
          integumentary: 'Generalized urticaria, facial and lip angioedema',
          gastrointestinal: 'Nausea, denies vomiting or diarrhea'
        },
        
        history: {
          sample: {
            signs: ['Throat swelling', 'Difficulty breathing', 'Hives', 'Nausea'],
            allergies: ['Shellfish (known)', 'Latex'],
            medications: ['Birth control pills', 'Carries EpiPen'],
            pastHistory: ['Previous anaphylaxis to shrimp 3 years ago'],
            lastOralIntake: '15 minutes ago - shrimp scampi',
            events: 'Ate shrimp unknowingly in pasta dish, symptoms began within 5 minutes'
          }
        }
      },
      
      interventions: [
        {
          time: '12:52',
          intervention: 'EpiPen administered by friend prior to EMS arrival',
          dosage: '0.3mg',
          route: 'IM',
          performer: 'Friend (bystander)',
          patientResponse: 'Patient reports slight improvement in breathing'
        },
        {
          time: '12:56',
          intervention: 'High-flow oxygen via non-rebreather mask',
          dosage: '15 LPM',
          route: 'Inhalation',
          performer: 'R. Chen',
          patientResponse: 'SpO2 improved from 88% to 94%'
        },
        {
          time: '13:02',
          intervention: 'Epinephrine administration',
          dosage: '0.3mg',
          route: 'IM',
          performer: 'T. Davis',
          patientResponse: 'Blood pressure improved, less stridor, improved air movement'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport to university medical center',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'University Medical Center',
        accompaniedBy: ['Friend'],
        specialConsiderations: ['Continuous pulse oximetry', 'Vital signs q5min', 'Airway assessment', 'Advanced airway capability']
      },
      
      disposition: {
        receivingFacility: 'University Medical Center Emergency Department',
        receivingPhysician: 'Dr. Roberts',
        reportGivenTo: 'Charge nurse',
        patientCondition: 'Improved but requiring continued monitoring for anaphylaxis',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'time-pressure',
        description: 'Rapid assessment and treatment of life-threatening allergic reaction',
        learningPoint: 'Document timeline of symptom progression and interventions',
        correctApproach: 'Record exact times of epinephrine administration and response'
      },
      {
        id: 'challenge-002',
        type: 'medical-complexity',
        description: 'Multiple medication administrations and reassessments',
        learningPoint: 'Document each intervention and patient response thoroughly',
        correctApproach: 'Use specific terminology for allergic reaction severity'
      }
    ],
    
    learningObjectives: [
      'Document anaphylactic reaction with proper medical terminology',
      'Record epinephrine administration and patient response',
      'Demonstrate allergy history documentation',
      'Document airway assessment and interventions'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All anaphylaxis assessment elements documented',
        weight: 30,
        passingThreshold: 90
      },
      {
        category: 'accuracy',
        description: 'Correct medication dosages and timing',
        weight: 35,
        passingThreshold: 95
      },
      {
        category: 'objectivity',
        description: 'Accurate description of allergic reaction severity',
        weight: 20,
        passingThreshold: 85
      }
    ],
    
    commonErrors: [
      'Incomplete epinephrine administration documentation',
      'Missing allergy history details',
      'Inadequate airway assessment documentation',
      'Not documenting bystander EpiPen administration'
    ],
    
    bestPractices: [
      'Document exact epinephrine dosage, route, and time',
      'Record detailed allergy history and previous reactions',
      'Include bystander interventions with times',
      'Document specific signs of anaphylaxis systematically',
      'Note improvement or deterioration after each intervention'
    ]
  },

  {
    id: 'pcr-009',
    title: 'Stroke Alert - CVA with Deficits',
    type: 'medical',
    complexity: 'complex',
    estimatedTime: 30,
    
    callInformation: {
      dispatchTime: '08:15',
      dispatchNature: 'Possible stroke, 67-year-old male, facial droop, difficulty speaking',
      responseMode: 'emergency',
      arrivalTime: '08:21',
      departTime: '08:48',
      hospitalArrivalTime: '09:02',
      unitNumber: 'M-14',
      crew: [
        { name: 'M. Robinson', certification: 'EMT-B', role: 'primary' },
        { name: 'K. Lee', certification: 'AEMT', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 67,
        sex: 'male',
        weight: 82,
        race: 'African American'
      },
      
      initialPresentation: {
        location: 'Kitchen table, single-story home',
        position: 'Sitting in chair, leaning to right side',
        mentalStatus: 'Alert but confused, difficulty with speech',
        chiefComplaint: 'Wife noticed sudden facial droop and slurred speech during breakfast',
        apparentDistress: 'Mild distress, frustrated by communication difficulty',
        environmentalFactors: ['Wife present as historian', 'Medications visible on counter']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent, drooling slightly from right side of mouth',
          breathing: 'Adequate rate and depth, 18/min, clear bilaterally',
          circulation: 'Pulse 68 bpm irregular, skin warm and dry',
          disability: 'Alert but confused, right-sided facial droop, right arm weakness',
          exposure: 'No trauma, right-sided neurological deficits noted'
        },
        
        vitals: [
          {
            time: '08:25',
            bloodPressure: '188/96',
            heartRate: 68,
            respiratoryRate: 18,
            temperature: 98.8,
            oxygenSaturation: 97,
            painScore: 0,
            mentalStatus: 'Alert, confused about time',
            method: 'Manual BP, pulse oximetry',
            position: 'Sitting upright'
          },
          {
            time: '08:40',
            bloodPressure: '184/94',
            heartRate: 70,
            respiratoryRate: 16,
            temperature: 98.8,
            oxygenSaturation: 98,
            painScore: 0,
            mentalStatus: 'Alert, still confused',
            method: 'Automated BP, pulse oximetry',
            position: 'Supine on stretcher'
          }
        ],
        
        secondary: {
          neurological: 'Right facial droop, right arm weakness 3/5 strength, speech slurred but understands commands',
          cardiovascular: 'Irregular rhythm, hypertensive, no murmurs',
          respiratory: 'Clear breath sounds bilaterally'
        },
        
        neurologicalExam: {
          gcs: 14,
          pupils: 'PEARL 3mm bilaterally',
          motorFunction: 'Left side normal strength, right arm weakness 3/5, right leg 4/5',
          sensoryFunction: 'Decreased sensation on right side'
        },
        
        history: {
          sample: {
            signs: ['Facial droop', 'Slurred speech', 'Right arm weakness', 'Confusion'],
            allergies: ['Aspirin'],
            medications: ['Metoprolol', 'Lisinopril', 'Atorvastatin', 'Warfarin'],
            pastHistory: ['Hypertension', 'Atrial fibrillation', 'High cholesterol'],
            lastOralIntake: '1 hour ago - coffee and toast',
            events: 'Sudden onset during breakfast, wife noticed immediate change in speech'
          }
        }
      },
      
      interventions: [
        {
          time: '08:27',
          intervention: 'Stroke scale assessment completed (Cincinnati Stroke Scale positive)',
          dosage: '',
          route: '',
          performer: 'M. Robinson',
          patientResponse: 'Confirmed right-sided weakness and facial droop'
        },
        {
          time: '08:30',
          intervention: 'Oxygen via nasal cannula',
          dosage: '2 LPM',
          route: 'Inhalation',
          performer: 'K. Lee',
          patientResponse: 'SpO2 maintained at 98%'
        },
        {
          time: '08:33',
          intervention: 'Blood glucose check',
          dosage: '',
          route: '',
          performer: 'M. Robinson',
          patientResponse: 'Normal glucose level 125 mg/dL confirmed'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency stroke alert transport',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'Regional Stroke Center',
        accompaniedBy: ['Wife'],
        specialConsiderations: ['Continuous monitoring', 'Vital signs q5min', 'Neuro checks q5min', 'Stroke alert activated']
      },
      
      disposition: {
        receivingFacility: 'Regional Stroke Center Emergency Department',
        receivingPhysician: 'Dr. Kumar',
        reportGivenTo: 'Stroke team',
        patientCondition: 'Stable with acute neurological deficits, stroke alert activated',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'time-pressure',
        description: 'Critical time window for stroke intervention',
        learningPoint: 'Accurate time documentation crucial for treatment decisions',
        correctApproach: 'Document exact time of symptom onset and all assessments'
      },
      {
        id: 'challenge-002',
        type: 'medical-complexity',
        description: 'Detailed neurological assessment required',
        learningPoint: 'Systematic neurological documentation supports diagnosis',
        correctApproach: 'Use standardized stroke assessment tools and terminology'
      }
    ],
    
    learningObjectives: [
      'Document stroke emergency with detailed neurological assessment',
      'Record stroke scale findings and interpretation',
      'Demonstrate time-critical documentation for stroke care',
      'Document stroke alert activation and hospital notification'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All stroke assessment elements documented',
        weight: 35,
        passingThreshold: 90
      },
      {
        category: 'accuracy',
        description: 'Correct neurological terminology and findings',
        weight: 30,
        passingThreshold: 90
      },
      {
        category: 'legality',
        description: 'Documentation supports time-sensitive treatment decisions',
        weight: 25,
        passingThreshold: 85
      }
    ],
    
    commonErrors: [
      'Incomplete neurological assessment documentation',
      'Missing exact time of symptom onset',
      'Inadequate stroke scale documentation',
      'Not documenting hospital notification'
    ],
    
    bestPractices: [
      'Document exact time of symptom onset from witness',
      'Use standardized stroke assessment terminology',
      'Include detailed motor and sensory examination',
      'Document stroke alert activation and receiving hospital notification',
      'Record blood glucose and other differential considerations'
    ]
  },

  {
    id: 'pcr-010',
    title: 'Overdose - Opioid with Naloxone Administration',
    type: 'medical',
    complexity: 'complex',
    estimatedTime: 26,
    
    callInformation: {
      dispatchTime: '14:22',
      dispatchNature: 'Unconscious person, possible overdose, 25-year-old male',
      responseMode: 'emergency',
      arrivalTime: '14:28',
      departTime: '14:55',
      hospitalArrivalTime: '15:08',
      unitNumber: 'M-22',
      crew: [
        { name: 'D. Wilson', certification: 'EMT-B', role: 'primary' },
        { name: 'A. Thompson', certification: 'AEMT', role: 'secondary' }
      ]
    },
    
    patientEncounter: {
      patient: {
        age: 25,
        sex: 'male',
        weight: 70,
        race: 'Caucasian'
      },
      
      initialPresentation: {
        location: 'Public restroom, downtown area',
        position: 'Supine on floor, unresponsive',
        mentalStatus: 'Unconscious, unresponsive to verbal and painful stimuli',
        chiefComplaint: 'Found unconscious by bystander, drug paraphernalia present',
        apparentDistress: 'Unconscious, cyanotic, shallow respirations',
        environmentalFactors: ['Police on scene', 'Drug paraphernalia present', 'Bystander who called 911']
      },
      
      assessmentFindings: {
        primary: {
          airway: 'Patent but compromised, snoring respirations, potential aspiration risk',
          breathing: 'Inadequate, 6/min, shallow, cyanotic',
          circulation: 'Pulse 52 bpm weak, skin cool and cyanotic',
          disability: 'Unconscious, no response to pain, pupils pinpoint',
          exposure: 'No trauma, track marks noted on both arms'
        },
        
        vitals: [
          {
            time: '14:31',
            bloodPressure: '98/62',
            heartRate: 52,
            respiratoryRate: 6,
            temperature: 96.8,
            oxygenSaturation: 78,
            painScore: 0,
            mentalStatus: 'Unconscious',
            method: 'Manual BP, pulse oximetry',
            position: 'Supine'
          },
          {
            time: '14:45',
            bloodPressure: '118/75',
            heartRate: 88,
            respiratoryRate: 16,
            temperature: 97.2,
            oxygenSaturation: 95,
            painScore: 0,
            mentalStatus: 'Alert x4, agitated',
            method: 'Automated BP, pulse oximetry',
            position: 'Sitting on stretcher'
          }
        ],
        
        secondary: {
          neurological: 'Initially unconscious with pinpoint pupils, post-naloxone alert but agitated',
          respiratory: 'Initially hypoventilation, improved after naloxone',
          cardiovascular: 'Initially bradycardic, improved after naloxone',
          integumentary: 'Multiple track marks, poor hygiene'
        },
        
        history: {
          sample: {
            signs: ['Unconsciousness', 'Pinpoint pupils', 'Respiratory depression'],
            allergies: ['Unknown'],
            medications: ['Unknown'],
            pastHistory: ['Unknown, suspect substance abuse'],
            lastOralIntake: 'Unknown',
            events: 'Found unconscious, drug paraphernalia suggests opioid use'
          }
        }
      },
      
      interventions: [
        {
          time: '14:32',
          intervention: 'Bag-valve-mask ventilation with high-flow oxygen',
          dosage: '',
          route: 'BVM ventilation',
          performer: 'D. Wilson',
          patientResponse: 'SpO2 improved from 78% to 85%'
        },
        {
          time: '14:34',
          intervention: 'Naloxone administration',
          dosage: '2mg',
          route: 'Intranasal',
          performer: 'A. Thompson',
          patientResponse: 'No immediate response, continued ventilatory support'
        },
        {
          time: '14:37',
          intervention: 'Second dose naloxone administration',
          dosage: '2mg',
          route: 'Intranasal',
          performer: 'A. Thompson',
          patientResponse: 'Patient became conscious within 3 minutes, respirations improved'
        },
        {
          time: '14:42',
          intervention: 'De-escalation and patient management',
          dosage: '',
          route: '',
          performer: 'D. Wilson',
          patientResponse: 'Patient became agitated initially, then agreed to transport after de-escalation'
        }
      ],
      
      transport: {
        transportDecision: 'Emergency transport for continued monitoring',
        transportMode: 'stretcher',
        transportPriority: 'emergency',
        destination: 'City General Hospital',
        accompaniedBy: [],
        specialConsiderations: ['Continuous observation', 'Vital signs q5min', 'Respiratory monitoring', 'Re-sedation watch']
      },
      
      disposition: {
        receivingFacility: 'City General Hospital Emergency Department',
        receivingPhysician: 'Dr. Martinez',
        reportGivenTo: 'Security and nursing staff',
        patientCondition: 'Conscious but requiring continued monitoring for potential re-sedation',
      }
    },
    
    documentationChallenges: [
      {
        id: 'challenge-001',
        type: 'legal-risk',
        description: 'Documentation of drug-related emergency and police involvement',
        learningPoint: 'Objective documentation protects patient and providers legally',
        correctApproach: 'Focus on medical findings, avoid assumptions about drug use'
      },
      {
        id: 'challenge-002',
        type: 'communication-barrier',
        description: 'Patient became combative after naloxone administration',
        learningPoint: 'Document behavior changes and de-escalation efforts',
        correctApproach: 'Record specific behaviors and interventions objectively'
      }
    ],
    
    learningObjectives: [
      'Document overdose emergency with proper naloxone administration',
      'Record respiratory depression and ventilatory support',
      'Demonstrate documentation of combative patient management',
      'Document withdrawal symptoms and behavioral changes'
    ],
    
    assessmentCriteria: [
      {
        category: 'completeness',
        description: 'All overdose emergency elements documented',
        weight: 30,
        passingThreshold: 85
      },
      {
        category: 'accuracy',
        description: 'Correct naloxone dosage and administration route',
        weight: 35,
        passingThreshold: 95
      },
      {
        category: 'objectivity',
        description: 'Objective documentation without judgment',
        weight: 25,
        passingThreshold: 85
      }
    ],
    
    commonErrors: [
      'Missing naloxone dosage and route details',
      'Incomplete respiratory assessment documentation',
      'Judgmental language regarding substance use',
      'Not documenting combative behavior management'
    ],
    
    bestPractices: [
      'Document exact naloxone dosage, route, and timing',
      'Record detailed respiratory assessment before and after treatment',
      'Use objective language for substance-related emergencies',
      'Document police involvement and scene safety considerations',
      'Include patient education about overdose risks'
    ]
  }
];

// Documentation Templates
export const documentationTemplates: DocumentationTemplate[] = [
  {
    id: 'soap-template',
    name: 'SOAP Format',
    format: 'SOAP',
    sections: [
      {
        id: 'subjective',
        title: 'Subjective',
        description: 'Patient complaints, history, and subjective information',
        requiredElements: ['Chief complaint', 'SAMPLE history', 'OPQRST if applicable'],
        optionalElements: ['Family concerns', 'Bystander information'],
        commonMistakes: ['Including provider opinions', 'Paraphrasing instead of quoting'],
        examples: [
          'Patient states "crushing chest pain like an elephant sitting on my chest"',
          'Wife reports patient was "acting confused" for past hour',
          'Bystander witnessed patient collapse while walking'
        ]
      },
      {
        id: 'objective',
        title: 'Objective',
        description: 'Observable facts, measurements, and examination findings',
        requiredElements: ['Vital signs', 'Physical examination', 'Assessment findings'],
        optionalElements: ['Environmental observations', 'Equipment readings'],
        commonMistakes: ['Including assumptions', 'Subjective interpretations'],
        examples: [
          'Patient found sitting on floor, diaphoretic, respirations 22/min',
          'Blood pressure 156/94, heart rate 92 irregular',
          'Pupils equal, round, reactive to light at 3mm bilaterally'
        ]
      },
      {
        id: 'assessment',
        title: 'Assessment',
        description: 'Clinical impression and working diagnosis',
        requiredElements: ['Primary impression', 'Differential considerations'],
        optionalElements: ['Risk factors', 'Complicating factors'],
        commonMistakes: ['Definitive diagnosis beyond scope', 'Multiple unrelated impressions'],
        examples: [
          'Acute coronary syndrome',
          'Possible myocardial infarction based on presentation',
          'Chest pain of cardiac origin vs. anxiety'
        ]
      },
      {
        id: 'plan',
        title: 'Plan',
        description: 'Interventions performed and treatment plan',
        requiredElements: ['All interventions with times', 'Patient responses', 'Transport decision'],
        optionalElements: ['Alternative treatments considered', 'Family education'],
        commonMistakes: ['Missing intervention times', 'No response documentation'],
        examples: [
          'Administered aspirin 324mg PO at 14:38, patient tolerated well',
          'Applied oxygen 15LPM via NRB, SpO2 improved from 92% to 98%',
          'Emergency transport to cardiac center for immediate evaluation'
        ]
      }
    ],
    guidelines: [
      'Use present tense for current observations',
      'Use past tense for historical information',
      'Be specific with times, doses, and measurements',
      'Use direct quotes when possible',
      'Maintain chronological order within sections'
    ],
    requiredElements: [
      'Patient demographics',
      'Complete vital signs with times',
      'All interventions with times and responses',
      'Transport information',
      'Receiving facility and personnel'
    ]
  }
];

// Real-time Validation Rules
export interface ValidationRule {
  id: string;
  category: 'required-field' | 'format-error' | 'logic-error' | 'best-practice';
  field?: string;
  description: string;
  severity: 'error' | 'warning' | 'suggestion';
  autoFix?: boolean;
}

export const validationRules: ValidationRule[] = [
  {
    id: 'vital-signs-time',
    category: 'required-field',
    field: 'vitals',
    description: 'All vital signs must include time of measurement',
    severity: 'error'
  },
  {
    id: 'medication-complete',
    category: 'required-field',
    field: 'medications',
    description: 'Medication administration must include drug, dose, route, time, and response',
    severity: 'error'
  },
  {
    id: 'quotes-for-complaints',
    category: 'best-practice',
    field: 'subjective',
    description: 'Use direct quotes for patient complaints when possible',
    severity: 'suggestion',
    autoFix: false
  },
  {
    id: 'military-time',
    category: 'format-error',
    field: 'times',
    description: 'Use 24-hour (military) time format consistently',
    severity: 'warning',
    autoFix: true
  }
];

export default {
  enhancedPCRScenarios,
  documentationTemplates,
  validationRules
};