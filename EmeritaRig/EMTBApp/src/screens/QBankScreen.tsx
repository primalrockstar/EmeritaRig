/**
 * EMT-B - Question Bank Screen (UWorld Style)
 * Main question bank interface with filtering and organization
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const QBankScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    { id: '1', name: 'Module 1: Preparatory', chapters: 4, questions: 120, completed: 4 },
    { id: '2', name: 'Module 2: Airway Management', chapters: 3, questions: 95, completed: 3 },
    { id: '3', name: 'Module 3: Patient Assessment', chapters: 4, questions: 150, completed: 2 },
    { id: '4', name: 'Module 4: Pharmacology', chapters: 2, questions: 80, completed: 0 },
    { id: '5', name: 'Module 5: Shock & Resuscitation', chapters: 3, questions: 110, completed: 1 },
    { id: '6', name: 'Module 6: Trauma Emergencies', chapters: 5, questions: 175, completed: 3 },
    { id: '7', name: 'Module 7: Medical Emergencies', chapters: 8, questions: 245, completed: 5 },
    { id: '8', name: 'Module 8: Obstetrics', chapters: 2, questions: 65, completed: 2 },
    { id: '9', name: 'Module 9: Pediatrics', chapters: 3, questions: 95, completed: 1 },
    { id: '10', name: 'Module 10: Geriatrics', chapters: 1, questions: 45, completed: 1 },
    { id: '11', name: 'Module 11: Special Populations', chapters: 2, questions: 70, completed: 0 },
    { id: '12', name: 'Module 12: EMS Operations', chapters: 2, questions: 60, completed: 2 },
    { id: '13', name: 'Module 13: Advanced Airway', chapters: 1, questions: 40, completed: 0 },
    { id: '14', name: 'Module 14: Assessment-Based Management', chapters: 1, questions: 50, completed: 1 },
  ];

  const quizModes = [
    { id: 'tutor', name: 'Tutor Mode', desc: 'Get feedback after each question', icon: '🎓' },
    { id: 'timed', name: 'Timed Mode', desc: 'Simulate NREMT exam conditions', icon: '⏱️' },
    { id: 'custom', name: 'Custom Quiz', desc: 'Build your own quiz', icon: '⚙️' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search questions, topics, or modules..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Quiz mode selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SELECT QUIZ MODE</Text>
        <View style={styles.modeGrid}>
          {quizModes.map((mode) => (
            <TouchableOpacity key={mode.id} style={styles.modeCard}>
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text style={styles.modeName}>{mode.name}</Text>
              <Text style={styles.modeDesc}>{mode.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Module selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BROWSE BY MODULE</Text>
        {modules.map((module) => {
          const progress = Math.round((module.completed / module.chapters) * 100);
          return (
            <TouchableOpacity key={module.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <Text style={styles.moduleName}>{module.name}</Text>
                <View style={styles.progressBadge}>
                  <Text style={styles.progressBadgeText}>{progress}%</Text>
                </View>
              </View>
              <View style={styles.moduleStats}>
                <Text style={styles.moduleStat}>
                  📚 {module.chapters} Chapters • {module.questions} Questions
                </Text>
                <Text style={styles.moduleStat}>
                  ✅ {module.completed}/{module.chapters} Complete
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quick stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1,400</Text>
          <Text style={styles.statLabel}>Total Questions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>67%</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>324</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1e293b',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  modeGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    elevation: 1,
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  modeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  modeDesc: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  progressBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e40af',
  },
  moduleStats: {
    marginBottom: 12,
  },
  moduleStat: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default QBankScreen;
