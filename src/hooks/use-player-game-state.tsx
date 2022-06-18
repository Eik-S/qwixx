import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Board, Field, Line, Player } from '../models/game'
import { useGameStateContext } from './use-global-game-state'

interface PlayerStateApi {
  board: Board
  isActivePlayer: boolean
  hasBoardChanged: boolean
  numSelectionsMade: number
  setHasBoardChanged: Dispatch<SetStateAction<boolean>>
  toggleField: (line: Line, field: Field) => void
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

  const [hasBoardChanged, setHasBoardChanged] = useState(false)
  const [numSelectionsMade, setNumSelectionsMade] = useState(0)
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
            console.log(`index is ${i} line.fields.length is ${line.fields.length}`)
            if (i === line.fields.length - 1) {
              console.log('counting crosses in line')
              const crossesInLine = line.fields.filter((field) => {
                return field.status === 'selected' || field.status === 'filled'
              }).length
              console.log(`counted ${crossesInLine} crosses`)
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

      setNumSelectionsMade(0)
      setHasBoardChanged(true)
    }

    if (movingPlayerId) {
      fillSelectedFields()
      setIsActivePlayer(player.id === movingPlayerId)
    }
  }, [movingPlayerId])

  useEffect(() => {
    const closedLineColors = gameData.state === 'playing' ? gameData.closedLineColors : []
    board.lines.forEach((line) => {
      if (closedLineColors.includes(line.color)) {
        if (line.status === 'open') {
          line.status = 'closed'
          setHasBoardChanged(true)
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
  }, [numberOfStrikes])

  function toggleField(targetLine: Line, targetField: Field) {
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
      setNumSelectionsMade((prev) => prev - 1)
    }
    if (field.status === 'open') {
      field.status = 'selected'
      setNumSelectionsMade((prev) => prev + 1)
    }

    updatePlayerBoard(player.id, board)
  }

  function addStrike(): void {
    board.strikes++
    updatePlayerBoard(player.id, board)
  }

  return {
    board,
    isActivePlayer,
    hasBoardChanged,
    numSelectionsMade,
    setHasBoardChanged,
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
