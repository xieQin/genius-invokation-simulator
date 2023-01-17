import {
  CardMainType,
  EquipmentMainType,
  ICard,
  PlayerPosition,
} from "@/models";
import { useGameStore } from "@/stores";

export const usePlayCard = () => {
  const {
    addSupport,
    removeHandCard,
    activeCards,
    players,
    showMessage,
    selectedCharacters,
    updataPlayer,
  } = useGameStore();
  // const player: IPlayer = pos === PlayerPosition.Own ? own : opposite;

  // const updataPlayerEquipment

  const onPlayCard = (card: ICard, pos: PlayerPosition) => {
    if (card.mainType === CardMainType.Support) {
      addSupport(card, pos);
    }
    if (card.mainType === CardMainType.Event) {
      console.log(card, "Event Card");
    }
    if (card.mainType === CardMainType.Equipment) {
      const type = card.subType[0];
      if (type === EquipmentMainType.Weapon) {
        const player = Object.assign({}, players[pos]);
        player.characters[selectedCharacters[pos]].equipments.weapon = card;
        updataPlayer(player, pos);
      }
      console.log(card);
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
    console.log(character, card);
    if (card.mainType === CardMainType.Equipment) {
      const type = card.subType[0];
      if (type === EquipmentMainType.Weapon) {
        const subType = card.subType[1];
        if (character.equipments.weapon !== null) return false;
        if (subType !== character.weaponType) return false;
      }
      if (type === EquipmentMainType.Artifact) {
        return false;
      }
      if (type === EquipmentMainType.Talent) {
        return false;
      }
    }
    return true;
  };

  return {
    getMessage,
    onPlayCard,
    isCardValid,
  };
};
