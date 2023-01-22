import { writeFileSync } from "fs";

import {
  Character,
  EqiupmentWeaponType,
  GIElement,
  GIRegion,
  ICard,
  ICharacter,
  SkillSubType,
} from "@/models";

import GIData from "./cards_20221205_en-us.json";
import I18n from "./cards_20221205_i18n.json";
import CharactersExtra from "./character-extra.json";

const PUBLIC_PATH = process.env.NODE_ENV === "development" ? "" : "";

const ImageIDTrans = (s: string) => {
  return s
    .replace(/\s*/g, "")
    .replace(/'*/g, "")
    .replace(/-*/g, "")
    .replace(/,*/g, "")
    .replace(/!*/g, "")
    .replace(/:*/g, "")
    .replace(/<*/g, "")
    .replace(/>*/g, "")
    .replace(/\/*/g, "")
    .replace(/♪*/g, "");
};

const TextTrans = (s: string) => {
  return s
    .replace(/<color=#FFFFFFFF*/g, `<span style='color: #FFFFFFFF'`)
    .replace(/<color=#99FFFFFF*/g, `<span style='color: #99FFFFFF'`)
    .replace(/<color=#80C0FFFF*/g, `<span style='color: #80C0FFFF'`)
    .replace(/<color=#FF9999FF*/g, `<span style='color: #FF9999FF'`)
    .replace(/<color=#FFACFFFF*/g, `<span style='color: #FFACFFFF'`)
    .replace(/<color=#80FFD7FF*/g, `<span style='color: #80FFD7FF'`)
    .replace(/<color=#FFE699FF*/g, `<span style='color: #FFE699FF'`)
    .replace(/<color=#7EC236FF*/g, `<span style='color: #7EC236FF'`)
    .replace(/<color=#FFD780FF*/g, `<span style='color: #FFD780FF'`)
    .replace(/<color=#99FF88FF*/g, `<span style='color: #99FF88FF'`)
    .replace(/<color=#FFD780FF*/g, `<span style='color: #FFD780FF'`)
    .replace(/<color=#FFD780FF*/g, `<span style='color: #FFD780FF'`)
    .replace(/\/color>*/g, "/span>");
};

type costType = "1" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17";

const CostTypeTrans = (c: costType) => {
  const CostType = {
    "1": "Energy",
    "10": "Void",
    "11": "Cryo",
    "12": "Hydro",
    "13": "Pyro",
    "14": "Electro",
    "15": "Geo",
    "16": "Dendro",
    "17": "Anemo",
  };
  return CostType[c] || "";
};

type elementType =
  | "ETWind"
  | "ETIce"
  | "ETWater"
  | "ETFire"
  | "ETGrass"
  | "ETRock"
  | "ETThunder";
const ElementTypeTrans = (e: elementType) => {
  const ElementType = {
    ETWind: "Anemo",
    ETIce: "Cryo",
    ETWater: "Hydro",
    ETGrass: "Dendro",
    ETRock: "Geo",
    ETThunder: "Electro",
    ETFire: "Pyro",
  };
  return ElementType[e] || "";
};

type cardType = "AcEquip" | "AcSupport" | "AcEvent";

const CardTypeTrans = (c: cardType) => {
  const CardType = {
    AcEquip: "Equipment",
    AcSupport: "Support",
    AcEvent: "Event",
  };
  return CardType[c] || "";
};

export const transCharacters = () => {
  const roles = GIData.role_card_infos;
  const res = roles.map(
    role =>
      ({
        id: role.id,
        name: role.name,
        element: ElementTypeTrans(
          role.element_type as elementType
        ) as GIElement,
        weaponType: role.weapon as EqiupmentWeaponType,
        region: role.belong_to as GIRegion[],
        skills: role.role_skill_infos.map(skill => ({
          id: skill.id,
          text: TextTrans(skill.skill_text),
          name: skill.name,
          costs: skill.skill_costs
            .filter(c => c.cost_icon != "")
            .map(c => ({
              costNum: Number(c.cost_num),
              costType: CostTypeTrans(c.cost_icon as costType),
            })),
          type: skill.type.filter(skill => skill != "") as SkillSubType[],
          img: `${PUBLIC_PATH}/skill/${ImageIDTrans(skill.name)}.png`,
          imgID: ImageIDTrans(skill.name),
        })),
        equipments: {
          weapon: null,
          artifact: null,
          talent: null,
        },
        profile: null,
        elementStatus: null,
        hp: Number(role.hp),
        currentHp: Number(role.hp),
        img: `${PUBLIC_PATH}/characters/${ImageIDTrans(role.name)}.png`,
        imgID: ImageIDTrans(role.name),
        ...CharactersExtra[role.name as Character],
      } as ICharacter)
  );

  writeFileSync("./src/data/characters.json", JSON.stringify(res));
};

export const transCards = () => {
  const cards = GIData.action_card_infos;
  const res = cards.map(
    card =>
      ({
        id: card.id,
        name: card.name,
        content: TextTrans(card.content),
        mainType: CardTypeTrans(card.action_type as cardType),
        subType: card.action_card_tags
          .filter(t => t.text != "")
          .map(tag => tag.text),
        cost: [
          {
            costNum: Number(card.cost_num1),
            costType: CostTypeTrans(card.cost_type1_icon as costType),
          },
          {
            costNum: Number(card.cost_num2),
            costType: CostTypeTrans(card.cost_type2_icon as costType),
          },
        ],
        img: `${PUBLIC_PATH}/characters/${ImageIDTrans(card.name)}.png`,
        imgID: ImageIDTrans(card.name),
      } as unknown as ICard)
  );

  writeFileSync("./src/data/cards.json", JSON.stringify(res));
};

type I18NType = {
  [k: string]: I18NContentType;
};

type I18NContentType = {
  [k: string]: string;
};

export const transI18n = () => {
  const _i18n = I18n as I18NType;
  const i18n = I18n as I18NType;
  for (const lng in _i18n) {
    const _lng = {} as I18NContentType;
    const trans = _i18n[lng] as I18NContentType;
    for (const key in trans) {
      _lng[TextTrans(key)] = TextTrans(trans[key]);
    }
    i18n[lng] = _lng;
  }
  writeFileSync("./src/data/i18n.json", JSON.stringify(i18n));
};

transCharacters();
transCards();
transI18n();
