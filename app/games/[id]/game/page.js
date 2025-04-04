"use client";
import { gameStore, lobbyStore } from "@/app/(utils)/data-stores/gameStore";

import styles from "./page.module.css";
import { TbCancel, TbCardsFilled } from "react-icons/tb";
import { MdSwapCalls } from "react-icons/md";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";
import { useEffect, useState } from "react";
import ColorPicker from "./(color-picker-popup))/page";

export default function Game() {
  const { lobby } = lobbyStore();
  const { gameData, setGameData } = gameStore();
  const { client } = clientStore();
  const [isPickingColor, setIsPickingColor] = useState(false);
  const [selectedWildCard, setSelectedWildCard] = useState(null);
  const [didDrawACard, setDidDrawACard] = useState(false);

  useEffect(() => {
    const subscription = client.subscribe(
      "/user/queue/game/" + lobby.gameId,
      (resposne) => {
        const content = JSON.parse(resposne.body);
        setGameData(content);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function play(card) {
    if (!gameData.isMyTurn) return;

    if (card.cardColor == "WILD") {
      setIsPickingColor(true);
      setSelectedWildCard(card);
      return;
    }

    if (
      card.cardColor == gameData.topCard.cardColor ||
      card.cardValue == gameData.topCard.cardValue ||
      card.cardValue == "WILD" ||
      card.cardValue == "DRAW4" ||
      gameData.topCard.cardColor == "WILD"
    ) {
      setDidDrawACard(false);
      client.publish({
        destination: "/app/game/" + lobby.gameId + "/play",
        body: JSON.stringify(card),
      });
    }
  }

  function draw() {
    if (!didDrawACard && gameData.isMyTurn) {
      client.publish({
        destination: "/app/game/" + lobby.gameId + "/draw",
      });
      setDidDrawACard(true);
    }
  }

  function endTurn() {
    setDidDrawACard(false);
    client.publish({
      destination: "/app/game/" + lobby.gameId + "/endTurn",
    });
  }

  function getColor(card) {
    if (card.cardColor == "WILD") return "black";
    return card.cardColor.toLowerCase();
  }

  function getValue(card, isValue = false) {
    switch (card.cardValue) {
      case "ZERO":
        return "0";
      case "ONE":
        return "1";
      case "TWO":
        return "2";
      case "THREE":
        return "3";
      case "FOUR":
        return "4";
      case "FIVE":
        return "5";
      case "SIX":
        return "6";
      case "SEVEN":
        return "7";
      case "EIGHT":
        return "8";
      case "NINE":
        return "9";
      case "REVERSE":
        return <MdSwapCalls style={{ rotate: "30deg" }} />;
      case "SKIP":
        return <TbCancel />;
      case "DRAW4":
        return isValue ? <TbCardsFilled /> : "+4";
      case "DRAW2":
        return isValue ? <TbCardsFilled /> : "+2";
      case "WILD":
        return isValue ? <TbCardsFilled /> : "W";
    }
  }

  function createCard(card, position, canInteract = false) {
    return (
      <div
        className={`${styles[getColor(card)]} ${styles.card} ${
          canInteract ? `${styles.interact}` : ``
        }
        `}
        style={{ "--i": position }}
        onClick={() => {
          play(card);
        }}
      >
        <div className={styles.inner}>
          <span className={`${styles.corner} ${styles["top-left"]}`}>
            {getValue(card)}
          </span>
          <span className={styles.value}>{getValue(card, true)}</span>
          <span className={`${styles.corner} ${styles["bottom-right"]}`}>
            {getValue(card)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.deck}>
        <div
          className={`${styles.black} ${styles.card}
        `}
          style={{
            margin: "10px",
          }}
          onClick={() => draw()}
        >
          <div className={styles.inner}>
            <span
              className={styles.value}
              style={{
                fontSize: "40px",
                color: "#ecb405",
                background: "#d33a30",
              }}
            >
              UNO
            </span>
          </div>
        </div>
        <div className={styles.topCard} style={{ margin: "10px" }}>
          {createCard(gameData.topCard, 0)}
        </div>
      </div>
      <div className={styles.playArea}>
        <div style={{ display: "flex" }}>
          {gameData.isMyTurn ? (
            <h1 className={styles.turnIndicator}>YOUR TURN</h1>
          ) : (
            <div></div>
          )}
          {didDrawACard ? (
            <button className={styles.endTurnButton} onClick={() => endTurn()}>
              END TURN
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <div className={styles.cards}>
          {gameData.cards.map((m, index) => {
            return createCard(m, index - gameData.cards.length / 2, true);
          })}
        </div>
      </div>
      <div className={styles.otherPlayersInfo}>
        {gameData.otherPlayersInfo.map((o) => {
          return (
            <div
              className={
                o.isMyTurn ? styles.opponentTurnIndicator : styles["info-tile"]
              }
            >
              <h3>
                {o.playerName} {o.isMyTurn ? "'s turn" : ""}
              </h3>
              <p>Cards left: {o.cardCount}</p>
            </div>
          );
        })}
      </div>
      {isPickingColor ? (
        <ColorPicker
          onColorPick={(pickedColor) => {
            setIsPickingColor(false);
            const card = {
              cardColor: pickedColor,
              cardValue: selectedWildCard.cardValue,
            };
            play(card);
          }}
          onClose={() => {
            setIsPickingColor(false);
          }}
        ></ColorPicker>
      ) : (
        <div></div>
      )}
    </div>
  );
}
