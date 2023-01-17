import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PUBLIC_PATH } from "@/configs";
import {
  ICard,
  ICharacter,
  ISkill,
  PlayerPosition,
  PreviewStatus,
} from "@/models";
import { useGameStore } from "@/stores";
import { isCardType, isCharacterType, isSkillType } from "@/utils";

import { CharacterItem } from "../CharacterZone";
import { HandCardCost, HandCardItem } from "../HandCardZone";
import { SkillPayItems } from "../SkillZone";
import styles from "./index.module.css";

export default function PreviewZone() {
  const { preview } = useGameStore();

  useEffect(() => {
    localStorage.setItem("preview", PreviewStatus.Hide);
  });
  return (
    <div className={styles.PreviewZone} aria-hidden="true">
      {isCardType(preview) ? (
        <PreviewCard preview={preview as ICard} />
      ) : isCharacterType(preview) ? (
        <PreviewCharacter preview={preview as ICharacter} />
      ) : isSkillType(preview) ? (
        <div className={styles.PreviewSection}>
          <div className={`${styles.PreviewZoneItem} ${styles.Expand}`}>
            <PreviewSkill preview={preview as ISkill} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export const PreviewSkill = (props: { preview: ISkill }) => {
  const { t } = useTranslation();
  const { preview } = props;
  const skill = preview;
  return (
    <div key={skill.name} className={styles.PrevewItemSkillSection}>
      <div className={styles.PrevewItemSkill}>
        <div className={styles.PreviewItemSkillImg}>
          <img src={`${PUBLIC_PATH}/skills/${skill.imgID}.png`} alt="" />
        </div>
        <div className={styles.PreviewItemSkillSection}>
          <div className={styles.PreviewItemSkillName}>{t(skill.name)}</div>
          <div className={styles.PreviewItemSkillCost}>
            <SkillPayItems costs={skill.costs} />
          </div>
        </div>
      </div>
      <div className={styles.PreviewItemSkillDetail}>
        {skill.type.map((s, i) => (
          <div key={i} className={styles.PreviewItemType}>
            {t(s)}
          </div>
        ))}
        <div
          className={styles.PreviewItemContent}
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: t(skill.text).replace(/\\n*/g, "<br/>"),
          }}
        ></div>
      </div>
    </div>
  );
};

export const PreviewEquipment = (props: { equipment: ICard | null }) => {
  const { t } = useTranslation();
  const { equipment } = props;
  return (
    equipment && (
      <div className={styles.PreviewEquipments}>
        <div className={styles.PreviewEquipment}>
          <div className={styles.PreviewEquipmentIcon}>
            <img
              src={`${PUBLIC_PATH}/images/equip-${equipment.subType[0].toLocaleLowerCase()}-icon.png`}
              alt=""
            />
          </div>
          <div className={styles.PreviewEquipmentSection}>
            <div className={styles.PreviewEquipmentName}>
              {t(equipment.name)}
            </div>
          </div>
        </div>
        <div className={styles.PreviewEquipmentDetail}>
          <div
            className={styles.PreviewEquipmentContent}
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{
              __html: t(equipment.content).replace(/\\n*/g, "<br/>"),
            }}
          ></div>
        </div>
      </div>
    )
  );
};

export const PreviewCharacter = (props: { preview: ICharacter }) => {
  const { t } = useTranslation();
  const { preview } = props;
  return (
    <div className={styles.PreviewSection}>
      <div className={styles.PreviewCharacter}>
        <CharacterItem character={props.preview} />
      </div>
      <div className={styles.PreviewZoneItem}>
        <div className={styles.PreviewItemName}>{t(preview.name)}</div>
        {preview.skills.map(skill => (
          <PreviewSkill key={skill.name} preview={skill} />
        ))}
      </div>
      {(preview.equipments.weapon !== null ||
        preview.equipments.artifact !== null) && (
        <div className={styles.PreviewZoneItem}>
          <div className={styles.PreviewEquipmentTitle}>
            Character Equipment
          </div>
          <PreviewEquipment equipment={preview.equipments.weapon} />
          <PreviewEquipment equipment={preview.equipments.artifact} />
        </div>
      )}
    </div>
  );
};

export const PreviewCard = (props: { preview: ICard }) => {
  const { t } = useTranslation();
  const { preview } = props;
  return (
    <div className={styles.PreviewSection}>
      <div className={styles.PreviewCard}>
        <HandCardItem card={preview} player={PlayerPosition.Own} />;
      </div>
      <div className={styles.PreviewZoneItem}>
        <div className={styles.PreviewItemName}>{t(preview.name)}</div>
        <div className={styles.PreviewItemCost}>
          <HandCardCost cost={preview.cost} />
        </div>
        <div className={styles.PreviewItemType}>{preview.mainType} Card</div>
        <div
          className={styles.PreviewItemContent}
          style={{ whiteSpace: "pre-wrap" }}
          dangerouslySetInnerHTML={{
            __html: t(preview.content).replace(/\\n*/g, "<br/>"),
          }}
        ></div>
      </div>
    </div>
  );
};
