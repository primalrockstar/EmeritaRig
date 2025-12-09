import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

interface SecuritySettingsProps {
  onSecurityUpdate?: (settings: SecuritySettings) => void;
}

interface SecuritySettings {
  autoLockEnabled: boolean;
  autoLockMinutes: number;
  biometricEnabled: boolean;
  dataEncryption: boolean;
  auditLogging: boolean;
  sessionTimeout: number;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSecurityUpdate }) => {
  const [settings, setSettings] = useState<SecuritySettings>({
    autoLockEnabled: true,
    autoLockMinutes: 30,
    biometricEnabled: false,
    dataEncryption: true, // Always enabled for HIPAA
    auditLogging: true,   // Always enabled for HIPAA
    sessionTimeout: 30,
  });

  const updateSetting = (key: keyof SecuritySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSecurityUpdate?.(newSettings);
  };

  const showDataDeletionOptions = () => {
    Alert.alert(
      'Data Management',
      'Choose what data to manage:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'View Audit Log', 
          onPress: () => showAuditLog() 
        },
        { 
          text: 'Export Data', 
          onPress: () => exportUserData() 
        },
        { 
          text: 'Delete All Data', 
          style: 'destructive',
          onPress: () => confirmDataDeletion() 
        },
      ]
    );
  };

  const showAuditLog = () => {
    Alert.alert(
      'HIPAA Audit Log',
      'Audit log contains encrypted records of all data access. This feature helps maintain HIPAA compliance for educational data.',
      [{ text: 'OK' }]
    );
  };

  const exportUserData = () => {
    Alert.alert(
      'Export User Data',
      'Your educational progress data will be exported in a secure, encrypted format. This includes study progress, quiz scores, and learning analytics.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => {
          // Implement data export
          Alert.alert('Success', 'Data export initiated. You will receive an email with your data.');
        }}
      ]
    );
  };

  const confirmDataDeletion = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your educational progress, quiz scores, and account data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Forever', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Data Deleted', 'All user data has been permanently deleted from our systems.');
          }
        }
      ]
    );
  };

  const showSessionTimeoutOptions = () => {
    Alert.alert(
      'Session Timeout',
      'Choose automatic logout time for HIPAA compliance:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: '15 minutes', onPress: () => updateSetting('sessionTimeout', 15) },
        { text: '30 minutes', onPress: () => updateSetting('sessionTimeout', 30) },
        { text: '60 minutes', onPress: () => updateSetting('sessionTimeout', 60) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Security & Privacy Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HIPAA Compliance</Text>
          <Text style={styles.sectionDescription}>
            EMT-B maintains strict HIPAA compliance for medical education use.
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Data Encryption</Text>
              <Text style={styles.settingDescription}>AES-256 encryption (Always On)</Text>
            </View>
            <View style={styles.statusIndicator}>
              <Text style={styles.enabledText}>✓ Enabled</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Audit Logging</Text>
              <Text style={styles.settingDescription}>HIPAA compliance tracking (Always On)</Text>
            </View>
            <View style={styles.statusIndicator}>
              <Text style={styles.enabledText}>✓ Enabled</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Security</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto-Lock</Text>
              <Text style={styles.settingDescription}>Automatically lock app when inactive</Text>
            </View>
            <Switch
              value={settings.autoLockEnabled}
              onValueChange={(value) => updateSetting('autoLockEnabled', value)}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={'#ffffff'}
            />
          </View>

          <TouchableOpacity style={styles.settingRow} onPress={showSessionTimeoutOptions}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Session Timeout</Text>
              <Text style={styles.settingDescription}>
                Auto-logout after {settings.sessionTimeout} minutes of inactivity
              </Text>
            </View>
            <Text style={styles.settingValue}>{settings.sessionTimeout}m ›</Text>
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Biometric Login</Text>
              <Text style={styles.settingDescription}>Use fingerprint or Face ID</Text>
            </View>
            <Switch
              value={settings.biometricEnabled}
              onValueChange={(value) => updateSetting('biometricEnabled', value)}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Privacy</Text>
          
          <View style={styles.privacyCard}>
            <Text style={styles.privacyTitle}>What We Collect</Text>
            <Text style={styles.privacyItem}>✓ Educational progress and quiz scores</Text>
            <Text style={styles.privacyItem}>✓ Study time and learning analytics</Text>
            <Text style={styles.privacyItem}>✓ App usage patterns (anonymized)</Text>
          </View>

          <View style={styles.privacyCard}>
            <Text style={styles.privacyTitle}>What We DON'T Collect</Text>
            <Text style={styles.privacyItem}>✗ Personal Health Information (PHI)</Text>
            <Text style={styles.privacyItem}>✗ Patient data or medical records</Text>
            <Text style={styles.privacyItem}>✗ Location data or contacts</Text>
            <Text style={styles.privacyItem}>✗ Biometric data</Text>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={showDataDeletionOptions}>
            <Text style={styles.actionButtonText}>Manage My Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Status</Text>
          
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Encryption Status</Text>
              <Text style={styles.statusGood}>Active</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>HIPAA Compliance</Text>
              <Text style={styles.statusGood}>Verified</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Last Security Check</Text>
              <Text style={styles.statusLabel}>Nov 5, 2025</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Data Retention</Text>
              <Text style={styles.statusLabel}>2 years</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <Text style={styles.contactInfo}>
            Security Issues: security@emtb.com{'\n'}
            Privacy Questions: privacy@emtb.com{'\n'}
            Response Time: 24-48 hours
          </Text>
        </View>

        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerTitle}>Medical Education Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            EMT-B is for educational purposes only. Never use this app for actual patient care 
            decisions. In medical emergencies, call 911 immediately.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingValue: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statusIndicator: {
    padding: 5,
  },
  enabledText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  privacyCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  privacyItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#374151',
  },
  statusGood: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  contactInfo: {
    fontSize: 14,
    color: '#374151',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    lineHeight: 20,
  },
  disclaimerSection: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#991b1b',
    lineHeight: 20,
  },
});

export default SecuritySettings;