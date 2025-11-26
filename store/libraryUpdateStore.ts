import { create } from "zustand";

interface LibraryUpdateStore {
  needsUpdate: boolean;
  setNeedsUpdate: (value: boolean) => void;
}

export const useLibraryUpdateStore = create<LibraryUpdateStore>((set) => ({
  needsUpdate: false,
  setNeedsUpdate: (value) => set({ needsUpdate: value }),
}));
