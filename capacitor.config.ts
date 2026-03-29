import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.debrillconsults.learn',
  appName: 'De-Brill Learn',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    backgroundColor: '#1B3A7A',
    buildOptions: {
      releaseType: 'APK',
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      backgroundColor: '#1B3A7A',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  }
};

export default config;
