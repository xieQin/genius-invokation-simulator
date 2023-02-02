import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { usePreview, useStartPhase } from "@/hooks";
import { ICard, ICost, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export interface CardListProps {
  cards: ICard[];
  pos: PlayerPosition;
  style?: CSSProperties;
}

export interface CardItemProps {
  card: ICard;
  pos: PlayerPosition;
}

export const HandCardCost = (props: { costs: ICost[] }) => {
  const { costs } = props;
  return (
    <>
      {costs.map((cost, i) => (
        <div
          key={i}
          className={`${styles.HandCardPay} ${styles[cost.costType]}`}
        >
          {cost.costNum}
        </div>
      ))}
    </>
  );
};

export const CardImgItem = (props: { img: string }) => {
  return (
    <div className={styles.HandCardLayout}>
      <div
        className={`${styles.HandCard} ${styles.HandCardBorder} ${styles.HandCardFront}`}
      >
        <img src={props.img} alt="" />
      </div>
    </div>
  );
};

export const HandCardItem = (props: CardItemProps) => {
  const { pos, card } = props;
  const { onPreview } = usePreview();
  return (
    <div
      className={styles.HandCardLayout}
      aria-hidden="true"
      onClick={() => {
        if (pos === PlayerPosition.Opponent) return;
        onPreview(card);
      }}
    >
      <div
        className={`${styles.HandCard} ${styles.HandCardBorder} ${
          pos === PlayerPosition.Own
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      >
        <HandCardCost costs={card.cost} />
        <img src={`${PUBLIC_PATH}/cards/${card.imgID}.png`} alt="" />
      </div>
      <div
        className={`${styles.HandCard} ${styles.NormalBack} ${
          pos === PlayerPosition.Opponent
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      ></div>
    </div>
  );
};

export const HandCardList = (props: CardListProps) => {
  const { phase, setGameStates, activeCards } = useGameStore();
  const { pos, cards } = props;
  const activeCard = activeCards[pos];
  const playCard = (index: number) => {
    if (pos === PlayerPosition.Opponent) return;
    if (phase === Phase.Combat) {
      if (activeCard === index) {
        setGameStates("phase", Phase.PlayCard);
      }
      setGameStates(
        "activeCards",
        Object.assign([], activeCards, [index, activeCards[1]])
      );
    }
  };
  return (
    <div className={`${styles.HandCardList}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          aria-hidden="true"
          draggable="true"
          style={{ position: "relative" }}
          onClick={() => playCard(index)}
          onDragEnd={() => playCard(index)}
        >
          <HandCardItem pos={pos} card={card} />
          {/* {activeCard === index && <div className={styles.CardSelected}></div>} */}
        </div>
      ))}
    </div>
  );
};

export default function HandCardZone(props: CardListProps) {
  const { cards, ...rest } = props;

  return (
    <div
      className={`${styles.HandCardZone} ${
        rest.pos === PlayerPosition.Own
          ? styles.ExpandHandCardList
          : styles.CollapseHandCardList
      }`}
      {...props}
    >
      <HandCardList cards={cards} {...rest} />
    </div>
  );
}

export const DraftHandCardZone = (props: CardListProps) => {
  const { cards, ...rest } = props;

  if (props.pos === PlayerPosition.Own) {
    return (
      <div className={styles.DraftHandCardZone}>
        <DraftHandCardList cards={cards} {...rest} />
      </div>
    );
  } else {
    return (
      <HandCardZone
        style={{
          top: "-150px",
          left: "60%",
        }}
        {...props}
      />
    );
  }
};

export const DraftHandCardList = (props: CardListProps) => {
  const { pos, cards } = props;
  const { onSwitchCard, shouldShowSwitchHint, isSwitchCardValid } =
    useStartPhase(pos);
  return (
    <div className={styles.HandCardList}>
      {cards.map((card, index) => (
        <div
          key={index}
          aria-hidden="true"
          draggable="true"
          onClick={() => {
            isSwitchCardValid && onSwitchCard(index);
          }}
        >
          <HandCardItem card={card} pos={pos} />
          {shouldShowSwitchHint(index) && (
            <div style={{ position: "relative" }}>
              <div className={styles.HandCardSwitch}>switch</div>
              <div className={styles.CardSelected}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
