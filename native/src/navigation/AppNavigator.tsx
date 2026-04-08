import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

import { HomeScreen } from '../screens/app/HomeScreen';
import { LibraryScreen } from '../screens/app/LibraryScreen';
import { BookDetailScreen } from '../screens/app/BookDetailScreen';
import { PracticeScreen } from '../screens/app/PracticeScreen';
import { SoundChartScreen } from '../screens/app/SoundChartScreen';
import { ProfileScreen } from '../screens/app/ProfileScreen';
import { SettingsScreen } from '../screens/app/SettingsScreen';
import { NotificationsScreen } from '../screens/app/NotificationsScreen';
import { HelpCenterScreen } from '../screens/app/HelpCenterScreen';
import { AboutScreen } from '../screens/app/AboutScreen';
import { PrivacySecurityScreen } from '../screens/app/PrivacySecurityScreen';
import { PrivacyPolicyScreen } from '../screens/app/PrivacyPolicyScreen';
import { UnitOverviewScreen } from '../screens/app/UnitOverviewScreen';
import { LessonScreen } from '../screens/app/LessonScreen';
import { AICoachScreen } from '../screens/app/AICoachScreen';
import { ProgressScreen } from '../screens/app/ProgressScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AICoach" component={AICoachScreen} />
    <Stack.Screen name="Progress" component={ProgressScreen} />
  </Stack.Navigator>
);

const LibraryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Library" component={LibraryScreen} />
    <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    <Stack.Screen name="UnitOverview" component={UnitOverviewScreen} />
    <Stack.Screen name="Lesson" component={LessonScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.orange,
      tabBarInactiveTintColor: Colors.muted,
      tabBarStyle: {
        backgroundColor: Colors.white,
        borderTopColor: Colors.border,
        borderTopWidth: 1,
        height: 60,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '600',
      },
      tabBarIcon: ({ focused, color }) => {
        const icons: Record<string, string> = {
          HomeTab: focused ? 'home' : 'home-outline',
          LibraryTab: focused ? 'book' : 'book-outline',
          PracticeTab: focused ? 'game-controller' : 'game-controller-outline',
          SoundsTab: focused ? 'volume-high' : 'volume-high-outline',
          ProfileTab: focused ? 'person' : 'person-outline',
        };
        return <Ionicons name={icons[route.name] as any} size={22} color={color} />;
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
    <Tab.Screen name="LibraryTab" component={LibraryStack} options={{ title: 'Library' }} />
    <Tab.Screen name="PracticeTab" component={PracticeScreen} options={{ title: 'Practice' }} />
    <Tab.Screen name="SoundsTab" component={SoundChartScreen} options={{ title: 'Sounds' }} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
  </Tab.Navigator>
);
