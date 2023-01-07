import { GIElement, GIElementName } from "./element";

export interface IGIDice {
  name: GIDiceName;
}

export enum GIDiceExtra {
  Omni,
}

export const GIDices = {
  GIDiceExtra,
  ...GIElement,
};

export type GIDice = GIElement | GIDiceExtra;
export type GIDiceName = GIElementName | keyof typeof GIDiceExtra;
