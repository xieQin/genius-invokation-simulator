import styles from "./index.module.css";

export default function CardStackZone() {
  return (
    <div className={styles.CardStackZone}>
      <div className={styles.CardStackItem}></div>
      <div className={`${styles.CardStackItem} ${styles.Deg80}`}></div>
      <div className={`${styles.CardStackItem} ${styles.Deg100}`}></div>
    </div>
  );
}
