import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck, showMessage, turn, setGameStates } = useGameStore();
  const onNextRound = () => {
    showMessage("Round end", () => {
      showMessage("");
      setGameStates("turn", turn + 1);
      setGameStates("phase", Phase.DraftCard);
    });
  };
  return (
    <div className={styles.Deck}>
      <div style={{ opacity: shouldHideDeck() ? 0 : 1 }}>
        <DiceZone />
        <OwnArea />
        <OppositeArea />
        <ClockZone onNextRound={onNextRound} />
      </div>
    </div>
  );
}
