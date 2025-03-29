const { create } = require("zustand");

export const playerStore = create((set) => ({
  playerName: "",
  isHost: false,
  setPlayerName: (name) => set(() => ({ playerName: name })),
  setIsHost: (isHost) => set(() => ({ isHost: isHost })),
}));
