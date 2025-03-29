import { create } from "zustand";

export const gameStore = create((set) => ({
  game: {},
  setGame: (game) => set(() => ({ game })),
}));

export const gameListStore = create((set) => ({
  games: [],
  setGames: (games) => set(() => ({ games })),
}));
