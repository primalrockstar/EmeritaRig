// Chapter 43 Flashcards - 15 Professional Quality Cards
export const chapter43Flashcards = [
  // Key Terms (5 cards)
  {
    id: "ch43-001",
    chapter: 43,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Define pulmonary compliance and its normal trend in healthy adults.",
    back: "Compliance is the change in lung volume per change in pressure; healthy adults demonstrate high compliance that decreases with fibrosis or edema.",
    tags: ["compliance", "mechanics"]
  },
  {
    id: "ch43-002",
    chapter: 43,
    category: "Key Terms",
    difficulty: "Medium",
    front: "What is elastance and why does it matter during ventilation?",
    back: "Elastance is the tendency of lungs to recoil after inflation; high elastance means stiff lungs needing more pressure, signaling impending fatigue.",
    tags: ["elastance", "mechanics"]
  },
  {
    id: "ch43-003",
    chapter: 43,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Describe pulmonary surfactant and its purpose in alveoli.",
    back: "Surfactant reduces surface tension, prevents alveolar collapse, and lowers the work of breathing—especially crucial in premature lungs and ARDS.",
    tags: ["surfactant", "alveoli"]
  },
  {
    id: "ch43-004",
    chapter: 43,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Explain the ventilation-perfusion (V/Q) ratio and its normal value.",
    back: "V/Q compares air reaching alveoli to blood reaching capillaries; normal is about 0.8, with mismatches producing shunt or dead space physiology.",
    tags: ["vq-ratio", "gas-exchange"]
  },
  {
    id: "ch43-005",
    chapter: 43,
    category: "Key Terms",
    difficulty: "Hard",
    front: "Summarize the oxygen-hemoglobin dissociation curve and the Bohr effect.",
    back: "The curve shows hemoglobin saturation vs. PaO₂. The Bohr effect shifts it right when CO₂ or acidity rises, enhancing oxygen release to tissues.",
    tags: ["bohr-effect", "oxygenation"]
  },

  // Assessment & Skills (4 cards)
  {
    id: "ch43-006",
    chapter: 43,
    category: "Assessment",
    difficulty: "Hard",
    front: "How does an elevated alveolar–arterial (A–a) gradient guide your differential when SpO₂ remains low on high-flow oxygen?",
    back: "A widened A–a gradient points to diffusion or V/Q mismatch (PE, pneumonia) rather than hypoventilation, prompting transport to advanced care.",
    tags: ["a-a-gradient", "differential"]
  },
  {
    id: "ch43-007",
    chapter: 43,
    category: "Assessment",
    difficulty: "Medium",
    front: "Interpret a shark-fin capnography waveform during asthma exacerbation.",
    back: "A slanted upstroke with prolonged expiratory phase indicates bronchospasm and air trapping; anticipate need for bronchodilators and possible CPAP.",
    tags: ["capnography", "asthma"]
  },
  {
    id: "ch43-008",
    chapter: 43,
    category: "Assessment",
    difficulty: "Hard",
    front: "What does poor improvement in SpO₂ despite CPAP and 100% oxygen suggest about V/Q status?",
    back: "Refractory hypoxemia implies shunt physiology where alveoli are perfused but not ventilated, as seen in ARDS or lobar pneumonia.",
    tags: ["shunt", "oxygenation"]
  },
  {
    id: "ch43-009",
    chapter: 43,
    category: "Assessment",
    difficulty: "Medium",
    front: "Which clinical signs warn that respiratory muscles are fatiguing?",
    back: "Rising EtCO₂, declining tidal volumes, paradoxical breathing, and use of accessory muscles indicate fatigue and impending ventilatory failure.",
    tags: ["respiratory-fatigue", "assessment"]
  },

  // Treatment & Protocols (3 cards)
  {
    id: "ch43-010",
    chapter: 43,
    category: "Treatment",
    difficulty: "Medium",
    front: "How does prehospital CPAP improve refractory hypoxemia in pulmonary edema?",
    back: "CPAP recruits collapsed alveoli, pushes fluid back into circulation, and increases functional residual capacity to restore diffusion surface area.",
    tags: ["cpap", "pulmonary-edema"]
  },
  {
    id: "ch43-011",
    chapter: 43,
    category: "Treatment",
    difficulty: "Hard",
    front: "Outline key settings when assisting ventilations for a stiff lung (low compliance) patient.",
    back: "Use higher inspiratory pressures with lower tidal volumes, prolong expiratory time, and monitor plateau pressures if ventilator data available.",
    tags: ["ventilation", "low-compliance"]
  },
  {
    id: "ch43-012",
    chapter: 43,
    category: "Treatment",
    difficulty: "Medium",
    front: "Why is humidified oxygen beneficial for patients on high-flow respiratory support?",
    back: "Humidification preserves mucociliary clearance, prevents airway drying, and reduces bronchial irritation that can worsen bronchospasm.",
    tags: ["humidification", "oxygen-therapy"]
  },

  // Scenario-Based (3 cards)
  {
    id: "ch43-013",
    chapter: 43,
    category: "Scenarios",
    difficulty: "Hard",
    front: "A mountain climber with tachypnea, crackles, and low SpO₂ at altitude is suspected of HAPE. What physiologic process is occurring?",
    back: "Low atmospheric pressure causes hypoxic pulmonary vasoconstriction, leading to capillary leak and alveolar flooding that shunts blood away from ventilated areas.",
    tags: ["hape", "altitude"]
  },
  {
    id: "ch43-014",
    chapter: 43,
    category: "Scenarios",
    difficulty: "Medium",
    front: "A COPD patient given excessive sedation becomes somnolent with rising EtCO₂. Explain the pathophysiology.",
    back: "Hypoventilation from respiratory drive suppression increases PaCO₂, shifting the oxygen dissociation curve right and leading to carbon dioxide narcosis.",
    tags: ["copd", "co2-retention"]
  },
  {
    id: "ch43-015",
    chapter: 43,
    category: "Scenarios",
    difficulty: "Medium",
    front: "A patient with suspected pulmonary embolism has normal lung sounds but severe dyspnea. What gas exchange pattern explains this?",
    back: "Perfusion is blocked, creating alveolar dead space where ventilation occurs without blood flow, causing sharp drops in EtCO₂.",
    tags: ["pulmonary-embolism", "dead-space"]
  }
];

export const chapter43FlashcardMeta = {
  chapter: 43,
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
