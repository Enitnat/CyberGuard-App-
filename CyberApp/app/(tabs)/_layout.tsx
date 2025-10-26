// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import { Colors } from '@/constants/theme'; // Assuming you have this from the old template

// Define our colors (you can get these from Figma)
const TAB_COLORS = {
  active: '#3A86FF', // Your active blue
  inactive: '#999999',
  background: '#0D1B2A', // Your dark blue
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We will create our own custom header
        tabBarActiveTintColor: TAB_COLORS.active,
        tabBarInactiveTintColor: TAB_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: TAB_COLORS.background,
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index" // This links to app/(tabs)/index.tsx
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
        name="lessons" // This links to app/(tabs)/lessons.tsx
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
        name="announcements" // This links to app/(tabs)/announcements.tsx
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