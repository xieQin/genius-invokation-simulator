import { useState } from "react";

import areaStyles from "@/assets/styles/area.module.css";
import { IPlayer } from "@/models";
import { SummonsID } from "@/models/summons";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SkillZone from "../SkillZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OwnArea(props: IPlayer) {
  const [active, setActive] = useState(-1);
  const { position, characters, supports, cards } = props;
  const characterProps: CharacterZoneProps = {
    characters,
    player: position,
    active,
    setActive,
  };
  const summons: SummonsID[] = [];
  const skills = active >= 0 ? characters[active].skills : [];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone player={props} />
      <SkillZone skills={skills} />
      <SupportZone supports={supports} player={position} />
      <CharacterZone {...characterProps} />
      <SummonsZone summons={summons} player={position} />
      <HandCardZone player={position} cards={cards} />
      <CardStackZone />
    </div>
  );
}
