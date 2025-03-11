"use client";

import { gameStore } from "../../(utils)/data-stores/gameStore";

export default function Game() {
  const { gameId } = gameStore();

  return (
    <div>
      <h1>Joined game: {gameId}</h1>
    </div>
  );
}
