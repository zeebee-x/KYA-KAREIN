import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedItem, Event } from './types';

interface AppState {
  savedItems: SavedItem[];
  userEvents: Event[];
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (id: string) => void;
  isSaved: (id: string) => boolean;
  addUserEvent: (event: Event) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      savedItems: [],
      userEvents: [],
      addSavedItem: (item) =>
        set((state) => ({
          savedItems: state.savedItems.some((i) => i.id === item.id)
            ? state.savedItems
            : [...state.savedItems, item],
        })),
      removeSavedItem: (id) =>
        set((state) => ({
          savedItems: state.savedItems.filter((item) => item.id !== id),
        })),
      isSaved: (id) => get().savedItems.some((item) => item.id === id),
      addUserEvent: (event) =>
        set((state) => ({
          userEvents: [...state.userEvents, event],
        })),
    }),
    {
      name: 'kyakarein-storage',
    }
  )
);
