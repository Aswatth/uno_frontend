const { create } = require("zustand");

export const playerStore = create((set) => ({
  playerName: "",
  setPlayerName: (name) => set(() => ({ playerName: name })),
}));
