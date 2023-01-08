import areaStyles from "@/assets/styles/area.module.css";
import { IPlayer, PlayerPosition } from "@/models";
import { SummonsID } from "@/models/summons";
import { SupportID } from "@/models/support";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea(props: IPlayer) {
  const { position, characters, supports, cards } = props;
  const characterProps: CharacterZoneProps = {
    characters,
    player: position,
  };
  const summons: SummonsID[] = [
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
      <HandCardZone player={position} cards={cards} />
      <CardStackZone />
    </div>
  );
}
