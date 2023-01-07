import { GIElement } from "./element";

export interface IEquipment {
  name: keyof typeof EqiupmentArtifact | EquipmentWeapon | EqiupmentTalent;
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
  Talent,
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
  GamblersEarrings,
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
  MaskOfSolitudeBasalt,
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
  ProphecyOfSubmersion,
  FlowingFlame,
  Crossfire,
  GrandExpectation,
  NaganoharaMeteorSwarm,
  StellarPredator,
  Awakening,
  ThunderingPenance,
  FeatherfallJudgement,
  ChaoticEntropy,
  LandsOfDandelion,
  StrategicReserve,
  IGotYourBack,
  FloralSidewinder,
  StreamingSurge,
  MirrorCage,
  PaidInFull,
  TranscentdentAutomaton,
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
  WolfsGraveStone,
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
  ...EquipmentWeaponBow,
  ...EquipmentWeaponClaymore,
  ...EquipmentWeaponPolearm,
  ...EquipmentWeaponCatalyst,
  ...EquipmentWeaponSword,
};

export type EquipmentWeapon = typeof EquipmentWeapons;
