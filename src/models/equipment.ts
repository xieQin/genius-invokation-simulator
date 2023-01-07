import { GIElement } from "./element";

export interface IEquipment {
  name: keyof typeof EqiupmentArtifact | EquipmentWeapon;
  type: EquipmentMainType;
  items?: IEquipmentWeapon | IEquipmentArtifact;
}

export interface IEquipmentWeapon extends IEquipment {
  subType: EqiupmentWeaponType;
  star: 3 | 4 | 5;
  effects: IEquipmentEffect[];
}

export interface IEquipmentEffect {
  type: EquipmentWeaponEffect | EquipmentArtifactEffect;
  value: number;
  turnLimit: boolean;
}

export interface IEquipmentArtifact extends IEquipment {
  element: GIElement;
  star: 4 | 5;
  effects: IEquipmentEffect[];
}

export enum EquipmentMainType {
  Weapon,
  Artifact,
}

export enum EqiupmentWeaponType {
  Bow,
  Claymore,
  Polearm,
  Catalyst,
  Sword,
}

export enum EqiupmentArtifact {
  AdventurersBandana,
  LuckyDogsSilverCirclet,
  TranvelingDoctersHandChief,
  InstructorsCap,
  ExilesCirclet,
  BrokenRimesEcho,
  BlizzardStrayer,
  WinStainedTricorne,
  HeartOfDepth,
  WitchsScorchingHat,
  CrimsonWitchOfFlames,
  ThunderSummonersCrown,
  ThunderingFury,
  ViridescentVenergersDiadem,
  ViridescentVenerer,
  LaurelCoronet,
  DeepwoodMemories,
  GamblersEarrings,
  MaskOfSolitudeBasalt,
  ArchaicPetra,
}

export enum EquipmentWeaponEffect {
  DealDamage,
  DealDamageByHp,
  CreateElementalDieAfterElementalSkill,
  DealDamageWhenNormalAttack,
  GrantShieldPointForLiyue,
  HealHPAfterSkill,
}

export enum EquipmentArtifactEffect {
  HealHPAfterNormalAttack,
  HealHPAfterElementalSkill,
  HealAllHPAfterElementalBurst,
  CreateElementalDieAfterTriggerElementalReaction,
  GainAllEnergyAfterElementalBurst,
  SpendLessDieWhenUseSkillOrEquipTalent,
  RollSameDieAtRollPhase,
  CreateOmniDieAfterOpposingCharacterDefeated,
}

export enum EquipmentWeaponClaymore {
  WhiteIronGreatsword,
  SacrificalGreatsword,
  WolfsGraveStone,
}

export enum EquipmentWeaponPolearm {
  WhiteTassel,
  LithicSpear,
  SkywardSpine,
}

export enum EquipmentWeaponCatalyst {
  MagicGuide,
  SacrificalFragments,
  SkywardAtlas,
}

export enum EquipmentWeaponSword {
  TravelersHandySword,
  SacrificalSword,
  AquilaFavonia,
}

export enum EquipmentWeaponBow {
  RavenBow,
  SacrificalBow,
  SkywardHarp,
}

export const EquipmentWeapons = {
  ...EquipmentWeaponBow,
  ...EquipmentWeaponClaymore,
  ...EquipmentWeaponPolearm,
  ...EquipmentWeaponCatalyst,
  ...EquipmentWeaponSword,
};

export type EquipmentWeapon = typeof EquipmentWeapons;
