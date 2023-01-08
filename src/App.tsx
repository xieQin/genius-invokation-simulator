import styles from "./App.module.css";
import Deck from "./components/Deck";
import Loading from "./components/Loading";
import Notice from "./components/Notice";
import CardData from "./data/cards.json";
import CharacterData from "./data/characters.json";
import { useNotice } from "./hooks";
import { usePreload } from "./hooks/preload";
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

export default function App() {
  const { message } = useNotice();
  const { loading } = usePreload();

  const own: IPlayer = {
    name: "Lumin",
    position: PlayerPosition.Own,
    status: null,
    characters: initCharacters[0],
    summons: null,
    supports: initSupports[0],
    cards: draftHandCard(10, initCards[0]),
    cardStack: initCards[0],
  };
  const opposite: IPlayer = {
    name: "Ellin",
    position: PlayerPosition.Opposite,
    status: null,
    characters: initCharacters[1],
    summons: null,
    supports: initSupports[1],
    cards: draftHandCard(10, initCards[1]),
    cardStack: initCards[1],
  };

  console.log(loading, new Date());

  return (
    <>
      {loading && <Loading />}
      <main className={styles.main} id="screen">
        {!loading && (
          <>
            <Notice message={<div>{message}</div>} />
            <Deck own={own} opposite={opposite} />
          </>
        )}
      </main>
    </>
  );
}
