// stores/lessonStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LessonState = {
  completedTopics: Set<string>;
  isTopicComplete: (id: string) => boolean;
  toggleTopicCompletion: (id: string) => void;
};

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      completedTopics: new Set(),
      
      isTopicComplete: (id) => {
        return get().completedTopics.has(id);
      },
      
      toggleTopicCompletion: (id) => {
        set((state) => {
          const newCompleted = new Set(state.completedTopics);
          if (newCompleted.has(id)) {
            newCompleted.delete(id);
          } else {
            newCompleted.add(id);
          }
          return { completedTopics: newCompleted };
        });
      },
    }),
    {
      name: 'lesson-completion-storage', // Name for the saved data
      
      // --- THIS IS THE CORRECTED PART ---
      storage: createJSONStorage(() => AsyncStorage, {
        // replacer is used when SAVING data (Set -> Array)
        replacer: (key, value) => {
          if (key === 'completedTopics' && value instanceof Set) {
            return Array.from(value);
          }
          return value;
        },
        // reviver is used when LOADING data (Array -> Set)
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