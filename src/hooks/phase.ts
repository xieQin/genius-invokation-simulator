import { Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

export const useInitPhase = () => {
  return {};
};

export const useStartPhase = () => {
  return {};
};

export const useChoosePhase = (pos: PlayerPosition) => {
  const {
    showMessage,
    setGameStates,
    toggleDeckStatus,
    activeCharacters,
    selectedCharacters,
    phase,
  } = useGameStore();

  const isEndValid = () => activeCharacters[pos] > -1;

  const isSelected = () =>
    (pos === PlayerPosition.Own && selectedCharacters[pos] > -1) ||
    pos === PlayerPosition.Opposite;

  const setActiveCharacter = () => {
    const isChoosePhase = phase === Phase.Choose;
    setGameStates(
      "activeCharacters",
      Object.assign([], activeCharacters, [
        selectedCharacters[0],
        isChoosePhase ? Math.ceil(Math.random() * 3) - 1 : activeCharacters[1],
      ])
    );
  };
  const onChoosePhaseStart = () => {
    showMessage("Choose your first character", () => {
      showMessage("");
    });
  };
  const onChoosePhaseEnd = () => {
    setGameStates("preview", null);
    localStorage.setItem("preview", PreviewStatus.Hide);
    showMessage("Roll Phase", () => {
      showMessage("");
      setGameStates("phase", Phase.Roll);
      toggleDeckStatus();
      setGameStates("selectedCharacters", [-1, -1]);
    });
  };
  return {
    isSelected,
    isEndValid,
    setActiveCharacter,
    onChoosePhaseStart,
    onChoosePhaseEnd,
  };
};

export const useRollPhase = () => {
  return {};
};

export const useCombatPhase = () => {
  return {};
};
