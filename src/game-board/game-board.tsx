/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { dimensions } from '../constants/dimensions'
import { usePlayerStateContext } from '../hooks/use-player-game-state'
import { Field, Line } from '../models/game'
import * as DrawingUtil from './drawing-utility'

export interface GameBoardProps {
  playerId: string
}

export function GameBoard({ playerId, ...props }: GameBoardProps) {
  const { board, isActivePlayer, numSelectionsMade, toggleField } = usePlayerStateContext()

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()

  // canvas initialization & watchers
  useEffect(() => {
    if (board === undefined || ctx) return

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
  }, [board, ctx, playerId])

  // content (re)drawing
  useEffect(() => {
    console.log('redrawing board:')
    console.log({ board })
    if (ctx === undefined || board === undefined) return

    ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight)

    DrawingUtil.drawLines(ctx, board.lines)
  }, [ctx, board])

  function checkIsFieldClickValid(field: Field): boolean {
    const maxPossibleSelections = isActivePlayer ? 2 : 1

    if (field.status === 'disabled' || field.status === 'filled') return false
    if (field.status === 'open' && maxPossibleSelections - numSelectionsMade === 0) return false
    return true
  }

  function handleFieldClick(line: Line, field: Field) {
    const isFieldClickValid = checkIsFieldClickValid(field)
    if (isFieldClickValid) {
      toggleField(line, field)
    }
  }

  return (
    <canvas
      id={`canvas-of-player-${playerId}`}
      onClick={(event: React.MouseEvent) => {
        const y = event.nativeEvent.offsetY
        const x = event.nativeEvent.offsetX
        const line = dimensions.getLineByYPos(y, board.lines)
        const field = dimensions.getFieldAtPosition(board.lines, x, y)
        if (line === undefined || field === undefined) return
        handleFieldClick(line, field)
      }}
      {...props}
    />
  )
}
