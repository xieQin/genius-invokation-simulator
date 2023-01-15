import { Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

export const useInitPhase = () => {
  return {};
};

export const useStartPhase = () => {
  return {};
};

export const useChoosePhase = () => {
  const { showMessage, setGameStates, toggleDeckStatus, activeCharacters } =
    useGameStore();

  const isEndValid = () => activeCharacters[PlayerPosition.Own] > -1;

  const setActiveCharacter = (index: number) => {
    setGameStates(
      "activeCharacters",
      Object.assign([], activeCharacters, [index, activeCharacters[1]])
    );
  };
  const endChoosePhase = () => {
    setGameStates("preview", null);
    localStorage.setItem("preview", PreviewStatus.Hide);
    showMessage("Roll Phase", () => {
      showMessage("");
      setGameStates("phase", Phase.Roll);
      toggleDeckStatus();
    });
  };
  return {
    isEndValid,
    setActiveCharacter,
    endChoosePhase,
  };
};

export const useRollPhase = () => {
  return {};
};

export const useCombatPhase = () => {
  return {};
};
