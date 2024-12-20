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

export type FieldSelectionType = 'colored' | 'everyone' | 'both'

export interface FieldSelection {
  line: Line
  field: Field
  selectionType: FieldSelectionType
}

export interface Board {
  lines: Line[]
  strikes: number
}

export type PlayerState = 'moving' | 'done'
export interface Player {
  id: string
  name: string
  avatarCode: number
  board: Board
  state: PlayerState
  score: number
}

export type MoveTime = number | 'infinite'
interface GameBaseData {
  state: 'lobby' | 'playing' | 'finished'
  players: Player[]
  moveTime: MoveTime
}

export interface GameLobbyData extends GameBaseData {
  state: 'lobby'
}

export interface GamePlayingData extends GameBaseData {
  state: 'playing'
  movingPlayerId: string
  closedLineColors: string[]
}

export interface GameFinishedData extends GameBaseData {
  state: 'finished'
  winnerPlayerId: string
  nextMovingPlayerId: string
}

export type GameData = GameLobbyData | GamePlayingData | GameFinishedData
