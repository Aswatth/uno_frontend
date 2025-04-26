"use client";

import styles from "./page.module.css";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { lobbyStore } from "../(utils)/data-stores/gameStore";
import { playerStore } from "../(utils)/data-stores/playerStore";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

export default function CreateGame() {
  const router = useRouter();
  const { setIsHost } = playerStore();
  const [gameName, setGameName] = useState("");
  const [minPlayers, setMinPlayers] = useState(2);
  const { setLobby } = lobbyStore();
  const { client } = clientStore();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
    }
  }, []);

  function handleGameCreation() {
    if (gameName.trim() == "") {
      toast.error("Game name cannot be empty.");
      return;
    }
    if (minPlayers < 2 || minPlayers > 7) {
      toast.error("Player count should be between 2-7");
      return;
    }

    const lobbyData = { gameName: gameName, minPlayers: minPlayers };
    client.subscribe("/user/queue/lobby", (response) => {
      const gameId = response.body;

      client.subscribe("/topic/lobby/" + gameId, (response) => {
        const lobby = JSON.parse(response.body);
        setLobby(lobby);
      });
      client.subscribe("/user/queue/host", (response) => {
        setIsHost(response.body == "true");
      });
      client.publish({ destination: "/app/join-lobby/" + gameId });
      router.push("/games/" + gameId + "/lobby");
    });
    client.publish({
      destination: "/app/lobby",
      body: JSON.stringify(lobbyData),
    });
  }

  return (
    <div className={styles.page}>
      <Toaster position="bottom-center" />
      <button
        className={styles.backButton}
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowBack></IoIosArrowBack> Back
      </button>
      <h1 className={styles.title}>Create a game</h1>
      <div className={styles.inputs}>
        <label htmlFor="gameName" className={styles.label}>Game name</label>
        <input
          id="gameName"
          className={styles.gameName}
          value={gameName}
          maxLength={15}
          placeholder="Lets give a name for your game..."
          onChange={(e) => setGameName(e.target.value)}
        ></input>
        <label htmlFor="gameName" className={styles.label}>Minimum players</label>
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
          handleGameCreation();
        }}
      >
        create
      </button>
    </div>
  );
}
