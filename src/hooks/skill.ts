import {
  Action,
  EffectTarget,
  EffectType,
  ICost,
  ISkill,
  Phase,
  PlayerPosition,
  SkillCombatType,
  SummonsID,
  TransEffectSubTypeToGIElement,
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
    current,
  } = useGameStore();
  const dices = playerDices[pos];

  const onCastSkill = () => {
    if (pos !== current) return;
    const activeSkill = activeSkills[pos];
    if (activeSkill < 0) return;
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
    for (const effect of skill.effect) {
      if (effect.value > 0 && effect.type === EffectType.Damage) {
        updateHp(-effect.value, Math.abs(pos - 1), effect.target);
        if (effect.subType in TransEffectSubTypeToGIElement) {
          const _element =
            effect.subType as keyof typeof TransEffectSubTypeToGIElement;
          updateElementStatus(
            TransEffectSubTypeToGIElement[_element],
            Math.abs(pos - 1),
            effect.target
          );
        }
      }
      if (effect.type === EffectType.Heal) {
        updateHp(effect.value, pos, effect.target);
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
    const effect = skill.effect;
    for (const d of effect) {
      if (
        d.target === EffectTarget.Opponent &&
        index === activeCharacters[pos]
      ) {
        return true;
      }
      if (d.target === EffectTarget.All && d.value > 0) {
        return true;
      }
      if (d.target === EffectTarget.Back && d.value > 0) {
        return true;
      }
    }
    return false;
  };

  const isSkillValid = (costs: ICost[] = []) => {
    return pos === current && isCostDiceValid(costs, dices);
  };

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
    if (idx === activeCharacters[pos] && skill.effect.length > 0)
      return skill.effect[0].value;
    return skill.effect[1]?.value || 0;
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
