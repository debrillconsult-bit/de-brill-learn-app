import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const menuItems = [
  { label: 'Settings', icon: 'settings-outline' as const, screen: 'Settings' },
  { label: 'Notifications', icon: 'notifications-outline' as const, screen: 'Notifications' },
  { label: 'Privacy & Security', icon: 'shield-outline' as const, screen: 'PrivacySecurity' },
  { label: 'Help Center', icon: 'help-circle-outline' as const, screen: 'HelpCenter' },
  { label: 'About De-Brill Learn', icon: 'information-circle-outline' as const, screen: 'About' },
  { label: 'Privacy Policy', icon: 'document-text-outline' as const, screen: 'PrivacyPolicy' },
];

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuth();

  const initials = user?.full_name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Profile" />
      <ScrollView>
        {/* Avatar & info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user?.full_name || 'Learner'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {user?.class_level && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.class_level}</Text>
            </View>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Units Done</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={[styles.menuCard, Shadow.sm]}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.screen}
              style={[styles.menuRow, i < menuItems.length - 1 && styles.menuBorder]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuIconCircle}>
                <Ionicons name={item.icon} size={18} color={Colors.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.border} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Log out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  profileSection: { alignItems: 'center', padding: Spacing.xl, backgroundColor: Colors.white, marginBottom: Spacing.sm },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: { color: Colors.white, fontSize: Typography.sizes.xl, fontWeight: Typography.weights.extrabold },
  name: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold, color: Colors.dark, marginBottom: 2 },
  email: { fontSize: Typography.sizes.sm, color: Colors.muted, marginBottom: Spacing.sm },
  badge: { backgroundColor: Colors.lightBlue, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { fontSize: Typography.sizes.xs, color: Colors.primary, fontWeight: Typography.weights.bold },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.white, marginBottom: Spacing.sm },
  statCard: { flex: 1, alignItems: 'center', padding: Spacing.lg },
  statValue: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.extrabold, color: Colors.dark },
  statLabel: { fontSize: Typography.sizes.xs, color: Colors.muted },
  statDivider: { width: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  menuCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, marginHorizontal: Spacing.base, marginBottom: Spacing.sm },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, gap: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.offWhite },
  menuIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: Typography.sizes.base, color: Colors.dark },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: Spacing.base,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 2,
    borderColor: Colors.error,
    marginBottom: Spacing['2xl'],
  },
  logoutText: { color: Colors.error, fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold },
});
