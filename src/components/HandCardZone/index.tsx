import { CSSProperties } from "react";

import styles from "./index.module.css";

export const HandCardList = (props: {
  cards: string[] | [];
  player: "own" | "opposite";
}) => {
  const { player, cards } = props;
  return (
    <div className={styles.HandCardList}>
      {player === "own"
        ? cards.map((card, index) => (
            <div key={index} className={styles.HandCard}>
              <img src={`/images/${card}.png`} alt="" />
            </div>
          ))
        : cards.map((_, index) => (
            <div key={index} className={styles.HandCard}>
              <img src={`/images/card-back-normal.png`} alt="" />
            </div>
          ))}
    </div>
  );
};

export default function HandCardZone(props: {
  style?: CSSProperties;
  player: "own" | "opposite";
}) {
  const cards = [
    "master-of-weaponry-card",
    "katheryne-card",
    "i-havent-lost-yet!-card",
    "paimon-card",
    "chang-the-ninth-card",
    "abyssal-summons-card",
    "adventurers-bandana-card",
  ];
  return (
    <div className={styles.HandCardZone} {...props}>
      <HandCardList cards={cards} {...props} />
    </div>
  );
}
