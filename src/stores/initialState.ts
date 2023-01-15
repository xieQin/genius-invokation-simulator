import {
  DeckStatus,
  GIDiceID,
  ICard,
  ICharacter,
  IPlayer,
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
  activeCards: (number | null)[];
  activeCharacters: (number | null)[];
  preview: ICharacter | ICard | null;
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
  activeCards: [null, null],
  activeCharacters: [null, null],
  preview: null,
};
