// React Native Navigation: AppNavigator.tsx
// Replaces React Router DOM with React Navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import auth components
import { useAuth } from '../auth/AuthContext';
import LoginPage from '../auth/LoginPage';

// Import placeholder screens (to be migrated)
import DashboardScreen from '../screens/DashboardScreen';
import QuizScreen from '../screens/QuizScreen';
import CalculatorsScreen from '../screens/CalculatorsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import MedsScreen from '../screens/MedsScreen';
import MedDetailScreen from '../screens/MedDetailScreen';

// Navigation type definitions
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Quiz: undefined;
  Flashcards: undefined;
  Meds: undefined;
  Calculators: undefined;
  Progress: undefined;
  Profile: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const MedsStack = createStackNavigator();

// Meds Stack Navigator
const MedsStackNavigator = () => (
  <MedsStack.Navigator screenOptions={{ headerShown: false }}>
    <MedsStack.Screen name="MedsList" component={MedsScreen} />
    <MedsStack.Screen name="MedDetail" component={MedDetailScreen} />
  </MedsStack.Navigator>
);

// Main Tab Navigator (Bottom Tabs)
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
        },
        tabBarActiveTintColor: '#1e40af', // Medical blue
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="clipboard-check" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Flashcards"
        component={FlashcardsScreen}
        options={{
          title: 'Study',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="book" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Meds"
        component={MedsStackNavigator}
        options={{
          title: 'Meds',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="pill" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Calculators"
        component={CalculatorsScreen}
        options={{
          title: 'Tools',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="calculator" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="trending-up" color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" color={color} size={size} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

// Auth Navigator (Login Flow)
const AuthNavigator = () => {
  return (
    <LoginPage 
      onLoginSuccess={(role) => {
        console.log('Login successful for role:', role);
        // Navigation handled by auth state change
      }}
    />
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? 'Main' : 'Auth'}
      >
        {user ? (
          <RootStack.Screen 
            name="Main" 
            component={MainTabNavigator}
          />
        ) : (
          <RootStack.Screen 
            name="Auth" 
            component={AuthNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// Simple Loading Screen Component
const LoadingScreen = () => {
  return (
    <View style={loadingStyles.container}>
      <Text style={loadingStyles.text}>Loading EMT-B...</Text>
    </View>
  );
};

// Tab Icon Component (placeholder for vector icons)
const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <Text style={[iconStyles.text, { color, fontSize: size * 0.6 }]}>
        {getIconText(name)}
      </Text>
    </View>
  );
};

// Simple icon text mapping (to be replaced with proper icons)
const getIconText = (name: string): string => {
  const iconMap: { [key: string]: string } = {
    home: '🏠',
    'clipboard-check': '📋',
    book: '📚',
    pill: '💊',
    calculator: '🧮',
    'trending-up': '📈',
    user: '👤',
  };
  return iconMap[name] || '•';
};

// Styles
import { View, Text, StyleSheet } from 'react-native';

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    fontSize: 18,
    color: '#1e40af',
    fontWeight: '600',
  },
});

const iconStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default AppNavigator;