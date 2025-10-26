// app/(tabs)/lessons.tsx
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Colors (get these from Figma) ---
const COLORS = {
  background: '#FFFFFF',
  textDark: '#000000',
  textLight: '#666666',
  cardBackground: '#F4F5F7',
  activePage: '#0D1B2A',
};

// --- Mock Data (for the grid) ---
const lessonData = [
  { id: '1', title: 'Lesson 1', updated: 'Updated today' },
  { id: '2', title: 'Lesson 2', updated: 'Updated today' },
  { id: '3', title: 'Lesson 3', updated: 'Updated 2 days ago' },
  { id: '4', title: 'Lesson 4', updated: 'Updated today' },
  { id: '5', title: 'Lesson 5', updated: 'Updated yesterday' },
  { id: '6', title: 'Lesson 6', updated: 'Updated 2 days ago' },
  { id: '7', title: 'Lesson 7', updated: 'Updated today' },
  { id: '8', title: 'Lesson 8', updated: 'Updated yesterday' },
  { id: '9', title: 'Lesson 9', updated: 'Updated 2 days ago' },
];

// --- Single Lesson Item Component ---
type LessonItemProps = {
  title: string;
  updated: string;
  onPress: () => void;
};

const LessonItem = ({ title, updated, onPress }: LessonItemProps) => (
  <Pressable style={styles.itemContainer} onPress={onPress}>
    <View style={styles.itemIconBackground}>
      <Ionicons name="book" size={48} color={COLORS.textDark} />
    </View>
    <Text style={styles.itemTitle}>{title}</Text>
    <Text style={styles.itemUpdated}>{updated}</Text>
  </Pressable>
);

// --- Pagination Component ---
const Pagination = () => (
  <View style={styles.paginationContainer}>
    <Pressable style={[styles.pageButton, styles.pageButtonActive]}>
      <Text style={[styles.pageText, styles.pageTextActive]}>1</Text>
    </Pressable>
    <Pressable style={styles.pageButton}>
      <Text style={styles.pageText}>2</Text>
    </Pressable>
    <Pressable style={styles.pageButton}>
      <Text style={styles.pageText}>3</Text>
    </Pressable>
    <Text style={styles.pageText}>...</Text>
    <Pressable style={styles.pageButton}>
      <Text style={styles.pageText}>67</Text>
    </Pressable>
    <Pressable style={styles.pageButton}>
      <Text style={styles.pageText}>68</Text>
    </Pressable>
  </View>
);

// --- Main Lessons Screen ---
export default function LessonsScreen() {
  const router = useRouter();

  const openLesson = (lessonId: string) => {
    // This is where we will go to the lesson detail screen
    // We'll add this file next
    console.log('Opening lesson:', lessonId);
    // router.push(`/lesson/${lessonId}`); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header from your design */}
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Lessons',
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={COLORS.textDark} />
            </Pressable>
          ),
        }} 
      />
      
      <FlatList
        data={lessonData}
        renderItem={({ item }) => (
          <LessonItem 
            title={item.title} 
            updated={item.updated} 
            onPress={() => openLesson(item.id)}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={3} // This creates the 3-column grid
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<Pagination />} // Adds the page numbers at the bottom
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    flex: 1, // Makes each item share space equally
    maxWidth: '33.33%', // Ensures 3 columns
    alignItems: 'center',
    padding: 8,
  },
  itemIconBackground: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    width: '100%',
    aspectRatio: 1, // Makes it a perfect square
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  itemUpdated: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  pageButton: {
    padding: 10,
  },
  pageButtonActive: {
    backgroundColor: COLORS.activePage,
    borderRadius: 8,
  },
  pageText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  pageTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});