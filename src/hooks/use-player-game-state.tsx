import { useState } from 'react'
import { Field, GameBoardContent, LineColor } from '../game-board/game-board'

export function usePlayerGameState() {
  const [content, setContent] = useState<GameBoardContent>(getCleanContent())

  const [hasContentChanged, setHasContentChanged] = useState(false)
  const [numSelectionsMade, setNumSelectionsMade] = useState(0)
  const [lineColorClosedThisTurn, setLineColorClosedThisTurn] = useState<LineColor | undefined>(
    undefined,
  )

  function toggleField(field: Field) {
    if (field.isSelected) {
      field.isSelected = false
      setNumSelectionsMade((prev) => prev - 1)
    } else {
      field.isSelected = true
      setNumSelectionsMade((prev) => prev + 1)
    }
    setHasContentChanged(true)
  }

  function fillSelectedFields() {
    content.lines.forEach((line) => {
      var hasFilledCrossToTheRight = false
      for (var i = line.fields.length - 1; i >= 0; i--) {
        const field = line.fields[i]
        if (field.isSelected) {
          field.isSelected = false
          field.isFilled = true
          hasFilledCrossToTheRight = true

          if (
            i === line.fields.length - 1 &&
            line.fields.filter((field) => field.isFilled).length >= 5
          ) {
            line.wasClosedByYou = true
            setLineColorClosedThisTurn(line.color)
          }
        }
        if (hasFilledCrossToTheRight) {
          field.isDisabled = true
        }
      }
    })

    setNumSelectionsMade(0)
    setHasContentChanged(true)
  }

  function resetContent() {
    setContent(getCleanContent())
    setHasContentChanged(true)
  }

  return {
    content,
    hasContentChanged,
    numSelectionsMade,
    lineColorClosedThisTurn,
    setLineColorClosedThisTurn,
    setHasContentChanged,
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

      isSelected: false,
      isDisabled: false,
      isFilled: false,
      isHovered: false,
    })
  }
  return line
}

function getCleanContent(): GameBoardContent {
  return {
    hits: 0,
    lines: [
      {
        color: 'r',
        fields: createEmptyLineOfFields('asc'),
        isClosed: false,
        wasClosedByYou: false,
      },
      {
        color: 'y',
        fields: createEmptyLineOfFields('asc'),
        isClosed: false,
        wasClosedByYou: false,
      },
      {
        color: 'g',
        fields: createEmptyLineOfFields('desc'),
        isClosed: false,
        wasClosedByYou: false,
      },
      {
        color: 'b',
        fields: createEmptyLineOfFields('desc'),
        isClosed: false,
        wasClosedByYou: false,
      },
    ],
  }
}
