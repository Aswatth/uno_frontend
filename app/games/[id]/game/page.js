"use client";
import { gameStore } from "@/app/(utils)/data-stores/gameStore";

import styles from "./page.module.css";
import { TbCancel,TbCardsFilled } from "react-icons/tb";
import { MdSwapCalls } from "react-icons/md";

export default function Game() {
  const { gameData } = gameStore();

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
        return isValue ? (
          <MdSwapCalls style={{ fontSize: "0.5em", rotate: "30deg" }} />
        ) : (
          <MdSwapCalls style={{ marginTop: "5px" }} />
        );
      case "SKIP":
        return isValue ? (
          <TbCancel style={{ fontSize: "0.5em" }} />
        ) : (
          <TbCancel style={{ marginTop: "5px" }} />
        );
      case "DRAW4":
        return isValue ? (
          <TbCardsFilled
            style={{
              fontSize: "0.5em",
            }}
          />
        ) : (
          "+4"
        );
      case "DRAW2":
        return isValue ? (
          <TbCardsFilled
            style={{
              fontSize: "0.5em",
            }}
          />
        ) : (
          "+2"
        );
      case "WILD":
        return isValue ? (
          <TbCardsFilled
            style={{
              fontSize: "0.5em",
            }}
          />
        ) : (
          "W"
        );
    }
  }

  function createCard(card, position) {
    return (
      <div
        className={`${styles[getColor(card)]} ${styles.card}`}
        style={{ "--i": position }}
        onClick={() => {
          console.log(card);
        }}
      >
        <div className={styles.inner}>
          <span className={`${styles["top-left"]}`}>{getValue(card)}</span>
          <span className={styles.value}>{getValue(card, true)}</span>
          <span className={`${styles["bottom-right"]}`}>{getValue(card)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.cards}>
        {gameData.cards.map((m, index) => {
          return createCard(m, index - gameData.cards.length / 2);
        })}
      </div>
      <div className={`${styles.topCard}`}>
        {gameData.isMyTurn ? (
          <h1 className={styles.turnIndicator}>Your turn</h1>
        ) : (
          <div></div>
        )}
        {createCard(gameData.topCard, 0)}
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
    </div>
  );
}
