import useAppContext from "../context/useAppContext"
import {Actions } from "../context/reducer"
import {IState } from "../context/state"

import {dealCards} from "../data/cards"
import {commonId, getPlayers} from "../data/players"
import {tierZones, Zone} from "../data/zones"

const useGame = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    curHand,
    idActive,
    isGameOver,
    nPlayers,
    players,
  } = state as IState

  const beginGame = (n: number) => {
    const eldestHand = Math.floor(Math.random() * n)
    dispatch({type: Actions.SetCards, payload: dealCards(3, n, eldestHand)})
    dispatch({type: Actions.SetCurHand, payload: eldestHand})
    dispatch({type: Actions.SetGameOver, payload: false})
    dispatch({type: Actions.SetPlayers, payload: getPlayers(n)})
  }

  const endGame = () => {
    dispatch({type: Actions.SetGameOver, payload: true})
  }

  const newGame = () => {
    dispatch({type: Actions.SetPlayers, payload: []})
  }

  const nextHand = () => {
    dispatch({type: Actions.SetCurHand, payload: (curHand + 1) % nPlayers})
  }

  const setIdActive = (id: string) => {
    dispatch({type: Actions.SetIdActive, payload: id})
  }

  const getPyramid = (idPlayer: string) => {
    const filteredCards = (tier: number) => cards.filter(card => (
      card.idZone === tierZones.at(tier).id && card.idPlayer === idPlayer
    ))

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
    const newCards = [...cards.filter(card => card.id !== idActive),
      {
        id: idActive,
        idPlayer: idPlayer,
        idZone: idZone,
      }
    ]
    dispatch({type: Actions.SetCards, payload: newCards})
    dispatch({type: Actions.SetIdActive, payload: ""})
  }

  const dropCard = () => {
    moveCard(Zone.DiscardPile)
  }

  const curPlayer = () => { return  players.at(curHand) }

  const playTier = (tier: number) => {
    moveCard(tierZones.at(tier).id, players.at(curHand).id)
  }

  const tierDown = () => {
    const card = cards.find(card => card.id === idActive)
    const tier = tierZones.findIndex(zone => zone.id === card.idZone)
    if (tier > 0) {
      moveCard(tierZones.at(tier - 1).id, players.at(curHand).id)
    }
  }

  return {
    cards,
    curHand,
    idActive,
    isGameOver,
    nPlayers,
    players,

    beginGame,
    endGame,
    newGame,
    curPlayer,
    nextHand,
    dropCard,
    setIdActive,
    getPyramid,
    playTier,
    tierDown,
  }
}

export default useGame
