import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography } from '../../constants/theme';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={[Colors.primary, '#0F2456']} style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>De-Brill Learn</Text>
        <Text style={styles.subtitle}>Speak Clearly. Read Confidently.</Text>
      </View>
      <Text style={styles.publisher}>De-Brill Consults Ltd</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  logo: { width: 60, height: 60, borderRadius: 12, marginBottom: 24, resizeMode: 'contain' },
  title: {
    color: Colors.white,
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extrabold,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.orange,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  publisher: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: Typography.sizes.xs,
    marginBottom: 32,
  },
});
