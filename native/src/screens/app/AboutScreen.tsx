import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing } from '../../constants/theme';

export const AboutScreen = () => (
  <SafeAreaView style={styles.safe} edges={['bottom']}>
    <DiagonalHeader title="About" showBack />
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.logoSection}>
        <Image source={require('../../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.appName}>De-Brill Learn</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.tagline}>Speak Clearly. Read Confidently.</Text>
      </View>

      <Text style={styles.sectionTitle}>About the App</Text>
      <Text style={styles.body}>
        De-Brill Learn is the official learning companion for De-Brill Consults' series of English pronunciation and phonics books. Designed for learners from Pre-Nursery through Primary 5, the app brings the classroom to your fingertips.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.body}>
        We believe every child deserves to speak clearly and read confidently. Our curriculum-aligned digital platform makes world-class pronunciation education accessible to schools and families across Africa and beyond.
      </Text>

      <Text style={styles.sectionTitle}>The Books</Text>
      <Text style={styles.body}>
        Our platform includes 8 books across two series:{'\n'}
        • Blended Phonics (Pre-Nursery to Nursery 2){'\n'}
        • Mastering English Pronunciation (Primary 1–5){'\n\n'}
        Each book is organised into 3 terms with multiple units covering sounds, blending, reading, and oral practice.
      </Text>

      <View style={styles.publisherCard}>
        <Text style={styles.publisherTitle}>Publisher</Text>
        <Text style={styles.publisherName}>De-Brill Consults Ltd</Text>
        <Text style={styles.publisherDetail}>Lagos, Nigeria</Text>
        <Text style={styles.publisherDetail}>support@debrillconsults.com</Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.xl },
  logoSection: { alignItems: 'center', marginBottom: Spacing['2xl'] },
  logo: { width: 100, height: 100, marginBottom: Spacing.md },
  appName: { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.extrabold, color: Colors.primary },
  version: { fontSize: Typography.sizes.sm, color: Colors.muted, marginVertical: 4 },
  tagline: { fontSize: Typography.sizes.base, color: Colors.orange, fontWeight: Typography.weights.medium },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: Spacing.sm, marginTop: Spacing.lg },
  body: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 24 },
  publisherCard: { backgroundColor: Colors.lightBlue, borderRadius: 12, padding: Spacing.lg, marginTop: Spacing.xl, alignItems: 'center' },
  publisherTitle: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold, color: Colors.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: Spacing.sm },
  publisherName: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold, color: Colors.primary },
  publisherDetail: { fontSize: Typography.sizes.sm, color: Colors.primary, marginTop: 2 },
});
