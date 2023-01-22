export const NameIDTrans = (s: string) => {
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

export const TextTrans = (s: string) => {
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

export type costType =
  | "1"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17";

export const CostTypeTrans = (c: costType) => {
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

export type elementType =
  | "ETWind"
  | "ETIce"
  | "ETWater"
  | "ETFire"
  | "ETGrass"
  | "ETRock"
  | "ETThunder";
export const ElementTypeTrans = (e: elementType) => {
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

export type cardType = "AcEquip" | "AcSupport" | "AcEvent";

export const CardTypeTrans = (c: cardType) => {
  const CardType = {
    AcEquip: "Equipment",
    AcSupport: "Support",
    AcEvent: "Event",
  };
  return CardType[c] || "";
};
