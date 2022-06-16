/** @jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { dimensions } from '../constants/dimensions'
import { Board, Field } from '../models/game'
import * as DrawingUtil from './drawing-utility'

export interface GameBoardProps {
  playerId: number
  board: Board
  hasBoardChanged: boolean
  setHasBoardChanged: Dispatch<SetStateAction<boolean>>
  onFieldClick: (field: Field) => void
}

export function GameBoard({
  playerId,
  board,
  hasBoardChanged,
  setHasBoardChanged,
  onFieldClick,
  ...props
}: GameBoardProps) {
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

    //trigger initial draw
    setHasBoardChanged(true)
  }, [board, ctx, onFieldClick, playerId, setHasBoardChanged])

  // content (re)drawing
  useEffect(() => {
    if (hasBoardChanged === false) return
    setHasBoardChanged(false)

    if (ctx === undefined || board === undefined) return

    ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight)

    DrawingUtil.drawLines(ctx, board.lines)
  }, [ctx, hasBoardChanged, board, setHasBoardChanged])

  return (
    <canvas
      id={`canvas-of-player-${playerId}`}
      onClick={(event: React.MouseEvent) => {
        const field = dimensions.getFieldAtPosition(
          board.lines,
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY,
        )
        if (field === undefined) return
        onFieldClick(field)
      }}
      {...props}
    />
  )
}
