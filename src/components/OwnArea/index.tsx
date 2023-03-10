import areaStyles from "@/assets/styles/area.module.css";
import { ISummon, PlayerPosition } from "@/models";
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
  const { getPlayer, selectedCharacters, setGameStates } = useGameStore();
  const own = getPlayer(PlayerPosition.Own);
  const { position, characters, supports, cards } = own;
  const select = selectedCharacters[PlayerPosition.Own];
  const setSelect = (i: number) => {
    setGameStates(
      "selectedCharacters",
      Object.assign([], selectedCharacters, [i, selectedCharacters[1]])
    );
  };
  const characterProps: CharacterZoneProps = {
    characters,
    pos: position,
    select,
    setSelect,
  };
  const summons: ISummon[] = own.summons;

  return (
    <div className={`${areaStyles.PlayerArea} ${styles.Own}`}>
      <PlayerZone player={own} />
      <SkillZone select={select} />
      <SupportZone
        supports={supports}
        player={position}
        style={{ top: "580px" }}
      />
      <CharacterZone {...characterProps} />
      <SummonsZone summons={summons} pos={position} style={{ top: "580px" }} />
      <HandCardZone pos={position} cards={cards} />
      <CardStackZone />
    </div>
  );
}
