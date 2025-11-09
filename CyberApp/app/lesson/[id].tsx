// app/lesson/[id].tsx
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { lessonDetails, LessonModule } from '@/data/lessons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore'; // <-- IMPORT
import { AccessibleText } from '@/components/AccessibleText'; // <-- IMPORT
import { useLessonStore } from '@/stores/lessonStore'; // <-- For completions

// --- Sub-Topic Item Component ---
const SubTopicItem = ({ id, title }: { id: string, title: string }) => {
  const router = useRouter();
  const isComplete = useLessonStore(state => state.isTopicComplete(id));
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const handlePress = () => {
    router.push({
      pathname: '/topic/[id]',
      params: { id: id },
    });
  };

  return (
    <Pressable style={styles.subTopicRow} onPress={handlePress}>
      <View style={styles.subTopicText}>
        <AccessibleText style={styles.subTopicId} showSpeakButton={false}>{id}</AccessibleText>
        <AccessibleText style={styles.subTopicTitle}>{title}</AccessibleText>
      </View>
      <Ionicons 
        name={isComplete ? 'checkbox' : 'checkbox-outline'} 
        size={24} 
        color={currentTheme.text} 
      />
    </Pressable>
  );
};

// --- Module Component ---
const ModuleCard = ({ module }: { module: LessonModule }) => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  return (
    <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
      <AccessibleText style={styles.moduleId} showSpeakButton={false}>{module.moduleId}</AccessibleText>
      <AccessibleText style={styles.moduleTitle}>{module.title}</AccessibleText>
      <View style={[styles.divider, { backgroundColor: currentTheme.border }]} />
      <View style={styles.subTopicContainer}>
        {module.subTopics.map(subTopic => (
          <SubTopicItem 
            key={subTopic.id} 
            id={subTopic.id} 
            title={subTopic.title} 
          />
        ))}
      </View>
    </View>
  );
};

// --- Main Lesson Detail Screen ---
export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessonDetails.find(l => l.id === id);
  const { theme, isDyslexicFont } = useAccessibilityStore(); // <-- GET THEME
  const currentTheme = themes[theme]; // <-- GET COLORS

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme.bg }}>
        <AccessibleText>Lesson not found!</AccessibleText>
      </SafeAreaView>
    );
  }

  const startQuiz = () => {
    router.push({
      pathname: '/quiz/[id]',
      params: { id: lesson.id },
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: lesson.title,
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lesson.modules.map(module => (
          <ModuleCard key={module.moduleId} module={module} />
        ))}
      </ScrollView>

      <View style={[styles.quizButtonContainer, { backgroundColor: currentTheme.bg }]}>
        <Pressable style={styles.quizButton} onPress={startQuiz}>
          <AccessibleText style={styles.quizButtonText} showSpeakButton={false}>Quiz</AccessibleText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  moduleId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moduleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: 15,
  },
  subTopicContainer: {
    gap: 15,
  },
  subTopicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  subTopicText: {
    flex: 1,
    paddingRight: 10,
  },
  subTopicId: {
    fontSize: 14,
  },
  subTopicTitle: {
    fontSize: 16,
  },
  quizButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'transparent',
  },
  quizButton: {
    backgroundColor: '#3A86FF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});