import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

type RoleFilter = 'ALL' | 'STUDENT' | 'TEACHER';

export const AdminUsersScreen = () => {
  const navigation = useNavigation<any>();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<RoleFilter>('ALL');

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setUsers(data || []));
  }, []);

  const filtered = users.filter(u => {
    const matchSearch =
      u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      filter === 'ALL' ||
      (filter === 'STUDENT' && (u.role === 'student' || u.role === 'child')) ||
      (filter === 'TEACHER' && u.role === 'teacher');
    return matchSearch && matchRole;
  });

  const roleBadgeColor = (role: string) => {
    if (role === 'teacher') return Colors.orange;
    if (role === 'admin') return Colors.error;
    if (role === 'parent') return '#8E44AD';
    return Colors.skyBlue;
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Users</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color={Colors.muted} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or email..."
          placeholderTextColor={Colors.muted}
        />
      </View>

      <View style={styles.filterRow}>
        {(['ALL', 'STUDENT', 'TEACHER'] as RoleFilter[]).map(f => (
          <TouchableOpacity key={f} style={[styles.filterBtn, filter === f && styles.filterBtnActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterLabel, filter === f && styles.filterLabelActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.userRow, Shadow.sm]}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {item.full_name?.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || 'U'}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.full_name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View style={[styles.roleBadge, { backgroundColor: roleBadgeColor(item.role) + '22' }]}>
              <Text style={[styles.roleLabel, { color: roleBadgeColor(item.role) }]}>
                {item.role?.toUpperCase()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  header: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', padding: Spacing.base, paddingTop: Spacing.xl, gap: 12 },
  backBtn: { padding: 4 },
  title: { color: Colors.white, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.extrabold },
  searchBox: { flexDirection: 'row', alignItems: 'center', margin: Spacing.base, backgroundColor: Colors.white, borderRadius: Radius.lg, paddingHorizontal: Spacing.base, gap: 8, borderWidth: 1, borderColor: Colors.border },
  searchInput: { flex: 1, height: 44, fontSize: Typography.sizes.base, color: Colors.dark },
  filterRow: { flexDirection: 'row', paddingHorizontal: Spacing.base, gap: 8, marginBottom: Spacing.sm },
  filterBtn: { paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border },
  filterBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.bold, color: Colors.muted },
  filterLabelActive: { color: Colors.white },
  list: { paddingHorizontal: Spacing.base },
  userRow: { backgroundColor: Colors.white, borderRadius: Radius.md, flexDirection: 'row', alignItems: 'center', padding: Spacing.sm, marginBottom: Spacing.sm, gap: 10 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.white, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold },
  userInfo: { flex: 1 },
  userName: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.dark },
  userEmail: { fontSize: Typography.sizes.xs, color: Colors.muted },
  roleBadge: { borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 4 },
  roleLabel: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold },
  empty: { alignItems: 'center', padding: Spacing['2xl'] },
  emptyText: { color: Colors.muted, fontSize: Typography.sizes.base },
});
