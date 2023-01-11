import { useEffect, useRef } from "react";

import styles from "@/assets/styles/game.module.css";
import { HandCardItem } from "@/components/HandCardZone";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function InitPhase() {
  const { phase, setPhase, own } = useGameStore();
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

  return (
    <>
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
    </>
  );
}
