import { useState } from "react";

import { ICost, PlayerPosition } from "@/models";
import { GIDice, GIDiceID } from "@/models/die";
import { useGameStore } from "@/stores";

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

  // todo fix cost valid bug
  const isCostValid = (costs: ICost[]): boolean => {
    const cost = costs[0];
    const selectDices = actives.map(i => dices[i]);
    const isCostNumValid = actives.length === cost.costNum;
    let isCostTypeValid = false;
    if (cost.costType === "") {
      isCostTypeValid = selectDices.every(
        d => d === selectDices[0] || d === GIDice[GIDice.Omni]
      );
    } else if (cost.costType === "Void") {
      const set = new Set(selectDices);
      isCostTypeValid = selectDices.length === set.size;
    } else {
      isCostTypeValid = selectDices.every(
        d => d === cost.costType || d === GIDice[GIDice.Omni]
      );
    }
    return isCostNumValid && isCostTypeValid;
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
