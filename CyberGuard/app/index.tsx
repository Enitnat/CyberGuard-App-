// app/index.tsx
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LessonCard } from '@/components/LessonCard';
import { lessons } from '@/data/lessons'; // Import our mock data

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={lessons} // Use our mock lessons data
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LessonCard
            id={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        )}
        ListHeaderComponent={() => (
          <ThemedText type="title" style={styles.headerTitle}>CyberGuard Academy</ThemedText>
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});