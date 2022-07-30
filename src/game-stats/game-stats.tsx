import { css } from '@emotion/react'
import { useEffect } from 'react'
import { usePlayerStateContext } from '../hooks/use-player-game-state'
import { Line } from '../models/game'

export interface GameStatProps {}

export function GameStats({ ...props }: GameStatProps) {
  const { board, score, updateScore } = usePlayerStateContext()

  const selectionsMade = board.lines.reduce((previousValue, currentVal) => {
    const filledFields = currentVal.fields.filter((field) => field.status === 'filled')
    const numberOfFilledFields = filledFields.length
    return previousValue + numberOfFilledFields
  }, 0)

  useEffect(() => {
    console.log('calculating score')
    const pointsBySelections = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78]

    function getScoreForLine(line: Line) {
      const filledFields = line.fields.filter((field) => field.status === 'filled')
      return pointsBySelections[filledFields.length + (line.wasClosedByYou ? 1 : 0)]
    }

    const lineScores = [
      getScoreForLine(board.lines[0]),
      getScoreForLine(board.lines[1]),
      getScoreForLine(board.lines[2]),
      getScoreForLine(board.lines[3]),
    ]
    const sumOfLineScores = lineScores.reduce(
      (prevLineScore, lineScore) => prevLineScore + lineScore,
    )
    const strikeMinus = board.strikes * 5

    updateScore(sumOfLineScores - strikeMinus)
  }, [board.lines, board.strikes, selectionsMade, updateScore])

  return (
    <div css={styles.gameStatsArea} {...props}>
      <div>
        <h3 css={styles.statLabel}>score</h3>
        <p css={styles.statValue}>{score}</p>
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
  gameStatsArea: css`
    height: 100%;
    display: grid;
    grid-auto-flow: column;
    text-align: center;
    justify-content: space-between;
    & > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
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
