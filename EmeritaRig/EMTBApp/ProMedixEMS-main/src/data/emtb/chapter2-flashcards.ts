// Chapter 2: Safety Protocols for Responders - Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter2Flashcards: Flashcard[] = [
  {
    id: "ch2-001",
    question: "What percentage of first responders have seen traumatic events, and what percentage have been diagnosed with mental health issues?",
    answer: "84% of first responders have seen traumatic events, and 34% have been diagnosed with mental health issues like depression or PTSD.",
    category: "Workforce Safety",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-002",
    question: "Define the difference between eustress and distress in emergency medical services.",
    answer: "Eustress causes positive responses like increased focus and job satisfaction from performing well in tough situations. Distress causes negative responses like feeling overwhelmed or anxious.",
    category: "Stress Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-003",
    question: "An EMT notices a colleague seems exhausted, cynical, and showing poor performance after months of high-stress calls. What condition should they be concerned about?",
    answer: "Burnout - which is exhaustion, cynicism, and poor performance from long-term job stress that can lead to medical errors and decreased morale.",
    category: "Mental Health",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-004",
    question: "List the five key strategies to increase resilience for EMTs.",
    answer: "1. Eat a healthy diet, 2. Get 7 to 9 hours of sleep daily, 3. Build strong relationships with family, friends, and co-workers, 4. Exercise daily, 5. Practice mindfulness.",
    category: "Wellness",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-005",
    question: "What is the proper order for donning (putting on) PPE?",
    answer: "Gown first, then mask, then eyewear, then gloves. Always doff (remove) the mask last to avoid contamination.",
    category: "Infection Control",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-006",
    question: "A patient asks an EMT 'Am I going to die?' How should the EMT respond appropriately?",
    answer: "Be honest without scaring the patient, avoid false promises like 'Everything will be alright,' remain calm and caring, and always allow for hope even in serious situations.",
    category: "Patient Communication",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch2-007",
    question: "What are the five stages of grief identified by Dr. Elizabeth Kubler-Ross?",
    answer: "Denial, Anger, Bargaining, Depression, and Acceptance. These stages can occur in any order during the grieving process.",
    category: "Grief Support",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch2-008",
    question: "An EMT has been working 24-hour shifts and is experiencing fatigue that could compromise patient safety. What management strategies should be implemented?",
    answer: "Work shifts shorter than 24 hours, use fatigue surveys for assessment, provide access to caffeine and naps while on duty, and receive education on fatigue risks.",
    category: "Fatigue Management",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch2-009",
    question: "Define Standard Precautions according to CDC guidelines.",
    answer: "Standard precautions mean assuming every person might be infected, so always use infection control procedures including proper PPE, hand washing, and safe disposal of sharp items.",
    category: "Infection Control",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-010",
    question: "What is the difference between Disease Prevention and Health Promotion?",
    answer: "Disease Prevention focuses on medical care to avoid illness (like vaccinations and screenings). Health Promotion focuses on personal habits to improve health (like proper diet and exercise).",
    category: "Health Management",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch2-011",
    question: "During a traumatic call involving a child fatality, an EMT experiences critical incident stress. What support options are available?",
    answer: "Critical Incident Stress Management (CISM) including defusing sessions during/after the event, debriefing sessions 24-72 hours later with mental health professionals, Employee Assistance Programs, or private counseling.",
    category: "Critical Incident Stress",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-012",
    question: "What are the key principles for safe lifting practices in EMS?",
    answer: "Pre-plan the move, bend your legs not your waist, keep the weight close to your body, and lift straight up using your legs.",
    category: "Injury Prevention",
    difficulty: "easy",
    type: "application"
  },
  {
    id: "ch2-013",
    question: "How many hours of sleep do adults need each night, and what individual strategies help with fatigue management?",
    answer: "Adults need 7 to 9 hours of sleep each night. Individual strategies include getting quality sleep, taking short naps, doing physical and mental exercise, avoiding caffeine/alcohol before bed, keeping consistent sleep schedule, and exposing yourself to natural light during waking hours.",
    category: "Sleep Management",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch2-014",
    question: "An EMT suspects a coworker is impaired by alcohol or drugs during a shift. What is the appropriate action?",
    answer: "Report the impaired coworker immediately. Covering for them can cause serious harm to patients. Substance abuse increases accidents, creates tension, and leads to poor treatment decisions.",
    category: "Workplace Safety",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch2-015",
    question: "What constitutes proper protective clothing layers for cold weather EMS operations?",
    answer: "Multiple layers: thin inner layer to wick away moisture, thermal middle layer for insulation, and outer layer to resist wind and wetness. Avoid cotton in cold, wet conditions as it absorbs moisture and causes chilling.",
    category: "Protective Equipment",
    difficulty: "medium",
    type: "application"
  }
];

export default chapter2Flashcards;
