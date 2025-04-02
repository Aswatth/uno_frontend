import { create } from "zustand";

export const gameStore = create((set) => ({
  game: {},
  isAllReady: false,
  setGame: (game) => {
    let ready = true;
    game.currentPlayers.map((m) => {
      ready &= m.status;
    });
    set(() => ({ isAllReady: ready, game: game }));
  },
}));

export const gameListStore = create((set) => ({
  games: [],
  setGames: (games) => set(() => ({ games })),
}));
