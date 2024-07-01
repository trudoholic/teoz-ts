import {IState} from "./state"
// import {ICard} from "../data/cards"

export enum Actions {
  SetCount,
}

export type TAction =
  | { type: Actions.SetCount, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.SetCount: {
      return { ...state,
        count: action.payload,
      }
    }

    default: {
      return state
    }

  }
}
