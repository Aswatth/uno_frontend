"use client";

import styles from "./page.module.css";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gameStore } from "../(utils)/data-stores/gameStore";

export default function CreateGame() {
  const router = useRouter();
  const [gameName, setGameName] = useState("");
  const { setGameId } = gameStore();
  const { client } = clientStore();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
    }
  }, []);

  function handleGameCreation() {
    const gameData = { gameName: gameName, minPlayers: 2 };
    client.subscribe("/user/queue/game", (response) => {
      const gameId = response.body;
      setGameId(gameId);

      client.subscribe("/topic/join-game/" + gameId, () => {});
      client.publish({ destination: "/app/join-game/" + gameId });

      router.push("/game/" + gameId);
    });
    client.publish({
      destination: "/app/game",
      body: JSON.stringify(gameData),
    });
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create a game</h1>
      <input
        className={styles.gameName}
        value={gameName}
        maxLength={15}
        onChange={(e) => setGameName(e.target.value)}
      ></input>
      <button
        className={styles.button}
        onClick={() => {
          handleGameCreation();
        }}
      >
        create
      </button>
    </div>
  );
}
