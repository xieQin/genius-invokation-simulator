import styles from "./index.module.css";

export default function ClockZone() {
  return (
    <div className={styles.ClockZone}>
      <div className={styles.OppositeDices}>7</div>
      <div className={styles.ClockTime}>
        <img src="images/time-clock-icon.png" alt="" />
      </div>
      <div className={styles.OwnDices}>4</div>
    </div>
  );
}
