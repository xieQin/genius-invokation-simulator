export interface IEvent {
  name: EventName;
  type: EventEvent;
  effect: EventEvent | EventFood | EventElementalResonance;
}

export enum EventType {
  Event,
  Food,
  ElementalResonance,
}

export enum EventEvent {
  TossUp,
  TheBestestTravelCompanion,
  ChangingShifts,
  IHaventLostYet,
  WhenTheCraneReturned,
  Starsigns,
  CalxsArts,
  MasterOfWeaponry,
  BlessingOfTheDivineRelicsInstallation,
  SendOff,
  GuardiansOath,
  Strategize,
  LeaveItToMe,
  QuickKnit,
  AbyssalSummons,
}

export enum EventFood {
  JueyunGuoba,
  AdeptusTemptation,
  NorthernSmokeChicken,
  SweetMadame,
  LotusFlowerCrisp,
  MushroomPizza,
  MintyMeatRolls,
  MondstadtHashBrown,
}

export enum EventElementalResonance {
  WovenIce,
  ShatteringIce,
  WovenWaters,
  SoothingWater,
  WovenFlames,
  FerventFlames,
  WovenThunder,
  HighVoltage,
  WovenWinds,
  ImpetuousWinds,
  WovenWeeds,
  SprawlingGreenery,
  WovenStone,
  EnduringRock,
}

export type EventEventName = keyof typeof EventEvent;
export type EventFoodName = keyof typeof EventFood;
export type EventElementalResonanceName = keyof typeof EventElementalResonance;
export type EventName =
  | EventEventName
  | EventFoodName
  | EventElementalResonanceName;
