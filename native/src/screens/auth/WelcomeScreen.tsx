import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from '../../components/Button';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: '8 Books. One Platform.',
    body: 'Access all De-Brill phonics and pronunciation books — from Pre-Nursery to Primary 5 — in one beautiful app.',
    accent: Colors.orange,
  },
  {
    id: '2',
    title: 'Learn with Coach Brill',
    body: 'Your AI-powered pronunciation coach listens, guides, and encourages you every step of the way.',
    accent: Colors.skyBlue,
  },
  {
    id: '3',
    title: 'Track Your Progress',
    body: 'Watch your skills grow with detailed progress tracking across every unit and term.',
    accent: Colors.success,
  },
];

const BookSpineIllustration = () => (
  <View style={spineStyles.row}>
    {[Colors.error, '#8E44AD', '#27AE60', Colors.primary, Colors.skyBlue, Colors.orange, '#F39C12', '#1ABC9C'].map(
      (color, i) => (
        <View key={i} style={[spineStyles.spine, { backgroundColor: color, height: 100 + (i % 3) * 20 }]} />
      )
    )}
  </View>
);

const spineStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginVertical: 24 },
  spine: { width: 28, marginHorizontal: 3, borderRadius: 4 },
});

export const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.logoRow}>
        <Image source={require('../../../assets/icon.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.logoText}>De-Brill Learn</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {item.id === '1' && <BookSpineIllustration />}
            {item.id === '2' && (
              <View style={styles.coachIcon}>
                <Text style={styles.coachEmoji}>🎓</Text>
              </View>
            )}
            {item.id === '3' && (
              <View style={styles.progressIllustration}>
                {[0.4, 0.7, 0.55, 0.9].map((w, i) => (
                  <View key={i} style={styles.progressRow}>
                    <View style={[styles.progressBar, { width: w * 200 }]} />
                  </View>
                ))}
              </View>
            )}
            <Text style={[styles.slideTitle, { color: item.accent }]}>{item.title}</Text>
            <Text style={styles.slideBody}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('RoleSelection')}
          fullWidth
          style={styles.btn}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text style={styles.linkBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.base,
  },
  logo: { width: 60, height: 60, borderRadius: 12, marginRight: 8, resizeMode: 'contain' },
  logoText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.extrabold,
    color: Colors.primary,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['2xl'],
    flex: 1,
  },
  coachIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  coachEmoji: { fontSize: 48 },
  progressIllustration: { marginVertical: 24 },
  progressRow: { marginBottom: 10 },
  progressBar: { height: 14, backgroundColor: Colors.skyBlue, borderRadius: 7 },
  slideTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.extrabold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  slideBody: {
    fontSize: Typography.sizes.base,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', paddingVertical: Spacing.base },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border, marginHorizontal: 4 },
  dotActive: { backgroundColor: Colors.orange, width: 20 },
  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing['2xl'] },
  btn: { marginBottom: Spacing.md },
  link: { alignItems: 'center' },
  linkText: { fontSize: Typography.sizes.sm, color: Colors.muted },
  linkBold: { color: Colors.primary, fontWeight: Typography.weights.bold },
});
