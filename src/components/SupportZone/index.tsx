import { CSSProperties } from "react";

import styles from "./index.module.css";

export default function SupportZone(props: {
  style?: CSSProperties;
  player?: "onw" | "opposite";
}) {
  return (
    <div className={styles.SupportZone} {...props}>
      <div className={styles.SupportList}>
        <div className={styles.SupportItem}>
          <img src="images/liben-card.png" alt="" />
        </div>
        <div className={styles.SupportItem}>
          <img src="images/paimon-card.png" alt="" />
        </div>
        <div className={styles.SupportItem}>
          <img src="images/wangshu-inn-card.png" alt="" />
        </div>
        <div className={styles.SupportItem}>
          <img src="images/timmie-card.png" alt="" />
        </div>
      </div>
    </div>
  );
}
