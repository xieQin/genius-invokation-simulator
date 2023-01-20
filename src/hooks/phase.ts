import { Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

import { useTimeout } from "./utils";

export const useInitPhase = () => {
  return {};
};

export const useStartPhase = (pos: PlayerPosition) => {
  const {
    phase,
    setGameStates,
    popCardStack,
    toggleDeckStatus,
    draftHandCard,
    switchCards,
  } = useGameStore();

  useTimeout(() => {
    if (phase === Phase.Init) {
      setGameStates("phase", Phase.Start);
    }
  }, 1200);

  const handCards = draftHandCard(5, PlayerPosition.Own);

  const shouldShowSwitchHint = (idx: number) =>
    pos === PlayerPosition.Own && switchCards[pos].includes(idx);

  const onStartPhaseEnd = () => {
    const switches = switchCards[pos];
    if (switches.length > 0) {
      console.log(switches);
    } else {
      setGameStates("phase", Phase.Choose);
      popCardStack(5, PlayerPosition.Own);
      toggleDeckStatus();
    }
  };

  const onSwitchCard = (cardIdx: number) => {
    if (pos === PlayerPosition.Opponent) return;
    let targetCards = Object.assign([], switchCards[pos]) as number[];
    if (targetCards.includes(cardIdx)) {
      targetCards.splice(targetCards.indexOf(cardIdx), 1);
    } else {
      targetCards = [...targetCards, cardIdx];
    }
    setGameStates("switchCards", [targetCards, switchCards[1]]);
  };
  console.log(switchCards);

  return {
    switchCards,
    onSwitchCard,
    shouldShowSwitchHint,
    handCards,
    onStartPhaseEnd,
  };
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
    pos === PlayerPosition.Opponent;

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
