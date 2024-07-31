import useGame from "../hooks/useGame"

const CardCommands = () => {
  const {
    curPlayer,

    activeCard,
    canBuildGroup,
    canDiscard,
    canMoveGroup,
    canPlayArtifact,
    dropCard,
    getPyramid,
    setId,
    playArtifact,
    playTier,
  } = useGame()

  const card = activeCard()
  const pyramid = getPyramid(curPlayer.id)
  const SIZE = pyramid.statuses.length

  return (
    <>

      <button onClick={() => setId()}>
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
        canMoveGroup(card) ? (
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
        canPlayArtifact(card) ? (
          <button onClick={playArtifact}>
            Play
          </button>
        ): null
      }

      {
        canDiscard(card) ? (
          <button onClick={dropCard}>
            Discard
          </button>
        ): null
      }

    </>
  )
}

export default CardCommands
