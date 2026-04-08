import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Button } from '../../components/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const lessonTitles: Record<string, string> = {
  warmup: 'Warm-Up',
  words: 'Key Words',
  story: 'Story Time',
  practice: 'Practice',
  quiz: 'Quiz',
  completion: 'Complete!',
};

const lessonIcons: Record<string, any> = {
  warmup: 'sunny-outline',
  words: 'text-outline',
  story: 'book-outline',
  practice: 'mic-outline',
  quiz: 'help-circle-outline',
  completion: 'trophy-outline',
};

export const LessonScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { book, term, unitIndex, unitTitle, lessonType, lessonIndex, totalLessons } = route.params || {};

  const isCompletion = lessonType === 'completion';
  const progress = ((lessonIndex + 1) / totalLessons) * 100;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title={lessonTitles[lessonType] || 'Lesson'} showBack />

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.body}>
        {isCompletion ? (
          <View style={styles.completion}>
            <View style={styles.trophyCircle}>
              <Ionicons name="trophy" size={64} color={Colors.orange} />
            </View>
            <Text style={styles.completionTitle}>Unit Complete!</Text>
            <Text style={styles.completionSub}>
              Great work on{' '}
              <Text style={styles.boldBlue}>{unitTitle}</Text>
            </Text>
            <Text style={styles.completionMsg}>
              You've finished all {totalLessons} lessons in this unit. Keep up the excellent work!
            </Text>

            <Button
              title="Back to Unit Overview"
              onPress={() => navigation.pop(2)}
              fullWidth
              style={styles.doneBtn}
            />
            <TouchableOpacity onPress={() => navigation.popToTop()} style={styles.homeLink}>
              <Text style={styles.homeLinkText}>Go to Library</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.lessonContent}>
            <View style={styles.lessonIconCircle}>
              <Ionicons name={lessonIcons[lessonType] || 'book-outline'} size={40} color={Colors.primary} />
            </View>
            <Text style={styles.lessonType}>{lessonTitles[lessonType]}</Text>
            <Text style={styles.lessonUnit}>{unitTitle}</Text>

            <View style={[styles.placeholder, Shadow.sm]}>
              <Ionicons name="construct-outline" size={28} color={Colors.border} />
              <Text style={styles.placeholderTitle}>Content Coming Soon</Text>
              <Text style={styles.placeholderBody}>
                This lesson type ({lessonType}) will display interactive content in the next update.
              </Text>
            </View>

            <View style={styles.navRow}>
              <TouchableOpacity
                style={[styles.navBtn, lessonIndex === 0 && styles.navBtnDisabled]}
                disabled={lessonIndex === 0}
                onPress={() =>
                  navigation.replace('Lesson', {
                    ...route.params,
                    lessonIndex: lessonIndex - 1,
                    lessonType: Object.keys(lessonTitles)[lessonIndex - 1],
                  })
                }
              >
                <Ionicons name="chevron-back" size={20} color={lessonIndex === 0 ? Colors.border : Colors.primary} />
                <Text style={[styles.navText, lessonIndex === 0 && styles.navTextDisabled]}>Back</Text>
              </TouchableOpacity>

              <Button
                title={lessonIndex === totalLessons - 1 ? 'Finish' : 'Next'}
                onPress={() => {
                  const lessonKeys = Object.keys(lessonTitles);
                  navigation.replace('Lesson', {
                    ...route.params,
                    lessonIndex: lessonIndex + 1,
                    lessonType: lessonKeys[lessonIndex + 1] || 'completion',
                  });
                }}
                size="sm"
                style={styles.nextBtn}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  progressBg: { height: 4, backgroundColor: Colors.border },
  progressFill: { height: 4, backgroundColor: Colors.orange },
  body: { flex: 1, padding: Spacing.base },
  lessonContent: { flex: 1, alignItems: 'center' },
  lessonIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  lessonType: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: 4 },
  lessonUnit: { fontSize: Typography.sizes.sm, color: Colors.muted, marginBottom: Spacing.xl },
  placeholder: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  placeholderTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.dark, marginTop: Spacing.sm, marginBottom: 4 },
  placeholderBody: { fontSize: Typography.sizes.sm, color: Colors.muted, textAlign: 'center', lineHeight: 20 },
  navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 'auto', paddingTop: Spacing.lg },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  navBtnDisabled: { opacity: 0.4 },
  navText: { fontSize: Typography.sizes.base, color: Colors.primary, fontWeight: Typography.weights.medium },
  navTextDisabled: { color: Colors.border },
  nextBtn: {},
  completion: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  trophyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  completionTitle: { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: 4 },
  completionSub: { fontSize: Typography.sizes.base, color: Colors.muted, marginBottom: Spacing.sm },
  boldBlue: { color: Colors.primary, fontWeight: Typography.weights.bold },
  completionMsg: { fontSize: Typography.sizes.sm, color: Colors.muted, textAlign: 'center', lineHeight: 20, marginBottom: Spacing['2xl'], paddingHorizontal: 20 },
  doneBtn: { marginBottom: Spacing.md },
  homeLink: { paddingVertical: Spacing.sm },
  homeLinkText: { color: Colors.primary, fontSize: Typography.sizes.base, fontWeight: Typography.weights.medium },
});
