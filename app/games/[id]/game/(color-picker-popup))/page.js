"use client";

import styles from "./page.module.css";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

ColorPicker.propTypes = {
  onColorPick: PropTypes.func,
  onClose: PropTypes.func
};

export default function ColorPicker({ onColorPick, onClose }) {
  return (
    <div className={styles.background}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={() => onClose()}><MdClose /></button>
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
