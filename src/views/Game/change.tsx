import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { useAi, useChoosePhase, useCostDice, useRound } from "@/hooks";
import { ICost, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export default function ChangeCharacterPhase() {
  const { dices: playerDices, setGameStates } = useGameStore();
  const pos = PlayerPosition.Own;
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice(pos);
  const { setActiveCharacter } = useChoosePhase(pos);
  const { onTurnEnd } = useRound();
  const { aiAction } = useAi();
  const dices = playerDices[pos];

  const costs: ICost[] = [
    {
      costNum: 1,
      costType: "Void",
    },
  ];

  const onConfirm = () => {
    if (isCostValid(costs)) {
      costDices();
      setGameStates("phase", Phase.Combat);
      setActiveCharacter();
      onTurnEnd(PlayerPosition.Opponent);
      aiAction();
    } else {
      console.log("error");
    }
  };

  const onCancel = () => {
    setGameStates("phase", Phase.Combat);
  };

  return (
    <>
      <GameLayer onConfirm={onConfirm} onCancel={onCancel} />
      <CostDiceZone
        actives={actives}
        dices={dices}
        onSelectDice={onSelectDice}
      />
    </>
  );
}
