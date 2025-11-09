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
  const { isDyslexicFont, fontSizeMultiplier, theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  const flatStyle = StyleSheet.flatten(style);
  const baseFontSize = flatStyle?.fontSize || 16;
  const isBold = flatStyle?.fontWeight === 'bold';

  const fontStyle: TextStyle = {
    fontFamily: isDyslexicFont ? (isBold ? 'Lexend_700Bold' : 'Lexend_400Regular') : undefined,
    fontWeight: isDyslexicFont ? 'normal' : (isBold ? 'bold' : 'normal'),
    fontSize: baseFontSize * fontSizeMultiplier,
    lineHeight: (baseFontSize * fontSizeMultiplier) * 1.5,
    color: currentTheme.text,
  };

  const speak = () => {
    const stringContent = React.Children.toArray(children).join(' ');
    Speech.stop();
    Speech.speak(stringContent, { language: 'en-US' });
  };

  return (
    <View style={styles.container}>
      <Text 
        style={[styles.text, style, fontStyle]} // <-- Style order fixed
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
    // width: '100%', <-- THIS WAS THE BUG. IT IS NOW REMOVED.
  },
  text: {
    flex: 1, // Allow text to wrap
    paddingRight: 10,
  },
  speakButton: {
    padding: 5,
  },
});