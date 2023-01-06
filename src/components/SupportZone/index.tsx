import { CSSProperties } from "react";

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

export const SupportItem = (props: { card: string }) => {
  return (
    <div className={styles.SupportItemLayout}>
      <div className={styles.SupportItem}>
        <img src={`images/${props.card}.png`} alt="" />
      </div>
      <SupportClockItem />
      <SupportHealItem />
    </div>
  );
};

export default function SupportZone(props: {
  style?: CSSProperties;
  player: "own" | "opposite";
  supports: string[];
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
