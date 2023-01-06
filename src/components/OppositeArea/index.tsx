import areaStyles from "@/assets/styles/area.module.css";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea() {
  const characterProps: CharacterZoneProps = {
    characters: ["diluc", "barbara", "xingqiu"],
    player: "opposite",
  };

  const supports = [
    "liben-card",
    "paimon-card",
    "chang-the-ninth-card",
    "timmie-card",
  ];
  const summons = ["oceanid-mimic-card", "reflection-card"];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone style={{ top: "40px" }} player="opposite" />
      <SupportZone
        style={{ top: "180px" }}
        supports={supports}
        player="opposite"
      />
      <CharacterZone {...characterProps} />
      <SummonsZone style={{ top: "180px" }} summons={summons} player="own" />
      <CardStackZone />
      <HandCardZone
        player="opposite"
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
