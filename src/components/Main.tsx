import GameIntro from "./GameIntro"
import GameMain from "./GameMain"
import GameOutro from "./GameOutro"
import {GameState} from "../data/game"
import useGame from "../hooks/useGame"

const Main = () => {
  const {
    gameState,
  } = useGame()

  return (
    <>
      {
        GameState.Over === gameState? <GameIntro/>:
          GameState.End === gameState? <GameOutro/>: <GameMain/>
      }
    </>
  )
}

export default Main
