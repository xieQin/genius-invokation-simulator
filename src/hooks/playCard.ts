import { CardMainType, ICard, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const usePlayCard = () => {
  const {
    addSupport,
    removeHandCard,
    activeCards,
    showMessage,
    setGameStates,
  } = useGameStore();
  // const player: IPlayer = pos === PlayerPosition.Own ? own : opposite;

  const onPlayCard = (card: ICard, pos: PlayerPosition) => {
    if (card.mainType === CardMainType.Support) {
      addSupport(card, pos);
    }
    if (card.mainType === CardMainType.Event) {
      console.log(card, "Event Card");
    }
    if (card.mainType === CardMainType.Equipment) {
      setGameStates("phase", Phase.Equipment);
      console.log(card);
    }
    // showMessage("");
    // removeHandCard(activeCards[0] as number, pos);
  };

  const getMessage = (card: ICard) => {
    if (card.mainType === CardMainType.Support) {
      return `Play Card: ${card.name}`;
    }
    if (card.mainType === CardMainType.Event) {
      return `Play Card: ${card.name}`;
    }
    if (card.mainType === CardMainType.Equipment) {
      return `Select a character to equip with this ${
        card.subType[card.subType.length - 1]
      }`;
    }
  };

  return {
    getMessage,
    onPlayCard,
  };
};
