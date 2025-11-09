// lib.ts
import 'react-native-url-polyfill/auto'; // Fixes a common URL bug
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dttmhjiorhkpabfagtdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dG1oamlvcmhrcGFiZmFndGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mzg3OTYsImV4cCI6MjA3ODIxNDc5Nn0.Km76X880sEb1OgQvXsTSyMYjxA-z0l4lUA0ajvH2Y-s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage to store the user's session
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});