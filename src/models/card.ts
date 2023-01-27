import { Character } from "./character";
import { IDamage, IHeal, SkillTarget } from "./damage";
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
  cardTarget: SkillTarget[];
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
  CastSkill = "CastSkill",
  PlayCard = "PlayCard",
  Attack = "Attack",
  Defense = "Defense",
  Cost = "Cost",
  StartPhase = "StartPhase",
  EndPhase = "EndPhase",
  RollPhase = "RollPhase",
  ChangePhase = "ChangePhase",
  CombatPhase = "CombatPhase",
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
  effect: string[];
}

export interface CardModifyCondition {
  category: CardEffectType;
}

export interface CardModify {
  category: CardEffectType;
  effect: {
    damage: IDamage[];
    heal: IHeal[];
    time: CardTime[];
  };
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
