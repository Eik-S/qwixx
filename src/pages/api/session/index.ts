import { NextApiRequest, NextApiResponse } from 'next'
import { createSession } from '../../../services/session-storage'

interface ResponseData {
  sessionId: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end()
    return
  }

  try {
    const sessionId = createSession()
    res.status(200).json({ sessionId })
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
