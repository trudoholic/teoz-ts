// import {cards, ICard} from "../data/cards"

export interface IState {
  isGameOver: boolean,
  nPlayers: number,
}

export const defaultState: IState = {
  isGameOver: true,
  nPlayers: 0,
}
