import { ICard } from "./card";
import { ICharacter } from "./character";
import { GIDice, GIDiceID } from "./die";
import { Phase } from "./phase";
import { IPlayer } from "./player";

export interface IGame {
  turn: number;
  phase: Phase;
  players: IPlayer[];
  activePlayer: number;
  cardStacks: ICard[];
  handCards: ICard[];
  activeHandCards: ICard[];
  activeCharacter: ICharacter[];
  dices: GIDiceID[][];
  message: string;
}

export enum DeckStatus {
  Hide = "hide",
  Show = "show",
}

export enum PreviewStatus {
  Hide = "hide",
  Show = "show",
}
