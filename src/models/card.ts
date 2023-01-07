import { EquipmentName, IEquipment } from "./equipment";
import { EventName, IEvent } from "./event";
import { ISupport, SupportName } from "./support";

export interface ICardBase {
  id?: string;
  baseType: CardMainType;
  subType: CardSubType;
  cost: number;
  mustSameDie: boolean;
}

export interface ICardEquipment extends ICardBase, IEquipment {}
export interface ICardSupport extends ICardBase, ISupport {}
export interface ICardEvent extends ICardBase, IEvent {}
export type CardName = EquipmentName | SupportName | EventName;

export enum CardMainType {
  Event,
  Support,
  Equipment,
  Summon,
}

export enum CardSubType {
  Weapon,
  Artifact,
  Talent,
  Food,
  Item,
  Companion,
  Location,
  ElementResonance,
  Other,
}
