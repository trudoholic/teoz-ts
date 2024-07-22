import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

import {cardData, CardType, dealCards, ICard} from "../data/cards"
import {GameState, Phase} from "../data/game"
import {commonId, getPlayers} from "../data/players"
import {tierZones, Zone} from "../data/zones"

const nDeal = 5
const nDraw = 1

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    curHand,
    curTurn,
    gameState,
    idActive,
    nPlayers,
    phase,
    players,
    ply,
  } = state as IState

  const curPlayer = players.at(curTurn)

  const isCurPlayer = (idPlayer: string): boolean => {
    return idPlayer === curPlayer.id
  }

  const round = Math.floor(ply / nPlayers)

  const beginGame = (numPlayers: number) => {
    dispatch({type: Actions.SetGameState, payload: GameState.Begin})
    dispatch({type: Actions.SetPlayers, payload: getPlayers(numPlayers)})
    dispatch({type: Actions.SetPly, payload: 0})

    const eldestHand = Math.floor(Math.random() * numPlayers)
    dispatch({type: Actions.SetCurHand, payload: eldestHand})
    dispatch({type: Actions.SetCards, payload: dealCards(nDeal, numPlayers, eldestHand)})
  }

  const startGame = () => {
    dispatch({type: Actions.SetGameState, payload: GameState.Main})
    beginHand(curHand)
  }

  const endGame = () => {
    endHand()
    dispatch({type: Actions.SetGameState, payload: GameState.End})
  }

  const newGame = () => {
    dispatch({type: Actions.SetPlayers, payload: []})
    dispatch({type: Actions.SetGameState, payload: GameState.Over})
  }

  const zoneCards = (idZone: string, idPlayer: string = commonId) => {
    return cards.filter(card => card.idZone === idZone && card.idPlayer === idPlayer)
  }

  const mustDiscard = () => {
    const limDiscard = 5, length = zoneCards(Zone.Hand, curPlayer.id).length
    return length > limDiscard? length - limDiscard: 0
  }

  const beginHand = (hand: number) => {
    dispatch({type: Actions.SetPhase, payload: Phase.Main})
    dispatch({type: Actions.SetPly, payload: ply + 1})
    console.group(`Hand: ${hand}`)
    dispatch({type: Actions.SetCurHand, payload: hand})
    const handId = players.at(hand).id

    if (round) {
      const drawIds = zoneCards(Zone.DrawPile).slice(0, nDraw).map(card => card.id)
      if (drawIds.length) {
        dispatch({type: Actions.SetCards, payload: cards.map(
            card => drawIds.includes(card.id)? {
              ...card,
              idPlayer: handId,
              idZone: Zone.Hand,
            }: card
          )})
      }
      else {
        console.log("Deck is Empty!")
      }
    }

    const winner = getPyramid(handId).lvl === 10
    dispatch({type: Actions.SetPlayer, payload: {id: handId, winner}})
  }

  const endHand = () => {
    const playerId = players.at(curHand).id
    dispatch({type: Actions.SetPlayer, payload: {
      id: playerId,
      canBuild: true,
      canMove: true,
    }})
    console.groupEnd()
  }

  const nextHand = () => {
    endHand()
    const newHand = (curHand + 1) % nPlayers
    beginHand(newHand)
  }

  const pass = () => {
    if (mustDiscard()) {
      dispatch({type: Actions.SetPhase, payload: Phase.End})
    }
    else {
      nextHand()
    }
  }

  // const formatId = (n: number) => `00${n + 1}`.slice(-3)
  const activeCard = () => cards.find(card => idActive === card.id)

  const isActive = (id: number) => { return idActive === id }

  const setIdActive = (id: number = -1) => {
    dispatch({type: Actions.SetIdActive, payload: id})
  }

  const getPyramid = (idPlayer: string) => {
    const filteredCards = (tier: number) => zoneCards(tierZones.at(tier).id, idPlayer)

    const tiers = [
      filteredCards(0),
      filteredCards(1),
      filteredCards(2),
      filteredCards(3),
    ]

    const SIZE = tiers.length
    const getSize = (i: number) => Math.min((SIZE - i), i? tiers.at(i - 1).length: SIZE)
    const sizes = tiers.map((_, i) => getSize(i))

    const getStatus = (i: number) => +(tiers.at(i).length < sizes.at(i)? -1: tiers.at(i).length > sizes.at(i)? 1: 0)
    const statuses = tiers.map((_, i) => getStatus(i))

    const getTierStatus = (i: number, id: string) => GameState.Main === gameState && isCurPlayer(id)? getStatus(i): 0

    const hasSuit = (i: number) => {
      const suit = cardData(idActive)?.suit ?? ""
      return  tiers.at(i).some(card => cardData(card.id).suit === suit)
    }

    return {
      getTierStatus,
      hasSuit,
      statuses,
      tiers,
      atk: tiers.map(t => t.length).filter(t => !!t).length,
      def: tiers.at(0)?.length,
      lvl: tiers.reduce((acc, t) => acc + t.length, 0),
      status: statuses.some(s => s > 0),
    }
  }

  const moveCard = (idZone: string, idPlayer: string = commonId) => {
    const newCards = cards.map(card => isActive(card.id)? {
      ...card,
      idPlayer: idPlayer,
      idZone: idZone,
    }: card)
    dispatch({type: Actions.SetCards, payload: newCards})
    dispatch({type: Actions.SetIdActive, payload: -1})
  }

  // const drawCard = () => {
  // }

  const dropCard = () => {
    moveCard(Zone.DiscardPile)
  }

  const playArtifact = () => {
    moveCard(Zone.Keep, curPlayer.id)
  }

  const playTier = (tier: number) => {
    const playerId = curPlayer.id
    moveCard(tierZones.at(tier).id, playerId)
    dispatch({type: Actions.SetPlayer, payload: {
      id: playerId,
      canBuild: false,
    }})
  }

  const tierDown = () => {
    const activeCard = cards.find(card => isActive(card.id))
    if (activeCard) {
      const tier = tierZones.findIndex(zone => zone.id === activeCard.idZone)
      if (tier > 0) {
        moveCard(tierZones.at(tier - 1).id, curPlayer.id)
      }
    }
  }

  const canBuildGroup = (card: ICard): boolean => {
    const data = cardData(card.id)
    return Phase.Main === phase && curPlayer.canBuild &&
      data.cardType === CardType.Group && card.idZone === Zone.Hand
  }

  const canMoveGroup = (card: ICard): boolean => {
    return Phase.Main === phase && curPlayer.canMove &&
      cardData(card.id).cardType === CardType.Group &&
      tierZones.map(zone => zone.id).includes(card.idZone)
  }

  const canDiscard = (card: ICard): boolean => {
    return Phase.End === phase && card.idZone === Zone.Hand
  }

  const canPlayArtifact = (card: ICard): boolean => {
    const data = cardData(card.id)
    const pyramid = getPyramid(curPlayer.id)
    return Phase.Main === phase && card.idZone === Zone.Hand &&
      data.cardType === CardType.Art && data.lvl <= pyramid.lvl
  }

  const artBonus = (idPlayer: string) => {
    return cards.filter(card => (
      card.idPlayer === idPlayer && card.idZone === Zone.Keep && cardData(card.id).cardType === CardType.Art
    )).reduce((acc, card) => ({
      atk: acc.atk + cardData(card.id).atk,
      def: acc.def + cardData(card.id).def,
    }), {atk: 0, def: 0})
  }

  const isValidCard = (card: ICard): boolean => {
    if (GameState.Main === gameState && isCurPlayer(card.idPlayer)) {
      return canBuildGroup(card) || canMoveGroup(card) || canDiscard(card) || canPlayArtifact(card)
    }
    else {
      return false
    }
  }

  return {
    cards,
    curHand,
    curPlayer,
    curTurn,
    gameState,
    idActive,
    nPlayers,
    phase,
    players,
    ply,
    round,

    activeCard,
    artBonus,
    beginGame,
    canBuildGroup,
    canDiscard,
    canPlayArtifact,
    cardData,
    dropCard,
    endGame,
    getPyramid,
    isActive,
    isCurPlayer,
    isValidCard,
    mustDiscard,
    newGame,
    nextHand,
    pass,
    playArtifact,
    playTier,
    setIdActive,
    startGame,
    tierDown,
    zoneCards,
  }
}

export default useGame
