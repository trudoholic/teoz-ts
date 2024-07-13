import {commonId} from "./players";
import {Zone} from "./zones";

export interface ICardData  {
  cardType: string
  atk?: number
  def?: number
  lvl?: number
  name: string
  suit?: string
  rank?: string
}

export interface ICard  {
  id: number
  idPlayer: string
  idZone: string
}

const CardType = {
  Art: "Art",
  Group: "Group",
  Unit: "Unit",
} as const

const cardList: ICardData[] = [
  { cardType: CardType.Art, name: "Art #1" },
  { cardType: CardType.Art, name: "Art #2" },
  { cardType: CardType.Art, name: "Art #3" },
  { cardType: CardType.Group, name: "Group #1" },
  { cardType: CardType.Group, name: "Group #2" },
  { cardType: CardType.Group, name: "Group #3" },
  { cardType: CardType.Unit, name: "Unit #1" },
  { cardType: CardType.Unit, name: "Unit #2" },
  { cardType: CardType.Unit, name: "Unit #3" },
] as const

export const cardData = (i: number) => cardList.at(i) as const

const shuffle = (debug = false) => {
  const src = [...cardList.keys()]
  if (debug) return src

  const result: number[] = []
  while (src.length) {
    const rnd = Math.floor(Math.random() * src.length)
    result.push(src.splice(rnd, 1)[0])
  }
  return result
}

const getCards = (): ICard[] => shuffle(true)
  .map((n) => ({
    id: n,
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
