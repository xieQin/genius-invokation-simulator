import { useEffect, useRef } from "react";

import styles from "@/assets/styles/game.module.css";
import { DraftHandCardZone, HandCardItem } from "@/components/HandCardZone";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function InitPhase() {
  const gameStates = useGameStore();
  const {
    phase,
    players,
    setGameStates,
    toggleDeckStatus,
    shouldHideDeck,
    draftHandCard,
    popCardStack,
  } = gameStates;
  const own = players[PlayerPosition.Own];
  const opponent = players[PlayerPosition.Opponent];
  const handCards = draftHandCard(5, PlayerPosition.Own);
  const timeout: { current: number | null } = useRef(null);
  const pos = PlayerPosition.Opponent;
  useEffect(() => {
    timeout.current = window.setTimeout(() => {
      if (phase === Phase.Init) {
        setGameStates("phase", Phase.Start);
      }
    }, 1200);
    return () => {
      clearTimeout(timeout.current as number);
    };
  });
  const onConfirm = () => {
    setGameStates("phase", Phase.Choose);
    popCardStack(5, PlayerPosition.Own);
    toggleDeckStatus();
  };
  return (
    <>
      {phase === Phase.Init && (
        <div className={styles.GameLayer}>
          {handCards.map((card, i) => (
            <div
              key={i}
              className={`${styles.HandAnimate} ${styles[`Animate${i + 1}`]}`}
            >
              <HandCardItem card={card} player={pos} />
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
          <DraftHandCardZone cards={own.cards} player={PlayerPosition.Own} />
          <DraftHandCardZone
            cards={opponent.cards}
            player={PlayerPosition.Opponent}
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
