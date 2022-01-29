import { Field, Line } from '../game-board/game-board'

const fieldSize = 48
const fieldGap = 6
const lineGap = 12
const lineHeight = fieldSize + lineGap + fieldGap

function getCanvasWidth(): number {
  const fieldWidth = fieldSize + fieldGap
  return fieldWidth * 12
}

function getCanvasHeight(): number {
  return lineHeight * 4 - lineGap
}

function getClosedStarWidth(): number {
  return fieldSize + fieldGap
}

function getClickableWidth(): number {
  return getCanvasWidth() - getClosedStarWidth()
}

function getFieldXPos(fieldIndex: number): number {
  return fieldIndex * (fieldSize + fieldGap) + fieldGap / 2
}

function getLineYPos(colorString: string): number {
  if (colorString === 'r') return lineHeight * 0 + fieldGap / 2
  if (colorString === 'y') return lineHeight * 1 + fieldGap / 2
  if (colorString === 'g') return lineHeight * 2 + fieldGap / 2
  if (colorString === 'b') return lineHeight * 3 + fieldGap / 2
  else throw Error(`Invalid colorString given: ${colorString}`)
}

function getLineByYPos(y: number, lines: Line[]): Line | undefined {
  const lineNumber = Math.floor(y / lineHeight)
  const positionInLine = y % lineHeight
  if (positionInLine > fieldSize + fieldGap) {
    return undefined
  }

  return lines[lineNumber] ?? undefined
}

function getFieldByLineAndXPos(x: number, line: Line): Field | undefined {
  const fieldWidth = fieldSize + fieldGap
  const fieldNumber = Math.floor(x / fieldWidth)
  if (fieldNumber >= line.fields.length) {
    return undefined
  }

  return line.fields[fieldNumber]
}

function getFieldAtPosition(lines: Line[], x: number, y: number): Field | undefined {
  const line = dimensions.getLineByYPos(y, lines)
  if (line === undefined) {
    return undefined
  }

  return dimensions.getFieldByLineAndXPos(x, line)
}

export const dimensions = {
  fieldSize,
  canvasWidth: getCanvasWidth(),
  canvasHeight: getCanvasHeight(),
  clickableWidth: getClickableWidth(),
  clickableHeight: getCanvasHeight(),
  getFieldXPos,
  getLineYPos,
  getLineByYPos,
  getFieldByLineAndXPos,
  getFieldAtPosition,
}
