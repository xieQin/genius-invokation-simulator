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
    addSummon,
    setGameStates,
  } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = () => {
    const skill = activeSkills[pos];
    const use_skill =
      players[pos].characters[activeCharacters[pos]].skills[skill];
    setGameStates("actions", [
      Action.CastSkill,
      actions[PlayerPosition.Opponent],
    ]);
    if (use_skill.name === "Mirror Reflection of Doom") {
      addSummon("Reflection", pos);
    }
    if (use_skill.name === "Forbidden Creation - Isomer 75 / Type II") {
      addSummon("LargeWindSpirit", pos);
    }
    if (use_skill.name === "Stellar Restoration") {
      addSummon("LightningStiletto", pos);
    }
    if (use_skill.name === "Guoba Attack") {
      addSummon("Guoba", pos);
    }
    if (use_skill.name === "Trump-Card Kitty") {
      addSummon("CuileinAnbar", pos);
    }
    if (use_skill.name === "Celestial Shower") {
      addSummon("SacredCryoPearl", pos);
    }
    if (use_skill.name === "Signature Mix") {
      addSummon("DrunkenMist", pos);
    }
    if (use_skill.name === "Kamisato Art: Soumetsu") {
      addSummon("FrostflakeSekiNoTo", pos);
    }
    if (use_skill.name === "Let the Show Begin♪") {
      addSummon("MelodyLoop", pos);
    }
    if (use_skill.name === "Nightrider") {
      addSummon("Oz", pos);
    }
    if (use_skill.name === "Dandelion Breeze") {
      addSummon("DandelionField", pos);
    }
    if (use_skill.name === "Oceanid Mimic Summoning") {
      addSummon("OceanidMimicFerret", pos);
    }
    if (use_skill.name === "Frosty Assault") {
      addSummon("ShadowsordGallopingFrost", pos);
    }
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
