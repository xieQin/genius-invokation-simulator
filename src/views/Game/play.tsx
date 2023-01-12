import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { NoticeText } from "@/components/Notice";
import { CardMainType } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function PlayCardPhase() {
  const { phase, setPhase, activeCards, own, addSupport, removeHandCard } =
    useGameStore();

  if (phase !== Phase.PlayCard) return <></>;

  const card = own.cards[activeCards[0] as number];

  const message = `Play Card: ${card.name}`;

  const onConfirm = () => {
    if (card.mainType === CardMainType.Support) {
      addSupport(card, own.position);
      removeHandCard(activeCards[0] as number, own.position);
    }
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
