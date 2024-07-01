import useGame from "../hooks/useGame"

const GameOutro = () => {
  const {
    nPlayers,
    newGame,
  } = useGame()

  return (
    <>
      <h2>Game Outro {nPlayers}</h2>
      <button onClick={newGame}>
        GameOutro
      </button>
    </>
  )
}

export default GameOutro
