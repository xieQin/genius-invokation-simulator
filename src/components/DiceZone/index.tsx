import { PUBLIC_PATH } from "@/configs";
import { GIDiceID } from "@/models/die";

import styles from "./index.module.css";

export interface DiceItemProps {
  dice: GIDiceID;
}

export const DiceItem = (props: DiceItemProps) => {
  const { dice } = props;

  return (
    <div className={styles.DiceListItem}>
      <div className={styles.DiceListItemElement}>
        <img
          src={`${PUBLIC_PATH}/images/${dice.toLowerCase()}-elementicon.png`}
          alt=""
        />
      </div>
      <img
        src={`${PUBLIC_PATH}/images/${dice.toLowerCase()}-icon.png`}
        alt=""
      />
    </div>
  );
};

export interface DiceZoneProps {
  dices: GIDiceID[];
}

export default function DiceZone(props: DiceZoneProps) {
  const { dices } = props;

  return (
    <div className={styles.Dice}>
      <div className={styles.DiceNum}>{dices.length}</div>
      <div className={styles.DiceList}>
        {dices.map((dice, index) => (
          <DiceItem key={index} dice={dice} />
        ))}
      </div>
    </div>
  );
}
