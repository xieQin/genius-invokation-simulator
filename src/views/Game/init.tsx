import styles from "@/assets/styles/game.module.css";
import { DraftHandCardZone, HandCardItem } from "@/components/HandCardZone";
import { useStartPhase, useTimeout } from "@/hooks";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function InitPhase() {
  const gameStates = useGameStore();
  const { phase, players, setGameStates, shouldHideDeck } = gameStates;
  const own = players[PlayerPosition.Own];
  const opponent = players[PlayerPosition.Opponent];
  const pos = PlayerPosition.Opponent;
  const { onStartPhaseEnd, handCards, switchCards } = useStartPhase(
    PlayerPosition.Own
  );

  useTimeout(() => {
    if (phase === Phase.Init) {
      setGameStates("phase", Phase.Start);
    }
  }, 1200);

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
              onStartPhaseEnd();
            }}
          >
            <div className={styles.ConfirmIcon}></div>
          </div>
        </div>
      )}
    </>
  );
}
