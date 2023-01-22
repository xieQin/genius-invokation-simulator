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
  const opponentPos = PlayerPosition.Opponent;
  const { onStartPhaseEnd, isSwitchCardValid } = useStartPhase(
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
          {own.cards.map((card, i) => (
            <div
              key={i}
              className={`${styles.HandAnimate} ${styles[`Animate${i + 1}`]}`}
            >
              <HandCardItem card={card} pos={opponentPos} />
            </div>
          ))}
        </div>
      )}
      {shouldHideDeck() && phase === Phase.Start && (
        <div className={styles.GameLayer}>
          <div className={styles.GameModalLayerText}>
            <p>Starting Hands</p>
            {isSwitchCardValid ? (
              <p>select card(s) to switch</p>
            ) : (
              <p>switch result</p>
            )}
          </div>
          <div className={styles.GameModalLayer}></div>
          <DraftHandCardZone cards={own.cards} pos={PlayerPosition.Own} />
          <DraftHandCardZone
            cards={opponent.cards}
            pos={PlayerPosition.Opponent}
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
