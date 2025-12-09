// Chapter 1: EMS Ecosystem Essentials - Flashcards
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'application' | 'recognition' | 'assessment' | 'scenario';
}

export const chapter1Flashcards: Flashcard[] = [
  {
    id: "ch1-001",
    question: "What are the four levels of EMT training in the National EMS Scope of Practice?",
    answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced EMT (AEMT), and Paramedic.",
    category: "EMS Systems",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-002",
    question: "What does the acronym NHTSA stand for and what is their role in EMS?",
    answer: "National Highway Traffic Safety Administration. They develop national standards for EMS training, equipment, and system development.",
    category: "EMS Regulation",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-003",
    question: "A patient calls 911 for chest pain. Describe the EMS system response from dispatch to hospital care.",
    answer: "1) Dispatcher receives call and obtains information, 2) Appropriate EMS unit is dispatched, 3) EMTs respond, assess, and treat patient, 4) Patient is transported to appropriate hospital, 5) Hospital receives report and continues care.",
    category: "System Operations",
    difficulty: "medium",
    type: "scenario"
  },
  {
    id: "ch1-004",
    question: "What are the primary roles and responsibilities of an EMT?",
    answer: "Scene safety, patient assessment, emergency medical care, safe patient transport, communication with medical direction, and accurate documentation.",
    category: "EMT Roles",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-005",
    question: "What is the difference between online and offline medical direction?",
    answer: "Online medical direction involves direct communication with a physician during patient care. Offline medical direction includes protocols, standing orders, and training provided in advance.",
    category: "Medical Direction",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-006",
    question: "An EMT wants to administer a medication that requires medical direction. What steps should they follow?",
    answer: "Contact medical direction, provide patient information and assessment findings, clearly state the medication request, receive and confirm orders, document the interaction.",
    category: "Medical Direction",
    difficulty: "hard",
    type: "application"
  },
  {
    id: "ch1-007",
    question: "What are the essential components of a comprehensive EMS system?",
    answer: "Regulation and policy, resource management, human resources and training, transportation, facilities, communications, public information and education, medical direction, and trauma systems.",
    category: "System Components",
    difficulty: "hard",
    type: "recognition"
  },
  {
    id: "ch1-008",
    question: "What is the purpose of EMS protocols and standing orders?",
    answer: "Protocols provide step-by-step procedures for specific conditions. Standing orders allow EMTs to perform certain treatments without direct physician contact, enabling faster patient care.",
    category: "Protocols",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-009",
    question: "A rural EMS system has limited resources. What factors should be considered for system design?",
    answer: "Response times, available personnel, training levels, equipment needs, communication systems, transport distances to hospitals, mutual aid agreements, and community needs assessment.",
    category: "System Design",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-010",
    question: "What is the role of quality improvement in EMS systems?",
    answer: "Continuous evaluation of system performance, identifying areas for improvement, analyzing patient outcomes, updating protocols, and ensuring high-quality patient care through data-driven decisions.",
    category: "Quality Improvement",
    difficulty: "medium",
    type: "assessment"
  },
  {
    id: "ch1-011",
    question: "What are the minimum training requirements for EMT certification?",
    answer: "Completion of state-approved EMT course (typically 120-150 hours), passing written and practical examinations, CPR certification, and meeting physical and mental health requirements.",
    category: "EMT Training",
    difficulty: "easy",
    type: "recognition"
  },
  {
    id: "ch1-012",
    question: "How do EMS systems integrate with other emergency services?",
    answer: "Through unified command structures, shared communication systems, coordinated response protocols, joint training exercises, and established mutual aid agreements with fire, police, and emergency management.",
    category: "System Integration",
    difficulty: "medium",
    type: "application"
  },
  {
    id: "ch1-013",
    question: "What is the significance of evidence-based medicine in EMS?",
    answer: "Uses scientific research and clinical studies to guide treatment protocols, ensures treatments are proven effective, improves patient outcomes, and supports continuous system improvement.",
    category: "Evidence-Based Practice",
    difficulty: "medium",
    type: "definition"
  },
  {
    id: "ch1-014",
    question: "An EMS system is developing new protocols. What stakeholders should be involved in the process?",
    answer: "Medical director, EMTs and paramedics, hospital physicians, nurses, system administrators, training coordinators, quality improvement staff, and community representatives.",
    category: "Protocol Development",
    difficulty: "hard",
    type: "scenario"
  },
  {
    id: "ch1-015",
    question: "What are the key performance indicators used to evaluate EMS system effectiveness?",
    answer: "Response times, patient survival rates, protocol compliance, customer satisfaction, cost-effectiveness, training completion rates, and clinical outcome measures.",
    category: "Performance Metrics",
    difficulty: "hard",
    type: "assessment"
  }
];

export default chapter1Flashcards;
