export enum DamageType {
  Geo = "Geo",
  Cryo = "Cryo",
  Dendro = "Dendro",
  Electro = "Electro",
  Pyro = "Pyro",
  Anemo = "Anemo",
  Hydro = "Hydro",
  Physical = "Physical",
}

export enum SkillTarget {
  Active = "Active",
  Back = "Background",
  All = "All",
  Own = "Own",
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
