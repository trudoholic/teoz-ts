import styled from "styled-components"
import {green, grey, red} from "../styles/colors"
import useGame from "../hooks/useGame"
import {size, tableColor} from "../data/cards"
import Card from "./Card"

interface ITierProps {
  $status: number;
}

const Tier = styled.div<ITierProps>`
  background: ${({$status}) => (
    $status < 0? green[800]: $status > 0? red[800]: tableColor
  )};
  border: 1px solid ${grey[600]};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: ${`${size.height + 3 * size.margin}rem`};
  margin-top: -1px;
`

interface IProps {
  idPlayer: string
}

const Pyramid = ({idPlayer}: IProps) => {
  const {
    getPyramid,
  } = useGame()

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

  const pyramid = getPyramid(idPlayer ?? "")

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
