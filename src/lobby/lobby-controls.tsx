import { css } from '@emotion/react'
import { colors } from '../assets/colors'
import { BigButton, Label, MinusButton, PlusButton } from '../controls/ui-elements'
import { useGameStateContext } from '../hooks/use-global-game-state'

export function LobbyControls({ ...props }) {
  const { startNewGame, gameData, setMoveTime } = useGameStateContext()
  const moveTime = gameData.moveTime
  const validMoveTimeValues = [10, 30, 60]

  function increaseMoveTime() {
    if (typeof moveTime === 'number') {
      const moveTimeIndex = validMoveTimeValues.indexOf(moveTime)
      if (moveTimeIndex < validMoveTimeValues.length - 1) {
        setMoveTime(validMoveTimeValues[moveTimeIndex + 1])
      } else if (moveTimeIndex === validMoveTimeValues.length - 1) {
        setMoveTime('infinite')
      }
    }
  }

  function decreaseMoveTime() {
    if (moveTime === 'infinite') {
      setMoveTime(validMoveTimeValues[validMoveTimeValues.length - 1])
    } else {
      const moveTimeIndex = validMoveTimeValues.indexOf(moveTime)
      if (moveTimeIndex !== 0) {
        setMoveTime(validMoveTimeValues[moveTimeIndex - 1])
      }
    }
  }

  const changeMoveTimeId = 'change-move-time'
  return (
    <div css={styles.controlsContainer} {...props}>
      <div css={styles.controlElement}>
        <Label htmlFor={changeMoveTimeId} text="move time" />
        <div>
          <MinusButton
            onClick={() => decreaseMoveTime()}
            disabled={moveTime === validMoveTimeValues[0]}
          />
          <span css={styles.moveTime}>{moveTime === 'infinite' ? '♾️' : `${moveTime}s`}</span>
          <PlusButton onClick={() => increaseMoveTime()} disabled={moveTime === 'infinite'} />
        </div>
      </div>
      <BigButton onClick={() => startNewGame()} text="start game" />
    </div>
  )
}

const styles = {
  controlsContainer: css`
    padding: 32px;
    border: 4px solid ${colors.darkGrey};
    display: flex;
    flex-direction: row;
  `,
  controlElement: css`
    display: grid;
    grid-auto-flow: row;
    margin-right: 32px;
    align-content: space-between;
    justify-items: center;
  `,
  moveTime: css`
    display: inline-block;
    font-size: 24px;
    margin: 0 12px;
    min-width: 42px;
    text-align: center;
    font-weight: 700;
  `,
}
