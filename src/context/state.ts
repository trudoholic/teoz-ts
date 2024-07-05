import { ICard } from "../data/cards"
import { IPlayer } from "../data/players"

export interface IState {
  cards: ICard[]
  curHand: number
  isGameOver: boolean
  nPlayers: number
  players: IPlayer[]
}

export const defaultState: IState = {
  cards: [],
  curHand: 0,
  isGameOver: true,
  nPlayers: 0,
  players: [],
}
