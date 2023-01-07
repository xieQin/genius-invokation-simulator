import { CSSProperties } from "react";

import { GIElement } from "@/models";

import styles from "./index.module.css";

export const SummonTurnItem = () => {
  return (
    <div className={styles.SummonTurnItem}>
      <div className={styles.SummonText}>2</div>
      <img src="images/count-number-card-icon.png" alt="" />
    </div>
  );
};

export const SummonDamageItem = (props: {
  giElement: GIElement;
  damage: number;
}) => {
  const { giElement, damage } = props;
  return (
    <div className={styles.SummonDamageItem}>
      <div className={styles.SummonText}>{damage}</div>
      <img src={`images/pyro-elementicon.png`} alt="" />
    </div>
  );
};

export const SummonItem = (props: { card: string }) => {
  return (
    <div className={styles.SummonsItemLayout}>
      <div className={styles.SummonsItem}>
        <img src={`images/${props.card}.png`} alt="" />
      </div>
      <SummonTurnItem />
      <SummonDamageItem damage={2} giElement={GIElement.Pyro} />
    </div>
  );
};

export default function SummonsZone(props: {
  style?: CSSProperties;
  summons: string[];
  player: "own" | "opposite";
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
