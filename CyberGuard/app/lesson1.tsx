// app/lesson/[id].tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Alert, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Question, lessons } from '@/data/lessons';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type QuestionProps = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
};

// --- Question Component (Inline for simplicity, can be moved to components/Question.tsx) ---
const QuestionComponent = ({ question, onAnswer }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const checkAnswer = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option.');
      return;
    }
    setAnswered(true);
    const isCorrect = selectedOption === question.correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionStyle = (option: string) => {
    if (!answered) {
      return styles.optionButton;
    }
    if (option === question.correctAnswer) {
      return [styles.optionButton, styles.correctOption];
    }
    if (option === selectedOption && option !== question.correctAnswer) {
      return [styles.optionButton, styles.wrongOption];
    }
    return styles.optionButton;
  };

  return (
    <ThemedView style={styles.questionContainer}>
      <ThemedText type="subtitle" style={styles.questionText}>
        {question.questionText}
      </ThemedText>

      {question.image && (
        <Image source={{ uri: question.image }} style={styles.questionImage} />
      )}

      {question.options?.map((option, index) => (
        <ThemedView
          key={index}
          style={[
            getOptionStyle(option),
            selectedOption === option && {
              borderColor: answered
                ? (option === question.correctAnswer ? 'green' : 'red')
                : themeColors.tint,
              borderWidth: 2,
            },
          ]}
        >
          <Button
            title={option}
            onPress={() => !answered && setSelectedOption(option)}
            color={
                answered
                ? (option === question.correctAnswer ? 'green' : (option === selectedOption ? 'red' : themeColors.text))
                : themeColors.text // Default button color when not answered
            }
          />
        </ThemedView>
      ))}

      {!answered && (
        <Button title="Check Answer" onPress={checkAnswer} color={themeColors.tint} />
      )}

      {answered && (
        <ThemedView style={styles.explanationContainer}>
          <ThemedText type="defaultSemiBold">Explanation:</ThemedText>
          <ThemedText>{question.explanation}</ThemedText>
          <Button title="Next Question" onPress={() => onAnswer(selectedOption === question.correctAnswer)} color={themeColors.tint} />
        </ThemedView>
      )}
    </ThemedView>
  );
};

// --- Lesson Detail Screen ---
export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); // Get the lesson ID from the URL
  const router = useRouter();
  const lesson = lessons.find(l => l.id === id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Lesson not found!</ThemedText>
      </ThemedView>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to the next question or complete the lesson
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setTimeout(() => { // Give a moment to read explanation
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500);
    } else {
      setLessonCompleted(true);
    }
  };

  const currentQuestion = lesson.questions[currentQuestionIndex];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{
        title: lesson.title,
        headerShown: true, // Show header for this screen
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!lessonCompleted ? (
          <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <ThemedView style={styles.completionContainer}>
            <ThemedText type="title">Lesson Completed!</ThemedText>
            <ThemedText type="subtitle">Your Score: {score} / {lesson.questions.length}</ThemedText>
            <Button title="Back to Lessons" onPress={() => router.back()} />
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    borderRadius: 10,
    gap: 15,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  questionImage: {
    width: '100%',
    height: 200, // Adjust as needed
    resizeMode: 'contain',
    marginBottom: 15,
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  correctOption: {
    borderColor: 'green',
    borderWidth: 2,
  },
  wrongOption: {
    borderColor: 'red',
    borderWidth: 2,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 5,
  },
  completionContainer: {
    alignItems: 'center',
    gap: 20,
    padding: 20,
  }
});