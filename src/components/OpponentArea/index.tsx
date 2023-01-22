import areaStyles from "@/assets/styles/area.module.css";
import { PlayerPosition } from "@/models";
import { SummonsID } from "@/models/summons";
import { useGameStore } from "@/stores";

import CardStackZone from "../CardStackZone";
import CharacterZone, { CharacterZoneProps } from "../CharacterZone";
import HandCardZone from "../HandCardZone";
import PlayerZone from "../PlayerZone";
import SummonsZone from "../SummonsZone";
import SupportZone from "../SupportZone";
import styles from "./index.module.css";

export default function OpponentArea() {
  const { getPlayer } = useGameStore();
  const opponent = getPlayer(PlayerPosition.Opponent);
  const { position, characters, cards, supports } = opponent;
  const characterProps: CharacterZoneProps = {
    characters,
    pos: position,
  };
  const summons: SummonsID[] = opponent.summons;

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Opponent}`}>
      <PlayerZone style={{ top: "40px" }} player={opponent} />
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
        pos={position}
        style={{ top: "-150px", marginBottom: 0, left: "60%" }}
      />
    </div>
  );
}
