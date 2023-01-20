export enum Phase {
  Init = "init",
  Start = "start",
  Choose = "choose",
  Roll = "roll",
  Combat = "combat",
  PlayCard = "play-card",
  DraftCard = "draft-card",
  ChangeCharacter = "change-character",
  Equipment = "equipment",
  Skill = "skill",
}

export enum Action {
  None = "",
  SwitchCard = "switch-card",
  ConfirmSwitchCard = "confirm-switch-card",
  CastSkill = "cast-skill",
}
