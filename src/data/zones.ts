export interface IZone {
  id: string
  idPlayer?: string
}

export const Zone = {
  DiscardPile: "Discard Pile",
  DrawPile: "Draw Pile",
  Hand: "Hand",
  Keep: "Keep",
} as const

export const commonZones: IZone[] = [
  { id: Zone.DiscardPile },
  { id: Zone.DrawPile },
]

export const playerZones: IZone[] = [
  { id: Zone.Hand },
  { id: Zone.Keep },
]
