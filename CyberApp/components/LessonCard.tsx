import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text'; 
import { ThemedView } from './themed-view';
import { Link } from 'expo-router';

type LessonCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export function LessonCard({ id, title, description, icon }: LessonCardProps) {
  return (
    <Link
  href={{
    pathname: '/lesson/[id]',
    params: { id: id },      
  }}
  asChild
>
      <Pressable style={styles.card}>
        {({ pressed }) => ( 
          <ThemedView style={[styles.innerCard, { opacity: pressed ? 0.7 : 1 }]}>
            <ThemedText style={styles.icon}>{icon}</ThemedText>
            <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
            <ThemedText type="default" style={styles.description} numberOfLines={2}>{description}</ThemedText>
          </ThemedView>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  innerCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    flex: 1, 
  },
  description: {
    flex: 2, 
    fontSize: 14,
    color: '#666', 
  }
});