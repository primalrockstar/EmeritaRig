/**
 * EMT-B - Performance Analytics Screen
 * Detailed performance tracking and NREMT readiness
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PerformanceScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>📊</Text>
        <Text style={styles.placeholderTitle}>Performance Analytics</Text>
        <Text style={styles.placeholderText}>
          Advanced analytics dashboard coming soon
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  placeholder: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default PerformanceScreen;
