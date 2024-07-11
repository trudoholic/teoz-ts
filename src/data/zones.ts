export interface IZone {
  id: string
  idPlayer?: string
}

export const Zone = {
  DiscardPile: "Discard Pile",
  DrawPile: "Draw Pile",
  Hand: "Hand",
  Keep: "Keep",
  Tier0: "Tier0",
  Tier1: "Tier1",
  Tier2: "Tier2",
  Tier3: "Tier3",
} as const

export const commonZones: IZone[] = [
  { id: Zone.DiscardPile },
  { id: Zone.DrawPile },
]

export const playerZones: IZone[] = [
  { id: Zone.Hand },
  { id: Zone.Keep },
]

export const tierZones: IZone[] = [
  { id: Zone.Tier0 },
  { id: Zone.Tier1 },
  { id: Zone.Tier2 },
  { id: Zone.Tier3 },
]
