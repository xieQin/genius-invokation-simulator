import { useState } from "react";

import areaStyles from "@/assets/styles/area.module.css";
import { IPlayer } from "@/models";
import { SummonsID } from "@/models/summons";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea(props: IPlayer) {
  const [active, setActive] = useState(-1);
  const { position, characters, cards, supports } = props;
  const characterProps: CharacterZoneProps = {
    characters,
    player: position,
    active,
    setActive,
  };
  const summons: SummonsID[] = [
    "MelodyLoop",
    "Oz",
    "OceanidMimicFrog",
    "OceanidMimicFerret",
  ];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone style={{ top: "40px" }} player={props} />
      <SupportZone
        style={{ top: "180px" }}
        supports={supports}
        player={position}
      />
      <CharacterZone {...characterProps} />
      <SummonsZone
        style={{ top: "180px" }}
        summons={summons}
        player={position}
      />
      <CardStackZone />
      <HandCardZone
        cards={cards}
        player={position}
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
