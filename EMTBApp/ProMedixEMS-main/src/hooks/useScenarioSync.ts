import { useState, useEffect } from 'react';
import { EnhancedQuizQuestion } from '../data/enhanced-quiz-system';

const SCENARIOS_CACHE_KEY = 'emt-scenarios-cache';
const API_URL = '/api/scenarios'; // Adjust based on your API endpoint

interface ScenarioSyncResult {
  scenarios: EnhancedQuizQuestion[];
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

export const useScenarioSync = (): ScenarioSyncResult => {
  const [scenarios, setScenarios] = useState<EnhancedQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        // Try to fetch from API
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add auth headers if needed
            // 'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Transform backend scenarios to frontend format
          const transformedScenarios = transformBackendScenarios(data);
          setScenarios(transformedScenarios);
          // Cache the data
          localStorage.setItem(SCENARIOS_CACHE_KEY, JSON.stringify(transformedScenarios));
          setIsOffline(false);
        } else {
          throw new Error(`API request failed: ${response.status}`);
        }
      } catch (err) {
        console.warn('Failed to fetch scenarios from API:', err);
        setIsOffline(true);
        // Try to load from cache
        const cached = localStorage.getItem(SCENARIOS_CACHE_KEY);
        if (cached) {
          try {
            const cachedScenarios = JSON.parse(cached);
            setScenarios(cachedScenarios);
            setError('Using cached scenarios (offline mode)');
          } catch (parseErr) {
            setError('Failed to load cached scenarios');
          }
        } else {
          setError('No scenarios available - check your connection');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  return {
    scenarios,
    loading,
    error,
    isOffline,
  };
};

// Transform backend scenario format to frontend EnhancedQuizQuestion format
const transformBackendScenarios = (backendScenarios: any[]): EnhancedQuizQuestion[] => {
  return backendScenarios.map((scenario, index) => {
    const narrativeData = typeof scenario.narrative_key_points === 'string'
      ? JSON.parse(scenario.narrative_key_points)
      : scenario.narrative_key_points || {};

    // Extract options from narrative data or create defaults
    let options: string[] = [];
    if (narrativeData.correct_error) {
      options = [
        narrativeData.correct_error,
        narrativeData.chaos_events?.[0] || 'Alternative: Check scene safety',
        narrativeData.stress_fto_responses?.[0] || 'Alternative: Call for backup',
        narrativeData.hazards?.[0] || 'Alternative: Follow protocols'
      ];
    } else {
      options = [
        'Follow standard protocol',
        'Call for medical control',
        'Ensure scene safety',
        'Transport immediately'
      ];
    }

    return {
      id: `backend-scenario-${scenario.id}`,
      module: 1, // Default module, adjust as needed
      chapter: 1, // Default chapter, adjust as needed
      scenario: scenario.dispatch_info || scenario.title,
      question: `Scenario ${scenario.id}: ${scenario.title}`,
      options,
      correctAnswer: 0, // First option is correct based on narrative
      explanation: narrativeData.correct_error || 'Follow appropriate protocol',
      category: 'scenario',
      difficulty: scenario.difficulty?.toLowerCase() || 'medium',
      tags: [scenario.category?.toLowerCase() || 'general'],
      nremtDomain: 'Medical Emergencies', // Adjust based on category
      nationalProtocolAlignment: 'NHTSA 2022 Protocol',
      emtScopeCompliant: true,
      points: 3,
      timeEstimate: 75,
      fto_guidance: narrativeData.correct_error || 'Review your protocols. That was a critical fail.'
    };
  });
};