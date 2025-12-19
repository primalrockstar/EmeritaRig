export interface EMTBMedication {
  id: string;
  name: string;
  classification: string;
  indications: string[];
  contraindications: string[];
  dosage: { adult?: string; pediatric?: string; };
  route: string[];
}

export const emtbMedicationsData: EMTBMedication[] = [
  {
    id: "oxygen",
    name: "Oxygen",
    classification: "Gas",
    indications: ["Hypoxia", "Respiratory distress"],
    contraindications: ["None in emergency setting"],
    dosage: { adult: "2-15 LPM as needed", pediatric: "2-10 LPM as needed" },
    route: ["Inhalation"]
  }
];
