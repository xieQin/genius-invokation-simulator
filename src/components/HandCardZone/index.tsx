import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { ICard, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/views/Game/store";

import styles from "./index.module.css";

export interface CardListProps {
  cards: ICard[];
  player: PlayerPosition;
  toggle?: (v: any) => void;
  style?: CSSProperties;
}

export interface CardItemProps {
  card: ICard;
  player: PlayerPosition;
}

export const HandCardItem = (props: CardItemProps) => {
  const { player, card } = props;
  return (
    <div className={styles.HandCardLayout}>
      <div
        className={`${styles.HandCard} ${styles.HandCardBorder} ${
          player === PlayerPosition.Own
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      >
        <div
          className={`${styles.HandCardPay} ${styles[card.cost[0].costType]}`}
        >
          {card.cost[0].costNum}
        </div>
        <img src={`${PUBLIC_PATH}/cards/${card.imgID}.png`} alt="" />
      </div>
      <div
        className={`${styles.HandCard} ${styles.NormalBack} ${
          player === PlayerPosition.Opposite
            ? styles.HandCardFront
            : styles.HandCardBack
        }`}
      ></div>
    </div>
  );
};

export const HandCardList = (props: CardListProps) => {
  const { updateActiveCards, phase, setPhase } = useGameStore();
  const { player, cards } = props;
  const playCard = (index: number) => {
    if (player === PlayerPosition.Opposite) return;
    if (phase === Phase.Combat) {
      setPhase(Phase.PlayCard);
      updateActiveCards(index, PlayerPosition.Own);
    }
  };
  return (
    <div className={`${styles.HandCardList}`}>
      {cards.map((card, index) => (
        <div key={index} aria-hidden="true" onDragEnd={() => playCard(index)}>
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
  return (
    <div className={styles.HandCardList}>
      {cards.map((card, index) => (
        <HandCardItem key={index} card={card} player={player} />
      ))}
    </div>
  );
};
