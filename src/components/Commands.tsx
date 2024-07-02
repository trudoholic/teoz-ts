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
    endGame,
  } = useGame()

  return (
    <StyledCommands>
      <button onClick={endGame}>
        End Game
      </button>
    </StyledCommands>
  )
}

export default Commands
