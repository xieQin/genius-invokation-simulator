import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { NoticeText } from "@/components/Notice";
import { useCostDice } from "@/hooks/dice";
import { usePlayCard } from "@/hooks/playCard";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function PlayCardPhase() {
  const { activeCards, own, dices, setGameStates } = useGameStore();
  const { onPlayCard, getMessage } = usePlayCard();
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice();

  const card = own.cards[activeCards[0]];

  const message = getMessage(card);

  const onConfirm = () => {
    if (isCostValid(card.cost)) {
      costDices();
      onPlayCard(card, PlayerPosition.Own);
      setGameStates("phase", Phase.Combat);
    } else {
      console.log("error");
    }
  };

  const onCancel = () => {
    setGameStates("phase", Phase.Combat);
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
