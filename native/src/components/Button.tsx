import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Radius } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) => {
  const containerStyle: any[] = [
    styles.base,
    styles[variant],
    styles[`size_${size}` as keyof typeof styles],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const labelStyle: any[] = [
    styles.label,
    styles[`label_${variant}` as keyof typeof styles],
    styles[`label_${size}` as keyof typeof styles],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary}
          size="small"
        />
      ) : (
        <Text style={labelStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: { backgroundColor: Colors.orange },
  secondary: { backgroundColor: Colors.primary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: { backgroundColor: 'transparent' },
  size_sm: { height: 36, paddingHorizontal: 16 },
  size_md: { height: 48, paddingHorizontal: 24 },
  size_lg: { height: 56, paddingHorizontal: 32 },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  label: { fontWeight: Typography.weights.bold },
  label_primary: { color: Colors.white },
  label_secondary: { color: Colors.white },
  label_outline: { color: Colors.primary },
  label_ghost: { color: Colors.primary },
  label_sm: { fontSize: Typography.sizes.sm },
  label_md: { fontSize: Typography.sizes.base },
  label_lg: { fontSize: Typography.sizes.md },
});
