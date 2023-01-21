import { PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export default function ClockZone(props: { onNextRound: () => void }) {
  const { dices } = useGameStore();
  const { onNextRound } = props;
  return (
    <div className={styles.ClockZone}>
      <div className={styles.OpponentDices}>
        {dices[PlayerPosition.Opponent].length}
      </div>
      <div
        className={styles.ClockTime}
        aria-hidden="true"
        onClick={() => {
          onNextRound();
        }}
      ></div>
      <div className={styles.OwnDices}>{dices[PlayerPosition.Own].length}</div>
    </div>
  );
}
