"use client";

import { useEffect } from "react";
import { gameStore, lobbyStore } from "../../../(utils)/data-stores/gameStore";
import { playerStore } from "@/app/(utils)/data-stores/playerStore";
import styles from "./page.module.css";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";
import { useRouter } from "next/navigation";
import GameChat from "../game/@chat/page";

export default function Lobby() {
  const { lobby, setLobby, isAllReady } = lobbyStore();
  const { isHost, isReady, setReadyStatus } = playerStore();
  const { client } = clientStore();
  const { setGameData } = gameStore();
  const router = useRouter();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
      return;
    }
    const lobbySubscription = client.subscribe(
      "/topic/lobby/" + lobby.gameId,
      (result) => {
        const content = JSON.parse(result.body);
        setLobby(content);
      }
    );

    const startGameSubscription = client.subscribe(
      "/user/queue/game/" + lobby.gameId,
      (result) => {
        const content = JSON.parse(result.body);
        setGameData(content);
        router.push("/games/" + lobby.gameId + "/game");
      }
    );

    return () => {
      lobbySubscription.unsubscribe();
      startGameSubscription.unsubscribe();
    };
  }, []);

  const handleReady = () => {
    setReadyStatus(true);
    client.publish({
      destination: "/app/lobby/" + lobby.gameId + "/status",
      body: JSON.stringify({
        status: true,
      }),
    });
  };

  const handleNotReady = () => {
    setReadyStatus(false);
    client.publish({
      destination: "/app/lobby/" + lobby.gameId + "/status",
      body: JSON.stringify({
        status: false,
      }),
    });
  };

  function displayPlayers() {
    return (
      <ul>
        {lobby.currentPlayers.map((m) => {
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
      <button
        className={styles.button}
        disabled={
          !(isAllReady && lobby.currentPlayers.length == lobby.minPlayers)
        }
        onClick={() => {
          client.publish({
            destination: `/app/lobby/${lobby.gameId}/start`,
          });
        }}
      >
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

  function leaveGame() {
    client.publish({
      destination: "/app/leave-lobby/" + lobby.gameId,
    });
    router.replace("/home");
  }

  return (
    <div className={styles.page}>
      <div className={styles.menuBar}>
        <h1 className={styles.title}>
          Game: <i>{lobby.gameName}</i>
        </h1>
        <button className={styles.button} onClick={() => leaveGame()}>
          Leave game
        </button>
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
      <GameChat></GameChat>
    </div>
  );
}
