/**
 * EMT-B Medications Reference Screen
 * Searchable drug reference with glass list UI
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getMedications, Medication } from '../api/meds';
import { DrawerParamList } from '../navigation/UWorldStyleNavigator';

const MedsScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedications();
  }, [searchQuery]);

  const loadMedications = async () => {
    setLoading(true);
    try {
      const meds = await getMedications(searchQuery || undefined);
      setMedications(meds);
    } catch (error) {
      console.error('Error loading medications:', error);
      Alert.alert('Error', 'Failed to load medications');
    } finally {
      setLoading(false);
    }
  };

  const handleMedPress = (med: Medication) => {
    // Assuming navigation to MedDetailScreen with id
    navigation.navigate('MedDetail' as any, { id: med.id });
  };

  const renderMedItem = ({ item }: { item: Medication }) => (
    <TouchableOpacity style={styles.medItem} onPress={() => handleMedPress(item)} activeOpacity={0.7}>
      <View style={styles.medContent}>
        <Text style={styles.genericName}>{item.generic_name}</Text>
        {item.brand_names && <Text style={styles.brandNames}>{item.brand_names}</Text>}
        <Text style={styles.drugClass}>{item.drug_class}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Medical Disclaimer Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.disclaimerIcon}>⚠️</Text>
        <Text style={styles.disclaimerText}>Medical Disclaimer</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medications..."
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Medications List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Loading medications...</Text>
        </View>
      ) : (
        <FlatList
          data={medications}
          renderItem={renderMedItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(239, 68, 68, 0.2)',
    padding: 15,
  },
  disclaimerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  disclaimerText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 15,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
  },
  listContainer: {
    padding: 20,
  },
  medItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  medContent: {
    // Flex for layout if needed
  },
  genericName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  brandNames: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 5,
  },
  drugClass: {
    color: '#94a3b8',
    fontSize: 12,
  },
});

export default MedsScreen;