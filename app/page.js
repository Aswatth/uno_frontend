"use client";
import { playerStore } from "./(utils)/data-stores/playerStore";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { clientStore } from "./(utils)/data-stores/webSocketStore";
import { Client } from "@stomp/stompjs";

export default function App() {
  const router = useRouter();
  const { playerName, setPlayerName } = playerStore();
  const { setClient } = clientStore();

  function handleLogin() {
    const newClient = new Client({
      brokerURL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      connectHeaders: {
        username: playerName,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (frame) => {
        router.push("/home");
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
    });
    setClient(newClient);
    newClient.activate();
  }

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
        type="submit"
        onClick={() => handleLogin()}
      >
        Continue
      </button>
    </div>
  );
}
