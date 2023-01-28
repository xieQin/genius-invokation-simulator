import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { usePreview, useSupport } from "@/hooks";
import { ICard, PlayerPosition } from "@/models";
import { SupportType } from "@/models/support";

import styles from "./index.module.css";

export const SupportCountItem = (props: { value: number }) => {
  return (
    <div className={styles.SupportCountIcon}>
      <div className={styles.SupportText}>{props.value}</div>
      <img src={`${PUBLIC_PATH}/images/count-number-card-icon.png`} alt="" />
    </div>
  );
};

export const SupportClockItem = (props: { value: number }) => {
  return (
    <div className={styles.SupportClockIcon}>
      <div className={styles.SupportText}>{props.value}</div>
      <img src={`${PUBLIC_PATH}/images/support-clock-card-icon.png`} alt="" />
    </div>
  );
};

export const SupportHealItem = (props: { value: number }) => {
  return (
    <div className={styles.SupportHealIcon}>
      <div className={styles.SupportText}>{props.value}</div>
      <img src={`${PUBLIC_PATH}/images/heal-icon.png`} alt="" />
    </div>
  );
};

export const SupportItem = (props: { card: ICard }) => {
  const { onPreview } = usePreview();
  const { card } = props;
  const { getHeal, getIcon, getUsage } = useSupport(card);
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
      {getIcon() > 0 && <SupportClockItem value={getIcon()} />}
      {getUsage() > 0 && <SupportCountItem value={getUsage()} />}
      {getHeal() > 0 && <SupportHealItem value={getHeal()} />}
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
