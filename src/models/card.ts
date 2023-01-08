import {
  EqiupmentWeaponType,
  EquipmentID,
  EquipmentMainType,
  IEquipment,
} from "./equipment";
import { EventID, IEvent } from "./event";
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
}

export interface ICardEquipment extends ICard, IEquipment {}
export interface ICardSupport extends ICard, ISupport {}
export interface ICardEvent extends ICard, IEvent {}
export type CardID = EquipmentID | SupportID | EventID;

export enum CardMainType {
  Event = "AcEvent",
  Support = "AcSupport",
  Equipment = "AcEquip",
}

export type CardSubType = EquipmentMainType | EqiupmentWeaponType | SupportType;
