import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LessonCard } from '@/components/LessonCard';
import { lessons } from '@/data/lessons'; 

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={lessons} 
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