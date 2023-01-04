import { FC } from "react";

import styles from "./index.module.css";

export interface CharacterItemProps {
  character: string;
}

export const CharacterItem: FC<CharacterItemProps> = props => {
  const { character } = props;
  return (
    <div className={styles.CharacterItem}>
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
}

export default function CharacterZone(props: CharacterZoneProps) {
  const { characters } = props;
  return (
    <div className={styles.CharacterZone}>
      <div className={styles.CharacterList}>
        {characters.map((character, index) => (
          <CharacterItem key={index} character={character} />
        ))}
      </div>
    </div>
  );
}
