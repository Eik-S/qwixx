import { randomUUID } from 'crypto'
import humanId from 'human-id'
import { PassThrough } from 'stream'
import { LineColor, Field } from '../models/game'
import { Player } from '../models/game'
import { Session, SessionInfo } from '../models/session-elements'
import { SessionMessage } from '../models/session-messages'

let sessions: Session[] = []

export function createSession(): string {
  const sessionId = getHumanReadableId()
  const creationDate = Date.now()
  const stream = new PassThrough()

  sessions.push({
    creationDate,
    id: sessionId,
    stream,
    gameData: {
      state: 'lobby',
      players: [],
      moveTime: 'infinite',
    },
  })

  return sessionId
}

export function joinSession(id: string, name: string): PassThrough {
  const session = sessions.find((session) => session.id === id)
  if (session === undefined) {
    throw new Error('Session not found')
  }
  session.gameData.players.push(initPlayer(name))
  sendJoinMessage(session)
  return session.stream
}

export function getSessionInfo(id: string): SessionInfo {
  const session = sessions.find((session) => session.id === id)
  if (session === undefined) {
    throw new Error('Session not found')
  }
  return {
    creationDate: session.creationDate,
    players: session.gameData.players.map((player) => player.name),
  }
}

export function removeOldSessions() {
  sessions = sessions.filter((session) => {
    // returns sessions younger than 24h
    return session.creationDate > Date.now() - 1000 * 60 * 60 * 24
  })
}

function initPlayer(name: string): Player {
  const playerId = randomUUID()
  return {
    id: playerId,
    name,
    state: 'moving',
    board: {
      lines: ['r', 'y', 'g', 'b'].map((lineColor) => {
        const color = lineColor as LineColor
        const order = lineColor.includes('r' || 'y') ? 'asc' : 'desc'
        return {
          color,
          fields: getLineFields(order),
          status: 'open',
          wasClosedByYou: false,
        }
      }),
      strikes: 0,
    },
  }
}

function getLineFields(order: 'asc' | 'desc'): Field[] {
  const fields: Field[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
    return {
      value,
      status: 'open',
    }
  })
  if (order === 'desc') {
    fields.reverse()
  }
  return fields
}

function getHumanReadableId(): string {
  return humanId({
    separator: '-',
    capitalize: false,
  })
}

function sendJoinMessage(session: Session): void {
  const message: SessionMessage = {
    type: 'join',
    players: session.gameData.players.map((player) => player.name),
  }
  session.stream.write(JSON.stringify(message))
}
