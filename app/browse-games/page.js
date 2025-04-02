"use client";

import { useEffect } from "react";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { gameListStore, lobbyStore } from "../(utils)/data-stores/gameStore";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { playerStore } from "../(utils)/data-stores/playerStore";

export default function BrowseGames() {
  const router = useRouter();
  const { setIsHost } = playerStore();
  const { setLobby } = lobbyStore();
  const { games, setGames } = gameListStore();
  const { client } = clientStore();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
      return;
    }

    client.subscribe("/user/queue/browse-lobbies", (response) => {
      setGames(JSON.parse(response.body));
    });
    client.publish({ destination: "/app/browse-lobbies" });
  }, []);

  function joinGame(lobbyToJoin) {
    if (lobbyToJoin.currentPlayers.length >= lobbyToJoin.minPlayers) {
      alert("Party is full");
      return;
    }
    client.subscribe("/topic/join-lobby/" + lobbyToJoin.gameId, (response) => {
      const lobby = JSON.parse(response.body);
      setLobby(lobby);
    });
    client.subscribe("/user/queue/host", (response) => {
      setIsHost(response.body == "true");
    });
    client.publish({ destination: "/app/join-lobby/" + lobbyToJoin.gameId });
    router.push("/games/" + lobbyToJoin.gameId + "/lobby");
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
