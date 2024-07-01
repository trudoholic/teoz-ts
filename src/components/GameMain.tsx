import useGame from "../hooks/useGame"

const GameMain = () => {
  const {
    nPlayers,
    endGame,
  } = useGame()

  return (
    <>
      <h1>Game Main {nPlayers}</h1>
      <button onClick={endGame}>
        GameMain
      </button>
    </>
  )
}

export default GameMain
