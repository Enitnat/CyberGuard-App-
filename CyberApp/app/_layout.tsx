// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* The "index" screen is your login page */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      {/* The "home" screen is your main app page */}
      <Stack.Screen 
      name="(tabs)" 
      options={{ headerShown: false }} 
      />
    </Stack>
  );
}