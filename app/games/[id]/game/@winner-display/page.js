"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import PropTypes from "prop-types";

WinnerDialog.propTypes = {
  message: PropTypes.string,
  showReplayButton: PropTypes.bool,
};

export default function WinnerDialog({ message, showReplayButton }) {
  const router = useRouter();

  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <h1>{message}</h1>
        {showReplayButton ? (
          <button
            className={styles.replayButton}
            onClick={() => {
              router.back();
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
