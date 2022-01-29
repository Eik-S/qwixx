import { useEffect, useState } from 'react'
import { getHexColor } from '../assets/colors'
import { Dice } from './dice'
import './dice-cup.scss'

interface DiceObj {
  value: number
  color: string
}

export function DiceCup({ activePlayerIndex }: { activePlayerIndex: number }) {
  const [dices, setDices] = useState<DiceObj[]>([
    { value: 1, color: getHexColor('w', 'dark') },
    { value: 1, color: getHexColor('w', 'dark') },
    { value: 1, color: getHexColor('r') },
    { value: 1, color: getHexColor('y') },
    { value: 1, color: getHexColor('g') },
    { value: 1, color: getHexColor('b') },
  ])

  useEffect(() => {
    roll()
  }, [activePlayerIndex])

  function roll() {
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
        return
      }
      setTimeout(rollDices, millis)
    }
    setTimeout(rollDices, millis)
  }

  return (
    <div className="dice-cup">
      {dices.map((dice, i) => (
        <Dice key={i} value={dice.value} color={dice.color} />
      ))}
    </div>
  )
}