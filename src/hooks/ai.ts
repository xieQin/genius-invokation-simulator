import { Phase, PlayerPosition } from "@/models";
import { useGameStore } from "@/stores";

import { useRound } from "./round";
import { useSkill } from "./skill";

// todo fix bugs
export const useAi = () => {
  const aiPos = PlayerPosition.Opponent;
  const playerPos = PlayerPosition.Own;
  const { phase, players, activeCharacters, setGameStates, activeSkills } =
    useGameStore();
  const isChoosePhase = phase === Phase.Choose;
  const { onCastSkill, isSkillValid } = useSkill(aiPos);
  const { onTurnEnd } = useRound();

  const aiRandom = (num = 0.75) => Math.random() > num;

  const aiSetActiveCharacter = () =>
    isChoosePhase || activeCharacters[1] === -1
      ? Math.ceil(Math.random() * 3) - 1
      : activeCharacters[1];

  const aiChangeCharacter = () => {
    const active = Math.ceil(Math.random() * 3) - 1;
    if (active === activeCharacters[aiPos]) return;
    setGameStates(
      "activeCharacters",
      Object.assign([], [activeCharacters[playerPos], active])
    );
    onTurnEnd(playerPos);
  };

  const aiSetActiveSkill = () => {
    const activeCharacter = activeCharacters[aiPos];
    const skills = players[aiPos].characters[activeCharacter].skills;
    skills.forEach((skill, index) => {
      if (isSkillValid(skill.costs) && aiRandom(0.1)) {
        setGameStates(
          "activeSkills",
          Object.assign([], [activeSkills[playerPos], index])
        );
        return;
      }
    });
  };

  const aiCastSkill = () => {
    aiSetActiveSkill();
    onCastSkill();
    onTurnEnd(playerPos);
  };

  const aiAction = () => {
    setTimeout(() => {
      const castSkill = aiRandom(0.2);
      const changeCharacter = aiRandom();
      castSkill && aiCastSkill();
      changeCharacter && aiChangeCharacter();
      !castSkill && !changeCharacter && onTurnEnd(playerPos);
    }, 2000);
  };

  return {
    aiSetActiveCharacter,
    aiChangeCharacter,
    aiCastSkill,
    aiSetActiveSkill,
    aiAction,
  };
};
