export interface IZone {
  id: string
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

// export const zones: IZone[] = [
//   { id: Zone.Hand },
//   { id: Zone.Keep },
// ]
