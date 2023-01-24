import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CharacterItem } from "@/components/CharacterZone";
import { HandCardItem } from "@/components/HandCardZone";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import {
  EquipmentMainType,
  EventType,
  ICard,
  ICharacter,
  PlayerPosition,
  SupportType,
} from "@/models";
import { isCardType, isCharacterType } from "@/utils";

import styles from "./index.module.css";

enum CardType {
  Character = "Character",
  Card = "Card",
}

export const DeckItem = (item: ICard | ICharacter) => {
  const { t } = useTranslation();
  return (
    <div key={item.name} className={styles.DeckItem}>
      {isCharacterType(item) ? (
        <CharacterItem
          character={item as ICharacter}
          pos={PlayerPosition.Own}
          isDeck={true}
        />
      ) : isCardType(item) ? (
        <HandCardItem card={item as ICard} pos={PlayerPosition.Own} />
      ) : (
        <></>
      )}
      <div className={styles.DeckLabel}>{t(item.name)}</div>
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
            <DeckItem key={character.name} {...(character as ICharacter)} />
          ))}
      </div>
      <div className={styles.DeckList}>
        {active === CardType.Card &&
          cards
            .filter(
              card => card.subType.filter(_t => tag.includes(_t)).length > 0
            )
            .map(card => <DeckItem key={card.name} {...(card as ICard)} />)}
      </div>
    </div>
  );
}
