import styles from "./index.module.css";

export default function CharacterZone() {
  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        <div className={styles.CharacterItem}></div>
        <div className={styles.CharacterItem}></div>
        <div className={styles.CharacterItem}></div>
      </div>
    </div>
  );
}
