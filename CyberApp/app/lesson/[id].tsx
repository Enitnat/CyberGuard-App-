import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { lessonDetails, LessonModule } from '@/data/lessons';
import { useLessonStore } from '@/stores/lessonStore';

const COLORS = {
  background: '#F4F5F7',
  card: '#FFFFFF',
  textDark: '#000000',
  textLight: '#666666',
  button: '#3A86FF',
  buttonText: '#FFFFFF',
  icon: '#3A86FF',
};

const SubTopicItem = ({ id, title }: { id: string, title: string }) => {
  const router = useRouter();
  const isComplete = useLessonStore(state => state.isTopicComplete(id));

  const handlePress = () => {
    router.push({
      pathname: '/topic/[id]',
      params: { id: id },
    });
  };

  return (
    <Pressable style={styles.subTopicRow} onPress={handlePress}>
      <View style={styles.subTopicText}>
        <Text style={styles.subTopicId}>{id}</Text>
        <Text style={styles.subTopicTitle}>{title}</Text>
      </View>
      <Ionicons 
        name={isComplete ? 'checkbox' : 'checkbox-outline'} 
        size={24} 
        color={COLORS.icon} 
      />
    </Pressable>
  );
};

const ModuleCard = ({ module }: { module: LessonModule }) => (
  <View style={styles.card}>
    <Text style={styles.moduleId}>{module.moduleId}</Text>
    <Text style={styles.moduleTitle}>{module.title}</Text>
    <View style={styles.divider} />
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

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); 
  
  const lesson = lessonDetails.find(l => l.id === id);

  if (!lesson) {
    return (
      <SafeAreaView>
        <Text>Lesson not found!</Text>
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
    <SafeAreaView style={styles.safeArea}>
      {/* Custom Header */}
      <Stack.Screen 
        options={{
          headerShown: true,
          title: lesson.title,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={COLORS.textDark} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lesson.modules.map(module => (
          <ModuleCard key={module.moduleId} module={module} />
        ))}
      </ScrollView>

      {/* Quiz Button */}
      <View style={styles.quizButtonContainer}>
        <Pressable style={styles.quizButton} onPress={startQuiz}>
          <Text style={styles.quizButtonText}>Quiz</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, 
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  moduleId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  moduleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
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
  },
  subTopicId: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  subTopicTitle: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  quizButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'transparent',
  },
  quizButton: {
    backgroundColor: COLORS.button,
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  quizButtonText: {
    color: COLORS.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});