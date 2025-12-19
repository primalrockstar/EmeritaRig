// Calculators Screen - Emerita Glass UI Clinical Tools
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

const CalculatorsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'gcs' | 'apgar' | 'rule9' | 'o2tank' | 'pedsvitals'>('gcs');

  const tabs = [
    { id: 'gcs', title: 'GCS', emoji: '🧠' },
    { id: 'apgar', title: 'APGAR', emoji: '👶' },
    { id: 'rule9', title: 'Rule of 9s', emoji: '🔥' },
    { id: 'o2tank', title: 'O2 Tank', emoji: '⛽' },
    { id: 'pedsvitals', title: 'Peds Vitals', emoji: '👶' },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'gcs':
        return <GlasgowComaCalculator />;
      case 'apgar':
        return <APGARCalculator />;
      case 'rule9':
        return <RuleOfNines />;
      case 'o2tank':
        return <OxygenTankCalculator />;
      case 'pedsvitals':
        return <PediatricVitalsCalculator />;
      default:
        return <GlasgowComaCalculator />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Clinical Calculators</Text>
        <Text style={styles.subtitle}>
          Professional medical assessment tools for EMT practice
        </Text>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.tabActive
              ]}
              onPress={() => setSelectedTab(tab.id as any)}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[
                styles.tabTitle,
                selectedTab === tab.id && styles.tabTitleActive
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {renderTabContent()}
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚠️ For educational purposes only. Not for actual patient care decisions.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Glasgow Coma Scale Calculator
const GlasgowComaCalculator = () => {
  const [eyeResponse, setEyeResponse] = useState(0);
  const [verbalResponse, setVerbalResponse] = useState(0);
  const [motorResponse, setMotorResponse] = useState(0);

  const totalScore = eyeResponse + verbalResponse + motorResponse;

  const getScoreInterpretation = (score: number) => {
    if (score >= 13) return { text: 'Mild', color: '#059669' };
    if (score >= 9) return { text: 'Moderate', color: '#d97706' };
    if (score >= 3) return { text: 'Severe', color: '#dc2626' };
    return { text: 'Select responses', color: '#6b7280' };
  };

  const interpretation = getScoreInterpretation(totalScore);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.calculatorTitle}>Glasgow Coma Scale</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Total Score</Text>
          <Text style={styles.scoreValue}>{totalScore}/15</Text>
          <Text style={[styles.scoreInterpretation, { color: interpretation.color }]}>
            {interpretation.text}
          </Text>
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.responseSectionTitle}>Eye Opening Response</Text>
          {[
            { score: 4, text: 'Spontaneous' },
            { score: 3, text: 'To speech' },
            { score: 2, text: 'To pain' },
            { score: 1, text: 'No response' },
          ].map((option) => (
            <TouchableOpacity
              key={option.score}
              style={[
                styles.responseOption,
                eyeResponse === option.score && styles.selectedResponse
              ]}
              onPress={() => setEyeResponse(option.score)}
            >
              <Text style={styles.responseScore}>{option.score}</Text>
              <Text style={styles.responseText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.responseSectionTitle}>Verbal Response</Text>
          {[
            { score: 5, text: 'Oriented' },
            { score: 4, text: 'Confused' },
            { score: 3, text: 'Inappropriate words' },
            { score: 2, text: 'Incomprehensible sounds' },
            { score: 1, text: 'No response' },
          ].map((option) => (
            <TouchableOpacity
              key={option.score}
              style={[
                styles.responseOption,
                verbalResponse === option.score && styles.selectedResponse
              ]}
              onPress={() => setVerbalResponse(option.score)}
            >
              <Text style={styles.responseScore}>{option.score}</Text>
              <Text style={styles.responseText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.responseSectionTitle}>Motor Response</Text>
          {[
            { score: 6, text: 'Obeys commands' },
            { score: 5, text: 'Localizes to pain' },
            { score: 4, text: 'Withdraws from pain' },
            { score: 3, text: 'Abnormal flexion' },
            { score: 2, text: 'Abnormal extension' },
            { score: 1, text: 'No response' },
          ].map((option) => (
            <TouchableOpacity
              key={option.score}
              style={[
                styles.responseOption,
                motorResponse === option.score && styles.selectedResponse
              ]}
              onPress={() => setMotorResponse(option.score)}
            >
              <Text style={styles.responseScore}>{option.score}</Text>
              <Text style={styles.responseText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// APGAR Score Calculator
const APGARCalculator = () => {
  const [appearance, setAppearance] = useState(0);
  const [pulse, setPulse] = useState(0);
  const [grimace, setGrimace] = useState(0);
  const [activity, setActivity] = useState(0);
  const [respiration, setRespiration] = useState(0);

  const totalScore = appearance + pulse + grimace + activity + respiration;

  const getScoreInterpretation = (score: number) => {
    if (score >= 7) return { text: 'Normal', color: '#10b981' };
    if (score >= 4) return { text: 'Fair', color: '#f59e0b' };
    return { text: 'Poor', color: '#ef4444' };
  };

  const interpretation = getScoreInterpretation(totalScore);

  return (
    <View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Total Score</Text>
        <Text style={styles.scoreValue}>{totalScore}/10</Text>
        <Text style={[styles.scoreInterpretation, { color: interpretation.color }]}>
          {interpretation.text}
        </Text>
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseSectionTitle}>Appearance</Text>
        {[
          { score: 0, text: 'Blue or pale' },
          { score: 1, text: 'Body pink, extremities blue' },
          { score: 2, text: 'Completely pink' },
        ].map((option) => (
          <TouchableOpacity
            key={option.score}
            style={[
              styles.responseOption,
              appearance === option.score && styles.selectedResponse
            ]}
            onPress={() => setAppearance(option.score)}
          >
            <Text style={styles.responseScore}>{option.score}</Text>
            <Text style={styles.responseText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseSectionTitle}>Pulse</Text>
        {[
          { score: 0, text: 'Absent' },
          { score: 1, text: '< 100 bpm' },
          { score: 2, text: '≥ 100 bpm' },
        ].map((option) => (
          <TouchableOpacity
            key={option.score}
            style={[
              styles.responseOption,
              pulse === option.score && styles.selectedResponse
            ]}
            onPress={() => setPulse(option.score)}
          >
            <Text style={styles.responseScore}>{option.score}</Text>
            <Text style={styles.responseText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseSectionTitle}>Grimace</Text>
        {[
          { score: 0, text: 'No response' },
          { score: 1, text: 'Grimace' },
          { score: 2, text: 'Sneeze/cough/pull away' },
        ].map((option) => (
          <TouchableOpacity
            key={option.score}
            style={[
              styles.responseOption,
              grimace === option.score && styles.selectedResponse
            ]}
            onPress={() => setGrimace(option.score)}
          >
            <Text style={styles.responseScore}>{option.score}</Text>
            <Text style={styles.responseText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseSectionTitle}>Activity</Text>
        {[
          { score: 0, text: 'Limp' },
          { score: 1, text: 'Some flexion' },
          { score: 2, text: 'Active motion' },
        ].map((option) => (
          <TouchableOpacity
            key={option.score}
            style={[
              styles.responseOption,
              activity === option.score && styles.selectedResponse
            ]}
            onPress={() => setActivity(option.score)}
          >
            <Text style={styles.responseScore}>{option.score}</Text>
            <Text style={styles.responseText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.responseSection}>
        <Text style={styles.responseSectionTitle}>Respiration</Text>
        {[
          { score: 0, text: 'Absent' },
          { score: 1, text: 'Slow/irregular' },
          { score: 2, text: 'Good/crying' },
        ].map((option) => (
          <TouchableOpacity
            key={option.score}
            style={[
              styles.responseOption,
              respiration === option.score && styles.selectedResponse
            ]}
            onPress={() => setRespiration(option.score)}
          >
            <Text style={styles.responseScore}>{option.score}</Text>
            <Text style={styles.responseText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Rule of Nines Reference
const RuleOfNines = () => {
  return (
    <View>
      <Text style={styles.ruleTitle}>Burn Surface Area Estimation</Text>
      <Text style={styles.ruleDescription}>
        The Rule of Nines divides the body into sections that represent 9% (or multiples) of the total body surface area.
      </Text>

      <View style={styles.ruleSection}>
        <Text style={styles.ruleSectionTitle}>Adult Body Surface Areas:</Text>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Head and neck: 9%</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Each arm: 9%</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Front torso: 18%</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Back torso: 18%</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Each leg: 18%</Text>
        </View>
        <View style={styles.ruleItem}>
          <Text style={styles.ruleItemBullet}>•</Text>
          <Text style={styles.ruleItemText}>Genitals: 1%</Text>
        </View>
      </View>

      <View style={styles.ruleNote}>
        <Text style={styles.ruleNoteText}>
          Note: For pediatric patients, use the Pediatric Rule of Nines or Lund-Browder chart for more accurate assessment.
        </Text>
      </View>
    </View>
  );
};

// Oxygen Tank Duration Calculator
const OxygenTankCalculator = () => {
  const [cylinderType, setCylinderType] = useState<'D' | 'E' | 'M'>('D');
  const [gaugePSI, setGaugePSI] = useState('');
  const [flowRate, setFlowRate] = useState('');

  const constants = { D: 0.16, E: 0.28, M: 1.56 };
  const safeResidual = 200;

  const calculateDuration = () => {
    const psi = parseFloat(gaugePSI);
    const flow = parseFloat(flowRate);
    if (isNaN(psi) || isNaN(flow) || flow <= 0 || psi < safeResidual) return 0;
    return ((psi - safeResidual) * constants[cylinderType]) / flow;
  };

  const duration = calculateDuration();
  const hours = Math.floor(duration / 60);
  const mins = Math.round(duration % 60);

  return (
    <View>
      <Text style={styles.calculatorTitle}>Oxygen Tank Duration</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Cylinder Type</Text>
        <View style={styles.cylinderOptions}>
          {[
            { type: 'D', name: 'D-Cylinder' },
            { type: 'E', name: 'E-Cylinder' },
            { type: 'M', name: 'M-Cylinder' },
          ].map((option) => (
            <TouchableOpacity
              key={option.type}
              style={[
                styles.cylinderOption,
                cylinderType === option.type && styles.selectedCylinder
              ]}
              onPress={() => setCylinderType(option.type as any)}
            >
              <Text style={[
                styles.cylinderText,
                cylinderType === option.type && styles.selectedCylinderText
              ]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Gauge PSI</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="e.g., 2200"
          placeholderTextColor="#94a3b8"
          value={gaugePSI}
          onChangeText={setGaugePSI}
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Flow Rate (L/min)</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="e.g., 4"
          placeholderTextColor="#94a3b8"
          value={flowRate}
          onChangeText={setFlowRate}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Time Remaining</Text>
        <Text style={styles.resultValue}>
          {duration > 0 ? `${hours}:${mins.toString().padStart(2, '0')} (${Math.round(duration)} min)` : 'Enter valid values'}
        </Text>
      </View>
    </View>
  );
};

// Pediatric Vitals Estimator
const PediatricVitalsCalculator = () => {
  const [age, setAge] = useState('');

  const getVitals = (ageYears: number) => {
    if (ageYears < 1) {
      return { hr: '120-160', rr: '30-60', bp: '> 60' };
    } else if (ageYears <= 3) {
      return { hr: '80-160', rr: '20-30', bp: `> ${70 + 2 * Math.floor(ageYears)}` };
    } else if (ageYears <= 6) {
      return { hr: '80-140', rr: '20-30', bp: `> ${70 + 2 * Math.floor(ageYears)}` };
    } else {
      return { hr: '70-120', rr: '18-30', bp: `> ${70 + 2 * Math.floor(ageYears)}` };
    }
  };

  const ageNum = parseFloat(age);
  const vitals = !isNaN(ageNum) && ageNum >= 0 && ageNum <= 12 ? getVitals(ageNum) : { hr: '', rr: '', bp: '' };

  return (
    <View>
      <Text style={styles.calculatorTitle}>Pediatric Vitals</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Age (years)</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="e.g., 2.5"
          placeholderTextColor="#94a3b8"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.vitalsContainer}>
        <View style={styles.vitalCard}>
          <Text style={styles.vitalLabel}>Heart Rate (bpm)</Text>
          <Text style={styles.vitalValue}>{vitals.hr || 'Enter age'}</Text>
        </View>
        <View style={styles.vitalCard}>
          <Text style={styles.vitalLabel}>Respiratory Rate (breaths/min)</Text>
          <Text style={styles.vitalValue}>{vitals.rr || 'Enter age'}</Text>
        </View>
        <View style={styles.vitalCard}>
          <Text style={styles.vitalLabel}>Min Systolic BP (mmHg)</Text>
          <Text style={styles.vitalValue}>{vitals.bp || 'Enter age'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // slate-950
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 22,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabTitleActive: {
    color: '#ffffff',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    backdropFilter: 'blur(10px)',
  },
  disclaimer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#fbbf24',
    textAlign: 'center',
  },
  calculatorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  scoreInterpretation: {
    fontSize: 18,
    fontWeight: '600',
  },
  responseSection: {
    marginBottom: 24,
  },
  responseSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  responseOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedResponse: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  responseScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginRight: 12,
    minWidth: 20,
  },
  responseText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  ruleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  ruleDescription: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
    lineHeight: 22,
  },
  ruleSection: {
    marginBottom: 24,
  },
  ruleSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleItemBullet: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 8,
    marginTop: 2,
  },
  ruleItemText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
    lineHeight: 22,
  },
  ruleNote: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  ruleNoteText: {
    fontSize: 14,
    color: '#fbbf24',
    lineHeight: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  cylinderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cylinderOption: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedCylinder: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  cylinderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  selectedCylinderText: {
    color: '#ffffff',
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  resultLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  vitalsContainer: {
    marginTop: 20,
  },
  vitalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  vitalLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default CalculatorsScreen;