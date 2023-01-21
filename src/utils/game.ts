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

export const rollDice = (num: number): GIDiceID[] => {
  const dices = getRandom(num, [0, 1, 2, 3, 4, 5, 6, 7], true);
  const diceMap = dicesToMap(dices);
  const res: GIDiceID[] = sortDice(diceMap);
  return res;
};

export const reRollDice = (dices: GIDiceID[], rerolls: number[]) => {
  const dicesNumber = diceToNumber(dices);
  rerolls.forEach(i => {
    delete dicesNumber[i];
    dicesNumber[i] = diceToNumber(rollDice(1))[0];
  });
  const diceMap = dicesToMap(dicesNumber);
  const res: GIDiceID[] = sortDice(diceMap);
  return res;
};

export const diceToNumber = (dices: GIDiceID[]): number[] => {
  const res: number[] = [];
  dices.map(d => {
    res.push(GIDice[d]);
  });
  return res;
};

export const dicesToMap = (dices: number[]): Map<GIDiceID, number> => {
  const diceMap = new Map();
  dices.map(d => {
    diceMap.set(
      GIDice[d],
      diceMap.has(GIDice[d]) ? diceMap.get(GIDice[d]) + 1 : 1
    );
  });
  return diceMap;
};

export const sortDice = (diceMap: Map<GIDiceID, number>) => {
  const res: GIDiceID[] = [];
  const omniDice = diceMap.get("Omni") || 0;
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
  const { cardStack } = InitCardStack();
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
    getRandom<ICharacter>(
      3,
      CharacterData.map(c =>
        Object.assign({}, c, {
          equipments: {
            weapon: null,
            artifact: null,
            talent: null,
          },
        })
      ) as ICharacter[],
      false
    );
  const characters = initCharacters();

  return {
    characters,
    initCharacters,
  };
};

export const InitCardStack = () => {
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
