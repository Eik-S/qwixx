/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { Board, Line } from '../models/game'

export interface GameStatProps {
  board: Board
  narrowLayout: boolean
}

export function GameStats({ narrowLayout, board }: GameStatProps) {
  const [lineScores, setLineScores] = useState<number[]>([0, 0, 0, 0])
  const totalScore = lineScores.reduce((prev, curr) => prev + curr, 0)
  const selectionsMade = board.lines.reduce((previousValue, currentVal) => {
    const filledFields = currentVal.fields.filter((field) => field.status === 'filled')
    const numberOfFilledFields = filledFields.length
    return previousValue + numberOfFilledFields
  }, 0)

  useEffect(() => {
    const pointsBySelections = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78]

    function getScoreForLine(line: Line) {
      const filledFields = line.fields.filter((field) => field.status === 'filled')
      return pointsBySelections[filledFields.length + (line.wasClosedByYou ? 1 : 0)]
    }

    setLineScores([
      getScoreForLine(board.lines[0]),
      getScoreForLine(board.lines[1]),
      getScoreForLine(board.lines[2]),
      getScoreForLine(board.lines[3]),
    ])
  }, [board.lines, selectionsMade])

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
            if (i >= board.strikes) {
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
