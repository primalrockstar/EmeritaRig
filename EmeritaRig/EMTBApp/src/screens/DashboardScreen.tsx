import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../navigation/UWorldStyleNavigator';
import { useAuth } from '../auth/AuthContext';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const cards = [
    {
      title: 'Simulate',
      subtitle: 'NREMT Practice',
      icon: '🧠',
      gradient: ['#dc2626', '#1e40af'] as const,
      action: () => navigation.navigate('QBank'),
    },
    {
      title: 'Study',
      subtitle: 'Flashcards',
      icon: '📚',
      gradient: ['#3730a3', '#581c87'] as const,
      action: () => navigation.navigate('Flashcards'),
    },
    {
      title: 'Practice',
      subtitle: 'Clinical Cases',
      icon: '🏥',
      gradient: ['#16a34a', '#15803d'] as const,
      action: () => navigation.navigate('ClinicalCases'),
    },
    {
      title: 'Meds',
      subtitle: 'Medications',
      icon: '💊',
      gradient: ['#0891b2', '#0e7490'] as const,
      action: () => navigation.navigate('Notes'), // Assuming meds are under Notes
    },
    {
      title: 'Tools',
      subtitle: 'Calculators',
      icon: '🧮',
      gradient: ['#374151', '#1f2937'] as const,
      action: () => navigation.navigate('Calculators'),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, {user?.name || 'Medic'}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBadge}>
                <Text style={styles.statIcon}>🏆</Text>
                <Text style={styles.statText}>Elo: 1000</Text>
              </View>
              <View style={styles.statBadge}>
                <Text style={styles.statIcon}>🔥</Text>
                <Text style={styles.statText}>Streak: 1 Day</Text>
              </View>
            </View>
          </View>

          {/* Cards Grid */}
          <View style={styles.grid}>
            {cards.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={card.action}
                activeOpacity={0.8}
                accessibilityLabel={`${card.title} ${card.subtitle}`}
                accessibilityHint={`Navigate to ${card.title} screen`}
                accessibilityRole="button"
              >
                <View style={[styles.cardGradient, { backgroundColor: card.gradient[1] }]}>
                  <Text style={styles.cardIcon}>{card.icon}</Text>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Sticky Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.quickStartButton}
            onPress={() => navigation.navigate('QBank')}
            activeOpacity={0.8}
            accessibilityLabel="Resume NREMT Simulator"
            accessibilityHint="Quick start the NREMT practice exam"
            accessibilityRole="button"
          >
            <View style={[styles.buttonGradient, { backgroundColor: '#dc2626' }]}>
              <Text style={styles.buttonText}>Resume NREMT Sim</Text>
              <Text style={styles.buttonIcon}>⚡</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Space for footer
  },
  header: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  statIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  statText: {
    fontSize: 14,
    color: '#fbbf24',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: (width - 40 - 16) / 2, // 2 columns with padding
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
  },
  quickStartButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  buttonIcon: {
    fontSize: 20,
  },
});

export default DashboardScreen;