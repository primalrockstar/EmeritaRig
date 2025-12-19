export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: 'cardiac' | 'trauma' | 'pediatric' | 'respiratory' | 'general' | 'assessment';
  inputs: CalculatorInput[];
  calculate: (values: Record<string, any>) => CalculatorResult;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string | number; label: string }[];
  unit?: string;
  description?: string;
}

export interface CalculatorResult {
  score?: number;
  risk?: 'low' | 'moderate' | 'high' | 'very-high';
  interpretation: string;
  recommendations: string[];
  details?: Record<string, any>;
}

export const glasgowComaCalculator: Calculator = {
  id: 'gcs',
  name: 'Glasgow Coma Scale',
  description: 'Assess level of consciousness and neurological function',
  category: 'general',
  inputs: [
    {
      id: 'eyeOpening',
      label: 'Eye Opening',
      type: 'select',
      required: true,
      options: [
        { value: 4, label: '4 - Spontaneous' },
        { value: 3, label: '3 - To voice' },
        { value: 2, label: '2 - To pain' },
        { value: 1, label: '1 - None' }
      ]
    },
    {
      id: 'verbalResponse',
      label: 'Verbal Response',
      type: 'select',
      required: true,
      options: [
        { value: 5, label: '5 - Oriented' },
        { value: 4, label: '4 - Confused' },
        { value: 3, label: '3 - Inappropriate words' },
        { value: 2, label: '2 - Incomprehensible' },
        { value: 1, label: '1 - None' }
      ]
    },
    {
      id: 'motorResponse',
      label: 'Motor Response',
      type: 'select',
      required: true,
      options: [
        { value: 6, label: '6 - Obeys commands' },
        { value: 5, label: '5 - Localizes pain' },
        { value: 4, label: '4 - Withdraws' },
        { value: 3, label: '3 - Abnormal flexion' },
        { value: 2, label: '2 - Extension' },
        { value: 1, label: '1 - None' }
      ]
    }
  ],
  calculate: (values) => {
    const total = (values.eyeOpening || 0) + (values.verbalResponse || 0) + (values.motorResponse || 0);
    
    let interpretation = '';
    let risk: 'low' | 'moderate' | 'high' | 'very-high' = 'low';
    let recommendations: string[] = [];

    if (total === 15) {
      interpretation = 'Normal neurological function';
      risk = 'low';
      recommendations = ['Continue monitoring', 'Routine assessment'];
    } else if (total >= 13) {
      interpretation = 'Mild brain injury';
      risk = 'low';
      recommendations = ['Close monitoring', 'Neurological checks q15min'];
    } else if (total >= 9) {
      interpretation = 'Moderate brain injury';
      risk = 'moderate';
      recommendations = ['Frequent neurological assessment', 'Consider CT scan', 'Neurosurgical consultation'];
    } else if (total > 8) {
      interpretation = 'Severe brain injury';
      risk = 'high';
      recommendations = ['Consider intubation', 'ICP management', 'Immediate neurosurgery evaluation'];
    } else {
      interpretation = 'Critical brain injury - prepare for intubation';
      risk = 'very-high';
      recommendations = ['Immediate intubation', 'Aggressive ICP management', 'Emergency neurosurgery'];
    }

    return {
      score: total,
      risk,
      interpretation: `GCS ${total}/15: ${interpretation}`,
      recommendations,
      details: {
        eyeOpening: values.eyeOpening,
        verbalResponse: values.verbalResponse,
        motorResponse: values.motorResponse
      }
    };
  }
};

