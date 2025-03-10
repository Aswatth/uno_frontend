import { create } from "zustand";

export const gameNameStore = create((set) => ({
  gameName: "",
  setGameName: (name) => set(() => ({ gameName: name })),
}));
