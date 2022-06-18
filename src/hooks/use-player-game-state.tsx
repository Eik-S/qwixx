import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Board, Field, Line, Player } from '../models/game'
import { useGameStateContext } from './use-global-game-state'

export type SelectionType = 'colored' | 'everyone' | 'both'
interface Selection {
  line: Line
  field: Field
  selectionType: SelectionType
}
interface PlayerStateApi {
  board: Board
  isActivePlayer: boolean
  numSelectionsMade: number
  selections: Selection[]
  toggleField: (line: Line, field: Field, type: SelectionType) => void
  addStrike: () => void
}

interface UsePlayerStateProps {
  player: Player
}

export function usePlayerState({ player }: UsePlayerStateProps): PlayerStateApi {
  const { movingPlayerId, updatePlayerBoard } = useGameStateContext()
  const { gameData, endGame, closeLine } = useGameStateContext()
  const [board, setBoard] = useState(player.board)
  const numberOfStrikes = player.board.strikes
  const [selections, setSelections] = useState<Selection[]>([])
  const numSelectionsMade = selections.length
  const [isActivePlayer, setIsActivePlayer] = useState(false)

  useEffect(() => {
    const playerBoard = gameData.players.find((p) => p.id === player.id)?.board!
    setBoard({ ...playerBoard })
  }, [gameData, player.id])

  useEffect(() => {
    function handleCloseLine(line: Line) {
      line.status = 'closed'
      line.wasClosedByYou = true
      line.fields.forEach((field) => {
        if (field.status === 'open') {
          field.status = 'disabled'
        }
      })
      closeLine(line)
    }

    function fillSelectedFields() {
      board.lines.forEach((line) => {
        var hasFilledCrossToTheRight = false
        for (var i = line.fields.length - 1; i >= 0; i--) {
          const field = line.fields[i]

          if (field.status === 'selected') {
            field.status = 'filled'
            hasFilledCrossToTheRight = true
            if (i === line.fields.length - 1) {
              const crossesInLine = line.fields.filter((field) => {
                return field.status === 'selected' || field.status === 'filled'
              }).length
              if (crossesInLine >= 5) {
                handleCloseLine(line)
              }
            }
          }

          if (hasFilledCrossToTheRight && field.status === 'open') {
            field.status = 'disabled'
          }
        }
      })
    }

    if (movingPlayerId) {
      fillSelectedFields()
      setSelections([])
      setIsActivePlayer(player.id === movingPlayerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movingPlayerId])

  useEffect(() => {
    const closedLineColors = gameData.state === 'playing' ? gameData.closedLineColors : []
    board.lines.forEach((line) => {
      if (closedLineColors.includes(line.color)) {
        if (line.status === 'open') {
          line.status = 'closed'
          line.fields.forEach((field) => {
            if (field.status === 'open') {
              field.status = 'disabled'
            }
          })
        }
      }
    })
  }, [gameData, board])

  useEffect(() => {
    if (numberOfStrikes === 4) {
      endGame()
    }
  }, [endGame, numberOfStrikes])

  function toggleField(targetLine: Line, targetField: Field, selectionType: SelectionType) {
    const line = board.lines.find((line) => line.color === targetLine.color)
    if (!line) {
      throw new Error(`No line with color ${targetLine.color} found to toggle field in`)
    }
    const field = line.fields.find((field) => field.value === targetField.value)
    if (!field) {
      throw new Error(
        `No field with value ${targetField.value} found in ${line.color} line to toggle`,
      )
    }

    if (field.status === 'selected') {
      field.status = 'open'
      removeSelection({ line, field, selectionType })
    } else if (field.status === 'open') {
      field.status = 'selected'
      addSelection({ line, field, selectionType })
    }

    updatePlayerBoard(player.id, board)
  }

  function addSelection(selection: Selection) {
    setSelections((prevSelections) => [...prevSelections, selection])
  }

  function removeSelection(selection: Selection) {
    setSelections((prevSelections) => {
      return prevSelections.filter((prevSelection) => prevSelection.field !== selection.field)
    })
  }

  useEffect(() => {
    setSelections([])
  }, [movingPlayerId])

  function addStrike(): void {
    board.strikes++
    updatePlayerBoard(player.id, board)
  }

  return {
    board,
    isActivePlayer,
    selections,
    numSelectionsMade,
    toggleField,
    addStrike,
  }
}

const PlayerStateContext = createContext<PlayerStateApi | undefined>(undefined)

export function PlayerStateContextProvider({
  player,
  children,
}: {
  player: Player
  children: ReactNode
}) {
  const playerState = usePlayerState({ player })
  return <PlayerStateContext.Provider value={playerState}>{children}</PlayerStateContext.Provider>
}

export function usePlayerStateContext() {
  const context = useContext(PlayerStateContext)

  if (context === undefined) {
    throw new Error('usePlayerStateContext must be used within a PlayerStateContextProvider')
  }

  return context
}
