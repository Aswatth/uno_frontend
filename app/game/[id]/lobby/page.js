"use client";

import { useEffect, useState } from "react";
import { gameStore } from "../../../(utils)/data-stores/gameStore";
import { playerStore } from "@/app/(utils)/data-stores/playerStore";
import styles from "./page.module.css";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";
export default function Game() {
  const { game, setGame } = gameStore();
  const { isHost, isReady, setReadyStatus } = playerStore();
  const { client } = clientStore();
  const [isAllReady, setIsAllReady] = useState(false);

  useEffect(() => {
    client.subscribe("/topic/lobby/" + game.gameId, (result) => {
      const content = JSON.parse(result.body);
      setGame(content);
      let ready = true;
      content.currentPlayers.map((m) => {
        ready &= m.status;
      });
      setIsAllReady(ready);
    });
  }, []);

  const handleReady = () => {
    setReadyStatus(true);
    client.publish({
      destination: "/app/lobby/" + game.gameId + "/status",
      body: JSON.stringify({
        status: true,
      }),
    });
  };

  const handleNotReady = () => {
    setReadyStatus(false);
    client.publish({
      destination: "/app/lobby/" + game.gameId + "/status",
      body: JSON.stringify({
        status: false,
      }),
    });
  };

  function displayPlayers() {
    return (
      <ul>
        {game.currentPlayers.map((m) => {
          return (
            <li key={m.playerName}>
              <div className={styles[`list-tile`]}>
                <div className={styles[`lt-title`]}>
                  <h3>{m.playerName}</h3>
                  {m.status ? (
                    <span style={{ color: "green" }}>Ready</span>
                  ) : (
                    <span style={{ color: "red" }}>Not ready</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  function startGameButton() {
    return (
      <button className={styles.button} disabled={!isAllReady}>
        Start game
      </button>
    );
  }

  function readyButton() {
    if (!isHost) {
      return (
        <button
          className={`${styles.ready} ${styles.button}`}
          onClick={handleReady}
        >
          I am ready
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  function notReadyButton() {
    if (!isHost) {
      return (
        <button
          className={`${styles.notReady} ${styles.button}`}
          onClick={handleNotReady}
        >
          I am not ready
        </button>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.menuBar}>
        <h1 className={styles.title}>
          Game: <i>{game.gameName}</i>
        </h1>
      </div>
      <div className={styles.content}>
        {isHost ? startGameButton() : <div></div>}
        {!isReady && !isHost ? (
          <span>{readyButton()}</span>
        ) : (
          <span>{notReadyButton()}</span>
        )}
        {displayPlayers()}
      </div>
    </div>
  );
}
