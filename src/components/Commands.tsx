import styled from "styled-components"
import {green} from "../styles/colors"
import {CardType} from "../data/cards"
import {GameState} from "../data/game"
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
    gameState,
    cardData,
    curPlayer,
    endGame,
    nextHand,
    dropCard,
    getPyramid,
    mustDiscard,
    setIdActive,
    playTier,
    startGame,
    tierDown,
  } = useGame()

  // const card = activeCard()
  const data = cardData(idActive)
  const player = curPlayer()
  const pyramid = getPyramid(player.id)
  const SIZE = pyramid.statuses.length

  return (
    <StyledCommands>
      {player.winner?
        <>
          <h2>Winner!</h2>
          <button onClick={endGame}>
            End Game
          </button>
        </>
        : null
      }
      {
        idActive >= 0 ?
          <>

            <button onClick={() => setIdActive()}>
              Undo
            </button>

            {
              data.cardType === CardType.Group && player.canBuild ? (
                pyramid.statuses.toReversed().map((status, idx) => (
                  status < 0 && !pyramid.hasSuit(SIZE - 1 - idx, data.suit ?? "") ? (
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
                  {
                    GameState.Begin === gameState ? (
                      <button onClick={startGame}>
                        Start
                      </button>
                    ): (
                      <button onClick={nextHand}>
                        Next
                      </button>
                    )
                  }
                </>
              ): <h2>Play or Discard</h2>
            }

          </>
      }
    </StyledCommands>
  )
}

export default Commands
