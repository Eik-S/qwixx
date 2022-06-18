/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { dimensions } from '../constants/dimensions'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { usePlayerStateContext } from '../hooks/use-player-game-state'
import { Field, Line } from '../models/game'
import * as DrawingUtil from './drawing-utility'

export interface GameBoardProps {
  playerId: string
}

export function GameBoard({ playerId, ...props }: GameBoardProps) {
  const { board, isActivePlayer, numSelectionsMade, toggleField } = usePlayerStateContext()
  const { possibleMoves } = useGameStateContext()

  const [everyonesMoveMade, setEveryonesMoveMade] = useState(false)
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
    if (ctx === undefined || board === undefined) return

    ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight)

    DrawingUtil.drawLines(ctx, board.lines)
  }, [ctx, board])

  useEffect(() => {
    setEveryonesMoveMade(false)
  }, [isActivePlayer])

  function hasSelection(line: Line, selectedField: Field, direction: 'right' | 'left'): boolean {
    const lineCopy = JSON.parse(JSON.stringify(line)) as Line
    if (direction === 'right') {
      lineCopy.fields.reverse()
    }
    for (const field of lineCopy.fields) {
      if (field.value === selectedField.value) {
        return false
      }
      if (field.status === 'selected') {
        return true
      }
    }
    return false
  }

  function checkIfDicesAllowMove(line: Line, field: Field): boolean {
    if (possibleMoves === undefined) return false
    const moveColor = line.color
    const moveValue = field.value
    const isValidEveryonesMove = possibleMoves.everyone === moveValue
    const isValidColoredMove = possibleMoves[moveColor].includes(moveValue)

    // allow only everyones move for not moving players
    if (!isActivePlayer && isValidEveryonesMove) {
      return true
    }
    /////////////////////////////
    // logic for active player //
    /////////////////////////////

    // dont allow move if other selection was made to the right
    if (isActivePlayer && hasSelection(line, field, 'right')) {
      return false
    }

    // set these conditions for everyones move:
    if (isActivePlayer && isValidEveryonesMove) {
      // allow if this is unselecting an everyones move
      if (field.status === 'selected') {
        setEveryonesMoveMade(false)
        return true
      }
      // allow if this is the first everyones move and there is no colored move in the same line
      if (field.status === 'open' && !hasSelection(line, field, 'left')) {
        if (everyonesMoveMade === false) {
          setEveryonesMoveMade(true)
          return true
        }
      }
    }

    // set these conditions for colored move:
    if (isActivePlayer && isValidColoredMove) {
      // allow if this is unselecting a colored move
      if (field.status === 'selected') {
        return true
      }
      // allow if colored move is the first move
      if (numSelectionsMade === 0) {
        return true
      }
      // allow if the first move was an everyones move
      if (everyonesMoveMade) {
        return true
      }
    }
    return false
  }

  function checkIsFieldClickValid(field: Field): boolean {
    const maxPossibleSelections = isActivePlayer ? 2 : 1

    if (field.status === 'disabled' || field.status === 'filled') return false
    if (field.status === 'open' && maxPossibleSelections - numSelectionsMade === 0) return false
    return true
  }

  function handleFieldClick(line: Line, field: Field) {
    const isFieldClickValid = checkIsFieldClickValid(field)
    if (!isFieldClickValid) return
    const dicesAllowMove = checkIfDicesAllowMove(line, field)
    if (!dicesAllowMove) return

    toggleField(line, field)
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
