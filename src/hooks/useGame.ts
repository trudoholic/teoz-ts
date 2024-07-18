import useAppContext from "../context/useAppContext"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"

import {cardData, CardType, dealCards, ICard} from "../data/cards"
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
    idActive,
    isGameOver,
    nPlayers,
    players,
  } = state as IState

  const beginGame = (numPlayers: number) => {
    const eldestHand = Math.floor(Math.random() * numPlayers)
    dispatch({type: Actions.SetCards, payload: dealCards(nDeal, numPlayers, eldestHand)})
    dispatch({type: Actions.SetCurHand, payload: eldestHand})
    dispatch({type: Actions.SetGameOver, payload: false})
    dispatch({type: Actions.SetPlayers, payload: getPlayers(numPlayers)})
  }

  const endGame = () => {
    dispatch({type: Actions.SetGameOver, payload: true})
  }

  const newGame = () => {
    dispatch({type: Actions.SetPlayers, payload: []})
  }

  const zoneCards = (idZone: string, idPlayer: string = commonId) => {
    return cards.filter(card => card.idZone === idZone && card.idPlayer === idPlayer)
  }

  const mustDiscard = () => {
    const nDiscard = 5
    return zoneCards(Zone.Hand, curPlayer().id).length > nDiscard
  }

  const nextHand = () => {
    const playerId = players.at(curHand).id
    dispatch({type: Actions.SetPlayer, payload: {
      id: playerId,
      canBuild: true,
      canMove: true,
    }})

    const newHand = (curHand + 1) % nPlayers
    dispatch({type: Actions.SetCurHand, payload: newHand})

    const drawIds = zoneCards(Zone.DrawPile).slice(0, nDraw).map(card => card.id)
    if (drawIds.length) {
      dispatch({type: Actions.SetCards, payload: cards.map(
        card => drawIds.includes(card.id)? {
          ...card,
          idPlayer: players.at(newHand).id,
          idZone: Zone.Hand,
        }: card
      )})
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

    return {
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

  // const curPlayer = () => { return players.at(curHand) }
  const curPlayer = () => { return players.at(curTurn) }

  const playTier = (tier: number) => {
    const playerId = curPlayer().id
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
        moveCard(tierZones.at(tier - 1).id, curPlayer().id)
      }
    }
  }

  const isCurPlayer = (idPlayer: string): boolean => {
    return idPlayer === curPlayer().id
  }

  const isValidCard = (card: ICard): boolean => {
    const data = cardData(card.id)

    if (isCurPlayer(card.idPlayer)) {

      if (card.idZone === Zone.Hand) {

        if (data.cardType === CardType.Group) {
          return curPlayer().canBuild
        }
        else {
          return true
        }

      }
      if (card.idZone === Zone.Tier0) {

        if (data.cardType === CardType.Group) {
          return curPlayer().canMove
        }

      }
      else {
        return false
      }

    }
    else {
      return false
    }
  }

  return {
    cards,
    curHand,
    curTurn,
    idActive,
    isGameOver,
    nPlayers,
    players,

    activeCard,
    beginGame,
    cardData,
    curPlayer,
    dropCard,
    endGame,
    getPyramid,
    isActive,
    isCurPlayer,
    isValidCard,
    mustDiscard,
    newGame,
    nextHand,
    playTier,
    setIdActive,
    tierDown,
    zoneCards,
  }
}

export default useGame
