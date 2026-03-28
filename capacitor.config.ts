import type { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.debrill.learn',
  appName: 'De-Brill Learn',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
} as CapacitorConfig;

export default config;
