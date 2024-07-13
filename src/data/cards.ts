import {commonId} from "./players";
import {Zone} from "./zones";
import {blue, brown, green, purple, red} from "../styles/colors"

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

const Suit = {
  Amber: "Amber",
  Blue: "Blue",
  Green: "Green",
  Red: "Red",
  Wild: "Wild",
} as const

const cardList: ICardData[] = [
  { cardType: CardType.Art, name: "A1" },
  { cardType: CardType.Art, name: "A2" },
  { cardType: CardType.Art, name: "A3" },
  { cardType: CardType.Group, suit: Suit.Amber, name: "GA" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "GB" },
  { cardType: CardType.Group, suit: Suit.Green, name: "GG" },
  { cardType: CardType.Group, suit: Suit.Red, name: "GR" },
  { cardType: CardType.Unit, suit: Suit.Amber, name: "UA" },
  { cardType: CardType.Unit, suit: Suit.Blue, name: "UB" },
  { cardType: CardType.Unit, suit: Suit.Green, name: "UG" },
  { cardType: CardType.Unit, suit: Suit.Red, name: "UR" },
] as const

export const cardData = (i: number) => cardList.at(i) as const
export const cardColor = (i: number) => {
  const data = cardData(i)
  return CardType.Group === data.cardType? (
    {
      [Suit.Amber]: brown[900],
      [Suit.Blue]: blue[900],
      [Suit.Green]: green[900],
      [Suit.Red]: red[900],
    }[data.suit]
  ) : CardType.Unit === data.cardType? (
    {
      [Suit.Amber]: brown[700],
      [Suit.Blue]: blue[700],
      [Suit.Green]: green[700],
      [Suit.Red]: red[700],
    }[data.suit]
  ) : (
    {
      [CardType.Art]: purple[700],
    }[data.cardType]
  ) as string
}

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
