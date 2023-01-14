import { PUBLIC_PATH } from "@/configs";
import { ICost, ISkill, SkillPassiveType } from "@/models";

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

export const SkillItem = (props: { skill: ISkill }) => {
  const { skill } = props;
  if (skill.type.includes(SkillPassiveType.Passive)) {
    return <></>;
  }
  return (
    <div className={styles.SkillZoneItem}>
      <div className={styles.SkillIcon}>
        <img src={`${PUBLIC_PATH}/skills/${skill.imgID}.png`} alt="" />
      </div>
      <SkillPayItems costs={skill.costs} />
    </div>
  );
};

export default function SkillZone(props: { skills: ISkill[] }) {
  const { skills } = props;

  return (
    <div className={styles.SkillZone}>
      {skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} />
      ))}
    </div>
  );
}
