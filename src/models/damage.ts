import { GIElement } from "./element";

export enum DamageType {
  None = "",
  Geo = "Geo",
  Cryo = "Cryo",
  Dendro = "Dendro",
  Electro = "Electro",
  Pyro = "Pyro",
  Anemo = "Anemo",
  Hydro = "Hydro",
  Physical = "Physical",
}

export const TransDamageTypeToGIElement = {
  [DamageType.Anemo]: GIElement.Anemo,
  [DamageType.Cryo]: GIElement.Cryo,
  [DamageType.Dendro]: GIElement.Dendro,
  [DamageType.Electro]: GIElement.Electro,
  [DamageType.Geo]: GIElement.Geo,
  [DamageType.Hydro]: GIElement.Hydro,
  [DamageType.Pyro]: GIElement.Pyro,
};

export enum SkillTarget {
  Opponent = "Opponent",
  Back = "Background",
  All = "All",
  Active = "Active",
}

export const DamageColortype = {
  [DamageType.Geo]: "#FFE699FF",
  [DamageType.Cryo]: "#99FFFFFF",
  [DamageType.Dendro]: "#7EC236FF",
  [DamageType.Electro]: "#FFACFFFF",
  [DamageType.Pyro]: "#FF9999FF",
  [DamageType.Anemo]: "#80FFD7FF",
  [DamageType.Hydro]: "#80C0FFFF",
  [DamageType.Physical]: "#FFFFFFFFF",
  [DamageType.None]: "#FFFFFFFFF",
};

export interface IDamage {
  damage: number;
  damageType: DamageType;
  target: SkillTarget;
}

export interface IHeal {
  heal: number;
  target: SkillTarget;
}
