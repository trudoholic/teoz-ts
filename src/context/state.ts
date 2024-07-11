import { ICard } from "../data/cards"
import { IPlayer } from "../data/players"

export interface IState {
  cards: ICard[]
  curHand: number
  curTurn: number
  idActive: string
  isGameOver: boolean
  nPlayers: number
  players: IPlayer[]
}

export const defaultState: IState = {
  cards: [],
  curHand: 0,
  curTurn: 0,
  idActive: "",
  isGameOver: true,
  nPlayers: 0,
  players: [],
}
