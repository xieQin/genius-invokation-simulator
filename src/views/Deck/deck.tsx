import { useEffect, useState } from "react";

import { CardType } from "@/models";
import { IDeckDB, useDeckStore } from "@/services";

import { DeckItem } from ".";
import styles from "./index.module.css";

export const PlayerDeck = () => {
  const { listDeck } = useDeckStore();
  const [deckList, setDeckList] = useState<IDeckDB[]>([]);
  useEffect(() => {
    listDeck().then(res => setDeckList(res));
  });
  return (
    <div className={styles.PlayerDeck}>
      <div className={styles.Decks}>
        {deckList.map((deck, i) => (
          <div key={i}>
            <div className={styles.PlayerDeckName}>{deck.name}</div>
            <div key={CardType.Character}>
              {Object.entries(deck.characters).map((c, i) => (
                <DeckItem key={i} name={c[0]} type={CardType.Character} />
              ))}
            </div>
            <div key={CardType.Card}>
              {Object.entries(deck.cards).map(c => (
                <DeckItem key={c[0]} name={c[0]} type={CardType.Card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
