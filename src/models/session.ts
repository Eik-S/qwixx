import { PassThrough } from 'stream'

export type LineColor = 'r' | 'y' | 'g' | 'b'

export interface Field {
  value: number
  status: 'filled' | 'disabled' | 'selected' | 'open'
}

export interface Line {
  color: LineColor
  fields: Field[]
  status: 'open' | 'closed'
}

export interface Board {
  lines: Line[]
  strikes: number
}

export interface Player {
  id: string
  name: string
  board: Board
}

export interface GameData {
  state: 'lobby' | 'running' | 'finished'
  players: Player[]
}

export interface Session {
  id: string
  creationDate: number
  stream: PassThrough
  gameData: GameData
}
