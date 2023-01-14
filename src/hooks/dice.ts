import { useState } from "react";

import { ICost } from "@/models";
import { GIDice, GIDiceID } from "@/models/die";
import { useGameStore } from "@/views/Game/store";

export const useCostDice = () => {
  const { dices, setDices } = useGameStore();
  const [actives, setActives] = useState<number[]>([]);
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
    console.log(temp, actives, dices);
    setDices(temp);
  };

  return {
    actives,
    onSelectDice,
    isCostValid,
    costDices,
  };
};
