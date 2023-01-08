import { FC, useState } from "react";

import { ICharacter, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export type stateType = "ready" | "battle";

export interface CharacterItemProps {
  character: ICharacter;
}

export const useTransformControl = () => {
  const [state, setState] = useState(["ready", "ready", "ready"]);
  const animationControl = (i: number) => {
    const _state = state.map((s, index) =>
      index != i ? "ready" : s === "ready" ? "battle" : "ready"
    );
    setState(_state);
  };

  return { state, animationControl };
};

export const CharacterItem: FC<CharacterItemProps> = props => {
  const { character } = props;
  return (
    <div className={styles.CharacterItem}>
      <div className={styles.CharacterHealth}>{character.hp}</div>
      <div className={styles.CharacterEnergy}>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEmptyEnergyItem}></div>
      </div>
      <div className={styles.CharacterEquipment}>
        <div className={styles.CharacterWeapon}></div>
        <div className={styles.CharacterArtifact}></div>
      </div>
      <img src={`/characters/${character.imgID}.png`} alt="" />
    </div>
  );
};

export interface CharacterZoneProps {
  characters: ICharacter[];
  player: PlayerPosition;
  setActive?: (v: number) => void;
  active: number;
}

export default function CharacterZone(props: CharacterZoneProps) {
  const { characters, player, active, setActive } = props;
  const { state, animationControl } = useTransformControl();
  const toggleControl = (index: number) => {
    animationControl(index);
    player === PlayerPosition.Own &&
      setActive &&
      setActive(active === index ? -1 : index);
  };

  const _Y = player === PlayerPosition.Own ? 40 : -40;

  const defaultStyle = {
    transition: "500ms",
  };

  const transformStyles = {
    battle: { transform: `translateY(${-_Y}px)` },
    ready: { transform: `translateY(${_Y}px)` },
  };

  const style = (index: number) => ({
    ...defaultStyle,
    ...(transformStyles[state[index] as stateType] ?? {}),
  });

  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        {characters.map((character, index) => (
          <div
            key={index}
            tabIndex={index}
            role="button"
            style={style(index)}
            onKeyDown={() => toggleControl(index)}
            onClick={() => toggleControl(index)}
          >
            <CharacterItem character={character} />
          </div>
        ))}
      </div>
    </div>
  );
}
