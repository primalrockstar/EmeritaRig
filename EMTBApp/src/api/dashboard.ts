// Dashboard API
const API_BASE = 'http://localhost:8001/api';

export interface DashboardStats {
  elo_rating: number;
  total_quizzes: number;
  accuracy_percentage: number;
  study_streak_days: number;
}

export const getDashboardStats = async (token: string): Promise<DashboardStats> => {
  const response = await fetch(`${API_BASE}/dashboard/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
};