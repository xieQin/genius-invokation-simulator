import areaStyles from "@/assets/styles/area.module.css";

import CardStackZone from "../CardStackZone";
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
  const supports = [
    "timaeus-card",
    "parametric-transformer-card",
    "liyue-harbor-wharf-card",
    "jade-chamber-card",
  ];
  const summons = ["oceanid-mimic-card", "reflection-card"];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone player="own" />
      <SkillZone />
      <SupportZone supports={supports} player="own" />
      <CharacterZone {...characterProps} />
      <SummonsZone summons={summons} player="own" />
      <HandCardZone player="own" />
      <CardStackZone />
    </div>
  );
}
