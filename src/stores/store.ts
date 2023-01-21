import { create } from "zustand";

import { DeckStatus, GIDiceID, IPlayer } from "@/models";

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
  updateDices: (dice, pos) => {
    const dices = Object.assign([], get().dices) as GIDiceID[][];
    dices[pos] = dice;
    set(state => ({
      ...state,
      dices,
    }));
  },
  shouldHideDeck: () => get().deckStatus === DeckStatus.Hide,
  toggleDeckStatus: () =>
    set(state => ({
      ...state,
      deckStatus:
        get().deckStatus === DeckStatus.Hide
          ? DeckStatus.Show
          : DeckStatus.Hide,
    })),
  getPlayer: pos => get().players[pos],
  updatePlayer: (player, pos) => {
    const players = Object.assign([], get().players) as IPlayer[];
    players[pos] = player;
    set(state => ({
      ...state,
      players,
    }));
  },
  addHandCard: (cards, pos) => {
    let player = get().getPlayer(pos);
    player = {
      ...player,
      cards: [...player.cards, ...cards],
    };
    get().updatePlayer(player, pos);
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
    get().updatePlayer(player, pos);
  },
  pushCardsStack: (cards, pos) => {
    let player = get().getPlayer(pos);
    const cardStack = player.cardStack;
    player = {
      ...player,
      cardStack: [...cardStack, ...cards],
    };
    get().updatePlayer(player, pos);
  },
  removeHandCard: (idx, pos) => {
    const player = get().getPlayer(pos);
    player.cards.splice(idx, 1);
    get().updatePlayer(player, pos);
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
    get().updatePlayer(player, pos);
  },

  showMessage: (message: string, callback) =>
    set(state => ({
      ...state,
      message,
      msgCallback: callback,
    })),

  addSummon: (summon, pos) => {
    let player = get().getPlayer(pos);
    player = {
      ...player,
      summons: [...player.summons, summon],
    };
    get().updatePlayer(player, pos);
  },
}));
