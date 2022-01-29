import { Field, Line } from '../game-board/game-board'

const fieldSize = 48
const fieldXPadding = 6
const fieldYPadding = 18
const lineHeight = fieldSize + fieldYPadding

function getCanvasWidth(): number {
  const fieldWidth = fieldSize + fieldXPadding
  return fieldWidth * 12
}

function getCanvasHeight(): number {
  const fieldHeight = fieldSize + fieldYPadding
  return fieldHeight * 4 - fieldYPadding
}

function getClosedStarWidth(): number {
  return fieldSize + fieldXPadding
}

function getClickableWidth(): number {
  return getCanvasWidth() - getClosedStarWidth()
}

function getFieldXPos(fieldIndex: number): number {
  return fieldIndex * (fieldSize + fieldXPadding)
}

function getLineYPos(colorString: string): number {
  if (colorString === 'r') return lineHeight * 0
  if (colorString === 'y') return lineHeight * 1
  if (colorString === 'g') return lineHeight * 2
  if (colorString === 'b') return lineHeight * 3
  else throw Error(`Invalid colorString given: ${colorString}`)
}

function getLineByYPos(y: number, lines: Line[]): Line {
  const lineNumber = Math.floor(y / lineHeight)

  return lines[lineNumber] ?? undefined
}

function getFieldByLineAndXPos(x: number, line: Line): Field {
  const fieldWidth = fieldSize + fieldXPadding
  const fieldNumber = Math.floor(x / fieldWidth)
  return line.fields[fieldNumber]
}

function getFieldAtPosition(lines: Line[], x: number, y: number): Field {
  const line = dimensions.getLineByYPos(y, lines)
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