export const heartScoreCalculator: Calculator = {
  id: 'heart-score',
  name: 'HEART Score',
  description: 'Risk stratification for chest pain patients',
  category: 'cardiac',
  inputs: [
    {
      id: 'history',
      label: 'History',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Slightly suspicious' },
        { value: 1, label: '1 - Moderately suspicious' },
        { value: 2, label: '2 - Highly suspicious' }
      ]
    },
    {
      id: 'ecg',
      label: 'ECG',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - Normal' },
        { value: 1, label: '1 - Non-specific repolarization' },
        { value: 2, label: '2 - Significant ST deviation' }
      ]
    },
    {
      id: 'age',
      label: 'Age',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - <45 years' },
        { value: 1, label: '1 - 45-64 years' },
        { value: 2, label: '2 - ≥65 years' }
      ]
    },
    {
      id: 'riskFactors',
      label: 'Risk Factors',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - No risk factors' },
        { value: 1, label: '1 - 1-2 risk factors' },
        { value: 2, label: '2 - ≥3 risk factors or CAD history' }
      ]
    },
    {
      id: 'troponin',
      label: 'Troponin',
      type: 'select',
      required: true,
      options: [
        { value: 0, label: '0 - ≤Normal limit' },
        { value: 1, label: '1 - 1-3x normal limit' },
        { value: 2, label: '2 - >3x normal limit' }
      ]
    }
  ],
  calculate: (values) => {
    const total = Object.values(values).reduce((sum: number, val: any) => sum + (val || 0), 0);
    
    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    let interpretation: string;
    let recommendations: string[];

    if (total <= 3) {
      risk = 'low';
      interpretation = 'Low risk for major adverse cardiac events (0.9-1.7%)';
      recommendations = ['Consider discharge', 'Outpatient follow-up', 'Return precautions'];
    } else if (total <= 6) {
      risk = 'moderate';
      interpretation = 'Moderate risk for major adverse cardiac events (12-16.6%)';
      recommendations = ['Admit for observation', 'Serial troponins', 'Cardiology consultation'];
    } else {
      risk = 'high';
      interpretation = 'High risk for major adverse cardiac events (50-65%)';
      recommendations = ['Urgent cardiology consultation', 'Consider catheterization', 'Intensive monitoring'];
    }

    return {
      score: total,
      risk,
      interpretation,
      recommendations
    };
  }
};

export const burnBSACalculator: Calculator = {
  id: 'burn-bsa',
  name: 'Rule of Nines (Burn BSA)',
  description: 'Calculate total body surface area burned',
  category: 'trauma',
  inputs: [
    {
      id: 'head',
      label: 'Head/Neck',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'chestFront',
      label: 'Chest (Front)',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'abdomenFront',
      label: 'Abdomen (Front)',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'backUpper',
      label: 'Upper Back',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'backLower',
      label: 'Lower Back',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'armLeft',
      label: 'Left Arm',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'armRight',
      label: 'Right Arm',
      type: 'number',
      required: false,
      min: 0,
      max: 9,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'legLeft',
      label: 'Left Leg',
      type: 'number',
      required: false,
      min: 0,
      max: 18,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'legRight',
      label: 'Right Leg',
      type: 'number',
      required: false,
      min: 0,
      max: 18,
      step: 0.5,
      unit: '%'
    },
    {
      id: 'perineum',
      label: 'Perineum',
      type: 'number',
      required: false,
      min: 0,
      max: 1,
      step: 0.5,
      unit: '%'
    }
  ],
  calculate: (values) => {
    const total = Object.values(values).reduce((sum: number, val: any) => sum + (val || 0), 0);
    
    let risk: 'low' | 'moderate' | 'high' | 'very-high';
    let interpretation: string;
    let recommendations: string[];

    if (total < 10) {
      risk = 'low';
      interpretation = 'Minor burn injury';
      recommendations = ['Local wound care', 'Pain management', 'Tetanus prophylaxis'];
    } else if (total < 20) {
      risk = 'moderate';
      interpretation = 'Moderate burn injury - consider burn center';
      recommendations = ['IV fluid resuscitation', 'Pain management', 'Burn center evaluation'];
    } else if (total < 40) {
      risk = 'high';
      interpretation = 'Major burn injury - burn center required';
      recommendations = ['Aggressive fluid resuscitation', 'Airway Management Techniques', 'Immediate burn center transfer'];
    } else {
      risk = 'very-high';
      interpretation = 'Critical burn injury - life-threatening';
      recommendations = ['Intensive fluid resuscitation', 'Airway protection', 'Critical care transport'];
    }

    return {
      score: total,
      risk,
      interpretation: `${total}% TBSA: ${interpretation}`,
      recommendations
    };
  }
};

