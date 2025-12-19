/**
 * EMT-B Flashcard Deck Screen
 * Interactive flashcard deck with category filtering
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getFlashcards, getCategories, Flashcard } from '../api/flashcards';
import { DrawerParamList } from '../navigation/UWorldStyleNavigator';

const FlashcardsScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [categories, setCategories] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadFlashcards();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(['All', ...cats]);
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    }
  };

  const loadFlashcards = async () => {
    setLoadingCards(true);
    try {
      const cards = await getFlashcards(selectedCategory === 'All' ? undefined : selectedCategory);
      setFlashcards(cards);
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error('Error loading flashcards:', error);
      Alert.alert('Error', 'Failed to load flashcards');
    } finally {
      setLoading(false);
      setLoadingCards(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else if (currentIndex === flashcards.length - 1) {
      // Go to locked state
      setCurrentIndex(flashcards.length);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const currentCard = flashcards[currentIndex];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading flashcards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Category Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
            dropdownIconColor="#ffffff"
          >
            {categories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} color="#ffffff" />
            ))}
          </Picker>
        </View>
      </View>

      {/* Flashcard */}
      {loadingCards ? (
        <View style={styles.cardContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : flashcards.length > 0 ? (
        currentIndex < flashcards.length ? (
          <TouchableOpacity style={styles.cardContainer} onPress={handleFlip} activeOpacity={0.9}>
            <View style={styles.card}>
              <Text style={styles.cardText}>
                {isFlipped ? currentCard.back : currentCard.front}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('Paywall')} activeOpacity={0.9}>
            <View style={[styles.card, styles.lockedCard]}>
              <Text style={styles.lockedIcon}>🔒</Text>
              <Text style={styles.cardText}>Unlock More Flashcards</Text>
              <Text style={styles.lockedSubtext}>Upgrade to access all 45 chapters</Text>
            </View>
          </TouchableOpacity>
        )
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>No flashcards available</Text>
        </View>
      )}

      {/* Controls */}
      {flashcards.length > 0 && (
        <>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.button, currentIndex === 0 && styles.buttonDisabled]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Text style={[styles.buttonText, currentIndex === 0 && styles.buttonTextDisabled]}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, currentIndex >= flashcards.length - 1 && styles.buttonDisabled]}
              onPress={handleNext}
              disabled={currentIndex >= flashcards.length - 1}
            >
              <Text style={[styles.buttonText, currentIndex >= flashcards.length - 1 && styles.buttonTextDisabled]}>
                {currentIndex === flashcards.length - 1 ? 'More' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <Text style={styles.progress}>
            {currentIndex < flashcards.length ? `Card ${currentIndex + 1} of ${flashcards.length}` : 'End of Free Content'}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Dark slate background
    padding: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectorLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  picker: {
    color: '#ffffff',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect approximation
    borderRadius: 16,
    padding: 40,
    width: '90%',
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardText: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
  },
  lockedCard: {
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderColor: 'rgba(128, 128, 128, 0.2)',
  },
  lockedIcon: {
    fontSize: 48,
    color: '#fbbf24',
    marginBottom: 10,
  },
  lockedSubtext: {
    fontSize: 16,
    color: '#e2e8f0',
    marginTop: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4f46e5', // Indigo accent
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(79, 70, 229, 0.5)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  progress: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default FlashcardsScreen;
