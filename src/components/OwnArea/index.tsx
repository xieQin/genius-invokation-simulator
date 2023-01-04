import areaStyles from "@/assets/styles/area.module.css";

import CharacterZone from "../CharacterZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea() {
  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone />
      <SkillZone />
      <SupportZone />
      <CharacterZone />
      <SummonsZone />
    </div>
  );
}
