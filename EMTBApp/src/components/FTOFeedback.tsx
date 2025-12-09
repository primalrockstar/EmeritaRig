import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFTOReaction, FTOReactionType } from '../utils/fto_engine';

interface FTOFeedbackProps {
  type: FTOReactionType;
}

const FTOFeedback: React.FC<FTOFeedbackProps> = ({ type }) => {
  const reaction = getFTOReaction(type);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>👨‍🚒</Text>
      </View>
      <Text style={styles.label}>Field Training Officer</Text>
      <Text style={styles.quote}>"{reaction}"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b', // Amber/orange border
    margin: 10,
  },
  iconContainer: {
    marginBottom: 5,
  },
  icon: {
    fontSize: 30,
  },
  label: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quote: {
    color: '#ffffff',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default FTOFeedback;