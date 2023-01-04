import { useState } from "react";

import styles from "./index.module.css";

export default function DiceZone() {
  const [dice, setDice] = useState(4);

  return (
    <div className={styles.Dice}>
      <div className={styles.DiceNum}>{dice}</div>
      <div className={styles.DiceList}>
        <div className={styles.DiceListItem}>
          <img src="public/images/any-icon.png" alt="" />
        </div>
        <div className={styles.DiceListItem}>
          <img src="public/images/electro-icon.png" alt="" />
        </div>
        <div className={styles.DiceListItem}>
          <img src="public/images/electro-icon.png" alt="" />
        </div>
        <div className={styles.DiceListItem}>
          <img src="public/images/anemo-icon.png" alt="" />
        </div>
        <div className={styles.DiceListItem}>
          <img src="public/images/hydro-icon.png" alt="" />
        </div>
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
