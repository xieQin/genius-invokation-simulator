import { Action, GIDice, ISkill, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

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

  // todo fix bugs
  const isSkillValid = (skill: ISkill) => {
    const diceMap = new Map();
    dices.map(d => {
      diceMap.set(d, diceMap.has(d) ? diceMap.get(d) + 1 : 1);
    });
    const costs = skill.costs;
    for (let i = 0; i < costs.length; i++) {
      const cost = costs[i];
      if (cost.costType in GIDice) {
        const _c = diceMap.get(cost.costType);
        diceMap.set(cost.costType, _c - cost.costNum);
        if (isNaN(_c) || _c < 0) {
          return false;
        }
        if (_c === 0) {
          diceMap.delete(cost.costType);
        }
      } else if (cost.costType === "Void") {
        if (diceMap.size < cost.costNum) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  };

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
