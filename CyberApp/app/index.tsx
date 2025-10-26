// app/index.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  Text, 
  TextInput, 
  Pressable, 
  StatusBar,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';

// --- Colors ---
const COLORS = {
  background: '#FFFFFF',
  darkBlue: '#0D1B2A',     // The form background
  inputBlue: '#1B263B',     // The input field background
  activeBlue: '#3A86FF',    // The active tab and button blue
  textLight: '#E0E1DD',
  textDark: '#000000',
  textWhite: '#FFFFFF',
};
// --- ---

export default function LoginScreen() {
  const [email, setEmail] = useState('TIPQC@tip.edu.ph');
  const [password, setPassword] = useState('************');
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();

  const onSignInPressed = () => {
    console.log('Email:', email, 'Password:', password);
    
    // On success, navigate to the "home" screen
    // We replace the login screen so the user can't go "back" to it
    router.replace('/(tabs)'); // <-- UPDATED
  };
  
  const onForgotPasswordPressed = () => {
    Alert.alert('Forgot Password?', 'This will navigate to a password reset screen.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Hide the header for this screen */}
      <Stack.Screen options={{ headerShown: false }} /> 
      
      <View style={styles.logoContainer}>
        {/* Make sure your logo is in 'assets/images/your-logo.png' */}
        <Image
          source={require('@/assets/images/logo.png')} // <-- REPLACE THIS
          style={styles.logo}
        />
        <Text style={styles.logoText}>CYBERSAFE</Text>
        <Text style={styles.logoSubtitle}>
          SECURE KNOWLEDGE & INFORMATION FOR BETTER INCLUSIVE DIGITAL INITIATIVE
        </Text>
      </View>

      {/* --- Login / Sign Up Toggle --- */}
      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            activeTab === 'login' ? styles.toggleButtonActive : {},
          ]}
          onPress={() => setActiveTab('login')}>
          <Text
            style={[
              styles.toggleText,
              activeTab === 'login' ? styles.toggleTextActive : {},
            ]}>
            Login
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.toggleButton,
            activeTab === 'signup' ? styles.toggleButtonActive : {},
          ]}
          onPress={() => setActiveTab('signup')}>
          <Text
            style={[
              styles.toggleText,
              activeTab === 'signup' ? styles.toggleTextActive : {},
            ]}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      {/* --- Form --- */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry // Hides the password
        />

        <Pressable style={styles.signInButton} onPress={onSignInPressed}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </Pressable>

        <Pressable style={styles.forgotPasswordButton} onPress={onForgotPasswordPressed}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.textDark,
  },
  logoSubtitle: {
    fontSize: 10,
    color: COLORS.textDark,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
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
    backgroundColor: COLORS.activeBlue,
    borderRadius: 50,
  },
  toggleText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
  },
  toggleTextActive: {
    color: COLORS.textWhite,
  },
  formContainer: {
    backgroundColor: COLORS.darkBlue,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginTop: -20, // Pulls the form up to overlap the toggle
    zIndex: -1,     // Sits behind the toggle
    paddingTop: 40, // Add padding to account for the overlap
  },
  label: {
    color: COLORS.textWhite,
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.inputBlue,
    color: COLORS.textLight,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: COLORS.activeBlue,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  signInButtonText: {
    color: COLORS.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: COLORS.textWhite,
    textDecorationLine: 'underline',
  },
});