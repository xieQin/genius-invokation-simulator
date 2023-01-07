import { GIElement } from "./element";

export interface ISkill {
  name: string;
  type: SkillType;
  info: string;
  attrs: string;
  level: number;
  cost: number;
}

export interface ISkillCombat extends ISkill {
  subType: SkillCombatType;
  cost: number;
  costElement: GIElement;
}

export interface ISkillPassive extends ISkill {
  subType: SkillPassiveType;
}

export enum SkillType {
  Combat,
  Passive,
  Other,
}

export enum SkillCombatType {
  NormalAttack,
  ElementalSkill,
  ElementalBurst,
}

export enum SkillPassiveType {
  Passive,
}
