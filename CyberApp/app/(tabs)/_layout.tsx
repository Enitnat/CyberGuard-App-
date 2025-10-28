import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { Colors } from '@/constants/theme'; 

const TAB_COLORS = {
  active: '#3A86FF',
  inactive: '#999999',
  background: '#0D1B2A', 
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
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
        name="index" 
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
        name="lessons" 
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
        name="announcements" 
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