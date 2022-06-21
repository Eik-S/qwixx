import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { colors } from '../assets/colors'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { ColorPulse } from './color-pulse'

export function TimerCounter() {
  const { gameData, movingPlayerId, setIsTimeOver } = useGameStateContext()
  const moveTime = gameData.moveTime as number
  const [timeLeft, setTimeLeft] = useState(moveTime)
  const [showColorPulse, setShowColorPulse] = useState(false)

  useEffect(() => {
    if (movingPlayerId === undefined) return

    function decreaseTimeLeft() {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 1) {
          clearInterval(timer)
        }
        const newTime = prevTimeLeft - 1
        if (newTime <= 3 && newTime >= 1) {
          setShowColorPulse(true)
        }
        return newTime
      })
    }
    setTimeLeft(moveTime)
    const timer = setInterval(decreaseTimeLeft, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [moveTime, movingPlayerId])

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(moveTime)
      setIsTimeOver(true)
    }
  }, [moveTime, setIsTimeOver, timeLeft])

  return (
    <>
      <div css={styles.time(timeLeft)}>{timeLeft}</div>
      {showColorPulse && (
        <ColorPulse onPulseShown={() => setShowColorPulse(false)} color={colors.red} />
      )}
    </>
  )
}

const styles = {
  time: (timeLeft: number) => css`
    position: relative;
    font-size: 30em;
    color: ${colors.lightGrey};

    ${timeLeft <= 3 &&
    css`
      color: ${colors.grey};
    `}
  `,
}
