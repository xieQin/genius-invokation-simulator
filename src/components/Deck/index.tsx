import { useGameStore } from "@/stores";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OpponentArea from "../OpponentArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck } = useGameStore();
  return (
    <div className={styles.Deck}>
      <div
        className={styles.Deck}
        style={{ opacity: shouldHideDeck() ? 0 : 1 }}
      >
        <DiceZone />
        <OpponentArea />
        <OwnArea />
        <ClockZone />
      </div>
    </div>
  );
}
