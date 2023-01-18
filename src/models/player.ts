import { ICard } from "./card";
import { ICharacter } from "./character";

export interface IPlayer {
  name: string;
  position: PlayerPosition;
  status: string | null;
  characters: ICharacter[];
  summons: null;
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
