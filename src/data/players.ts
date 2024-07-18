export interface IPlayer {
  id: string
  name: string
  canBuild: boolean
  canMove: boolean
  // value: number
}

export const commonId = "0"

export const playerList: IPlayer[] = [
  {
    id: "1",
    name: 'Anna',
    // value: 0,
    canBuild: true,
    canMove: true,
  },
  {
    id: "2",
    name: 'Beth',
    // value: 0,
    canBuild: true,
    canMove: true,
  },
  {
    id: "3",
    name: 'Ciri',
    // value: 0,
    canBuild: true,
    canMove: true,
  },
  {
    id: "4",
    name: 'Dana',
    // value: 0,
    canBuild: true,
    canMove: true,
  },
]

export const getPlayers = (n: number) => playerList.slice(0, n)
