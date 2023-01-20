import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { useRollPhase } from "@/hooks";
import { PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";

export default function RollPhase() {
  const { isRollValid, cacheDices, onRollPhaseEnd } = useRollPhase(
    PlayerPosition.Own
  );

  if (!isRollValid) return <></>;

  return (
    <div
      className={styles.GameLayer}
      // style={{ opacity: !shouldHideDeck() || phase !== Phase.Roll ? 0 : 1 }}
    >
      <div className={styles.GameModalLayerText}>
        <p>ReRoll</p>
        <p>select dice to reroll</p>
      </div>
      <div className={styles.GameModalLayer}></div>
      <div className={styles.RollLayer}>
        {cacheDices.map((dice, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={[styles.RollDice].join(" ")}
            onClick={() => {
              console.log(index);
            }}
          >
            <img
              src={`${PUBLIC_PATH}/images/${dice.toLowerCase()}-${
                Math.floor(index / 2) + 1
              }.png`}
              alt=""
            />
          </div>
        ))}
      </div>
      <div
        className={styles.GameLayerBtns}
        aria-hidden="true"
        style={{ bottom: 80 }}
        onClick={() => {
          onRollPhaseEnd(cacheDices as GIDiceID[]);
        }}
      >
        <div className={styles.ConfirmIcon}></div>
      </div>
    </div>
  );
}
