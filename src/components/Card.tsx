import styled from "styled-components"
import {yellow, grey, lime, orange} from "../styles/colors"
import useGame from "../hooks/useGame"
import {cardColor, cardData, ICard} from "../data/cards"

interface ICardProps {
  $bColor: string;
  $active: boolean;
  $target: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  background: ${({$bColor}) => $bColor};
  border: ${
    ({$disabled, $active, $target}) => $active ? (
      `${3}px solid ${lime[300]}`
    ) : $target ? (
      `${3}px solid ${orange[300]}`
    ) : $disabled ? (
      `${1}px solid ${grey[500]}`
    ) : (
      `${1}px solid ${yellow[100]}`
    )
  };
  box-sizing: border-box;
  color: ${({$disabled}) => $disabled ? grey[500]: yellow[100]};
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
    isActive,
    isValidCard,
    setIdActive,
  } = useGame()

  const bColor = cardColor(id)
  const data = cardData(id)

  const cardDisabled = !isValidCard(card)
  const cardTarget = false

  return (
    <StyledCard
      $bColor={bColor}
      $active={isActive(id)}
      $target={cardTarget}
      $disabled={cardDisabled}
      {...(!cardDisabled && { "onClick": () => setIdActive(id) })}
    >
      <FlexRow $paddingX={0}>
        <span>{data.name}</span>
      </FlexRow>
    </StyledCard>
  )
}

export default Card
