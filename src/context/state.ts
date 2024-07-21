import {GameState, Phase} from "../data/game"
import {ICard} from "../data/cards"
import {IPlayer} from "../data/players"

export interface IState {
  cards: ICard[]
  curHand: number
  curTurn: number
  gameState: string
  idActive: number
  nPlayers: number
  phase: string
  players: IPlayer[]
  ply: number
}

export const defaultState: IState = {
  cards: [],
  curHand: 0,
  curTurn: 0,
  gameState: GameState.Over,
  idActive: -1,
  nPlayers: 0,
  phase: Phase.Main,
  players: [],
  ply: 0,
}
