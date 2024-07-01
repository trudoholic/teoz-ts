import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    isGameOver,
    nPlayers,
  } = state as IState

  const beginGame = (n: number) => {
    dispatch({type: Actions.SetGameOver, payload: false})
    dispatch({type: Actions.SetPlayers, payload: n})
  }

  const endGame = () => {
    dispatch({type: Actions.SetGameOver, payload: true})
  }

  const newGame = () => {
    dispatch({type: Actions.SetPlayers, payload: 0})
  }

  return {
    isGameOver,
    nPlayers,

    beginGame,
    endGame,
    newGame,
  }
}

export default useGame
