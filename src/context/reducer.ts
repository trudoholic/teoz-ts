import { IState } from "./state"
import { ICard } from "../data/cards"
import { IPlayer } from "../data/players"

export enum Actions {
  SetCards,
  SetCurHand,
  SetGameState,
  SetIdActive,
  SetPhase,
  SetPlayer,
  SetPlayers,
  SetPly,
  SetIdTarget,
}

export type TAction =
  | { type: Actions.SetCards, payload: ICard[] }
  | { type: Actions.SetCurHand, payload: number }
  | { type: Actions.SetGameState, payload: string }
  | { type: Actions.SetIdActive, payload: number }
  | { type: Actions.SetPhase, payload: string }
  | { type: Actions.SetPlayer, payload: Partial<IPlayer> }
  | { type: Actions.SetPlayers, payload: IPlayer[] }
  | { type: Actions.SetPly, payload: number }
  | { type: Actions.SetIdTarget, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetCards: {
      return { ...state, cards: action.payload }
    }

    case Actions.SetCurHand: {
      return { ...state, curHand: action.payload, curTurn: action.payload }
    }

    case Actions.SetGameState: {
      return { ...state, gameState: action.payload }
    }

    case Actions.SetIdActive: {
      return { ...state, idActive: action.payload }
    }

    case Actions.SetPhase: {
      return { ...state, phase: action.payload }
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

    case Actions.SetPly: {
      return { ...state, ply: action.payload }
    }

    case Actions.SetIdTarget: {
      return { ...state, idTarget: action.payload }
    }

    default: {
      return state
    }

  }
}
