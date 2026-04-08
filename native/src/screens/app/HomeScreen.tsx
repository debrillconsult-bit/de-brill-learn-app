import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const firstName = user?.nickname || user?.full_name?.split(' ')[0] || 'Learner';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={[Colors.primary, '#0F2456']} style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.name}>{firstName} 👋</Text>
            </View>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Continue Lesson Card */}
          <View style={[styles.continueCard, Shadow.md]}>
            <LinearGradient colors={[Colors.orange, '#E06010']} style={styles.continueBg} />
            <View style={styles.continueContent}>
              <Text style={styles.continueLabel}>CONTINUE WHERE YOU LEFT OFF</Text>
              <Text style={styles.continueTitle}>Unit 1 — Introduction to Sounds</Text>
              <Text style={styles.continueBook}>MEP Primary 1</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '35%' }]} />
              </View>
              <Text style={styles.progressText}>35% complete</Text>
            </View>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('LibraryTab')}
            >
              <Ionicons name="play" size={20} color={Colors.orange} />
            </TouchableOpacity>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Units Done', value: '0', icon: 'checkmark-circle-outline' as const },
              { label: 'Current Term', value: 'Term 1', icon: 'calendar-outline' as const },
              { label: 'Accuracy', value: '—', icon: 'trending-up-outline' as const },
            ].map((stat, i) => (
              <View key={i} style={[styles.statCard, Shadow.sm]}>
                <Ionicons name={stat.icon} size={20} color={Colors.orange} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Coach Brill Card */}
          <TouchableOpacity
            style={[styles.coachCard, Shadow.sm]}
            onPress={() => navigation.navigate('AICoach')}
            activeOpacity={0.85}
          >
            <View style={styles.coachHeader}>
              <View style={styles.coachIconCircle}>
                <Ionicons name="sparkles" size={18} color={Colors.orange} />
              </View>
              <Text style={styles.coachLabel}>COACH BRILL SAYS</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.muted} />
            </View>
            <Text style={styles.coachTip}>
              "Consistent daily practice is the fastest path to clear pronunciation. Even 10 minutes a day makes a big difference!"
            </Text>
          </TouchableOpacity>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {[
              { label: 'Library', icon: 'book-outline' as const, screen: 'LibraryTab', tab: true },
              { label: 'Sound Chart', icon: 'volume-high-outline' as const, screen: 'SoundsTab', tab: true },
              { label: 'AI Coach', icon: 'chatbubble-ellipses-outline' as const, screen: 'AICoach', tab: false },
              { label: 'My Progress', icon: 'bar-chart-outline' as const, screen: 'Progress', tab: false },
            ].map((action, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.actionCard, Shadow.sm]}
                onPress={() => navigation.navigate(action.screen)}
                activeOpacity={0.8}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={22} color={Colors.primary} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  header: { padding: Spacing.xl, paddingBottom: Spacing['2xl'] },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.sizes.sm },
  name: { color: Colors.white, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.extrabold },
  logo: { width: 48, height: 48 },
  body: { padding: Spacing.base, marginTop: -16 },
  continueCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
  },
  continueBg: { ...StyleSheet.absoluteFillObject },
  continueContent: { flex: 1 },
  continueLabel: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, letterSpacing: 0.5, marginBottom: 4 },
  continueTitle: { color: Colors.white, fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, marginBottom: 2 },
  continueBook: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.sm, marginBottom: 8 },
  progressBarBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, marginBottom: 4 },
  progressBarFill: { height: 4, backgroundColor: Colors.white, borderRadius: 2 },
  progressText: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.xs },
  continueBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.base },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  statValue: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginVertical: 2 },
  statLabel: { fontSize: Typography.sizes.xs, color: Colors.muted, textAlign: 'center' },
  coachCard: {
    backgroundColor: Colors.lightOrange,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: '#FDDCB8',
  },
  coachHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  coachIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coachLabel: { flex: 1, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold, color: Colors.orange, letterSpacing: 0.5 },
  coachTip: { fontSize: Typography.sizes.sm, color: Colors.dark, lineHeight: 20, fontStyle: 'italic' },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.dark, marginBottom: Spacing.sm },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing.xl },
  actionCard: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionLabel: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.dark },
});
