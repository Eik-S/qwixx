// utility functions for drawing elements using the gameboards 2d context

import { colors, getHexColor } from '../assets/colors'
import { dimensions } from '../constants/dimensions'
import { Field, Line, LineColor } from '../models/game'

export function drawLines(ctx: CanvasRenderingContext2D, lines: Line[]): void {
  lines.forEach((line) => {
    drawFieldLine(ctx, line.fields, line.color)

    drawClosedByYouStar(ctx, line)
  })
}

function drawFieldLine(
  ctx: CanvasRenderingContext2D,
  fields: Field[],
  colorString: LineColor,
): void {
  const y = dimensions.getLineYPos(colorString)
  fields.forEach((field, fieldIndex) => {
    const x = dimensions.getFieldXPos(fieldIndex)
    const darkMode = getIsDarkMode()
    ctx.fillStyle = getHexColor(colorString, darkMode ? 'dark' : 'light')
    ctx.strokeStyle = getHexColor(colorString, darkMode ? 'darker' : 'dark')
    ctx.fillRect(x, y, dimensions.fieldSize, dimensions.fieldSize)

    ctx.lineWidth = 2
    const strokeDelta = ctx.lineWidth / 2
    ctx.strokeRect(
      x + strokeDelta,
      y + strokeDelta,
      dimensions.fieldSize - ctx.lineWidth,
      dimensions.fieldSize - ctx.lineWidth,
    )

    // draw number in the center of the field
    ctx.fillStyle = getHexColor(colorString, darkMode ? 'darker' : undefined)
    drawFieldNumber(ctx, x + dimensions.fieldSize / 2, y + dimensions.fieldSize / 2, field.value)

    if (field.status === 'selected' || field.status === 'filled') {
      drawCrossAt(
        ctx,
        x + dimensions.fieldSize / 2,
        y + dimensions.fieldSize / 2,
        field.status === 'selected' ? 2 : 4,
      )
    }

    if (field.status === 'disabled') {
      ctx.fillStyle = '#fff9'
      ctx.fillRect(x, y, dimensions.fieldSize, dimensions.fieldSize)
    }
  })
}

function drawCrossAt(ctx: CanvasRenderingContext2D, x: number, y: number, lineWidth: number) {
  const crossRad = 22

  ctx.beginPath()
  const darkMode = getIsDarkMode()
  ctx.strokeStyle = darkMode ? colors.lightGrey : 'black'
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.moveTo(x - crossRad / 2, y - crossRad / 2)
  ctx.lineTo(x + crossRad / 2, y + crossRad / 2)
  ctx.moveTo(x + crossRad / 2, y - crossRad / 2)
  ctx.lineTo(x - crossRad / 2, y + crossRad / 2)
  ctx.stroke()
  ctx.closePath()
}

function drawFieldNumber(ctx: CanvasRenderingContext2D, x: number, y: number, value: number) {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = 'bold 28px sans-serif'
  ctx.fillText(`${value}`, x, y)
}

function drawClosedByYouStar(ctx: CanvasRenderingContext2D, line: Line) {
  const x = dimensions.canvasWidth - dimensions.fieldSize + 10
  const y = dimensions.getLineYPos(line.color) + 8
  const rad = dimensions.fieldSize / 2 - 6
  const darkMode = getIsDarkMode()

  ctx.beginPath()
  ctx.strokeStyle = line.wasClosedByYou
    ? getHexColor('w', darkMode ? 'darker' : 'dark')
    : getHexColor('w', darkMode ? 'dark' : undefined)
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.fillStyle = line.wasClosedByYou ? getHexColor(line.color) : colors.darkGrey
  ctx.moveTo(x + rad, y)
  ctx.lineTo(
    x + rad + Math.cos((Math.PI * 3) / 10) * rad,
    y + rad + Math.sin((Math.PI * 3) / 10) * rad,
  )
  ctx.lineTo(
    x + rad - Math.cos((Math.PI * 1) / 10) * rad,
    y + rad - Math.sin((Math.PI * 1) / 10) * rad,
  )
  ctx.lineTo(
    x + rad + Math.cos((Math.PI * 1) / 10) * rad,
    y + rad - Math.sin((Math.PI * 1) / 10) * rad,
  )
  ctx.lineTo(
    x + rad - Math.cos((Math.PI * 3) / 10) * rad,
    y + rad + Math.sin((Math.PI * 3) / 10) * rad,
  )
  ctx.lineTo(x + rad, y)
  ctx.stroke()
  ctx.fill()
  ctx.closePath()
}

function getIsDarkMode(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
