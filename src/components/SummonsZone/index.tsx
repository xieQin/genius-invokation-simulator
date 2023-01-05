import { CSSProperties } from "react";

import styles from "./index.module.css";

export default function SummonsZone(props: { style?: CSSProperties }) {
  return (
    <div className={styles.SummonsZone} {...props}>
      <div className={styles.SummonsList}>
        <div className={styles.SummonsItem}>
          <img src="images/oceanid-mimic-card.png" alt="" />
        </div>
        <div className={styles.SummonsItem}>
          <img src="images/reflection-card.png" alt="" />
        </div>
        <div className={styles.SummonsItem}>
          <img src="images/oceanid-mimic-card.png" alt="" />
        </div>
        <div className={styles.SummonsItem}>
          <img src="images/oceanid-mimic-card.png" alt="" />
        </div>
      </div>
    </div>
  );
}
