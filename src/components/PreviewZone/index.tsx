import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PUBLIC_PATH } from "@/configs";
import {
  ICard,
  ICharacter,
  ISkill,
  ISummon,
  Phase,
  PlayerPosition,
  PreviewStatus,
} from "@/models";
import { useGameStore } from "@/stores";
import {
  isCardType,
  isCharacterType,
  isSkillType,
  isSummonType,
} from "@/utils";

import { CharacterItem } from "../CharacterZone";
import { CardImgItem, HandCardCost, HandCardItem } from "../HandCardZone";
import { SkillPayItems } from "../SkillZone";
import styles from "./index.module.css";

export default function PreviewZone() {
  const { preview, phase } = useGameStore();
  const shouldShowPreview = phase === Phase.Skill || phase === Phase.Start;

  useEffect(() => {
    localStorage.setItem("preview", PreviewStatus.Hide);
  });
  return (
    <div
      className={styles.PreviewZone}
      aria-hidden="true"
      style={{
        zIndex: shouldShowPreview ? 22 : 12,
      }}
    >
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
      ) : isSummonType(preview) ? (
        <PreviewSummon preview={preview as ISummon} />
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
    <div key={skill.name} className={styles.PreviewItemSkillSection}>
      <div className={styles.PreviewItemSkill}>
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
              src={`${PUBLIC_PATH}/images/equip-${equipment.subType[0].toLowerCase()}-icon.png`}
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

export const PreviewCharacter = (props: {
  preview: ICharacter;
  noImg?: boolean;
}) => {
  const { t } = useTranslation();
  const { preview, noImg } = props;
  return (
    <div className={styles.PreviewSection}>
      {!noImg && (
        <div className={styles.PreviewCharacter}>
          <CharacterItem
            character={props.preview}
            pos={PlayerPosition.Opponent}
          />
        </div>
      )}
      <div className={styles.PreviewZoneItem}>
        <div className={styles.PreviewItemName}>{t(preview.name)}</div>
        <div className={styles.PreviewZoneType}>
          <img
            src={`${PUBLIC_PATH}/images/${preview.element.toLowerCase()}-elementicon.png`}
            alt=""
          />
          <img
            src={`${PUBLIC_PATH}/images/${preview.weaponType
              .toLowerCase()
              .replaceAll(" ", "")}-weaponicon.png`}
            alt=""
          />
        </div>
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

export const PreviewCard = (props: { preview: ICard; noImg?: boolean }) => {
  const { t } = useTranslation();
  const { preview, noImg } = props;
  return (
    <div className={styles.PreviewSection}>
      {!noImg && (
        <div className={styles.PreviewCard}>
          <HandCardItem card={preview} pos={PlayerPosition.Own} />;
        </div>
      )}
      <div className={styles.PreviewZoneItem}>
        <div className={styles.PreviewItemName}>{t(preview.name)}</div>
        <div className={styles.PreviewItemCost}>
          <HandCardCost costs={preview.cost} />
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

export const PreviewSummon = (props: { preview: ISummon }) => {
  const { t } = useTranslation();
  const { preview } = props;
  return (
    <div className={styles.PreviewSection}>
      <div className={styles.PreviewCard}>
        <CardImgItem img={`${PUBLIC_PATH}/summons/${preview.imgID}.png`} />
      </div>
      <div className={styles.PreviewZoneItem}>
        <div className={styles.PreviewItemName}>{t(preview.name)}</div>
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
