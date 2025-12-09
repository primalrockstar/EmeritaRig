export interface EMTBProtocol {
  id: string;
  title: string;
  category: string;
  priority: string;
  description: string;
  steps: string[];
}

export const emtbProtocolsData: EMTBProtocol[] = [
  {
    id: "primary-assessment",
    title: "Primary Assessment",
    category: "Assessment",
    priority: "Critical",
    description: "Initial patient evaluation focusing on life-threatening conditions",
    steps: ["Scene safety assessment", "General impression", "Assess responsiveness", "Airway assessment", "Breathing assessment", "Circulation assessment"]
  }
];
