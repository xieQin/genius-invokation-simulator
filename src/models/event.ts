export interface IEvent {
  id: EventID;
  name: string;
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
  WhentheCraneReturned,
  Starsigns,
  CalxsArts,
  MasterofWeaponry,
  BlessingoftheDivineRelicsInstallation,
  SendOff,
  GuardiansOath,
  Strategize,
  LeaveIttoMe,
  QuickKnit,
  AbyssalSummons,
}

export enum EventFood {
  JueyunGuoba,
  AdeptusTemptation,
  NorthernSmokedChicken,
  SweetMadame,
  LotusFlowerCrisp,
  MushroomPizza,
  MintyMeatRolls,
  MondstadtHashBrown,
}

export enum EventElementalResonance {
  ElementalResonanceWovenIce,
  ElementalResonanceShatteringIce,
  ElementalResonanceWovenWaters,
  ElementalResonanceSoothingWater,
  ElementalResonanceWovenFlames,
  ElementalResonanceFerventFlames,
  ElementalResonanceWovenThunder,
  ElementalResonanceHighVoltage,
  ElementalResonanceWovenWinds,
  ElementalResonanceImpetuousWinds,
  ElementalResonanceWovenWeeds,
  ElementalResonanceSprawlingGreenery,
  ElementalResonanceWovenStone,
  ElementalResonanceEnduringRock,
}

export type EventEventID = keyof typeof EventEvent;
export type EventFoodID = keyof typeof EventFood;
export type EventElementalResonanceID = keyof typeof EventElementalResonance;
export type EventID = EventEventID | EventFoodID | EventElementalResonanceID;
