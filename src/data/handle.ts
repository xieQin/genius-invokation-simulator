import { writeFileSync } from "fs";

import {
  EqiupmentWeaponType,
  GIElement,
  GIRegion,
  ICard,
  ICharacter,
  SkillSubType,
} from "@/models";

import GIData from "./cards_20221205_en-us.json";

const PUBLIC_PATH =
  process.env.NODE_ENV === "development"
    ? ""
    : "https://xieqin.github.io/invokation";

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
        element: role.element_type as GIElement,
        weaponType: role.weapon as EqiupmentWeaponType,
        region: role.belong_to as GIRegion[],
        skills: role.role_skill_infos.map(skill => ({
          id: skill.id,
          text: skill.skill_text,
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
        img: `${PUBLIC_PATH}/characters/${ImageIDTrans(role.name)}.png`,
        imgID: ImageIDTrans(role.name),
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
        content: card.content,
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

transCharacters();
transCards();
