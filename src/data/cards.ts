import {commonId} from "./players";
import {Zone} from "./zones";
import {blue, brown, green, pink, red} from "../styles/colors"

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

export const size = {
  width: 5.4,
  height: 3.4,
  radius: 3,
  margin: 0.2,
} as const

export const CardType = {
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

  { cardType: CardType.Art, name: "1", atk: 1, def: 1, lvl: 1 },
  { cardType: CardType.Art, name: "2", atk: 2, def: 2, lvl: 2 },
  { cardType: CardType.Art, name: "3", atk: 3, def: 3, lvl: 3 },

  { cardType: CardType.Unit, suit: Suit.Amber, name: "1" },
  { cardType: CardType.Unit, suit: Suit.Blue, name: "2" },
  { cardType: CardType.Unit, suit: Suit.Green, name: "3" },
  { cardType: CardType.Unit, suit: Suit.Red, name: "4" },

  { cardType: CardType.Group, suit: Suit.Amber, name: "1" },
  { cardType: CardType.Group, suit: Suit.Amber, name: "2" },
  { cardType: CardType.Group, suit: Suit.Amber, name: "3" },
  { cardType: CardType.Group, suit: Suit.Amber, name: "4" },
  { cardType: CardType.Group, suit: Suit.Amber, name: "5" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "1" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "2" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "3" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "4" },
  { cardType: CardType.Group, suit: Suit.Blue, name: "5" },
  { cardType: CardType.Group, suit: Suit.Green, name: "1" },
  { cardType: CardType.Group, suit: Suit.Green, name: "2" },
  { cardType: CardType.Group, suit: Suit.Green, name: "3" },
  { cardType: CardType.Group, suit: Suit.Green, name: "4" },
  { cardType: CardType.Group, suit: Suit.Green, name: "5" },
  { cardType: CardType.Group, suit: Suit.Red, name: "1" },
  { cardType: CardType.Group, suit: Suit.Red, name: "2" },
  { cardType: CardType.Group, suit: Suit.Red, name: "3" },
  { cardType: CardType.Group, suit: Suit.Red, name: "4" },
  { cardType: CardType.Group, suit: Suit.Red, name: "5" },

] as const

export const cardData = (i: number) => cardList[i] as const

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
      [Suit.Amber]: brown[900],
      [Suit.Blue]: blue[900],
      [Suit.Green]: green[900],
      [Suit.Red]: red[900],
    }[data.suit]
  ) : (
    {
      [CardType.Art]: pink[900],
    }[data.cardType]
  ) as string
}

export const tableColor = '#044d1c'

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
