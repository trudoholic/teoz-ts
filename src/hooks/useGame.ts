import useAppContext from "../context/useAppContext"
import {Actions } from "../context/reducer"
import {IState } from "../context/state"

import {dealCards} from "../data/cards"
import {commonId, getPlayers} from "../data/players"
import {Zone} from "../data/zones"

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

  const dropCard = () => {
    const newCards = [...cards.filter(card => card.id !== idActive),
      {
        id: idActive,
        idPlayer: commonId,
        idZone: Zone.DiscardPile,
      }
    ]
    dispatch({type: Actions.SetCards, payload: newCards})
    dispatch({type: Actions.SetIdActive, payload: ""})
  }

  const setIdActive = (id: string) => {
    dispatch({type: Actions.SetIdActive, payload: id})
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
    nextHand,
    dropCard,
    setIdActive,
  }
}

export default useGame