export const apgarScoreCalculator: Calculator = {
  id: 'apgar',
  name: 'APGAR Score',
  description: 'Assess newborn condition at 1 and 5 minutes after birth',
  category: 'assessment',
  inputs: [
    {
      id: 'appearance',
      label: 'Appearance (Skin Color)',
      type: 'select',
      required: true,
      description: 'Body and extremity color assessment',
      options: [
        { value: 0, label: '0 - Blue, pale all over' },
        { value: 1, label: '1 - Pink body, blue extremities' },
        { value: 2, label: '2 - Pink all over' }
      ]
    },
    {
      id: 'pulse',
      label: 'Pulse (Heart Rate)',
      type: 'select',
      required: true,
      description: 'Heart rate assessment via umbilical cord or brachial pulse',
      options: [
        { value: 0, label: '0 - Absent' },
        { value: 1, label: '1 - <100 bpm' },
        { value: 2, label: '2 - ≥100 bpm' }
      ]
    },
    {
      id: 'grimace',
      label: 'Grimace (Reflex Irritability)',
      type: 'select',
      required: true,
      description: 'Response to stimulation (suctioning, flicking feet)',
      options: [
        { value: 0, label: '0 - No response' },
        { value: 1, label: '1 - Grimace/weak cry' },
        { value: 2, label: '2 - Vigorous cry, cough, sneeze' }
      ]
    },
    {
      id: 'activity',
      label: 'Activity (Muscle Tone)',
      type: 'select',
      required: true,
      description: 'Muscle tone and movement assessment',
      options: [
        { value: 0, label: '0 - Limp, flaccid' },
        { value: 1, label: '1 - Some flexion of limbs' },
        { value: 2, label: '2 - Active motion, well-flexed' }
      ]
    },
    {
      id: 'respiration',
      label: 'Respiration (Breathing Effort)',
      type: 'select',
      required: true,
      description: 'Respiratory effort and cry quality',
      options: [
        { value: 0, label: '0 - Absent' },
        { value: 1, label: '1 - Slow, irregular, weak cry' },
        { value: 2, label: '2 - Good, strong cry' }
      ]
    }
  ],
  calculate: (values) => {
    const total = (values.appearance || 0) + (values.pulse || 0) + (values.grimace || 0) + 
                  (values.activity || 0) + (values.respiration || 0);
    
    let interpretation = '';
    let risk: 'low' | 'moderate' | 'high' | 'very-high' = 'low';
    let recommendations: string[] = [];

    if (total >= 8) {
      interpretation = 'Normal - baby is vigorous and healthy';
      risk = 'low';
      recommendations = [
        'Routine newborn care',
        'Dry and warm the baby',
        'Place on mother\'s chest for skin-to-skin contact',
        'Monitor for normal transition'
      ];
    } else if (total >= 4) {
      interpretation = 'Moderately depressed - requires stimulation and support';
      risk = 'moderate';
      recommendations = [
        'Provide tactile stimulation',
        'Dry vigorously and provide warmth',
        'Clear airway if needed',
        'Provide blow-by oxygen if cyanotic',
        'Reassess APGAR at 5 minutes'
      ];
    } else {
      interpretation = 'Severely depressed - requires immediate resuscitation';
      risk = 'very-high';
      recommendations = [
        'Begin positive pressure ventilation immediately',
        'Assess heart rate and provide chest compressions if <60 bpm',
        'Consider endotracheal intubation',
        'Prepare for medication administration',
        'Call for additional help/NICU team'
      ];
    }

    // Provide specific component breakdown
    const components = {
      appearance: values.appearance || 0,
      pulse: values.pulse || 0,
      grimace: values.grimace || 0,
      activity: values.activity || 0,
      respiration: values.respiration || 0
    };

    return {
      score: total,
      risk,
      interpretation: `APGAR ${total}/10: ${interpretation}`,
      recommendations,
      details: {
        ...components,
        timing: 'Assess at 1 and 5 minutes, continue q5min if <7',
        mnemonic: 'Appearance, Pulse, Grimace, Activity, Respiration'
      }
    };
  }
};

