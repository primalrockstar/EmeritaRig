// Chapter 45 Flashcards - 15 Professional Quality Cards
export const chapter45Flashcards = [
  // Key Terms (5 cards)
  {
    id: "ch45-001",
    chapter: 45,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Explain negative feedback in endocrine regulation and give an example.",
    back: "Negative feedback suppresses hormone release once target levels are reached; rising serum glucose triggers insulin release, which then lowers glucose and reduces further insulin secretion.",
    tags: ["homeostasis", "feedback"]
  },
  {
    id: "ch45-002",
    chapter: 45,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Define the hypothalamic–pituitary axis and why it matters for EMS providers.",
    back: "The axis coordinates releasing hormones from the hypothalamus that stimulate pituitary secretion, ultimately controlling adrenal, thyroid, and reproductive hormones—key in stress responses and endocrine crises.",
    tags: ["hpa-axis", "neuroendocrine"]
  },
  {
    id: "ch45-003",
    chapter: 45,
    category: "Key Terms",
    difficulty: "Easy",
    front: "Contrast the roles of insulin and glucagon in glucose balance.",
    back: "Insulin drives glucose into cells and stores glycogen, while glucagon releases glucose from the liver during fasting to keep blood sugar stable.",
    tags: ["insulin", "glucagon"]
  },
  {
    id: "ch45-004",
    chapter: 45,
    category: "Key Terms",
    difficulty: "Medium",
    front: "Differentiate glycogenolysis from gluconeogenesis.",
    back: "Glycogenolysis breaks down stored glycogen to glucose; gluconeogenesis synthesizes glucose from non-carbohydrate sources such as amino acids and glycerol.",
    tags: ["metabolism", "glucose"]
  },
  {
    id: "ch45-005",
    chapter: 45,
    category: "Key Terms",
    difficulty: "Hard",
    front: "Summarize the pathophysiology of diabetic ketoacidosis (DKA).",
    back: "Insulin deficiency forces fat metabolism, producing ketone acids, severe dehydration, electrolyte imbalance, and metabolic acidosis with Kussmaul respirations.",
    tags: ["dka", "ketones"]
  },

  // Assessment & Skills (4 cards)
  {
    id: "ch45-006",
    chapter: 45,
    category: "Assessment",
    difficulty: "Medium",
    front: "When should EMS suspect an endocrine cause for altered mental status?",
    back: "Consider endocrine etiologies when AMS is accompanied by skin changes, abnormal vital temperature, polyuria/polydipsia, or known diabetic medication use.",
    tags: ["ams", "differential"]
  },
  {
    id: "ch45-007",
    chapter: 45,
    category: "Assessment",
    difficulty: "Medium",
    front: "How can you distinguish hypoglycemia from hyperglycemia in the field?",
    back: "Hypoglycemia often presents with rapid onset, diaphoresis, tremors, and seizures; hyperglycemia shows gradual onset, dry skin, polyuria, and fruity breath.",
    tags: ["hypoglycemia", "hyperglycemia"]
  },
  {
    id: "ch45-008",
    chapter: 45,
    category: "Assessment",
    difficulty: "Hard",
    front: "What findings raise concern for myxedema coma?",
    back: "Profound hypothermia, bradycardia, hypotension, altered mentation, and facial puffiness in a hypothyroid patient signal impending myxedema coma.",
    tags: ["myxedema", "thyroid"]
  },
  {
    id: "ch45-009",
    chapter: 45,
    category: "Assessment",
    difficulty: "Hard",
    front: "Which signs suggest adrenal crisis during assessment?",
    back: "Refractory hypotension, severe abdominal pain, vomiting, hyperpigmentation, and history of steroid dependence point to adrenal insufficiency.",
    tags: ["adrenal-crisis", "assessment"]
  },

  // Treatment & Protocols (3 cards)
  {
    id: "ch45-010",
    chapter: 45,
    category: "Treatment",
    difficulty: "Medium",
    front: "Detail the steps for oral glucose administration in symptomatic hypoglycemia.",
    back: "Confirm patient can swallow, measure blood glucose, deliver 15–25 g oral glucose between cheek and gum, monitor improvement, and prepare for repeat dosing if needed.",
    tags: ["oral-glucose", "hypoglycemia"]
  },
  {
    id: "ch45-011",
    chapter: 45,
    category: "Treatment",
    difficulty: "Hard",
    front: "What are prehospital priorities when managing suspected DKA?",
    back: "Establish airway support, provide high-flow oxygen, initiate isotonic fluid bolus per protocol, monitor cardiac rhythm, and avoid insulin administration prehospital.",
    tags: ["dka", "prehospital-care"]
  },
  {
    id: "ch45-012",
    chapter: 45,
    category: "Treatment",
    difficulty: "Medium",
    front: "How should EMTs manage suspected adrenal crisis during transport?",
    back: "Maintain airway, provide aggressive isotonic fluids, prepare for vasopressor support by ALS, and transport with the patient’s emergency hydrocortisone kit if available.",
    tags: ["adrenal-crisis", "fluid-therapy"]
  },

  // Scenario-Based (3 cards)
  {
    id: "ch45-013",
    chapter: 45,
    category: "Scenarios",
    difficulty: "Hard",
    front: "A dehydrated elderly patient has glucose 700 mg/dL, dry mucous membranes, and normal respirations. What condition is likely?",
    back: "Hyperosmolar hyperglycemic state (HHS) featuring severe dehydration without significant ketosis; prioritize fluid resuscitation and rapid transport.",
    tags: ["hhs", "hyperglycemia"]
  },
  {
    id: "ch45-014",
    chapter: 45,
    category: "Scenarios",
    difficulty: "Medium",
    front: "A patient on chronic steroids presents with vomiting, abdominal pain, and low blood pressure after infection. What is your management focus?",
    back: "Suspect adrenal crisis; support airway, give oxygen, start fluids, and ensure rapid transport with notification for steroid replacement.",
    tags: ["adrenal-crisis", "infection"]
  },
  {
    id: "ch45-015",
    chapter: 45,
    category: "Scenarios",
    difficulty: "Medium",
    front: "A febrile patient on antithyroid medication develops tachycardia, heat intolerance, and agitation. What should EMS anticipate?",
    back: "Possible thyroid storm; prioritize cooling measures, beta-blocker support by ALS, and prompt transport to a facility capable of endocrine stabilization.",
    tags: ["thyroid-storm", "hyperthyroid"]
  }
];

// Export flashcard metadata
export const chapter45FlashcardMeta = {
  chapter: 45,
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
