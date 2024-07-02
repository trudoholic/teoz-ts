import styled from "styled-components"
import {grey, lime} from "../styles/colors"
import useGame from "../hooks/useGame"

import {IPlayer} from "../data/players"
// import {zones} from "../data/zones"
// import Zone from "./Zone"

interface IPlayerInfoProps {
  $hand: boolean;
  $turn: boolean;
  $pass: boolean;
}

const StyledPlayerInfo = styled.div<IPlayerInfoProps>`
  background: ${({$pass}) => $pass ? grey[700]: "var(--table-color)"};
  border: ${({$hand}) => $hand ? `${2}px solid ${lime[800]}`: `${1}px solid ${grey[500]}`};
  box-sizing: border-box;
  color: ${({$turn}) => $turn ? lime[300]: grey[500]};
  font-size: 2.4rem;
  font-weight: ${({$turn}) => $turn ? "bold": "normal"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.6rem;
  padding: 0.8rem;
  //width: 25rem;
  height: 5rem;
`

export const StyledPlayer = styled.div`
  //background: olive;
  //border: 1px solid #f0f;
  flex: 1 0 0;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

interface IPlayerProps {
  idx: number
}

const Player = ({idx}: IPlayerProps) => {
  const {
    curHand,
    players,
  } = useGame()

  const divStyle = {
    border: "1px solid teal",
    color: "silver",
    // flex: "1 0 0",
    // fontSize: "1.6rem",
    // margin: "0.2rem",
    // padding: "0.8rem 1.6rem",
  }
  const curTurn = -1
  const player: IPlayer = players[idx]

  return (
    <StyledPlayer>
      <StyledPlayerInfo
        $hand={idx === curHand}
        $turn={idx === curTurn}
        $pass={false}
      >
        {`${player.name} (${idx})`}
      </StyledPlayerInfo>
      {
        // zones.map((zone) =>
        //   <Zone
        //     {...zone}
        //     key={zone.id}
        //     cards={getZone(zone.id, player.id)}
        //   />)

        [1,2,3].map((z) =>
          <div key={z} style={divStyle}>
            {z}
          </div>)
      }
    </StyledPlayer>
  )
}

export default Player
