"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import PropTypes from "prop-types";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";
import { useEffect } from "react";
import { gameStore, lobbyStore } from "@/app/(utils)/data-stores/gameStore";
import { playerStore } from "@/app/(utils)/data-stores/playerStore";

WinnerDialog.propTypes = {
  message: PropTypes.string,
  showReplayButton: PropTypes.bool,
};

export default function WinnerDialog({ message, showReplayButton }) {
  const router = useRouter();
  const { lobby, setLobby } = lobbyStore();
  const { setReadyStatus } = playerStore();
  const { client } = clientStore();

  useEffect(() => {
    const subscription = client.subscribe(
      "/topic/lobby/" + lobby.gameId,
      (response) => {
        const content = JSON.parse(response.body);
        setLobby(content);
        setReadyStatus(content.status);

        router.back();
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleReplay() {
    client.publish({
      destination: "/app/game/" + lobby.gameId + "/replay",
    });
  }

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <h1>{message}</h1>
        {showReplayButton ? (
          <button
            className={styles.replayButton}
            onClick={() => {
              handleReplay();
            }}
          >
            REPLAY
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
