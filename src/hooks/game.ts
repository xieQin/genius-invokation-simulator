import { useState } from "react";

import CardData from "@/data/cards.json";
import CharacterData from "@/data/characters.json";
import { ICard, ICharacter, IPlayer, PlayerPosition } from "@/models";
import { getRandom } from "@/utils";

export const useInitGame = (ownName: string, oppositeName: string) => {
  const initOwnPlayer = () => InitPlayer(ownName, PlayerPosition.Own);
  const initOppositePlayer = () =>
    InitPlayer(oppositeName, PlayerPosition.Opposite);

  const [own, setOwn] = useState(initOwnPlayer());
  const [opposite, setOpposite] = useState(initOppositePlayer());

  const initGame = () => {
    setOwn(initOwnPlayer());
    setOpposite(initOppositePlayer());
  };

  return {
    own,
    opposite,
    initGame,
    setOwn,
    setOpposite,
  };
};

export const InitPlayer = (name: string, position: PlayerPosition) => {
  const { cardStack } = InitCardStatck();
  const { characters } = InitCharacters();

  const player: IPlayer = {
    name,
    position,
    status: null,
    characters,
    summons: null,
    supports: [],
    cards: DraftHandCard(5, cardStack),
    cardStack,
  };
  return player;
};

export const InitCharacters = () => {
  const initCharacters = () =>
    getRandom<ICharacter>(3, CharacterData as ICharacter[], false);
  const characters = initCharacters();

  return {
    characters,
    initCharacters,
  };
};

export const InitCardStatck = () => {
  const initCardStack = () => getRandom<ICard>(30, CardData as ICard[]);
  const cardStack = initCardStack();

  return {
    cardStack,
    initCardStack,
  };
};

export const DraftHandCard = (num = 2, cardStack: ICard[]) => {
  return getRandom<ICard>(num, cardStack);
};