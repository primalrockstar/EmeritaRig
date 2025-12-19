// Chapter 42 Flashcards - 15 Professional Quality Cards
export const chapter42Flashcards = [
  // Key Terms (5 cards)
  {
    id: "ch42-001",
    chapter: 42,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Define cardiac output and give the normal adult range.",
    back: "Cardiac output is the volume of blood ejected from the left ventricle each minute; normal resting range is about 4.5–6.5 L/min.",
    tags: ["hemodynamics", "fundamentals"]
  },
  {
    id: "ch42-002",
    chapter: 42,
    category: "Key Terms",
    difficulty: "Easy",
    front: "What is preload in cardiovascular physiology?",
    back: "Preload is the ventricular stretch created by end-diastolic volume just before contraction, reflecting venous return.",
    tags: ["preload", "venous-return"]
  },
  {
    id: "ch42-003",
    chapter: 42,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Describe afterload and its primary determinants.",
    back: "Afterload is the resistance the ventricles must overcome to eject blood; it is influenced by systemic vascular resistance and aortic pressure.",
    tags: ["afterload", "vascular-resistance"]
  },
  {
    id: "ch42-004",
    chapter: 42,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Explain myocardial contractility from a cellular perspective.",
    back: "Contractility reflects the intrinsic strength of cardiac muscle contraction, governed by calcium availability and sympathetic stimulation regardless of preload and afterload.",
    tags: ["contractility", "sympathetic"]
  },
  {
    id: "ch42-005",
    chapter: 42,
    category: "Key Terms",
    difficulty: "Hard",
    front: "Summarize the Frank–Starling mechanism and its clinical importance.",
    back: "The Frank–Starling mechanism states that increased ventricular filling stretches myocardial fibers, producing a stronger contraction up to an optimal limit; it explains why fluid overload can worsen heart failure.",
    tags: ["frank-starling", "stroke-volume"]
  },

  // Assessment & Skills (4 cards)
  {
    id: "ch42-006",
    chapter: 42,
    category: "Assessment",
    difficulty: "Medium",
    front: "How does jugular venous distention help estimate right-sided preload?",
    back: "Elevated JVD at 45° suggests increased right atrial pressure and high preload, prompting consideration of fluid restriction and cardiac monitoring.",
    tags: ["jvd", "physical-exam"]
  },
  {
    id: "ch42-007",
    chapter: 42,
    category: "Assessment",
    difficulty: "Hard",
    front: "Interpret a narrow pulse pressure in a hypotensive cardiac patient.",
    back: "A pulse pressure under 25 mmHg with hypotension points to low stroke volume from cardiogenic shock or tamponade, requiring immediate advanced support.",
    tags: ["pulse-pressure", "shock"]
  },
  {
    id: "ch42-008",
    chapter: 42,
    category: "Assessment",
    difficulty: "Hard",
    front: "What bedside ultrasound findings indicate depressed ejection fraction?",
    back: "Global hypokinesis, reduced endocardial excursion, and a visually small ventricular squeeze suggest EF <40%, correlating with poor forward flow.",
    tags: ["pocus", "ejection-fraction"]
  },
  {
    id: "ch42-009",
    chapter: 42,
    category: "Assessment",
    difficulty: "Medium",
    front: "Which lung sounds point toward left-sided failure from elevated preload?",
    back: "Bibasilar crackles with nocturnal dyspnea indicate fluid transudation into alveoli from high left ventricular end-diastolic pressures.",
    tags: ["lung-sounds", "heart-failure"]
  },

  // Treatment & Protocols (3 cards)
  {
    id: "ch42-010",
    chapter: 42,
    category: "Treatment",
    difficulty: "Medium",
    front: "How can controlled fluid boluses optimize preload in cardiogenic shock?",
    back: "Administer 250 mL isotonic boluses with reassessment; small increases in preload may improve stroke volume, but stop if crackles or JVD worsen.",
    tags: ["fluid-management", "cardiogenic-shock"]
  },
  {
    id: "ch42-011",
    chapter: 42,
    category: "Treatment",
    difficulty: "Hard",
    front: "Outline prehospital afterload reduction strategies for hypertensive pulmonary edema.",
    back: "Initiate high-flow oxygen, apply CPAP early, and consider provider-authorized nitroglycerin titration to reduce systemic vascular resistance and venous return.",
    tags: ["afterload-reduction", "pulmonary-edema"]
  },
  {
    id: "ch42-012",
    chapter: 42,
    category: "Treatment",
    difficulty: "Medium",
    front: "Why is CPAP effective in balancing preload and afterload?",
    back: "Positive airway pressure decreases venous return (lower preload) and improves oxygenation, reducing sympathetic drive and afterload on the failing left ventricle.",
    tags: ["cpap", "ventilation"]
  },

  // Scenario-Based (3 cards)
  {
    id: "ch42-013",
    chapter: 42,
    category: "Scenarios",
    difficulty: "Hard",
    front: "A post-MI patient with inferior ST elevation develops hypotension after nitroglycerin. What hemodynamic change occurred?",
    back: "Likely right ventricular infarction reduced preload; nitrates further decreased venous return, worsening cardiac output. Support with fluids and consult medical control.",
    tags: ["rv-infarct", "clinical-judgment"]
  },
  {
    id: "ch42-014",
    chapter: 42,
    category: "Scenarios",
    difficulty: "Medium",
    front: "During transport a heart failure patient becomes dyspneic with pink frothy sputum. What immediate actions stabilize preload/afterload?",
    back: "Sit upright, apply CPAP, reassess for nitroglycerin per protocol, and prepare for advanced airway if oxygenation fails.",
    tags: ["pulmonary-edema", "critical-care"]
  },
  {
    id: "ch42-015",
    chapter: 42,
    category: "Scenarios",
    difficulty: "Medium",
    front: "You note cold extremities and weak pulses in a septic patient despite normal blood pressure. What cardiovascular concept explains this?",
    back: "Peripheral vasoconstriction is elevating afterload to maintain pressure, but microcirculatory perfusion is poor; monitor lactate trends and prepare for shock progression.",
    tags: ["perfusion", "sepsis"]
  }
];

// Export flashcard metadata
export const chapter42FlashcardMeta = {
  chapter: 42,
  totalCards: 15,
  categories: {
    "Key Terms": 5,
    "Assessment": 4, 
    "Treatment": 3,
    "Scenarios": 3
  },
  difficulty: {
    "Easy": 2,
    "Medium": 8,
    "Hard": 5
  }
};
