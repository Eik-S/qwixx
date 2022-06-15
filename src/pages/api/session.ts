import { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end()
    return
  }
  res.status(200).json({ name: 'John Doe' })
}
