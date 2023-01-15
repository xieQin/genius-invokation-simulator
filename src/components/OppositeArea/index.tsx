import { useState } from "react";

import areaStyles from "@/assets/styles/area.module.css";
import { SummonsID } from "@/models/summons";
import { useGameStore } from "@/stores";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OppositeArea() {
  const [active, setActive] = useState(-1);
  const { opposite } = useGameStore();
  const { position, characters, cards, supports } = opposite;
  const characterProps: CharacterZoneProps = {
    characters,
    player: position,
    active,
    setActive,
  };
  const summons: SummonsID[] = [];

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opposite}`}>
      <PlayerZone style={{ top: "40px" }} player={opposite} />
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
      <CardStackZone style={{ top: "160px" }} />
      <HandCardZone
        cards={cards}
        player={position}
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
