export interface Medication {
  id: number;
  generic_name: string;
  brand_names: string;
  drug_class: string;
  action: string;
  indications: string[];
  contraindications: string[];
  interactions: string;
  dose_adult: string;
  dose_ped: string;
  route: string;
  side_effects: string[];
}

const API_BASE = 'http://localhost:8000/api';

export const getMedications = async (q?: string): Promise<Medication[]> => {
  const params = q ? `?q=${encodeURIComponent(q)}` : '';
  const res = await fetch(`${API_BASE}/medications${params}`);
  if (!res.ok) throw new Error('Failed to fetch medications');
  return res.json();
};

export const getMedication = async (id: number): Promise<Medication> => {
  const res = await fetch(`${API_BASE}/medications/${id}`);
  if (!res.ok) throw new Error('Failed to fetch medication');
  return res.json();
};