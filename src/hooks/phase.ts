import { Action, ICard, Phase, PlayerPosition, PreviewStatus } from "@/models";
import { useGameStore } from "@/stores";

import { useTimeout } from "./utils";

export const useInitPhase = () => {
  return {};
};

export const useStartPhase = (pos: PlayerPosition) => {
  const {
    phase,
    players,
    actions,
    setGameStates,
    popCardStack,
    toggleDeckStatus,
    switchCards,
    updatePlayer,
    draftHandCard,
    pushCardsStack,
  } = useGameStore();

  useTimeout(() => {
    if (phase === Phase.Init) {
      setGameStates("phase", Phase.Start);
    }
  }, 1200);

  const shouldShowSwitchHint = (idx: number) =>
    pos === PlayerPosition.Own && switchCards[pos].includes(idx);

  const isSwitchCardValid = actions[pos] !== Action.ConfirmSwitchCard;

  // todo fix bug
  const onSwitchCardConfirm = () => {
    const switches = switchCards[pos];
    if (switches.length === 0) return;
    setGameStates("actions", [
      Action.ConfirmSwitchCard,
      actions[PlayerPosition.Opponent],
    ]);
    const targethandCards = Object.assign([], players[pos].cards) as ICard[];
    switches.forEach(i => {
      delete targethandCards[i];
      pushCardsStack([players[pos].cards[i]], pos);
      targethandCards[i] = draftHandCard(1, pos)[0];
      popCardStack(1, PlayerPosition.Own);
    });
    updatePlayer(
      {
        ...players[pos],
        cards: targethandCards,
      },
      pos
    );
    setGameStates("switchCards", [[], switchCards[PlayerPosition.Opponent]]);
  };

  const onStartPhaseEnd = () => {
    onSwitchCardConfirm();
    if (actions[pos] === Action.ConfirmSwitchCard) {
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

  return {
    switchCards,
    isSwitchCardValid,
    shouldShowSwitchHint,
    onSwitchCard,
    onStartPhaseEnd,
    onSwitchCardConfirm,
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
