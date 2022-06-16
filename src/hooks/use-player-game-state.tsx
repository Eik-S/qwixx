import { useState } from 'react'
import { Field, Board, LineColor } from '../models/game'

export function usePlayerGameState() {
  const [board, setBoard] = useState<Board>(getCleanBoard())

  const [hasBoardChanged, setHasBoardChanged] = useState(false)
  const [numSelectionsMade, setNumSelectionsMade] = useState(0)
  const [lineColorClosedThisTurn, setLineColorClosedThisTurn] = useState<LineColor | undefined>(
    undefined,
  )

  function toggleField(field: Field) {
    if (field.status === 'selected') {
      field.status = 'open'
      setNumSelectionsMade((prev) => prev - 1)
    } else {
      field.status = 'selected'
      setNumSelectionsMade((prev) => prev + 1)
    }
    setHasBoardChanged(true)
  }

  function fillSelectedFields() {
    board.lines.forEach((line) => {
      var hasFilledCrossToTheRight = false
      for (var i = line.fields.length - 1; i >= 0; i--) {
        const field = line.fields[i]

        if (field.status === 'selected') {
          field.status = 'filled'
          hasFilledCrossToTheRight = true

          if (i === line.fields.length - 1) {
            const crossesInLine = line.fields.filter((field) => {
              return field.status === ('selected' || 'filled')
            }).length
            if (crossesInLine >= 5) {
              line.status = 'closed'
              line.wasClosedByYou = true
              setLineColorClosedThisTurn(line.color)
            }
          }
        }

        if (hasFilledCrossToTheRight) {
          field.status = 'disabled'
        }
      }
    })

    setNumSelectionsMade(0)
    setHasBoardChanged(true)
  }

  function resetContent() {
    setBoard(getCleanBoard())
    setHasBoardChanged(true)
  }

  return {
    board,
    hasBoardChanged,
    numSelectionsMade,
    lineColorClosedThisTurn,
    setLineColorClosedThisTurn,
    setHasBoardChanged,
    toggleField,
    fillSelectedFields,
    resetContent,
  }
}

function createEmptyLineOfFields(order: 'asc' | 'desc'): Field[] {
  const line: Field[] = []
  for (let x = 2; x < 13; x++) {
    line.push({
      value: order === 'asc' ? x : 14 - x,
      status: 'open',
    })
  }
  return line
}

function getCleanBoard(): Board {
  return {
    strikes: 0,
    lines: [
      {
        color: 'r',
        fields: createEmptyLineOfFields('asc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'y',
        fields: createEmptyLineOfFields('asc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'g',
        fields: createEmptyLineOfFields('desc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'b',
        fields: createEmptyLineOfFields('desc'),
        status: 'open',
        wasClosedByYou: false,
      },
    ],
  }
}
