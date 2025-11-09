// app/settings.tsx
import React from 'react';
import { View, StyleSheet, Pressable, Switch, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { supabase } from '@/lib';
import { useLessonStore } from '@/stores/lessonStore'; // <-- IMPORT LESSON STORE

// Reusable Settings Row Component
const SettingRow = ({ label, children }: { label: string, children: React.ReactNode }) => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  return (
    <View style={[styles.row, { borderBottomColor: currentTheme.border }]}>
      <View style={styles.labelContainer}>
        <AccessibleText style={styles.rowLabel} showSpeakButton={false}>{label}</AccessibleText>
      </View>
      {children}
    </View>
  );
}

export default function SettingsModal() {
  const router = useRouter();
  const {
    isDyslexicFont,
    toggleDyslexicFont,
    fontSizeMultiplier,
    setFontSize,
    isDarkMode,
    toggleDarkMode,
    theme,
    toggleDyslexiaTheme,
  } = useAccessibilityStore();

  const clearLessonProgress = useLessonStore((state) => state.clearProgress);

  const currentTheme = themes[theme];
  const isDyslexiaTheme = theme === 'dyslexiaFriendly';


  const handleLogout = async () => {
  clearLessonProgress();

  const { error } = await supabase.auth.signOut();
  
  if (error) {
    Alert.alert('Error logging out', error.message);
    return;
  }

  // 3. Redirect to login
  router.replace('/');
};

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Settings',
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <SettingRow label="Dark Mode">
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </SettingRow>

        <SettingRow label="Dyslexia Friendly Font">
          <Switch
            value={isDyslexicFont}
            onValueChange={toggleDyslexicFont}
          />
        </SettingRow>
        
        <SettingRow label="Readable Theme (Off-White)">
          <Switch
            value={isDyslexiaTheme}
            onValueChange={toggleDyslexiaTheme}
            disabled={isDarkMode}
          />
        </SettingRow>

        <View style={styles.row}>
          <AccessibleText style={styles.rowLabel} showSpeakButton={false}>Font Size</AccessibleText>
        </View>
        <View style={[styles.fontSizeContainer, {backgroundColor: currentTheme.card}]}>
          <Pressable 
            style={[styles.fontButton, fontSizeMultiplier === 0.8 && styles.fontButtonActive]} 
            onPress={() => setFontSize(0.8)}>
            <AccessibleText style={styles.fontButtonText} showSpeakButton={false}>Small</AccessibleText>
          </Pressable>
          <Pressable 
            style={[styles.fontButton, fontSizeMultiplier === 1.0 && styles.fontButtonActive]} 
            onPress={() => setFontSize(1.0)}>
            <AccessibleText style={styles.fontButtonText} showSpeakButton={false}>Medium</AccessibleText>
          </Pressable>
          <Pressable 
            style={[styles.fontButton, fontSizeMultiplier === 1.2 && styles.fontButtonActive]} 
            onPress={() => setFontSize(1.2)}>
            <AccessibleText style={styles.fontButtonText} showSpeakButton={false}>Large</AccessibleText>
          </Pressable>
        </View>
        
        <View style={{marginTop: 40}}>
          <Button title="Log Out" onPress={handleLogout} color="red" />
        </View>

      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  labelContainer: {
    flex: 1,
    paddingRight: 10,
  },
  rowLabel: {
    fontSize: 18,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 5,
  },
  fontButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  fontButtonActive: {
    backgroundColor: '#3A86FF',
  },
  fontButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});