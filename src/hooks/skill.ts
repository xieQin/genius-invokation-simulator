import { Action, ICost, ISkill, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";
import { isCostDiceValid } from "@/utils";

export const useSkill = (pos: PlayerPosition) => {
  const {
    dices: playerDices,
    activeCharacters,
    phase,
    players,
    activeSkills,
    actions,
    setGameStates,
  } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = () => {
    setGameStates("actions", [
      Action.CastSkill,
      actions[PlayerPosition.Opponent],
    ]);
    return {};
  };

  const shouldCharacterHignlight = (index: number) => {
    return phase === Phase.Skill && index === activeCharacters[pos];
  };

  const isSkillValid = (costs: ICost[] = []) => isCostDiceValid(costs, dices);

  // todo calculate skill damage
  const calDamage = () => {
    const enemy = Math.abs(pos - 1);
    const activeSkill = activeSkills[enemy];
    const skill =
      players[enemy].characters[activeCharacters[enemy]].skills[activeSkill];
    return {
      damage: Math.ceil(Math.random() * 5) - 1,
      type: skill.type,
    };
  };

  const getMessage = (skill: ISkill) => {
    return skill;
  };

  const getSkillAnimation = () => {
    const own = activeCharacters[PlayerPosition.Own];
    const opponent = activeCharacters[PlayerPosition.Opponent];
    if (own === opponent) return 1;
    if (own - opponent === -1) return 2;
    if (own - opponent === 1) return 3;
    if (own - opponent === -2) return 4;
    if (own - opponent === 2) return 5;
    return "";
  };

  return {
    getMessage,
    isSkillValid,
    onCastSkill,
    shouldCharacterHignlight,
    calDamage,
    getSkillAnimation,
  };
};
