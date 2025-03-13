import { create } from "zustand";

export const gameStore = create((set) => ({
  gameId: "",
  setGameId: (id) => set(() => ({ gameId: id })),
}));

export const gameListStore = create((set) => ({
  games: [],
  setGames: (games) => set(() => ({ games })),
}));
