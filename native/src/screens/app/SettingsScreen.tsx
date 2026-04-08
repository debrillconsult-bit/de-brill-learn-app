import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

export const SettingsScreen = () => {
  const { user, setUser } = useAuth();
  const [language, setLanguage] = useState<'british' | 'american'>(user?.language || 'british');
  const [notifications, setNotifications] = useState(true);

  const toggleLanguage = async () => {
    const next = language === 'british' ? 'american' : 'british';
    setLanguage(next);
    if (user) {
      await supabase.from('profiles').update({ language: next }).eq('id', user.id);
      setUser({ ...user, language: next });
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Settings" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={[styles.card, Shadow.sm]}>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user?.full_name || '—'}</Text>
          </View>
          <View style={[styles.row, styles.borderTop]}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || '—'}</Text>
          </View>
          <View style={[styles.row, styles.borderTop]}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user?.role || '—'}</Text>
          </View>
          <TouchableOpacity style={[styles.row, styles.borderTop]}>
            <Text style={styles.label}>Change Password</Text>
            <Text style={styles.link}>Request link</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={[styles.card, Shadow.sm]}>
          <View style={styles.row}>
            <View style={styles.flex1}>
              <Text style={styles.label}>English Accent</Text>
              <Text style={styles.sublabel}>{language === 'british' ? 'British English 🇬🇧' : 'American English 🇺🇸'}</Text>
            </View>
            <TouchableOpacity style={styles.toggleBtn} onPress={toggleLanguage}>
              <Text style={styles.toggleText}>Switch</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.borderTop]}>
            <View style={styles.flex1}>
              <Text style={styles.label}>Push Notifications</Text>
              <Text style={styles.sublabel}>Daily practice reminders</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.border, true: Colors.orange }}
              thumbColor={Colors.white}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.base },
  sectionTitle: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold, color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.sm, marginTop: Spacing.base },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: 12 },
  borderTop: { borderTopWidth: 1, borderTopColor: Colors.offWhite },
  flex1: { flex: 1 },
  label: { flex: 1, fontSize: Typography.sizes.base, color: Colors.dark },
  sublabel: { fontSize: Typography.sizes.xs, color: Colors.muted, marginTop: 2 },
  value: { fontSize: Typography.sizes.sm, color: Colors.muted },
  link: { fontSize: Typography.sizes.sm, color: Colors.primary, fontWeight: Typography.weights.bold },
  toggleBtn: { backgroundColor: Colors.lightBlue, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6 },
  toggleText: { fontSize: Typography.sizes.sm, color: Colors.primary, fontWeight: Typography.weights.bold },
});
