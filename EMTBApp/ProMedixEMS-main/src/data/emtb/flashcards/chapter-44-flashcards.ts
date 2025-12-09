// Chapter 44 Flashcards - 15 Professional Quality Cards
export const chapter44Flashcards = [
  // Key Terms (5 cards)
  {
    id: "ch44-001",
    chapter: 44,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Outline the core structures of a neuron and their functions.",
    back: "Neurons include dendrites that receive input, a soma for integration, an axon for impulse conduction, and synaptic terminals that release neurotransmitters.",
    tags: ["neuron", "anatomy"]
  },
  {
    id: "ch44-002",
    chapter: 44,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Define an action potential and the ionic shifts that create it.",
    back: "Action potentials occur when sodium influx depolarizes the membrane and potassium efflux repolarizes it, allowing rapid signal transmission.",
    tags: ["action-potential", "neurophysiology"]
  },
  {
    id: "ch44-003",
    chapter: 44,
    category: "Key Terms",
    difficulty: "Medium",
    front: "What is the blood–brain barrier (BBB) and why is it important?",
    back: "The BBB is a selective barrier formed by endothelial tight junctions that protects neural tissue from toxins while permitting essential nutrients.",
    tags: ["bbb", "neuroprotection"]
  },
  {
    id: "ch44-004",
    chapter: 44,
    category: "Key Terms",
    difficulty: "Hard",
    front: "Describe cerebral perfusion pressure (CPP) and its clinical significance.",
    back: "CPP = mean arterial pressure − intracranial pressure; maintaining CPP between 60–70 mmHg is critical to ensure adequate brain oxygenation.",
    tags: ["cpp", "perfusion"]
  },
  {
    id: "ch44-005",
    chapter: 44,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Summarize the sympathetic and parasympathetic divisions of the autonomic nervous system.",
    back: "The sympathetic system initiates 'fight or flight' responses, while the parasympathetic system supports 'rest and digest' functions via craniosacral outflow.",
    tags: ["autonomic", "ANS"]
  },

  // Assessment & Skills (4 cards)
  {
    id: "ch44-006",
    chapter: 44,
    category: "Assessment",
    difficulty: "Hard",
    front: "How do you calculate a Glasgow Coma Scale score in the field?",
    back: "Evaluate eye opening, verbal response, and motor response; add each domain (3–15 total) to trend neurologic status over time.",
    tags: ["gcs", "neuro-assessment"]
  },
  {
    id: "ch44-007",
    chapter: 44,
    category: "Assessment",
    difficulty: "Medium",
    front: "Which pupil findings help distinguish structural brain injury from metabolic causes?",
    back: "Unilateral dilated non-reactive pupils suggest herniation, while equal sluggish pupils often point to metabolic or toxic etiologies.",
    tags: ["pupils", "neurologic"]
  },
  {
    id: "ch44-008",
    chapter: 44,
    category: "Assessment",
    difficulty: "Hard",
    front: "What bedside signs indicate rising intracranial pressure?",
    back: "Cushing triad (hypertension, bradycardia, irregular respirations), declining GCS, unequal pupils, and vomiting signal elevated ICP.",
    tags: ["icp", "cushing-triad"]
  },
  {
    id: "ch44-009",
    chapter: 44,
    category: "Assessment",
    difficulty: "Medium",
    front: "How do you differentiate central vs peripheral facial droop in stroke assessment?",
    back: "Central lesions spare the forehead due to bilateral innervation; peripheral palsy (Bell) causes complete unilateral facial weakness including forehead.",
    tags: ["stroke", "neuro-exam"]
  },

  // Treatment & Protocols (3 cards)
  {
    id: "ch44-010",
    chapter: 44,
    category: "Treatment",
    difficulty: "Medium",
    front: "Outline prehospital priorities for an active seizure lasting less than five minutes.",
    back: "Protect airway, clear hazards, apply high-flow oxygen, check glucose, and be ready with benzodiazepines per protocol if seizure persists.",
    tags: ["seizure", "airway"]
  },
  {
    id: "ch44-011",
    chapter: 44,
    category: "Treatment",
    difficulty: "Hard",
    front: "When is controlled hyperventilation appropriate in traumatic brain injury?",
    back: "Only for signs of herniation with declining GCS; target EtCO₂ 30–35 mmHg while coordinating rapid transport to definitive care.",
    tags: ["tbi", "ventilation"]
  },
  {
    id: "ch44-012",
    chapter: 44,
    category: "Treatment",
    difficulty: "Medium",
    front: "How should EMTs manage blood pressure in suspected stroke patients?",
    back: "Avoid aggressive lowering; maintain permissive hypertension unless exceeding protocol thresholds, and focus on rapid stroke-center transport.",
    tags: ["stroke", "blood-pressure"]
  },

  // Scenario-Based (3 cards)
  {
    id: "ch44-013",
    chapter: 44,
    category: "Scenarios",
    difficulty: "Hard",
    front: "A high-cervical trauma patient presents with hypotension, bradycardia, and warm skin. What condition explains this pattern?",
    back: "Neurogenic shock from sympathetic disruption causing vasodilation and unopposed vagal tone; support with fluids and spinal precautions.",
    tags: ["neurogenic-shock", "spinal-injury"]
  },
  {
    id: "ch44-014",
    chapter: 44,
    category: "Scenarios",
    difficulty: "Medium",
    front: "During a FAST exam a patient misses facial droop but has slurred speech and arm drift. What is your next priority?",
    back: "Document stroke onset time, maintain oxygenation, check glucose, and expedite transport to a stroke-capable facility.",
    tags: ["stroke", "fast"]
  },
  {
    id: "ch44-015",
    chapter: 44,
    category: "Scenarios",
    difficulty: "Medium",
    front: "A postictal patient cannot move one arm after a generalized seizure. How should you interpret this finding?",
    back: "Likely Todd's paralysis—a transient focal deficit resolving within 48 hours; continue monitoring while ruling out acute stroke.",
    tags: ["todds-paralysis", "postictal"]
  }
];

// Export flashcard metadata
export const chapter44FlashcardMeta = {
  chapter: 44,
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
