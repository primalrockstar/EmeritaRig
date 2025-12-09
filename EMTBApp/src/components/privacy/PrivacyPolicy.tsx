import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface PrivacyPolicyProps {
  onAccept?: () => void;
  onDecline?: () => void;
  showButtons?: boolean;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  onAccept,
  onDecline,
  showButtons = false,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>EMT-B Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: November 5, 2025</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HIPAA Compliance Statement</Text>
          <Text style={styles.paragraph}>
            EMT-B is designed as an educational platform and does not collect, store, or process any 
            Personal Health Information (PHI) or patient data. This app is intended solely for medical 
            education and training purposes for Emergency Medical Technicians (EMTs) and healthcare 
            professionals.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Educational Data:</Text> We may collect anonymized learning progress, 
            quiz scores, and study session data to improve educational content.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Device Information:</Text> Basic device information for app functionality 
            and crash reporting (iOS/Android version, device model).
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>No Patient Information:</Text> We explicitly do NOT collect any patient 
            names, medical records, or real patient scenarios.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.paragraph}>
            • All data is encrypted in transit using TLS 1.3
          </Text>
          <Text style={styles.paragraph}>
            • Local data storage uses AES-256 encryption
          </Text>
          <Text style={styles.paragraph}>
            • No sensitive medical data is stored on device
          </Text>
          <Text style={styles.paragraph}>
            • Regular security audits and penetration testing
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Educational Use Only</Text>
          <Text style={styles.paragraph}>
            This application is designed exclusively for educational purposes. The scenarios, cases, and 
            medical information provided are for training use only and should never be used for actual 
            patient care decisions. Always consult current protocols and medical direction for real 
            patient scenarios.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Requirements</Text>
          <Text style={styles.paragraph}>
            This app is intended for healthcare professionals and students 18 years or older. Users under 18 
            must have parental consent and supervision when using this educational platform.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.paragraph}>
            • Educational progress data is retained for 2 years from last use
          </Text>
          <Text style={styles.paragraph}>
            • Users can request data deletion at any time
          </Text>
          <Text style={styles.paragraph}>
            • No backup copies of user data after deletion
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Third-Party Services</Text>
          <Text style={styles.paragraph}>
            We use minimal third-party services, all HIPAA-compliant where applicable:
          </Text>
          <Text style={styles.paragraph}>
            • Analytics: Anonymized usage patterns only
          </Text>
          <Text style={styles.paragraph}>
            • Crash Reporting: Technical data only, no user content
          </Text>
          <Text style={styles.paragraph}>
            • Payment Processing: Secure, encrypted, PCI-compliant
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to:
          </Text>
          <Text style={styles.paragraph}>
            • Access your educational data
          </Text>
          <Text style={styles.paragraph}>
            • Request data correction or deletion
          </Text>
          <Text style={styles.paragraph}>
            • Opt-out of data collection
          </Text>
          <Text style={styles.paragraph}>
            • Export your learning progress
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.paragraph}>
            For privacy questions or data requests:
          </Text>
          <Text style={styles.paragraph}>
            Email: privacy@emtb.com
          </Text>
          <Text style={styles.paragraph}>
            Privacy Officer: HIPAA Compliance Team
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Updates to Privacy Policy</Text>
          <Text style={styles.paragraph}>
            We will notify users of material changes to this privacy policy through in-app notifications 
            and require renewed consent for continued use.
          </Text>
        </View>

        {showButtons && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
              <Text style={styles.acceptButtonText}>Accept & Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
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
  bold: {
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  acceptButton: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#ef4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrivacyPolicy;