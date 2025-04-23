import { create } from 'zustand';

interface SettingsState {
  buttonCount: number;
  bombCount: number;
  setButtonCount: (count: number) => void;
  setBombCount: (count: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  buttonCount: 16,
  bombCount: 1,
  setButtonCount: (count) => set({ buttonCount: count }),
  setBombCount: (count) => set({ bombCount: count }),
}));
