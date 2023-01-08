import { CSSProperties, useState } from "react";

import { ICard, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export const HandCardItem = () => {
  return (
    <div className={styles.HandCard}>
      <img src={`/images/card-back-normal.png`} alt="" />
    </div>
  );
};

export const HandCardList = (props: {
  cards: ICard[];
  player: PlayerPosition;
  toggle?: (v: boolean) => void;
}) => {
  const { player, cards, toggle } = props;
  const [state, setState] = useState(false);
  const [select, setSelect] = useState(-1);
  const toggleControl = (index: number) => {
    if (toggle && !state) {
      toggle(true);
    }
    if (index > -1) {
      setSelect(index);
    }
    setState(!state);
  };

  if (player === PlayerPosition.Opposite) {
    return (
      <div className={styles.HandCardList}>
        {cards.map((_, index) => (
          <div key={index} className={styles.HandCard}>
            <img src={`/back/card-back-normal.png`} alt="" />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className={`${styles.HandCardList}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.HandCard} ${styles.HandCardBorder} ${
              state && index === select ? styles.Selected : ""
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={() => toggleControl(index)}
            onClick={() => toggleControl(index)}
          >
            <div className={styles.HandCardLayout}>
              <div className={styles.HandCardPay}>{card.cost[0].costNum}</div>
              <img src={`/cards/${card.imgID}.png`} alt="" />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default function HandCardZone(props: {
  style?: CSSProperties;
  player: PlayerPosition;
  cards: ICard[];
}) {
  const { cards, ...rest } = props;
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div
      className={`${styles.HandCardZone} ${
        isExpand ? styles.ExpandHandCardList : ""
      }`}
      {...props}
    >
      <HandCardList cards={cards} toggle={v => setIsExpand(v)} {...rest} />
    </div>
  );
}
