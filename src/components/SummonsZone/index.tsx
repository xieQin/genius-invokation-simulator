import styles from "./index.module.css";

export default function SummonsZone() {
  return (
    <div className={styles.SummonsZone}>
      <div className={styles.SummonsList}>
        <div className={styles.SummonsItem}></div>
        <div className={styles.SummonsItem}></div>
        <div className={styles.SummonsItem}></div>
        <div className={styles.SummonsItem}></div>
      </div>
    </div>
  );
}
