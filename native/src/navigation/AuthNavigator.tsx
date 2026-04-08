import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { WelcomeScreen } from '../screens/auth/WelcomeScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
import { AccountCreationScreen } from '../screens/auth/AccountCreationScreen';
import { EmailVerificationScreen } from '../screens/auth/EmailVerificationScreen';
import { ProfileSetupScreen } from '../screens/auth/ProfileSetupScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  RoleSelection: undefined;
  AccountCreation: { role: string };
  EmailVerification: { email: string; role: string };
  ProfileSetup: { role: string };
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    <Stack.Screen name="AccountCreation" component={AccountCreationScreen} />
    <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
    <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
