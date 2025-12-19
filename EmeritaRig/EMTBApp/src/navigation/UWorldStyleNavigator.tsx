/**
 * EMT-B - UWorld-Style Navigation Architecture
 * Drawer navigation with hierarchical content organization
 * Replaces bottom tabs with professional medical education interface
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import auth components
import { useAuth } from '../auth/AuthContext';
import LoginPage from '../auth/LoginPage';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import QuizScreen from '../screens/QuizScreen';
import EnhancedQuizScreen from '../screens/EnhancedQuizScreen';
import CalculatorsScreen from '../screens/CalculatorsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

// New UWorld-style screens (to be created)
import QBankScreen from '../screens/QBankScreen'; // Question Bank
import FlashcardsScreen from '../screens/FlashcardsScreen';
import NotesScreen from '../screens/NotesScreen';
import PerformanceScreen from '../screens/PerformanceScreen';
import PaywallScreen from '../screens/PaywallScreen';
import LegalScreen from '../screens/LegalScreen';

// Navigation type definitions
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type DrawerParamList = {
  Dashboard: undefined;
  QBank: undefined;
  ClinicalCases: undefined;
  Flashcards: undefined;
  Notes: undefined;
  Calculators: undefined;
  Performance: undefined;
  Profile: undefined;
  Paywall: undefined;
  Legal: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

/**
 * Custom Drawer Content - UWorld Style
 * Hierarchical organization with module grouping
 */
const CustomDrawerContent = (props: any) => {
  const { user, logout } = useAuth();

  const menuSections = [
    {
      title: 'STUDY TOOLS',
      items: [
        { name: 'Dashboard', label: 'Dashboard', icon: '🏠', route: 'Dashboard' },
        { name: 'QBank', label: 'Question Bank', icon: '📚', route: 'QBank', badge: '1000+' },
        { name: 'ClinicalCases', label: 'Clinical Cases', icon: '🏥', route: 'ClinicalCases', badge: 'NEW' },
        { name: 'Flashcards', label: 'Flashcards', icon: '🗂️', route: 'Flashcards' },
        { name: 'Notes', label: 'Study Notes', icon: '📝', route: 'Notes' },
      ],
    },
    {
      title: 'TOOLS & RESOURCES',
      items: [
        { name: 'Calculators', label: 'Medical Calculators', icon: '🧮', route: 'Calculators' },
        { name: 'Performance', label: 'Performance Analytics', icon: '📊', route: 'Performance' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { name: 'Profile', label: 'My Profile', icon: '👤', route: 'Profile' },
        { name: 'Paywall', label: 'Upgrade', icon: '💎', route: 'Paywall' },
        { name: 'Legal', label: 'Legal', icon: '⚖️', route: 'Legal' },
      ],
    },
  ];

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      {/* Drawer Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>EMT-B</Text>
          <Text style={styles.logoSubtext}>EMS Training</Text>
        </View>
        
        {/* User info */}
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.email || 'Student'}</Text>
            <Text style={styles.userRole}>{user?.role || 'EMT Student'}</Text>
          </View>
        </View>

        {/* Progress indicator */}
        <View style={styles.progressIndicator}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '67%' }]} />
          </View>
          <Text style={styles.progressText}>67% Complete • 27/41 Chapters</Text>
        </View>
      </View>

      {/* Menu sections */}
      {menuSections.map((section, sectionIdx) => (
        <View key={sectionIdx} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.menuItem,
                props.state.routeNames[props.state.index] === item.route && styles.menuItemActive,
              ]}
              onPress={() => props.navigation.navigate(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[
                styles.menuLabel,
                props.state.routeNames[props.state.index] === item.route && styles.menuLabelActive,
              ]}>
                {item.label}
              </Text>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>EMT-B v1.0.0</Text>
        <Text style={styles.footerSubtext}>NREMT-Aligned Curriculum</Text>
      </View>
    </DrawerContentScrollView>
  );
};

/**
 * Main Drawer Navigator
 */
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e40af',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        drawerStyle: {
          backgroundColor: '#f8fafc',
          width: 300,
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'EMT-B',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="QBank"
        component={QBankScreen}
        options={{
          title: 'Question Bank',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="ClinicalCases"
        component={EnhancedQuizScreen}
        options={{
          title: 'Clinical Cases',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Flashcards"
        component={FlashcardsScreen}
        options={{
          title: 'Flashcards',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          title: 'Study Notes',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Calculators"
        component={CalculatorsScreen}
        options={{
          title: 'Medical Calculators',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{
          title: 'Performance Analytics',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{
          title: 'Upgrade',
          headerRight: () => <HeaderActions />,
        }}
      />
      <Drawer.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          title: 'Legal',
          headerRight: () => <HeaderActions />,
        }}
      />
    </Drawer.Navigator>
  );
};

/**
 * Header Actions Component
 * Notifications, search, settings icons
 */
const HeaderActions = () => {
  return (
    <View style={styles.headerActions}>
      <TouchableOpacity style={styles.headerButton}>
        <Text style={styles.headerButtonIcon}>🔍</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton}>
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>3</Text>
        </View>
        <Text style={styles.headerButtonIcon}>🔔</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton}>
        <Text style={styles.headerButtonIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Root Navigator
 * Handles authentication flow
 */
const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={LoginPage} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#1e40af',
    padding: 20,
    paddingTop: 50,
    marginBottom: 8,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoSubtext: {
    fontSize: 14,
    color: '#bfdbfe',
    marginTop: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 13,
    color: '#bfdbfe',
  },
  progressIndicator: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: '#bfdbfe',
  },
  menuSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: '#eff6ff',
    borderLeftColor: '#1e40af',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#1e40af',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  logoutText: {
    fontSize: 15,
    color: '#ef4444',
    fontWeight: '500',
  },
  drawerFooter: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  headerButton: {
    marginLeft: 16,
    position: 'relative',
  },
  headerButtonIcon: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default AppNavigator;
