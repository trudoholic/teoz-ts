// import {cards, ICard} from "../data/cards"
import { IPlayer } from "../data/players"

export interface IState {
  isGameOver: boolean,
  nPlayers: number,
  players: IPlayer[]
}

export const defaultState: IState = {
  isGameOver: true,
  nPlayers: 0,
  players: [],
}
