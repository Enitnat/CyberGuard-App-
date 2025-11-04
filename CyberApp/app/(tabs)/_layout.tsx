// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';

export default function TabLayout() {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  // Define our colors
  const TAB_COLORS = {
    active: '#3A86FF', // Your active blue
    inactive: currentTheme.text, // Use theme text color
    background: currentTheme.card, // Use theme card color
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We use custom headers inside the screens
        tabBarActiveTintColor: TAB_COLORS.active,
        tabBarInactiveTintColor: TAB_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: TAB_COLORS.background,
          borderTopColor: currentTheme.border, // Add theme border color
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index" // Links to app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lessons" // Links to app/(tabs)/lessons.tsx
        options={{
          title: 'Lessons',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'book' : 'book-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="announcements" // Links to app/(tabs)/announcements.tsx
        options={{
          title: 'Announcements',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? 'megaphone' : 'megaphone-outline'} 
              size={28} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}