import styles from "./index.module.css";

export default function PlayerZone() {
  return (
    <div className={styles.PlayerZone}>
      <div className={styles.PlayerContent}>
        <div className={styles.PlayerAvatar}></div>
        <div className={styles.PlayerInfo}>
          <div className={styles.PlayerName}>Lumin</div>
          <div className={styles.PlayerStatus}>Now Acting</div>
        </div>
      </div>
    </div>
  );
}
