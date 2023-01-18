import styles from "@/assets/styles/prepare.module.css";
import { CharacterItem } from "@/components/CharacterZone";
import PlayerZone from "@/components/PlayerZone";
import { PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const PreparePlayer = (props: { pos: PlayerPosition }) => {
  const { pos } = props;
  const { players } = useGameStore();
  return (
    <div className={styles.PrepareAreaPlayer}>
      <div className={styles.PrepareAreaPlayerName}>
        <PlayerZone player={players[pos]} />
      </div>
      <div className={styles.PrepareAreaPlayerSection}>
        {players[pos].characters.map(c => (
          <CharacterItem key={c.name} character={c} pos={pos} />
        ))}
      </div>
    </div>
  );
};

export default function PrepareGame() {
  return (
    <div className={styles.PrepareArea}>
      <PreparePlayer pos={PlayerPosition.Own} />
      <div className={styles.PrepareAreaVS}>VS</div>
      <PreparePlayer pos={PlayerPosition.Opposite} />
      <div className={styles.PrepareAreaHint}>Genius Invokation TCG</div>
    </div>
  );
}
