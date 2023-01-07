import areaStyles from "@/assets/styles/area.module.css";
import { PlayerPosition } from "@/models";
import { SummonsName } from "@/models/summons";
import { SupportName } from "@/models/support";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea() {
  const position = PlayerPosition.Own;
  const characterProps: CharacterZoneProps = {
    characters: ["Barbara", "Bennett", "Collei"],
    player: position,
  };
  const supports: SupportName[] = ["Ellin", "ChefOfMao", "NRE", "Liben"];
  const summons: SummonsName[] = [
    "CuileinAnbar",
    "Guoba",
    "DrunkenMist",
    "DandelionField",
  ];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone player={position} />
      <SkillZone />
      <SupportZone supports={supports} player={position} />
      <CharacterZone {...characterProps} />
      <SummonsZone summons={summons} player={position} />
      <HandCardZone player={position} />
      <CardStackZone />
    </div>
  );
}
