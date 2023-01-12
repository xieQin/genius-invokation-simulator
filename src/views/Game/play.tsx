import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function PlayCardPhase() {
  const { phase, setPhase, activeCards, own, showMessage } = useGameStore();

  if (phase !== Phase.PlayCard) return <></>;

  const card = own.cards[activeCards[0] as number];

  const message = `Play Card: ${card.name}`;
  // showMessage(message);

  const onConfirm = () => {
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
      <GameLayer onConfirm={onConfirm} onCancel={onCancel} />
      <CostDiceZone onSelectDice={onSelectDice} />
    </>
  );
}
