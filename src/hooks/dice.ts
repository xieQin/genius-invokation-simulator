import { useState } from "react";

import { ICost, PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";
import { useGameStore } from "@/stores";
import { dicesToMap, diceToNumber } from "@/utils";

export const useCostDice = (pos: PlayerPosition) => {
  const { dices: playerDices, updateDices } = useGameStore();
  const [actives, setActives] = useState<number[]>([]);
  const dices = playerDices[pos];
  const onSelectDice = (dice: GIDiceID, index: number) => {
    if (!actives.includes(index)) {
      setActives([...actives, index]);
    } else {
      const temp = Object.assign([], actives);
      temp.splice(temp.indexOf(index), 1);
      setActives(temp);
    }
  };

  const isCostValid = (costs: ICost[]): boolean => {
    const selectDices = actives.map(i => dices[i]);
    const selectMap = dicesToMap(diceToNumber(selectDices));
    const costMap = new Map();
    costs.forEach(cost => {
      costMap.set(cost.costType, cost.costNum);
    });
    for (const cost of costMap) {
      const diceType = cost[0];
      const diceNum = cost[1];
      const omni = selectMap.get("Omni") ?? 0;
      const _diceType = selectMap.get(diceType) ?? 0;
      if (diceType === "Void" && selectMap.size < diceNum) return false;
      if (diceType !== "Void" && diceNum > omni + _diceType) return false;
    }
    return true;
  };

  const costDices = () => {
    let temp = Object.assign([], dices);
    temp = temp.filter((_, i) => !actives.includes(i));
    updateDices(temp, pos);
  };

  return {
    actives,
    onSelectDice,
    isCostValid,
    costDices,
  };
};
