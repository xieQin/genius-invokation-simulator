import areaStyles from "@/assets/styles/area.module.css";

import CharacterZone from "../CharacterZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea() {
  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone />
      <SupportZone />
      <CharacterZone />
      <SummonsZone />
    </div>
  );
}
