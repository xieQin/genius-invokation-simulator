import areaStyles from "@/assets/styles/area.module.css";

import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea() {
  const characterProps: CharacterZoneProps = {
    characters: ["yoimiya", "xiangling", "razor"],
    player: "own",
  };

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone />
      <SkillZone />
      <SupportZone />
      <CharacterZone {...characterProps} />
      <SummonsZone />
      <HandCardZone player="own" />
    </div>
  );
}
