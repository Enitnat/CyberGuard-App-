// app/admin-ticket/[id].tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  FlatList, 
  Alert, 
  ActivityIndicator, 
  TextInput,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/lib';

// Types
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
  user_id: string; // ID of the admin who replied
};

export default function AdminTicketDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile } = useAuthStore();
  const { theme, isDyslexicFont } = useAccessibilityStore();
  const currentTheme = themes[theme];

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newReply, setNewReply] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    setLoading(true);
    
    // 1. Fetch the ticket itself
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
    setNewStatus(ticketData.status);

    // 2. Fetch all replies for this ticket
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

  const handleSendReply = async () => {
    if (!newReply || !profile) return;

    const { error } = await supabase
      .from('ticket_replies')
      .insert({
        ticket_id: id,
        user_id: profile.id, // The admin's profile ID
        message: newReply,
      });

    if (error) {
      Alert.alert('Error', 'Could not send reply.');
    } else {
      setNewReply('');
      fetchTicketDetails(); // Refresh the whole list
    }
  };

  const handleChangeStatus = async () => {
    if (!newStatus) return;

    const { error } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      Alert.alert('Error', 'Could not update status.');
    } else {
      Alert.alert('Success', 'Status updated.');
      fetchTicketDetails(); // Refresh
    }
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
            <AccessibleText style={styles.ticketDescription}>{ticket?.description}</AccessibleText>
            <AccessibleText style={styles.ticketUser}>User: {ticket?.user_id}</AccessibleText>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.reply, item.user_id === profile?.id ? styles.myReply : styles.theirReply]}>
            <AccessibleText>{item.message}</AccessibleText>
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.adminControls, { backgroundColor: currentTheme.card }]}>
            {/* --- Status Control --- */}
            <AccessibleText style={styles.controlLabel}>Change Status</AccessibleText>
            <View style={styles.statusContainer}>
              {['new', 'in_progress', 'closed'].map((status) => (
                <Pressable 
                  key={status}
                  style={[
                    styles.statusButton, 
                    newStatus === status ? styles.statusActive : {backgroundColor: currentTheme.bg}
                  ]}
                  onPress={() => setNewStatus(status)}
                >
                  <AccessibleText 
                    style={[styles.statusText, newStatus === status && styles.statusTextActive]} 
                    showSpeakButton={false}
                  >
                    {status}
                  </AccessibleText>
                </Pressable>
              ))}
            </View>
            <Pressable style={[styles.submitButton, {marginTop: 10}]} onPress={handleChangeStatus}>
              <AccessibleText style={styles.submitButtonText} showSpeakButton={false}>Update Status</AccessibleText>
            </Pressable>
            
            {/* --- Reply Control --- */}
            <AccessibleText style={styles.controlLabel}>Send Reply</AccessibleText>
            <TextInput
              style={[styles.input, { backgroundColor: currentTheme.bg, color: currentTheme.text }]}
              value={newReply}
              onChangeText={setNewReply}
              placeholder="Write your reply..."
              placeholderTextColor="#999"
              multiline
            />
            <Pressable style={styles.submitButton} onPress={handleSendReply}>
              <AccessibleText style={styles.submitButtonText} showSpeakButton={false}>Send Reply</AccessibleText>
            </Pressable>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContainer: { padding: 20 },
  ticket: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    gap: 5,
  },
  ticketSubject: { fontSize: 20, fontWeight: 'bold' },
  ticketDescription: { fontSize: 16, marginTop: 10 },
  ticketUser: { fontSize: 12, marginTop: 10, opacity: 0.7 },
  
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
  
  adminControls: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  controlLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3A86FF',
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  statusActive: {
    backgroundColor: '#3A86FF',
  },
  statusText: {
    fontWeight: 'bold',
  },
  statusTextActive: {
    color: '#FFFFFF',
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#3A86FF',
    padding: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});