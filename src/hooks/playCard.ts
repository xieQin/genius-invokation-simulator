import {
  CardMainType,
  EffectType,
  EquipmentMainType,
  EventType,
  GIDiceID,
  ICard,
  Phase,
  PlayerPosition,
} from "@/models";
import { useGameStore } from "@/stores";
import { dicesToMap, diceToNumber, sortDice } from "@/utils";

export const usePlayCard = () => {
  const {
    phase,
    addSupport,
    removeHandCard,
    activeCards,
    players,
    showMessage,
    selectedCharacters,
    updatePlayer,
    dices,
    updateDices,
  } = useGameStore();
  // const player: IPlayer = pos === PlayerPosition.Own ? own : opponent;

  // const updatePlayerEquipment

  const onPlayCard = (card: ICard, pos: PlayerPosition) => {
    if (card.mainType === CardMainType.Support) {
      addSupport(card, pos);
    }
    if (card.mainType === CardMainType.Event) {
      if (card.subType.includes(EventType.ElementalResonance)) {
        const effects = card.cardEffect;
        const pos = PlayerPosition.Own;
        const dice = dices[pos];
        const diceMap = dicesToMap(diceToNumber(dice));
        effects.forEach(e => {
          if (e.type === EffectType.Die) {
            const dieType = e.subType as GIDiceID;
            const dieOrigin = diceMap.get(dieType);
            if (dieOrigin === undefined) {
              diceMap.set(dieType, e.value);
            } else {
              diceMap.set(dieType, dieOrigin + e.value);
            }
          }
        });
        const sortedDice = sortDice(diceMap);
        updateDices(sortedDice, pos);
      }
      console.log(card, "Event Card");
    }
    if (card.mainType === CardMainType.Equipment) {
      if (selectedCharacters[pos] < 0) return;
      const type = card.subType[0];
      const player = Object.assign({}, players[pos]);
      if (type === EquipmentMainType.Weapon) {
        player.characters[selectedCharacters[pos]].equipments.weapon = card;
        updatePlayer(player, pos);
      }
      if (type === EquipmentMainType.Artifact) {
        player.characters[selectedCharacters[pos]].equipments.artifact = card;
        updatePlayer(player, pos);
      }
    }
    showMessage("");
    removeHandCard(activeCards[0] as number, pos);
  };

  const getMessage = (card: ICard) => {
    if (card.mainType === CardMainType.Support) {
      return `Play Card: ${card.name}`;
    }
    if (card.mainType === CardMainType.Event) {
      return `Play Card: ${card.name}`;
    }
    if (card.mainType === CardMainType.Equipment) {
      return `Select a character to equip with this ${
        card.subType[card.subType.length - 1]
      }`;
    }
  };

  const isCardValid = (card: ICard, pos: PlayerPosition) => {
    const character = players[pos].characters[selectedCharacters[pos]];
    if (card.mainType === CardMainType.Equipment) {
      if (selectedCharacters[pos] < 0) return false;
      const type = card.subType[0];
      if (type === EquipmentMainType.Weapon) {
        const subType = card.subType[1];
        if (character.equipments.weapon !== null) return false;
        if (subType !== character.weaponType) return false;
      }
      if (type === EquipmentMainType.Artifact) {
        return true;
        // if (character.equipments.artifact !== null) return false;
      }
      if (type === EquipmentMainType.Talent) {
        return false;
      }
    }
    return true;
  };

  const shouldCharacterHighlight = (pos: PlayerPosition) =>
    pos === PlayerPosition.Own &&
    phase === Phase.PlayCard &&
    players[PlayerPosition.Own].cards[activeCards[pos]]?.mainType ===
      CardMainType.Equipment;

  return {
    getMessage,
    onPlayCard,
    isCardValid,
    shouldCharacterHighlight,
  };
};
