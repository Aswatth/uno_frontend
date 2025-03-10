const { create } = require("zustand");

export const clientStore = create((set) => ({
  client: null,
  setClient: (client) => set(() => ({ client })),
}));
