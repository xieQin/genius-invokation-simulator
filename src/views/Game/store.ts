import { create } from "zustand";

import { InitPlayer } from "@/hooks/game";
import { IPlayer, PlayerPosition } from "@/models";
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
  message: string;
  showMessage: (message: string) => void;
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

  message: "",
  showMessage: (message: string) =>
    set(state => ({
      ...state,
      message,
    })),
}));
