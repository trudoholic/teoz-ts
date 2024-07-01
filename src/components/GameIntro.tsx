import useGame from "../hooks/useGame"

const GameIntro = () => {
  const {
    beginGame,
  } = useGame()

  return (
    <>
      <h2>Game Intro</h2>
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
