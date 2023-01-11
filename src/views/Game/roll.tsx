import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { GIDice, GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";
import { getRandom } from "@/utils";

import { useGameStore } from "./store";

export default function RollPhase() {
  const { phase, setPhase, shouldHideDeck, toggleDeckStatus, dices, setDices } =
    useGameStore();

  if (!shouldHideDeck() || phase !== Phase.Roll) {
    return <></>;
  }

  const onConfirmDice = () => {
    setPhase(Phase.Combat);
    toggleDeckStatus();
  };

  const rollDice = () => {
    const diceMap = new Map();
    const dices = getRandom(8, [0, 1, 2, 3, 4, 5, 6, 7], true);
    dices.map(d => {
      diceMap.set(
        GIDice[d],
        diceMap.has(GIDice[d]) ? diceMap.get(GIDice[d]) + 1 : 1
      );
    });
    const res: GIDiceID[] = [];
    const omniDice = diceMap.get("Omni");
    if (omniDice > 0) {
      for (let j = 0; j < omniDice; j++) {
        res.push("Omni");
      }
      diceMap.delete("Omni");
    }
    const _t = Array.from(diceMap).sort((a, b) => b[1] - a[1]);
    _t.map(i => {
      for (let j = 0; j < i[1]; j++) {
        res.push(i[0]);
      }
    });
    return res;
  };
  if (dices.length === 0) {
    setDices(rollDice());
  }
  return (
    <div className={styles.GameLayer}>
      <div className={styles.GameModalLayerText}>
        <p>ReRoll</p>
        <p>select dice to reroll</p>
      </div>
      <div className={styles.GameModalLayer}></div>
      <div className={styles.RollLayer}>
        {dices.map((dice, index) => (
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
          onConfirmDice();
        }}
      >
        <div className={styles.ConfirmIcon}></div>
      </div>
    </div>
  );
}
