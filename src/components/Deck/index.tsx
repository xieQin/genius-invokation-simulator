import { Phase } from "@/models/phase";
import { useGameStore } from "@/views/Game/store";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck, phase, setPhase, showMessage, setTurn, turn } =
    useGameStore();
  const onNextRound = () => {
    showMessage("Round end", () => {
      showMessage("");
      setTurn(turn + 1);
      setPhase(Phase.DraftCard);
    });
  };
  console.log(phase);
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