export const avpuScaleCalculator: Calculator = {
  id: 'avpu',
  name: 'AVPU Scale',
  description: 'Rapid assessment of level of consciousness',
  category: 'assessment',
  inputs: [
    {
      id: 'consciousness',
      label: 'Level of Consciousness',
      type: 'select',
      required: true,
      description: 'Select the highest level of responsiveness demonstrated',
      options: [
        { value: 'alert', label: 'Alert - Eyes open, aware of surroundings, responds appropriately' },
        { value: 'verbal', label: 'Verbal - Responds to verbal stimuli (may be confused)' },
        { value: 'painful', label: 'Painful - Only responds to painful stimuli' },
        { value: 'unresponsive', label: 'Unresponsive - No response to any stimuli' }
      ]
    },
    {
      id: 'orientation',
      label: 'Orientation Assessment (if Alert)',
      type: 'select',
      required: false,
      description: 'Further assess orientation if patient is alert',
      options: [
        { value: 4, label: 'Oriented x4 - Person, Place, Time, Event' },
        { value: 3, label: 'Oriented x3 - Person, Place, Time' },
        { value: 2, label: 'Oriented x2 - Person, Place' },
        { value: 1, label: 'Oriented x1 - Person only' },
        { value: 0, label: 'Disoriented - None of the above' }
      ]
    }
  ],
  calculate: (values) => {
    const consciousness = values.consciousness;
    const orientation = values.orientation;
    
    let interpretation = '';
    let risk: 'low' | 'moderate' | 'high' | 'very-high' = 'low';
    let recommendations: string[] = [];
    let gcsEquivalent = '';

    switch (consciousness) {
      case 'alert':
        if (orientation === 4) {
          interpretation = 'Normal level of consciousness - fully alert and oriented';
          risk = 'low';
          gcsEquivalent = 'GCS 15 equivalent';
          recommendations = [
            'Continue routine assessment',
            'Monitor for changes',
            'Proceed with secondary assessment'
          ];
        } else if (orientation >= 2) {
          interpretation = 'Alert but disoriented - possible altered mental status';
          risk = 'moderate';
          gcsEquivalent = 'GCS 13-14 equivalent';
          recommendations = [
            'Assess for causes of confusion',
            'Check blood glucose',
            'Consider substance use or head injury',
            'Monitor closely for deterioration'
          ];
        } else {
          interpretation = 'Alert but significantly disoriented';
          risk = 'high';
          gcsEquivalent = 'GCS 11-12 equivalent';
          recommendations = [
            'Immediate assessment for causes',
            'Neurological examination',
            'Consider rapid transport',
            'Frequent reassessment'
          ];
        }
        break;
      
      case 'verbal':
        interpretation = 'Responds to verbal stimuli only - altered mental status';
        risk = 'high';
        gcsEquivalent = 'GCS 9-12 equivalent';
        recommendations = [
          'Assess airway and breathing carefully',
          'Consider causes of altered LOC',
          'Prepare for possible airway compromise',
          'Frequent neurological checks',
          'Consider rapid transport'
        ];
        break;
      
      case 'painful':
        interpretation = 'Responds to painful stimuli only - significantly altered consciousness';
        risk = 'very-high';
        gcsEquivalent = 'GCS 6-8 equivalent';
        recommendations = [
          'Immediate airway assessment and protection',
          'Consider advanced airway management',
          'Assess for reversible causes',
          'Prepare for intubation',
          'Emergency transport with ALS intercept'
        ];
        break;
      
      case 'unresponsive':
        interpretation = 'Unresponsive to all stimuli - critical condition';
        risk = 'very-high';
        gcsEquivalent = 'GCS 3-5 equivalent';
        recommendations = [
          'Immediate airway management',
          'Positive pressure ventilation as needed',
          'Consider advanced life support measures',
          'Emergency transport to trauma center',
          'Continuous monitoring of vital signs'
        ];
        break;
    }

    return {
      risk,
      interpretation: `${consciousness.toUpperCase()}: ${interpretation}`,
      recommendations,
      details: {
        avpuLevel: consciousness,
        orientation: orientation || 'Not assessed',
        gcsEquivalent,
        painfulStimuli: 'Use central pain (trapezius squeeze, sternal rub)',
        verbalStimuli: 'Use normal voice, then loud voice',
        reassessment: 'Reassess every 5-15 minutes depending on condition'
      }
    };
  }
};

