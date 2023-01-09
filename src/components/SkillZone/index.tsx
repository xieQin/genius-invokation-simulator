import { PUBLIC_PATH } from "@/configs";
import { ISkill } from "@/models";

import styles from "./index.module.css";

export const SkillZoneItem = (props: { skill: ISkill }) => {
  const { skill } = props;
  return (
    <div className={styles.SkillZoneItem}>
      <div className={styles.SkillIcon}>
        <img src={`${PUBLIC_PATH}/skills/${skill.imgID}.png`} alt="" />
      </div>
      <div className={styles.SkillPayItems}>
        {skill.costs
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
    </div>
  );
};

export default function SkillZone(props: { skills: ISkill[] }) {
  const { skills } = props;

  return (
    <div className={styles.SkillZone}>
      {skills.map((skill, index) => (
        <SkillZoneItem key={index} skill={skill} />
      ))}
    </div>
  );
}
