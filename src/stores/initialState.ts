import { DeckStatus, GIDiceID, IPlayer, Phase, PlayerPosition } from "@/models";
import { InitPlayer } from "@/utils";

export interface GameState {
  phase: Phase;
  turn: number;
  deckStatus: DeckStatus;
  dices: GIDiceID[];
  players: IPlayer[];
  message: string;
  activeCards: number[];
  activeCharacters: number[];
  selectedCharacters: number[];
  preview: unknown;
  msgCallback: (() => void) | undefined;
}

export const initialState: GameState = {
  phase: Phase.Init,
  turn: 1,
  deckStatus: DeckStatus.Hide,
  dices: [] as GIDiceID[],
  players: [
    InitPlayer("Lumine", PlayerPosition.Own),
    InitPlayer("Ellin", PlayerPosition.Opposite),
  ],
  message: "",
  msgCallback: undefined,
  activeCards: [-1, -1],
  activeCharacters: [-1, -1],
  selectedCharacters: [-1, -1],
  preview: null,
};
