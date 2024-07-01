import useAppContext from "../context/useAppContext"
import {IState} from "../context/state"

import GameIntro from "./GameIntro"
import GameMain from "./GameMain"
import GameOutro from "./GameOutro"

const Main = () => {
  const { state } = useAppContext()
  const { isGameOver, nPlayers } = state as IState

  return (
    <>
      { 0 === nPlayers? <GameIntro/>: isGameOver? <GameOutro/>: <GameMain/> }
    </>
  )
}

export default Main
