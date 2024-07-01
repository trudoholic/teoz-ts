import useAppContext from "../context/useAppContext"
import { Actions } from "../context/reducer"
import { IState } from "../context/state"

import { rawPlayers } from "../data/players"

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    isGameOver,
    nPlayers,
    players,
  } = state as IState

  const getPlayers = (n: number) => rawPlayers.slice(0, n)

  const beginGame = (n: number) => {
    dispatch({type: Actions.SetGameOver, payload: false})
    // dispatch({type: Actions.SetPlayers, payload: n})
    dispatch({type: Actions.SetPlayers, payload: getPlayers(n)})
  }

  const endGame = () => {
    dispatch({type: Actions.SetGameOver, payload: true})
  }

  const newGame = () => {
    // dispatch({type: Actions.SetPlayers, payload: 0})
    dispatch({type: Actions.SetPlayers, payload: []})
  }

  return {
    isGameOver,
    nPlayers,
    players,

    beginGame,
    endGame,
    newGame,
  }
}

export default useGame
