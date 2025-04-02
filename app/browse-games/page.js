"use client";

import { useEffect } from "react";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { gameListStore, gameStore } from "../(utils)/data-stores/gameStore";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { playerStore } from "../(utils)/data-stores/playerStore";

export default function BrowseGames() {
  const router = useRouter();
  const { setIsHost } = playerStore();
  const { setGame } = gameStore();
  const { games, setGames } = gameListStore();
  const { client } = clientStore();

  useEffect(() => {
    client.subscribe("/user/queue/browse-lobbies", (response) => {
      setGames(JSON.parse(response.body));
    });
    client.publish({ destination: "/app/browse-lobbies" });
  }, []);

  function joinGame(gameToJoin) {
    if (gameToJoin.currentPlayers.length >= gameToJoin.minPlayers) {
      alert("Party is full");
      return;
    }
    client.subscribe("/topic/join-lobby/" + gameToJoin.gameId, (response) => {
      const game = JSON.parse(response.body);
      console.log("GAME: " + game);
      setGame(game);
    });
    client.subscribe("/user/queue/host", (response) => {
      setIsHost(response.body == "true");
    });
    client.publish({ destination: "/app/join-lobby/" + gameToJoin.gameId });
    router.push("/game/" + gameToJoin.gameId + "/lobby");
  }

  return (
    <div className={styles.page}>
      <div className={styles.menuBar}>
        <h1 className={styles.title}>Browse games</h1>
      </div>

      <ul>
        {games.map((m) => {
          return (
            <li key={m.gameId}>
              <div className={styles[`list-tile`]}>
                <div className={styles[`lt-title`]}>
                  <h3>{m.gameName}</h3>
                  <span>
                    Players: {m.currentPlayers.length} / {m.minPlayers}
                    <br></br> {m.gameId}
                  </span>
                </div>
                <button
                  className={styles[`join-button`]}
                  onClick={() => joinGame(m)}
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
