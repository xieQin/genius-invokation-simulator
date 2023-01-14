import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PUBLIC_PATH } from "@/configs";
import { ICard, ICharacter, PlayerPosition } from "@/models";
import { isCharacterCard } from "@/utils";
import { PreviewStatus, useGameStore } from "@/views/Game/store";

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
    preview && (
      <div
        className={styles.PreviewZone}
        aria-hidden="true"
        onClick={() => {
          console.log("333");
        }}
      >
        {isCharacterCard(preview) ? (
          <PreviewCard preview={preview as ICard} />
        ) : (
          <PreviewCharacter preview={preview as ICharacter} />
        )}
      </div>
    )
  );
}

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
          <div key={skill.name} className={styles.PrevewItemSkillSection}>
            <div className={styles.PrevewItemSkill}>
              <div className={styles.PreviewItemSkillImg}>
                <img src={`${PUBLIC_PATH}/skills/${skill.imgID}.png`} alt="" />
              </div>
              <div className={styles.PreviewItemSkillSection}>
                <div className={styles.PreviewItemSkillName}>
                  {t(skill.name)}
                </div>
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
        ))}
      </div>
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
