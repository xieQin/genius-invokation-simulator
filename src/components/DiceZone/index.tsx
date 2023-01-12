import { PUBLIC_PATH } from "@/configs";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/views/Game/store";

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

  if (dices.length === 0 || phase === Phase.Roll) return <></>;

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

export const CostDiceZone = (props: {
  onSelectDice: (dice: GIDiceID, index: number) => void;
}) => {
  const { dices } = useGameStore();
  return (
    <>
      <div className={styles.CostDiceZone}>
        <div className={styles.DiceList}>
          {dices.map((dice, index) => (
            <div
              key={index}
              aria-hidden="true"
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
