import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { useCostDice, useSkill, useTimeout } from "@/hooks";
import { Action, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export default function SkillPhase() {
  const {
    activeCharacters,
    getPlayer,
    dices: playDices,
    setGameStates,
    activeSkills,
    actions,
  } = useGameStore();
  const pos = PlayerPosition.Own;
  const dices = playDices[pos];
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice(pos);
  const { onCastSkill } = useSkill(pos);

  const character = getPlayer(pos).characters[activeCharacters[pos]];

  console.log(actions);
  const onConfirm = () => {
    const costs = character.skills[activeSkills[pos]].costs;
    if (isCostValid(costs)) {
      costDices();
      setGameStates("phase", Phase.Combat);
      onCastSkill();
      console.log(actions);
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
