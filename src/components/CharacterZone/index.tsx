import { FC, useState } from "react";

import { PUBLIC_PATH } from "@/configs";
import { useChoosePhase } from "@/hooks/phase";
import { ICharacter, Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

import styles from "./index.module.css";

export type stateType = "ready" | "battle";

export interface CharacterItemProps {
  character: ICharacter;
  player: PlayerPosition;
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
  const { character, player } = props;
  const { setGameStates } = useGameStore();
  if (!character) {
    return <></>;
  }
  return (
    <div
      aria-hidden="true"
      className={styles.CharacterItem}
      onClick={() => {
        if (player === PlayerPosition.Opposite) return;
        localStorage.setItem("preview", PreviewStatus.Show);
        setGameStates("preview", character);
      }}
    >
      {/* <div className={styles.CharacterSelected}></div> */}
      <div className={styles.CharacterElementStatus}>
        <div className={styles.CharacterElementStatusItem}>
          <img src={`${PUBLIC_PATH}/images/dendro-elementicon.png`} alt="" />
        </div>
        <div className={styles.CharacterElementStatusItem}>
          <img src={`${PUBLIC_PATH}/images/electro-elementicon.png`} alt="" />
        </div>
      </div>
      <div className={styles.CharacterHealth}>{character.hp}</div>
      <div className={styles.CharacterEnergy}>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEnergyItem}></div>
        <div className={styles.CharacterEmptyEnergyItem}></div>
      </div>
      <div className={styles.CharacterEquipment}>
        <div className={styles.CharacterWeapon}></div>
        <div className={styles.CharacterArtifact}></div>
        <div className={styles.CharacterTalent}></div>
      </div>
      <img src={`${PUBLIC_PATH}/characters/${character.imgID}.png`} alt="" />
    </div>
  );
};

export interface CharacterZoneProps {
  characters: ICharacter[];
  player: PlayerPosition;
}

export default function CharacterZone(props: CharacterZoneProps) {
  const { characters, player } = props;
  const [active, setActive] = useState(-1);
  const { phase } = useGameStore();
  const { setActiveCharacter, endChoosePhase } = useChoosePhase();
  const { state, animationControl } = useTransformControl();
  const toggleControl = (index: number) => {
    if (player === PlayerPosition.Own && phase === Phase.Choose) {
      if (index === active) {
        animationControl(index);
        setActiveCharacter(index);
        endChoosePhase();
      }
      setActive(index);
    }
  };

  const _Y = player === PlayerPosition.Own ? 20 : -20;

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
            style={style(index)}
            aria-hidden="true"
            onClick={() => toggleControl(index)}
          >
            <CharacterItem character={character} player={player} />
          </div>
        ))}
      </div>
    </div>
  );
}
