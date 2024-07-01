import { ReducerState, useReducer } from "react"
import { reducer } from "./reducer"
import { IState, defaultState } from "./state"
import { AppContext } from "./useAppContext"

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState as ReducerState<IState>)
  return <AppContext.Provider value={{ state, dispatch }} children={ children } />
}

export default ContextProvider
