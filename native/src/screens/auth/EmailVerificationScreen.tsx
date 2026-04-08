import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';

export const EmailVerificationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email || '';
  const role = route.params?.role || 'student';

  const [warned, setWarned] = useState(false);
  const [resent, setResent] = useState(false);

  const handleVerified = () => {
    if (!warned) {
      setWarned(true);
      return;
    }
    navigation.navigate('ProfileSetup', { role });
  };

  const handleResend = async () => {
    await supabase.auth.resend({ type: 'signup', email });
    setResent(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Ionicons name="mail" size={80} color={Colors.orange} style={styles.icon} />
        <Text style={styles.title}>Check your inbox</Text>
        <Text style={styles.body}>
          We've sent a verification link to:
        </Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.instructions}>
          Open the link in the email to verify your account, then come back and tap the button below.
        </Text>

        {warned && (
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={16} color={Colors.warning} />
            <Text style={styles.warningText}>
              Please verify your email first before continuing.
            </Text>
          </View>
        )}

        <Button
          title="I have verified my email"
          onPress={handleVerified}
          fullWidth
          style={styles.btn}
        />

        <TouchableOpacity onPress={handleResend} style={styles.resendRow}>
          <Text style={styles.resendText}>
            {resent ? 'Email resent! Check your inbox.' : 'Resend verification email'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backRow}>
          <Ionicons name="chevron-back" size={16} color={Colors.muted} />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  container: { flex: 1, padding: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  icon: { marginBottom: Spacing.xl },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.dark,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  body: { fontSize: Typography.sizes.base, color: Colors.muted, textAlign: 'center' },
  email: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginVertical: 8,
    textAlign: 'center',
  },
  instructions: {
    fontSize: Typography.sizes.sm,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF9EE',
    borderRadius: Radius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.warning,
    marginBottom: Spacing.md,
  },
  warningText: { flex: 1, fontSize: Typography.sizes.sm, color: Colors.warning },
  btn: { marginBottom: Spacing.md },
  resendRow: { marginBottom: Spacing.lg },
  resendText: { color: Colors.primary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backText: { color: Colors.muted, fontSize: Typography.sizes.sm },
});
