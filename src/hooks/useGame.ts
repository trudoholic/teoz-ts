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
    idTarget,
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

  const zoneCards = (idZone: string, idPlayer: string = commonId, srcCards: ICard[] = cards) => {
    return srcCards.filter(card => card.idZone === idZone && card.idPlayer === idPlayer)
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
  const targetCard = () => cards.find(card => idTarget === card.id)

  const isActive = (id: number) => { return idActive === id }
  const isTarget = (id: number) => { return idTarget === id }

  const setId = (id: number = -1) => {
    if (Phase.Main === phase) {
      dispatch({type: Actions.SetIdActive, payload: id})
      if (cardData(id)?.cardType === CardType.Unit) {
        dispatch({type: Actions.SetPhase, payload: Phase.Target})
      }
    }
    else if (Phase.Target === phase) {
      dispatch({type: Actions.SetIdTarget, payload: id})
    }
    else if (Phase.End === phase || Phase.Fix === phase) {
      dispatch({type: Actions.SetIdActive, payload: id})
    }
  }

  const getPyramid = (idPlayer: string, srcCards: ICard[] = cards) => {
    const filteredCards = (tier: number) => zoneCards(tierZones.at(tier).id, idPlayer, srcCards)

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
    const needsFixed = statuses.some(status => status > 0)

    const getTierStatus = (i: number, id: string) => GameState.Main === gameState && isCurPlayer(id)? getStatus(i): 0

    const hasSuit = (i: number) => {
      const suit = cardData(idActive)?.suit ?? ""
      return  tiers.at(i).some(card => cardData(card.id).suit === suit)
    }

    return {
      getTierStatus,
      hasSuit,
      needsFixed,
      statuses,
      tiers,
      atk: tiers.map(t => t.length).filter(t => !!t).length,
      def: tiers.at(0)?.length,
      lvl: tiers.reduce((acc, t) => acc + t.length, 0),
      status: statuses.some(s => s > 0),
    }
  }

  const moveId = (
    oldCards: ICard[],
    id: number,
    idZone: string,
    idPlayer: string = commonId
  ): ICard[] => {
    const newCards = [...oldCards]
    const [card] = newCards.splice(newCards.findIndex(c => c.id === id), 1)
    newCards.push({...card, idZone: idZone, idPlayer: idPlayer})
    return newCards
  }

  const setCards = (newCards: ICard[]) => {
    dispatch({type: Actions.SetCards, payload: newCards})
    dispatch({type: Actions.SetIdTarget, payload: -1})
    dispatch({type: Actions.SetIdActive, payload: -1})
  }

  const sameShape = () => {
    const dataActive = cardData(idActive)
    const dataTarget = cardData(idTarget)
    return dataActive.suit === dataTarget.suit
  }

  const attack = () => {
    let newCards = [...cards]
    if (sameShape()) {
      newCards = moveId(newCards, idTarget, Zone.Hand, curPlayer.id)
    } else {
      newCards = moveId(newCards, idTarget, Zone.DiscardPile)
    }
    newCards = moveId(newCards, idActive, Zone.DiscardPile)
    setCards(newCards)

    const targetPlayer = players.find(player => player.id === targetCard().idPlayer)
    const targetPyramid = getPyramid(targetPlayer.id, newCards)

    if (targetPyramid.needsFixed) {
      dispatch({type: Actions.SetPhase, payload: Phase.Fix})
      dispatch({type: Actions.SetCurTurn, payload: targetPlayer.idx})
    } else {
      dispatch({type: Actions.SetPhase, payload: Phase.Main})
    }
  }

  const onFixed = () => {
    dispatch({type: Actions.SetPhase, payload: Phase.Main})
    dispatch({type: Actions.SetCurTurn, payload: curHand})
  }

  // const drawCard = () => {
  // }

  const dropCard = () => {
    const newCards = moveId(cards, idActive, Zone.DiscardPile)
    setCards(newCards)
  }

  const playArtifact = () => {
    const newCards = moveId(cards, idActive, Zone.Keep, curPlayer.id)
    setCards(newCards)
  }

  const playTier = (tier: number) => {
    const playerId = curPlayer.id
    const newCards = moveId(cards, idActive, tierZones.at(tier).id, playerId)
    setCards(newCards)
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
        const newCards = moveId(cards, idActive, tierZones.at(tier - 1).id, curPlayer.id)
        setCards(newCards)
      }
    }
  }

  const canAttack = (card: ICard): boolean => {
    const data = cardData(card.id)
    return Phase.Target === phase && tierZones.map(zone => zone.id).includes(card.idZone) &&
      data.cardType === CardType.Group
  }

  const canFix = (card: ICard): boolean => {
    const data = cardData(card.id)
    return Phase.Fix === phase && tierZones.map(zone => zone.id).includes(card.idZone) &&
      data.cardType === CardType.Group
  }

  const canTarget = (card: ICard): boolean => {
    const data = cardData(card.id)
    const pyramid = getPyramid(curPlayer.id)
    return Phase.Main === phase && card.idZone === Zone.Hand &&
      data.cardType === CardType.Unit && data.lvl <= pyramid.lvl
  }

  const canBuildGroup = (card: ICard): boolean => {
    const data = cardData(card.id)
    return Phase.Main === phase && curPlayer.canBuild &&
      data.cardType === CardType.Group && card.idZone === Zone.Hand
  }

  const canDiscard = (card: ICard): boolean => {
    return Phase.End === phase && card.idZone === Zone.Hand
  }

  const canMoveGroup = (card: ICard): boolean => {
    return Phase.Main === phase && curPlayer.canMove &&
      cardData(card.id).cardType === CardType.Group &&
      tierZones.map(zone => zone.id).includes(card.idZone)
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
      return (
        canBuildGroup(card) ||
        canDiscard(card) ||
        canFix(card) ||
        canMoveGroup(card) ||
        canPlayArtifact(card) ||
        canTarget(card)
      )
    }
    else if (GameState.Main === gameState && !isCurPlayer(card.idPlayer)) {
      return (
        canAttack(card)
      )
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
    idTarget,
    nPlayers,
    phase,
    players,
    ply,
    round,

    activeCard,
    artBonus,
    attack,
    beginGame,
    canAttack,
    canTarget,
    canBuildGroup,
    canDiscard,
    canPlayArtifact,
    cardData,
    dropCard,
    endGame,
    getPyramid,
    isActive,
    isTarget,
    isCurPlayer,
    isValidCard,
    mustDiscard,
    newGame,
    nextHand,
    onFixed,
    pass,
    playArtifact,
    playTier,
    setId,
    startGame,
    targetCard,
    tierDown,
    zoneCards,
  }
}

export default useGame
