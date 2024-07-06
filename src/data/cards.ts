import {commonId} from "./players";
import {Zone} from "./zones";

export interface ICard  {
  id: string
  idPlayer: string
  idZone: string
}

// export const cardList = [
//   { id: "1" },
//   { id: "2" },
//   { id: "3" },
//   { id: "4" },
//   { id: "5" },
// ]

export const cardList = [...Array(100).keys()]
  .map(i => ({ id: `${i + 1}` }))

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

const getCards = (): ICard[] => shuffle(cardList.length, true)
  .map((n) => ({
    id: cardList.at(n).id,
    idPlayer: commonId,
    idZone: Zone.DrawPile,
  }))

export const dealCards = (
  nCards: number,
  nPlayers: number,
  eldestHand: number = 0
): ICard[] => getCards()
  .map((card, i) => (i < nCards * nPlayers ? {
    ...card,
    idPlayer: `${((eldestHand + i) % nPlayers) + 1}`,
    idZone: Zone.Hand,
  } : card))
