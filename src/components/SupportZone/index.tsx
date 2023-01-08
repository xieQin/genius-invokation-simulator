import { CSSProperties } from "react";

import { ICard, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export const SupportCountItem = () => {
  return (
    <div className={styles.SupportCountIcon}>
      <div className={styles.SupportText}>2</div>
      <img src="images/count-number-card-icon.png" alt="" />
    </div>
  );
};

export const SupportClockItem = () => {
  return (
    <div className={styles.SupportClockIcon}>
      <div className={styles.SupportText}>2</div>
      <img src="images/support-clock-card-icon.png" alt="" />
    </div>
  );
};

export const SupportHealItem = () => {
  return (
    <div className={styles.SupportHealIcon}>
      <div className={styles.SupportText}>0</div>
      <img src="images/heal-icon.png" alt="" />
    </div>
  );
};

export const SupportItem = (props: { card: ICard }) => {
  return (
    <div className={styles.SupportItemLayout}>
      <div className={styles.SupportItem}>
        <img src={`/cards/${props.card.imgID}.png`} alt="" />
      </div>
      <SupportClockItem />
      <SupportHealItem />
    </div>
  );
};

export default function SupportZone(props: {
  style?: CSSProperties;
  player: PlayerPosition;
  supports: ICard[];
}) {
  const { supports } = props;
  return (
    <div className={styles.SupportZone} {...props}>
      <div className={styles.SupportList}>
        {supports.map((card, i) => (
          <SupportItem key={i} card={card} />
        ))}
      </div>
    </div>
  );
}
