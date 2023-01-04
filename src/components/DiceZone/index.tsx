import { useState } from "react";

import styles from "./index.module.css";

export default function DiceZone() {
  const [dice, setDice] = useState(0);

  return (
    <div className={styles.Dice}>
      <div className={styles.DiceNum}>{dice}</div>
      <div className={styles.DiceList}>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
        <div className={styles.DiceListItem}></div>
      </div>
    </div>
  );
}
