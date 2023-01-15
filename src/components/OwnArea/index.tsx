import areaStyles from "@/assets/styles/area.module.css";
import { SummonsID } from "@/models/summons";
import { useGameStore } from "@/stores";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea() {
  const { own } = useGameStore();
  const { position, characters, supports, cards } = own;
  const characterProps: CharacterZoneProps = {
    characters,
    player: position,
  };
  const summons: SummonsID[] = [];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone player={own} />
      <SkillZone />
      <SupportZone supports={supports} player={position} />
      <CharacterZone {...characterProps} />
      <SummonsZone summons={summons} player={position} />
      <HandCardZone player={position} cards={cards} />
      <CardStackZone />
    </div>
  );
}
