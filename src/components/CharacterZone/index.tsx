import styles from "./index.module.css";

export const CharacterItem = () => {
  return (
    <div className={styles.CharacterItem}>
      <div className={styles.CharacterHealth}>10</div>
      <div className={styles.CharacterEnergy}>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
      </div>
      <img src="public/images/yoimiya-card.png" alt="" />
    </div>
  );
};

export default function CharacterZone() {
  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        <CharacterItem />
        <CharacterItem />
        <CharacterItem />
      </div>
    </div>
  );
}
