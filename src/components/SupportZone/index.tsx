import styles from "./index.module.css";

export default function SupportZone() {
  return (
    <div className={styles.SupportZone}>
      <div className={styles.SupportList}>
        <div className={styles.SupportItem}>
          <img src="..//images/liben-card.png" alt="" />
        </div>
        <div className={styles.SupportItem}></div>
        <div className={styles.SupportItem}></div>
        <div className={styles.SupportItem}></div>
      </div>
    </div>
  );
}
