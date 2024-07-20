import useGame from "../hooks/useGame"

const GameOutro = () => {
  const {
    players,
    newGame,
  } = useGame()

  return (
    <>
      <h2>Game Outro</h2>
      {
        players.map(player => <p key={player.id}>{player.name}{player.winner? ": WINNER": ""}</p>)
      }
      <button onClick={newGame}>
        New Game
      </button>
    </>
  )
}

export default GameOutro
