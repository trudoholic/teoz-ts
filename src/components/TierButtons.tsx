import useGame from "../hooks/useGame"

const TierButtons = () => {
  const {
    curPlayer,

    getPyramid,
    playTier,
  } = useGame()

  const pyramid = getPyramid(curPlayer.id)

  return (
    <>
      {
        [3, 2, 1, 0].map((idx) => (
          pyramid.hasButton(idx)? (
            <button key={idx} onClick={() => playTier(idx)}>
              Tier {idx + 1}
            </button>
          ): null
        ))
      }
    </>
  )
}

export default TierButtons
