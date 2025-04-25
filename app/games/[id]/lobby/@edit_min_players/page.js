"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./page.module.css";
import { IoClose } from "react-icons/io5";
import { lobbyStore } from "@/app/(utils)/data-stores/gameStore";
import { clientStore } from "@/app/(utils)/data-stores/webSocketStore";

EditMinPlayers.propTypes = {
  onClose: PropTypes.func,
};

export default function EditMinPlayers({ onClose }) {
  const { lobby } = lobbyStore();
  const [minPlayers, setMinPlayers] = useState(lobby.minPlayers);
  const { client } = clientStore();

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <h1 style={{ textTransform: "uppercase" }}>Edit minimum players</h1>
        <input
          className={styles.minPlayers}
          type="number"
          max={7}
          min={2}
          value={minPlayers}
          onChange={(e) => {
            let value = parseInt(e.target.value);

            if (value >= lobby.currentPlayers.length) {
              setMinPlayers(value);
            }
          }}
        ></input>
        <span style={{ fontStyle: "italic" }}>
          Cannot go below the current player count.
        </span>
        <button
          className={styles.updateButton}
          onClick={() => {
            client.publish({
              destination: `/app/lobby/${lobby.gameId}/edit-min-players`,
              body: minPlayers,
            });
            onClose();
          }}
        >
          UPDATE
        </button>
        <button className={styles.closeButton} onClick={() => onClose()}>
          <IoClose />
        </button>
      </div>
    </div>
  );
}
