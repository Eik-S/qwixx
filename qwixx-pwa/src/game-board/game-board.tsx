import React, { useEffect, useState } from 'react'
import { dimensions } from '../constants/dimensions'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { SelectionType, usePlayerStateContext } from '../hooks/use-player-game-state'
import { Field, Line } from '../models/game'
import * as DrawingUtil from './drawing-utility'

interface BoardPosition {
  line: Line
  field: Field
}

export interface GameBoardProps {
  playerId: string
}

export function GameBoard({ playerId, ...props }: GameBoardProps) {
  const { board, isActivePlayer, selections, numSelectionsMade, toggleField } =
    usePlayerStateContext()
  const { possibleMoves } = useGameStateContext()
  const [mouseDownPosition, setMouseDownPosition] = useState<BoardPosition | undefined>(undefined)

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

    const scale = window.devicePixelRatio
    canvas.width = Math.floor(width * scale)
    canvas.height = Math.floor(height * scale)

    canvasCtx.scale(scale, scale)
    setCtx(canvasCtx)
  }, [board, ctx, playerId])

  // content (re)drawing
  useEffect(() => {
    if (ctx === undefined || board === undefined) return

    ctx.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight)

    DrawingUtil.drawLines(ctx, board.lines)
  }, [ctx, board])

  function getSelectionType(line: Line, field: Field): SelectionType | undefined {
    if (possibleMoves === undefined) {
      throw new Error('No possible moves to calculate SelectionType from')
    }
    const moveColor = line.color
    const moveValue = field.value
    const isValidEveryonesMove = possibleMoves.everyone === moveValue
    const isValidColoredMove = possibleMoves[moveColor].includes(moveValue)

    if (isValidColoredMove && isValidEveryonesMove) return 'both'
    if (isValidColoredMove) return 'colored'
    if (isValidEveryonesMove) return 'everyone'

    return undefined
  }

  const isEveryonesMoveMade = selections.find((selection) => selection.selectionType === 'everyone')
  const noColoredMoveMade = !selections.find((selection) => selection.selectionType === 'colored')
  const isSelectionInLine = (line: Line) =>
    !!selections.find((selection) => selection.line === line)
  const isFieldToTheRightSelected = (field: Field, line: Line) =>
    !!selections.find((selection) => {
      if (selection.line !== line) {
        return false
      }
      for (const selectionLineField of selection.line.fields) {
        if (selectionLineField === field) {
          return true
        }
        if (selectionLineField === selection.field) {
          return false
        }
      }
      throw new Error('This should not happen')
    })

  function checkIfDicesAllowMove(line: Line, field: Field, selectionType: SelectionType): boolean {
    const isValidEveryonesMove = selectionType !== 'colored'
    const isValidColoredMove = selectionType !== 'everyone'
    // allow only everyones move for not moving players
    if (!isActivePlayer && isValidEveryonesMove) {
      return true
    }

    /////////////////////////////
    // logic for active player //
    /////////////////////////////
    if (field.status === 'selected') {
      return true
    }
    // dont allow move if other selection was made to the right
    if (isActivePlayer && isFieldToTheRightSelected(field, line)) {
      return false
    }

    // set these conditions for everyones move:
    if (isActivePlayer && isValidEveryonesMove) {
      // allow if this is the first everyones move and there is no colored move in the same line
      if (field.status === 'open' && !isSelectionInLine(line)) {
        if (!isEveryonesMoveMade) {
          return true
        }
      }
    }

    // set these conditions for colored move:
    if (isActivePlayer && isValidColoredMove) {
      // allow if colored move is the first move
      if (numSelectionsMade === 0) {
        return true
      }
      // allow if the first move was no colored move
      if (noColoredMoveMade) {
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

  function handleFieldClick({ line, field }: BoardPosition) {
    const isFieldClickValid = checkIsFieldClickValid(field)
    if (!isFieldClickValid) return

    const selectionType = getSelectionType(line, field)
    if (selectionType === undefined) return
    const dicesAllowMove = checkIfDicesAllowMove(line, field, selectionType)
    if (!dicesAllowMove) return

    toggleField(line, field, selectionType)
  }

  function getClickBoardPosition(
    event: React.MouseEvent<HTMLCanvasElement>,
  ): BoardPosition | undefined {
    const y = event.nativeEvent.offsetY
    const x = event.nativeEvent.offsetX

    const line = dimensions.getLineByYPos(y, board.lines)
    const field = dimensions.getFieldAtPosition(board.lines, x, y)

    if (line === undefined || field === undefined) {
      return undefined
    }

    return {
      line,
      field,
    }
  }

  return (
    <canvas
      id={`canvas-of-player-${playerId}`}
      onPointerCancel={() => {
        if (mouseDownPosition) {
          handleFieldClick(mouseDownPosition)
        }
      }}
      onPointerUp={() => {
        if (mouseDownPosition) {
          handleFieldClick(mouseDownPosition)
        }
      }}
      onPointerDown={(event) => {
        const boardPosition = getClickBoardPosition(event)
        setMouseDownPosition(boardPosition)
      }}
      {...props}
    />
  )
}
