// Performance API
const API_BASE = 'http://localhost:8001/api';

export interface PerformanceStats {
  elo_rating: number;
  nremt_readiness_score: number;
  total_attempts: number;
  categories: {
    category: string;
    total_questions: number;
    correct_answers: number;
    accuracy: number;
  }[];
}

export const getPerformanceStats = async (token: string): Promise<PerformanceStats> => {
  const response = await fetch(`${API_BASE}/performance/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch performance stats');
  }
  return response.json();
};