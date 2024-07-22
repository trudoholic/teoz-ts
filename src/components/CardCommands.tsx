import useGame from "../hooks/useGame"

const CardCommands = () => {
  const {
    curPlayer,

    activeCard,
    canBuildGroup,
    canDiscard,
    dropCard,
    getPyramid,
    setIdActive,
    playTier,
    tierDown,
  } = useGame()

  const card = activeCard()
  const pyramid = getPyramid(curPlayer.id)
  const SIZE = pyramid.statuses.length

  return (
    <>

      <button onClick={() => setIdActive()}>
        Undo
      </button>

      {
        canBuildGroup(card) ? (
          pyramid.statuses.toReversed().map((status, idx) => (
            status < 0 && !pyramid.hasSuit(SIZE - 1 - idx) ? (
              <button key={idx} onClick={() => playTier(SIZE - 1 - idx)}>
                Tier {SIZE - idx}
              </button>
            ): null
          ))
        ): null
      }

      {
        canDiscard(card) ? (
          <button onClick={dropCard}>
            Discard
          </button>
        ): null
      }

      {
        pyramid.status ? (
          <button onClick={tierDown}>
            Fix Tier
          </button>
        ): null
      }

    </>
  )
}

export default CardCommands
