import styled from "styled-components"
import {green, grey, red} from "../styles/colors"
import useGame from "../hooks/useGame"
import {IZone} from "../data/zones"
import Card from "./Card"

interface ITierProps {
  $status: number;
}

const Tier = styled.div<ITierProps>`
  background: ${({$status}) => (
    $status < 0? green[700]: $status > 0? red[700]: grey[700]
  )};
  //border: 1px solid #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: 3.4rem;
`

const Pyramid = ({id, idPlayer}: IZone) => {
  const {
    cards,
    getPyramid,
  } = useGame()

  console.log(id, idPlayer, cards)

  const styles = {
    box: {
      maxHeight: "75vh",
      overflow: "auto",
      border: `1px solid ${grey[500]}`,
      margin: "16px",
      padding: "8px 0",
    },
    box0: {
      color: "#ccc",
      fontSize: "1.8rem",
    },
  };

  const pyramid = getPyramid()

  return (
    <>
      <div style={styles.box}>
        {
          pyramid.tiers.toReversed().map((tier, idx) => (
            <Tier
              key={idx}
              $status={+pyramid.statuses.toReversed().at(idx)}
            >
              {
                tier.map((card) => (
                  <Card key={card.id} {...card}/>
                ))
              }
            </Tier>
          ))
        }
        ATK: {pyramid.atk} - DEF: {pyramid.def} - LVL: {pyramid.lvl} {pyramid.status? "*": ""}
      </div>
    </>
  )
}

export default Pyramid
