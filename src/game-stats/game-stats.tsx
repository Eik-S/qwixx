/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Board, Line } from '../models/game'

interface Score {
  red: number
  yellow: number
  green: number
  blue: number
}

export interface GameStatProps {
  strikes: number
  board: Board
  hasBoardChanged: boolean
  narrowLayout: boolean
}

export function GameStats({ narrowLayout, strikes, board, hasBoardChanged }: GameStatProps) {
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
      const filledFields = line.fields.filter((field) => field.status === 'filled')
      return pointsBySelections[filledFields.length + (line.wasClosedByYou ? 1 : 0)]
    }

    setScore({
      red: getScoreForLine(board.lines[0]),
      yellow: getScoreForLine(board.lines[1]),
      green: getScoreForLine(board.lines[2]),
      blue: getScoreForLine(board.lines[3]),
    })
  }, [board, hasBoardChanged])

  useEffect(() => {
    const totalLineScore = Object.values(score).reduce((prev, curr) => prev + curr)
    setTotalScore(totalLineScore - strikes * 5)
  }, [score, strikes])

  return (
    <div css={styles.gameStatsArea(narrowLayout)}>
      <div>
        <h3 css={styles.statLabel}>score</h3>
        <p css={styles.statValue}>{totalScore}</p>
      </div>
      <div>
        <h3 css={styles.statLabel}>strikes</h3>
        <div css={styles.strikes}>
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

const styles = {
  gameStatsArea: (narrowLayout: boolean) => css`
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    text-align: center;
    align-content: space-between;

    ${narrowLayout &&
    css`
      grid-auto-flow: column;
      justify-content: left;
      justify-content: space-between;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    `}
  `,
  statLabel: css`
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
    width: 100px;
  `,
  statValue: css`
    font-size: 24px;
    margin: 0;
    font-weight: lighter;
  `,
  strikes: css`
    font-size: 28px;
    width: 100px;
    text-align: center;
    vertical-align: bottom;
  `,
}
