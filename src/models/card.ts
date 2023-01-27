import { Character } from "./character";
import { EffectTarget, IEffect } from "./effect";
import { GIElement } from "./element";
import {
  EqiupmentWeaponType,
  EquipmentID,
  EquipmentMainType,
  IEquipment,
} from "./equipment";
import { EventID, IEvent } from "./event";
import { GIRegion } from "./region";
import { ICost } from "./skill";
import { ISupport, SupportID, SupportType } from "./support";

export interface ICard {
  name: string;
  content: string;
  mainType: CardMainType;
  subType: CardSubType[];
  cost: ICost[];
  img: string;
  imgID: string;
  cardTarget: EffectTarget;
  deckLimit: CardLimit[];
  combatLimit: CardLimit[];
  cardEffect: CardEffect[];
  cardModify: CardModify[];
}

export interface CardLimit {
  limitType: "character" | "element" | "region" | "weapon";
  limitNumber: number;
  limit: Character | GIElement | GIRegion | EqiupmentWeaponType;
}

export enum CardEffectType {
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
}

export enum CardTimeType {
  Turn = "Turn",
  Round = "Round",
  Infinite = "Infinite",
}

export interface CardTime {
  type: CardTimeType;
  time: number;
}

export interface CardEffect {
  category: CardEffectType;
  value: string | number;
}

export enum CardConditionType {
  CastSkill = "Cast Skill",
  Shield = "Shield",
  Check = "Check",
  Target = "Target",
  Element = "Element",
  NormalAttack = "Normal Attack",
  ElementalSkill = "Elemental Skill",
  ElementalBurst = "Elemental Burst",
  HP = "HP",
  Max = "Max",
  Region = "Region",
}

export interface CardModifyCondition {
  category: CardConditionType;
  value: string | number;
}

export interface CardModify {
  effect: IEffect[];
  time: CardTime[];
  condition: CardModifyCondition[];
}

export enum CardType {
  Character = "Character",
  Card = "Card",
}

export interface ICardEquipment extends ICard, IEquipment {}
export interface ICardSupport extends ICard, ISupport {}
export interface ICardEvent extends ICard, IEvent {}
export type CardID = EquipmentID | SupportID | EventID;

export enum CardMainType {
  Event = "Event",
  Support = "Support",
  Equipment = "Equipment",
}

export type CardSubType = EquipmentMainType | EqiupmentWeaponType | SupportType;
