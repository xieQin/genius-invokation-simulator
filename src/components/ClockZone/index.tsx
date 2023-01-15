import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export default function ClockZone(props: { onNextRound: () => void }) {
  const { dices } = useGameStore();
  const { onNextRound } = props;
  return (
    <div className={styles.ClockZone}>
      <div className={styles.OppositeDices}>7</div>
      <div
        className={styles.ClockTime}
        aria-hidden="true"
        onClick={() => {
          onNextRound();
        }}
      ></div>
      <div className={styles.OwnDices}>{dices.length}</div>
    </div>
  );
}
