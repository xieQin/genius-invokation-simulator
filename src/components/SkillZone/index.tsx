import styles from "./index.module.css";

export const SkillZoneItem = () => {
  return (
    <div className={styles.SkillZoneItem}>
      <div className={styles.SkillIcon}></div>
      <div className={styles.SkillPayItems}>
        <div className={styles.SkillPayItem}>2</div>
        <div className={styles.SkillPayItem}>3</div>
      </div>
    </div>
  );
};

export default function SkillZone() {
  return (
    <div className={styles.SkillZone}>
      <SkillZoneItem />
      <SkillZoneItem />
      <SkillZoneItem />
    </div>
  );
}
