// components/AccessibleText.tsx
import React from 'react';
import { Text, StyleSheet, Pressable, View, TextProps, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';

interface AccessibleTextProps extends TextProps {
  children: React.ReactNode;
  showSpeakButton?: boolean;
}

export function AccessibleText({ children, style, showSpeakButton = true, ...props }: AccessibleTextProps) {
  
  // --- THIS IS THE FIX ---
  // 1. All hook calls MUST be at the top, before any conditions or returns.
  const { isDyslexicFont, fontSizeMultiplier, theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  // --- END OF FIX ---

  // 2. Convert children to a simple string to check it
  const stringContent = React.Children.toArray(children).join(' ');

  // 3. Now we can have an early return
  if (!stringContent || stringContent.trim() === '') {
    return null;
  }

  // --- (Rest of the component logic) ---
  const flatStyle = StyleSheet.flatten(style);
  const baseFontSize = flatStyle?.fontSize || 16;
  const isBold = flatStyle?.fontWeight === 'bold';

  const fontStyle: TextStyle = {
    fontFamily: isDyslexicFont ? (isBold ? 'Lexend_700Bold' : 'Lexend_400Regular') : undefined,
    fontWeight: isDyslexicFont ? 'normal' : (isBold ? 'bold' : 'normal'),
    fontSize: baseFontSize * fontSizeMultiplier,
    lineHeight: (baseFontSize * fontSizeMultiplier) * 1.5,
    color: flatStyle?.color ? flatStyle.color : currentTheme.text,
  };

  const speak = () => {
    Speech.stop();
    Speech.speak(stringContent, { language: 'en-US' });
  };

  return (
    <View style={styles.container}>
      <Text 
        style={[
          styles.text,
          style,
          fontStyle
        ]} 
        {...props}
      >
        {children}
      </Text>
      {showSpeakButton && (
        <Pressable onPress={speak} style={styles.speakButton}>
          <Ionicons name="volume-medium-outline" size={20} color={fontStyle.color} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingRight: 10,
    flexShrink: 1, // Allows text to wrap
  },
  speakButton: {
    padding: 5,
  },
});