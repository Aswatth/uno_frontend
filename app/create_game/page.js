"use client";

import styles from "./page.module.css";
import { playerStore } from "../(utils)/data-stores/playerStore";
import { gameNameStore } from "../(utils)/data-stores/gameStore";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { useState } from "react";

export default function CreateGame() {
  const { gameName, setGameName } = gameNameStore();
  const { playerName } = playerStore();
  const { client } = clientStore();

  function handleGameCreation() {
    const subscription = client.subscribe("/topic/ping", (response) => {
      console.log(response.body);
    });

    console.log(playerName + " created a game: " + gameName);

    client.publish({
      destination: "/app/ping",
      body: "it's working",
    });

    // subscription.unsubscribe();
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
