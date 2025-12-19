import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const LegalScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Medical Disclaimer */}
        <Text style={styles.sectionTitle}>Medical Disclaimer</Text>
        <Text style={styles.sectionText}>
          This application is for educational and training purposes only. It does not constitute medical advice. Always follow your local protocols.
        </Text>

        {/* Terms of Service */}
        <Text style={styles.sectionTitle}>Terms of Service</Text>
        <Text style={styles.sectionText}>
          By using this application, you agree to the following terms: ... (Standard placeholder text for terms of service.)
        </Text>

        {/* Privacy Policy */}
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.sectionText}>
          Data is stored securely.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark Slate
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24', // Gold
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
  },
});

export default LegalScreen;