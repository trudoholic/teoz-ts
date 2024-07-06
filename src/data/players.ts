export interface IPlayer {
  id: string
  name: string
  // pass: boolean
  // value: number
}

export const commonId = "0"

export const playerList: IPlayer[] = [
  {
    id: "1",
    name: 'Anna',
    // value: 0,
    // pass: false
  },
  {
    id: "2",
    name: 'Beth',
    // value: 0,
    // pass: false
  },
  {
    id: "3",
    name: 'Ciri',
    // value: 0,
    // pass: false
  },
  {
    id: "4",
    name: 'Dana',
    // value: 0,
    // pass: false
  },
]

export const getPlayers = (n: number) => playerList.slice(0, n)
