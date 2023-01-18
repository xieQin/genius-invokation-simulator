import { GIDice, ISkill, Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const useSkill = (pos: PlayerPosition) => {
  const {
    showMessage,
    dices: playerDices,
    activeCharacters,
    phase,
    players,
    activeSkills,
  } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = () => {
    showMessage("");
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

  return {
    getMessage,
    isSkillValid,
    onCastSkill,
    shouldCharacterHignlight,
    calDamage,
  };
};
