export interface IEvent {
  name: keyof typeof Event | EventFood | EventElementalResonance;
  effect: Event | EventFood | EventElementalResonance;
}

export enum Event {
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
