import { CSSProperties } from "react";

import styles from "./index.module.css";

export default function CardStackZone(props: { style?: CSSProperties }) {
  const { style } = props;
  return (
    <div className={styles.CardStackZone} style={style}>
      <div className={styles.CardStackItem}></div>
      <div className={`${styles.CardStackItem} ${styles.Deg80}`}></div>
      <div className={`${styles.CardStackItem} ${styles.Deg100}`}></div>
    </div>
  );
}