export const pediatricDosageCalculator: Calculator = {
  id: 'pediatric-dosing',
  name: 'Pediatric Dosage Calculator',
  description: 'Weight-based medication dosing for children',
  category: 'pediatric',
  inputs: [
    {
      id: 'weight',
      label: 'Patient Weight',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      step: 0.1,
      unit: 'kg'
    },
    {
      id: 'medication',
      label: 'Medication',
      type: 'select',
      required: true,
      options: [
        { value: 'epinephrine', label: 'Epinephrine (anaphylaxis)' },
        { value: 'naloxone', label: 'Naloxone' },
        { value: 'albuterol', label: 'Albuterol' },
        { value: 'dextrose', label: 'Dextrose (D25)' },
        { value: 'atropine', label: 'Atropine' }
      ]
    }
  ],
  calculate: (values) => {
    const weight = values.weight || 0;
    const medication = values.medication;
    
    let dose = '';
    let maxDose = '';
    let recommendations: string[] = [];
    
    switch (medication) {
      case 'epinephrine':
        const epiDose = Math.min(0.01 * weight, 0.3);
        dose = `${epiDose.toFixed(2)} mg IM`;
        maxDose = '0.3 mg';
        recommendations = ['IM injection in anterolateral thigh', 'May repeat q5-15min', 'Monitor for tachycardia'];
        break;
      case 'naloxone':
        const naloxoneDose = 0.1 * weight;
        dose = `${naloxoneDose.toFixed(1)} mg IV/IM or 2 mg IN`;
        maxDose = '2 mg per dose';
        recommendations = ['IN route preferred in field', 'May repeat q2-3min', 'Monitor for withdrawal'];
        break;
      case 'albuterol':
        const albuterolDose = Math.max(0.15 * weight, 2.5);
        dose = `${albuterolDose.toFixed(1)} mg nebulized`;
        maxDose = '5 mg';
        recommendations = ['Continuous nebulization if severe', 'Monitor heart rate', 'May cause tremor'];
        break;
      case 'dextrose':
        const dextroseDose = 2 * weight;
        dose = `${dextroseDose.toFixed(0)} mL D25 IV`;
        maxDose = '50 mL (12.5 g)';
        recommendations = ['Use D25 in children, D10 in infants', 'Slow IV push', 'Check glucose after'];
        break;
      case 'atropine':
        const atropineDose = Math.max(0.02 * weight, 0.1);
        dose = `${atropineDose.toFixed(2)} mg IV`;
        maxDose = '1 mg';
        recommendations = ['Minimum dose 0.1 mg', 'May repeat q5min', 'Monitor for tachycardia'];
        break;
      default:
        dose = 'Select medication';
    }

    return {
      interpretation: `Pediatric dose for ${weight} kg patient`,
      recommendations,
      details: {
        calculatedDose: dose,
        maximumDose: maxDose,
        weight: `${weight} kg`
      }
    };
  }
};

export const clinicalCalculators = [
  glasgowComaCalculator,
  apgarScoreCalculator,
  avpuScaleCalculator,
  heartScoreCalculator,
  burnBSACalculator,
  pediatricDosageCalculator
];