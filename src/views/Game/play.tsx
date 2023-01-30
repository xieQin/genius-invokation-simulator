import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { NoticeText } from "@/components/Notice";
import { useCostDice } from "@/hooks/dice";
import { usePlayCard } from "@/hooks/playCard";
import { PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function PlayCardPhase() {
  const {
    activeCards,
    getPlayer,
    dices: playDices,
    setGameStates,
    selectedCharacters,
  } = useGameStore();
  const pos = PlayerPosition.Own;
  const dices = playDices[pos];
  const { onPlayCard, getMessage, isCardValid } = usePlayCard();
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice(pos);

  const card = getPlayer(PlayerPosition.Own).cards[activeCards[pos]];

  const message = getMessage(card);

  const onConfirm = () => {
    if (
      isCardValid(card, PlayerPosition.Own) &&
      isCostValid(card.cost) &&
      selectedCharacters[pos] >= 0
    ) {
      costDices();
      onPlayCard(card, PlayerPosition.Own);
      setGameStates("phase", Phase.Combat);
    } else {
      console.log("error");
    }
  };

  const onCancel = () => {
    setGameStates("phase", Phase.Combat);
    setGameStates(
      "activeCards",
      Object.assign([], activeCards, [-1, activeCards[1]])
    );
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
