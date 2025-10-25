// app/profile.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Your Profile', headerShown: true }} />
      <ThemedText type="title">Profile Screen</ThemedText>
      <ThemedText>Your XP, streaks, and achievements will go here!</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
});