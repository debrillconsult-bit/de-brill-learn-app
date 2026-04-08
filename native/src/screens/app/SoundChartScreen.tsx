import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import Constants from 'expo-constants';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { PHONEMES, Phoneme } from '../../constants/phonemes';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl || '';

const playSound = async (word: string, setPlaying: (s: string) => void) => {
  setPlaying(word);
  try {
    await Speech.speak(word, { language: 'en-GB', rate: 0.85 });
  } catch {
    try {
      await fetch(`${API_BASE}/api/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: word }),
      });
    } catch {}
  }
  setTimeout(() => setPlaying(''), 1500);
};

const groupPhonemes = (phonemes: Phoneme[]) => {
  const groups: Record<string, Phoneme[]> = {};
  for (const p of phonemes) {
    if (!groups[p.subtype]) groups[p.subtype] = [];
    groups[p.subtype].push(p);
  }
  return Object.entries(groups);
};

const PhonemeCard = ({
  item,
  playing,
  onPress,
}: {
  item: Phoneme;
  playing: string;
  onPress: () => void;
}) => {
  const isPlaying = playing === item.example;
  return (
    <TouchableOpacity
      style={[styles.phonemeCard, Shadow.sm, isPlaying && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.example}>{item.example}</Text>
      {isPlaying && <View style={styles.playingDot} />}
    </TouchableOpacity>
  );
};

export const SoundChartScreen = () => {
  const [tab, setTab] = useState<'vowels' | 'consonants'>('vowels');
  const [playing, setPlaying] = useState('');

  const filtered = PHONEMES.filter(p =>
    tab === 'vowels' ? p.type !== 'consonant' : p.type === 'consonant'
  );
  const sections = groupPhonemes(filtered);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="English Sound Chart" />

      <View style={styles.tabs}>
        {(['vowels', 'consonants'] as const).map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabLabel, tab === t && styles.tabLabelActive]}>
              {t === 'vowels' ? 'VOWELS & DIPHTHONGS' : 'CONSONANTS'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {sections.map(([title, items]) => (
          <View key={title}>
            <Text style={styles.sectionHeader}>{title}</Text>
            <View style={styles.grid}>
              {items.map((item, i) => (
                <PhonemeCard
                  key={item.symbol + i}
                  item={item}
                  playing={playing}
                  onPress={() => playSound(item.example, setPlaying)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: { flex: 1, paddingVertical: Spacing.sm, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.orange },
  tabLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.muted,
  },
  tabLabelActive: { color: Colors.primary },
  list: { padding: Spacing.sm },
  sectionHeader: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.extrabold,
    color: Colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  phonemeCard: {
    width: '22%',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    minHeight: 64,
    justifyContent: 'center',
  },
  cardActive: { borderColor: Colors.orange, backgroundColor: Colors.lightOrange },
  symbol: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.extrabold,
    color: Colors.primary,
  },
  example: {
    fontSize: Typography.sizes.xs,
    color: Colors.muted,
    marginTop: 2,
    textAlign: 'center',
  },
  playingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.orange,
    marginTop: 4,
  },
});
