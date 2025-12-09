// Progress Screen - Mobile version of ProgressDashboard
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAuth } from '../auth/AuthContext';

const { width } = Dimensions.get('window');

interface ProgressItem {
  category: string;
  completed: number;
  total: number;
  percentage: number;
  color: string;
}

const PROGRESS_DATA: ProgressItem[] = [
  {
    category: 'Cardiology',
    completed: 8,
    total: 10,
    percentage: 80,
    color: '#ef4444',
  },
  {
    category: 'Respiratory',
    completed: 6,
    total: 8,
    percentage: 75,
    color: '#3b82f6',
  },
  {
    category: 'Trauma',
    completed: 7,
    total: 12,
    percentage: 58,
    color: '#f59e0b',
  },
  {
    category: 'Pharmacology',
    completed: 5,
    total: 15,
    percentage: 33,
    color: '#10b981',
  },
];

const ProgressScreen = () => {
  const { user } = useAuth();

  const totalCompleted = PROGRESS_DATA.reduce((sum, item) => sum + item.completed, 0);
  const totalQuizzes = PROGRESS_DATA.reduce((sum, item) => sum + item.total, 0);
  const overallProgress = Math.round((totalCompleted / totalQuizzes) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learning Progress</Text>
          <Text style={styles.subtitle}>Track your EMT education journey</Text>
        </View>

        {/* Overall Progress Card */}
        <View style={styles.overallCard}>
          <Text style={styles.overallTitle}>Overall Progress</Text>
          <View style={styles.overallProgressContainer}>
            <Text style={styles.overallPercentage}>{overallProgress}%</Text>
            <View style={styles.overallProgressBar}>
              <View 
                style={[
                  styles.overallProgressFill, 
                  { width: `${overallProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.overallStats}>
              {totalCompleted} of {totalQuizzes} quizzes completed
            </Text>
          </View>
        </View>

        {/* Category Progress */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Progress by Category</Text>
          {PROGRESS_DATA.map((item, index) => (
            <ProgressCard key={index} item={item} />
          ))}
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <AchievementCard
            emoji="🏆"
            title="Quiz Master"
            description="Completed 5 quizzes in a row with 80%+ scores"
            date="2 days ago"
          />
          <AchievementCard
            emoji="🎯"
            title="Perfect Score"
            description="Achieved 100% on Cardiology Quiz #3"
            date="1 week ago"
          />
          <AchievementCard
            emoji="⚡"
            title="Speed Demon"
            description="Completed quiz in under 2 minutes"
            date="2 weeks ago"
          />
        </View>

        {/* Study Streak */}
        <View style={styles.streakSection}>
          <Text style={styles.sectionTitle}>Study Streak</Text>
          <View style={styles.streakCard}>
            <Text style={styles.streakNumber}>7</Text>
            <Text style={styles.streakText}>days in a row</Text>
            <Text style={styles.streakEncouragement}>
              Keep it up! You're building great study habits.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const ProgressCard = ({ item }: { item: ProgressItem }) => {
  return (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.categoryName}>{item.category}</Text>
        <Text style={styles.progressPercentage}>{item.percentage}%</Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${item.percentage}%`, backgroundColor: item.color }
            ]} 
          />
        </View>
      </View>
      
      <Text style={styles.progressStats}>
        {item.completed} of {item.total} quizzes completed
      </Text>
    </View>
  );
};

const AchievementCard = ({ 
  emoji, 
  title, 
  description, 
  date 
}: { 
  emoji: string;
  title: string;
  description: string;
  date: string;
}) => {
  return (
    <View style={styles.achievementCard}>
      <Text style={styles.achievementEmoji}>{emoji}</Text>
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{title}</Text>
        <Text style={styles.achievementDescription}>{description}</Text>
        <Text style={styles.achievementDate}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  overallCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  overallProgressContainer: {
    alignItems: 'center',
  },
  overallPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 16,
  },
  overallProgressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#1e40af',
    borderRadius: 6,
  },
  overallStats: {
    fontSize: 14,
    color: '#6b7280',
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    fontSize: 12,
    color: '#6b7280',
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  achievementEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
    lineHeight: 18,
  },
  achievementDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  streakSection: {
    marginBottom: 24,
  },
  streakCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
  },
  streakText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 12,
  },
  streakEncouragement: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProgressScreen;