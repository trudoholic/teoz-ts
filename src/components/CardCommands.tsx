import {Phase} from "../data/game"
import useGame from "../hooks/useGame"

const CardCommands = () => {
  const {
    idActive,
    curPlayer,
    phase,
    activeCard,
    cardData,
    canBuildGroup,
    dropCard,
    getPyramid,
    setIdActive,
    playTier,
    tierDown,
  } = useGame()

  // const card = activeCard()
  const data = cardData(idActive)
  const pyramid = getPyramid(curPlayer.id)
  const SIZE = pyramid.statuses.length

  return (
    <>

      <button onClick={() => setIdActive()}>
        Undo
      </button>

      {
        Phase.Main === phase ? (
          <>
            {
              canBuildGroup(activeCard()) ? (
                pyramid.statuses.toReversed().map((status, idx) => (
                  status < 0 && !pyramid.hasSuit(SIZE - 1 - idx, data.suit ?? "") ? (
                    <button key={idx} onClick={() => playTier(SIZE - 1 - idx)}>
                      Tier {SIZE - idx}
                    </button>
                  ): null
                ))
              ): null
            }
          </>
        ) : Phase.End === phase ? (

          <button onClick={dropCard}>
            Drop Card
          </button>

        ) : null
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
