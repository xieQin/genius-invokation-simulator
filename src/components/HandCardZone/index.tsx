import styles from "./index.module.css";

export default function HandCardZone() {
  return (
    <div className={styles.HandCardZone}>
      <div className={styles.HandCardContent}>
        <div className={styles.HandCardAvatar}></div>
        <div className={styles.HandCardInfo}>
          <div className={styles.HandCardName}></div>
          <div className={styles.HandCardStatus}>Now Acting</div>
        </div>
      </div>
    </div>
  );
}
