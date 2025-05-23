"use client";

import { useEffect, useState } from "react";
import { clientStore } from "../(utils)/data-stores/webSocketStore";
import { gameListStore, lobbyStore } from "../(utils)/data-stores/gameStore";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { playerStore } from "../(utils)/data-stores/playerStore";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

export default function BrowseGames() {
  const router = useRouter();
  const { setIsHost } = playerStore();
  const { setLobby } = lobbyStore();
  const { games, setGames } = gameListStore();

  const [filteredGames, setFilteredGames] = useState(games);
  const { client } = clientStore();

  useEffect(() => {
    if (client == null) {
      router.replace("/");
      return;
    }

    client.subscribe("/user/queue/browse-lobbies", (response) => {
      const availableGames = JSON.parse(response.body);
      setGames(availableGames);
      setFilteredGames(availableGames);
    });
    client.publish({ destination: "/app/browse-lobbies" });
  }, []);

  function joinGame(lobbyToJoin) {
    if (lobbyToJoin.currentPlayers.length >= lobbyToJoin.minPlayers) {
      toast.error("Cannot join. Party is full!");
      return;
    }
    client.subscribe("/topic/lobby/" + lobbyToJoin.gameId, (response) => {
      const lobby = JSON.parse(response.body);
      setLobby(lobby);
    });
    client.subscribe("/user/queue/host", (response) => {
      setIsHost(response.body == "true");
    });
    client.publish({ destination: "/app/join-lobby/" + lobbyToJoin.gameId });
    router.push("/games/" + lobbyToJoin.gameId + "/lobby");
  }

  return (
    <div className={styles.page}>
      <div>
        <Toaster></Toaster>
      </div>
      <div className={styles.menuBar}>
        <button
          className={styles.backButton}
          onClick={() => {
            router.back();
          }}
        >
          <IoIosArrowBack></IoIosArrowBack>
        </button>
        <h1 className={styles.title}>Browse games</h1>
      </div>
      <div className={styles.searchField}>
        <input
          placeholder="Search for games using game ID"
          onChange={(e) => {
            if (e.target.value.trim() != "") {
              setFilteredGames(
                games.filter((f) => f.gameId.startsWith(e.target.value))
              );
            } else {
              setFilteredGames(games);
            }
          }}
        ></input>
      </div>

      <ul>
        {filteredGames.map((m) => {
          return (
            <li key={m.gameId}>
              <div className={styles[`list-tile`]}>
                <div className={styles[`lt-title`]}>
                  <h3>{m.gameName}</h3>
                  <span>
                    Players: {m.currentPlayers.length} / {m.minPlayers}
                    <br></br> {m.gameId}
                  </span>
                </div>
                <button
                  className={styles[`join-button`]}
                  onClick={() => joinGame(m)}
                >
                  Join
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
