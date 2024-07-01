import useGame from "../hooks/useGame"

const GameOutro = () => {
  const {
    nPlayers,
    newGame,
  } = useGame()

  return (
    <>
      <h1>Game Outro {nPlayers}</h1>
      <button onClick={newGame}>
        GameOutro
      </button>
    </>
  )
}

export default GameOutro
