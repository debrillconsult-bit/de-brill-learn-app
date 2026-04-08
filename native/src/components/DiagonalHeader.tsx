import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

interface DiagonalHeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  onBackPress?: () => void;
}

export const DiagonalHeader = ({
  title,
  showBack = false,
  rightElement,
  onBackPress,
}: DiagonalHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <LinearGradient colors={[Colors.orange, Colors.orange]} style={StyleSheet.absoluteFill} />
      <View style={styles.blueCorner} />
      <View style={styles.content}>
        {showBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, showBack && styles.titleWithBack]}>{title}</Text>
        {rightElement && <View style={styles.right}>{rightElement}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    paddingBottom: 16,
    paddingHorizontal: 20,
    overflow: 'hidden',
    minHeight: 80,
  },
  blueCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 80,
    backgroundColor: Colors.primary,
    transform: [{ skewX: '-20deg' }],
    marginRight: -10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 8,
  },
  title: {
    color: Colors.white,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    flex: 1,
  },
  titleWithBack: {
    marginLeft: 4,
  },
  right: {
    marginLeft: 8,
  },
});
