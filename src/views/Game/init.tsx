import { useEffect, useRef } from "react";

import styles from "@/assets/styles/game.module.css";
import { DraftHandCardZone, HandCardItem } from "@/components/HandCardZone";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function InitPhase() {
  const gameStates = useGameStore();
  const { phase, setPhase, toggleDeckStatus, own, opposite, shouldHideDeck } =
    gameStates;
  const timeout: { current: number | null } = useRef(null);
  const pos = PlayerPosition.Opposite;
  useEffect(() => {
    timeout.current = window.setTimeout(() => {
      if (phase === Phase.Init) {
        setPhase(Phase.Start);
      }
    }, 600);
    return () => {
      clearTimeout(timeout.current as number);
    };
  });
  const onConfirm = () => {
    setPhase(Phase.Choose);
    toggleDeckStatus();
    // console.log(deckStatus);
  };
  console.log(gameStates);
  return (
    <>
      {phase === Phase.Init && (
        <div className={styles.GameLayer}>
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className={`${styles.HandAnimate} ${styles[`Animate${n}`]}`}
            >
              <HandCardItem card={own.cards[0]} player={pos} />
            </div>
          ))}
        </div>
      )}
      {shouldHideDeck() && phase === Phase.Start && (
        <div className={styles.GameLayer}>
          <div className={styles.GameModalLayerText}>
            <p>Starting Hands</p>
            <p>select card(s) to switch</p>
          </div>
          <div className={styles.GameModalLayer}></div>
          <DraftHandCardZone
            cards={own.cards}
            player={PlayerPosition.Own}
            toggle={toggleDeckStatus}
          />
          <DraftHandCardZone
            cards={opposite.cards}
            player={PlayerPosition.Opposite}
          />
          <div
            className={styles.GameLayerBtns}
            aria-hidden="true"
            onClick={() => {
              onConfirm();
            }}
          >
            <div className={styles.ConfirmIcon}></div>
          </div>
        </div>
      )}
    </>
  );
}
