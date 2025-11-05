// stores/accessibilityStore.ts
import { create } from 'zustand';

// --- UPDATED THEMES ---
export const themes = {
  default: {
    bg: '#FFFFFF', // white
    text: '#0D1B2A', // dark blue
    card: '#F4F5F7', // light grey
    border: '#EEEEEE',
  },
  dyslexiaFriendly: {
    bg: '#FDFDF5', // Off-white
    text: '#0D1B2A', // dark blue
    card: '#F0F0E8',
    border: '#DDDDDD',
  },
  dark: {
    bg: '#0D1B2A', // dark blue
    text: '#FFFFFF', // white
    card: '#1B263B', // lighter blue
    border: '#3A4B5C',
  }
};
// --- ---

type ThemeName = keyof typeof themes;

type AccessibilityState = {
  isDyslexicFont: boolean;
  fontSizeMultiplier: number;
  theme: ThemeName;
  isDarkMode: boolean; 
  toggleDyslexicFont: () => void;
  setFontSize: (multiplier: number) => void;
  toggleDarkMode: () => void; 
  toggleDyslexiaTheme: () => void;
};

export const useAccessibilityStore = create<AccessibilityState>((set, get) => ({
  isDyslexicFont: false,
  fontSizeMultiplier: 1,
  theme: 'default',
  isDarkMode: false, 

  toggleDyslexicFont: () => 
    set((state) => ({ isDyslexicFont: !state.isDyslexicFont })),
    
  setFontSize: (multiplier) => 
    set({ fontSizeMultiplier: multiplier }),
    
  // Toggles Dark Mode on or off
  toggleDarkMode: () => {
    const isDark = !get().isDarkMode;
    set({ 
      isDarkMode: isDark,
      // Automatically set the theme
      theme: isDark ? 'dark' : 'default' 
    });
  },

  // Toggles Dyslexia Theme on or off
  toggleDyslexiaTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'dyslexiaFriendly' ? 'default' : 'dyslexiaFriendly';
    set({
      theme: newTheme,
      isDarkMode: false, // Turn off dark mode if this is enabled
    });
  }
}));