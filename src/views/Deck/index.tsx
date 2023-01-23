import { useTranslation } from "react-i18next";

import { CharacterItem } from "@/components/CharacterZone";
import { HandCardItem } from "@/components/HandCardZone";
import cards from "@/data/cards.json";
import characters from "@/data/characters.json";
import { ICard, ICharacter, PlayerPosition } from "@/models";

import styles from "./index.module.css";

export default function DeckPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.Deck}>
      <div className={styles.DeckFilter}></div>
      <div className={styles.DeckList}>
        {characters.map(character => (
          <div key={character.name} className={styles.DeckItem}>
            <CharacterItem
              character={character as ICharacter}
              pos={PlayerPosition.Own}
              isDeck={true}
            />
            <div className={styles.DeckLabel}>{t(character.name)}</div>
          </div>
        ))}
      </div>
      <div className={styles.DeckList}>
        {cards.map(card => (
          <div key={card.name} className={styles.DeckItem}>
            <HandCardItem card={card as ICard} pos={PlayerPosition.Own} />
            <div className={styles.DeckLabel}>{t(card.name)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
