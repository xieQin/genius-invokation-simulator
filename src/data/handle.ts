import { CardMainType, EqiupmentWeaponType, GIElement, ICard, ICharacter, ISkill, SkillSubType } from "@/models";
import { GIRegion } from "@/models/region";
import { writeFileSync } from "fs";
import GIData from "./cards_20221205_en-us.json";

const ImageIDTrans = (s: string) => {
  return s.replace(/\s*/g,"").replace(/\'*/g,"").replace(/\-*/g,"").replace(/\,*/g,"").replace(/\!*/g,"").replace(/\:*/g,"")
}

export const transCharacters = () => {
  const roles = GIData.role_card_infos;
  const res = roles.map(role => (
    {
      id: role.id,
      name: role.name,
      element: role.element_type as GIElement,
      weaponType: role.weapon as EqiupmentWeaponType,
      region: role.belong_to as GIRegion[],
      skills: role.role_skill_infos.map(skill => ({
        id: skill.id,
        text: skill.skill_text,
        name: skill.name,
        costs: skill.skill_costs.map(c => ({
          costNum: Number(c.cost_num),
          costType: c.cost_icon
        })),
        type: skill.type as SkillSubType [],
        img: skill.resource,
      })),
      equipments: null,
      profile: null,
      elementStatus: null,
      hp: Number(role.hp),
      img: role.resource,
      imgID: ImageIDTrans(role.name),
    } as ICharacter
  ));
  
  writeFileSync("./src/data/character.json", JSON.stringify(res))
}

export const transCards = () => {
  const cards = GIData.action_card_infos;
  const res = cards.map(card => (
    {
      id: card.id,
      name: card.name,
      content: card.content,
      mainType: card.action_type as CardMainType,
      subType: card.action_card_tags.map(tag => (tag.text)),
      cost: [{
        costNum: Number(card.cost_num1),
        costType: card.cost_type1_icon,
      }, {
        costNum: Number(card.cost_num2),
        costType: card.cost_type2_icon,
      }],
      img: card.resource,
      imgID: ImageIDTrans(card.name),
    } as unknown as ICard
  ));
  
  writeFileSync("./src/data/cards.json", JSON.stringify(res))
}

transCharacters();
transCards();
