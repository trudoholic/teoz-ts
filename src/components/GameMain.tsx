import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

const GameMain = () => {
  const { state, dispatch } = useAppContext()
  const { nPlayers } = state as IState
  const handleClick = () => {
    dispatch({type: Actions.SetGameOver, payload: true})
  }

  return (
    <>
      <h1>Game Main {nPlayers}</h1>
      <button onClick={() => handleClick()}>
        GameMain
      </button>
    </>
  )
}

export default GameMain
