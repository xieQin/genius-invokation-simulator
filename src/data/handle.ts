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

import I18n from "./cards_20221205_i18n.json";
import GIData from "./cards_en-us.json";
import CardsExtra from "./cards-extra.json";
import CharactersExtra from "./character-extra.json";
import SkillExtra from "./skill-extra.json";
import {
  cardType,
  CardTypeTrans,
  costType,
  CostTypeTrans,
  elementType,
  ElementTypeTrans,
  NameIDTrans,
  TextTrans,
} from "./trans";

const PUBLIC_PATH = process.env.NODE_ENV === "development" ? "" : "";

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
          img: `${PUBLIC_PATH}/skill/${NameIDTrans(skill.name)}.png`,
          imgID: NameIDTrans(skill.name),
          ...SkillExtra[skill.name as keyof typeof SkillExtra],
        })),
        equipments: {
          weapon: null,
          artifact: null,
          talent: null,
        },
        profile: null,
        elementStatus: [],
        hp: Number(role.hp),
        currentHp: Number(role.hp),
        img: `${PUBLIC_PATH}/characters/${NameIDTrans(role.name)}.png`,
        imgID: NameIDTrans(role.name),
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
        subType:
          card.action_card_tags.filter(t => t.text != "").map(tag => tag.text)
            .length !== 0
            ? card.action_card_tags
                .filter(t => t.text != "")
                .map(tag => tag.text)
            : ["Event"],
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
        img: `${PUBLIC_PATH}/characters/${NameIDTrans(card.name)}.png`,
        imgID: NameIDTrans(card.name),
        ...CardsExtra[card.name as keyof typeof CardsExtra],
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
// transCards();
// transI18n();

const defaultSkillExtra = {
  damage: [
    {
      damage: 0,
      damageType: "",
      target: "Active",
    },
    {
      damage: 0,
      damageType: "",
      target: "Background",
    },
  ],
  summons: [],
  shield: [],
  heal: [
    {
      heal: 0,
      target: "All",
    },
  ],
};

export const generateSkill = () => {
  const roles = GIData.role_card_infos;
  const res = new Map();
  roles.map(role => {
    role.role_skill_infos.map(skill => res.set(skill.name, defaultSkillExtra));
  });
  writeFileSync(
    "./src/data/skill-extra.json",
    JSON.stringify(Object.fromEntries(res))
  );
};

export const formatSkillExtras = () => {
  const res = new Map();
  for (const key in SkillExtra) {
    if (key in SkillExtra) {
      const _k = key as keyof typeof SkillExtra;
      const item = SkillExtra[_k];
      res.set(_k, Object.assign({}, defaultSkillExtra, item));
    }
  }
  writeFileSync(
    "./src/data/skill-extra.json",
    JSON.stringify(Object.fromEntries(res))
  );
};

// formatSkillExtras();

const defaultCardsExtra = {
  cardTarget: [],
  deckLimit: [],
  combatLimit: [],
  cardEffect: [],
  cardModify: [],
};

export const generateCardExtra = () => {
  const cards = GIData.action_card_infos;
  const res = new Map();
  cards.map(card => {
    res.set(card.name, defaultCardsExtra);
  });
  writeFileSync(
    "./src/data/cards-extra.json",
    JSON.stringify(Object.fromEntries(res))
  );
};
// generateCardExtra();
