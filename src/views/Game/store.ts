import { create } from "zustand";

import { InitPlayer } from "@/hooks/game";
import { ICard, IPlayer, PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";

export enum DeckStatus {
  Hide = "hide",
  Show = "show",
}

export interface GameStates {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  deckStatus: DeckStatus;
  toggleDeckStatus: () => void;
  shouldHideDeck: () => boolean;
  dices: GIDiceID[];
  setDices: (dices: GIDiceID[]) => void;
  own: IPlayer;
  opposite: IPlayer;
  addHandCard: (cards: ICard[], pos: PlayerPosition) => void;
  updateOwnAndOpposite: (own: IPlayer, opposite: IPlayer) => void;
  message: string;
  msgCallback: (() => void) | undefined;
  showMessage: (message: string, callback?: () => void) => void;

  activeCards: (number | null)[];
  updateActiveCards: (card: number, pos: PlayerPosition) => void;
}

export const useGameStore = create<GameStates>((set, get) => ({
  phase: Phase.Init,
  setPhase: (phase: Phase) =>
    set(state => ({
      ...state,
      phase,
    })),

  deckStatus: DeckStatus.Hide,
  toggleDeckStatus: () => {
    set(state => ({
      ...state,
      deckStatus:
        state.deckStatus === DeckStatus.Hide
          ? DeckStatus.Show
          : DeckStatus.Hide,
    }));
  },
  shouldHideDeck: () => get().deckStatus === DeckStatus.Hide,

  dices: [] as GIDiceID[],
  setDices: (dices: GIDiceID[]) =>
    set(state => ({
      ...state,
      dices,
    })),

  own: InitPlayer("Lumin", PlayerPosition.Own),
  opposite: InitPlayer("Ellin", PlayerPosition.Opposite),
  addHandCard: (cards, pos) => {
    let player = pos === PlayerPosition.Own ? get().own : get().opposite;
    player = {
      ...player,
      cards: [...player.cards, ...cards],
    };
    if (pos === PlayerPosition.Own) {
      return set(state => ({
        ...state,
        own: player,
      }));
    } else {
      return set(state => ({
        ...state,
        opposite: player,
      }));
    }
  },
  updateOwnAndOpposite: (own, opposite) =>
    set(state => ({
      ...state,
      own,
      opposite,
    })),

  message: "",
  msgCallback: undefined,
  showMessage: (message: string, callback) =>
    set(state => ({
      ...state,
      message,
      msgCallback: callback,
    })),

  activeCards: [null, null],
  updateActiveCards: (card: number, pos: PlayerPosition) => {
    const activeCards = [...get().activeCards];
    activeCards[pos] = card;
    return set(state => ({
      ...state,
      activeCards,
    }));
  },
}));
