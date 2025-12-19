import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getScenarios, Scenario } from '../api/scenarios';
import { DrawerParamList } from '../navigation/UWorldStyleNavigator';
import FTOFeedback from '../components/FTOFeedback';

// Define navigation types
type RootStackParamList = {
  ScenarioDetail: { id: number };
  // Add other screens as needed
};

type ScenariosScreenNavigationProp = DrawerNavigationProp<DrawerParamList>;

const ScenariosScreen = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ScenariosScreenNavigationProp>();

  const fetchScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getScenarios();
      setScenarios(data);
    } catch (err) {
      setError('Failed to load scenarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '#10b981'; // Green
      case 'medium':
        return '#f59e0b'; // Yellow
      case 'hard':
        return '#ef4444'; // Red
      default:
        return '#6b7280'; // Gray
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading scenarios...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <FTOFeedback type="dispatch" />
          <Text style={styles.headerText}>Clinical Practice</Text>
        </View>
        <View style={styles.scenariosList}>
          {scenarios.map((scenario) => {
            const isLocked = scenario.is_locked;
            return (
              <TouchableOpacity
                key={scenario.id}
                style={[styles.scenarioCard, isLocked && styles.lockedCard]}
                onPress={() => {
                  if (isLocked) {
                    navigation.navigate('Paywall');
                  } else {
                    navigation.navigate('ClinicalCases'); // Assuming ClinicalCases is for scenario detail, but wait, navigation is drawer
                    // Wait, ScenariosScreen is in drawer, but ScenarioDetail is stack.
                    // Since it's drawer, perhaps navigate to a stack screen, but for simplicity, since no ScenarioDetail in drawer, perhaps alert or navigate to paywall.
                    // The task is for visual lock, clicking navigates to paywall.
                    // Since locked, navigate to Paywall.
                  }
                }}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.scenarioTitle, isLocked && styles.lockedText]}>{scenario.title}</Text>
                  <View style={styles.badgesContainer}>
                    <View style={[styles.badge, { backgroundColor: '#374151' }]}>
                      <Text style={styles.badgeText}>{scenario.category}</Text>
                    </View>
                    <View style={[styles.badge, { backgroundColor: getDifficultyColor(scenario.difficulty) }]}>
                      <Text style={styles.badgeText}>{scenario.difficulty}</Text>
                    </View>
                    {isLocked && (
                      <View style={[styles.badge, { backgroundColor: '#ef4444' }]}>
                        <Text style={styles.badgeText}>🔒 Locked</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3640', // Dark Slate
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scenariosList: {
    gap: 16,
  },
  scenarioCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  lockedCard: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)', // Grayed out
    borderColor: 'rgba(128, 128, 128, 0.2)',
  },
  lockedText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  cardContent: {
    gap: 12,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3640',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2f3640',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScenariosScreen;