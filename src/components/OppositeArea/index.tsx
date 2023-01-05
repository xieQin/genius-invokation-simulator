import areaStyles from "@/assets/styles/area.module.css";

import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea() {
  const characterProps: CharacterZoneProps = {
    characters: ["diluc", "barbara", "xingqiu"],
  };

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone />
      <SupportZone style={{ top: "180px" }} />
      <CharacterZone {...characterProps} />
      <SummonsZone style={{ top: "180px" }} />
      <HandCardZone
        player="opposite"
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
