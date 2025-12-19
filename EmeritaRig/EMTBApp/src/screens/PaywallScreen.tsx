import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const PaywallScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>INVEST IN YOUR CAREER</Text>
        <Text style={styles.subhead}>Unlock the Grandmaster Suite.</Text>

        {/* Value Stack */}
        <View style={styles.valueStack}>
          <View style={styles.valueItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.valueText}>Unlimited NREMT Adaptive Simulator</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.valueText}>1,500+ Protocol-Based Flashcards (All 45 Chapters)</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.valueText}>26 High-Fidelity Clinical Scenarios</Text>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.valueText}>Digital Drug Reference & Tools</Text>
          </View>
        </View>

        {/* Pricing Block */}
        <View style={styles.pricingBlock}>
          <Text style={styles.strikethrough}>$247.00</Text>
          <Text style={styles.price}>$173.00</Text>
          <Text style={styles.launchSpecial}>(Launch Special)</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Lifetime Access</Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Unlock Now</Text>
        </TouchableOpacity>

        {/* Trust */}
        <Text style={styles.trust}>14-Day Money-Back Guarantee.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark Slate
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24', // Gold
    textAlign: 'center',
    marginBottom: 10,
  },
  subhead: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 30,
  },
  valueStack: {
    width: '100%',
    marginBottom: 40,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkmark: {
    fontSize: 20,
    color: '#10b981', // Green
    marginRight: 15,
  },
  valueText: {
    fontSize: 16,
    color: '#e2e8f0',
    flex: 1,
  },
  pricingBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },
  strikethrough: {
    fontSize: 24,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fbbf24', // Gold
    marginTop: 5,
  },
  launchSpecial: {
    fontSize: 14,
    color: '#e2e8f0',
    marginTop: 5,
  },
  badge: {
    backgroundColor: '#4f46e5', // Indigo
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ctaButton: {
    backgroundColor: '#fbbf24', // Gold
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  ctaText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trust: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default PaywallScreen;