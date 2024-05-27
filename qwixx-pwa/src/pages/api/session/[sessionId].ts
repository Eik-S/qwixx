import { NextApiRequest, NextApiResponse } from 'next'
import { PassThrough } from 'stream'
import { SessionInfo } from '../../../models/session-elements'
import { getSessionInfo, joinSession } from '../../../services/session-storage'

interface SessionApiRequest extends NextApiRequest {
  body: {
    name: string | undefined
  }
}

export default function handler(
  req: SessionApiRequest,
  res: NextApiResponse<SessionInfo | PassThrough>,
) {
  const { sessionId } = req.query
  if (!isValidSessionId(sessionId)) {
    res.status(400).end()
    return
  }

  // get session info
  if (req.method === 'GET') {
    try {
      const sessionInfo = getSessionInfo(sessionId)
      res.status(200).json(sessionInfo)
      return
    } catch (error: any) {
      if (error.message === 'Session not found') {
        console.log(`Session ${sessionId} not found`)
        res.status(404).end()
        return
      }
      console.log(error)
      res.status(500).end()
      return
    }
  }

  // join session
  if (req.method === 'POST') {
    const { name } = req.body
    if (name === undefined) {
      res.status(400).end()
      return
    }
    try {
      const stream = joinSession(sessionId, name)
      res.status(200).send(stream)
      return
    } catch (error: any) {
      if (error.message === 'Session not found') {
        console.log(`Session ${sessionId} not found`)
        res.status(404).end()
        return
      }
      console.log(error)
      res.status(500).end()
      return
    }
  }

  res.statusCode = 405
  res.end()
}

function isValidSessionId(sessionId: string | string[] | undefined): sessionId is string {
  if (typeof sessionId === 'undefined' || Array.isArray(sessionId)) {
    return false
  }
  if (!sessionId.match(/^[a-z]+-[a-z]+-[a-z]+$/)) {
    return false
  }
  return true
}
