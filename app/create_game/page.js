"use client";

import styles from "./page.module.css";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gameStore } from "../(utils)/data-stores/gameStore";
import { playerStore } from "../(utils)/data-stores/playerStore";

export default function CreateGame() {
  const router = useRouter();
  const { setIsHost } = playerStore();
  const [gameName, setGameName] = useState("");
  const [minPlayers, setMinPlayers] = useState(2);
  const { setGame } = gameStore();
  const { client } = clientStore();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
    }
  }, []);

  function handleGameCreation() {
    const gameData = { gameName: gameName, minPlayers: minPlayers };
    client.subscribe("/user/queue/lobby", (response) => {
      const gameId = response.body;

      client.subscribe("/topic/join-lobby/" + gameId, (response) => {
        const game = JSON.parse(response.body);
        setGame(game);
      });
      client.subscribe("/user/queue/host", (response) => {
        setIsHost(response.body == "true");
      });
      client.publish({ destination: "/app/join-lobby/" + gameId });
      router.push("/game/" + gameId + "/lobby");
    });
    client.publish({
      destination: "/app/lobby",
      body: JSON.stringify(gameData),
    });
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Create a game</h1>
      <div className={styles.inputs}>
        <input
          className={styles.gameName}
          value={gameName}
          maxLength={15}
          placeholder="Lets give a name for your game..."
          onChange={(e) => setGameName(e.target.value)}
        ></input>
        <input
          className={styles.minPlayers}
          type="number"
          max={7}
          min={2}
          value={minPlayers}
          onChange={(e) => setMinPlayers(parseInt(e.target.value))}
        ></input>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          // console.log({ gameName: gameName, minPlayers: minPlayers });
          handleGameCreation();
        }}
      >
        create
      </button>
    </div>
  );
}
