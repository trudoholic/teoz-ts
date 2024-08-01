import styled from "styled-components"
import {green} from "../styles/colors"
import {GameState, Phase} from "../data/game"
import useGame from "../hooks/useGame"
import CardCommands from "./CardCommands"

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
    idTarget,
    gameState,
    curPlayer,
    phase,

    attack,
    endGame,
    getPyramid,
    nextHand,
    mustDiscard,
    onFixed,
    pass,
    setId,
    startGame,
  } = useGame()

  const nDiscard = mustDiscard()

  return (
    <StyledCommands>
      <h2>GameState: {gameState}</h2>
      <h2>Phase: {phase}</h2>

      {
        GameState.Begin === gameState ? (
          <button onClick={startGame}>
            Start
          </button>
        ): GameState.Main === gameState ? (
          <>
            {
              curPlayer.winner ? (
                <>
                  <h2>Winner!</h2>
                  <button onClick={endGame}>
                    End Game
                  </button>
                </>
              ) : Phase.Main === phase ? (
                <>
                  {
                    idActive < 0 ? (
                      <button onClick={pass}>
                        Pass
                      </button>
                    ) : (
                      <CardCommands/>
                    )
                  }
                </>
              ) : Phase.Target === phase ? (
                <>
                  <button onClick={() => setId()}>
                    Undo
                  </button>
                  {
                    idTarget < 0 ? (
                      <h2>Select Target</h2>
                    ) : (
                      <button onClick={attack}>
                        Attack
                      </button>
                    )
                  }
                </>
              ) : Phase.End === phase ? (
                <>
                  {
                    idActive < 0 ? (
                      <>
                        {
                          nDiscard ? (
                            <h2>Discard {nDiscard}</h2>
                          ) : (
                            <button onClick={nextHand}>
                              Next
                            </button>
                          )
                        }
                      </>
                    ) : (
                      <CardCommands/>
                    )
                  }
                </>
              ) : Phase.Fix === phase ? (
                <>
                  {
                    idActive < 0 ? (
                      <>
                        {
                          getPyramid(curPlayer.id).status ? (
                            <h2>Fix Tier</h2>
                          ): (
                            <button onClick={onFixed}>
                              OK
                            </button>
                          )
                        }
                      </>
                    ) : (
                      <CardCommands/>
                    )
                  }
                </>
              ) : null
            }
          </>
        ) : null
      }
    </StyledCommands>
  )
}

export default Commands
