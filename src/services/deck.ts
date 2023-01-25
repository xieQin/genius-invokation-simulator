import { useIndexedDBStore } from "use-indexeddb";

import { ICard, ICharacter } from "@/models";
import { isCardType, isCharacterType } from "@/utils";

export interface IDeckDB {
  _id: number;
  name: string;
  cards: {
    [key: string]: number;
  };
  characters: {
    [key: string]: number;
  };
}

export enum DeckDBUpdateType {
  Add = "Add",
  Remove = "Remove",
}

export const useDeckStore = () => {
  const { add, update, getAll, deleteByID, getOneByKey } =
    useIndexedDBStore("tcg-deck");
  // add({
  //   name: "deck-1",
  //   cards: {},
  //   characters: {},
  // });

  const addDeck = async (deck: string, name: string) => {
    await add({
      name,
      cards: {},
      characters: {},
    });
  };
  const updateDeck = async (deck: string) => {
    await updateDeckKey(deck, "name", deck);
  };
  const getDeck = async (deck: string): Promise<IDeckDB> => {
    const _deck = (await getOneByKey("name", deck)) as IDeckDB;
    return _deck;
  };
  const deleteDeck = async (deck: string) => {
    const _deck = await getDeck(deck);
    await deleteByID(_deck._id);
  };
  const updateDeckKey = async (
    deck: string,
    key: keyof IDeckDB,
    value:
      | string
      | {
          [key: string]: number;
        }
  ) => {
    const _deck = await getDeck(deck);
    await update({
      ..._deck,
      [key]: value,
    });
  };
  const addCard = async (deck: string, card: string) => {
    const _deck = await getDeck(deck);
    const _card =
      _deck.cards[card] > 0
        ? {
            [card]: _deck.cards[card] + 1,
          }
        : {
            [card]: 1,
          };
    await updateDeckKey(deck, "cards", {
      ..._deck.cards,
      ..._card,
    });
  };
  const removeCard = async (deck: string, card: string) => {
    const _deck = await getDeck(deck);
    if (_deck.cards[card] === undefined) return;
    if (_deck.cards[card] <= 1) {
      delete _deck.cards[card];
    } else {
      const _card = {
        [card]: _deck.cards[card] - 1,
      };
      _deck.cards = {
        ..._deck.cards,
        ..._card,
      };
    }
    await updateDeckKey(deck, "cards", _deck.cards);
  };
  const addCharacter = async (deck: string, character: string) => {
    const _deck = await getDeck(deck);
    const _character =
      _deck.characters[character] > 0
        ? {
            [character]: _deck.characters[character] + 1,
          }
        : {
            [character]: 1,
          };
    await updateDeckKey(deck, "characters", {
      ..._deck.characters,
      ..._character,
    });
  };
  const removeCharacter = async (deck: string, character: string) => {
    const _deck = await getDeck(deck);
    if (_deck.characters[character] === undefined) return;
    if (_deck.characters[character] <= 1) {
      delete _deck.characters[character];
    } else {
      const _character = {
        [character]: _deck.characters[character] - 1,
      };
      _deck.characters = {
        ..._deck.characters,
        ..._character,
      };
    }
    await updateDeckKey(deck, "characters", _deck.characters);
  };

  const updateDeckItem = async (
    deck: string,
    item: ICard | ICharacter,
    type: DeckDBUpdateType
  ) => {
    if (isCardType(item)) {
      if (type === DeckDBUpdateType.Add) {
        await addCard(deck, item.name);
      }
      if (type === DeckDBUpdateType.Remove) {
        await removeCard(deck, item.name);
      }
    }
    if (isCharacterType(item)) {
      if (type === DeckDBUpdateType.Add) {
        await addCharacter(deck, item.name);
      }
      if (type === DeckDBUpdateType.Remove) {
        await removeCharacter(deck, item.name);
      }
    }
  };

  const listDeck = async (): Promise<IDeckDB[]> => {
    const res = (await getAll()) as IDeckDB[];
    return res;
  };
  return {
    addDeck,
    updateDeck,
    deleteDeck,
    listDeck,
    addCard,
    removeCard,
    addCharacter,
    removeCharacter,
    updateDeckItem,
  };
};
