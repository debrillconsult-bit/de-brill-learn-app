import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { useAuth } from '../../context/AuthContext';
import { getUserProgress } from '../../lib/auth';
import { BOOKS } from '../../constants/books';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

export const ProgressScreen = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getUserProgress(user.id).then(setProgress);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="My Progress" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Streak */}
        <View style={[styles.streakCard, Shadow.md]}>
          <Ionicons name="flame" size={36} color={Colors.orange} />
          <View style={styles.streakText}>
            <Text style={styles.streakValue}>0</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
          <Text style={styles.streakMsg}>Start your streak today!</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Units Completed', value: '0', icon: 'checkmark-done-outline' as const },
            { label: 'Lessons Done', value: '0', icon: 'book-outline' as const },
            { label: 'Avg. Accuracy', value: '—', icon: 'analytics-outline' as const },
          ].map((s, i) => (
            <View key={i} style={[styles.statCard, Shadow.sm]}>
              <Ionicons name={s.icon} size={20} color={Colors.skyBlue} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Books progress */}
        <Text style={styles.sectionTitle}>Books Progress</Text>
        {BOOKS.map(book => (
          <View key={book.id} style={[styles.bookRow, Shadow.sm]}>
            <View style={[styles.bookAccent, { backgroundColor: book.coverColor }]} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.shortTitle}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: '0%', backgroundColor: book.coverColor }]} />
              </View>
              <Text style={styles.barLabel}>0 / {book.unitCount} units</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.base },
  streakCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: Spacing.base,
  },
  streakText: { flex: 1 },
  streakValue: { fontSize: Typography.sizes['3xl'], fontWeight: Typography.weights.extrabold, color: Colors.dark },
  streakLabel: { fontSize: Typography.sizes.sm, color: Colors.muted },
  streakMsg: { fontSize: Typography.sizes.xs, color: Colors.muted, textAlign: 'right', maxWidth: 80 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.base },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm, alignItems: 'center' },
  statValue: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginVertical: 2 },
  statLabel: { fontSize: Typography.sizes.xs, color: Colors.muted, textAlign: 'center' },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.dark, marginBottom: Spacing.sm },
  bookRow: { backgroundColor: Colors.white, borderRadius: Radius.md, flexDirection: 'row', marginBottom: Spacing.sm, overflow: 'hidden' },
  bookAccent: { width: 5 },
  bookInfo: { flex: 1, padding: Spacing.sm },
  bookTitle: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semibold, color: Colors.dark, marginBottom: 6 },
  barBg: { height: 5, backgroundColor: Colors.border, borderRadius: 3, marginBottom: 4 },
  barFill: { height: 5, borderRadius: 3 },
  barLabel: { fontSize: Typography.sizes.xs, color: Colors.muted },
});
