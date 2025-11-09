// app/(tabs)/announcements.tsx
import React from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore'; // <-- IMPORT
import { AccessibleText } from '@/components/AccessibleText'; // <-- IMPORT

// --- Mock Data (Unchanged) ---
const announcements = [
  { id: '1', label: 'New Lesson Available', description: 'Phishing 2.0 is now live!' },
  { id: '2', label: 'Security Alert', description: 'A new system-wide vulnerability was found...' },
  { id: '3', label: 'App Update', description: 'Version 1.1 is available with new features.' },
];

// --- Single Announcement Item Component ---
type ItemProps = {
  label: string;
  description: string;
  onPress: () => void;
};

const AnnouncementItem = ({ label, description, onPress }: ItemProps) => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];

  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <Ionicons name="shield-outline" size={24} color={currentTheme.text} style={styles.icon} />
      <View style={styles.textContainer}>
        <AccessibleText style={styles.itemLabel} showSpeakButton={false}>{label}</AccessibleText>
        <AccessibleText style={styles.itemDescription}>{description}</AccessibleText>
      </View>
      <Ionicons name="arrow-up" size={18} color={currentTheme.text} />
    </Pressable>
  );
};

// --- Main Announcements Screen ---
export default function AnnouncementsScreen() {
  const router = useRouter();
  const { theme, isDyslexicFont } = useAccessibilityStore(); // <-- GET THEME
  const currentTheme = themes[theme]; // <-- GET COLORS

  const openAnnouncement = (id: string) => {
    console.log('Opening announcement:', id);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Announcements',
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }} 
      />
      
      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <AnnouncementItem 
            label={item.label} 
            description={item.description} 
            onPress={() => openAnnouncement(item.id)}
          />
        )}
        ListHeaderComponent={
          <AccessibleText style={styles.listHeader}>Announcement</AccessibleText>
        }
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: currentTheme.border }]} />}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginLeft: 20,
    marginRight: 20,
  },
});