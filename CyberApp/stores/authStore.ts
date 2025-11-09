// stores/authStore.ts
import { create } from 'zustand';
import { supabase } from '@/lib';
import { Session } from '@supabase/supabase-js';

// Define a type for your user's profile
export type Profile = {
  id: string; // This matches your table
  // user_id: string; // We remove this
  role: 'consumer' | 'admin';
  // Add your other columns like 'completed_topics' if needed
};

type AuthState = {
  profile: Profile | null;
  session: Session | null;
  fetchUserProfile: (session: Session) => Promise<void>;
  signOut: () => Promise<void>;
  appOnLoad: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  session: null,

  fetchUserProfile: async (session: Session) => {
    if (!session) return;
    try {
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      set({ profile: data, session: session });

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ profile: null, session: null });
  },

  appOnLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await useAuthStore.getState().fetchUserProfile(session);
    }
  }
}));