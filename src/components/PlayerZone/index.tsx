import { CSSProperties } from "react";

import { IPlayer, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export default function PlayerZone(props: {
  style?: CSSProperties;
  player: IPlayer;
}) {
  const { player } = props;
  return (
    <div
      className={`${styles.PlayerZone} ${
        player.position === PlayerPosition.Opposite ? styles.Opposite : ""
      }`}
      {...props}
    >
      <div className={styles.PlayerContent}>
        <div className={styles.PlayerAvatar}></div>
        <div className={styles.PlayerInfo}>
          <div className={styles.PlayerName}>{player.name}</div>
          <div className={styles.PlayerStatus}>Now Acting</div>
        </div>
      </div>
    </div>
  );
}
