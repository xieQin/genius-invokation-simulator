import styles from "@/assets/styles/game.module.css";
import { HandCardItem } from "@/components/HandCardZone";
import { useTimeout } from "@/hooks";
import { ICard, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function DraftCardPhase() {
  const {
    phase,
    // turn,
    showMessage,
    setGameStates,
    addHandCard,
    draftHandCard,
    popCardStack,
    toggleDeckStatus,
  } = useGameStore();
  // const animates = [2 * turn - 2, 2 * turn - 1];
  const handCards = draftHandCard(2, PlayerPosition.Own);

  useTimeout(() => {
    if (phase === Phase.DraftCard) {
      addHandCard(handCards, PlayerPosition.Own);
      popCardStack(2, PlayerPosition.Own);
      showMessage("Roll Phase", () => {
        showMessage("");
        setGameStates("phase", Phase.Roll);
        toggleDeckStatus();
      });
    }
  }, 3000);

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
                <HandCardItem
                  card={card as ICard}
                  player={PlayerPosition.Own}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
