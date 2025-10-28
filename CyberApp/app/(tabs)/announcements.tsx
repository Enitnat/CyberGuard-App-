import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Pressable 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#FFFFFF',
  textDark: '#000000',
  textLight: '#666666',
  border: '#EEEEEE',
  icon: '#0D1B2A',
};

const announcements = [
  { id: '1', label: 'New Lesson Available', description: 'Phishing 2.0 is now live!' },
  { id: '2', label: 'Security Alert', description: 'A new system-wide vulnerability was found...' },
  { id: '3', label: 'App Update', description: 'Version 1.1 is available with new features.' },
  { id: '4', label: 'Scheduled Maintenance', description: 'App will be down on Sunday from 2-3 AM.' },
  { id: '5', label: 'Tip of the Week', description: 'Remember to update your passwords.' },
];

type ItemProps = {
  label: string;
  description: string;
  onPress: () => void;
};

const AnnouncementItem = ({ label, description, onPress }: ItemProps) => (
  <Pressable style={styles.itemContainer} onPress={onPress}>
    <Ionicons name="shield-outline" size={24} color={COLORS.icon} style={styles.icon} />
    <View style={styles.textContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
    </View>
    <Ionicons name="arrow-up" size={18} color={COLORS.textLight} />
  </Pressable>
);

export default function AnnouncementsScreen() {
  const router = useRouter();

  const openAnnouncement = (id: string) => {
    console.log('Opening announcement:', id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Announcement', 
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={28} color={COLORS.textDark} />
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
          <Text style={styles.listHeader}>Announcement</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
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
    color: COLORS.textDark,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 20,
    marginRight: 20,
  },
});