import { GIElement } from "./element";

export interface IEquipment {
  id: EquipmentID;
  name: string;
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
  Weapon = "Weapon",
  Artifact = "Artifact",
  Talent = "Talent",
  Other = "Other",
}

export enum EqiupmentWeaponType {
  Bow = "Bow",
  Claymore = "Claymore",
  Polearm = "Polearm",
  Catalyst = "Catalyst",
  Sword = "Sword",
  Other = "Other Weapons",
}

export enum EqiupmentArtifact {
  AdventurersBandana,
  LuckyDogsSilverCirclet,
  TravelingDoctorsHandkerchief,
  GamblersEarrings,
  InstructorsCap,
  ExilesCirclet,
  BrokenRimesEcho,
  BlizzardStrayer,
  WineStainedTricorne,
  HeartofDepth,
  WitchsScorchingHat,
  CrimsonWitchofFlames,
  ThunderSummonersCrown,
  ThunderingFury,
  ViridescentVenerersDiadem,
  ViridescentVenerer,
  MaskofSolitudeBasalt,
  ArchaicPetra,
  LaurelCoronet,
  DeepwoodMemories,
}

export enum EqiupmentTalent {
  UndividedHeart,
  ShakenNotPurred,
  ColdBloodedStrike,
  SteadyBreathing,
  KantenSenmyouBlessing,
  GloriousSeason,
  TheScentRemained,
  ProphecyofSubmersion,
  FlowingFlame,
  Crossfire,
  GrandExpectation,
  NaganoharaMeteorSwarm,
  StellarPredator,
  Awakening,
  ThunderingPenance,
  FeatherfallJudgment,
  ChaoticEntropy,
  LandsofDandelion,
  StrategicReserve,
  IGotYourBack,
  FloralSidewinder,
  StreamingSurge,
  MirrorCage,
  PaidinFull,
  TranscendentAutomaton,
  StonehideReforged,
  ProliferatingSpores,
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
  SacrificialGreatsword,
  WolfsGravestone,
}

export enum EquipmentWeaponPolearm {
  WhiteTassel,
  LithicSpear,
  SkywardSpine,
}

export enum EquipmentWeaponCatalyst {
  MagicGuide,
  SacrificialFragments,
  SkywardAtlas,
}

export enum EquipmentWeaponSword {
  TravelersHandySword,
  SacrificialSword,
  AquilaFavonia,
}

export enum EquipmentWeaponBow {
  RavenBow,
  SacrificialBow,
  SkywardHarp,
}

export const EquipmentWeapons = {
  EquipmentWeaponBow,
  ...EquipmentWeaponClaymore,
  ...EquipmentWeaponPolearm,
  ...EquipmentWeaponCatalyst,
  ...EquipmentWeaponSword,
};

export type EquipmentWeapon = typeof EquipmentWeapons;
export type EquipmentWeaponID = keyof EquipmentWeapon;
export type EquipmentArtifactID = keyof typeof EqiupmentArtifact;
export type EquipmentTalentID = keyof typeof EqiupmentTalent;
export type EquipmentID =
  | EquipmentWeaponID
  | EquipmentArtifactID
  | EquipmentTalentID;
