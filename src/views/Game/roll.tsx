import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { useRollPhase } from "@/hooks";
import { GIDiceID, PlayerPosition } from "@/models";

export default function RollPhase() {
  const {
    isRollValid,
    onRollPhaseStart,
    onRollPhaseEnd,
    isRerollValid,
    shouldReroll,
    onRerollDice,
  } = useRollPhase(PlayerPosition.Own);

  if (!isRollValid) return <></>;

  const cacheDices = onRollPhaseStart();

  return (
    <div
      className={styles.GameLayer}
      // style={{ opacity: !shouldHideDeck() || phase !== Phase.Roll ? 0 : 1 }}
    >
      <div className={styles.GameModalLayerText}>
        <p>ReRoll</p>
        {isRerollValid ? <p>select dice to reroll</p> : <p>reroll result</p>}
      </div>
      <div className={styles.GameModalLayer}></div>
      <div className={styles.RollLayer}>
        {cacheDices.map((dice, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={[
              styles.RollDice,
              shouldReroll(index) ? styles.Selected : "",
            ].join(" ")}
            onClick={() => {
              isRerollValid && onRerollDice(index);
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
