import { ICardBase } from "./card";
import { ICharacter } from "./character";

export interface IPlayer {
  name: PlayerName;
  position: PlayerPosition;
  status: string | null;
  characters: ICharacter[];
  summons: null;
  supports: null;
  cards: ICardBase[];
  cardStack: ICardBase[];
}

export enum PlayerPosition {
  Own,
  Opposite,
}

export type PlayerName = keyof typeof PlayerPosition;
