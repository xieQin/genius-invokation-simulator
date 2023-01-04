import styles from "./index.module.css";

export default function SummonsZone() {
  return (
    <div className={styles.SummonsZone}>
      <div className={styles.SummonsList}>
        <div className={styles.SummonsItem}>
          <img src="../../../public/images/oceanid-mimic-card.png" alt="" />
        </div>
        <div className={styles.SummonsItem}></div>
        <div className={styles.SummonsItem}></div>
        <div className={styles.SummonsItem}></div>
      </div>
    </div>
  );
}
