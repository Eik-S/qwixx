export type LineColor = 'r' | 'y' | 'g' | 'b'

export interface Field {
  value: number
  status: 'filled' | 'disabled' | 'selected' | 'open'
}

export interface Line {
  color: LineColor
  fields: Field[]
  status: 'open' | 'closed'
  wasClosedByYou: boolean
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

interface GameBaseData {
  state: 'lobby' | 'playing' | 'finished'
  players: Player[]
}

export interface GameLobbyData extends GameBaseData {
  state: 'lobby'
}

export interface GamePlayingData extends GameBaseData {
  state: 'playing'
  movingPlayerId: string
}

export interface GameFinishedData extends GameBaseData {
  state: 'finished'
  winnerPlayerId: string
  nextMovingPlayerId: string
}

export type GameData = GameLobbyData | GamePlayingData | GameFinishedData
