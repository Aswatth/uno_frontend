"use client";

import { useEffect, useRef, useState } from "react";
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

  const messageRef = useRef(message);
  const isChatOpenRef = useRef(isChatOpen);

  useEffect(() => {
    messageRef.current = message;
    isChatOpenRef.current = isChatOpen;
  }, [message, isChatOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == " ") {
        setIsChatOpen(true);
      }
      if (e.key == "Escape") {
        setIsChatOpen(false);
      }
      if (e.key == "Enter" && isChatOpenRef.current) {
        handleMessageSend();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMessageSend = () => {
    if (messageRef.current.trim() != "") {
      client.publish({
        destination: `/app/game/${lobby.gameId}/chat`,
        body: JSON.stringify({
          sender: playerName,
          message: messageRef.current,
        }),
      });
      setMessage("");
    }
  };

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
            <input
              value={message}
              autoFocus={true}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={handleMessageSend}>
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
