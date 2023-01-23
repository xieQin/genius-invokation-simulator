import { useRound } from "@/hooks";
import { PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export default function ClockZone() {
  const { dices } = useGameStore();
  const { onRoundEnd } = useRound();
  return (
    <div className={styles.ClockZone}>
      <div className={styles.OpponentDices}>
        {dices[PlayerPosition.Opponent].length}
      </div>
      <div
        className={styles.ClockTime}
        aria-hidden="true"
        onClick={() => {
          onRoundEnd();
        }}
      ></div>
      <div className={styles.OwnDices}>{dices[PlayerPosition.Own].length}</div>
    </div>
  );
}
