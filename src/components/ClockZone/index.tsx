import styles from "./index.module.css";

export default function ClockZone() {
  return (
    <div className={styles.ClockZone}>
      <div className={styles.OppositeDices}>7</div>
      <div className={styles.ClockTime}></div>
      <div className={styles.OwnDices}>4</div>
    </div>
  );
}
