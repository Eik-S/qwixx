import { PassThrough } from 'stream'
import { GameData } from './game'

export interface Session {
  id: string
  creationDate: number
  stream: PassThrough
  gameData: GameData
}

export interface SessionInfo {
  creationDate: number
  players: string[]
}
