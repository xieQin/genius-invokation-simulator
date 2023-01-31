import { ICard } from "./card";
import { ICharacter } from "./character";
import { ISummon } from "./summons";

export interface IPlayer {
  name: string;
  position: PlayerPosition;
  status: string | null;
  characters: ICharacter[];
  summons: ISummon[];
  supports: ICard[];
  cards: ICard[];
  cardStack: ICard[];
}

export enum PlayerPosition {
  Own,
  Opponent,
}

export const PlayerPositionMap = {
  [PlayerPosition.Own]: "You",
  [PlayerPosition.Opponent]: "Opponent",
};

export type PlayerID = keyof typeof PlayerPosition;
