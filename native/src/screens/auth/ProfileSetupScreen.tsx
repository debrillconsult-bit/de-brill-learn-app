import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { getCurrentProfile } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';

const avatarColors = [Colors.primary, Colors.orange, Colors.skyBlue, '#27AE60', '#8E44AD', '#E74C3C'];
const avatarIcons = ['person', 'happy', 'star', 'heart', 'rocket', 'flower'] as const;

export const ProfileSetupScreen = () => {
  const navigation = useNavigation<any>();
  const { setUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [nickname, setNickname] = useState('');
  const [language, setLanguage] = useState<'british' | 'american'>('british');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({
            avatar_index: selectedAvatar,
            nickname: nickname.trim() || null,
            language,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        const profile = await getCurrentProfile();
        if (profile) setUser(profile);
      }
    } catch {
      // proceed anyway
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.sub}>Choose how you'll appear in the app</Text>

        <Text style={styles.sectionLabel}>Choose your avatar</Text>
        <View style={styles.avatarGrid}>
          {avatarColors.map((color, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedAvatar(i)}
              style={[styles.avatarItem, selectedAvatar === i && styles.avatarSelected]}
            >
              <View style={[styles.avatarCircle, { backgroundColor: color }]}>
                <Ionicons name={avatarIcons[i]} size={28} color={Colors.white} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Nickname (optional)"
          value={nickname}
          onChangeText={setNickname}
          placeholder="What should we call you?"
          autoCapitalize="words"
        />

        <Text style={styles.sectionLabel}>Preferred English</Text>
        <View style={styles.langRow}>
          {(['british', 'american'] as const).map(lang => (
            <TouchableOpacity
              key={lang}
              style={[styles.langBtn, language === lang && styles.langBtnActive]}
              onPress={() => setLanguage(lang)}
            >
              <Text style={[styles.langLabel, language === lang && styles.langLabelActive]}>
                {lang === 'british' ? '🇬🇧 British' : '🇺🇸 American'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Start Learning"
          onPress={handleStart}
          loading={loading}
          fullWidth
          style={styles.btn}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  scroll: { padding: Spacing.xl },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.dark,
    marginBottom: 4,
  },
  sub: { fontSize: Typography.sizes.base, color: Colors.muted, marginBottom: Spacing.xl },
  sectionLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Spacing.xl },
  avatarItem: { borderRadius: 40, borderWidth: 3, borderColor: 'transparent' },
  avatarSelected: { borderColor: Colors.orange },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langRow: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xl },
  langBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  langBtnActive: { borderColor: Colors.orange, backgroundColor: Colors.lightOrange },
  langLabel: { fontSize: Typography.sizes.base, color: Colors.muted, fontWeight: Typography.weights.medium },
  langLabelActive: { color: Colors.primary, fontWeight: Typography.weights.bold },
  btn: { marginTop: Spacing.sm },
});
