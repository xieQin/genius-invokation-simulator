import { GIElement } from "./element";

export interface ITalent {
  name: string;
  type: TalentType;
  info: string;
  attrs: string;
  level: number;
}

export interface ITalentCombat extends ITalent {
  subType: TalentCombatType;
  cost: number;
  costElement: GIElement;
}

export interface ITalentPassive extends ITalent {
  subType: TalentPassiveType;
}

export enum TalentType {
  Combat,
  Passive,
}

export enum TalentCombatType {
  Attack,
  ElementalSkill,
  ElementalBurst,
}

export enum TalentPassiveType {
  Passive,
}
