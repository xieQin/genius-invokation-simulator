import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { useChoosePhase } from "@/hooks/phase";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function ChoosePhase() {
  const { phase } = useGameStore();
  const { endChoosePhase } = useChoosePhase();

  if (phase !== Phase.Choose) {
    return <></>;
  }

  return (
    <div className={styles.ChooseZone}>
      {phase === Phase.Choose && (
        <div className={styles.SetActiveCharacterHint}>
          Set Active Character
        </div>
      )}
      <div
        className={styles.SetActiveCharacter}
        aria-hidden="true"
        onClick={() => {
          endChoosePhase();
        }}
      >
        <img src={`${PUBLIC_PATH}/images/choose-character-icon.png`} alt="" />
      </div>
    </div>
  );
}
