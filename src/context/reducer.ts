import {IState} from "./state"
// import {ICard} from "../data/cards"
import { IPlayer } from "../data/players"

export enum Actions {
  SetCurHand,
  SetGameOver,
  SetPlayers,
}

export type TAction =
  | { type: Actions.SetCurHand, payload: number }
  | { type: Actions.SetGameOver, payload: boolean }
  | { type: Actions.SetPlayers, payload: IPlayer[] }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetCurHand: {
      return { ...state,
        curHand: action.payload,
      }
    }

    case Actions.SetGameOver: {
      return { ...state,
        isGameOver: action.payload,
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
