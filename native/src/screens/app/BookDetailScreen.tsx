import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Button } from '../../components/Button';
import { Book } from '../../constants/books';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const SAMPLE_UNITS = [
  'Introduction to Sounds',
  'Vowel Sounds',
  'Consonant Sounds',
  'Blending Words',
  'Reading Sentences',
];

export const BookDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const book: Book = route.params?.book;
  const [expandedTerm, setExpandedTerm] = useState<number | null>(1);

  if (!book) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title={book.shortTitle} showBack />
      <ScrollView>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: book.coverColor }]}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{book.title}</Text>
            <Text style={styles.heroAge}>{book.ageRange} · {book.termCount} Terms · {book.unitCount} Units</Text>
          </View>
          <View style={styles.heroCover}>
            <Text style={styles.heroCoverText}>
              {book.shortTitle.split(' ').map(w => w[0]).join('').slice(0, 3)}
            </Text>
          </View>
        </View>

        {/* Overall progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: '0%', backgroundColor: book.accentColor }]} />
          </View>
          <Text style={styles.progressPct}>0%</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.description}>{book.description}</Text>

          {/* Terms accordion */}
          {Array.from({ length: book.termCount }, (_, i) => i + 1).map(term => (
            <View key={term} style={[styles.termCard, Shadow.sm]}>
              <TouchableOpacity
                style={styles.termHeader}
                onPress={() => setExpandedTerm(expandedTerm === term ? null : term)}
              >
                <View style={[styles.termBadge, { backgroundColor: book.coverColor }]}>
                  <Text style={styles.termBadgeText}>T{term}</Text>
                </View>
                <Text style={styles.termTitle}>Term {term}</Text>
                <Ionicons
                  name={expandedTerm === term ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.muted}
                />
              </TouchableOpacity>

              {expandedTerm === term && (
                <View style={styles.unitList}>
                  {SAMPLE_UNITS.map((unit, ui) => (
                    <TouchableOpacity
                      key={ui}
                      style={styles.unitRow}
                      onPress={() =>
                        navigation.navigate('UnitOverview', {
                          book,
                          term,
                          unitIndex: ui,
                          unitTitle: unit,
                        })
                      }
                    >
                      <View style={styles.unitNumber}>
                        <Text style={styles.unitNumberText}>{ui + 1}</Text>
                      </View>
                      <Text style={styles.unitTitle}>{unit}</Text>
                      <Ionicons name="lock-closed-outline" size={16} color={Colors.border} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          <Button
            title="Start from Beginning"
            onPress={() =>
              navigation.navigate('UnitOverview', {
                book,
                term: 1,
                unitIndex: 0,
                unitTitle: 'Introduction to Sounds',
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
  hero: { padding: Spacing.xl, flexDirection: 'row', alignItems: 'center', minHeight: 120 },
  heroContent: { flex: 1 },
  heroTitle: { color: Colors.white, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold, marginBottom: 4 },
  heroAge: { color: 'rgba(255,255,255,0.8)', fontSize: Typography.sizes.sm },
  heroCover: {
    width: 70,
    height: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  heroCoverText: { color: Colors.white, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold },
  progressSection: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, backgroundColor: Colors.white, gap: 10 },
  progressLabel: { fontSize: Typography.sizes.sm, color: Colors.muted, width: 100 },
  progressBg: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  progressPct: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.dark, width: 36, textAlign: 'right' },
  body: { padding: Spacing.base },
  description: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 22, marginBottom: Spacing.lg },
  termCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden' },
  termHeader: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: 12 },
  termBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  termBadgeText: { color: Colors.white, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold },
  termTitle: { flex: 1, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.dark },
  unitList: { borderTopWidth: 1, borderTopColor: Colors.border },
  unitRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: 12, borderBottomWidth: 1, borderBottomColor: Colors.offWhite },
  unitNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  unitNumberText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.primary },
  unitTitle: { flex: 1, fontSize: Typography.sizes.sm, color: Colors.dark },
  startBtn: { marginTop: Spacing.lg },
});
