import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Alert, Image, View, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Question, lessons } from '@/data/lessons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText'; 
import { Ionicons } from '@expo/vector-icons';

type QuestionProps = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
};

const QuestionComponent = ({ question, onAnswer }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const checkAnswer = () => {
    if (selectedOption === null) {
      Alert.alert('Please select an option.');
      return;
    }
    setAnswered(true);
    const isCorrect = selectedOption === question.correctAnswer;

    setTimeout(() => {
        onAnswer(isCorrect);
        setAnswered(false);
        setSelectedOption(null);
    }, 1500);
  };

  const getOptionStyle = (option: string) => {
    if (!answered) {
      return [styles.optionButton, { borderColor: currentTheme.border, backgroundColor: currentTheme.card }];
    }
    if (option === question.correctAnswer) {
      return [styles.optionButton, styles.correctOption];
    }
    if (option === selectedOption && option !== question.correctAnswer) {
      return [styles.optionButton, styles.wrongOption];
    }
    return [styles.optionButton, { borderColor: currentTheme.border, backgroundColor: currentTheme.card }];
  };

  return (
    <View style={[styles.questionContainer, { backgroundColor: currentTheme.bg }]}>
      <AccessibleText style={styles.questionText}>{question.questionText}</AccessibleText>

      {question.image && (
        <Image source={{ uri: question.image }} style={styles.questionImage} />
      )}

      {question.options?.map((option, index) => (
        <Pressable
          key={index}
          style={[
            getOptionStyle(option),
            selectedOption === option && !answered && {
              borderColor: '#3A86FF',
              borderWidth: 2,
            },
          ]}
          onPress={() => !answered && setSelectedOption(option)}
        >
          <AccessibleText style={styles.optionText}>{option}</AccessibleText>
        </Pressable>
      ))}

      {!answered && (
        <Pressable 
          style={[styles.actionButton, { backgroundColor: '#3A86FF' }]} 
          onPress={checkAnswer} 
          disabled={selectedOption === null}
        >
          <AccessibleText style={styles.actionButtonText} showSpeakButton={false}>Check Answer</AccessibleText>
        </Pressable>
      )}

      {answered && (
        <View style={[styles.explanationContainer, { borderColor: currentTheme.border, backgroundColor: currentTheme.card }]}>
          <AccessibleText style={{ color: selectedOption === question.correctAnswer ? 'green' : 'red', fontWeight: 'bold' }}>
            {selectedOption === question.correctAnswer ? 'Correct!' : 'Not quite...'}
          </AccessibleText>
          <AccessibleText>{question.explanation}</AccessibleText>
        </View>
      )}
    </View>
  );
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = lessons.find(l => l.id === id);
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  if (!lesson) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
        <AccessibleText>Quiz not found!</AccessibleText>
      </SafeAreaView>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setLessonCompleted(true);
    }
  };

  const currentQuestion = lesson.questions[currentQuestionIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen options={{
        title: `${lesson.title} Quiz`,
        headerShown: true,
        headerStyle: { backgroundColor: currentTheme.card },
        headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
        headerLeft: () => (
          <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
          </Pressable>
        ),
      }} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!lessonCompleted ? (
          <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <View style={styles.completionContainer}>
            <AccessibleText style={styles.title}>Quiz Completed!</AccessibleText>
            <AccessibleText style={styles.subtitle}>Your Score: {score} / {lesson.questions.length}</AccessibleText>
            <Pressable 
              style={[styles.actionButton, { backgroundColor: '#3A86FF', width: '100%' }]}
              onPress={() => router.back()} 
            >
              <AccessibleText style={styles.actionButtonText} showSpeakButton={false}>Back to Lessons</AccessibleText>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  questionContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    gap: 15,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionImage: {
    width: '100%',
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 15,
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  actionButton: {
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctOption: {
    borderColor: 'green',
    backgroundColor: '#e0ffe0',
    borderWidth: 2,
  },
  wrongOption: {
    borderColor: 'red',
    backgroundColor: '#ffe0e0',
    borderWidth: 2,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  completionContainer: {
    alignItems: 'center',
    gap: 20,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  }
});