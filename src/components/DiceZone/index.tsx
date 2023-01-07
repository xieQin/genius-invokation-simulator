import { useState } from "react";

import { GIElement } from "@/models";
import { IGIDice } from "@/models/die";

import styles from "./index.module.css";

export interface DiceItemProps {
  dice: IGIDice;
}

export const DiceItem = (props: DiceItemProps) => {
  const { dice } = props;

  return (
    <div className={styles.DiceListItem}>
      <div className={styles.DiceListItemElement}>
        <img src={`/images/${dice.name}-elementicon.png`} alt="" />
      </div>
      <img src={`/images/${dice.name}-icon.png`} alt="" />
    </div>
  );
};

export interface DiceZoneProps {
  diceList?: GIElement[];
}

export default function DiceZone(props: DiceZoneProps) {
  const [dice, setDice] = useState(4);
  const dices: IGIDice[] = [
    { name: "Omni" },
    { name: "Anemo" },
    { name: "Cryo" },
    { name: "Dendro" },
  ];

  return (
    <div className={styles.Dice}>
      <div className={styles.DiceNum}>{dice}</div>
      <div className={styles.DiceList}>
        {dices.map((dice, index) => (
          <DiceItem key={index} dice={dice} />
        ))}
      </div>
    </div>
  );
}
