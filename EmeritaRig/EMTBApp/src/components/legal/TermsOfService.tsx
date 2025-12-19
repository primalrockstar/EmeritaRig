import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const TermsOfService: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: November 5, 2025</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By downloading, installing, or using EMT-B ("the App"), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, do not use the App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Educational Purpose Only</Text>
          <Text style={styles.paragraph}>
            EMT-B is designed exclusively for educational purposes in emergency medical services training. 
            The App is NOT intended for:
          </Text>
          <Text style={styles.bulletPoint}>• Clinical decision-making</Text>
          <Text style={styles.bulletPoint}>• Patient diagnosis or treatment</Text>
          <Text style={styles.bulletPoint}>• Emergency medical guidance</Text>
          <Text style={styles.bulletPoint}>• Replacement of professional medical training</Text>
          <Text style={styles.bulletPoint}>• Substitute for current medical protocols</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            You agree to:
          </Text>
          <Text style={styles.bulletPoint}>• Use the App solely for educational purposes</Text>
          <Text style={styles.bulletPoint}>• Maintain the confidentiality of your account credentials</Text>
          <Text style={styles.bulletPoint}>• Not share account access with unauthorized users</Text>
          <Text style={styles.bulletPoint}>• Follow all applicable laws and regulations</Text>
          <Text style={styles.bulletPoint}>• Not attempt to reverse engineer or modify the App</Text>
          <Text style={styles.bulletPoint}>• Report any security vulnerabilities immediately</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Age Requirements</Text>
          <Text style={styles.paragraph}>
            You must be at least 18 years old to use EMT-B. Users under 18 require parental consent 
            and supervision. The App is intended for healthcare professionals, students, and educational institutions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Subscription Terms</Text>
          <Text style={styles.paragraph}>
            EMT-B offers subscription-based access to premium content:
          </Text>
          <Text style={styles.bulletPoint}>• Free Tier: Limited access to 4 chapters</Text>
          <Text style={styles.bulletPoint}>• EMT Premium: $14.99/month or $149.99/year</Text>
          <Text style={styles.bulletPoint}>• Advanced Pro: $24.99/month</Text>
          <Text style={styles.paragraph}>
            Subscriptions automatically renew unless cancelled. You may cancel at any time through your 
            device's subscription management settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, materials, and intellectual property in EMT-B are owned by EMT-B or 
            its licensors. You may not copy, distribute, modify, or create derivative works without explicit permission.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Medical Disclaimer & Limitation of Liability</Text>
          <Text style={styles.warningText}>
            IMPORTANT MEDICAL DISCLAIMER:
          </Text>
          <Text style={styles.paragraph}>
            EMT-B provides educational content only. We expressly disclaim any responsibility for:
          </Text>
          <Text style={styles.bulletPoint}>• Medical decisions made based on App content</Text>
          <Text style={styles.bulletPoint}>• Patient care outcomes</Text>
          <Text style={styles.bulletPoint}>• Professional certification results</Text>
          <Text style={styles.bulletPoint}>• Compliance with local medical protocols</Text>
          <Text style={styles.emergencyText}>
            IN MEDICAL EMERGENCIES: Call 911 immediately. Never delay emergency care to consult this App.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Data Privacy & HIPAA Compliance</Text>
          <Text style={styles.paragraph}>
            EMT-B is committed to protecting your privacy and maintaining HIPAA compliance:
          </Text>
          <Text style={styles.bulletPoint}>• We do NOT collect Personal Health Information (PHI)</Text>
          <Text style={styles.bulletPoint}>• We do NOT collect patient data</Text>
          <Text style={styles.bulletPoint}>• Educational progress data is encrypted and anonymized</Text>
          <Text style={styles.bulletPoint}>• Full privacy policy available in-app</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Prohibited Uses</Text>
          <Text style={styles.paragraph}>
            You may NOT use EMT-B for:
          </Text>
          <Text style={styles.bulletPoint}>• Actual patient care or medical decision-making</Text>
          <Text style={styles.bulletPoint}>• Providing medical advice to others</Text>
          <Text style={styles.bulletPoint}>• Commercial redistribution of content</Text>
          <Text style={styles.bulletPoint}>• Illegal or unauthorized activities</Text>
          <Text style={styles.bulletPoint}>• Harassment or abuse of other users</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Account Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate accounts that violate these terms. You may delete your account 
            at any time through the App settings. Upon termination, your access to premium content will cease.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Updates & Modifications</Text>
          <Text style={styles.paragraph}>
            We may update these Terms of Service periodically. Significant changes will be communicated through 
            in-app notifications. Continued use after updates constitutes acceptance of revised terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms of Service are governed by the laws of the United States and the state of [State]. 
            Any disputes will be resolved through binding arbitration.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Contact Information</Text>
          <Text style={styles.paragraph}>
            For questions about these Terms of Service:
          </Text>
          <Text style={styles.contactInfo}>
            Email: legal@emtb.com{'\n'}
            Legal Department: EMT-B Terms & Conditions{'\n'}
            Response Time: 48-72 hours
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Severability</Text>
          <Text style={styles.paragraph}>
            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain 
            in full force and effect.
          </Text>
        </View>

        <View style={styles.acknowledgment}>
          <Text style={styles.acknowledgmentTitle}>Acknowledgment</Text>
          <Text style={styles.acknowledgmentText}>
            By using EMT-B, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms of Service and our Privacy Policy.
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
    textAlign: 'center',
  },
  lastUpdated: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
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
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 5,
    marginLeft: 10,
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#dc2626',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    textAlign: 'center',
  },
  contactInfo: {
    fontSize: 14,
    color: '#374151',
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
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

export default TermsOfService;