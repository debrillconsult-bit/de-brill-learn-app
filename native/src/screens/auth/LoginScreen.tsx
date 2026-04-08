import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { loginUser } from '../../lib/auth';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing } from '../../constants/theme';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await loginUser(email.trim(), password);
    setLoading(false);
    if (result.success && result.user) {
      setUser(result.user);
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>De-Brill Learn</Text>
          </View>

          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>Sign in to continue learning</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Input
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            isPassword
          />

          <Button title="Sign In" onPress={handleLogin} loading={loading} fullWidth style={styles.btn} />

          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.link}>
            <Text style={styles.linkText}>
              Don't have an account?{' '}
              <Text style={styles.linkBold}>Create one</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.offWhite },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: Spacing.xl, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: Spacing['2xl'] },
  logo: { width: 80, height: 80, marginBottom: 12 },
  appName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.extrabold,
    color: Colors.primary,
  },
  heading: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.dark,
    marginBottom: 4,
  },
  subheading: {
    fontSize: Typography.sizes.base,
    color: Colors.muted,
    marginBottom: Spacing.xl,
  },
  errorBox: {
    backgroundColor: '#FDECEA',
    borderRadius: 8,
    padding: 12,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  errorText: { color: Colors.error, fontSize: Typography.sizes.sm },
  btn: { marginTop: Spacing.sm },
  link: { alignItems: 'center', marginTop: Spacing.lg },
  linkText: { fontSize: Typography.sizes.sm, color: Colors.muted },
  linkBold: { color: Colors.primary, fontWeight: Typography.weights.bold },
});
