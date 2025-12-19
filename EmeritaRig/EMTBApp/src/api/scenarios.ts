export interface Scenario {
  id: number;
  title: string;
  dispatch_info: string;
  vitals: {
    HR: string;
    BP: string;
    RR: string;
    SpO2: string;
  };
  narrative_key_points: string[];
  difficulty: string;
  category: string;
  is_locked?: boolean;
}

const API_BASE = 'http://localhost:8000/api';

export const getScenarios = async (): Promise<Scenario[]> => {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error('Failed to fetch scenarios');
  return res.json();
};

export const getScenarioDetails = async (id: number): Promise<Scenario> => {
  const res = await fetch(`${API_BASE}/scenarios/${id}`);
  if (!res.ok) throw new Error('Failed to fetch scenario details');
  return res.json();
};