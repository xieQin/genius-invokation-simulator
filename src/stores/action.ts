import { GIDiceID, ICard, IPlayer, PlayerPosition } from "@/models";

import { GameState } from "./initialState";

export interface GameAction {
  setGameStates: <T extends keyof GameState>(
    key: T,
    update: GameState[T]
  ) => void;
  toggleDeckStatus: () => void;
  shouldHideDeck: () => boolean;
  getPlayer: (pos: PlayerPosition) => IPlayer;
  updataDices: (dice: GIDiceID[], pos: PlayerPosition) => void;
  updataPlayer: (player: IPlayer, pos: PlayerPosition) => void;
  addHandCard: (cards: ICard[], pos: PlayerPosition) => void;
  removeHandCard: (idx: number, pos: PlayerPosition) => void;
  popCardStack: (num: number, pos: PlayerPosition) => void;
  draftHandCard: (num: number, pos: PlayerPosition) => ICard[];
  addSupport: (cards: ICard, pos: PlayerPosition) => void;
  showMessage: (message: string, callback?: () => void) => void;
}
