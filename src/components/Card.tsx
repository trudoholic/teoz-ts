import styled from "styled-components"
import {green, grey, lime, orange} from "../styles/colors"
import useGame from "../hooks/useGame"
import {ICard} from "../data/cards"

interface ICardProps {
  $active: boolean;
  $target: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  background: ${({$disabled}) => $disabled ? grey[700] : green[900]};
  border: ${
    ({$active, $target}) => $active ? (
      `${2}px solid ${lime[300]}`
    ) : $target ? (
      `${2}px solid ${orange[300]}`
    ) : (
      `${1}px solid ${grey[500]}`
    )
  };
  box-sizing: border-box;
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
  font-family: monospace, monospace;
  font-size: 1.6rem;
  margin: 0.2rem;
  padding: 0.2rem 0.5rem 0.4rem;
  width: 5rem;
  height: 3rem;
`

interface IFlexRowProps {
  $paddingX: number;
}

export const FlexRow = styled.div<IFlexRowProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  //justify-content: space-between;
  padding: ${({$paddingX}) => `0 ${$paddingX}px`};
`

const Card = (card: ICard) => {
  const {
    id,
  } = card

  const {
    formatId,
    isActive,
    isValidCard,
    setIdActive,
  } = useGame()

  const cardTarget = false
  const cardDisabled = !isValidCard(card)

  return (
    <StyledCard
      $active={isActive(id)}
      $target={cardTarget}
      $disabled={cardDisabled}
      {...(!cardDisabled && { "onClick": () => setIdActive(id) })}
    >
      <FlexRow $paddingX={0}>
        <span>{formatId(id)}</span>
      </FlexRow>
    </StyledCard>
  )
}

export default Card
