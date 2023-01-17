import { GIDice, ISkill, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const useSkill = (pos: PlayerPosition) => {
  const { showMessage, dices: playerDices } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = (skill: ISkill, pos: PlayerPosition) => {
    showMessage("");
    return {
      skill,
      pos,
    };
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

  const getMessage = (skill: ISkill) => {
    return skill;
  };

  return {
    getMessage,
    isSkillValid,
    onCastSkill,
  };
};
