import { useEffect, useRef } from "react";

import styles from "@/assets/styles/game.module.css";
import { HandCardItem } from "@/components/HandCardZone";
import { ICard, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function DraftCardPhase() {
  const {
    own,
    phase,
    setPhase,
    // turn,
    showMessage,
    toggleDeckStatus,
    addHandCard,
    draftHandCard,
    popCardStack,
  } = useGameStore();
  // const animates = [2 * turn - 2, 2 * turn - 1];
  const handCards = draftHandCard(2, PlayerPosition.Own);
  console.log(handCards, " handCards");

  const timer: { current: number | null } = useRef(null);
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      if (phase === Phase.DraftCard) {
        addHandCard(handCards, PlayerPosition.Own);
        popCardStack(2, PlayerPosition.Own);
        showMessage("Roll Phase", () => {
          showMessage("");
          setPhase(Phase.Roll);
          toggleDeckStatus();
        });
      }
    }, 3100);
    return () => {
      clearTimeout(timer.current as number);
    };
  });
  return (
    <>
      {phase === Phase.DraftCard && (
        <div className={styles.GameLayer}>
          {handCards &&
            handCards.map((card, index) => (
              <div
                key={index}
                // className={`${styles.DraftHandAnimate} ${
                //   animates.includes(index)
                //     ? styles[`DraftAnimate${index % 2 === 0 ? 1 : 2}`]
                //     : ""
                // }`}
                className={`${styles.DraftHandAnimate} ${
                  styles[`DraftAnimate${index + 1}`]
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
