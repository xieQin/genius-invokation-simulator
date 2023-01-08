import { GIElement, GIElementID } from "./element";

export interface IGIDice {
  id: GIDiceID;
}

export enum GIDiceExtra {
  Omni,
}

export const GIDices = {
  GIDiceExtra,
  ...GIElement,
};

export type GIDice = GIElement | GIDiceExtra;
export type GIDiceID = GIElementID | keyof typeof GIDiceExtra;
