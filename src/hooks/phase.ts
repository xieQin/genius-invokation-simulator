import {
  Action,
  GIDiceID,
  ICard,
  Phase,
  PlayerPosition,
  PreviewStatus,
} from "@/models";
import { useGameStore } from "@/stores";
import { reRollDice, rollDice } from "@/utils";

import { useAi } from "./ai";
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
  const switches = switchCards[pos];

  // todo fix bug
  const onSwitchCardConfirm = () => {
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
    if (switches.length === 0) {
      setGameStates("phase", Phase.Choose);
      popCardStack(5, PlayerPosition.Own);
      toggleDeckStatus();
      return;
    }
    onSwitchCardConfirm();
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
  } = useGameStore();
  const { aiSetActiveCharacter } = useAi();

  const isEndValid = () => activeCharacters[pos] > -1;

  const isSelected = () =>
    (pos === PlayerPosition.Own && selectedCharacters[pos] > -1) ||
    pos === PlayerPosition.Opponent;

  const setActiveCharacter = () => {
    setGameStates(
      "activeCharacters",
      Object.assign([], activeCharacters, [
        selectedCharacters[0],
        aiSetActiveCharacter(),
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

export const useRollPhase = (pos: PlayerPosition) => {
  const {
    phase,
    rerollDices,
    setGameStates,
    shouldHideDeck,
    toggleDeckStatus,
    showMessage,
    updateDices,
    actions,
    players,
    activeCharacters,
  } = useGameStore();
  const isRollValid = shouldHideDeck() && phase === Phase.Roll;
  const isRerollValid = actions[pos] !== Action.ConfirmRerollDice;
  const rerolls = rerollDices[pos];
  const player = players[pos];
  const elements = player.characters.map(c => c.element);
  const elementSorted = Array.from(
    new Set(
      [elements[activeCharacters[pos]], ...elements].filter(
        e => e !== undefined
      )
    )
  );
  console.log(elementSorted);

  const shouldReroll = (idx: number) => rerolls.includes(idx);

  const onRollPhaseStart = () => {
    const l = localStorage.getItem("cacheDices");
    let cacheDices = l === null ? [] : l.split(",");
    if (!cacheDices || l === null) {
      cacheDices = rollDice(8, elementSorted);
      localStorage.setItem("cacheDices", cacheDices.join(","));
    }
    return cacheDices;
  };

  const onRerollDice = (idx: number) => {
    if (pos === PlayerPosition.Opponent) return;
    let targetDices = Object.assign([], rerolls) as number[];
    if (targetDices.includes(idx)) {
      targetDices.splice(targetDices.indexOf(idx), 1);
    } else {
      targetDices = [...targetDices, idx];
    }
    setGameStates("rerollDices", [targetDices, rerollDices[1]]);
  };

  const onRerollDiceConfirm = () => {
    setGameStates("actions", [
      Action.ConfirmRerollDice,
      actions[PlayerPosition.Opponent],
    ]);
    let targetDices = localStorage
      .getItem("cacheDices")
      ?.split(",") as GIDiceID[];
    targetDices = reRollDice(targetDices, rerolls, elementSorted);
    // todo fix dice render
    localStorage.setItem("cacheDices", targetDices.join(","));
    updateDices(targetDices, pos);
    setGameStates("rerollDices", [[], rerollDices[PlayerPosition.Opponent]]);
  };

  const onRollPhaseEnd = (dices: GIDiceID[]) => {
    if (rerolls.length === 0) {
      localStorage.removeItem("cacheDices");
      setGameStates("phase", Phase.Combat);
      setGameStates("dices", [dices, rollDice(8, elementSorted)]);
      toggleDeckStatus();
      showMessage("Action Phase", () => {
        showMessage("");
      });
      return;
    }
    onRerollDiceConfirm();
  };
  return {
    isRollValid,
    isRerollValid,
    shouldReroll,
    onRerollDice,
    onRerollDiceConfirm,
    onRollPhaseStart,
    onRollPhaseEnd,
  };
};

export const useCombatPhase = () => {
  return {};
};
