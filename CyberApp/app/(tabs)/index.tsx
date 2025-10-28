import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const COLORS = {
  background: '#FFFFFF',
  darkBlue: '#0D1B2A',
  lightBlue: '#3A86FF',
  white: '#FFFFFF',
  textDark: '#000000',
  textLight: '#999',
  cardBackground: '#F4F5F7',
};

const CustomHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Pressable>
        <Ionicons name="menu" size={32} color={COLORS.textDark} />
      </Pressable>
      <Text style={styles.headerTitle}>Welcome!</Text>
      <Pressable style={styles.profileIcon}>
        <Text style={styles.profileIconText}>A</Text>
      </Pressable>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();

const goToLessons = () => {
  router.push('/lessons'); 
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* --- 2. Continue Learning Card --- */}
        <Pressable style={styles.continueCard} onPress={goToLessons}>
          <Text style={styles.continueTitle}>Continue Learning</Text>
          <Text style={styles.continueSubtitle}>Next up: Phishing Awareness</Text>
          <Ionicons name="play-circle" size={48} color={COLORS.white} style={styles.continueIcon} />
        </Pressable>

        {/* --- 3. Your Stats Section --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>5 Day</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🏆</Text>
            <Text style={styles.statValue}>1,200</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        {/* --- 4. Daily Tip Card --- */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Daily Security Tip</Text>
          <Text style={styles.tipBody}>
            Never use public Wi-Fi for sensitive activities like banking or shopping.
            Use your mobile data instead!
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  continueCard: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
  },
  continueTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  continueSubtitle: {
    fontSize: 16,
    color: COLORS.white,
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
    backgroundColor: COLORS.cardBackground,
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
    color: COLORS.textDark,
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  tipCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 10,
  },
  tipBody: {
    fontSize: 16,
    color: COLORS.textDark,
    lineHeight: 22,
  },
});