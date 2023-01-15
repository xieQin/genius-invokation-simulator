import { create } from "zustand";

import { DeckStatus, PlayerPosition } from "@/models";

import { GameAction } from "./action";
import { GameState, initialState } from "./initialState";

export type GameStore = GameState & GameAction;

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  setGameStates: (key, update) =>
    set(state => ({
      ...state,
      [key]: update,
    })),
  shouldHideDeck: () => get().deckStatus === DeckStatus.Hide,
  toggleDeckStatus: () =>
    set(state => ({
      ...state,
      deckStatus:
        get().deckStatus === DeckStatus.Hide
          ? DeckStatus.Show
          : DeckStatus.Hide,
    })),
  getPlayer: pos => {
    return pos === PlayerPosition.Own ? get().own : get().opposite;
  },
  updataPlayer: (player, pos) => {
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
  addHandCard: (cards, pos) => {
    let player = get().getPlayer(pos);
    player = {
      ...player,
      cards: [...player.cards, ...cards],
    };
    get().updataPlayer(player, pos);
  },
  popCardStack: (num, pos) => {
    let player = get().getPlayer(pos);
    const cards = player.cardStack;
    for (let i = 0; i < num; i++) {
      cards.splice(0, 1);
    }
    player = {
      ...player,
      cardStack: cards,
    };
    get().updataPlayer(player, pos);
  },
  removeHandCard: (idx, pos) => {
    const player = get().getPlayer(pos);
    player.cards.splice(idx, 1);
    get().updataPlayer(player, pos);
  },
  draftHandCard: (num = 2, pos) => {
    const player = get().getPlayer(pos);
    const res = [],
      cards = player.cardStack;
    for (let i = 0; i < num; i++) {
      res.push(cards[i]);
    }
    return res;
  },
  addSupport: (card, pos) => {
    let player = get().getPlayer(pos);
    player = {
      ...player,
      supports: [...player.supports, card],
    };
    get().updataPlayer(player, pos);
  },
  updateOwnAndOpposite: (own, opposite) =>
    set(state => ({
      ...state,
      own,
      opposite,
    })),

  showMessage: (message: string, callback) =>
    set(state => ({
      ...state,
      message,
      msgCallback: callback,
    })),
}));