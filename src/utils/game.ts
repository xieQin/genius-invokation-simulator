import CardData from "@/data/cards.json";
import CharacterData from "@/data/characters.json";
import { ICard, ICharacter, IPlayer, ISkill, PlayerPosition } from "@/models";
import { GIDice, GIDiceID } from "@/models/die";

export function getRandom<T>(num: number, data: T[], repeat = true): T[] {
  const res: T[] = [];
  const temp = Object.assign([], data);
  for (let i = 0; i < num; i++) {
    const _r = Math.floor(Math.random() * temp.length);
    res.push(temp[_r]);
    if (!repeat) temp.splice(_r, 1);
  }
  return res;
}

export const rollDice = (): GIDiceID[] => {
  const diceMap = new Map();
  const dices = getRandom(8, [0, 1, 2, 3, 4, 5, 6, 7], true);
  dices.map(d => {
    diceMap.set(
      GIDice[d],
      diceMap.has(GIDice[d]) ? diceMap.get(GIDice[d]) + 1 : 1
    );
  });
  const res: GIDiceID[] = [];
  const omniDice = diceMap.get("Omni");
  if (omniDice > 0) {
    for (let j = 0; j < omniDice; j++) {
      res.push("Omni");
    }
    diceMap.delete("Omni");
  }
  const _t = Array.from(diceMap).sort((a, b) => b[1] - a[1]);
  _t.map(i => {
    for (let j = 0; j < i[1]; j++) {
      res.push(i[0]);
    }
  });
  return res;
};

export const isCharacterType = (data: unknown) => {
  return (data as ICharacter)?.element;
};

export const isCardType = (data: unknown) => {
  return (data as ICard)?.mainType;
};

export const isSkillType = (data: unknown) => {
  return (data as ISkill)?.costs;
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
