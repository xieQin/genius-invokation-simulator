import {
  Action,
  DeckStatus,
  GIDiceID,
  IPlayer,
  Phase,
  PlayerPosition,
} from "@/models";
import { InitPlayer } from "@/utils";

export interface GameState {
  phase: Phase;
  turn: number;
  deckStatus: DeckStatus;
  dices: GIDiceID[][];
  players: IPlayer[];
  current: PlayerPosition;
  message: string;
  activeCards: number[];
  activeCharacters: number[];
  activeSkills: number[];
  selectedCharacters: number[];
  preview: unknown;
  actions: Action[];
  switchCards: number[][];
  rerollDices: number[][];
  msgCallback: (() => void) | undefined;
}

export const initialState: GameState = {
  phase: Phase.Init,
  turn: 1,
  deckStatus: DeckStatus.Hide,
  dices: [[], []] as GIDiceID[][],
  players: [
    InitPlayer("Lumine", PlayerPosition.Own),
    InitPlayer("Ellin", PlayerPosition.Opponent),
  ],
  current: PlayerPosition.Own,
  message: "",
  msgCallback: undefined,
  actions: [Action.None, Action.None],
  activeCards: [-1, -1],
  activeCharacters: [-1, -1],
  selectedCharacters: [-1, -1],
  activeSkills: [-1, -1],
  preview: null,
  switchCards: [[], []],
  rerollDices: [[], []],
};
