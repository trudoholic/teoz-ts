import styled from "styled-components"
import {grey} from "../styles/colors"
import useGame from "../hooks/useGame"
import {IZone} from "../data/zones"
import Card from "./Card"

const CardContainer = styled.div`
  //background: olive;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const Zone = ({id, idPlayer}: IZone) => {
  const {
    zoneCards,
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

  const cards = zoneCards(id, idPlayer)

  return (
    <>
      <div style={styles.box}>
        {
          cards.length ?
            <details open>
              <summary>{`${id} [${cards.length}]`}</summary>

              <CardContainer>
                {cards.map((card) => (
                  <Card {...card} key={card.id}/>
                ))}
              </CardContainer>

            </details>
            : <div style={styles.box0}>{`${id} ${idPlayer}`}</div>
        }
      </div>
    </>
  )
}

export default Zone
