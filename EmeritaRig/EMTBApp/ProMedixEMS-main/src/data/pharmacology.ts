import { medicationsData } from './medications';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  route: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  pediatricDosage: string;
  certificationLevel: string;
  administrationNotes: string;
}

// Use the existing medications data as our drug formulary
export const drugFormulary: Medication[] = medicationsData.map((med, index) => ({
  id: `med-${index + 1}`,
  name: med.name,
  genericName: med.genericName,
  category: med.category,
  dosage: med.dosage,
  route: med.route,
  indications: med.indications,
  contraindications: med.contraindications,
  sideEffects: med.sideEffects,
  pediatricDosage: med.pediatricDosage,
  certificationLevel: med.certificationLevel,
  administrationNotes: med.administrationNotes
}));

// Helper functions for pharmacology search and filtering
export const getMedicationsByCategory = (category: string): Medication[] => {
  return drugFormulary.filter(med => med.category.toLowerCase() === category.toLowerCase());
};

export const getMedicationsByCertificationLevel = (level: string): Medication[] => {
  return drugFormulary.filter(med => med.certificationLevel === level);
};

export const searchMedications = (query: string): Medication[] => {
  const lowercaseQuery = query.toLowerCase();
  return drugFormulary.filter(med =>
    med.name.toLowerCase().includes(lowercaseQuery) ||
    med.genericName.toLowerCase().includes(lowercaseQuery) ||
    med.category.toLowerCase().includes(lowercaseQuery) ||
    med.indications.some(indication => indication.toLowerCase().includes(lowercaseQuery))
  );
};

export const getAllCategories = (): string[] => {
  return [...new Set(drugFormulary.map(med => med.category))];
};

export const getEMTBasicMedications = (): Medication[] => {
  return drugFormulary.filter(med => med.certificationLevel === 'EMT');
};

export const getAEMTMedications = (): Medication[] => {
  return drugFormulary.filter(med => med.certificationLevel === 'AEMT');
};

export const getParamedicMedications = (): Medication[] => {
  return drugFormulary.filter(med => med.certificationLevel === 'Paramedic');
};