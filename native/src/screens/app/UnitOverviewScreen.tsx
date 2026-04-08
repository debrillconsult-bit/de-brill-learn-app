import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Button } from '../../components/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const lessons = [
  { type: 'warmup', title: 'Warm-Up Activity', icon: 'sunny-outline' as const },
  { type: 'words', title: 'Key Words', icon: 'text-outline' as const },
  { type: 'story', title: 'Story Time', icon: 'book-outline' as const },
  { type: 'practice', title: 'Pronunciation Practice', icon: 'mic-outline' as const },
  { type: 'quiz', title: 'Unit Quiz', icon: 'help-circle-outline' as const },
  { type: 'completion', title: 'Unit Complete!', icon: 'trophy-outline' as const },
];

const objectives = [
  'Identify and produce the target sounds',
  'Blend sounds to form new words',
  'Read words aloud with correct pronunciation',
  'Apply sounds in short sentences',
];

export const UnitOverviewScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { book, term, unitIndex, unitTitle } = route.params || {};

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title={`Unit ${(unitIndex ?? 0) + 1}`} showBack />
      <ScrollView>
        {/* Book header */}
        <View style={[styles.bookHeader, { backgroundColor: book?.coverColor || Colors.primary }]}>
          <Text style={styles.bookName}>{book?.shortTitle || 'Book'}</Text>
          <Text style={styles.unitTitle}>{unitTitle || 'Unit'}</Text>
          <Text style={styles.termLabel}>Term {term || 1}</Text>
        </View>

        <View style={styles.body}>
          {/* Objectives */}
          <Text style={styles.sectionTitle}>Learning Objectives</Text>
          {objectives.map((obj, i) => (
            <View key={i} style={styles.objRow}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
              <Text style={styles.objText}>{obj}</Text>
            </View>
          ))}

          {/* Lessons */}
          <Text style={styles.sectionTitle}>Lessons in this Unit</Text>
          {lessons.map((lesson, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.lessonRow, Shadow.sm]}
              onPress={() =>
                navigation.navigate('Lesson', {
                  book,
                  term,
                  unitIndex,
                  unitTitle,
                  lessonType: lesson.type,
                  lessonIndex: i,
                  totalLessons: lessons.length,
                })
              }
            >
              <View style={styles.lessonIcon}>
                <Ionicons name={lesson.icon} size={20} color={Colors.primary} />
              </View>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Ionicons name="lock-closed-outline" size={16} color={Colors.border} />
            </TouchableOpacity>
          ))}

          <Button
            title="Start Unit"
            onPress={() =>
              navigation.navigate('Lesson', {
                book,
                term,
                unitIndex,
                unitTitle,
                lessonType: 'warmup',
                lessonIndex: 0,
                totalLessons: lessons.length,
              })
            }
            fullWidth
            style={styles.startBtn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  bookHeader: { padding: Spacing.xl, paddingTop: Spacing.base },
  bookName: { color: 'rgba(255,255,255,0.7)', fontSize: Typography.sizes.sm, marginBottom: 4 },
  unitTitle: { color: Colors.white, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.extrabold, marginBottom: 4 },
  termLabel: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.sm },
  body: { padding: Spacing.base },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: Spacing.sm, marginTop: Spacing.base },
  objRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: Spacing.sm },
  objText: { flex: 1, fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 20 },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.base, marginBottom: Spacing.sm },
  lessonIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { flex: 1, fontSize: Typography.sizes.base, color: Colors.dark },
  startBtn: { marginTop: Spacing.lg },
});
