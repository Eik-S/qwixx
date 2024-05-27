import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { getHexColor } from '../assets/colors'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { Dice } from './dice'

interface DiceObj {
  value: number
  color: string
}

const blackDiceColor = getHexColor('w', 'dark')
const redDiceColor = getHexColor('r')
const yellowDiceColor = getHexColor('y')
const greenDiceColor = getHexColor('g')
const blueDiceColor = getHexColor('b')

export function DiceCup({ isBig }: { isBig: boolean }) {
  const { movingPlayerId, setPossibleMoves, numberOfPlayers } = useGameStateContext()
  const [isRolling, setIsRolling] = useState(false)

  const [dices, setDices] = useState<DiceObj[]>([
    { value: 1, color: blackDiceColor },
    { value: 1, color: blackDiceColor },
    { value: 1, color: redDiceColor },
    { value: 1, color: yellowDiceColor },
    { value: 1, color: greenDiceColor },
    { value: 1, color: blueDiceColor },
  ])

  useEffect(() => {
    if (isRolling) return
    const blackDiceValues = dices
      .filter((dice) => dice.color === blackDiceColor)!
      .map((dice) => dice.value)
    const redDiceValue = dices.find((dice) => dice.color === redDiceColor)!.value
    const yellowDiceValue = dices.find((dice) => dice.color === yellowDiceColor)!.value
    const greenDiceValue = dices.find((dice) => dice.color === greenDiceColor)!.value
    const blueDiceValue = dices.find((dice) => dice.color === blueDiceColor)!.value

    const moveForEveryone = blackDiceValues.reduce((prevValue, diceValue) => prevValue + diceValue)
    const redMoves = blackDiceValues.map((diceValue) => diceValue + redDiceValue)
    const yellowMoves = blackDiceValues.map((diceValue) => diceValue + yellowDiceValue)
    const greenMoves = blackDiceValues.map((diceValue) => diceValue + greenDiceValue)
    const blueMoves = blackDiceValues.map((diceValue) => diceValue + blueDiceValue)

    setPossibleMoves({
      everyone: moveForEveryone,
      r: redMoves,
      y: yellowMoves,
      g: greenMoves,
      b: blueMoves,
    })
  }, [dices, setPossibleMoves, isRolling])

  useEffect(() => {
    var iterations = 5
    var millis = 20

    var rollDices = function () {
      setDices((oldDices) => {
        return oldDices.map((dice) => {
          return { ...dice, value: Math.ceil(Math.random() * 6) }
        })
      })

      iterations -= 1
      millis += 10

      if (iterations === 0) {
        setIsRolling(false)
        clearInterval(rolling)
      }
    }
    setIsRolling(true)
    const rolling = setInterval(rollDices, millis)

    return () => {
      clearInterval(rolling)
    }
  }, [movingPlayerId])

  return (
    <div css={styles.diceCup(numberOfPlayers)}>
      {dices.map((dice, i) => (
        <Dice key={i} value={dice.value} color={dice.color} isBig={isBig} />
      ))}
    </div>
  )
}

const styles = {
  diceCup: (numPlayers: number) => css`
    display: flex;
    flex-direction: row;
    ${numPlayers !== 2 &&
    css`
      @media (orientation: portrait) {
        flex-direction: column;
      }
    `}
  `,
}
