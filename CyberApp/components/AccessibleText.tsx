// components/AccessibleText.tsx
import React from 'react';
import { Text, StyleSheet, Pressable, View, TextProps, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';

// Extend default TextProps to accept 'children' and 'style'
interface AccessibleTextProps extends TextProps {
  children: React.ReactNode;
  showSpeakButton?: boolean; // Option to show/hide the speak button
}

export function AccessibleText({ children, style, showSpeakButton = true, ...props }: AccessibleTextProps) {
  // 1. Get global settings from our store
  const { isDyslexicFont, fontSizeMultiplier, theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  // --- THIS IS THE CORRECTED LOGIC ---

  // 2. Check if the incoming style is bold
  const isBold = StyleSheet.flatten(style)?.fontWeight === 'bold';

  // 3. Determine the correct style
  const fontStyle: TextStyle = {
    fontFamily: isDyslexicFont 
      ? (isBold ? 'Lexend_700Bold' : 'Lexend_400Regular') 
      : undefined,
    fontWeight: isDyslexicFont 
      ? 'normal' // We use 'normal' because the font file itself is already bold
      : (isBold ? 'bold' : 'normal'), // Use default system bolding
    fontSize: (StyleSheet.flatten(style)?.fontSize || 16) * fontSizeMultiplier,
    lineHeight: (StyleSheet.flatten(style)?.fontSize || 16) * fontSizeMultiplier * 1.5,
    color: currentTheme.text, // Apply theme text color
  };
  // --- END OF FIX ---

  const speak = () => {
    // We only want to speak plain string content
    const stringContent = React.Children.toArray(children).join(' ');
    Speech.stop(); // Stop any previous speech
    Speech.speak(stringContent, {
      language: 'en-US',
    });
  };

  return (
    <View style={styles.container}>
      <Text 
        style={[styles.text, fontStyle, style]} 
        {...props}
      >
        {children}
      </Text>
      {showSpeakButton && (
        <Pressable onPress={speak} style={styles.speakButton}>
          <Ionicons name="volume-medium-outline" size={20} color={currentTheme.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    flex: 1, // Allow text to wrap
    paddingRight: 10,
  },
  speakButton: {
    padding: 5,
  },
});