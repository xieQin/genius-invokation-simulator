import { Phase } from "@/models";
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

  const setActiveCharacter = (index: number) => {
    setGameStates(
      "activeCharacters",
      Object.assign([], activeCharacters, [index, activeCharacters[1]])
    );
  };
  const endChoosePhase = () => {
    showMessage("Roll Phase", () => {
      showMessage("");
      setGameStates("phase", Phase.Roll);
      toggleDeckStatus();
    });
  };
  return {
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
