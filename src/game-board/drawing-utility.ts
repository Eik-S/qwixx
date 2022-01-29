// utility functions for drawing elements using the gameboards 2d context

import { colors, getHexColor } from '../assets/colors'
import { dimensions } from '../constants/dimensions'
import { Field, Line, LineColor } from './game-board'

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
    const hasHoverStyles = field.isHovered && !(field.isFilled || field.isDisabled)

    ctx.fillStyle = getHexColor(colorString, hasHoverStyles ? 'dark' : 'light')
    ctx.strokeStyle = getHexColor(colorString, 'dark')
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
    ctx.fillStyle = hasHoverStyles ? getHexColor(colorString, 'light') : getHexColor(colorString)
    drawFieldNumber(ctx, x + dimensions.fieldSize / 2, y + dimensions.fieldSize / 2, field.value)

    if (field.isSelected || field.isFilled) {
      drawCrossAt(
        ctx,
        x + dimensions.fieldSize / 2,
        y + dimensions.fieldSize / 2,
        field.isSelected ? 2 : 4,
      )
    }

    if (field.isDisabled && !field.isFilled) {
      ctx.fillStyle = '#fff9'
      ctx.fillRect(x, y, dimensions.fieldSize, dimensions.fieldSize)
    }
  })
}

function drawCrossAt(ctx: CanvasRenderingContext2D, x: number, y: number, lineWidth: number) {
  const crossRad = 22

  ctx.beginPath()
  ctx.strokeStyle = 'black'
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

  ctx.beginPath()
  ctx.strokeStyle = line.wasClosedByYou ? getHexColor('w', 'dark') : getHexColor('w')
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.fillStyle = line.wasClosedByYou ? getHexColor(line.color) : colors.background
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
