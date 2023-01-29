import { CardTimeType, EffectSubType, EffectType, ISummon } from "@/models";

export const useSummons = (summon: ISummon) => {
  const getUsage = () => {
    let usage = 0;
    summon.cardModify.forEach(modify => {
      if (modify.time.length > 0) {
        modify.time.forEach(t => {
          if (t.type === CardTimeType.Round) {
            usage = t.value;
          }
        });
      }
    });
    return usage;
  };

  const getElemental = () => {
    let element = EffectSubType.None;
    summon.cardModify.forEach(modify => {
      if (modify.effect.length > 0) {
        modify.effect.forEach(e => {
          if (e.type === EffectType.Damage) {
            element = e.subType;
          }
        });
      }
    });
    return element;
  };

  const getDamage = () => {
    let damage = 0;
    summon.cardModify.forEach(modify => {
      if (modify.effect.length > 0) {
        modify.effect.forEach(e => {
          if (e.type === EffectType.Damage) {
            damage = e.value;
          }
        });
      }
    });
    return damage;
  };

  return {
    getUsage,
    getDamage,
    getElemental,
  };
};
