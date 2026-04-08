import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const dataItems = [
  'Name and email address for account creation',
  'Learning progress and quiz results',
  'Device identifiers for session management',
  'Voice recordings (only during pronunciation practice)',
];

export const PrivacySecurityScreen = () => (
  <SafeAreaView style={styles.safe} edges={['bottom']}>
    <DiagonalHeader title="Privacy & Security" showBack />
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={[styles.safetyCard, Shadow.sm]}>
        <View style={styles.safetyHeader}>
          <Ionicons name="shield-checkmark" size={28} color={Colors.success} />
          <Text style={styles.safetyTitle}>Your data is safe</Text>
        </View>
        <Text style={styles.safetyBody}>
          De-Brill Learn uses industry-standard encryption and is hosted on secure Supabase infrastructure. We never sell your data.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>What we collect</Text>
      {dataItems.map((item, i) => (
        <View key={i} style={styles.listItem}>
          <Ionicons name="checkmark-circle-outline" size={18} color={Colors.success} />
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Children's privacy</Text>
      <Text style={styles.body}>
        We comply with COPPA and Nigeria's NDPR. For users under 13, a parent or guardian must create and manage the account. We collect only the minimum data necessary to provide the service.
      </Text>

      <View style={[styles.contactCard, Shadow.sm]}>
        <Ionicons name="mail-outline" size={20} color={Colors.primary} />
        <Text style={styles.contactText}>privacy@debrillconsults.com</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.base },
  safetyCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg },
  safetyHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: Spacing.sm },
  safetyTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.dark },
  safetyBody: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 22 },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: Spacing.sm, marginTop: Spacing.lg },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: Spacing.sm },
  listText: { flex: 1, fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 20 },
  body: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 22 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.lightBlue, borderRadius: Radius.lg, padding: Spacing.base, marginTop: Spacing.xl },
  contactText: { fontSize: Typography.sizes.base, color: Colors.primary, fontWeight: Typography.weights.medium },
});
