import styled from "styled-components"
import useGame from "../hooks/useGame"
import Commands from "./Commands"
import Common from "./Common"
import Player from "./Player"

const MainContainer = styled.div`
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
    idActive,
    nPlayers,
    players,
    ply,

    cardData,
  } = useGame()

  const nameActive = cardData(idActive)?.name ?? ""

  return (
    <>
      <h2>Game Main ({ply}:{Math.floor(ply/nPlayers)}) [{curHand} / {nPlayers}] {nameActive}</h2>
      <MainContainer>
        <Common/>
        {players.map((p, i) => <Player key={p.id} idx={i} />)}
        <Commands/>
      </MainContainer>
    </>
  )
}

export default GameMain
