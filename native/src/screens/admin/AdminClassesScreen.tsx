import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

export const AdminClassesScreen = () => {
  const navigation = useNavigation<any>();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('class_groups')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setClasses(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Classes</Text>
      </View>

      <FlatList
        data={classes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.classRow, Shadow.sm]}>
            <View style={styles.classIcon}>
              <Ionicons name="library-outline" size={22} color={Colors.primary} />
            </View>
            <View style={styles.classInfo}>
              <Text style={styles.className}>{item.name}</Text>
              <Text style={styles.classSub}>
                {item.teacher_name || 'No teacher assigned'} · {item.member_count || 0} students
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.border} />
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Ionicons name="library-outline" size={48} color={Colors.border} />
              <Text style={styles.emptyTitle}>No classes yet</Text>
              <Text style={styles.emptyBody}>Class groups will appear here once created.</Text>
            </View>
          ) : null
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
  list: { padding: Spacing.base },
  classRow: { backgroundColor: Colors.white, borderRadius: Radius.md, flexDirection: 'row', alignItems: 'center', padding: Spacing.base, marginBottom: Spacing.sm, gap: 12 },
  classIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.lightBlue, alignItems: 'center', justifyContent: 'center' },
  classInfo: { flex: 1 },
  className: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.semibold, color: Colors.dark },
  classSub: { fontSize: Typography.sizes.xs, color: Colors.muted, marginTop: 2 },
  empty: { alignItems: 'center', padding: Spacing['3xl'] },
  emptyTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Colors.dark, marginTop: Spacing.md },
  emptyBody: { fontSize: Typography.sizes.base, color: Colors.muted, textAlign: 'center', marginTop: Spacing.sm },
});
