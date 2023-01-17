import styles from "@/assets/styles/prepare.module.css";
import { CharacterItem } from "@/components/CharacterZone";
import PlayerZone from "@/components/PlayerZone";
import { useGameStore } from "@/stores";

export default function PrepareGame() {
  const { players } = useGameStore();
  return (
    <div className={styles.PrepareArea}>
      <div className={styles.PrepareAreaPlayer}>
        <div className={styles.PrepareAreaPlayerName}>
          <PlayerZone player={players[0]} />
        </div>
        <div className={styles.PrepareAreaPlayerSection}>
          {players[0].characters.map(c => (
            <CharacterItem key={c.name} character={c} />
          ))}
        </div>
      </div>
      <div className={styles.PrepareAreaVS}>VS</div>
      <div className={styles.PrepareAreaPlayer}>
        <div className={styles.PrepareAreaPlayerName}>
          <PlayerZone player={players[1]} />
        </div>
        <div className={styles.PrepareAreaPlayerSection}>
          {players[1].characters.map(c => (
            <CharacterItem key={c.name} character={c} />
          ))}
        </div>
      </div>
      <div className={styles.PrepareAreaHint}>Genius Invokation TCG</div>
    </div>
  );
}
