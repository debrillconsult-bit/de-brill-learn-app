import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DiagonalHeader } from '../../components/DiagonalHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { registerUser } from '../../lib/auth';
import { Colors, Typography, Spacing } from '../../constants/theme';

export const AccountCreationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const role = route.params?.role || 'student';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the terms and conditions.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await registerUser({
      fullName,
      email: email.trim(),
      password,
      role,
      classLevel: classLevel || undefined,
      schoolName: schoolName || undefined,
    });
    setLoading(false);
    if (result.success) {
      navigation.navigate('EmailVerification', { email: email.trim(), role });
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <DiagonalHeader title="Create your account" showBack />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Input label="Full Name" value={fullName} onChangeText={setFullName} placeholder="Jane Doe" autoCapitalize="words" />
          <Input label="Email Address" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
          <Input label="Password" value={password} onChangeText={setPassword} placeholder="Min. 8 characters" isPassword />

          {(role === 'student' || role === 'child') && (
            <Input label="Class Level" value={classLevel} onChangeText={setClassLevel} placeholder="e.g. Primary 3" />
          )}
          {role === 'teacher' && (
            <Input label="School Name" value={schoolName} onChangeText={setSchoolName} placeholder="Your school name" />
          )}

          <TouchableOpacity style={styles.termsRow} onPress={() => setTermsAccepted(!termsAccepted)}>
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Ionicons name="checkmark" size={14} color={Colors.white} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <Button title="Create Account" onPress={handleCreate} loading={loading} fullWidth style={styles.btn} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: { padding: Spacing.xl },
  errorBox: {
    backgroundColor: '#FDECEA',
    borderRadius: 8,
    padding: 12,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  errorText: { color: Colors.error, fontSize: Typography.sizes.sm },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.lg, gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  termsText: { flex: 1, fontSize: Typography.sizes.sm, color: Colors.muted, lineHeight: 20 },
  termsLink: { color: Colors.primary, fontWeight: Typography.weights.bold },
  btn: { marginTop: Spacing.sm },
});
