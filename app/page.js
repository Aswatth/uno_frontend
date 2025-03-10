"use client";
import { playerStore } from "./(utils)/data-stores/playerStore";
import { WebSocket } from "./(utils)/web-socket";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const { playerName, setPlayerName } = playerStore();

  const wb_socket = WebSocket();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>UNO</h1>
      <input
        className={styles.playerName}
        value={playerName}
        maxLength={15}
        onChange={(e) => setPlayerName(e.target.value)}
      ></input>
      <button
        className={styles.button}
        onClick={() => {
          router.push("/home");
        }}
      >
        Continue
      </button>
    </div>
  );
}
