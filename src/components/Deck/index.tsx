import { useGameStore } from "@/views/Game/store";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck, phase } = useGameStore();
  console.log(phase);
  return (
    <div className={styles.Deck}>
      <div style={{ opacity: shouldHideDeck() ? 0 : 1 }}>
        <DiceZone />
        <OwnArea />
        <OppositeArea />
        <ClockZone />
      </div>
    </div>
  );
}
