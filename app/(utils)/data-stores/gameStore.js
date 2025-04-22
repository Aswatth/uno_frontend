import { create } from "zustand";

export const lobbyStore = create((set) => ({
  lobby: {},
  isAllReady: false,
  setLobby: (lobby) => {
    let ready = true;
    lobby.currentPlayers.map((m) => {
      ready &= m.status;
    });
    set(() => ({ isAllReady: ready, lobby: lobby }));
  },
}));

export const chatStore = create((set) => ({
  messageList: [],
  setMessageList: (messageList) => {
    set(() => ({
      messageList,
    }));
  },
}));

export const gameStore = create((set) => ({
  gameData: {},
  setGameData: (gameData) => {
    set(() => ({ gameData }));
  },
}));

export const gameListStore = create((set) => ({
  games: [],
  setGames: (games) => set(() => ({ games })),
}));
