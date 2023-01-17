import { Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

export const useInitPhase = () => {
  return {};
};

export const useStartPhase = () => {
  return {};
};

export const useChoosePhase = () => {
  const {
    showMessage,
    setGameStates,
    toggleDeckStatus,
    activeCharacters,
    phase,
  } = useGameStore();

  const isEndValid = () => activeCharacters[PlayerPosition.Own] > -1;

  const setActiveCharacter = (index: number) => {
    const isChoosePhase = phase === Phase.Choose;
    setGameStates(
      "activeCharacters",
      Object.assign([], activeCharacters, [
        index,
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
