import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { useChoosePhase } from "@/hooks";
import { useCostDice } from "@/hooks/dice";
import { ICost, PlayerPosition } from "@/models";
import { Phase } from "@/models/phase";
import { useGameStore } from "@/stores";

export default function ChangeCharacterPhase() {
  const { dices, setGameStates, selectedCharacters } = useGameStore();
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice();
  const { setActiveCharacter } = useChoosePhase();

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
      setActiveCharacter(selectedCharacters[PlayerPosition.Own]);
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
