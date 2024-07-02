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
        New Game
      </button>
    </>
  )
}

export default GameOutro
