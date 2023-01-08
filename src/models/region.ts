export enum GIRegion {
  Mondstadt = "Mondstadt",
  Liyue = "Liyue",
  Inazuma = "Inazuma",
  Sumeru = "Sumeru",
  Fatui = "Fatui",
  Monster = "Monster",
}
export type GIRegionID = keyof typeof GIRegion;
