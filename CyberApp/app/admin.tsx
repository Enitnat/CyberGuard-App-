// app/admin.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, FlatList, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib';

// Define the type for a ticket
type Ticket = {
  id: number;
  created_at: string;
  user_id: string;
  subject: string;
  description: string;
  status: string;
};

// --- Single Ticket Item Component ---
const TicketItem = ({ item }: { item: Ticket }) => {
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  const router = useRouter(); // <-- 1. Get router

  // --- 2. Create navigation function ---
  const onPress = () => {
    router.push({
      pathname: '/admin-ticket/[id]',
      params: { id: item.id.toString() }
    });
  };
  
  return (
    // --- 3. Make it pressable ---
    <Pressable 
      onPress={onPress} 
      style={[styles.ticket, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}
    >
      <AccessibleText style={styles.ticketSubject} showSpeakButton={false}>{item.subject}</AccessibleText>
      <AccessibleText style={styles.ticketStatus}>Status: {item.status}</AccessibleText>
      <AccessibleText style={styles.ticketDescription} numberOfLines={2}>{item.description}</AccessibleText>
      <AccessibleText style={styles.ticketUser}>User: {item.user_id}</AccessibleText>
    </Pressable>
  );
};

export default function AdminScreen() {
  const router = useRouter();
  const { profile } = useAuthStore();
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // --- PROTECTION & DATA FETCHING ---
  useEffect(() => {
    if (profile) { 
      if (profile.role !== 'admin') {
        Alert.alert('Access Denied', 'You do not have permission to view this page.');
        router.replace('/(tabs)');
      } else {
        fetchTickets();
      }
    }
  }, [profile]);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false }); 

    if (error) {
      Alert.alert('Error fetching tickets', error.message);
    } else {
      setTickets(data);
    }
    setLoading(false);
  };
  // --- END ---

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Admin Dashboard',
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }}
      />
      {loading ? (
        <ActivityIndicator size="large" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TicketItem item={item} />}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={{alignItems: 'center', marginTop: 50}}>
              <AccessibleText>No tickets found.</AccessibleText>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  ticket: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    gap: 5,
  },
  ticketSubject: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketStatus: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  ticketDescription: {
    fontSize: 16,
  },
  ticketUser: {
    fontSize: 12,
    marginTop: 10,
    opacity: 0.7,
  }
});