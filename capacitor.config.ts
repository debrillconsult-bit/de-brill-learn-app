import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.debrill.learn',
  appName: 'De-Brill Learn',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
