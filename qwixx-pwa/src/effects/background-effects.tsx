import { css } from '@emotion/react'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { TimerCounter } from './timer-counter'

export function BackgroundEffects({ ...props }) {
  const { gameData } = useGameStateContext()
  const isTimerGameRunning = gameData.state === 'playing' && gameData.moveTime !== 'infinite'

  return (
    <div css={styles.backgroundWrapper} {...props}>
      {isTimerGameRunning && <TimerCounter />}
    </div>
  )
}

const styles = {
  backgroundWrapper: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}
