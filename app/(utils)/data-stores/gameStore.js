import { create } from "zustand";

export const gameStore = create((set) => ({
  gameId: "",
  setGameId: (id) => set(() => ({ gameId: id })),
}));
