/**
 * EMT-B Medication Detail Screen
 * Emerita Glass UI with high contrast for doses
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getMedication, Medication } from '../api/meds';

const MedDetailScreen = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [medication, setMedication] = useState<Medication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedication();
  }, [id]);

  const loadMedication = async () => {
    setLoading(true);
    try {
      const med = await getMedication(id);
      setMedication(med);
    } catch (error) {
      console.error('Error loading medication:', error);
      Alert.alert('Error', 'Failed to load medication details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!medication) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Medication not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.genericName}>{medication.generic_name}</Text>
        {medication.brand_names && <Text style={styles.brandNames}>{medication.brand_names}</Text>}
        <Text style={styles.drugClass}>{medication.drug_class}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Action</Text>
        <Text style={styles.sectionText}>{medication.action}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indications</Text>
        {medication.indications.map((ind, index) => (
          <Text key={index} style={styles.bulletText}>• {ind}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contraindications</Text>
        {medication.contraindications.map((cont, index) => (
          <Text key={index} style={styles.bulletText}>• {cont}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interactions</Text>
        <Text style={styles.sectionText}>{medication.interactions}</Text>
      </View>

      <View style={styles.doseSection}>
        <Text style={styles.sectionTitle}>Dosing</Text>
        <View style={styles.doseContainer}>
          <Text style={styles.doseLabel}>Adult:</Text>
          <Text style={styles.doseText}>{medication.dose_adult}</Text>
        </View>
        <View style={styles.doseContainer}>
          <Text style={styles.doseLabel}>Pediatric:</Text>
          <Text style={styles.doseText}>{medication.dose_ped}</Text>
        </View>
        <Text style={styles.routeText}>Route: {medication.route}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Side Effects</Text>
        {medication.side_effects.map((effect, index) => (
          <Text key={index} style={styles.bulletText}>• {effect}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  genericName: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  brandNames: {
    color: '#e2e8f0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  drugClass: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
  },
  bulletText: {
    color: '#e2e8f0',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  doseSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  doseContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  doseLabel: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: 'bold',
    width: 80,
  },
  doseText: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  routeText: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 10,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default MedDetailScreen;