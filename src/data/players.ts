export interface IPlayer {
  id: string
  idx: number
  name: string
  canBuild: boolean
  canMove: boolean
  winner: boolean
}

export const commonId = "0"

const playerNames = ["Anna", "Beth", "Ciri", "Dana"]

const playerList: IPlayer[] = playerNames.map((name, idx) => ({
  id: `${idx + 1}`,
  idx,
  name,
  canBuild: true,
  canMove: true,
  winner: false,
}))

export const getPlayers = (n: number) => playerList.slice(0, n)
