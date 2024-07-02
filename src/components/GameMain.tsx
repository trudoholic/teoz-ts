import styled from "styled-components"
import useGame from "../hooks/useGame"
import Commands from "./Commands"
import Player from "./Player"

export const MainContainer = styled.div`
  //background: olive;
  //border: 1px solid #ff0;
  display: flex;
  flex-direction: row;
  margin: 1.6rem 0;
  //width: 100%;
`

const GameMain = () => {
  const {
    curHand,
    nPlayers,
    players,
  } = useGame()

  const divStyle = {
    border: "1px solid silver",
    color: "silver",
    flex: "1 0 0",
    fontSize: "1.6rem",
    margin: "0.2rem",
    padding: "0.8rem 1.6rem",
  }

  return (
    <>
      <h2>Game Main {curHand} / {nPlayers}</h2>

      <MainContainer>

        <div style={divStyle}>
          Common
        </div>

        {players.map((p, i) => <Player key={p.id} idx={i} />)}
        <Commands/>

      </MainContainer>
    </>
  )
}

export default GameMain
