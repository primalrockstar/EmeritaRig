// React Native Migration: LoginPage.tsx
// Converted from web version with mobile-optimized interface
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useAuth } from './AuthContext';

interface LoginPageProps {
  onLoginSuccess?: (role: string) => void;
  prefillEmail?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ 
  onLoginSuccess, 
  prefillEmail = 'student@example.com' 
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState('password123');
  const [instructorCode, setInstructorCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if this is instructor login based on email
  const isInstructorLogin = email.includes('instructor') || email.includes('admin');

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password, instructorCode || undefined);
      
      // Determine user role for navigation
      const role = email.includes('instructor') 
        ? 'instructor' 
        : email.includes('admin') 
        ? 'admin' 
        : 'student';

      if (onLoginSuccess) {
        onLoginSuccess(role);
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const showDemoCredentials = () => {
    Alert.alert(
      'Demo Credentials',
      'For Teachers/Instructors:\nEmail: instructor@example.com\nPassword: password123\n\nFor Students:\nEmail: student@example.com\nPassword: password123',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Image
                source={require('../../public/images/EMTBFavicon.jpg')}
                style={styles.logo}
                resizeMode="contain"
                accessible
                accessibilityLabel="EMT-B Favicon logo"
              />
              <Text style={styles.title}>EMT-B</Text>
              <Text style={styles.subtitle}>Medical Education Platform</Text>
            </View>

            {/* Sign In Form */}
            <View style={styles.form}>
              <Text style={styles.formTitle}>Sign In</Text>
              
              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Instructor Access Code (conditional) */}
              {isInstructorLogin && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Instructor Access Code (if required)</Text>
                  <TextInput
                    style={styles.input}
                    value={instructorCode}
                    onChangeText={setInstructorCode}
                    placeholder="Enter code provided by your admin"
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Sign In Button */}
              <TouchableOpacity
                style={[styles.signInButton, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.signInButtonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Demo Credentials Helper */}
              <TouchableOpacity 
                style={styles.demoButton}
                onPress={showDemoCredentials}
              >
                <Text style={styles.demoButtonText}>View Demo Credentials</Text>
              </TouchableOpacity>
            </View>

            {/* Medical Disclaimer */}
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                For medical education purposes only. Not for actual patient care.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// React Native styles (mobile-optimized)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Medical clean background
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af', // Medical blue
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    minHeight: 48, // Touch-friendly height
  },
  signInButton: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 8,
    shadowColor: '#1e40af',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  demoButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  demoButtonText: {
    color: '#1e40af',
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  disclaimer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginPage;