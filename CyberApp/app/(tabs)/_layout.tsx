// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore'; // <-- IMPORT

export default function TabLayout() {
  const { theme } = useAccessibilityStore(); // <-- GET THEME
  const currentTheme = themes[theme]; // <-- GET COLORS

  // Define our colors
  const TAB_COLORS = {
    active: '#3A86FF',
    inactive: currentTheme.text, // <-- USE THEME
    background: currentTheme.card, // <-- USE THEME
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TAB_COLORS.active,
        tabBarInactiveTintColor: TAB_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: TAB_COLORS.background,
          borderTopColor: currentTheme.border, // <-- USE THEME
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons"
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="announcements"
        options={{
          title: 'Announcements',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'megaphone' : 'megaphone-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}