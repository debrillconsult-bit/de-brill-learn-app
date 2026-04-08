import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen';
import { AdminClassesScreen } from '../screens/admin/AdminClassesScreen';

const Stack = createNativeStackNavigator();

export const AdminNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
    <Stack.Screen name="AdminClasses" component={AdminClassesScreen} />
  </Stack.Navigator>
);
