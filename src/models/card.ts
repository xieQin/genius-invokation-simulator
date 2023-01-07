import { ICharacter } from "./character";
import { IEquipment } from "./equipment";
import { IEvent } from "./event";
import { ISupport } from "./support";

export interface ICardBase {
  id: string;
  baseType: CardMainType;
  subType: CardSubType;
  cost: number;
  mustSameDie: boolean;
}

export interface ICardCharacter extends ICardBase, ICharacter {}
export interface ICardEquipment extends ICardBase, IEquipment {}
export interface ICardSupport extends ICardBase, ISupport {}
export interface ICardEvent extends ICardBase, IEvent {}

export enum CardMainType {
  Character,
  Event,
  Support,
  Equipment,
}

export enum CardSubType {
  Character,
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
