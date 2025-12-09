// React Native Migration: AuthContext.tsx
// Converted from web version to React Native compatible
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Role = 'student' | 'instructor' | 'admin';

type User = {
  id: string;
  name: string;
  role: Role;
  email: string;
  token?: string;
  emailVerified?: boolean;
  isInstructorVerified?: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, instructorCode?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app start
    const initSession = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Validate token with backend
          const response = await fetch('http://localhost:8001/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            await AsyncStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      }
      setLoading(false);
    };

    initSession();
  }, []);

  const login = async (email: string, password: string, instructorCode?: string) => {
    try {
      const response = await fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      await AsyncStorage.setItem('authToken', data.access_token);
      setUser(data.user);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// React Native compatible RequireRole component
export const RequireRole: React.FC<{ role: Role; children: React.ReactNode }> = ({ role, children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    // Return React Native compatible loading component
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  if (!user || (role !== user.role && user.role !== 'admin')) {
    // Return React Native compatible unauthorized component
    return (
      <View style={styles.container}>
        <View style={styles.unauthorizedContainer}>
          <Text style={styles.unauthorizedText}>
            Unauthorized. Please log in as {role}.
          </Text>
        </View>
      </View>
    );
  }
  
  // Additional instructor verification gate
  if (role === 'instructor' && !user.isInstructorVerified) {
    return (
      <View style={styles.container}>
        <View style={styles.unauthorizedContainer}>
          <Text style={styles.unauthorizedText}>
            Instructor account requires verification. Contact your admin or use your SSO invite.
          </Text>
        </View>
      </View>
    );
  }
  
  return <>{children}</>;
};

// React Native styles (replacing Tailwind CSS classes)
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  unauthorizedContainer: {
    backgroundColor: '#fefce8',
    borderWidth: 1,
    borderColor: '#fde047',
    borderRadius: 8,
    padding: 16,
  },
  unauthorizedText: {
    color: '#a16207',
    fontSize: 14,
    lineHeight: 20,
  },
});