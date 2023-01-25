import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PUBLIC_PATH } from "@/configs";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import { CardType, EquipmentMainType, EventType, SupportType } from "@/models";
import { DeckDBUpdateType, IDeckDB, useDeckStore } from "@/services";
import { NameIDTrans } from "@/utils";

import styles from "./index.module.css";

export const DeckItem = (props: { name: string; type: CardType }) => {
  const { name, type } = props;
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const { updateDeckItem, getCountByName } = useDeckStore();
  useEffect(() => {
    getCountByName("deck-1", name).then(c => setCount(c));
  });
  return (
    <div key={name} className={styles.DeckItem}>
      <div className={styles.DeckItemImg}>
        <img
          src={`${PUBLIC_PATH}/${
            type === CardType.Character
              ? "characters"
              : type === CardType.Card
              ? "cards"
              : ""
          }/${NameIDTrans(name)}.png`}
          alt={name}
        />
        {count > 0 && <span className={styles.DeckCount}>{count}</span>}
        <div className={styles.DeckItemBtns}>
          <div
            aria-hidden="true"
            className={styles.DeckItemBtn}
            onClick={() => {
              updateDeckItem("deck-1", name, type, DeckDBUpdateType.Remove);
            }}
          >
            -
          </div>
          <div
            aria-hidden="true"
            className={styles.DeckItemBtn}
            onClick={() => {
              updateDeckItem("deck-1", name, type, DeckDBUpdateType.Add);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className={styles.DeckLabel}>{t(name)}</div>
    </div>
  );
};

export const PlayerDeck = () => {
  const [deckList, setDeckList] = useState<IDeckDB[]>([]);
  const { listDeck } = useDeckStore();
  useEffect(() => {
    listDeck().then(res => setDeckList(res));
  });

  return (
    <div className={styles.Decks}>
      {deckList.map(deck => (
        <div key={deck._id}>
          <div>
            {Object.entries(deck.characters).map((c, i) => (
              <DeckItem key={i} name={c[0]} type={CardType.Character} />
            ))}
          </div>
          <div>
            {Object.entries(deck.cards).map(c => (
              <DeckItem key={c[0]} name={c[0]} type={CardType.Card} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DeckPage() {
  const type = { ...CardType };
  const tags = { ...EquipmentMainType, ...EventType, ...SupportType };
  const { t } = useTranslation();
  const [active, setActive] = useState(CardType.Character);
  const defaultTag = Object.keys(tags).map(t => tags[t as keyof typeof tags]);
  const [tag, setTag] = useState<string[]>(defaultTag);

  return (
    <div className={styles.Deck}>
      <div>
        <div></div>
        <PlayerDeck />
      </div>
      <div className={styles.DeckFilter}>
        <div className={styles.DeckFilterMain}>
          {Object.entries(type).map(_t => (
            <div
              key={_t[1]}
              aria-hidden="true"
              className={[
                styles.DeckFilterItem,
                active === _t[1] ? styles.Active : "",
              ].join(" ")}
              onClick={() => setActive(_t[1])}
            >
              {_t[1]}
            </div>
          ))}
        </div>
        {active === CardType.Card && (
          <div className={styles.DeckFilterMain}>
            {Object.entries(tags).map(_t => (
              <div
                key={_t[1]}
                aria-hidden="true"
                className={[
                  styles.DeckFilterItem,
                  tag.includes(_t[1]) ? styles.Active : "",
                ].join(" ")}
                onClick={() => {
                  let newTag = Object.assign([], tag);
                  if (newTag.length === defaultTag.length) {
                    newTag = Object.assign([], [_t[1]]);
                  } else if (newTag.includes(_t[1])) {
                    newTag.splice(newTag.indexOf(_t[1]), 1);
                  } else {
                    newTag.push(_t[1]);
                  }
                  setTag(newTag);
                }}
              >
                {t(_t[1])}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.DeckList}>
        {active === CardType.Character &&
          characters.map(character => (
            <DeckItem
              key={character.name}
              name={character.name}
              type={CardType.Character}
            />
          ))}
      </div>
      <div className={styles.DeckList}>
        {active === CardType.Card &&
          cards
            .filter(
              card => card.subType.filter(_t => tag.includes(_t)).length > 0
            )
            .map(card => (
              <DeckItem key={card.name} name={card.name} type={CardType.Card} />
            ))}
      </div>
    </div>
  );
}
