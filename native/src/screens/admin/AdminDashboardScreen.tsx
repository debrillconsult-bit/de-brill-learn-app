import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

export const AdminDashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, students: 0, teachers: 0, classes: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const { data } = await supabase.from('profiles').select('role');
      if (data) {
        setStats({
          total: data.length,
          students: data.filter(u => u.role === 'student' || u.role === 'child').length,
          teachers: data.filter(u => u.role === 'teacher').length,
          classes: 0,
        });
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.total, icon: 'people-outline' as const, color: Colors.skyBlue },
    { label: 'Students', value: stats.students, icon: 'school-outline' as const, color: Colors.success },
    { label: 'Teachers', value: stats.teachers, icon: 'person-outline' as const, color: Colors.orange },
    { label: 'Classes', value: stats.classes, icon: 'library-outline' as const, color: '#8E44AD' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Image source={require('../../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.title}>De-Brill Admin</Text>
          <Text style={styles.subtitle}>Control Center</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.signOutBtn}>
          <Ionicons name="log-out-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsGrid}>
          {statCards.map((s, i) => (
            <View key={i} style={[styles.statCard, Shadow.md]}>
              <View style={[styles.statIcon, { backgroundColor: s.color + '22' }]}>
                <Ionicons name={s.icon} size={22} color={s.color} />
              </View>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Management</Text>
        {[
          { label: 'Users', sub: 'View and manage all user accounts', icon: 'people' as const, screen: 'AdminUsers' },
          { label: 'Classes', sub: 'Manage class groups and assignments', icon: 'library' as const, screen: 'AdminClasses' },
        ].map(item => (
          <TouchableOpacity
            key={item.screen}
            style={[styles.navCard, Shadow.sm]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.navIcon}>
              <Ionicons name={item.icon} size={22} color={Colors.primary} />
            </View>
            <View style={styles.navText}>
              <Text style={styles.navLabel}>{item.label}</Text>
              <Text style={styles.navSub}>{item.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.border} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing['2xl'],
    gap: 12,
  },
  logo: { width: 40, height: 40 },
  title: { color: Colors.white, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold },
  subtitle: { color: Colors.orange, fontSize: Typography.sizes.sm },
  signOutBtn: { marginLeft: 'auto' },
  scroll: { padding: Spacing.base },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing.base, marginTop: Spacing.sm },
  statCard: { width: '47%', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center' },
  statIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  statValue: { fontSize: Typography.sizes['2xl'], fontWeight: Typography.weights.extrabold, color: Colors.dark },
  statLabel: { fontSize: Typography.sizes.xs, color: Colors.muted, textAlign: 'center', marginTop: 2 },
  sectionTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.dark, marginBottom: Spacing.sm },
  navCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, flexDirection: 'row', alignItems: 'center', padding: Spacing.base, marginBottom: Spacing.sm, gap: 12 },
  navIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  navText: { flex: 1 },
  navLabel: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.dark },
  navSub: { fontSize: Typography.sizes.xs, color: Colors.muted, marginTop: 2 },
});
