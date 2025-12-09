import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

// In a real app, this key should be derived from a user secret or fetched securely.
// For this implementation, we'll use a generated device-specific key stored in Keychain.
const ENCRYPTION_KEY_ALIAS = 'EMTB_DATA_KEY';

/**
 * Initialize the encryption key if it doesn't exist.
 * Stores a random key in the secure Keychain.
 */
const getEncryptionKey = async (): Promise<string> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: ENCRYPTION_KEY_ALIAS });
    if (credentials) {
      return credentials.password;
    } else {
      // Generate a new random key
      const newKey = CryptoJS.lib.WordArray.random(32).toString();
      await Keychain.setGenericPassword('data_key', newKey, { service: ENCRYPTION_KEY_ALIAS });
      return newKey;
    }
  } catch (error) {
    console.error('Error accessing keychain:', error);
    // Fallback (less secure but prevents crash)
    return 'fallback-static-key-change-in-production';
  }
};

/**
 * Securely store a string value (like a token)
 */
export const storeSecureItem = async (key: string, value: string): Promise<void> => {
  await Keychain.setGenericPassword(key, value, { service: key });
};

/**
 * Retrieve a securely stored string value
 */
export const getSecureItem = async (key: string): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key });
    return credentials ? credentials.password : null;
  } catch (error) {
    return null;
  }
};

/**
 * Remove a securely stored item
 */
export const removeSecureItem = async (key: string): Promise<void> => {
  await Keychain.resetGenericPassword({ service: key });
};

/**
 * Encrypt and store large data in AsyncStorage
 */
export const storeEncryptedData = async (key: string, data: any): Promise<void> => {
  try {
    const encryptionKey = await getEncryptionKey();
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();
    await AsyncStorage.setItem(key, encrypted);
  } catch (error) {
    console.error('Error storing encrypted data:', error);
    throw error;
  }
};

/**
 * Retrieve and decrypt large data from AsyncStorage
 */
export const getEncryptedData = async <T>(key: string): Promise<T | null> => {
  try {
    const encrypted = await AsyncStorage.getItem(key);
    if (!encrypted) return null;

    const encryptionKey = await getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encrypted, encryptionKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) return null;
    
    return JSON.parse(decrypted) as T;
  } catch (error) {
    console.error('Error retrieving encrypted data:', error);
    return null;
  }
};
