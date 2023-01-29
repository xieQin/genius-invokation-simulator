import { CSSProperties } from "react";

import { PUBLIC_PATH } from "@/configs";
import { usePreview, useSkill, useSummons } from "@/hooks";
import { GIElement, PlayerPosition } from "@/models";
import { ISummon } from "@/models/summons";

import styles from "./index.module.css";

export const SummonTurnItem = (props: { usage: number }) => {
  return (
    <div className={styles.SummonTurnItem}>
      <div className={styles.SummonText}>{props.usage}</div>
      <img src={`${PUBLIC_PATH}/images/count-number-card-icon.png`} alt="" />
    </div>
  );
};

export const SummonDamageItem = (props: {
  giElement: GIElement;
  damage: number;
}) => {
  const { damage, giElement } = props;
  return (
    <div className={styles.SummonDamageItem}>
      <div className={styles.SummonText}>{damage}</div>
      <img
        src={`${PUBLIC_PATH}/images/${giElement.toLowerCase()}-elementicon.png`}
        alt=""
      />
    </div>
  );
};

export const SummonItem = (props: {
  summon: ISummon;
  style?: CSSProperties;
  pos: PlayerPosition;
}) => {
  const { getElemental, getUsage } = useSummons(props.summon);
  const { onPreview } = usePreview();
  return (
    <div
      className={styles.SummonsItemLayout}
      style={props.style}
      aria-hidden="true"
      onClick={() => {
        if (props.pos === PlayerPosition.Opponent) return;
        onPreview(props.summon);
      }}
    >
      <div className={styles.SummonsItem}>
        <img src={`${PUBLIC_PATH}/summons/${props.summon.imgID}.png`} alt="" />
      </div>
      <SummonTurnItem usage={getUsage()} />
      <SummonDamageItem
        damage={getUsage()}
        giElement={getElemental() as unknown as GIElement}
      />
    </div>
  );
};

export default function SummonsZone(props: {
  style?: CSSProperties;
  summons: ISummon[];
  pos: PlayerPosition;
}) {
  const { summons, pos } = props;
  const { shouldPreviewSummons } = useSkill(pos);
  const previewSummons = shouldPreviewSummons();

  return (
    <div className={styles.SummonsZone} {...props}>
      <div className={styles.SummonsList}>
        {summons.map((card, index) => (
          <SummonItem key={index} summon={card} pos={pos} />
        ))}
        {previewSummons.length > 0 &&
          previewSummons.map((summon, index) => (
            <SummonItem
              key={index}
              summon={summon}
              style={{ zIndex: 22 }}
              pos={pos}
            />
          ))}
      </div>
    </div>
  );
}
