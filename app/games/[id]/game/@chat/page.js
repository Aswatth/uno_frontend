"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { GrSend } from "react-icons/gr";
import { IoChatbubbles, IoClose } from "react-icons/io5";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";
import { chatStore, lobbyStore } from "@/app/(utils)/data-stores/gameStore";
import { playerStore } from "@/app/(utils)/data-stores/playerStore";

export default function GameChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { client } = clientStore();
  const { lobby } = lobbyStore();
  const [message, setMessage] = useState("");
  const { playerName } = playerStore();
  const { messageList, setMessageList } = chatStore();

  useEffect(() => {
    client.subscribe(`/user/queue/game/${lobby.gameId}/chat`, (response) => {
      const body = JSON.parse(response.body);
      setMessageList(body);
    });
  }, []);

  return (
    <div>
      {isChatOpen ? (
        <div className={styles.chatBox}>
          <div className={styles.title}>
            <h3>Chat</h3>
            <button onClick={() => setIsChatOpen(false)}>
              <IoClose></IoClose>
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messageList.map((m) => {
              console.log(m.sender);
              return (
                <div className={styles.message}>
                  <span>
                    <b>{m.sender + ": "}</b>
                  </span>
                  <span>{m.message}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.chatInput}>
            <input onChange={(e) => setMessage(e.target.value)} />
            <button
              onClick={() => {
                client.publish({
                  destination: `/app/game/${lobby.gameId}/chat`,
                  body: JSON.stringify({
                    sender: playerName,
                    message: message,
                  }),
                });
              }}
            >
              <GrSend />
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.chatIcon} onClick={() => setIsChatOpen(true)}>
          <IoChatbubbles />
        </button>
      )}
    </div>
  );
}
