import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { GIElement, PlayerPosition } from "@/models";
import { SummonsID } from "@/models/summons";

import styles from "./index.module.css";

export const SummonTurnItem = () => {
  return (
    <div className={styles.SummonTurnItem}>
      <div className={styles.SummonText}>2</div>
      <img src={`${PUBLIC_PATH}/images/count-number-card-icon.png`} alt="" />
    </div>
  );
};

export const SummonDamageItem = (props: {
  giElement: GIElement;
  damage: number;
}) => {
  const { damage } = props;
  return (
    <div className={styles.SummonDamageItem}>
      <div className={styles.SummonText}>{damage}</div>
      <img src={`${PUBLIC_PATH}/images/pyro-elementicon.png`} alt="" />
    </div>
  );
};

export const SummonItem = (props: { card: string }) => {
  return (
    <div className={styles.SummonsItemLayout}>
      <div className={styles.SummonsItem}>
        <img src={`${PUBLIC_PATH}/summons/${props.card}.png`} alt="" />
      </div>
      <SummonTurnItem />
      <SummonDamageItem damage={2} giElement={GIElement.Pyro} />
    </div>
  );
};

export default function SummonsZone(props: {
  style?: CSSProperties;
  summons: SummonsID[];
  player: PlayerPosition;
}) {
  const { summons } = props;

  return (
    <div className={styles.SummonsZone} {...props}>
      <div className={styles.SummonsList}>
        {summons.map((card, index) => (
          <SummonItem key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
