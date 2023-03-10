import { PUBLIC_PATH } from "@/configs";
import { GIDiceID, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

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

export default function DiceZone() {
  const { dices, phase } = useGameStore();
  const ownDices = dices[PlayerPosition.Own];
  const shouldHide =
    ownDices.length === 0 || phase === Phase.Roll || phase === Phase.PlayCard;

  return (
    <div className={styles.Dice} style={{ opacity: shouldHide ? 0 : 1 }}>
      <div className={styles.DiceNum}>{ownDices.length}</div>
      <div className={styles.DiceList}>
        {ownDices.map((dice, index) => (
          <DiceItem key={index} dice={dice} />
        ))}
      </div>
    </div>
  );
}

export const CostDiceZone = (props: {
  onSelectDice: (dice: GIDiceID, index: number) => void;
  actives: number[];
  dices: GIDiceID[];
}) => {
  return (
    <>
      <div className={styles.CostDiceZone}>
        <div className={styles.DiceList}>
          {props.dices.map((dice, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={props.actives.includes(index) ? styles.Selected : ""}
              onClick={() => {
                props.onSelectDice(dice, index);
              }}
            >
              <DiceItem dice={dice} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
