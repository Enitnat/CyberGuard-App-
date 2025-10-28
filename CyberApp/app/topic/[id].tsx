import React from 'react';
import { StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { topicContent } from '@/data/lessons';
import { useLessonStore } from '@/stores/lessonStore';

const COLORS = {
  background: '#F4F5F7',
  textDark: '#000000',
  textLight: '#333333',
  button: '#3A86FF',
  buttonText: '#FFFFFF',
};

export default function TopicScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const toggleTopicCompletion = useLessonStore(state => state.toggleTopicCompletion);

  const content = topicContent.get(id);

  if (!content) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Topic content not found!</Text>
      </SafeAreaView>
    );
  }

  const markAsComplete = () => {
    toggleTopicCompletion(id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: content.title,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={COLORS.textDark} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.body}>{content.content}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={markAsComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    color: COLORS.textLight,
    lineHeight: 28,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  button: {
    backgroundColor: COLORS.button,
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});