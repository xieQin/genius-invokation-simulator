import {
  GIDiceID,
  GIElement,
  ICard,
  IPlayer,
  PlayerPosition,
  SkillTarget,
  SummonsID,
} from "@/models";

import { GameState } from "./initialState";

export interface GameAction {
  setGameStates: <T extends keyof GameState>(
    key: T,
    update: GameState[T]
  ) => void;
  toggleDeckStatus: () => void;
  shouldHideDeck: () => boolean;
  getPlayer: (pos: PlayerPosition) => IPlayer;
  updateDices: (dice: GIDiceID[], pos: PlayerPosition) => void;
  updatePlayer: (player: IPlayer, pos: PlayerPosition) => void;
  addHandCard: (cards: ICard[], pos: PlayerPosition) => void;
  removeHandCard: (idx: number, pos: PlayerPosition) => void;
  pushCardsStack: (cards: ICard[], pos: PlayerPosition) => void;
  popCardStack: (num: number, pos: PlayerPosition) => void;
  draftHandCard: (num: number, pos: PlayerPosition) => ICard[];
  addSupport: (cards: ICard, pos: PlayerPosition) => void;
  showMessage: (message: string, callback?: () => void) => void;
  addSummon: (summon: SummonsID[], pos: PlayerPosition) => void;
  updateEnergy: (energy: number, pos: PlayerPosition) => void;
  updateHp: (hp: number, pos: PlayerPosition, target: SkillTarget) => void;
  updateElementStatus: (
    element: GIElement,
    pos: PlayerPosition,
    target: SkillTarget
  ) => void;
}
