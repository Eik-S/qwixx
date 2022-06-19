import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { colors } from '../assets/colors'
import { useGameStateContext } from '../hooks/use-global-game-state'

export function TimerCounter() {
  const { gameData, movingPlayerId, setIsTimeOver } = useGameStateContext()
  const moveTime = gameData.moveTime as number
  const [timeLeft, setTimeLeft] = useState(moveTime)

  useEffect(() => {
    function decreaseTimeLeft() {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 1) {
          clearInterval(timer)
        }
        return prevTimeLeft - 1
      })
    }
    setTimeLeft(moveTime)
    const timer = setInterval(decreaseTimeLeft, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [movingPlayerId])

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(moveTime)
      setIsTimeOver(true)
    }
  }, [moveTime, setIsTimeOver, timeLeft])

  return <div css={styles.time(timeLeft)}>{timeLeft}</div>
}

const styles = {
  time: (timeLeft: number) => css`
    font-size: 30em;
    color: ${colors.lightGrey};

    ${timeLeft <= 3 &&
    css`
      color: ${colors.grey};
    `}
  `,
}
