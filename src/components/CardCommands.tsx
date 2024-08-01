import useGame from "../hooks/useGame"
import TierButtons from "./TierButtons";

const CardCommands = () => {
  const {
    activeCard,
    canBuildGroup,
    canDiscard,
    canFix,
    canMoveGroup,
    canPlayArtifact,
    dropCard,
    setId,
    playArtifact,
  } = useGame()

  const card = activeCard()

  return (
    <>

      <button onClick={() => setId()}>
        Undo
      </button>

      {
        canBuildGroup(card) || canMoveGroup(card) || canFix(card) ? <TierButtons/>: null
      }

      {
        canDiscard(card) ? (
          <button onClick={dropCard}>
            Discard
          </button>
        ): null
      }

      {
        canPlayArtifact(card) ? (
          <button onClick={playArtifact}>
            Play
          </button>
        ): null
      }

    </>
  )
}

export default CardCommands
