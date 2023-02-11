import { useState } from "react";

import { GIDiceID, ICost, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";
import { isCostDiceValid } from "@/utils";

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
    return isCostDiceValid(costs, selectDices);
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
