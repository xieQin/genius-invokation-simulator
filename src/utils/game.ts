import CardData from "@/data/cards.json";
import CharacterData from "@/data/characters.json";
import {
  GIDice,
  GIDiceID,
  ICard,
  ICharacter,
  ICost,
  IPlayer,
  ISkill,
  ISummon,
  PlayerPosition,
} from "@/models";

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

export const rollDice = (
  num: number,
  elementSorted?: GIDiceID[]
): GIDiceID[] => {
  const dices = getRandom(num, [0, 1, 2, 3, 4, 5, 6, 7], true);
  const diceMap = dicesToMap(dices);
  const res: GIDiceID[] = sortDice(diceMap, elementSorted);
  return res;
};

export const reRollDice = (
  dices: GIDiceID[],
  rerolls: number[],
  elementSorted?: GIDiceID[]
) => {
  const dicesNumber = diceToNumber(dices);
  rerolls.forEach(i => {
    delete dicesNumber[i];
    dicesNumber[i] = diceToNumber(rollDice(1, elementSorted))[0];
  });
  const diceMap = dicesToMap(dicesNumber);
  const res: GIDiceID[] = sortDice(diceMap);
  return res;
};

export const diceToNumber = (dices: GIDiceID[]): number[] => {
  const res: number[] = [];
  dices.map((d: GIDiceID) => {
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

export const sortDice = (
  diceMap: Map<GIDiceID, number>,
  sorted?: GIDiceID[]
): GIDiceID[] => {
  const res: GIDiceID[] = [];
  sorted = Array.isArray(sorted) ? ["Omni", ...sorted] : ["Omni"];
  sorted.forEach(dice => {
    const omniDice = diceMap.get(dice) || 0;
    if (omniDice > 0) {
      for (let j = 0; j < omniDice; j++) {
        res.push(dice);
      }
      diceMap.delete(dice);
    }
  });
  const _t = Array.from(diceMap).sort((a, b) => b[1] - a[1]);
  _t.map(i => {
    for (let j = 0; j < i[1]; j++) {
      res.push(i[0]);
    }
  });
  return res;
};

export const isCostDiceValid = (costs: ICost[], dices: GIDiceID[]) => {
  const dicesMap = dicesToMap(diceToNumber(dices));
  const costMap = new Map();
  costs.forEach(cost => {
    costMap.set(cost.costType, cost.costNum);
  });
  for (const cost of costMap) {
    const diceType = cost[0];
    const diceNum = cost[1];
    const omni = dicesMap.get("Omni") ?? 0;
    const _diceType = dicesMap.get(diceType) ?? 0;
    if (diceType === "Same") {
      if (omni === 0 && dicesMap.size > 1) return false;
      if (omni > 0 && dicesMap.size > 2) return false;
      const _d = dices.filter(d => d !== "Omni")[0];
      if (diceNum > omni + (dicesMap.get(_d) ?? 0)) return false;
      continue;
    }
    if (diceType === "Energy") continue;
    if (omni >= diceNum) continue;
    if (diceType === "Void" && dicesMap.size < diceNum) return false;
    if (diceType !== "Void" && diceNum > omni + _diceType) return false;
  }
  return true;
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

export const isSummonType = (data: unknown) => {
  return (data as ISummon)?.cardModify;
};

export const InitPlayer = (name: string, position: PlayerPosition) => {
  const { cardStack } = InitCardStack();
  const { characters } = InitCharacters();

  const player: IPlayer = {
    name,
    position,
    status: null,
    characters,
    summons: [],
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
            food: null,
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
  const initCardStack = () =>
    getRandom<ICard>(30, CardData as unknown as ICard[]);
  const cardStack = initCardStack();

  return {
    cardStack,
    initCardStack,
  };
};

export const DraftHandCard = (num = 2, cardStack: ICard[]) => {
  if (cardStack.length < num) return cardStack;
  return getRandom<ICard>(num, cardStack);
};

export const getCardByName = (name: string): ICard => {
  return CardData.filter(card => card.name === name)[0] as unknown as ICard;
};

export const getCharacterByName = (name: string): ICharacter => {
  return CharacterData.filter(
    character => character.name === name
  )[0] as ICharacter;
};
