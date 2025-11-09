import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Text, 
  TextInput, 
  Pressable, 
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useAccessibilityStore, themes } from '@/stores/accessibilityStore';
import { AccessibleText } from '@/components/AccessibleText';
import { supabase } from '@/lib'; 
import { useAuthStore } from '@/stores/authStore'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { theme } = useAccessibilityStore();
  const currentTheme = themes[theme];
  const fetchUserProfile = useAuthStore((state) => state.fetchUserProfile);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [mode]);

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Success!', 'Please check your email to confirm your account.');
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else if (data.session) {
      await fetchUserProfile(data.session);
      router.replace('/(tabs)');
    }
    setLoading(false);
  };
  
  const onForgotPasswordPressed = () => {
    Alert.alert('Forgot Password?', 'This will navigate to a password reset screen.');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentTheme.bg }]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
            />
            <AccessibleText style={styles.logoText} showSpeakButton={false}>CYBERSAFE</AccessibleText>
            <AccessibleText style={styles.logoSubtitle} showSpeakButton={false}>
              SECURE KNOWLEDGE & INFORMATION FOR BETTER INCLUSIVE DIGITAL INITIATIVE
            </AccessibleText>
          </View>

          <View style={[styles.toggleContainer, { backgroundColor: currentTheme.card }]}>
            <Pressable
              style={[
                styles.toggleButton,
                mode === 'login' ? styles.toggleButtonActive : {},
              ]}
              onPress={() => setMode('login')}>
              <Text style={[styles.toggleText, {color: currentTheme.text}]}>
                Login
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.toggleButton,
                mode === 'signup' ? styles.toggleButtonActive : {},
              ]}
              onPress={() => setMode('signup')}>
              <Text style={[styles.toggleText, {color: currentTheme.text}]}>
                Sign Up
              </Text>
            </Pressable>
          </View>

          <View style={[styles.formContainer, { backgroundColor: currentTheme.card }]}>
            <AccessibleText style={styles.label} showSpeakButton={false}>Email</AccessibleText>
            <TextInput
              style={[styles.input, { backgroundColor: currentTheme.bg, color: currentTheme.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AccessibleText style={styles.label} showSpeakButton={false}>Password</AccessibleText>
            <TextInput
              style={[styles.input, { backgroundColor: currentTheme.bg, color: currentTheme.text }]}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
            />

            <Pressable 
              style={styles.signInButton} 
              onPress={mode === 'login' ? handleSignIn : handleSignUp}
              disabled={loading}
            >
              <Text style={styles.signInButtonText}>
                {loading ? 'Loading...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
              </Text>
            </Pressable>

            {mode === 'login' && (
              <Pressable style={styles.forgotPasswordButton} onPress={onForgotPasswordPressed}>
                <Text style={[styles.forgotPasswordText, { color: currentTheme.text }]}>Forgot password?</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoSubtitle: {
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 50,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#3A86FF',
    borderRadius: 50,
  },
  toggleText: {
    fontWeight: 'bold',
  },
  formContainer: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginTop: -20,
    zIndex: -1,
    paddingTop: 40,
    paddingBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#3A86FF',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
});