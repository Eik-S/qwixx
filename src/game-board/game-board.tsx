import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { dimensions } from '../constants/dimensions'
import * as DrawingUtil from './drawing-utility'
import { hasContentChangedByPointerMovement } from './hover-utility'

export type LineColor = 'r' | 'y' | 'g' | 'b'

export interface Field {
  value: number

  isFilled: boolean
  isDisabled: boolean
  isSelected: boolean
  isHovered: boolean
}

export interface Line {
  color: LineColor
  fields: Field[]
  isClosed: boolean
  wasClosedByYou: boolean
}

export interface GameBoardContent {
  hits: number
  lines: Line[]
}

export interface GameBoardProps {
  playerId: number
  content: GameBoardContent
  hasContentChanged: boolean
  setHasContentChanged: Dispatch<SetStateAction<boolean>>
  onFieldClick: (field: Field) => void
}

export function GameBoard({
  playerId,
  content,
  hasContentChanged,
  setHasContentChanged,
  onFieldClick,
}: GameBoardProps) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

  // canvas initialization & watchers
  useEffect(() => {
    if (content === undefined || ctx) return

    const canvas = document.getElementById(`canvas-of-player-${playerId}`) as HTMLCanvasElement
    const canvasCtx = canvas.getContext('2d')
    if (canvasCtx === null) return

    const width = dimensions.canvasWidth
    const height = dimensions.canvasHeight
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio // Change to 1 on retina screens to see blurry canvas.
    canvas.width = Math.floor(width * scale)
    canvas.height = Math.floor(height * scale)

    // Normalize coordinate system to use css pixels.
    canvasCtx.scale(scale, scale)
    setCtx(canvasCtx)

    //trigger initial draw
    setHasContentChanged(true)
  }, [content, ctx, onFieldClick, playerId, setHasContentChanged])

  // content (re)drawing
  useEffect(() => {
    if (hasContentChanged === false) return
    setHasContentChanged(false)

    if (ctx === undefined || content === undefined) return

    ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight)

    DrawingUtil.drawLines(ctx, content.lines)
  }, [ctx, hasContentChanged, content, setHasContentChanged])

  return (
    <canvas
      id={`canvas-of-player-${playerId}`}
      onClick={(event: React.MouseEvent) => {
        const field = dimensions.getFieldAtPosition(
          content.lines,
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY,
        )
        if (field === undefined) return
        onFieldClick(field)
      }}
      onPointerMove={(event: React.PointerEvent) => {
        if (event.pointerType !== 'mouse') return

        const hasContentChanged = hasContentChangedByPointerMovement(content, event.nativeEvent)

        if (hasContentChanged) {
          setHasContentChanged(true)
        }
      }}
      onMouseLeave={() => {
        content.lines.forEach((line) =>
          line.fields.forEach((field) => {
            field.isHovered = false
          }),
        )
        setHasContentChanged(true)
      }}
    />
  )
}
