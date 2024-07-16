import styled from "styled-components"
import {green, grey, orange} from "../styles/colors"
import useGame from "../hooks/useGame"
import {cardColor, cardData, ICard, size} from "../data/cards"

interface ICardProps {
  $active: boolean;
  $target: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  background: ${
    ({$disabled, $active, $target}) => $active ? (
      `${green[300]}`
    ) : $target ? (
      `${orange[300]}`
    ) : $disabled ? (
      `${grey[700]}`
    ) : (
      `${green[900]}`
    )
  };
  border: 1px solid ${grey[500]};
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
  margin: ${`${size.margin}rem`};
  width: ${`${size.width}rem`};
  height: ${`${size.height}rem`};
`

interface ICircleProps {
  $bgColor: string;
}

export const StyledCircle = styled.div<ICircleProps>`
  background: ${({$bgColor}) => $bgColor};
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  left: ${`${(size.width - size.radius)/2}rem`};
  top: ${`${(size.height - size.radius)/2}rem`};
  width: ${`${size.radius}rem`};
  height: ${`${size.radius}rem`};
`

export const StyledSpan = styled.div`
  color: ${grey[300]};
  font-family: monospace, monospace;
  font-size: 1.6rem;
  line-height: ${`${size.radius}rem`};
`

const Card = (card: ICard) => {
  const {
    id,
  } = card

  const {
    isActive,
    isValidCard,
    setIdActive,
  } = useGame()

  const bgColor = cardColor(id)
  const data = cardData(id)

  const cardDisabled = !isValidCard(card)
  const cardTarget = false

  return (
    <StyledCard
      $active={isActive(id)}
      $target={cardTarget}
      $disabled={cardDisabled}
      {...(!cardDisabled && { "onClick": () => setIdActive(id) })}
    >
      <StyledCircle $bgColor={bgColor}>
        <StyledSpan>{data.name}</StyledSpan>
      </StyledCircle>
    </StyledCard>
  )
}

export default Card
