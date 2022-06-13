/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameStatus } from '../hooks/use-global-game-state'

export interface GameControlProps {
  areControlsDisabled: boolean
  gameStatus: GameStatus
  narrowLayout: boolean
  onEndTurn: () => void
  startNewGame: () => void
}

export function GameControls({
  gameStatus,
  areControlsDisabled,
  narrowLayout,
  onEndTurn,
  startNewGame,
  ...props
}: GameControlProps) {
  return (
    <div css={styles.gameControlsArea} {...props}>
      {gameStatus === 'running' ? (
        <button
          className="button end-turn-button"
          css={styles.doneButton(narrowLayout)}
          onClick={() => onEndTurn()}
          disabled={areControlsDisabled}
        >
          DONE
        </button>
      ) : (
        <button
          className="button new-game-button"
          css={styles.doneButton(narrowLayout)}
          onClick={() => startNewGame()}
        >
          NEW GAME
        </button>
      )}
    </div>
  )
}

const styles = {
  gameControlsArea: css`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  doneButton: (narrowLayout: boolean) => css`
    ${narrowLayout &&
    css`
      padding: 12px 16px;
      line-height: 30px;
      word-break: break-all;
      white-space: pre-wrap;
    `}
  `,
}
