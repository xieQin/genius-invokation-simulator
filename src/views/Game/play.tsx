import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { NoticeText } from "@/components/Notice";
import { usePlayCard } from "@/hooks/playCard";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function PlayCardPhase() {
  const { setPhase, activeCards, own } = useGameStore();
  const { onPlayCard } = usePlayCard();

  const card = own.cards[activeCards[0] as number];

  const message = `Play Card: ${card.name}`;

  const onConfirm = () => {
    onPlayCard(card, PlayerPosition.Own);
    setPhase(Phase.Combat);
  };

  const onCancel = () => {
    setPhase(Phase.Combat);
    console.log(111);
  };

  const onSelectDice = () => {
    console.log(111222);
  };

  console.log(activeCards, own.cards, message);
  return (
    <>
      <NoticeText message={message} />
      <GameLayer onConfirm={onConfirm} onCancel={onCancel} />
      <CostDiceZone onSelectDice={onSelectDice} />
    </>
  );
}
