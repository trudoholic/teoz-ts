export interface IZone {
  id: string
  common: boolean
}

export const Zone = {
  DiscardPile: "Discard Pile",
  DrawPile: "Draw Pile",
  Hand: "Hand",
  Keep: "Keep",
} as const

export const zones: IZone[] = [
  { id: Zone.DiscardPile, common: true },
  { id: Zone.DrawPile, common: true },
  { id: Zone.Hand, common: false },
  { id: Zone.Keep, common: false },
]
