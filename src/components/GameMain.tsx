import useGame from "../hooks/useGame"

const GameMain = () => {
  const {
    nPlayers,
    players,
    endGame,
  } = useGame()

  return (
    <>
      <h1>Game Main {nPlayers}</h1>

      <ul>
        {/*{players.map((p, i) => <Player key={p.id} idx={i} />)}*/}
        {players.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>

      <button onClick={endGame}>
        GameMain
      </button>
    </>
  )
}

export default GameMain
