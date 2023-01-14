import { create } from "zustand";

import { InitPlayer } from "@/hooks/game";
import { ICard, ICharacter, IPlayer, PlayerPosition } from "@/models";
import { GIDiceID } from "@/models/die";
import { Phase } from "@/models/phase";

export enum DeckStatus {
  Hide = "hide",
  Show = "show",
}

export enum PreviewStatus {
  Hide = "hide",
  Show = "show",
}

export interface GameStates {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  turn: number;
  setTurn: (turn: number) => void;
  deckStatus: DeckStatus;
  toggleDeckStatus: () => void;
  shouldHideDeck: () => boolean;
  dices: GIDiceID[];
  setDices: (dices: GIDiceID[]) => void;
  own: IPlayer;
  opposite: IPlayer;
  getPlayer: (pos: PlayerPosition) => IPlayer;
  updataPlayer: (player: IPlayer, pos: PlayerPosition) => void;
  addHandCard: (cards: ICard[], pos: PlayerPosition) => void;
  removeHandCard: (idx: number, pos: PlayerPosition) => void;
  popCardStack: (num: number, pos: PlayerPosition) => void;
  draftHandCard: (num: number, pos: PlayerPosition) => ICard[];
  addSupport: (cards: ICard, pos: PlayerPosition) => void;
  updateOwnAndOpposite: (own: IPlayer, opposite: IPlayer) => void;
  message: string;
  msgCallback: (() => void) | undefined;
  showMessage: (message: string, callback?: () => void) => void;

  activeCards: (number | null)[];
  updateActiveCards: (card: number, pos: PlayerPosition) => void;

  preview: ICharacter | ICard | null;
  setPreview: (preview: ICharacter | ICard | null) => void;
}

export const useGameStore = create<GameStates>((set, get) => ({
  phase: Phase.Init,
  setPhase: (phase: Phase) =>
    set(state => ({
      ...state,
      phase,
    })),
  turn: 1,
  setTurn: (turn: number) =>
    set(state => ({
      ...state,
      turn,
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

  preview: null,
  setPreview: (card: ICard | ICharacter | null) =>
    set(state => ({
      ...state,
      preview: card,
    })),
}));
