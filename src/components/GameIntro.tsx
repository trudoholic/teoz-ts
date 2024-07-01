import useGame from "../hooks/useGame"

const GameIntro = () => {
  const {
    beginGame,
  } = useGame()

  return (
    <>
      <h1>Game Intro</h1>
      <button onClick={() => beginGame(2)}>
        Begin Game [2]
      </button>
      <button onClick={() => beginGame(3)}>
        Begin Game [3]
      </button>
      <button onClick={() => beginGame(4)}>
        Begin Game [4]
      </button>
    </>
  )
}

export default GameIntro
