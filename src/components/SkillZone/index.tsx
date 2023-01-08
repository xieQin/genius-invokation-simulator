import { ISkill } from "@/models";

import styles from "./index.module.css";

export const SkillZoneItem = (props: { skill: ISkill }) => {
  const { skill } = props;
  return (
    <div className={styles.SkillZoneItem}>
      <div className={styles.SkillIcon}>
        <img src={`skills/${skill.imgID}.png`} alt="" />
      </div>
      <div className={styles.SkillPayItems}>
        <div className={styles.SkillPayItem}>2</div>
        <div className={styles.SkillPayItem}>3</div>
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
