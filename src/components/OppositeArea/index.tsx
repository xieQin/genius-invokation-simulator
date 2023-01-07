import areaStyles from "@/assets/styles/area.module.css";
import { PlayerPosition } from "@/models";
import { SummonsName } from "@/models/summons";
import { SupportName } from "@/models/support";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea() {
  const position = PlayerPosition.Opposite;
  const characterProps: CharacterZoneProps = {
    characters: ["Diluc", "Fischl", "JadeplumeTerrorshroom"],
    player: position,
  };

  const supports: SupportName[] = [
    "LiuSu",
    "KnightsOfFavoniusLiabrary",
    "ParametricTransformer",
    "Paimon",
  ];
  const summons: SummonsName[] = [
    "MelodyLoop",
    "Oz",
    "OceanidMimicFrog",
    "OceanidMimicFerret",
  ];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone style={{ top: "40px" }} player={position} />
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
        player={position}
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
