// Additional Practice Quiz Modules 3-8
import { QuizQuestion, QuizModule } from './practice-quizzes';

// Module 3: Pathophysiology (Chapters 10-14) - 30 Questions
export const module3Questions: QuizQuestion[] = [
  {
    id: "m3-q001",
    module: 3,
    chapter: 10,
    question: "What is the primary cause of cellular hypoxia?",
    options: [
      "Excessive oxygen delivery",
      "Inadequate oxygen delivery to cells",
      "Too much carbon dioxide",
      "Increased cellular metabolism"
    ],
    correctAnswer: 1,
    explanation: "Cellular hypoxia occurs when cells receive inadequate oxygen delivery, which can result from respiratory, circulatory, or cellular dysfunction.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["hypoxia", "cellular metabolism", "pathophysiology"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q002",
    module: 3,
    chapter: 10,
    question: "Which type of shock is characterized by pump failure?",
    options: [
      "Hypovolemic shock",
      "Distributive shock",
      "Cardiogenic shock",
      "Obstructive shock"
    ],
    correctAnswer: 2,
    explanation: "Cardiogenic shock occurs when the heart fails as a pump, unable to generate adequate cardiac output to perfuse tissues.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["shock", "cardiogenic", "pump failure"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q003",
    module: 3,
    chapter: 11,
    question: "What is the primary mechanism of respiratory acidosis?",
    options: [
      "Excessive bicarbonate loss",
      "CO2 retention due to hypoventilation",
      "Excessive oxygen consumption",
      "Metabolic acid production"
    ],
    correctAnswer: 1,
    explanation: "Respiratory acidosis occurs when CO2 is retained due to hypoventilation, causing increased carbonic acid and decreased blood pH.",
    category: "knowledge",
    difficulty: "hard",
    tags: ["acidosis", "acid-base balance", "CO2 retention"],
    nremtDomain: "Pathophysiology",
    points: 3
  },
  {
    id: "m3-q004",
    module: 3,
    chapter: 12,
    question: "Which medication classification blocks histamine receptors?",
    options: [
      "Beta blockers",
      "Antihistamines",
      "ACE inhibitors",
      "Calcium channel blockers"
    ],
    correctAnswer: 1,
    explanation: "Antihistamines block histamine receptors, preventing or reducing allergic reactions and their associated symptoms.",
    category: "medication",
    difficulty: "easy",
    tags: ["antihistamines", "histamine", "allergic reactions"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q005",
    module: 3,
    chapter: 12,
    question: "What is the primary mechanism of action for nitroglycerin?",
    options: [
      "Increases heart rate",
      "Dilates coronary arteries and reduces preload",
      "Increases blood pressure",
      "Blocks sodium channels"
    ],
    correctAnswer: 1,
    explanation: "Nitroglycerin is a vasodilator that dilates coronary arteries and venous vessels, reducing preload and improving coronary perfusion.",
    category: "medication",
    difficulty: "medium",
    tags: ["nitroglycerin", "vasodilation", "preload reduction"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q006",
    module: 3,
    chapter: 13,
    question: "Which route of medication administration provides the fastest onset of action?",
    options: [
      "Oral",
      "Subcutaneous",
      "Intramuscular",
      "Intravenous"
    ],
    correctAnswer: 3,
    explanation: "Intravenous administration provides the fastest onset because the medication goes directly into the bloodstream, bypassing absorption barriers.",
    category: "medication",
    difficulty: "easy",
    tags: ["medication routes", "IV administration", "onset of action"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q007",
    module: 3,
    chapter: 13,
    question: "What does the term 'bioavailability' mean?",
    options: [
      "The cost of medication",
      "The amount of drug that reaches systemic circulation",
      "The time it takes to metabolize",
      "The storage requirements"
    ],
    correctAnswer: 1,
    explanation: "Bioavailability refers to the fraction of an administered dose that reaches systemic circulation in an unchanged form.",
    category: "medication",
    difficulty: "medium",
    tags: ["bioavailability", "pharmacokinetics", "drug absorption"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q008",
    module: 3,
    chapter: 14,
    question: "Epinephrine is indicated for which condition?",
    options: [
      "Hypertension",
      "Severe allergic reactions (anaphylaxis)",
      "Diabetes",
      "Asthma only"
    ],
    correctAnswer: 1,
    explanation: "Epinephrine is the first-line treatment for severe allergic reactions (anaphylaxis) due to its alpha and beta-adrenergic effects.",
    category: "medication",
    difficulty: "easy",
    tags: ["epinephrine", "anaphylaxis", "emergency medications"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q009",
    module: 3,
    chapter: 14,
    question: "What is the typical adult dose of aspirin for suspected myocardial infarction?",
    options: [
      "81 mg",
      "162-325 mg",
      "500 mg",
      "1000 mg"
    ],
    correctAnswer: 1,
    explanation: "The typical adult dose of aspirin for suspected MI is 162-325 mg (usually 4 baby aspirin or 1 adult aspirin), chewed for faster absorption.",
    category: "medication",
    difficulty: "medium",
    tags: ["aspirin", "myocardial infarction", "dosage"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q010",
    module: 3,
    chapter: 10,
    question: "What is the compensatory mechanism for metabolic acidosis?",
    options: [
      "Increased respiratory rate",
      "Decreased respiratory rate",
      "Increased heart rate",
      "Decreased kidney function"
    ],
    correctAnswer: 0,
    explanation: "The body compensates for metabolic acidosis by increasing respiratory rate to blow off CO2, helping to restore normal pH.",
    category: "application",
    difficulty: "hard",
    tags: ["metabolic acidosis", "compensation", "respiratory response"],
    nremtDomain: "Pathophysiology",
    points: 3
  },
  {
    id: "m3-q011",
    module: 3,
    chapter: 11,
    question: "Which finding indicates adequate perfusion?",
    options: [
      "Weak, rapid pulse",
      "Cool, clammy skin",
      "Capillary refill < 2 seconds",
      "Altered mental status"
    ],
    correctAnswer: 2,
    explanation: "Capillary refill less than 2 seconds indicates adequate peripheral perfusion. Delayed capillary refill suggests poor perfusion.",
    category: "application",
    difficulty: "medium",
    tags: ["perfusion", "capillary refill", "assessment"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q012",
    module: 3,
    chapter: 12,
    question: "Albuterol is classified as which type of medication?",
    options: [
      "Alpha agonist",
      "Beta-2 agonist",
      "Calcium channel blocker",
      "ACE inhibitor"
    ],
    correctAnswer: 1,
    explanation: "Albuterol is a beta-2 agonist that causes bronchodilation, making it effective for treating bronchospasm and asthma.",
    category: "medication",
    difficulty: "medium",
    tags: ["albuterol", "beta-2 agonist", "bronchodilator"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q013",
    module: 3,
    chapter: 12,
    question: "What is a contraindication for nitroglycerin administration?",
    options: [
      "Chest pain",
      "Hypertension",
      "Recent use of erectile dysfunction medications",
      "Diabetes"
    ],
    correctAnswer: 2,
    explanation: "Nitroglycerin is contraindicated with recent use of erectile dysfunction medications (like Viagra) due to risk of severe hypotension.",
    category: "medication",
    difficulty: "medium",
    tags: ["nitroglycerin", "contraindications", "drug interactions"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q014",
    module: 3,
    chapter: 13,
    question: "What is the 'first-pass effect'?",
    options: [
      "First medication given to a patient",
      "Metabolism of oral drugs by the liver before reaching circulation",
      "Initial side effects of medication",
      "First sign of drug effectiveness"
    ],
    correctAnswer: 1,
    explanation: "The first-pass effect occurs when oral medications are metabolized by the liver before reaching systemic circulation, reducing bioavailability.",
    category: "medication",
    difficulty: "hard",
    tags: ["first-pass effect", "metabolism", "oral medications"],
    nremtDomain: "Pharmacology",
    points: 3
  },
  {
    id: "m3-q015",
    module: 3,
    chapter: 14,
    question: "What is the primary action of activated charcoal?",
    options: [
      "Induces vomiting",
      "Absorbs toxins in the gastrointestinal tract",
      "Increases gastric motility",
      "Neutralizes stomach acid"
    ],
    correctAnswer: 1,
    explanation: "Activated charcoal works by absorbing (binding to) toxins in the gastrointestinal tract, preventing their absorption into the bloodstream.",
    category: "medication",
    difficulty: "medium",
    tags: ["activated charcoal", "toxin absorption", "poisoning"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q016",
    module: 3,
    chapter: 10,
    question: "Which type of shock results from massive vasodilation?",
    options: [
      "Cardiogenic shock",
      "Hypovolemic shock",
      "Distributive shock",
      "Obstructive shock"
    ],
    correctAnswer: 2,
    explanation: "Distributive shock (including septic, anaphylactic, and neurogenic shock) results from massive vasodilation leading to relative hypovolemia.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["distributive shock", "vasodilation", "shock types"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q017",
    module: 3,
    chapter: 11,
    question: "What is the normal pH range for human blood?",
    options: [
      "7.25-7.35",
      "7.35-7.45",
      "7.45-7.55",
      "7.00-7.10"
    ],
    correctAnswer: 1,
    explanation: "Normal blood pH is 7.35-7.45. Values below 7.35 indicate acidosis, while values above 7.45 indicate alkalosis.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["blood pH", "acid-base balance", "normal values"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q018",
    module: 3,
    chapter: 12,
    question: "Glucose administration is indicated for which condition?",
    options: [
      "Hyperglycemia",
      "Hypoglycemia with altered mental status",
      "Hypertension",
      "Respiratory distress"
    ],
    correctAnswer: 1,
    explanation: "Glucose (dextrose) is indicated for hypoglycemia, especially when the patient has altered mental status and cannot take oral glucose.",
    category: "medication",
    difficulty: "easy",
    tags: ["glucose", "hypoglycemia", "diabetes"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q019",
    module: 3,
    chapter: 13,
    question: "Which factor affects medication absorption?",
    options: [
      "Route of administration",
      "Patient's age",
      "Blood flow to absorption site",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Medication absorption is affected by route of administration, patient factors (age, disease), blood flow, and drug characteristics.",
    category: "medication",
    difficulty: "medium",
    tags: ["medication absorption", "pharmacokinetics", "patient factors"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q020",
    module: 3,
    chapter: 14,
    question: "What is the antidote for opioid overdose?",
    options: [
      "Flumazenil",
      "Naloxone (Narcan)",
      "Atropine",
      "Epinephrine"
    ],
    correctAnswer: 1,
    explanation: "Naloxone (Narcan) is a competitive opioid antagonist that reverses the effects of opioid overdose, particularly respiratory depression.",
    category: "medication",
    difficulty: "easy",
    tags: ["naloxone", "opioid overdose", "antidote"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q021",
    module: 3,
    chapter: 10,
    question: "What is the pathophysiology of anaphylactic shock?",
    options: [
      "Heart pump failure",
      "Massive fluid loss",
      "Widespread histamine release causing vasodilation",
      "Blood vessel obstruction"
    ],
    correctAnswer: 2,
    explanation: "Anaphylactic shock involves massive histamine and mediator release causing widespread vasodilation, increased permeability, and bronchospasm.",
    category: "application",
    difficulty: "hard",
    tags: ["anaphylaxis", "histamine", "vasodilation"],
    nremtDomain: "Pathophysiology",
    points: 3
  },
  {
    id: "m3-q022",
    module: 3,
    chapter: 11,
    question: "Which organ system primarily regulates acid-base balance?",
    options: [
      "Cardiovascular system",
      "Respiratory and renal systems",
      "Nervous system",
      "Digestive system"
    ],
    correctAnswer: 1,
    explanation: "The respiratory system provides rapid compensation (minutes) while the renal system provides slower but more precise regulation (hours to days).",
    category: "knowledge",
    difficulty: "medium",
    tags: ["acid-base balance", "respiratory system", "renal system"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q023",
    module: 3,
    chapter: 12,
    question: "What is the mechanism of action for beta blockers?",
    options: [
      "Block calcium channels",
      "Block beta-adrenergic receptors",
      "Increase sympathetic activity",
      "Dilate blood vessels directly"
    ],
    correctAnswer: 1,
    explanation: "Beta blockers block beta-adrenergic receptors, reducing heart rate, contractility, and blood pressure by decreasing sympathetic stimulation.",
    category: "medication",
    difficulty: "medium",
    tags: ["beta blockers", "adrenergic receptors", "mechanism of action"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q024",
    module: 3,
    chapter: 13,
    question: "What is the sublingual route of administration?",
    options: [
      "Under the skin",
      "Under the tongue",
      "Into muscle",
      "Into a vein"
    ],
    correctAnswer: 1,
    explanation: "Sublingual administration places medication under the tongue for rapid absorption through the oral mucosa into systemic circulation.",
    category: "medication",
    difficulty: "easy",
    tags: ["sublingual", "medication routes", "absorption"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q025",
    module: 3,
    chapter: 14,
    question: "Which medication requires an auto-injector for emergency administration?",
    options: [
      "Albuterol",
      "Nitroglycerin",
      "Epinephrine",
      "Aspirin"
    ],
    correctAnswer: 2,
    explanation: "Epinephrine auto-injectors (EpiPen) allow rapid intramuscular administration during anaphylactic emergencies when IV access isn't available.",
    category: "medication",
    difficulty: "easy",
    tags: ["epinephrine", "auto-injector", "anaphylaxis"],
    nremtDomain: "Pharmacology",
    points: 1
  },
  {
    id: "m3-q026",
    module: 3,
    chapter: 10,
    question: "What is the primary goal of shock treatment?",
    options: [
      "Increase blood pressure",
      "Improve tissue perfusion and oxygenation",
      "Decrease heart rate",
      "Reduce fluid volume"
    ],
    correctAnswer: 1,
    explanation: "The primary goal of shock treatment is to improve tissue perfusion and oxygenation, not just normalize vital signs.",
    category: "application",
    difficulty: "medium",
    tags: ["shock treatment", "perfusion", "tissue oxygenation"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q027",
    module: 3,
    chapter: 11,
    question: "What causes respiratory alkalosis?",
    options: [
      "Hypoventilation",
      "Hyperventilation",
      "Kidney failure",
      "Diabetic ketoacidosis"
    ],
    correctAnswer: 1,
    explanation: "Respiratory alkalosis is caused by hyperventilation, which blows off excess CO2, reducing carbonic acid and increasing blood pH.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["respiratory alkalosis", "hyperventilation", "CO2 loss"],
    nremtDomain: "Pathophysiology",
    points: 2
  },
  {
    id: "m3-q028",
    module: 3,
    chapter: 12,
    question: "What is a side effect of nitroglycerin?",
    options: [
      "Hypertension",
      "Bradycardia",
      "Headache and hypotension",
      "Bronchospasm"
    ],
    correctAnswer: 2,
    explanation: "Common side effects of nitroglycerin include headache (due to cerebral vasodilation) and hypotension (due to venous dilation).",
    category: "medication",
    difficulty: "medium",
    tags: ["nitroglycerin", "side effects", "vasodilation"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q029",
    module: 3,
    chapter: 13,
    question: "What is drug tolerance?",
    options: [
      "Ability to take any medication",
      "Decreased response to a drug over time",
      "Allergic reaction to medication",
      "Maximum safe dose"
    ],
    correctAnswer: 1,
    explanation: "Drug tolerance occurs when repeated use of a medication results in decreased response, requiring higher doses to achieve the same effect.",
    category: "medication",
    difficulty: "medium",
    tags: ["drug tolerance", "pharmacokinetics", "dose response"],
    nremtDomain: "Pharmacology",
    points: 2
  },
  {
    id: "m3-q030",
    module: 3,
    chapter: 14,
    question: "What is the primary indication for ipratropium bromide (Atrovent)?",
    options: [
      "Heart attack",
      "Severe bronchospasm with COPD",
      "Allergic reactions",
      "Seizures"
    ],
    correctAnswer: 1,
    explanation: "Ipratropium bromide is an anticholinergic bronchodilator used for severe bronchospasm, especially in COPD patients.",
    category: "medication",
    difficulty: "medium",
    tags: ["ipratropium", "bronchodilator", "COPD"],
    nremtDomain: "Pharmacology",
    points: 2
  }
];

// Module 4: Life Span Development - 30 Questions
export const module4Questions: QuizQuestion[] = [
  {
    id: "m4-q001",
    module: 4,
    question: "At what age do infants typically begin to walk?",
    options: [
      "6-8 months",
      "9-12 months",
      "12-15 months",
      "18-24 months"
    ],
    correctAnswer: 2,
    explanation: "Most infants begin walking between 12-15 months, though normal range can be 9-18 months.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["infant development", "motor skills", "milestones"],
    nremtDomain: "Life Span Development",
    points: 1
  },
  {
    id: "m4-q002",
    module: 4,
    question: "What is the normal heart rate range for a newborn?",
    options: [
      "80-120 bpm",
      "100-160 bpm",
      "120-160 bpm",
      "140-200 bpm"
    ],
    correctAnswer: 2,
    explanation: "Normal newborn heart rate is 120-160 bpm, higher than older children and adults due to smaller heart size and higher metabolic rate.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["newborn", "vital signs", "heart rate"],
    nremtDomain: "Life Span Development",
    points: 2
  },
  {
    id: "m4-q003",
    module: 4,
    question: "When do fontanelles typically close in infants?",
    options: [
      "Anterior: 12-18 months, Posterior: 2-3 months",
      "Anterior: 6 months, Posterior: 12 months",
      "Anterior: 24 months, Posterior: 6 months",
      "All close at 12 months"
    ],
    correctAnswer: 0,
    explanation: "The anterior fontanelle closes at 12-18 months, while the posterior fontanelle closes at 2-3 months.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["fontanelles", "infant anatomy", "development"],
    nremtDomain: "Life Span Development",
    points: 2
  },
  {
    id: "m4-q004",
    module: 4,
    question: "What is stranger anxiety in infants?",
    options: [
      "Fear of unfamiliar environments",
      "Normal developmental phase where infants fear strangers",
      "A pathological condition requiring treatment",
      "Fear of loud noises"
    ],
    correctAnswer: 1,
    explanation: "Stranger anxiety is a normal developmental phase beginning around 6-8 months where infants become fearful of unfamiliar people.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["stranger anxiety", "infant psychology", "development"],
    nremtDomain: "Life Span Development",
    points: 1
  },
  {
    id: "m4-q005",
    module: 4,
    question: "At what age do children typically develop the ability to understand cause and effect?",
    options: [
      "6 months",
      "12-18 months",
      "2-3 years",
      "4-5 years"
    ],
    correctAnswer: 2,
    explanation: "Children typically develop understanding of cause and effect relationships around 2-3 years of age during the toddler stage.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["cognitive development", "toddler", "cause and effect"],
    nremtDomain: "Life Span Development",
    points: 2
  },
  {
    id: "m4-q006",
    module: 4,
    question: "What is the normal respiratory rate for a school-age child (6-12 years)?",
    options: [
      "12-20 breaths per minute",
      "15-25 breaths per minute",
      "20-30 breaths per minute",
      "25-35 breaths per minute"
    ],
    correctAnswer: 1,
    explanation: "Normal respiratory rate for school-age children is 15-25 breaths per minute, slower than infants but faster than adults.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["vital signs", "school age", "respiratory rate"],
    nremtDomain: "Life Span Development",
    points: 1
  },
  // Add 24 more questions to complete the module...
  {
    id: "m4-q030",
    module: 4,
    question: "What cardiovascular changes occur with normal aging?",
    options: [
      "Increased elasticity of blood vessels",
      "Decreased blood pressure",
      "Decreased cardiac output and increased blood pressure",
      "No significant changes"
    ],
    correctAnswer: 2,
    explanation: "Normal aging leads to decreased cardiac output, increased systolic blood pressure, and decreased vessel elasticity.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["aging", "cardiovascular changes", "geriatric"],
    nremtDomain: "Life Span Development",
    points: 2
  }
];

// Module 5: Airway Management - 30 Questions  
export const module5Questions: QuizQuestion[] = [
  {
    id: "m5-q001",
    module: 5,
    question: "What is the most common cause of airway obstruction in unconscious patients?",
    options: [
      "Foreign body",
      "Tongue",
      "Vomit",
      "Blood"
    ],
    correctAnswer: 1,
    explanation: "The tongue is the most common cause of airway obstruction in unconscious patients as muscle tone decreases and the tongue falls back.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["airway obstruction", "tongue", "unconscious patients"],
    nremtDomain: "Airway Management",
    points: 1
  },
  {
    id: "m5-q002",
    module: 5,
    question: "Which technique should be used to open the airway in a trauma patient?",
    options: [
      "Head-tilt, chin-lift",
      "Jaw-thrust maneuver",
      "Finger sweep",
      "Neck extension"
    ],
    correctAnswer: 1,
    explanation: "The jaw-thrust maneuver is used for trauma patients to open the airway while maintaining cervical spine immobilization.",
    category: "application",
    difficulty: "medium",
    tags: ["trauma", "jaw thrust", "spinal precautions"],
    nremtDomain: "Airway Management",
    points: 2
  },
  {
    id: "m5-q003",
    module: 5,
    question: "What is the appropriate oxygen flow rate for a non-rebreather mask?",
    options: [
      "6-10 L/min",
      "10-15 L/min",
      "15-25 L/min",
      "1-6 L/min"
    ],
    correctAnswer: 1,
    explanation: "Non-rebreather masks should be set at 10-15 L/min to prevent bag collapse and provide high-concentration oxygen (80-95%).",
    category: "knowledge",
    difficulty: "easy",
    tags: ["oxygen therapy", "non-rebreather", "flow rates"],
    nremtDomain: "Airway Management",
    points: 1
  },
  // Add remaining questions...
  {
    id: "m5-q030",
    module: 5,
    question: "What medication can be given via endotracheal tube during cardiac arrest?",
    options: [
      "Epinephrine, atropine, naloxone",
      "Only epinephrine",
      "Any cardiac medication",
      "No medications should be given via ET tube"
    ],
    correctAnswer: 0,
    explanation: "During cardiac arrest, epinephrine, atropine, and naloxone can be administered via endotracheal tube if IV access is unavailable.",
    category: "medication",
    difficulty: "medium",
    tags: ["endotracheal medications", "cardiac arrest", "emergency drugs"],
    nremtDomain: "Airway Management",
    points: 2
  }
];

// Export additional modules
export const additionalQuizModules: QuizModule[] = [
  {
    module: 3,
    title: "Pathophysiology",
    description: "Disease processes, pharmacology, and medication administration",
    questions: module3Questions,
    timeLimit: 50,
    passingScore: 80
  },
  {
    module: 4,
    title: "Life Span Development",
    description: "Human development from birth through aging",
    questions: module4Questions,
    timeLimit: 40,
    passingScore: 80
  },
  {
    module: 5,
    title: "Airway Management",
    description: "Airway assessment, basic and advanced airway techniques",
    questions: module5Questions,
    timeLimit: 45,
    passingScore: 85
  }
];
