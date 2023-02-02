import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { HandCardCost } from "@/components/HandCardZone";
import { PreviewCard, PreviewCharacter } from "@/components/PreviewZone";
import { PUBLIC_PATH } from "@/configs";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import {
  CardType,
  EquipmentMainType,
  EventType,
  ICard,
  ICharacter,
  SupportType,
} from "@/models";
import { DeckDBUpdateType, IDeckDB, useDeckStore } from "@/services";
import {
  getCardByName,
  getCharacterByName,
  isCardType,
  isCharacterType,
  NameIDTrans,
} from "@/utils";

import styles from "./index.module.css";

export const DeckItem = (props: { name: string; type: CardType }) => {
  const { name, type } = props;
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const { updateDeckItem, getCountByName } = useDeckStore();
  useEffect(() => {
    getCountByName("deck-1", name).then(c => setCount(c));
  });
  const item =
    type === CardType.Card
      ? getCardByName(name)
      : type === CardType.Character
      ? getCharacterByName(name)
      : null;
  return (
    <div key={name} className={styles.DeckItem}>
      <div className={styles.DeckItemImg}>
        {isCharacterType(item) && (
          <div className={styles.DeckItemHP}>{(item as ICharacter).hp}</div>
        )}
        {isCharacterType(item) && (
          <div className={styles.DeckItemEnergy}>
            {Array((item as ICharacter).energy)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={styles.DeckItemEnergyItem}></div>
              ))}
          </div>
        )}
        {isCardType(item) && (
          <div className={styles.DeckItemCost}>
            <HandCardCost costs={(item as ICard).cost} />
          </div>
        )}
        <img
          src={`${PUBLIC_PATH}/${type.toLowerCase()}s/${NameIDTrans(name)}.png`}
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
        <div className={styles.DeckPreview}>
          {type === CardType.Card ? (
            <PreviewCard preview={item as ICard} noImg={true} />
          ) : type === CardType.Character ? (
            <PreviewCharacter preview={item as ICharacter} noImg={true} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.DeckLabel}>{t(name)}</div>
    </div>
  );
};

export const PlayerDeck = (props: { deckList: IDeckDB[] }) => {
  const { deckList } = props;
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

export default function DeckPage() {
  const type = { ...CardType };
  const tags = { ...EquipmentMainType, ...EventType, ...SupportType };
  const { t } = useTranslation();
  const [active, setActive] = useState(CardType.Character);
  const defaultTag = Object.keys(tags).map(t => tags[t as keyof typeof tags]);
  const [tag, setTag] = useState<string[]>(defaultTag);
  const { addDeck, listDeck } = useDeckStore();
  const [deckList, setDeckList] = useState<IDeckDB[]>([]);
  useEffect(() => {
    listDeck().then(res => setDeckList(res));
  });

  return (
    <div className={styles.Deck}>
      <PlayerDeck deckList={deckList} />
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
        <div
          aria-hidden="true"
          className={styles.AddDeck}
          onClick={() => {
            addDeck("deck-1");
          }}
        >
          Add Deck
        </div>
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
