import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { usePreview, useStartPhase } from "@/hooks";
import { ICard, ICost, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export interface CardListProps {
  cards: ICard[];
  player: PlayerPosition;
  style?: CSSProperties;
}

export interface CardItemProps {
  card: ICard;
  player: PlayerPosition;
}

export const HandCardCost = (props: { cost: ICost[] }) => {
  return (
    <div className={`${styles.HandCardPay} ${styles[props.cost[0].costType]}`}>
      {props.cost[0].costNum}
    </div>
  );
};

export const HandCardItem = (props: CardItemProps) => {
  const { player, card } = props;
  const { onPreview } = usePreview();
  return (
    <div
      className={styles.HandCardLayout}
      aria-hidden="true"
      onClick={() => {
        if (player === PlayerPosition.Opponent) return;
        onPreview(card);
      }}
    >
      <div
        className={`${styles.HandCard} ${styles.HandCardBorder} ${
          player === PlayerPosition.Own
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      >
        <HandCardCost cost={card.cost} />
        {/* <div className={styles.CardSelected}></div> */}
        <img src={`${PUBLIC_PATH}/cards/${card.imgID}.png`} alt="" />
      </div>
      <div
        className={`${styles.HandCard} ${styles.NormalBack} ${
          player === PlayerPosition.Opponent
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      ></div>
    </div>
  );
};

export const HandCardList = (props: CardListProps) => {
  const { phase, setGameStates, activeCards } = useGameStore();
  const { player, cards } = props;
  const playCard = (index: number) => {
    if (player === PlayerPosition.Opponent) return;
    if (phase === Phase.Combat) {
      setGameStates("phase", Phase.PlayCard);
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
          onDragEnd={() => playCard(index)}
        >
          <HandCardItem player={player} card={card} />
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
        rest.player === PlayerPosition.Own
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

  if (props.player === PlayerPosition.Own) {
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
  const { player, cards } = props;
  const { onSwitchCard, shouldShowSwitchHint } = useStartPhase(player);
  return (
    <div className={styles.HandCardList}>
      {cards.map((card, index) => (
        <div
          key={index}
          aria-hidden="true"
          draggable="true"
          onClick={() => {
            onSwitchCard(index);
          }}
        >
          <HandCardItem card={card} player={player} />
          {shouldShowSwitchHint(index) && (
            <div className={styles.HandCardSwitch}>switch</div>
          )}
        </div>
      ))}
    </div>
  );
};
