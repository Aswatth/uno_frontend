"use client";

import styles from "./page.module.css";
import PropTypes from "prop-types";

ColorPicker.propTypes = {
  onColorPick: PropTypes.func,
};

export default function ColorPicker({ onColorPick }) {
  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <div className={styles.title}>
          <h1>PICK A COLOR</h1>
        </div>
        <div className={styles.content}>
          <button
            className={`${styles.button} ${styles.red}`}
            onClick={() => onColorPick("RED")}
          ></button>
          <button
            className={`${styles.button} ${styles.yellow}`}
            onClick={() => onColorPick("YELLOW")}
          ></button>
          <button
            className={`${styles.button} ${styles.green}`}
            onClick={() => onColorPick("GREEN")}
          ></button>
          <button
            className={`${styles.button} ${styles.blue}`}
            onClick={() => onColorPick("BLUE")}
          ></button>
        </div>
      </div>
    </div>
  );
}
