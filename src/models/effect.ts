import { GIElement } from "./element";

export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Shield = "Shield",
  Talent = "Talent",
  CastSkill = "Cast Skill",
  PlayCard = "Play Card",
  Attack = "Attack",
  Defense = "Defense",
  Cost = "Cost",
  StartPhase = "Start Phase",
  EndPhase = "End Phase",
  RollPhase = "Roll Phase",
  ChangePhase = "Change Phase",
  CombatPhase = "Combat Phase",
  Active = "Active",
  Any = "Any",
  Die = "Die",
}

export enum EffectSubType {
  None = "",
  Geo = "Geo",
  Cryo = "Cryo",
  Dendro = "Dendro",
  Electro = "Electro",
  Pyro = "Pyro",
  Anemo = "Anemo",
  Hydro = "Hydro",
  Physical = "Physical",
  ChangeCost = "Change Cost",
  All = "All",
  Same = "Same",
  Attack = "Attack",
}

export const TransEffectSubTypeToGIElement = {
  [EffectSubType.Anemo]: GIElement.Anemo,
  [EffectSubType.Cryo]: GIElement.Cryo,
  [EffectSubType.Dendro]: GIElement.Dendro,
  [EffectSubType.Electro]: GIElement.Electro,
  [EffectSubType.Geo]: GIElement.Geo,
  [EffectSubType.Hydro]: GIElement.Hydro,
  [EffectSubType.Pyro]: GIElement.Pyro,
};

export enum EffectTarget {
  Opponent = "Opponent",
  Back = "Background",
  All = "All",
  Active = "Active",
  Select = "Select",
}

export const EffectColorType = {
  [EffectSubType.Geo]: "#FFE699FF",
  [EffectSubType.Cryo]: "#99FFFFFF",
  [EffectSubType.Dendro]: "#7EC236FF",
  [EffectSubType.Electro]: "#FFACFFFF",
  [EffectSubType.Pyro]: "#FF9999FF",
  [EffectSubType.Anemo]: "#80FFD7FF",
  [EffectSubType.Hydro]: "#80C0FFFF",
  [EffectSubType.Physical]: "#FFFFFFFFF",
  [EffectSubType.None]: "#FFFFFFFFF",
};

export interface IEffect {
  type: EffectType;
  subType: EffectSubType;
  target: EffectTarget;
  value: number;
}
