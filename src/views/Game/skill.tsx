import { CostDiceZone } from "@/components/DiceZone";
import GameLayer from "@/components/GameLayer";
import { useAi, useCostDice, useRound, useSkill } from "@/hooks";
import { Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export default function SkillPhase() {
  const {
    activeCharacters,
    getPlayer,
    dices: playDices,
    setGameStates,
    current,
    activeSkills,
  } = useGameStore();
  const pos = PlayerPosition.Own;
  const dices = playDices[pos];
  const { onSelectDice, actives, isCostValid, costDices } = useCostDice(pos);
  const { onCastSkill } = useSkill(pos);
  const { onTurnEnd } = useRound();
  const { aiAction } = useAi();

  const character = getPlayer(pos).characters[activeCharacters[pos]];

  const onConfirm = () => {
    if (pos !== current) return;
    const costs = character.skills[activeSkills[pos]].costs;
    if (isCostValid(costs)) {
      costDices();
      setGameStates("phase", Phase.Combat);
      onCastSkill();
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
