import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { NoticeText } from "@/components/Notice";
import { useCostDice } from "@/hooks/dice";
import { usePlayCard } from "@/hooks/playCard";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";

import { useGameStore } from "./store";

export default function PlayCardPhase() {
  const { setPhase, activeCards, own, dices } = useGameStore();
  const { onPlayCard, getMessage } = usePlayCard();
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice();

  const card = own.cards[activeCards[0] as number];

  const message = getMessage(card);

  const onConfirm = () => {
    if (isCostValid(card.cost)) {
      costDices();
      onPlayCard(card, PlayerPosition.Own);
      setPhase(Phase.Combat);
    } else {
      console.log("error");
    }
  };

  const onCancel = () => {
    setPhase(Phase.Combat);
  };

  return (
    <>
      <NoticeText message={message} />
      <GameLayer onConfirm={onConfirm} onCancel={onCancel} />
      <CostDiceZone
        actives={actives}
        dices={dices}
        onSelectDice={onSelectDice}
      />
    </>
  );
}
