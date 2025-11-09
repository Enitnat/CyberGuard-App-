import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="lesson/[id]" 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="quiz/[id]" 
        options={{ 
          presentation: 'modal',
          headerShown: false,
        }} 
      />
      
      <Stack.Screen 
        name="topic/[id]" 
        options={{ 
          presentation: 'modal', 
          headerShown: false,    
        }} 
      />

    </Stack>
  );
}

