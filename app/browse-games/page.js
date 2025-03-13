"use client";

import { useEffect, useState } from "react";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { gameListStore, gameStore } from "../(utils)/data-stores/gameStore";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function BrowseGames() {
  const router = useRouter();
  const { setGameId } = gameStore();
  const { games, setGames } = gameListStore();
  const { client } = clientStore();

  useEffect(() => {
    client.subscribe("/user/queue/browse-games", (response) => {
      setGames(JSON.parse(response.body));
    });
    client.publish({ destination: "/app/browse-games" });
  }, []);

  function joinGame(gameId) {
    client.subscribe("/topic/join-game/" + gameId, (response) => {});
    client.publish({ destination: "/app/join-game/" + gameId });
    setGameId(gameId);
    router.push("/game/" + gameId);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Browse games</h1>
      <ul>
        {games.map((m) => {
          return (
            <li key={m.gameId}>
              <div className={styles[`list-tile`]}>
                <div className={styles[`lt-title`]}>
                  <h3>{m.gameName}</h3>
                  <p>
                    <i>{m.gameId}</i>
                  </p>
                </div>
                <button
                  className={styles[`join-button`]}
                  onClick={() => joinGame(m.gameId)}
                >
                  Join
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
