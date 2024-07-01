import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

const GameOutro = () => {
  const { state, dispatch } = useAppContext()
  const { nPlayers } = state as IState
  const handleClick = () => {
    dispatch({type: Actions.SetPlayers, payload: 0})
  }

  return (
    <>
      <h1>Game Outro {nPlayers}</h1>
      <button onClick={() => handleClick()}>
        GameOutro
      </button>
    </>
  )
}

export default GameOutro
