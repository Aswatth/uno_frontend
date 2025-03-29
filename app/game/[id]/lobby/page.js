"use client";

import { useEffect } from "react";
import { gameStore } from "../../../(utils)/data-stores/gameStore";
import { playerStore } from "@/app/(utils)/data-stores/playerStore";
import styles from "./page.module.css";
export default function Game() {
  const { game } = gameStore();
  const { isHost } = playerStore();

  useEffect(() => {
  }, []);

  function displayPlayers() {
    return (
      <ul>
        {game.currentPlayers.map((m) => {
          return (
            <li key={m}>
              <div className={styles[`list-tile`]}>
                <div className={styles[`lt-title`]}>
                  <h3>{m}</h3>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  function startGameButton() {
    console.log(isHost);
    if (isHost) {
      return <button>Start game</button>;
    } else {
      return <div></div>;
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Game: <i>{game.gameName}</i> <span>{startGameButton()}</span>
      </h1>
      {displayPlayers()}
    </div>
  );
}
