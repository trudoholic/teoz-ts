import styled from "styled-components"
import {green} from "../styles/colors"
import {CardType} from "../data/cards"
import useGame from "../hooks/useGame"

export const StyledCommands = styled.div`
  //background: olive;
  border: 1px solid ${green[700]};
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  justify-content: start;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

const Commands = () => {
  const {
    idActive,
    // activeCard,
    cardData,
    curPlayer,
    endGame,
    nextHand,
    dropCard,
    getPyramid,
    mustDiscard,
    setIdActive,
    playTier,
    tierDown,
  } = useGame()

  // const card = activeCard()
  const data = cardData(idActive)
  const player = curPlayer()
  const pyramid = getPyramid(player.id)
  const SIZE = pyramid.statuses.length

  return (
    <StyledCommands>
      {
        idActive >= 0 ?
          <>

            <button onClick={() => setIdActive()}>
              Undo
            </button>

            {
              data.cardType === CardType.Group && player.canBuild ? (
                pyramid.statuses.toReversed().map((status, idx) => (
                  status < 0? (
                    <button key={idx} onClick={() => playTier(SIZE - 1 - idx)}>
                      Tier {SIZE - idx}
                    </button>
                  ): null
                ))
              ): null
            }

            {
              pyramid.status ? (
                <button onClick={tierDown}>
                  Fix Tier
                </button>
              ): null
            }

            {
              mustDiscard() ? (
                <button onClick={dropCard}>
                  Drop Card
                </button>
              ): null
            }

          </>: <>{/*NO ACTIVE CARD*/}

            {
              !mustDiscard() ? (
                <>
                  <button onClick={nextHand}>
                    Next
                  </button>

                  <button onClick={endGame}>
                    End Game
                  </button>
                </>
              ): <h2>Must Discard!</h2>
            }

          </>
      }
    </StyledCommands>
  )
}

export default Commands
