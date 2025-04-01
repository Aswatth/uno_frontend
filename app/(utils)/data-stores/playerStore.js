const { create } = require("zustand");

export const playerStore = create((set) => ({
  playerName: "",
  isHost: false,
  isReady: false,
  setPlayerName: (name) => set(() => ({ playerName: name })),
  setIsHost: (isHost) => set(() => ({ isHost: isHost })),
  setReadyStatus: (isReady) => set(() => ({isReady: isReady})),
}));
