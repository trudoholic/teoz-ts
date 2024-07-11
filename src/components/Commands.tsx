import styled from "styled-components"
import {green} from "../styles/colors"
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
    curPlayer,
    endGame,
    nextHand,
    dropCard,
    getPyramid,
    setIdActive,
    playTier,
  } = useGame()

  const statuses = getPyramid(curPlayer().id).statuses
  const SIZE = statuses.length

  return (
    <StyledCommands>
      {
        idActive?
          <>

            <button onClick={() => setIdActive("")}>
              Undo
            </button>

            <button onClick={dropCard}>
              Drop Card
            </button>

            <hr/>

            {
              statuses.toReversed().map((status, idx) => (
                status < 0? (
                  <button key={idx} onClick={() => playTier(SIZE - 1 - idx)}>
                    Tier {SIZE - idx}
                  </button>
                ): null
              ))
            }

          </>: <>

            <button onClick={nextHand}>
              Next Hand
            </button>

            <button onClick={endGame}>
              End Game
            </button>

          </>
      }
    </StyledCommands>
  )
}

export default Commands
