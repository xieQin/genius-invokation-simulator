import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";
import { rollDice } from "@/utils";

import { useGameStore } from "./store";

export default function RollPhase() {
  const { phase, setPhase, shouldHideDeck, toggleDeckStatus, setDices } =
    useGameStore();

  if (!shouldHideDeck() || phase !== Phase.Roll) return <></>;

  const onConfirmDice = (dices: GIDiceID[]) => {
    setPhase(Phase.Combat);
    setDices(dices);
    toggleDeckStatus();
    localStorage.removeItem("cacheDices");
  };
  const l = localStorage.getItem("cacheDices");
  let cacheDices = l === null ? [] : l.split(",");
  if (!cacheDices || l === null) {
    cacheDices = rollDice();
    localStorage.setItem("cacheDices", cacheDices.join(","));
  }

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
          <div key={index} className={styles.RollDice}>
            <img
              src={`${PUBLIC_PATH}/images/${dice.toLowerCase()}-${
                Math.ceil(index / (2 + index / 2)) + 1
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
          onConfirmDice(cacheDices as GIDiceID[]);
        }}
      >
        <div className={styles.ConfirmIcon}></div>
      </div>
    </div>
  );
}
