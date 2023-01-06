import { useState } from "react";

import { GIElement } from "@/models";

import styles from "./index.module.css";

export interface DiceItemProps {
  element: GIElement;
}

export const DiceItem = (props: DiceItemProps) => {
  const { element } = props;
  return (
    <div className={styles.DiceListItem}>
      <div className={styles.DiceListItemElement}>
        <img src={`/images/${element}-elementicon.png`} alt="" />
      </div>
      <img src={`/images/${element}-icon.png`} alt="" />
    </div>
  );
};

export interface DiceZoneProps {
  diceList: GIElement[];
}

export default function DiceZone(props: DiceZoneProps) {
  const [dice, setDice] = useState(4);
  const dices = [
    GIElement.Anemo,
    GIElement.Anemo,
    GIElement.Cryo,
    GIElement.Dendro,
    GIElement.Geo,
  ];

  return (
    <div className={styles.Dice}>
      <div className={styles.DiceNum}>{dice}</div>
      <div className={styles.DiceList}>
        {dices.map((dice, index) => (
          <DiceItem key={index} element={dice} />
        ))}
      </div>
    </div>
  );
}
