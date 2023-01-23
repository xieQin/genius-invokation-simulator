import {
  Action,
  ICost,
  ISkill,
  Phase,
  PlayerPosition,
  SkillCombatType,
  SkillTarget,
  SummonsID,
  TransDamageTypeToGIElement,
} from "@/models";
import { useGameStore } from "@/stores";
import { isCostDiceValid, NameIDTrans } from "@/utils";

export const useSkill = (pos: PlayerPosition) => {
  const {
    dices: playerDices,
    activeCharacters,
    phase,
    players,
    activeSkills,
    actions,
    addSummon,
    updateEnergy,
    updateHp,
    updateElementStatus,
    setGameStates,
  } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = () => {
    const activeSkill = activeSkills[pos];
    const skill =
      players[pos].characters[activeCharacters[pos]].skills[activeSkill];
    setGameStates("actions", [
      Action.CastSkill,
      actions[PlayerPosition.Opponent],
    ]);
    if (skill.summons.length > 0) {
      const summons = skill.summons;
      addSummon(summons.map(s => NameIDTrans(s)) as SummonsID[], pos);
    }
    // todo handle skill shield
    if (skill.shield.length > 0) {
      console.log(skill.shield);
    }
    if (
      skill.type.includes(SkillCombatType.ElementalSkill) ||
      skill.type.includes(SkillCombatType.NormalAttack)
    ) {
      updateEnergy(1, pos);
    }
    if (skill.type.includes(SkillCombatType.ElementalBurst)) {
      updateEnergy(-10, pos);
    }
    for (const damage of skill.damage) {
      if (damage.damage > 0) {
        updateHp(-damage.damage, Math.abs(pos - 1), damage.target);
        if (damage.damageType in TransDamageTypeToGIElement) {
          const _element =
            damage.damageType as keyof typeof TransDamageTypeToGIElement;
          updateElementStatus(
            TransDamageTypeToGIElement[_element],
            Math.abs(pos - 1),
            damage.target
          );
        }
      }
    }
    for (const heal of skill.heal) {
      if (heal.heal > 0) {
        updateHp(heal.heal, pos, heal.target);
      }
    }
  };

  const shouldTargetHighlight = (index: number) => {
    if (phase !== Phase.Skill) return false;
    if (pos === PlayerPosition.Own) return index === activeCharacters[pos];
    const enemy = Math.abs(pos - 1);
    const activeSkill = activeSkills[enemy];
    const skill =
      players[enemy].characters[activeCharacters[enemy]].skills[activeSkill];
    const damage = skill.damage;
    for (const d of damage) {
      if (
        d.target === SkillTarget.Opponent &&
        index === activeCharacters[pos]
      ) {
        return true;
      }
      if (d.target === SkillTarget.All && d.damage > 0) {
        return true;
      }
      if (d.target === SkillTarget.Back && d.damage > 0) {
        return true;
      }
    }
    return false;
  };

  const isSkillValid = (costs: ICost[] = []) => isCostDiceValid(costs, dices);

  const isEnergyValid = (skill: ISkill) => {
    if (pos === PlayerPosition.Opponent) return false;
    if (skill.type.includes(SkillCombatType.ElementalBurst)) {
      const character = players[pos].characters[activeCharacters[pos]];
      return character.currentEnergy === character.energy;
    }
    return true;
  };

  const calDamage = (idx: number) => {
    const enemy = Math.abs(pos - 1);
    const activeSkill = activeSkills[enemy];
    const skill =
      players[enemy].characters[activeCharacters[enemy]].skills[activeSkill];
    if (idx === activeCharacters[pos]) return skill.damage[0].damage;
    return skill.damage[1].damage;
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
    isEnergyValid,
    onCastSkill,
    shouldTargetHighlight,
    calDamage,
    getSkillAnimation,
  };
};
