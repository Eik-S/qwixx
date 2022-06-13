/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { colors } from '../assets/colors'
import { Field, GameBoard, LineColor } from '../game-board/game-board'
import { GameControls } from '../game-controls/game-controls'
import { GameStats } from '../game-stats/game-stats'
import { GameStatus } from '../hooks/use-global-game-state'
import { usePlayerGameState } from '../hooks/use-player-game-state'

export interface PlayerProps {
  activePlayerIndex: number
  isActivePlayer: boolean
  id: number
  closedLineColors: LineColor[]
  gameStatus: GameStatus
  numberOfPlayers: number
  gridPosition: 'top' | 'bottom' | 'left' | 'right'
  setNextPlayer: () => void
  startNewGame: (playerId: number) => void
  endGame: () => void
  onCloseLine: (lineColor: LineColor) => void
}

export function Player({
  id,
  isActivePlayer,
  activePlayerIndex,
  closedLineColors,
  gameStatus,
  numberOfPlayers,
  gridPosition,
  setNextPlayer,
  startNewGame,
  endGame,
  onCloseLine,
}: PlayerProps) {
  const [strikes, setStrikes] = useState(0)
  const narrowLayout = numberOfPlayers > 2
  const {
    content,
    hasContentChanged,
    numSelectionsMade,
    lineColorClosedThisTurn,
    setLineColorClosedThisTurn,
    setHasContentChanged,
    toggleField,
    fillSelectedFields,
    resetContent,
  } = usePlayerGameState()

  useEffect(() => {
    fillSelectedFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlayerIndex])

  useEffect(() => {
    if (gameStatus === 'running') {
      setStrikes(0)
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
    if (lineColorClosedThisTurn === undefined) return

    onCloseLine(lineColorClosedThisTurn)
    setLineColorClosedThisTurn(undefined)
  }, [lineColorClosedThisTurn, onCloseLine, setLineColorClosedThisTurn])

  useEffect(() => {
    if (strikes === 4) {
      endGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strikes])

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
    setNextPlayer()
  }

  return (
    <div css={styles.playerArea(gridPosition, narrowLayout)}>
      <div css={styles.stats(narrowLayout)}>
        <GameStats
          narrowLayout={narrowLayout}
          strikes={strikes}
          content={content}
          hasContentChanged={hasContentChanged}
        />
      </div>

      <GameBoard
        playerId={id}
        content={content}
        hasContentChanged={hasContentChanged}
        setHasContentChanged={setHasContentChanged}
        onFieldClick={(field) => handleFieldClick(field)}
        css={styles.gameBoard}
      ></GameBoard>

      <GameControls
        css={styles.controls}
        areControlsDisabled={!isActivePlayer}
        gameStatus={gameStatus}
        narrowLayout={narrowLayout}
        onEndTurn={() => handleEndTurn()}
        startNewGame={() => startNewGame(id)}
      ></GameControls>
    </div>
  )
}

const styles = {
  playerArea: (gridPosition: 'top' | 'bottom' | 'left' | 'right', narrowLayout: boolean) => css`
    display: grid;
    grid-template-areas: 'stats board controls';
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-column-gap: 18px;
    width: min-content;
    grid-area: ${`player_${gridPosition}`};

    ${narrowLayout &&
    css`
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        'stats .'
        'board controls';
    `}
    ${gridPosition === 'top' &&
    css`
      rotate: 180deg;
    `}
      ${gridPosition === 'left' &&
    css`
      justify-self: center;
      align-self: center;
      transform: rotate(90deg);
    `}
      ${gridPosition === 'right' &&
    css`
      justify-self: center;
      align-self: center;
      rotate: 270deg;
    `};
  `,
  gameBoard: css`
    grid-area: board;
  `,
  stats: (narrowLayout: boolean) => css`
    grid-area: stats;
    border-right: 4px solid ${colors.grey};
    margin: -6px 0;
    padding: 6px 18px 6px 0;

    ${narrowLayout &&
    css`
      border: none;
      margin: 0;
    `}
  `,
  controls: css`
    grid-area: controls;
  `,
}
