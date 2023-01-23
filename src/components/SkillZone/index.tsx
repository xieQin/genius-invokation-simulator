import { PUBLIC_PATH } from "@/configs";
import { usePreview, useSkill } from "@/hooks";
import { ICost, ISkill, PlayerPosition, SkillPassiveType } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

import { ChooseBtn, ChooseZoneLayer } from "../ChooseZone";
import styles from "./index.module.css";

export const SkillPayItems = (props: { costs: ICost[] }) => {
  return (
    <div className={styles.SkillPayItems}>
      {props.costs
        .filter(cost => cost.costNum > 0)
        .map((cost, i) => (
          <div
            key={i}
            className={`${styles.SkillPayItem} ${styles[cost.costType]}`}
          >
            {cost.costNum}
          </div>
        ))}
    </div>
  );
};

export const SkillItem = (props: { skill: ISkill; i: number }) => {
  const { skill, i } = props;
  const { onPreview } = usePreview();
  const { setGameStates, phase, activeSkills } = useGameStore();
  const { isSkillValid, isEnergyValid } = useSkill(PlayerPosition.Own);
  if (skill.type.includes(SkillPassiveType.Passive)) {
    return <></>;
  }
  const shouldShowPreview = phase === Phase.Skill;

  return (
    <div
      className={`${styles.SkillZoneItem} ${
        isSkillValid(skill.costs) && isEnergyValid(skill) ? "" : styles.NotValid
      }`}
      aria-hidden="true"
      style={{
        zIndex: shouldShowPreview ? 22 : 9,
      }}
      onClick={() => {
        onPreview(skill);
        setGameStates("phase", Phase.Skill);
        setGameStates(
          "activeSkills",
          Object.assign([], activeSkills, [i, activeSkills[1]])
        );
      }}
    >
      <div className={styles.SkillIcon}>
        <img src={`${PUBLIC_PATH}/skills/${skill.imgID}.png`} alt="" />
      </div>
      <SkillPayItems costs={skill.costs} />
    </div>
  );
};

export const SkillChangeCharacter = () => {
  const { setGameStates } = useGameStore();
  const costs: ICost[] = [
    {
      costNum: 1,
      costType: "Void",
    },
  ];
  return (
    <ChooseZoneLayer>
      <ChooseBtn
        element={<SkillPayItems costs={costs} />}
        onClick={() => {
          setGameStates("phase", Phase.ChangeCharacter);
        }}
      />
    </ChooseZoneLayer>
  );
};

export default function SkillZone(props: { select: number }) {
  const { select } = props;
  const { phase, activeCharacters, getPlayer, current } = useGameStore();
  const own = getPlayer(PlayerPosition.Own);
  const active = activeCharacters[PlayerPosition.Own];
  const skills = active >= 0 ? own.characters[active].skills : [];
  if (phase === Phase.Choose) return <></>;
  if (select !== -1 && select !== active && current === PlayerPosition.Own) {
    return <SkillChangeCharacter />;
  }

  return (
    <div className={styles.SkillZone}>
      {skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} i={index} />
      ))}
    </div>
  );
}
