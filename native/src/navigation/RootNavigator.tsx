import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/theme';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { AdminNavigator } from './AdminNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }}>
        <ActivityIndicator size="large" color={Colors.orange} />
      </View>
    );
  }

  if (!user) return <AuthNavigator />;
  if (user.role === 'admin') return <AdminNavigator />;
  return <AppNavigator />;
};
