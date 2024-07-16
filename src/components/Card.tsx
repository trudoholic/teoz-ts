import styled from "styled-components"
import {green, grey, orange} from "../styles/colors"
import useGame from "../hooks/useGame"
import {
  cardColor, cardData, CardType, ICard, size, tableColor
} from "../data/cards"

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
      tableColor
    ) : (
      `${green[800]}`
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

export const StyledRhombus = styled.div<ICircleProps>`
  background: ${({$bgColor}) => $bgColor};
  box-sizing: border-box;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  position: relative;
  left: ${`${(size.width - size.radius)/2}rem`};
  top: ${`${(size.height - size.radius)/2}rem`};
  width: ${`${size.radius}rem`};
  height: ${`${size.radius}rem`};
`

export const StyledSquare = styled.div<ICircleProps>`
  background: ${({$bgColor}) => $bgColor};
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
      {
        CardType.Art === data.cardType? (
          <StyledRhombus $bgColor={bgColor}>
            <StyledSpan>{data.name}</StyledSpan>
          </StyledRhombus>
        ):
        CardType.Group === data.cardType? (
          <StyledSquare $bgColor={bgColor}>
            <StyledSpan>{data.name}</StyledSpan>
          </StyledSquare>
        ):
        CardType.Unit === data.cardType? (
          <StyledCircle $bgColor={bgColor}>
            <StyledSpan>{data.name}</StyledSpan>
          </StyledCircle>
        ):
        null
      }
    </StyledCard>
  )
}

export default Card
