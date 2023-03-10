import { Character } from "./character";
import { EffectTarget, IEffect } from "./effect";
import { GIElement } from "./element";
import {
  EqiupmentWeaponType,
  EquipmentID,
  EquipmentMainType,
  IEquipment,
} from "./equipment";
import { EventID, EventType, IEvent } from "./event";
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
  cardEffect: IEffect[];
  cardModify: CardModify[];
}

export interface CardLimit {
  type: "character" | "element" | "region" | "weapon" | "food";
  subType: Character | GIElement | GIRegion | EqiupmentWeaponType;
  value: number | string;
}

export enum CardTimeType {
  Turn = "Turn",
  Round = "Round",
  Infinite = "Infinite",
  Next = "Next",
}

export interface CardTime {
  type: CardTimeType;
  value: number;
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
  ElementalReaction = "Elemental Reaction",
  EquipTalent = "Equip Talent",
  StartPhase = "Start Phase",
  ActionPhase = "Action Phase",
  EndPhase = "End Phase",
  RollPhase = "Roll Phase",
  ChangePhase = "Change Phase",
  CombatPhase = "Combat Phase",
  HP = "HP",
  Max = "Max",
  Region = "Region",
  Opponent = "Opponent",
  PlayCard = "Play Card",
  Icon = "Icon",
  Damage = "Damage",
  Defense = "Defense",
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

export type CardSubType =
  | EquipmentMainType
  | EqiupmentWeaponType
  | SupportType
  | EventType;
