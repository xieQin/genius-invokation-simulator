import { FC, useState } from "react";

import styles from "./index.module.css";

type stateType = "ready" | "battle";

export interface CharacterItemProps {
  character: string;
  player: "own" | "opposite";
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
  const _Y = player === "own" ? 20 : -20;

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
      <div className={styles.CharacterHealth}>10</div>
      <div className={styles.CharacterEnergy}>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
      </div>
      <img src={`/images/${character}-card.png`} alt="" />
    </div>
  );
};

export interface CharacterZoneProps {
  characters: string[];
  player: "own" | "opposite";
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
