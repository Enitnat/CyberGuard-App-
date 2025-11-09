import React from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';

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

type LessonItemProps = {
  title: string;
  updated: string;
  onPress: () => void;
};

const LessonItem = ({ title, updated, onPress }: LessonItemProps) => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <View style={[styles.itemIconBackground, { backgroundColor: currentTheme.card }]}>
        <Ionicons name="book" size={48} color={currentTheme.text} />
      </View>
      <AccessibleText style={styles.itemTitle} showSpeakButton={false}>{title}</AccessibleText>
      <AccessibleText style={styles.itemUpdated} showSpeakButton={false}>{updated}</AccessibleText>
    </Pressable>
  );
};

const Pagination = () => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  return (
    <View style={styles.paginationContainer}>
      <Pressable style={[styles.pageButton, styles.pageButtonActive]}>
        <AccessibleText style={[styles.pageText, styles.pageTextActive]} showSpeakButton={false}>1</AccessibleText>
      </Pressable>
      <Pressable style={styles.pageButton}>
        <AccessibleText style={[styles.pageText, { color: currentTheme.text }]} showSpeakButton={false}>2</AccessibleText>
      </Pressable>
      <Pressable style={styles.pageButton}>
        <AccessibleText style={[styles.pageText, { color: currentTheme.text }]} showSpeakButton={false}>3</AccessibleText>
      </Pressable>
      <AccessibleText style={[styles.pageText, { color: currentTheme.text }]}>...</AccessibleText>
      <Pressable style={styles.pageButton}>
        <AccessibleText style={[styles.pageText, { color: currentTheme.text }]} showSpeakButton={false}>67</AccessibleText>
      </Pressable>
      <Pressable style={styles.pageButton}>
        <AccessibleText style={[styles.pageText, { color: currentTheme.text }]} showSpeakButton={false}>68</AccessibleText>
      </Pressable>
    </View>
  );
};


export default function LessonsScreen() {
  const router = useRouter();
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const openLesson = (lessonId: string) => {
    router.push({
      pathname: '/lesson/[id]',
      params: { id: lessonId },
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Lessons',
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
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
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={<Pagination />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  itemContainer: {
    width: '33.33%', 
    alignItems: 'center',
    padding: 8,
  },
  itemIconBackground: {
    borderRadius: 10,
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemUpdated: {
    fontSize: 12,
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
    backgroundColor: '#0D1B2A',
    borderRadius: 8,
  },
  pageText: {
    fontSize: 16,
  },
  pageTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});