import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { usePreview } from "@/hooks";
import { ICard, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export const SupportCountItem = () => {
  return (
    <div className={styles.SupportCountIcon}>
      <div className={styles.SupportText}>2</div>
      <img src={`${PUBLIC_PATH}/images/count-number-card-icon.png`} alt="" />
    </div>
  );
};

export const SupportClockItem = () => {
  return (
    <div className={styles.SupportClockIcon}>
      <div className={styles.SupportText}>2</div>
      <img src={`${PUBLIC_PATH}/images/support-clock-card-icon.png`} alt="" />
    </div>
  );
};

export const SupportHealItem = () => {
  return (
    <div className={styles.SupportHealIcon}>
      <div className={styles.SupportText}>0</div>
      <img src={`${PUBLIC_PATH}/images/heal-icon.png`} alt="" />
    </div>
  );
};

export const SupportItem = (props: { card: ICard }) => {
  const { onPreview } = usePreview();
  return (
    <div
      aria-hidden="true"
      className={styles.SupportItemLayout}
      onClick={() => {
        onPreview(props.card);
      }}
    >
      <div className={styles.SupportItem}>
        <img src={`${PUBLIC_PATH}/cards/${props.card.imgID}.png`} alt="" />
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
