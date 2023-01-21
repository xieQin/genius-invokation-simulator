import { Action, Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OpponentArea from "../OpponentArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck, showMessage, round, setGameStates } = useGameStore();
  const onNextRound = () => {
    showMessage("Round end", () => {
      showMessage("");
      setGameStates("round", round + 1);
      setGameStates("phase", Phase.DraftCard);
      setGameStates("actions", [Action.None, Action.None]);
    });
  };
  return (
    <div className={styles.Deck}>
      <div
        className={styles.Deck}
        style={{ opacity: shouldHideDeck() ? 0 : 1 }}
      >
        <DiceZone />
        <OpponentArea />
        <OwnArea />
        <ClockZone onNextRound={onNextRound} />
      </div>
    </div>
  );
}
