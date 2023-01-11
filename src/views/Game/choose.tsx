import styles from "@/assets/styles/game.module.css";
import { PUBLIC_PATH } from "@/configs";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function ChoosePhase() {
  const { phase, setPhase, showMessage, toggleDeckStatus } = useGameStore();

  if (phase !== Phase.Choose) {
    return <></>;
  }

  const onChooseCharacter = () => {
    showMessage("Roll Phase", () => {
      showMessage("");
      setPhase(Phase.Roll);
      toggleDeckStatus();
    });
  };

  return (
    <div
      className={styles.SetActiveCharacter}
      aria-hidden="true"
      onClick={() => {
        onChooseCharacter();
      }}
    >
      <img src={`${PUBLIC_PATH}/images/choose-character-icon.png`} alt="" />
    </div>
  );
}
