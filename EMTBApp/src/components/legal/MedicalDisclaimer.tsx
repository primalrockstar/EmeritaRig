import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const MedicalDisclaimer: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.warningHeader}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.title}>Medical Education Disclaimer</Text>
        </View>
        
        <View style={styles.criticalNotice}>
          <Text style={styles.criticalTitle}>FOR EDUCATIONAL PURPOSES ONLY</Text>
          <Text style={styles.criticalText}>
            This application is designed exclusively for emergency medical services (EMS) education and training. 
            The content provided is NOT intended for use in actual patient care situations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Use Requirements</Text>
          <Text style={styles.bulletPoint}>
            • Always follow your local protocols and medical director's orders
          </Text>
          <Text style={styles.bulletPoint}>
            • This app does not replace formal EMT-B training or certification
          </Text>
          <Text style={styles.bulletPoint}>
            • Scenarios are simulated and may not reflect real patient conditions
          </Text>
          <Text style={styles.bulletPoint}>
            • Always verify drug dosages and protocols with current resources
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scope of Practice</Text>
          <Text style={styles.paragraph}>
            Content is aligned with EMT-Basic scope of practice but may vary by jurisdiction. 
            Always verify with your local medical director and state protocols before applying 
            any procedures or medications in real situations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Situations</Text>
          <Text style={styles.emergencyText}>
            IN REAL EMERGENCIES: Call 911 immediately. Never delay emergency care to consult this app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liability Limitation</Text>
          <Text style={styles.paragraph}>
            EMT-B, its developers, and content contributors assume no responsibility for 
            decisions made based on this educational content. Users are solely responsible for 
            their professional practice and patient care decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Accuracy</Text>
          <Text style={styles.paragraph}>
            While we strive for accuracy, medical standards evolve constantly. Users must verify 
            all information with current, authoritative sources before application in practice.
          </Text>
        </View>

        <View style={styles.acknowledgment}>
          <Text style={styles.acknowledgmentTitle}>User Acknowledgment</Text>
          <Text style={styles.acknowledgmentText}>
            By using this app, you acknowledge that you understand this is educational content only 
            and agree to use it responsibly within your scope of practice and local protocols.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  warningHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
  },
  criticalNotice: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
  },
  criticalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 10,
  },
  criticalText: {
    fontSize: 14,
    color: '#991b1b',
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 5,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
  },
  acknowledgment: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  acknowledgmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  acknowledgmentText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default MedicalDisclaimer;