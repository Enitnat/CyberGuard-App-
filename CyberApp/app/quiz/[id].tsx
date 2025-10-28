import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Alert, Image } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Question, lessons } from '@/data/lessons'; 
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type QuestionProps = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
};

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

    setTimeout(() => {
        onAnswer(isCorrect);
        setAnswered(false);
        setSelectedOption(null);
    }, 1500);
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
            selectedOption === option && !answered && {
              borderColor: themeColors.tint,
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
                : themeColors.text
            }
          />
        </ThemedView>
      ))}

      {!answered && (
        <ThemedView style={[styles.actionButtonContainer, { backgroundColor: themeColors.tint }]}>
          <Button 
            title="Check Answer" 
            onPress={checkAnswer} 
            color="#FFFFFF"
            disabled={selectedOption === null}
          />
        </ThemedView>
      )}

      {answered && (
        <ThemedView style={styles.explanationContainer}>
          <ThemedText type="defaultSemiBold" style={{color: selectedOption === question.correctAnswer ? 'green' : 'red'}}>
            {selectedOption === question.correctAnswer ? 'Correct!' : 'Not quite...'}
          </ThemedText>
          <ThemedText>{question.explanation}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default function QuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = lessons.find(l => l.id === id); 

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Quiz not found!</ThemedText>
      </ThemedView>
    );
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setLessonCompleted(true);
    }
  };

  const currentQuestion = lesson.questions[currentQuestionIndex];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{
        title: `${lesson.title} Quiz`,
        headerShown: true,
      }} />

   <ScrollView contentContainerStyle={styles.scrollContent}>
        {!lessonCompleted ? (
          <QuestionComponent question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <ThemedView style={styles.completionContainer}>
            
            {/* 1. Fixed closing tag */}
            <ThemedText type="title">Quiz Completed!</ThemedText> 
            
            {/* 2. Fixed component name */}
            <ThemedText>Your Score: {score} / {lesson.questions.length}</ThemedText> 
            
            <ThemedView style={[styles.actionButtonContainer, { backgroundColor: Colors.light.tint, width: '100%' }]}>
              <Button 
                title="Back to Lessons" 
                onPress={() => router.back()} 
                color="#FFFFFF"
              />
            </ThemedView>
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
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 15,
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  actionButtonContainer: {
    borderRadius: 8,
    padding: 5,
    marginTop: 20,
    overflow: 'hidden',
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
    width: '100%',
  }
});