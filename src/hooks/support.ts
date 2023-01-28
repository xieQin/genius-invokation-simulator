import { CardTimeType, EffectType, ICard } from "@/models";

// todo fix bugs
export const useSupport = (card: ICard) => {
  const getUsage = () => {
    let usage = 0;
    card.cardModify.forEach(modify => {
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
  const getHeal = () => {
    let heal = 0;
    card.cardModify.forEach(modify => {
      if (modify.effect.length > 0) {
        modify.effect.forEach(t => {
          if (t.type === EffectType.Heal) {
            heal = t.value;
          }
        });
      }
    });
    return heal;
  };
  const getIcon = () => {
    let icon = 0;
    card.cardEffect.forEach(effect => {
      if (effect.type === EffectType.Icon) {
        icon = effect.value;
      }
    });
    return icon;
  };

  return {
    getIcon,
    getUsage,
    getHeal,
  };
};
