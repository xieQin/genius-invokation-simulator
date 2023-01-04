import styles from "./index.module.css";

export default function CharacterZone() {
  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        <div className={styles.CharacterItem}>
          <img src="../../../public/images/noelle-card.png" alt="" />
        </div>
        <div className={styles.CharacterItem}>
          <img src="../../../public/images/ningguang-card.png" alt="" />
        </div>
        <div className={styles.CharacterItem}>
          <img src="../../../public/images/yoimiya-card.png" alt="" />
        </div>
      </div>
    </div>
  );
}
