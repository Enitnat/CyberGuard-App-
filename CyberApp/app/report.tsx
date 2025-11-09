// app/report.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Pressable, 
  Alert, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { supabase } from '@/lib'; // Import your Supabase client

export default function ReportScreen() {
  const router = useRouter();
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async () => {
    if (!subject || !description) {
      Alert.alert('Missing Information', 'Please fill out both fields.');
      return;
    }
    setLoading(true);

    // 1. Get the currently logged-in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit a report.');
      setLoading(false);
      return;
    }

    // 2. Insert the new ticket into the database
    const { error } = await supabase
      .from('tickets')
      .insert({
        user_id: user.id,
        subject: subject,
        description: description,
        status: 'new' // Set the initial status
      });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Report Submitted', 'Thank you. An admin will review your report shortly.');
      router.back();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Report an Incident',
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <AccessibleText style={styles.label}>Subject</AccessibleText>
        <TextInput
          style={[styles.input, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
          value={subject}
          onChangeText={setSubject}
          placeholder="e.g., Suspicious Email, Scammer"
          placeholderTextColor="#999"
        />

        <AccessibleText style={styles.label}>Description</AccessibleText>
        <TextInput
          style={[styles.input, styles.textArea, { backgroundColor: currentTheme.card, color: currentTheme.text }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Please describe what happened in detail..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={6}
        />

        <Pressable 
          style={styles.submitButton} 
          onPress={handleSubmitReport}
          disabled={loading}
        >
          <AccessibleText style={styles.submitButtonText} showSpeakButton={false}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </AccessibleText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent', // You can use currentTheme.border here
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top', // For Android
  },
  submitButton: {
    backgroundColor: '#3A86FF',
    padding: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});