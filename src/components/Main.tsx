import GameIntro from "./GameIntro"
import GameMain from "./GameMain"
import GameOutro from "./GameOutro"
import useGame from "../hooks/useGame"

const Main = () => {
  const {
    isGameOver,
    nPlayers,
  } = useGame()

  return (
    <>
      { 0 === nPlayers? <GameIntro/>: isGameOver? <GameOutro/>: <GameMain/> }
    </>
  )
}

export default Main
