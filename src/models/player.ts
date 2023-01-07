export interface IPlayer {
  name: PlayerName;
  status: string;
}

export enum PlayerPosition {
  Own,
  Opposite,
}

export type PlayerName = keyof typeof PlayerPosition;
