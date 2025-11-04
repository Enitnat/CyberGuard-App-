// app/(tabs)/index.tsx
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { useRouter } from 'expo-router';
import { AccessibleText } from '@/components/AccessibleText';

// --- Custom Header Component (with Centering Fix) ---
const CustomHeader = () => {
  const router = useRouter();
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  
  return (
    <View style={[styles.headerContainer, { backgroundColor: currentTheme.bg }]}>
      
      {/* 1. Left Button */}
      <Pressable style={styles.headerButton} onPress={() => router.push('/settings')}>
        <Ionicons name="settings-outline" size={28} color={currentTheme.text} />
      </Pressable>
      
      {/* 2. Center Title (with flex: 1) */}
      <View style={styles.headerTitleContainer}>
        <AccessibleText style={styles.headerTitle} showSpeakButton={false}>
          Welcome!
        </AccessibleText>
      </View>
      
      {/* 3. Right Placeholder (to balance the layout) */}
      <View style={styles.headerButton} /> 
    </View>
  );
};

// --- Main Home Screen Component ---
export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme]; 
  
  const goToLessons = () => {
    router.push('/lessons');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* All your cards... */}
        <Pressable style={[styles.continueCard, {backgroundColor: '#3A86FF'}]} onPress={goToLessons}>
          <AccessibleText style={styles.continueTitle} showSpeakButton={false}>Continue Learning</AccessibleText>
          <AccessibleText style={styles.continueSubtitle} showSpeakButton={false}>Next up: Phishing Awareness</AccessibleText>
          <Ionicons name="play-circle" size={48} color="#FFFFFF" style={styles.continueIcon} />
        </Pressable>

        <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: currentTheme.card }]}>
            <AccessibleText style={styles.statEmoji} showSpeakButton={false}>🔥</AccessibleText>
            <AccessibleText style={styles.statValue} showSpeakButton={false}>5 Day</AccessibleText>
            <AccessibleText style={[styles.statLabel, { color: currentTheme.text }]} showSpeakButton={false}>Streak</AccessibleText>
          </View>
          <View style={[styles.statBox, { backgroundColor: currentTheme.card }]}>
            <AccessibleText style={styles.statEmoji} showSpeakButton={false}>🏆</AccessibleText>
            <AccessibleText style={styles.statValue} showSpeakButton={false}>1,200</AccessibleText>
            <AccessibleText style={[styles.statLabel, { color: currentTheme.text }]} showSpeakButton={false}>Total XP</AccessibleText>
          </View>
        </View>

        <View style={[styles.tipCard, { backgroundColor: currentTheme.card }]}>
          <AccessibleText style={styles.tipTitle} showSpeakButton={false}>Daily Security Tip</AccessibleText>
          <AccessibleText style={styles.tipBody}>
            Never use public Wi-Fi for sensitive activities like banking or shopping.
            Use your mobile data instead!
          </AccessibleText>
        </View> 

      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  // --- HEADER STYLES (UPDATED) ---
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerButton: {
    width: 32, // Give a fixed width
    alignItems: 'flex-start',
  },
  headerTitleContainer: {
    flex: 1, // Let the title take up the middle space
    alignItems: 'center', // Center the text
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  // --- END HEADER STYLES ---
  contentContainer: {
    padding: 16,
  },
  continueCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  continueTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  continueSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  continueIcon: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -24 }],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statEmoji: {
    fontSize: 28,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  tipCard: {
    borderRadius: 15,
    padding: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipBody: {
    fontSize: 16,
    lineHeight: 22,
  },
});