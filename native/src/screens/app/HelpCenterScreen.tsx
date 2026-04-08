import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const FAQS = [
  {
    q: 'How do I start a lesson?',
    a: 'Go to the Library tab, choose a book, select a term, and tap on any unit to begin your lesson.',
  },
  {
    q: 'What is the Sound Chart?',
    a: 'The Sound Chart displays all 44 phonemes of English. Tap any card to hear the example word spoken aloud.',
  },
  {
    q: 'How does Coach Brill work?',
    a: 'Coach Brill is an AI assistant trained to help you with English pronunciation. Ask any question or practice sounds together.',
  },
  {
    q: 'Can I switch between British and American English?',
    a: 'Yes! Go to Profile → Settings and toggle your preferred accent under Preferences.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Go to Profile → Settings → Change Password and follow the link sent to your registered email.',
  },
  {
    q: 'Is De-Brill Learn suitable for very young children?',
    a: 'Yes! The Blended Phonics series is designed for children from ages 2–5, with guided support from a parent or teacher.',
  },
];

export const HelpCenterScreen = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (i: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === i ? null : i);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Help Center" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <View key={i} style={[styles.faqCard, Shadow.sm]}>
            <TouchableOpacity style={styles.faqRow} onPress={() => toggle(i)}>
              <Text style={styles.question}>{faq.q}</Text>
              <Ionicons name={expanded === i ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.muted} />
            </TouchableOpacity>
            {expanded === i && (
              <View style={styles.answerBox}>
                <Text style={styles.answer}>{faq.a}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={[styles.contactCard, Shadow.sm]}>
          <Ionicons name="mail-outline" size={28} color={Colors.primary} style={styles.contactIcon} />
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactBody}>Email us at support@debrillconsults.com and we'll get back to you within 24 hours.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.base },
  heading: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: Spacing.base },
  faqCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.sm, overflow: 'hidden' },
  faqRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: 12 },
  question: { flex: 1, fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.dark },
  answerBox: { padding: Spacing.base, paddingTop: 0, borderTopWidth: 1, borderTopColor: Colors.offWhite },
  answer: { fontSize: Typography.sizes.sm, color: Colors.muted, lineHeight: 20 },
  contactCard: { backgroundColor: Colors.lightBlue, borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginTop: Spacing.base },
  contactIcon: { marginBottom: Spacing.sm },
  contactTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.primary, marginBottom: 4 },
  contactBody: { fontSize: Typography.sizes.sm, color: Colors.primary, textAlign: 'center', lineHeight: 20 },
});
