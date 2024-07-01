import { createContext, Dispatch, useContext } from "react"
import { TAction } from "./reducer"
import { IState, defaultState } from "./state"

export const AppContext = createContext<{
  state: IState
  dispatch?: Dispatch<TAction>
}>({ state: defaultState })

const useAppContext = () => useContext(AppContext)

export default useAppContext
