import styles from "@/assets/styles/game.module.css";
import { HandCardItem } from "@/components/HandCardZone";
import { ICard } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function DraftCardPhase() {
  const { own, phase, turn } = useGameStore();
  const animates = [2 * turn - 2, 2 * turn - 1];
  console.log(animates);
  return (
    <>
      {phase === Phase.DraftCard && (
        <div className={styles.GameLayer}>
          {own.cardStack.map((card, index) => (
            <div
              key={index}
              className={`${styles.DraftHandAnimate} ${
                animates.includes(index)
                  ? styles[`DraftAnimate${index % 2 === 0 ? 1 : 2}`]
                  : ""
              }`}
            >
              <HandCardItem card={card as ICard} player={own.position} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
