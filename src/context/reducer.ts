import { IState } from "./state"
import { ICard } from "../data/cards"
import { IPlayer } from "../data/players"

export enum Actions {
  SetCards,
  SetCurHand,
  SetIdActive,
  SetGameOver,
  SetPlayer,
  SetPlayers,
}

export type TAction =
  | { type: Actions.SetCards, payload: ICard[] }
  | { type: Actions.SetCurHand, payload: number }
  | { type: Actions.SetIdActive, payload: string }
  | { type: Actions.SetGameOver, payload: boolean }
  | { type: Actions.SetPlayer, payload: Partial<IPlayer> }
  | { type: Actions.SetPlayers, payload: IPlayer[] }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetCards: {
      return { ...state, cards: action.payload }
    }

    case Actions.SetCurHand: {
      return { ...state, curHand: action.payload, curTurn: action.payload }
    }

    case Actions.SetIdActive: {
      return { ...state, idActive: action.payload }
    }

    case Actions.SetGameOver: {
      return { ...state, isGameOver: action.payload }
    }

    case Actions.SetPlayer: {
      return { ...state,
        players: [...state.players.map(player => (
          player.id === action.payload.id? {...player, ...action.payload}: player
        ))],
      }
    }

    case Actions.SetPlayers: {
      return { ...state,
        nPlayers: action.payload.length,
        players: action.payload,
      }
    }

    default: {
      return state
    }

  }
}
