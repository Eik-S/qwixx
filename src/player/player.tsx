import { useEffect, useState } from 'react'
import { Field, GameBoard, LineColor } from '../game-board/game-board'
import { GameControls } from '../game-controls/game-controls'
import { GameStats } from '../game-stats/game-stats'
import { GameStatus } from '../hooks/use-global-game-state'
import { usePlayerGameState } from '../hooks/use-player-game-state'
import './player.scss'

export interface PlayerProps {
  isActivePlayer: boolean
  id: number
  closedLineColors: LineColor[]
  gameStatus: GameStatus
  setNextPlayer: () => void
  startNewGame: () => void
  endGame: () => void
  onCloseLine: (lineColor: LineColor) => void
}

export function Player({
  id,
  isActivePlayer,
  closedLineColors,
  gameStatus,
  setNextPlayer,
  startNewGame,
  endGame,
  onCloseLine,
}: PlayerProps) {
  const [strikes, setStrikes] = useState(0)
  const {
    content,
    hasContentChanged,
    numSelectionsMade,
    lineColorClosed,
    setLineColorClosed,
    setHasContentChanged,
    toggleField,
    fillSelectedFields,
    resetContent,
  } = usePlayerGameState()

  useEffect(() => {
    fillSelectedFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivePlayer])

  useEffect(() => {
    if (gameStatus === 'running') {
      resetContent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus])

  useEffect(() => {
    content.lines.forEach((line) => {
      if (closedLineColors.includes(line.color)) {
        if (!line.isClosed) {
          line.isClosed = true
          setHasContentChanged(true)
          line.fields.forEach((field) => {
            field.isDisabled = true
          })
        }
      }
    })
  }, [closedLineColors, content, setHasContentChanged])

  useEffect(() => {
    if (lineColorClosed === undefined) return

    onCloseLine(lineColorClosed)
    setLineColorClosed(undefined)
  }, [lineColorClosed, onCloseLine, setLineColorClosed])

  function checkIsFieldClickValid(field: Field): boolean {
    const maxPossibleSelections = isActivePlayer ? 2 : 1

    if (field.isDisabled || field.isFilled) return false
    if (!field.isSelected && maxPossibleSelections - numSelectionsMade === 0) return false
    return true
  }

  function handleFieldClick(field: Field) {
    const isFieldClickValid = checkIsFieldClickValid(field)
    if (isFieldClickValid) {
      toggleField(field)
    }
  }

  function handleEndTurn() {
    if (isActivePlayer && numSelectionsMade === 0) {
      setStrikes((prev) => prev + 1)
    }
    if (strikes === 4) {
      endGame()
    } else {
      setNextPlayer()
    }
  }

  return (
    <div className={`player-area player-${id}`}>
      <div className="stats">
        <GameStats strikes={strikes} content={content} hasContentChanged={hasContentChanged} />
      </div>

      <GameBoard
        playerId={id}
        content={content}
        hasContentChanged={hasContentChanged}
        setHasContentChanged={setHasContentChanged}
        onFieldClick={(field) => handleFieldClick(field)}
      ></GameBoard>

      <div className="controls">
        <GameControls
          onEndTurn={() => handleEndTurn()}
          areControlsDisabled={!isActivePlayer}
          startNewGame={() => startNewGame()}
          gameStatus={gameStatus}
        ></GameControls>
      </div>
    </div>
  )
}
