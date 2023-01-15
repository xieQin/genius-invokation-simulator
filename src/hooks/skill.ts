import { ISkill, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

export const useSkill = () => {
  const { showMessage } = useGameStore();

  const onCastSkill = (skill: ISkill, pos: PlayerPosition) => {
    showMessage("");
    return {
      skill,
      pos,
    };
  };

  const getMessage = (skill: ISkill) => {
    return skill;
  };

  return {
    getMessage,
    onCastSkill,
  };
};
