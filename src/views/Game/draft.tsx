import styles from "@/assets/styles/game.module.css";
import { HandCardItem } from "@/components/HandCardZone";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function DraftCardPhase() {
  const { own, phase } = useGameStore();
  return (
    <>
      {phase === Phase.DraftCard && (
        <div className={styles.GameLayer}>
          {[1, 2].map(n => (
            <div
              key={n}
              className={`${styles.DraftHandAnimate} ${
                styles[`DraftAnimate${n}`]
              }`}
            >
              <HandCardItem card={own.cards[n - 1]} player={own.position} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
