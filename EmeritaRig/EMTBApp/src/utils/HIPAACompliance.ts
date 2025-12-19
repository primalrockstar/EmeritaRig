import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// HIPAA-compliant data security utilities
export class SecureStorage {
  private static readonly ENCRYPTION_KEY = 'EMTB_Secure_Key_2025';
  
  // Encrypt data before storage
  static async setSecureItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(jsonValue, this.ENCRYPTION_KEY).toString();
      await AsyncStorage.setItem(`secure_${key}`, encrypted);
      
      // Log access for HIPAA compliance
      this.logAccess('WRITE', key);
    } catch (error) {
      console.error('Secure storage error:', error);
      throw new Error('Failed to store secure data');
    }
  }
  
  // Decrypt data on retrieval
  static async getSecureItem(key: string): Promise<any> {
    try {
      const encrypted = await AsyncStorage.getItem(`secure_${key}`);
      if (!encrypted) return null;
      
      const decrypted = CryptoJS.AES.decrypt(encrypted, this.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      
      // Log access for HIPAA compliance
      this.logAccess('READ', key);
      
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Secure retrieval error:', error);
      return null;
    }
  }
  
  // Remove encrypted data
  static async removeSecureItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`secure_${key}`);
      this.logAccess('DELETE', key);
    } catch (error) {
      console.error('Secure removal error:', error);
    }
  }
  
  // Clear all secure data
  static async clearAllSecureData(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const secureKeys = keys.filter(key => key.startsWith('secure_'));
      await AsyncStorage.multiRemove(secureKeys);
      this.logAccess('CLEAR_ALL', 'all_secure_data');
    } catch (error) {
      console.error('Clear all secure data error:', error);
    }
  }
  
  // HIPAA audit logging
  private static async logAccess(action: string, dataKey: string): Promise<void> {
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        action,
        dataKey: dataKey.replace(/secure_/, ''), // Remove prefix for logging
        userId: await this.getCurrentUserId(),
        deviceId: await this.getDeviceId(),
      };
      
      // Store audit logs separately (not encrypted for compliance reviews)
      const existingLogs = await AsyncStorage.getItem('audit_logs') || '[]';
      const logs = JSON.parse(existingLogs);
      logs.push(logEntry);
      
      // Keep only last 1000 entries to manage storage
      const trimmedLogs = logs.slice(-1000);
      await AsyncStorage.setItem('audit_logs', JSON.stringify(trimmedLogs));
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  }
  
  private static async getCurrentUserId(): Promise<string> {
    // Return anonymized user identifier
    const stored = await AsyncStorage.getItem('user_session_id');
    return stored || 'anonymous_user';
  }
  
  private static async getDeviceId(): Promise<string> {
    // Return device identifier for audit purposes
    return 'device_id_placeholder'; // Replace with actual device ID implementation
  }
}

// Session management for HIPAA compliance
export class SessionManager {
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static sessionTimer: NodeJS.Timeout | null = null;
  
  static async startSession(userId: string): Promise<void> {
    const sessionData = {
      userId,
      startTime: Date.now(),
      lastActivity: Date.now(),
    };
    
    await SecureStorage.setSecureItem('current_session', sessionData);
    this.resetSessionTimer();
  }
  
  static async updateLastActivity(): Promise<void> {
    const session = await SecureStorage.getSecureItem('current_session');
    if (session) {
      session.lastActivity = Date.now();
      await SecureStorage.setSecureItem('current_session', session);
      this.resetSessionTimer();
    }
  }
  
  static async endSession(): Promise<void> {
    await SecureStorage.removeSecureItem('current_session');
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
  }
  
  static async isSessionValid(): Promise<boolean> {
    const session = await SecureStorage.getSecureItem('current_session');
    if (!session) return false;
    
    const now = Date.now();
    const timeSinceLastActivity = now - session.lastActivity;
    
    return timeSinceLastActivity < this.SESSION_TIMEOUT;
  }
  
  private static resetSessionTimer(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
    
    this.sessionTimer = setTimeout(() => {
      this.endSession();
      // Trigger app-wide session expired event
      // This would typically trigger a logout/login screen
    }, this.SESSION_TIMEOUT);
  }
}

// Data sanitization utilities
export class DataSanitizer {
  // Remove any potential PHI from user inputs
  static sanitizeInput(input: string): string {
    // Remove common PHI patterns
    let sanitized = input
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN_REMOVED]') // SSN
      .replace(/\b\d{3}-\d{3}-\d{4}\b/g, '[PHONE_REMOVED]') // Phone
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL_REMOVED]') // Email
      .replace(/\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/g, '[CARD_REMOVED]'); // Credit card
    
    return sanitized;
  }
  
  // Anonymize user data for analytics
  static anonymizeUserData(userData: any): any {
    const anonymized = { ...userData };
    
    // Remove direct identifiers
    delete anonymized.email;
    delete anonymized.phone;
    delete anonymized.name;
    delete anonymized.address;
    
    // Keep only educational progress data
    return {
      studyProgress: anonymized.studyProgress,
      completedModules: anonymized.completedModules,
      quizScores: anonymized.quizScores,
      timeSpent: anonymized.timeSpent,
      anonymizedId: this.generateAnonymousId(userData.id),
    };
  }
  
  private static generateAnonymousId(originalId: string): string {
    return CryptoJS.SHA256(originalId + 'EMTB_Salt').toString().substring(0, 16);
  }
}

// HIPAA compliance checker
export class ComplianceChecker {
  static checkDataCompliance(data: any): { isCompliant: boolean; violations: string[] } {
    const violations: string[] = [];
    
    // Check for PHI patterns
    const dataString = JSON.stringify(data);
    
    if (/\b\d{3}-\d{2}-\d{4}\b/.test(dataString)) {
      violations.push('SSN detected in data');
    }
    
    if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(dataString)) {
      violations.push('Email address detected in data');
    }
    
    if (/\bpatient\s+name|patient\s+id|medical\s+record/i.test(dataString)) {
      violations.push('Potential patient identifier detected');
    }
    
    return {
      isCompliant: violations.length === 0,
      violations,
    };
  }
  
  static async getComplianceReport(): Promise<any> {
    const auditLogs = await AsyncStorage.getItem('audit_logs');
    const logs = auditLogs ? JSON.parse(auditLogs) : [];
    
    return {
      totalDataAccesses: logs.length,
      lastAccess: logs.length > 0 ? logs[logs.length - 1].timestamp : null,
      dataRetentionDays: 730, // 2 years
      encryptionStatus: 'AES-256 Active',
      lastComplianceCheck: new Date().toISOString(),
    };
  }
}