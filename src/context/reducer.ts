import {IState} from "./state"
// import {ICard} from "../data/cards"

export enum Actions {
  SetGameOver,
  SetPlayers,
}

export type TAction =
  | { type: Actions.SetGameOver, payload: boolean }
  | { type: Actions.SetPlayers, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetGameOver: {
      return { ...state,
        isGameOver: action.payload,
      }
    }

    case Actions.SetPlayers: {
      return { ...state,
        nPlayers: action.payload,
      }
    }

    default: {
      return state
    }

  }
}
