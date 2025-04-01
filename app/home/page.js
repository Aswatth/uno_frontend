"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <h1>UNO</h1>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          router.push("/create_game");
        }}
      >
        Create a game
      </button>
      <button
        className={styles.button}
        onClick={() => {
          router.push("/browse-games");
        }}
      >
        Join a game
      </button>
    </div>
  );
}
