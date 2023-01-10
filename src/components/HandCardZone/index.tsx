import { CSSProperties, useState } from "react";

import { PUBLIC_PATH } from "@/configs";
import { ICard, PlayerPosition } from "@/models";

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
        <div className={styles.HandCardPay}>{card.cost[0].costNum}</div>
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
  const { player, cards, toggle } = props;
  const [state, setState] = useState(false);
  const [select, setSelect] = useState(-1);
  const toggleControl = (index: number) => {
    if (player === PlayerPosition.Opposite) return;
    if (toggle && !state) {
      toggle(true);
    }
    if (index > -1) {
      setSelect(index);
    }
    setState(!state);
  };
  return (
    <div className={`${styles.HandCardList}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={state && index === select ? styles.Selected : ""}
          aria-hidden="true"
          onClick={() => toggleControl(index)}
        >
          <HandCardItem player={player} card={card} />
        </div>
      ))}
    </div>
  );
};

export default function HandCardZone(props: CardListProps) {
  const { cards, ...rest } = props;
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div
      className={`${styles.HandCardZone} ${
        isExpand ? styles.ExpandHandCardList : styles.CollapseHandCardList
      }`}
      {...props}
    >
      <HandCardList cards={cards} toggle={v => setIsExpand(v)} {...rest} />
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
  const [select] = useState([]);
  const toggleControl = (index: number) => {
    if (player === PlayerPosition.Opposite) return;
    console.log(index);
    // if (index in select) {
    //   setSelect(select.splice(index, 1));
    // } else {
    //   if (select.length === 0) {
    //     setSelect([...[index]]);
    //   } else {
    //     setSelect([...[index], ...select]);
    //   }
    // }
    // toggle(select);
  };
  return (
    <div className={styles.HandCardList}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={index in select ? styles.Selected : ""}
          aria-hidden="true"
          onClick={() => toggleControl(index)}
        >
          <HandCardItem card={card} player={player} />
        </div>
      ))}
    </div>
  );
};
