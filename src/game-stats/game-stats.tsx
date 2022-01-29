import { useEffect, useState } from 'react'
import { GameBoardContent, Line } from '../game-board/game-board'
import './game-stats.scss'

interface Score {
  red: number
  yellow: number
  green: number
  blue: number
}

export interface GameStatProps {
  strikes: number
  content: GameBoardContent
  hasContentChanged: boolean
}

export function GameStats({ strikes, content, hasContentChanged }: GameStatProps) {
  const [score, setScore] = useState<Score>({
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0,
  })
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    const pointsBySelections = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78]

    function getScoreForLine(line: Line) {
      const filledFields = line.fields.filter((field) => field.isFilled)
      return pointsBySelections[filledFields.length + (line.wasClosedByYou ? 1 : 0)]
    }

    setScore({
      red: getScoreForLine(content.lines[0]),
      yellow: getScoreForLine(content.lines[1]),
      green: getScoreForLine(content.lines[2]),
      blue: getScoreForLine(content.lines[3]),
    })
  }, [content, hasContentChanged])

  useEffect(() => {
    const totalLineScore = Object.values(score).reduce((prev, curr) => prev + curr)
    setTotalScore(totalLineScore - strikes * 5)
  }, [score, strikes])

  return (
    <div className="game-stats-area">
      <div>
        <h3 className="stat-label">score</h3>
        <p>{totalScore}</p>
      </div>
      <div>
        <h3 className="stat-label">strikes</h3>
        <div className="strikes">
          {[...Array(4)].map((e, i) => {
            if (i >= strikes) {
              return <span key={i}>{String.fromCharCode(0x2610)}</span>
            } else {
              return <span key={i}>{String.fromCharCode(0x2612)}</span>
            }
          })}
        </div>
      </div>
    </div>
  )
}
