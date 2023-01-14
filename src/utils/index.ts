import { ICard, ICharacter } from "@/models";
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

export const isCharacterCard = (card: ICard | ICharacter) => {
  return (card as ICard).mainType != undefined;
};
