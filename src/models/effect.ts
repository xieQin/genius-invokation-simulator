import { GIElement } from "./element";

export enum EffectType {
  Damage = "Damage",
  Heal = "Heal",
  Shield = "Shield",
  Talent = "Talent",
  CastSkill = "Cast Skill",
  PlayCard = "Play Card",
  DrawCard = "Draw Card",
  Attack = "Attack",
  Defense = "Defense",
  Cost = "Cost",
  StartPhase = "Start Phase",
  ActionPhase = "Action Phase",
  EndPhase = "End Phase",
  RollPhase = "Roll Phase",
  ChangePhase = "Change Phase",
  CombatPhase = "Combat Phase",
  Active = "Active",
  Any = "Any",
  Die = "Die",
  Energy = "Energy",
  DieCost = "Die Cost",
  FixDie = "Fix Die",
  ReRoll = "ReRoll",
  Icon = "Icon",
  Collect = "Collect",
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
  Same = "Same",
  Omni = "Omni",
  Any = "Any",
  Physical = "Physical",
  Piercing = "Piercing",
  ChangeCost = "Change Cost",
  FastAction = "Fast Action",
  Add = "Add",
  All = "All",
  Attack = "Attack",
  Equip = "Equip",
  UnusedDie = "Unused Die",
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
  StandBy = "StandBy",
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
