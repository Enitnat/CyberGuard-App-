// app/topic/[id].tsx
import React from 'react';
import { StyleSheet, ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { topicContent } from '@/data/lessons';
import { useLessonStore } from '@/stores/lessonStore';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore'; // <-- IMPORT
import { AccessibleText } from '@/components/AccessibleText'; // <-- IMPORT

export default function TopicScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const toggleTopicCompletion = useLessonStore(state => state.toggleTopicCompletion);
  const { theme, isDyslexicFont } = useAccessibilityStore(); // <-- GET THEME
  const currentTheme = themes[theme]; // <-- GET COLORS

  const content = topicContent.get(id);

  if (!content) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
        <AccessibleText>Topic content not found!</AccessibleText>
      </SafeAreaView>
    );
  }

  const markAsComplete = () => {
    if (id) toggleTopicCompletion(id);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: content.title,
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
        <AccessibleText style={styles.title}>{content.title}</AccessibleText>
        <AccessibleText style={styles.body}>{content.content}</AccessibleText>
      </ScrollView>

      <View style={[styles.buttonContainer, { borderTopColor: currentTheme.border }]}>
        <Pressable style={styles.button} onPress={markAsComplete}>
          <AccessibleText style={styles.buttonText} showSpeakButton={false}>Mark as Complete</AccessibleText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    lineHeight: 28,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
  },
  button: {
    backgroundColor: '#3A86FF',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});