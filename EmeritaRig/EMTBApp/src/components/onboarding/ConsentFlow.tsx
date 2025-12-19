import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

interface ConsentFlowProps {
  onConsentComplete: (consents: ConsentData) => void;
}

interface ConsentData {
  privacyPolicy: boolean;
  medicalDisclaimer: boolean;
  termsOfService: boolean;
  ageVerification: boolean;
  educationalUse: boolean;
  dataProcessing: boolean;
  timestamp: string;
  version: string;
}

const ConsentFlow: React.FC<ConsentFlowProps> = ({ onConsentComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [consents, setConsents] = useState<ConsentData>({
    privacyPolicy: false,
    medicalDisclaimer: false,
    termsOfService: false,
    ageVerification: false,
    educationalUse: false,
    dataProcessing: false,
    timestamp: '',
    version: '1.0.0',
  });

  const consentSteps = [
    {
      id: 'age',
      title: 'Age Verification',
      content: 'Age Verification Required',
      description: 'EMT-B is designed for healthcare professionals and students. You must be 18 years or older to use this application.',
      requirement: 'I confirm that I am 18 years of age or older',
      key: 'ageVerification' as keyof ConsentData,
      critical: true,
    },
    {
      id: 'medical',
      title: 'Medical Education Disclaimer',
      content: 'Educational Use Only',
      description: 'This application provides educational content for emergency medical services training. It is NOT intended for clinical decision-making or patient care.',
      requirement: 'I understand this is for educational purposes only',
      key: 'medicalDisclaimer' as keyof ConsentData,
      critical: true,
    },
    {
      id: 'educational',
      title: 'Professional Use Acknowledgment',
      content: 'Professional Responsibility',
      description: 'You acknowledge that you will use this app responsibly as a healthcare professional or student, and will not rely on it for actual patient care decisions.',
      requirement: 'I will use this app responsibly for educational purposes',
      key: 'educationalUse' as keyof ConsentData,
      critical: true,
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      content: 'Data Privacy & HIPAA Compliance',
      description: 'We are committed to protecting your privacy and maintaining HIPAA compliance. Please review our privacy policy to understand how we handle your educational data.',
      requirement: 'I have read and accept the Privacy Policy',
      key: 'privacyPolicy' as keyof ConsentData,
      critical: true,
    },
    {
      id: 'data',
      title: 'Data Processing Consent',
      content: 'Educational Data Processing',
      description: 'We collect anonymized educational progress data to improve the learning experience. No personal health information is collected.',
      requirement: 'I consent to educational data processing as described',
      key: 'dataProcessing' as keyof ConsentData,
      critical: true,
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      content: 'Terms & Conditions',
      description: 'Please review and accept our terms of service to continue using EMT-B.',
      requirement: 'I accept the Terms of Service',
      key: 'termsOfService' as keyof ConsentData,
      critical: true,
    },
  ];

  const currentStepData = consentSteps[currentStep];

  const handleConsent = (consent: boolean) => {
    if (!consent && currentStepData.critical) {
      Alert.alert(
        'Consent Required',
        'This consent is required to use EMT-B. You can review our policies in the app settings.',
        [
          { text: 'Review Again', style: 'default' },
          { 
            text: 'Exit App', 
            style: 'destructive',
            onPress: () => {
              // Handle app exit
              if (Platform.OS === 'ios') {
                Alert.alert('Please close the app manually');
              }
            }
          },
        ]
      );
      return;
    }

    const updatedConsents = {
      ...consents,
      [currentStepData.key]: consent,
    };
    setConsents(updatedConsents);

    if (currentStep < consentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All consents completed
      const finalConsents = {
        ...updatedConsents,
        timestamp: new Date().toISOString(),
      };
      onConsentComplete(finalConsents);
    }
  };

  const viewPolicy = () => {
    Alert.alert(
      'View Policy',
      'This will open the full policy document in your browser or in-app viewer.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View', onPress: () => {
          // Navigate to policy viewer
          console.log('Navigate to policy viewer');
        }},
      ]
    );
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>EMT-B</Text>
        <Text style={styles.subtitle}>Setup & Consent</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentStep + 1) / consentSteps.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {consentSteps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          
          <View style={styles.contentCard}>
            <Text style={styles.contentTitle}>{currentStepData.content}</Text>
            <Text style={styles.description}>{currentStepData.description}</Text>
          </View>

          {currentStepData.id === 'medical' && (
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Never use this app for actual patient care decisions. In emergencies, call 911 immediately.
              </Text>
            </View>
          )}

          {currentStepData.id === 'privacy' && (
            <View style={styles.policyBox}>
              <Text style={styles.policyTitle}>HIPAA Compliance Statement</Text>
              <Text style={styles.policyText}>
                This app is designed for educational use only and does not collect any Personal Health Information (PHI) or patient data.
              </Text>
              <TouchableOpacity style={styles.viewPolicyButton} onPress={viewPolicy}>
                <Text style={styles.viewPolicyText}>View Full Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.requirementContainer}>
            <Text style={styles.requirementText}>
              {currentStepData.requirement}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.consentButtons}>
          {currentStepData.critical ? (
            <TouchableOpacity 
              style={styles.acceptButton} 
              onPress={() => handleConsent(true)}
            >
              <Text style={styles.acceptButtonText}>I Agree & Continue</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.optionalButtons}>
              <TouchableOpacity 
                style={styles.declineButton} 
                onPress={() => handleConsent(false)}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.acceptButton} 
                onPress={() => handleConsent(true)}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e40af',
    padding: 20,
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    marginTop: 5,
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  warningBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  warningIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#991b1b',
    fontWeight: '500',
  },
  policyBox: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 12,
  },
  viewPolicyButton: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  viewPolicyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  requirementContainer: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  requirementText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  consentButtons: {
    gap: 12,
  },
  optionalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  acceptButton: {
    backgroundColor: '#059669',
    padding: 16,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#6b7280',
    padding: 16,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConsentFlow;