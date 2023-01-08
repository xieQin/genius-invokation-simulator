import { useEffect, useState } from "react";

import styles from "./App.module.css";
import Deck from "./components/Deck";
import Notice from "./components/Notice";
import CardData from "./data/cards.json";
import CharacterData from "./data/character.json";
import { ICard, ICharacter, IPlayer, PlayerPosition } from "./models";
import { getRandom } from "./utils";

const initPlayer = () => {
  const ownCharacters = getRandom<ICharacter>(3, CharacterData as ICharacter[]);
  const oppositeCharacters = getRandom<ICharacter>(
    3,
    CharacterData as ICharacter[]
  );
  return [ownCharacters, oppositeCharacters];
};
const initCharacters = initPlayer();

const initCardStack = () => {
  const ownStack = getRandom<ICard>(30, CardData as ICard[]);
  const oppositeStack = getRandom<ICard>(30, CardData as ICard[]);
  return [ownStack, oppositeStack];
};
const initCards = initCardStack();

const draftHandCard = (num: number, cardStack: ICard[]) => {
  return getRandom<ICard>(num, cardStack);
};

const initSupport = () => {
  const ownSupports = getRandom<ICard>(4, CardData as ICard[]);
  const oppositeSupports = getRandom<ICard>(4, CardData as ICard[]);
  return [ownSupports, oppositeSupports];
};

const initSupports = initSupport();

const defaultWidth = 1920;
const defaultHeight = 1080;
const getScale = (): number => {
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  return documentWidth / documentHeight < defaultWidth / defaultHeight
    ? documentWidth / defaultWidth
    : documentHeight / defaultHeight;
};

export default function App() {
  const [scale, setScale] = useState(getScale());

  const own: IPlayer = {
    name: "Own",
    position: PlayerPosition.Own,
    status: null,
    characters: initCharacters[0],
    summons: null,
    supports: initSupports[0],
    cards: draftHandCard(10, initCards[0]),
    cardStack: initCards[0],
  };
  const opposite: IPlayer = {
    name: "Opposite",
    position: PlayerPosition.Opposite,
    status: null,
    characters: initCharacters[1],
    summons: null,
    supports: initSupports[1],
    cards: draftHandCard(10, initCards[1]),
    cardStack: initCards[1],
  };

  const autoScale = () => {
    setScale(getScale());
    (
      document.querySelector("#screen") as HTMLElement
    ).style.transform = `scale(${scale}) translate(-50%)`;
  };

  useEffect((): any => {
    autoScale();
    window.onresize = () => autoScale();
    return () => (window.onresize = null);
  });

  const message = () => {
    return <div>Your Turn Now !</div>;
  };

  return (
    <main className={styles.main} id="screen">
      <Notice message={message()} />
      <Deck own={own} opposite={opposite} />
    </main>
  );
}
