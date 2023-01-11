import { useGameStore } from "@/views/Game/store";

import ClockZone from "../ClockZone";
import DiceZone from "../DiceZone";
import OppositeArea from "../OppositeArea";
import OwnArea from "../OwnArea";
import styles from "./index.module.css";

export default function Deck() {
  const { shouldHideDeck } = useGameStore();
  return (
    <div className={styles.Deck}>
      {!shouldHideDeck() && (
        <>
          <DiceZone />
          <OwnArea />
          <OppositeArea />
          <ClockZone />
        </>
      )}
    </div>
  );
}
