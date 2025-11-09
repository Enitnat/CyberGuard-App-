import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  FlatList, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib';

type Ticket = {
  id: number;
  created_at: string;
  user_id: string;
  subject: string;
  description: string;
  status: string;
};
type Reply = {
  id: number;
  created_at: string;
  message: string;
  user_id: string; 
};

export default function MyTicketDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile } = useAuthStore();
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    
    const { data: ticketData, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (ticketError) {
      Alert.alert('Error', 'Could not fetch ticket details.');
      router.back();
      return;
    }
    
    setTicket(ticketData);

    const { data: repliesData, error: repliesError } = await supabase
      .from('ticket_replies')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });

    if (repliesData) {
      setReplies(repliesData);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: `Ticket #${id}`,
          headerStyle: { backgroundColor: currentTheme.card },
          headerTitleStyle: { color: currentTheme.text, fontFamily: isDyslexicFont ? 'Lexend_700Bold' : undefined },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{paddingLeft: 10}}>
              <Ionicons name="arrow-back" size={28} color={currentTheme.text} />
            </Pressable>
          ),
        }}
      />
      
      <FlatList
        data={replies}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={[styles.ticket, { backgroundColor: currentTheme.card, borderColor: currentTheme.border }]}>
            <AccessibleText style={styles.ticketSubject} showSpeakButton={false}>{ticket?.subject}</AccessibleText>
            <AccessibleText style={styles.ticketStatus}>Status: {ticket?.status}</AccessibleText>
            <AccessibleText style={styles.ticketDescription}>{ticket?.description}</AccessibleText>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[
            styles.reply, 
            item.user_id === profile?.id ? styles.myReply : styles.theirReply
          ]}>
            <AccessibleText style={item.user_id === profile?.id ? {color: '#FFFFFF'} : {color: '#000000'}}>
              {item.message}
            </AccessibleText>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            <AccessibleText>No replies yet.</AccessibleText>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContainer: { padding: 20 },
  ticket: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    gap: 5,
  },
  ticketSubject: { fontSize: 20, fontWeight: 'bold' },
  ticketStatus: { fontSize: 16, fontStyle: 'italic', marginBottom: 10 },
  ticketDescription: { fontSize: 16, marginTop: 10 },
  
  reply: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myReply: {
    backgroundColor: '#3A86FF', 
    alignSelf: 'flex-end',
  },
  theirReply: {
    backgroundColor: '#E0E0E0', 
    alignSelf: 'flex-start',
  },
});