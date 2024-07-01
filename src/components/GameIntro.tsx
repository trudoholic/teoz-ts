import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"

const GameIntro = () => {
  const { dispatch } = useAppContext()
  const handleClick = (n: number) => {
    dispatch({type: Actions.SetGameOver, payload: false})
    dispatch({type: Actions.SetPlayers, payload: n})
  }

  return (
    <>
      <h1>Game Intro</h1>
      <button onClick={() => handleClick(2)}>
        Begin Game [2]
      </button>
      <button onClick={() => handleClick(3)}>
        Begin Game [3]
      </button>
      <button onClick={() => handleClick(4)}>
        Begin Game [4]
      </button>
    </>
  )
}

export default GameIntro
