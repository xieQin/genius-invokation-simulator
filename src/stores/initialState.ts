import {
  DeckStatus,
  GIDiceID,
  ICard,
  ICharacter,
  IPlayer,
  ISkill,
  Phase,
  PlayerPosition,
} from "@/models";
import { InitPlayer } from "@/utils";

export interface GameState {
  phase: Phase;
  turn: number;
  deckStatus: DeckStatus;
  dices: GIDiceID[];
  own: IPlayer;
  opposite: IPlayer;
  message: string;
  activeCards: number[];
  activeCharacters: number[];
  preview: unknown;
  msgCallback: (() => void) | undefined;
}

export const initialState: GameState = {
  phase: Phase.Init,
  turn: 1,
  deckStatus: DeckStatus.Hide,
  dices: [] as GIDiceID[],
  own: InitPlayer("Lumine", PlayerPosition.Own),
  opposite: InitPlayer("Ellin", PlayerPosition.Opposite),
  message: "",
  msgCallback: undefined,
  activeCards: [-1, -1],
  activeCharacters: [-1, -1],
  preview: null,
};
