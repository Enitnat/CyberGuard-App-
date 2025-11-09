import { Stack } from 'expo-router';
import React from 'react';
import { 
  useFonts, 
  Lexend_400Regular, 
  Lexend_700Bold 
} from '@expo-google-fonts/lexend';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore'; 

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  const appOnLoad = useAuthStore((state) => state.appOnLoad);

  useEffect(() => {
    appOnLoad();
    
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="lesson/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="quiz/[id]" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="topic/[id]" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="admin" options={{ presentation: 'modal', headerShown: false,}} />
      <Stack.Screen  name="admin-ticket/[id]"  options={{  presentation: 'modal', headerShown: false,}}  />
      <Stack.Screen name="my-tickets" options={{ presentation: 'modal',headerShown: false,}} />
      <Stack.Screen  name="my-ticket-detail/[id]" options={{ presentation: 'modal', headerShown: false,}} />
    </Stack>
  );
}