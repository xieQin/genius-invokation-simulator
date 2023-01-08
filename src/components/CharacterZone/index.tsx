import { FC, useState } from "react";

import { ICharacter, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export type stateType = "ready" | "battle";

export interface CharacterItemProps {
  character: ICharacter;
  player: PlayerPosition;
}

export const useTransformControl = () => {
  const [state, setState] = useState("ready");
  const toggleControl = () => {
    const _state = state === "ready" ? "battle" : "ready";
    setState(_state);
  };

  return { state, toggleControl };
};

export const CharacterItem: FC<CharacterItemProps> = props => {
  const { character, player } = props;
  const { state, toggleControl } = useTransformControl();
  const _Y = player === PlayerPosition.Own ? 40 : -40;

  const defaultStyle = {
    transition: "500ms",
  };

  const transformStyles = {
    battle: { transform: `translateY(${-_Y}px)` },
    ready: { transform: `translateY(${_Y}px)` },
  };

  const style = {
    ...defaultStyle,
    ...(transformStyles[state as stateType] ?? {}),
  };
  return (
    <div
      className={styles.CharacterItem}
      style={style}
      role="button"
      tabIndex={0}
      onKeyDown={toggleControl}
      onClick={toggleControl}
    >
      <div className={styles.CharacterHealth}>{character.hp}</div>
      <div className={styles.CharacterEnergy}>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEmptyEnergyItem}></div>
      </div>
      <img src={`/characters/${character.imgID}.png`} alt="" />
    </div>
  );
};

export interface CharacterZoneProps {
  characters: ICharacter[];
  player: PlayerPosition;
}

export default function CharacterZone(props: CharacterZoneProps) {
  const { characters, ...rest } = props;
  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        {characters.map((character, index) => (
          <CharacterItem key={index} character={character} {...rest} />
        ))}
      </div>
    </div>
  );
}
