// stores/lessonStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib'; // adjust if needed

type LessonState = {
  completedTopics: Set<string>;
  isTopicComplete: (id: string) => boolean;
  toggleTopicCompletion: (id: string) => Promise<void>;
  syncProgress: () => Promise<void>;
  clearProgress: () => void; // <-- ADD THIS
};


export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      // local state
      completedTopics: new Set(),

      isTopicComplete: (id) => {
        return get().completedTopics.has(id);
      },

      // toggles a topic and uploads to Supabase
      toggleTopicCompletion: async (id) => {
        // update locally
        set((state) => {
          const updated = new Set(state.completedTopics);

          if (updated.has(id)) {
            updated.delete(id);
          } else {
            updated.add(id);
          }

          return { completedTopics: updated };
        });

        // cloud sync
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;

        if (!user) return;

        const topicsArray = Array.from(get().completedTopics);

        const { error } = await supabase
          .from('profiles')
          .update({ completed_topics: topicsArray })
          .eq('id', user.id);

        if (error) {
          console.error('Error saving progress:', error);
        }
      },

      // downloads cloud progress and merges it locally
      syncProgress: async () => {
        const { data: auth } = await supabase.auth.getUser();
        const user = auth?.user;

        if (!user) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('completed_topics')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching progress:', error);
          return;
        }

        if (data?.completed_topics) {
          set({
            completedTopics: new Set(data.completed_topics),
          });
        }
      },

       clearProgress: () => {
        set({ completedTopics: new Set() });
      },

    }),
    

    {
      name: 'lesson-completion-storage',

      // handle Set <-> JSON conversions
      storage: createJSONStorage(() => AsyncStorage, {
        replacer: (key, value) => {
          if (key === 'completedTopics' && value instanceof Set) {
            return Array.from(value);
          }
          return value;
        },


        
        reviver: (key, value) => {
          if (key === 'completedTopics' && Array.isArray(value)) {
            return new Set(value);
          }
          return value;
        },
      }),
    }
  )
);
