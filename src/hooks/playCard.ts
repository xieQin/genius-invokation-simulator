import { CardMainType, ICard, PlayerPosition } from "@/models";
import { useGameStore } from "@/views/Game/store";

export const usePlayCard = () => {
  const { addSupport, removeHandCard, activeCards } = useGameStore();
  // const player: IPlayer = pos === PlayerPosition.Own ? own : opposite;

  const onPlayCard = (card: ICard, pos: PlayerPosition) => {
    if (card.mainType === CardMainType.Support) {
      addSupport(card, pos);
    }
    if (card.mainType === CardMainType.Event) {
      console.log(card, "Event Card");
    }
    removeHandCard(activeCards[0] as number, pos);
  };

  return {
    onPlayCard,
  };
};
