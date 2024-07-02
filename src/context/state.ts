// import {cards, ICard} from "../data/cards"
import { IPlayer } from "../data/players"

export interface IState {
  curHand: number
  isGameOver: boolean
  nPlayers: number
  players: IPlayer[]
}

export const defaultState: IState = {
  curHand: 0,
  isGameOver: true,
  nPlayers: 0,
  players: [],
}
