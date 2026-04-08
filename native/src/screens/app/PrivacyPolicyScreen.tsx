import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing } from '../../constants/theme';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect your name, email address, and learning progress data when you create an account. Voice recordings made during pronunciation practice are processed locally and not permanently stored without your consent.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your data is used solely to provide and improve the De-Brill Learn service, personalise your learning experience, and send relevant notifications.',
  },
  {
    title: "3. Children's Privacy (COPPA & NDPR)",
    body: 'De-Brill Learn serves users including children under 13. We collect only the minimum necessary data. Parents may request deletion of their child\'s data at any time by contacting privacy@debrillconsults.com.',
  },
  {
    title: '4. Data Sharing',
    body: 'We do not sell or rent your personal information to third parties. We may share anonymised, aggregated data for research purposes.',
  },
  {
    title: '5. Data Security',
    body: "All data is encrypted in transit (TLS) and at rest. We use Supabase's secure infrastructure hosted on AWS.",
  },
  {
    title: '6. Your Rights',
    body: 'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@debrillconsults.com to exercise these rights.',
  },
  {
    title: '7. Changes to This Policy',
    body: 'We may update this policy periodically. Significant changes will be communicated in-app. Continued use after changes constitutes acceptance.',
  },
  {
    title: '8. Contact Us',
    body: 'De-Brill Consults Ltd\nLagos, Nigeria\nprivacy@debrillconsults.com',
  },
];

export const PrivacyPolicyScreen = () => (
  <SafeAreaView style={styles.safe} edges={['bottom']}>
    <DiagonalHeader title="Privacy Policy" showBack />
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.lastUpdated}>Last updated: April 2026</Text>
      {sections.map((s, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>{s.title}</Text>
          <Text style={styles.body}>{s.body}</Text>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.xl },
  lastUpdated: { fontSize: Typography.sizes.xs, color: Colors.muted, marginBottom: Spacing.lg },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: Spacing.sm },
  body: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 24 },
});
