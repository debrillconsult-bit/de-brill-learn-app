import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Button } from '../../components/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const roles = [
  { id: 'child', label: 'Child', ageRange: 'Ages 2–6', icon: 'happy-outline' as const },
  { id: 'student', label: 'Student', ageRange: 'Ages 7–11', icon: 'school-outline' as const },
  { id: 'teacher', label: 'Teacher', ageRange: 'Educator', icon: 'person-outline' as const },
  { id: 'parent', label: 'Parent', ageRange: 'Guardian', icon: 'people-outline' as const },
];

export const RoleSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="I am a..." />
      <View style={styles.content}>
        <Text style={styles.sub}>Select your role to get started</Text>
        <View style={styles.grid}>
          {roles.map(role => {
            const active = selected === role.id;
            return (
              <TouchableOpacity
                key={role.id}
                style={[styles.tile, active && styles.tileActive]}
                onPress={() => setSelected(role.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
                  <Ionicons
                    name={role.icon}
                    size={28}
                    color={active ? Colors.white : Colors.primary}
                  />
                </View>
                <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>{role.label}</Text>
                <Text style={styles.tileAge}>{role.ageRange}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title="Continue"
          onPress={() => navigation.navigate('AccountCreation', { role: selected })}
          disabled={!selected}
          fullWidth
          style={styles.btn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  content: { flex: 1, padding: Spacing.xl },
  sub: { fontSize: Typography.sizes.base, color: Colors.muted, marginBottom: Spacing.xl, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Spacing['2xl'] },
  tile: {
    width: '47%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  tileActive: { borderColor: Colors.orange, backgroundColor: Colors.lightOrange },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconCircleActive: { backgroundColor: Colors.orange },
  tileLabel: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.dark,
    marginBottom: 2,
  },
  tileLabelActive: { color: Colors.primary },
  tileAge: { fontSize: Typography.sizes.xs, color: Colors.muted },
  btn: { marginTop: 'auto' },
});
