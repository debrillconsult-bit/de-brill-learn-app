export const Colors = {
  primary: '#1B3A7A',
  orange: '#F47920',
  skyBlue: '#4DBBEE',
  white: '#FFFFFF',
  offWhite: '#F5F7FA',
  lightBlue: '#E8EEF8',
  lightOrange: '#FEF3EA',
  navy: '#1B3A7A',
  muted: '#888888',
  dark: '#222222',
  border: '#DDDDDD',
  success: '#1A7A3A',
  error: '#C0392B',
  warning: '#B7770D',
  cardBg: '#FFFFFF',
  background: '#F5F7FA',
};

export const Typography = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 26,
    '3xl': 32,
    '4xl': 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
};
