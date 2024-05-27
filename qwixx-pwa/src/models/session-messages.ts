import { GameFinishedData, GamePlayingData } from './game'

interface SessionMessageBase {
  type: 'join' | 'leave' | 'start' | 'move' | 'end' | 'reset'
}

interface JoinMessage extends SessionMessageBase {
  type: 'join'
  players: string[]
}

interface LeaveMessage extends SessionMessageBase {
  type: 'leave'
  players: string[]
}

interface StartMessage extends SessionMessageBase {
  type: 'start'
  gameData: GamePlayingData
}

interface MoveMessage extends SessionMessageBase {
  type: 'move'
  gameData: GamePlayingData
}

interface EndMessage extends SessionMessageBase {
  type: 'end'
  gameResults: GameFinishedData
}

interface ResetMessage extends SessionMessageBase {
  type: 'reset'
  gameData: GamePlayingData
}

export type SessionMessage =
  | JoinMessage
  | LeaveMessage
  | StartMessage
  | MoveMessage
  | EndMessage
  | ResetMessage
