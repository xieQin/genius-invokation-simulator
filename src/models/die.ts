import { GIElement } from "./element";

export interface IGIDice {
  name: keyof typeof GIElement | GIDiceExtra;
}

export enum GIDiceExtra {
  Omini,
}

export const GIDices = {
  ...GIElement,
  ...GIDiceExtra,
};

export type GIDice = GIElement | GIDiceExtra;
