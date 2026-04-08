import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing } from '../../constants/theme';

export const NotificationsScreen = () => (
  <SafeAreaView style={styles.safe} edges={['bottom']}>
    <DiagonalHeader title="Notifications" showBack />
    <View style={styles.empty}>
      <Ionicons name="notifications-outline" size={64} color={Colors.border} />
      <Text style={styles.title}>No notifications yet</Text>
      <Text style={styles.body}>
        We'll notify you about your learning progress, daily practice reminders, and app updates here.
      </Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing['2xl'] },
  title: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.dark, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  body: { fontSize: Typography.sizes.base, color: Colors.muted, textAlign: 'center', lineHeight: 22 },
});
