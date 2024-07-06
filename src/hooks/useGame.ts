import useAppContext from "../context/useAppContext"
import { Actions } from "../context/reducer"
import { IState } from "../context/state"

import { cardList, ICard } from "../data/cards"
import { commonId, playerList } from "../data/players"
import { Zone } from "../data/zones"

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

  const getPlayers = (n: number) => playerList.slice(0, n)

  const shuffle = (n: number, debug = false) => {
    const src = [...Array(n).keys()]
    if (debug) return src

    const result: number[] = []
    while (src.length) {
      const rnd = Math.floor(Math.random() * src.length)
      result.push(src.splice(rnd, 1)[0])
    }
    return result
  }

  const getCards = (): ICard[] => shuffle(cardList.length)
    .map((i) => ({
      id: cardList.at(i).id,
      idPlayer: commonId,
      idZone: Zone.DrawPile,
    }))

  const beginGame = (n: number) => {
    dispatch({type: Actions.SetCards, payload: getCards()})
    dispatch({type: Actions.SetCurHand, payload: Math.floor(Math.random() * n)})
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

  const moveCard = () => {
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
    moveCard,
    setIdActive,
  }
}

export default useGame
