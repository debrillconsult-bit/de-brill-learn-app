import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const games = [
  {
    id: 'sound-safari',
    title: 'Sound Safari',
    description: 'Hunt for the right sounds in words and build your phoneme recognition skills.',
    icon: 'search-outline' as const,
    color: '#27AE60',
    comingSoon: true,
  },
  {
    id: 'blend-bridge',
    title: 'Blend Bridge',
    description: 'Blend phonemes together to form words and cross to the next level.',
    icon: 'git-merge-outline' as const,
    color: '#8E44AD',
    comingSoon: true,
  },
];

export const PracticeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Practice" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.intro}>Reinforce your learning with fun pronunciation games and AI-powered coaching.</Text>

        {games.map(game => (
          <View key={game.id} style={[styles.gameCard, Shadow.md]}>
            <View style={styles.gameContent}>
              <View style={[styles.gameIcon, { backgroundColor: game.color + '22' }]}>
                <Ionicons name={game.icon} size={28} color={game.color} />
              </View>
              <View style={styles.gameText}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDesc}>{game.description}</Text>
              </View>
            </View>
            {game.comingSoon && (
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonText}>COMING SOON</Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={[styles.coachCard, Shadow.sm]}
          onPress={() => navigation.navigate('HomeTab', { screen: 'AICoach' })}
          activeOpacity={0.85}
        >
          <View style={styles.coachLeft}>
            <View style={styles.coachIcon}>
              <Ionicons name="sparkles" size={22} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.coachTitle}>AI Coach Practice</Text>
              <Text style={styles.coachDesc}>Practise pronunciation with Coach Brill</Text>
            </View>
          </View>
          <View style={styles.tryNow}>
            <Text style={styles.tryNowText}>Try Now</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.base },
  intro: { fontSize: Typography.sizes.base, color: Colors.muted, lineHeight: 22, marginBottom: Spacing.lg },
  gameCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, marginBottom: Spacing.base, overflow: 'hidden' },
  gameContent: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  gameIcon: { width: 52, height: 52, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  gameText: { flex: 1 },
  gameTitle: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, color: Colors.dark, marginBottom: 4 },
  gameDesc: { fontSize: Typography.sizes.sm, color: Colors.muted, lineHeight: 18 },
  comingSoon: { marginTop: Spacing.sm, alignSelf: 'flex-start', backgroundColor: Colors.lightOrange, borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  comingSoonText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.extrabold, color: Colors.orange, letterSpacing: 0.5 },
  coachCard: { backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.base, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  coachLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  coachIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  coachTitle: { fontSize: Typography.sizes.base, fontWeight: Typography.weights.bold, color: Colors.white },
  coachDesc: { fontSize: Typography.sizes.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  tryNow: { backgroundColor: Colors.orange, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 8 },
  tryNowText: { fontSize: Typography.sizes.sm, fontWeight: Typography.weights.bold, color: Colors.white },
});
